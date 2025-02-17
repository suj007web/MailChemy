"use client";
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Code, Monitor, Smartphone } from 'lucide-react'
import { useEmailTemplate, useScreenSize } from '@/app/editor/[templateId]/page';
import { useParams } from 'next/navigation';

const EditorHeader = ({viewHTMLCode} : {viewHTMLCode : any}) => {
    const {screenSize, setScreenSize} = useScreenSize();
    const {templateId} = useParams();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();
    const onSaveTemplate = async()=>{
      try{
        const res = await fetch('/api/update-template', {
          method : 'PATCH',
          body : JSON.stringify({
            emailTemplate,
            id : templateId
        })
      })
      }catch(e){
        console.log(e);
      }
    }
  return (
    <div className='flex justify-between items-center'>
        <Image src={"/mailchemy.webp"} height={80} width={80} alt="logo" className="rounded-full"/>
        <div className='relative left-20 flex gap-2'>
            <Button  variant={'ghost'}
            onClick={()=>setScreenSize('desktop')}
            className={`text-white ${screenSize=='desktop'&& 'bg-purple-100 text-primary-100'}`}><Monitor/>Desktop</Button>
            <Button  variant={'ghost'}
            onClick={()=>setScreenSize('mobile')}
            className={`text-white ${screenSize=='mobile'&& 'bg-purple-100 text-primary-100'}`}><Smartphone/>Mobile</Button>
        </div>
        <div className='flex gap-4'>
            <Button variant={'ghost'} className='text-white hover:text-primary-100 hover:bg-purple-100'
            onClick={()=>{viewHTMLCode(true)}}
            >
              <Code/></Button>
            <Button variant={'outline'}>Send Email</Button>
            <Button onClick={onSaveTemplate} className='bg-primary-200 hover:bg-primary-300'>Save This Template</Button>
        </div>
    </div>
  )
}

export default EditorHeader