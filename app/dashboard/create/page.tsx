import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Sparkles } from 'lucide-react'
import AiInputBox from '@/components/AiInputBox'

const page = () => {
    
  return (
    <div className='bg-[#05091a] h-screen md:mx-[20vw] mx-5 text-white'>
        <div className='flex flex-col justify-center item-center gap-5  '>
            <h2 className='text-3xl font-semibold'>Create New Email Template</h2>
            <p className='text-lg'>Build a Email Template and Webpage design simple drag and drop of your mouse</p>
            <Tabs defaultValue="AI" className="">
  <TabsList>
    <TabsTrigger value="AI">Create With AI <Sparkles className='h-5 w-5 ml-2'/> </TabsTrigger>
    <TabsTrigger value="Scratch">Start from Scratch</TabsTrigger>
  </TabsList>
  <TabsContent value="AI"><AiInputBox/></TabsContent>
  <TabsContent value="Scratch"></TabsContent>
</Tabs>

        </div>
    </div>
  )
}

export default page