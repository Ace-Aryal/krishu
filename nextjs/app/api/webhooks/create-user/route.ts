import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET");
    }

    // 1. Get raw body
    const payload = await req.text();

    // 2. Get signature headers
    const h = await headers();

    const headerPayload = {
      "svix-id": h.get("svix-id")!,
      "svix-timestamp": h.get("svix-timestamp")!,
      "svix-signature": h.get("svix-signature")!,
    };

    // 3. Verify payload
    const wh = new Webhook(WEBHOOK_SECRET);
    // @ts-expect-error
    let event: any;

    try {
      event = wh.verify(payload, headerPayload); // IMPORTANT
    } catch (err) {
      console.error("Webhook verification failed", err);
      return new Response("Invalid signature", { status: 400 });
    }

    // 4. Event is now verified and safe to use
    const { type, data } = event;

    if (type !== "user.created") {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
    }
    console.log(data, "webhook data");
    // const res = await prisma.user.create({
    //   data: {
    //     clerkId: data.id,
    //     email: data.email,
    //     name: data.name,
    //   },
    // });
    return new Response(data, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
