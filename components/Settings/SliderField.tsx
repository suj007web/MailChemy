import React from 'react'
import { Slider } from '../ui/slider'

interface SliderFieldProps {
  label: string;
  value?: string;
  onHandleStyleChange: (value: string) => void;
  type? : string
}

const SliderField = ({label, value, onHandleStyleChange, type} : SliderFieldProps) => {
    const formattedValue=(value : any)=>{
        return Number(value.replace(type, ''));
    }
  return (
    <div className='bg-slate-800 p-3 rounded-md'>
        <label>{label}</label>
        <Slider defaultValue={[formattedValue(value)]}
        className='text-black bg-white rounded-none rounded-l-md'  min={0}
        max={100} step={1}
        onValueChange={(v)=>onHandleStyleChange(v.toString() + type)} />
    </div>
  )
}

export default SliderField