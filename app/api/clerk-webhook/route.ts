import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { UserWebhookEvent } from "@clerk/backend";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text(); // Raw body for signature verification
  const headerList = await headers();
  const svixId = headerList.get("svix-id")!;
  const svixTimestamp = headerList.get("svix-timestamp")!;
  const svixSignature = headerList.get("svix-signature")!;

  try {

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    const event = wh.verify(payload, {
  "svix-id": svixId,
  "svix-timestamp": svixTimestamp,
  "svix-signature": svixSignature,
}) as UserWebhookEvent; 
    if (event.type !== "user.created") {
      return NextResponse.json({ message: "Ignoring event" }, { status: 200 });
    }

    const { email_addresses , first_name, last_name, image_url } = event.data;
    const email = email_addresses[0].email_address;
    const name = `${first_name} ${last_name}`;
    // Insert user into NeonDB using Drizzle
    await db.insert(users).values({
        name,
        email,
        picture : image_url,

    }).onConflictDoNothing();
    console.log("User stored successfully");
    return NextResponse.json({ message: "User stored successfully" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Invalid signature or database error" }, { status: 400 });
  }
}
