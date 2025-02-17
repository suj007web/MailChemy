"use client"
import { useDragDropLayout, useEmailTemplate, useSelectedElement } from '@/app/editor/[templateId]/page';

import React, { ReactNode, useEffect, useState } from 'react'
import { Element, Layout, DragDropState, EmailTemplate } from '@/types/types'
import ButtonComponent from '../ElementComponents/ButtonComponent';
import TextComponent from '../ElementComponents/TextComponent';
import ImageComponent from '../ElementComponents/ImageComponent';
import LogoComponent from '../ElementComponents/LogoComponent';
import LogoHeader from '../ElementComponents/LogoHeader';
import DividerComponent from '../ElementComponents/DividerComponent';
import SocialIconsComponent from '../ElementComponents/SocialIconsComponent';
import { ArrowDown, ArrowUp, Trash} from 'lucide-react';

const ColumnLayout = ({item} : {item : Layout}) => {
    const [dragDrop, setDragDrop] = useState<DragDropState>();
    const {dragDropLayout} = useDragDropLayout();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();
    const {selectedElement, setSelectedElement} = useSelectedElement();
    
    const onDragOverHandle = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        setDragDrop({
          index: index,
          columnId: item?.id
        });
    };

    const getElementComponent = (element : Element | undefined):ReactNode =>{

        if(element?.type == 'Button'){
            return <ButtonComponent {...element}/>
        }
        else if(element?.type == 'Text'){
            return <TextComponent {...element}/>
        }
        else if(element?.type == 'Image'){
            return <ImageComponent {...element}/>
        }
        else if(element?.type == 'Logo'){
           return <LogoComponent {...element}/> 
        }
        else if(element?.type == 'LogoHeader'){
          return <LogoHeader {...element}/>
        }else if(element?.type == 'Divider'){
          return <DividerComponent {...element}/>
        }else if(element?.type == 'SocialIcons'){
          return <SocialIconsComponent {...element}/>
        }
        return element?.type;
    }

    const onDropHandle = () => {
        const index = dragDrop?.index;
        if (index !== undefined && dragDropLayout) {
          setEmailTemplate((prev: EmailTemplate) =>
            prev.map(col => {
              if (col.id === item.id && col.type === 'column') {
                const updatedCol = { ...col } as Layout;
                if ('style' in dragDropLayout) {
                  updatedCol[index] = dragDropLayout;
                }
                return updatedCol;
              }
              return col;
            })
          );
        }
        setDragDrop(undefined);
    };

    const moveItemUp = (id: string) => {
        const index = emailTemplate.findIndex((col:any )=> col.id === id);
        if(index > 0 ){
          setEmailTemplate((prevItems:any)=>{
            const items = [...prevItems];
            
            [items[index], items[index - 1]] = [items[index - 1], items[index]];

            return items;
          })
        }
    }

    const moveItemDown = (id: string) => {
        const index = emailTemplate.findIndex((col:any )=> col.id === id);
        if(index < emailTemplate.length - 1 ){
          setEmailTemplate((prevItems:any)=>{
            const items = [...prevItems];
            
            [items[index], items[index + 1]] = [items[index + 1], items[index]];

            return items;
          })
        }
    }



    return (
        <div className='relative'>
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${item?.numOfCol}, 1fr)`,
            }}
            className={`${selectedElement?.item?.id == item?.id  && "border-2  border-blue-500"}`}
            >
                {Array.from({length: item?.numOfCol}).map((_, index) => {
                  // console.log(item)
                    return <div 
                        key={index} 
                        className={`${getElementComponent(item?.[index]) ? 'p-0' : 'p-2' }  my-1 flex items-center
                            ${!item?.[index]?.type ? "bg-gray-100 border-dashed border" : ""}
                            justify-center cursor-pointer
                            ${(selectedElement?.item?.id == item?.id && selectedElement?.index == index )&& "border-blue-500 border-2 border-dashed"}
                            ${dragDrop?.index === index && 
                            dragDrop?.columnId === item?.id && 
                            !item?.[index]?.type ? 'bg-green-100' : ''}
                        `}
                        onDragOver={(event) => onDragOverHandle(event, index)}
                        onDrop={onDropHandle}
                        onClick={() => {
                          console.log(item)
                          return setSelectedElement({item : item, index : index})
                        }}
                    >
                        {getElementComponent(item?.[index]) ?? "Drag Element Here"}
                    </div>
                })}
            </div>

           {
            selectedElement?.item?.id == item?.id &&
               <div className='absolute -right-10 top-0'>
                <div className='  text-red-500 cursor-pointer p-2 bg-gray-100 rounded-full' onClick={()=>setEmailTemplate((prev)=>prev.filter((col)=>col.id !== item.id))}>
               <Trash />
             </div>
             <div className=' cursor-pointer p-2 bg-gray-100 rounded-full' 
             onClick={()=>{
                moveItemUp(item.id as string);  
            }}
             >
              <ArrowUp/>
             </div>

              <div className=' cursor-pointer p-2 bg-gray-100 rounded-full'
              onClick={()=>{
                moveItemDown(item.id as string);
            }}
              >
                <ArrowDown/>
              </div>

               </div>
           }
        </div>
    )
}

export default ColumnLayout