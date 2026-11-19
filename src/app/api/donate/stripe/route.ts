import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getStripe, stripeConfigured } from "@/lib/stripe";

const schema = z.object({
  amount: z.number().int().min(100).max(1_000_000),
  frequency: z.enum(["one_time", "monthly"]),
  familySlug: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    if (!stripeConfigured()) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY to .env (test mode is fine).",
        },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "Stripe unavailable" }, { status: 503 });
    }

    const body = schema.parse(await req.json());
    const origin = new URL(req.url).origin;
    const family = body.familySlug
      ? await prisma.sponsoredFamily.findUnique({ where: { slug: body.familySlug } })
      : null;

    const productName = family
      ? body.frequency === "monthly"
        ? `Monthly sponsorship — ${family.name}`
        : `Family sponsorship — ${family.name}`
      : body.frequency === "monthly"
        ? "Monthly gift — Stop Veterans Abuse Journalism"
        : "One-time gift — Stop Veterans Abuse Journalism";

    const session = await stripe.checkout.sessions.create({
      mode: body.frequency === "monthly" ? "subscription" : "payment",
      success_url: family
        ? `${origin}/donate/success?provider=stripe&family=${family.slug}&session_id={CHECKOUT_SESSION_ID}`
        : `${origin}/donate/success?provider=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: family ? `${origin}/donate?family=${family.slug}` : `${origin}/donate/cancel`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: body.amount,
            product_data: {
              name: productName,
              description: family
                ? `Sponsor ${family.name} — diary updates included`
                : "Donate to save another family today",
            },
            ...(body.frequency === "monthly"
              ? { recurring: { interval: "month" as const } }
              : {}),
          },
        },
      ],
      metadata: {
        frequency: body.frequency,
        amount: String(body.amount),
        familyId: family?.id || "",
        familySlug: family?.slug || "",
      },
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid donation amount" }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not start Stripe checkout" }, { status: 500 });
  }
}
