"use client"
import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { aiPrompt } from '@/Data/Prompt'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const AiInputBox = () => {
    const router = useRouter();
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);    
    const {user} = useUser();
    const onGenerate = async()=>{
        const PROMPT = aiPrompt.EMAIL_PROMPT+"\n-"+userInput;
        setLoading(true);
        try{
            const result = await axios.post('/api/ai-email-generate', {prompt: PROMPT, userEmail: '', tId: 1});
            setLoading(false); 
            const resPost = await axios.post('/api/save-template', {emailTemplate: result.data.aiResp, email: user?.emailAddresses[0].emailAddress});
        
            router.push('/editor/'+resPost.data.id);
          
        }catch(e){
            console.log(e)
            setLoading(false);
        }
    }
  return (
    <div className='text-white w-[50%] mt-5'>
        <p className='mb-2'>Provide details about the email template you&apos;d like to create</p>
        <Textarea className='bg-white text-black' placeholder='Start describing your thoughts ...'
        onChange={(e)=>setUserInput(e.target.value)} value={userInput}
        />
        <Button 
        disabled={userInput.length === 0 || loading}
        className=' bg-primary-200 w-full mt-6 hover:bg-primary-300'
        onClick={onGenerate}
        >{loading ? "Generating..." : "Generate"}</Button>
    </div>
  )
}

export default AiInputBox