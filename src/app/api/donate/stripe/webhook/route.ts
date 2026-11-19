import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const rawBody = await req.text();

  let event;
  try {
    if (signature && webhookSecret && !webhookSecret.includes("replace_me")) {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      event = JSON.parse(rawBody);
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      id: string;
      amount_total?: number | null;
      currency?: string | null;
      customer_details?: { email?: string | null } | null;
      metadata?: { frequency?: string; familyId?: string; familySlug?: string } | null;
      mode?: string;
    };

    const existing = await prisma.donation.findFirst({
      where: { externalId: session.id },
    });

    if (!existing) {
      const amount = session.amount_total ?? 0;
      const familyId = session.metadata?.familyId || null;

      await prisma.donation.create({
        data: {
          provider: "stripe",
          amount,
          currency: session.currency ?? "usd",
          status: "completed",
          email: session.customer_details?.email ?? null,
          frequency:
            session.metadata?.frequency ||
            (session.mode === "subscription" ? "monthly" : "one_time"),
          externalId: session.id,
          meta: JSON.stringify(session),
          familyId: familyId || undefined,
        },
      });

      if (familyId && amount > 0) {
        await prisma.sponsoredFamily.update({
          where: { id: familyId },
          data: { raisedCents: { increment: amount } },
        });

        const email = session.customer_details?.email;
        if (email) {
          await prisma.familyFollower.upsert({
            where: {
              familyId_email: { familyId, email: email.toLowerCase() },
            },
            update: {},
            create: {
              familyId,
              email: email.toLowerCase(),
              name: email.split("@")[0],
            },
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
