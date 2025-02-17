import { db } from "@/db/drizzle";
import { emailTemplates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    try{
        const email = req.nextUrl.searchParams.get("email");
        if(!email){
            return NextResponse.json({message: "Invalid request"}, {status: 400})
        }
        const templates = await db.select().from(emailTemplates).where(eq(emailTemplates.email, email));
     
        return NextResponse.json({templates}, {status: 200});
    }catch(e){
        return NextResponse.json({
            message: "An error occurred",
            error : e
        }, {
            status: 500
        })
    }
}