"use client"
import { useDragDropLayout, useEmailTemplate, useSelectedElement } from '@/app/editor/[templateId]/page';

import React, { ReactNode, useState } from 'react'
import { Element, Layout, DragDropState, EmailTemplate } from '@/types/types'
import ButtonComponent from '../ElementComponents/ButtonComponent';
import TextComponent from '../ElementComponents/TextComponent';
import ImageComponent from '../ElementComponents/ImageComponent';
import LogoComponent from '../ElementComponents/LogoComponent';
import LogoHeader from '../ElementComponents/LogoHeader';
import DividerComponent from '../ElementComponents/DividerComponent';
import SocialIconsComponent from '../ElementComponents/SocialIconsComponent';

const ColumnLayout = ({item} : {item : Layout}) => {
    const [dragDrop, setDragDrop] = useState<DragDropState>();
    const {dragDropLayout} = useDragDropLayout();
    const {setEmailTemplate} = useEmailTemplate();
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

    return (
        <div>
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${item?.numOfCol}, 1fr)`,
            }}
            >
                {Array.from({length: item?.numOfCol}).map((_, index) => (
                    <div 
                        key={index} 
                        className={`p-2 flex items-center
                            ${!item?.[index]?.type ? "bg-gray-100 border-dashed border" : ""}
                            justify-center cursor-pointer
                            ${(selectedElement?.item?.id == item?.id && selectedElement?.index == index )&& "border-blue-500 border-2 border-dashed"}
                            ${dragDrop?.index === index && 
                            dragDrop?.columnId === item?.id && 
                            !item?.[index]?.type ? 'bg-green-100' : ''}
                        `}
                        onDragOver={(event) => onDragOverHandle(event, index)}
                        onDrop={onDropHandle}
                        onClick={() => setSelectedElement({item : item, index : index})}
                    >
                        {getElementComponent(item?.[index]) ?? "Drag Element Here"}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ColumnLayout