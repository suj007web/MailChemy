import { db } from "@/db/drizzle";
import { emailTemplates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if(!id){
        return NextResponse.json({message: "Invalid request"}, {status: 400})
    }
    try{
        const template = await db.select().from(emailTemplates).where(eq(emailTemplates.tid, id));
        if(template.length === 0){
            return NextResponse.json({message: "Template not found"}, {status: 404})
        }
        return NextResponse.json(template[0], {status: 200})
    }catch(e){
        console.log(e)
        return NextResponse.json({message: "An error occurred"}, {status: 500})
    }
}