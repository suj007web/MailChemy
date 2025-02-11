"use client"
import { useDragDropLayout, useEmailTemplate, useScreenSize } from '@/app/editor/[templateId]/page';
import React, {  ReactNode, useEffect, useState } from 'react'
import { Layout, Element } from '@/types/types';

import ColumnLayout from './LayoutElements/ColumnLayout';


const Canvas = () => {
    const {screenSize} = useScreenSize();
    const {dragDropLayout} = useDragDropLayout();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();
    const [dragOver, setDragOver] = useState<boolean>(false);
    const onDragOver = (e: React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
        setDragOver(true);
        console.log('drag over');
    }
    const onDropHandle = ()=>{
      console.log(dragDropLayout);
      setDragOver(false);
      if(dragDropLayout){
          setEmailTemplate(
            (prev)=>{
              return [
                ...prev,
                dragDropLayout
              ]
            }
          );
      }
    }
    useEffect(()=>{
      console.log(emailTemplate);
    }, [emailTemplate])

    const getLayoutComponent = (item : Layout | Element ) : ReactNode=>{
      if(item.type == 'column'){
        item = item ;
        return <ColumnLayout item={item as Layout}/>
      }
    }

  return (
    <div className='mt-16 flex justify-center sticky top-0'>
        <div className={` p-6 w-full ${screenSize == 'desktop' ? "max-w-2xl" : "max-w-sm"} 
        ${dragOver  ? "bg-purple-200 p-4" : "bg-white"}
        `}
        onDragOver={onDragOver}
        onDrop={()=>{onDropHandle()}}
        >
          { emailTemplate.length > 0 ?
            emailTemplate?.map((item, index:number)=>{
              return <div key={index} className='text'>
                {getLayoutComponent(item)}
              </div>
            }) : <h1 className='text-center p-4 bg-gray-100 border border-dashed'>Add Layout Here</h1>
          }
        </div>
    </div>
  )
}

export default Canvas