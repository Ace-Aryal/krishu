import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    console.log("here 9");
    if (!WEBHOOK_SECRET) throw new Error("Missing CLERK_WEBHOOK_SECRET");
    console.log("here 11");

    // Get raw bytes
    const payloadBuffer = await req.arrayBuffer();
    console.log("here 15");

    const h = await headers();
    console.log("here 18");

    const wh = new Webhook(WEBHOOK_SECRET);

    console.log("here 22");

    const svixId = h.get("svix-id");
    const svixTimestamp = h.get("svix-timestamp");
    const svixSignature = h.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    const headerPayload = {
      "svix-id": svixId.trim(),
      "svix-timestamp": svixTimestamp.trim(),
      "svix-signature": svixSignature.trim(),
    };

    console.log("here 38");
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
    await prisma.user.create({
      data: {
        clerkId: data.id,
        email: data.email_addresses[0]?.email_address || "",
        name: data.first_name + " " + data.last_name,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error, "error in webhook");
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
