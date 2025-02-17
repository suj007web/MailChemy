'use client';
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Copy } from 'lucide-react'
  
const ViewHtmlContent = ({openDialog, htmlCode, closeDialog} : {openDialog : boolean, htmlCode : any, closeDialog:any}) => {
    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(htmlCode).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
  return (
    <Dialog open={openDialog} onOpenChange={(isOpen) => !isOpen && closeDialog()}
>

    <DialogContent>
      <DialogHeader>
        <DialogTitle asChild>
            <div className='flex justify-between items-center mx-10'>
                <h2>HTML Code</h2>
                <Copy className='p-1 bg-gray-100 rounded-full h-9 w-9 cursor-pointer'
                onClick={()=>{copyCodeToClipboard()}}
                />
            </div>
        </DialogTitle>
        <DialogDescription asChild>
          <div className='max-h-[400px] overflow-auto bg-gray-200 rounded-md p-4'>
            <pre className='whitespace-pre-wrap break-all'>
                <code>
                {
            htmlCode
         }
                </code>
            </pre>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  
  )
}

export default ViewHtmlContent