import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) throw new Error("Missing CLERK_WEBHOOK_SECRET");

    // Get raw bytes
    const payloadBuffer = await req.arrayBuffer();

    const h = await headers();

    const headerPayload = {
      "svix-id": h.get("svix-id")!,
      "svix-timestamp": h.get("svix-timestamp")!,
      "svix-signature": h.get("svix-signature")!,
    };

    const wh = new Webhook(WEBHOOK_SECRET);

    let event: any;
    try {
      // Pass raw buffer instead of string
      event = wh.verify(Buffer.from(payloadBuffer), headerPayload);
    } catch (err) {
      console.error("Webhook verification failed", err);
      return new Response("Invalid signature", { status: 400 });
    }

    const { type, data } = event;

    if (type !== "user.created") {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
    }

    console.log(data, "webhook data");

    // Example: save user
    // await prisma.user.create({
    //   data: {
    //     clerkId: data.id,
    //     email: data.email,
    //     name: data.name,
    //   },
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error, "error in webhook");
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
