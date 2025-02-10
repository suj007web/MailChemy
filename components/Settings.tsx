"use client";
import { useSelectedElement } from '@/app/editor/[templateId]/page'
import React, { useEffect, useState } from 'react'
import InputField from './Settings/InputField';
import { Element, SelectedElement } from '@/types/types';
import { Color } from 'ogl';
import ColorPickerField from './Settings/ColorPickerField';
import InputStyleField from './Settings/InputStyleField';
import SliderField from './Settings/SliderField';

const Settings = () => {
  const {selectedElement , setSelectedElement} = useSelectedElement();
  const [element, setElement] = useState<Element | undefined>();

  const onHandleInputChange = (fieldName: string, value:string)=>{
    //copy
    
    const updatedData = {...selectedElement};
    //update specific field
    
       //@ts-expect-error : may not give error everything is handled
      updatedData.item[selectedElement.index][fieldName]  = value;


    //update original 
    setSelectedElement(updatedData as SelectedElement)
  
  }
  const onHandleStyleChange = (fieldName:string, fieldValue : string)=>{
    let updatedElement = {
      ...selectedElement,
      item : {
        ...selectedElement?.item,
        [selectedElement?.index as number] : {
          ...selectedElement?.item?.[selectedElement?.index as number],
          style : {
             //@ts-expect-error : may not give error everything is handled
            ...selectedElement?.item?.[selectedElement?.index as number].style,
            [fieldName] : fieldValue
          }
      }
    }
  }
  setSelectedElement(updatedElement as SelectedElement)
}

  useEffect(()=>{
    setElement(selectedElement?.item?.[selectedElement.index])
  },[selectedElement])
  return (
    <div className='p-5 flex flex-col gap-5'>
      <h2 className='font-bold text-2xl'>Settings</h2>
      {
        
          element?.content  && <InputField label={'Content'} value={element?.content} onHandleInputChange={(value:string)=>{onHandleInputChange('content', value)}}/>
      }
      {
          element?.url && <InputField label={'Url'} value={element?.url} onHandleInputChange={(value:string)=>{onHandleInputChange('url', value)}}/>
      }
      {
        element?.style?.backgroundColor && 
        <ColorPickerField label={'Background Color'} value={element?.style?.backgroundColor}
        onHandleStyleChange = {(value:any)=> onHandleStyleChange('backgroundColor', value)}
        />
      }
      {
        element?.style?.color && 
        <ColorPickerField label={'Text Color'} value={element?.style?.color}
        onHandleStyleChange = {(value:any)=> onHandleStyleChange('color', value)}
        />
      }
      {
        element?.style?.fontSize &&
        <InputStyleField label={'Font Size'} value={element?.style?.fontSize} onHandleStyleChange={(value)=>onHandleStyleChange('fontSize', value)}/>
      }
      {
        element?.style?.padding &&
        <InputStyleField label={'Padding'} value={element?.style?.padding} onHandleStyleChange={(value)=>onHandleStyleChange('padding', value)}/>
      }
      {
        element?.style?.borderRadius &&
        <SliderField label={'Border Radius'} type='px' value={element?.style?.borderRadius} onHandleStyleChange={(value:any)=>onHandleStyleChange('borderRadius', value)}/>
      }
      {
        element?.style?.width &&
        <SliderField label={'Width'} type='%' value={element?.style?.width as string} onHandleStyleChange={(value:any)=>onHandleStyleChange('width', value)}/>
      }
    </div>
  )
}

export default Settings