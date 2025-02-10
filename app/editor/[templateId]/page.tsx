'use client';

import Canvas from '@/components/Canvas';
import EditorHeader from '@/components/EditorHeader';
import EditorSidebar from '@/components/EditorSidebar';
import Settings from '@/components/Settings';
import { DragDropLayoutContext } from '@/Context/DragDropElementContext';
import {  EmailTemplateContext } from '@/Context/EmailTemplateContext';
import { ScreenSizeContext } from '@/Context/ScreenSizeContext';
import { SelectedElementContext } from '@/Context/SelectedElementContext';
import { Layout, Element, EmailTemplate, SelectedElement } from '@/types/types';

import React, { useContext, useEffect, useState } from 'react';

const Editor = () => {
  const [screenSize, setScreenSize] = useState<'desktop' | 'mobile'>('desktop');
  const [dragDropLayout, setDragDropLayout] = useState<Layout | Element | undefined>(undefined);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>([]);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | undefined>(undefined);
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
      localStorage.setItem('emailTemplate', JSON.stringify(emailTemplate));
    }
  }, [emailTemplate])
  return (

    
    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
      <DragDropLayoutContext.Provider
        value={{ dragDropLayout, setDragDropLayout }}
      >
       <EmailTemplateContext.Provider value={{emailTemplate, setEmailTemplate}}>
       <SelectedElementContext.Provider value={{selectedElement, setSelectedElement}}>
       <div className="px-4 py-6 bg-[#05091a] min-h-screen">
          <EditorHeader />
          <div className="grid grid-cols-5 text-white">
            <EditorSidebar />
            <div className="col-span-3 text-black bg-slate-800 rounded-sm mx-5">
              <Canvas />
            </div>
            <Settings />
          </div>
        </div>
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
