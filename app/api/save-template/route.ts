import { db } from "@/db/drizzle";
import { emailTemplates } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {emailTemplate, email} = await req.json();
    try{
        const insertedRow = await db.insert(emailTemplates).values({
            design: emailTemplate,
            email: email,
        })
        .returning({id : emailTemplates.tid});

        return NextResponse.json({message: "Email template saved successfully", id : insertedRow[0].id}, {status: 200})
    }catch(e){
        console.log(e)
        return NextResponse.json({message: "An error occurred"}, {status: 500})
    }
}