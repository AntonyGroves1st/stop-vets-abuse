import { NextResponse } from "next/server";
import { z } from "zod";
import { paypalConfigured, paypalRequest } from "@/lib/paypal";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  orderID: z.string().min(1),
  familySlug: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    if (!paypalConfigured()) {
      return NextResponse.json({ error: "PayPal not configured" }, { status: 503 });
    }

    const { orderID, familySlug } = schema.parse(await req.json());
    const family = familySlug
      ? await prisma.sponsoredFamily.findUnique({ where: { slug: familySlug } })
      : null;

    const res = await paypalRequest(`/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      body: "{}",
    });
    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return NextResponse.json({ error: "Capture failed" }, { status: 500 });
    }

    const unit = data.purchase_units?.[0];
    const capture = unit?.payments?.captures?.[0];
    const value = capture?.amount?.value ? Math.round(Number(capture.amount.value) * 100) : 0;
    const email = data.payer?.email_address ?? null;

    await prisma.donation.create({
      data: {
        provider: "paypal",
        amount: value,
        currency: (capture?.amount?.currency_code || "usd").toLowerCase(),
        status: capture?.status === "COMPLETED" ? "completed" : "pending",
        email,
        frequency: "one_time",
        externalId: orderID,
        meta: JSON.stringify(data),
        familyId: family?.id,
      },
    });

    if (family && value > 0) {
      await prisma.sponsoredFamily.update({
        where: { id: family.id },
        data: { raisedCents: { increment: value } },
      });
      if (email) {
        await prisma.familyFollower.upsert({
          where: {
            familyId_email: { familyId: family.id, email: email.toLowerCase() },
          },
          update: {},
          create: {
            familyId: family.id,
            email: email.toLowerCase(),
            name: email.split("@")[0],
          },
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Capture error" }, { status: 500 });
  }
}
