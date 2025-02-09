"use client"
import React from 'react'
import { data } from '@/Data/Layout'
import ElementLayoutCard from './ElementLayoutCard'
import {  list } from '@/Data/ElementList'
import { useDragDropLayout } from '@/app/editor/[templateId]/page'
import { Layout, Element } from '@/types/types';

const EditorSidebar = () => {
    const { setDragDropLayout} = useDragDropLayout();
    const onDragStart = (item : Layout)=> {
        console.log(item);
        setDragDropLayout({
            ...item,
            id : Date.now()
        });
    }

    const onDragElementStart = (item : Element)=>{
        console.log(item);
        setDragDropLayout({
            ...item,
            id : Date.now()
        })
    }


  return (
    <div className='p-4 shadow-gray-700 shadow-sm'>

        <h2 className='font-bold text-2xl'>Layouts</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>
            {
                data.map((item, index)=>(
                    <div key={index} draggable onDragStart={()=>{
                        onDragStart(item);
                    }}>
                        <ElementLayoutCard item={item} />
                    </div>
                ))
            }
        </div>

        <h2 className='font-bold text-2xl mt-6'>Elements</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>
            {
                list.map((item, index)=>(
                    <div className='' draggable key={index} onDragStart={()=>{onDragElementStart(item)}} >

                        <ElementLayoutCard item={item} />
                    </div>
                ))
            }
        </div>


    </div>
  )
}

export default EditorSidebar