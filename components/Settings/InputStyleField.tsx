import React from 'react'
import { Input } from '../ui/input';
interface FieldProps {
    label: string;
    value?: string;
    onHandleStyleChange: (value: string) => void;
  }
const InputStyleField = ({label, value, onHandleStyleChange} : FieldProps) => {
    const formattedValue=(value : any)=>{
        if(typeof value === 'string'){
          return value.replace('px', '');
        }
    }
  return (
    <div>
        <label>{label}</label>
        <div className='flex items-center'>
        <Input className='text-black bg-white rounded-none rounded-l-md'  type="text" value={formattedValue(value)} onChange={(e)=>onHandleStyleChange(e.target.value + "px")}/>
        <h2 className='px-2 rounded-r-md bg-slate-800 py-2'>px</h2>
        </div>
    </div>
  )
}

export default InputStyleField