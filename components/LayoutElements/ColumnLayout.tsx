"use client"
import { useDragDropLayout, useEmailTemplate } from '@/app/editor/[templateId]/page';

import React, { ReactNode, useState } from 'react'
import { Element, Layout, DragDropState, EmailTemplate } from '@/types/types'
import ButtonComponent from '../ElementComponents/ButtonComponent';


const ColumnLayout = ({item} : {item : Layout}) => {
    const [dragDrop, setDragDrop] = useState<DragDropState  >();
    const {dragDropLayout} = useDragDropLayout();
    const {setEmailTemplate} = useEmailTemplate();
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

  return (
    <div>
        <div
        style={{
            display : 'grid',
            gridTemplateColumns : `repeat(${item?.numOfCol}, 1fr)`,
      
        }}
        >
            {Array.from({length : item?.numOfCol}).map((_, index)=>(
                <div key={index} className={`p-2 flex items-center bg-gray-100 border-dashed border justify-center
                    ${dragDrop?.index == index && dragDrop?.columnId == item?.id ? 'bg-green-100' : ''}`}
                onDragOver={(event)=>onDragOverHandle(event,index)}
                onDrop={onDropHandle}
                >
                    {getElementComponent(item?.[index]) ?? "Drag Element Here"}
                </div>
            ))   }
        </div>
    </div>
  )
}

export default ColumnLayout