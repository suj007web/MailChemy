import React from 'react'
interface ColorFieldProps {
    label: string;
    value?: string;
    onHandleStyleChange: (value: string) => void;
  }
const ColorPickerField = ({label, value, onHandleStyleChange} : ColorFieldProps) => {
  return (
    <div className='flex flex-col gap-2'>
        <label>{label}</label>
        <input type='color' value={value} onChange={(e)=>onHandleStyleChange(e.target.value)} />
    </div>
  )
}

export default ColorPickerField