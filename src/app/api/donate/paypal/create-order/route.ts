import { NextResponse } from "next/server";
import { z } from "zod";
import { paypalConfigured, paypalRequest } from "@/lib/paypal";

const schema = z.object({
  amount: z.number().int().min(100).max(1_000_000),
});

export async function POST(req: Request) {
  try {
    if (!paypalConfigured()) {
      return NextResponse.json(
        { error: "PayPal is not configured. Add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET." },
        { status: 503 },
      );
    }

    const { amount } = schema.parse(await req.json());
    const value = (amount / 100).toFixed(2);

    const res = await paypalRequest("/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value,
            },
            description: "Donate to save another family today",
          },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      return NextResponse.json({ error: "Could not create PayPal order" }, { status: 500 });
    }

    return NextResponse.json({ id: data.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "PayPal order error" }, { status: 500 });
  }
}
