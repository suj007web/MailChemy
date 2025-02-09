'use client';

import Canvas from '@/components/Canvas';
import EditorHeader from '@/components/EditorHeader';
import EditorSidebar from '@/components/EditorSidebar';
import Settings from '@/components/Settings';
import { DragDropLayoutContext } from '@/Context/DragDropElementContext';
import {  EmailTemplateContext } from '@/Context/EmailTemplateContext';
import { ScreenSizeContext } from '@/Context/ScreenSizeContext';
import { Layout, Element, EmailTemplate } from '@/types/types';

import React, { useContext, useState } from 'react';

const Editor = () => {
  const [screenSize, setScreenSize] = useState<'desktop' | 'mobile'>('desktop');
  const [dragDropLayout, setDragDropLayout] = useState<Layout | Element | undefined>(undefined);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>([]);
  return (
    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
      <DragDropLayoutContext.Provider
        value={{ dragDropLayout, setDragDropLayout }}
      >
       <EmailTemplateContext.Provider value={{emailTemplate, setEmailTemplate}}>
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
export default Editor;
