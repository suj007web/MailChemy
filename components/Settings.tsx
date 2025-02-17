"use client";
import { useSelectedElement } from '@/app/editor/[templateId]/page'
import React, { useEffect, useState } from 'react'
import InputField from './Settings/InputField';
import { Element, SelectedElement } from '@/types/types';
import { Color } from 'ogl';
import ColorPickerField from './Settings/ColorPickerField';
import InputStyleField from './Settings/InputStyleField';
import SliderField from './Settings/SliderField';
import TextAreaField from './Settings/TextAreaField';
import ToggleGroupField from './Settings/ToggleGroupField';
import { AlignCenter, AlignLeft, AlignRight, Ban, CaseLower, CaseSensitive, CaseUpper } from 'lucide-react';
import DropDownField from './Settings/DropDownField';
import ImagePreview from './Settings/ImagePreview';

const textAlignOptions = [
  {
    value : 'left',
    icon : AlignLeft
  },
  {
    value : 'center',
    icon : AlignCenter
  },
  {
    value : 'right',
    icon : AlignRight
  }
] 

const textTransformOptions = [
  {
    value : 'uppercase',
    icon : CaseUpper
  },
  {
    value : 'lowercase',
    icon : CaseLower
  },
  {
    value : 'capitalize',
    icon : CaseSensitive
  },
  {
    value : 'none',
    icon : Ban
  }
]

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
  const onHandleOuterStyleChange = (fieldName:string, fieldValue : string)=>{
    let updatedElement = {
      ...selectedElement,
      item : {
        ...selectedElement?.item,
        [selectedElement?.index as number] : {
          ...selectedElement?.item?.[selectedElement?.index as number],
          outerStyle : {
        
            ...selectedElement?.item?.[selectedElement?.index as number]?.outerStyle,
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
        
          element?.imageUrl  && <ImagePreview label={'Preview'} value={element?.imageUrl} onHandleInputChange={(value:string)=>{onHandleInputChange('imageUrl', value)}}/>
      }
      {
        
          element?.content  && <InputField label={'Content'} value={element?.content} onHandleInputChange={(value:string)=>{onHandleInputChange('content', value)}}/>
      }
      {
        
          element?.textarea  && <TextAreaField label={'Text Content'} value={element?.textarea} onHandleInputChange={(value:string)=>{onHandleInputChange('textarea', value)}}/>
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
        element?.style?.margin &&
        <InputStyleField label={'Margin'} value={element?.style?.margin} onHandleStyleChange={(value)=>onHandleStyleChange('margin', value)}/>
      }
      {
        element?.style?.borderRadius &&
        <SliderField label={'Border Radius'} type='%' value={element?.style?.borderRadius} onHandleStyleChange={(value:any)=>onHandleStyleChange('borderRadius', value)}/>
      }
      {
        element?.style?.width &&
        <SliderField label={'Width'} type='%' value={element?.style?.width as string} onHandleStyleChange={(value:any)=>onHandleStyleChange('width', value)}/>
      }
      {
        element?.style?.fontWeight &&
        <DropDownField label={'Font Weight'}  value={element?.style?.fontWeight as string} onHandleStyleChange={(value:any)=>onHandleStyleChange('fontWeight', value)}
        options={['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']}
        
        />
      }
      {
        element?.style?.textAlign &&
        <ToggleGroupField label={'Text Align'} 
        value={element?.style?.textTransform as string} 
        onHandleStyleChange={(value:any)=>onHandleStyleChange('textAlign', value)}
        options={textAlignOptions}
        />
      }
      {
        element?.style?.textTransform &&
        <ToggleGroupField label={'Text Transform'} 
        value={element?.style?.textTransform as string} 
        onHandleStyleChange={(value:any)=>onHandleStyleChange('textTransform', value)}
        options={textTransformOptions}
        />
      }
      <div className=''>
      <h2 className='font-semibold text-xl'>Outer Style</h2>
      {
        element?.outerStyle?.backgroundColor &&
        <ColorPickerField label={'Outer Background Color'} value={element?.outerStyle?.backgroundColor}
        onHandleStyleChange={(value:any)=>onHandleOuterStyleChange('backgroundColor', value)}
        />
      }
      {
        element?.outerStyle?.justifyContent &&
        <ToggleGroupField label={'Outer Alignment'} value={element?.outerStyle?.justifyContent}
        onHandleStyleChange={(value:any)=>onHandleOuterStyleChange('justifyContent', value)}
        options={textAlignOptions}
        />
      }
      </div>
    </div>
  )
}

export default Settings