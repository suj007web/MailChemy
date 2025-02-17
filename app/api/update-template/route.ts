import { db } from "@/db/drizzle";
import { emailTemplates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req : NextRequest){
    try{
        const {emailTemplate, id} = await req.json();
        if(!id){
            return NextResponse.json({message: "Invalid request"}, {status: 400})
        }

        const template = await db.select().from(emailTemplates).where(eq(emailTemplates.tid, id));
        if(template.length === 0){
            return NextResponse.json({message: "Template not found"}, {status: 404})
        }
        await db.update(emailTemplates).set({
            design: emailTemplate,
        }).where(eq(emailTemplates.tid, id));
        return NextResponse.json({message: "Email template updated successfully"}, {status: 200})
    }catch(e){
        return NextResponse.json({
            message: "An error occurred",
            error : e
        }, {
            status: 500 
        })
    }
}