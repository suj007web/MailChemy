'use client';

import Canvas from '@/components/Canvas';
import EditorHeader from '@/components/EditorHeader';
import EditorSidebar from '@/components/EditorSidebar';
import Settings from '@/components/Settings';
import { Toaster } from '@/components/ui/sonner';
import { DragDropLayoutContext } from '@/Context/DragDropElementContext';
import {  EmailTemplateContext } from '@/Context/EmailTemplateContext';
import { ScreenSizeContext } from '@/Context/ScreenSizeContext';
import { SelectedElementContext } from '@/Context/SelectedElementContext';
import { Layout, Element, EmailTemplate, SelectedElement } from '@/types/types';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';

import React, { useContext, useEffect, useState } from 'react';

const Editor = () => {
  const [screenSize, setScreenSize] = useState<'desktop' | 'mobile'>('desktop');
  const [dragDropLayout, setDragDropLayout] = useState<Layout | Element | undefined>(undefined);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>([]);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false); 
  useEffect(()=>{
    if(typeof window !== 'undefined'){
      const emailTemplate = localStorage.getItem('emailTemplate');
      if(emailTemplate){
        setEmailTemplate(JSON.parse(emailTemplate));
      }
    }
  },[])

  useEffect(()=>{
    if(selectedElement){
      // console.log(selectedElement.item.id, "selectedElement")
      let updatedEmailTemplate : any = [];
      emailTemplate.forEach((item : any , index)=>{
        if(item.id === selectedElement.item.id){
        
          updatedEmailTemplate?.push(selectedElement?.item)
        }else{
          updatedEmailTemplate.push(item);
        }
      })

      setEmailTemplate(updatedEmailTemplate);
    }
  }, [selectedElement])

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      localStorage.setItem('emailTemplate', JSON.stringify(emailTemplate)??{});
    }
  }, [emailTemplate])

  const [viewHtml, setViewHtml] = useState<boolean>(false);


  const {templateId} = useParams();
  const {user} = useUser();
  useEffect(()=>{
    if(templateId && user){
      getTemplateData();
    }
  }, [templateId, user])

  const getTemplateData = async()=>{
    try{
      setLoading(true);
      const res = await fetch(`/api/get-template?id=${templateId}`);
      const data = await res.json();
      setEmailTemplate(data.design);
      setLoading(false);
    }catch(e){
      console.log(e);
      setLoading(false);
    }
  }

  return (

    
    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
      <DragDropLayoutContext.Provider
        value={{ dragDropLayout, setDragDropLayout }}
      >
       <EmailTemplateContext.Provider value={{emailTemplate, setEmailTemplate}}>
       <SelectedElementContext.Provider value={{selectedElement, setSelectedElement}}>
       <div className="px-4 py-6 bg-[#05091a] min-h-screen">
          <EditorHeader viewHTMLCode={(v:any)=>{setViewHtml(v)}}/>
          {
            !loading ? <div className="grid grid-cols-5 text-white">
            <EditorSidebar />
            <div className="col-span-3 text-black bg-slate-800 rounded-sm mx-5">
              <Canvas viewHTMLCode={viewHtml} closeDialog={()=>setViewHtml(false)} />
            </div>
            <Settings />
          </div> : 
          <div>
            <h2 className='text-white text-center text-3xl'>Please Wait... </h2>
          </div>
          }
        </div>
        <Toaster/>
       </SelectedElementContext.Provider>
        </EmailTemplateContext.Provider>
      </DragDropLayoutContext.Provider>
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};

export const useDragDropLayout = () => {
  return useContext(DragDropLayoutContext);
};

export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext);
}

export const useSelectedElement = ()=>{
  return useContext(SelectedElementContext);
} 
export default Editor;
