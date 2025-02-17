import { generateEmailTemplate } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {prompt} = await req.json();
    try{
        const result = await generateEmailTemplate.sendMessage(prompt);
        const aiResp = result.response.text();
        

        return NextResponse.json({message: "Email generated successfully", aiResp}, {status: 200})
    }catch(e){
        console.log(e)
        return NextResponse.json({message: "An error occurred"}, {status: 500})
    } 
}