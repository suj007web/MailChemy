import React from 'react'
import { Textarea } from '../ui/textarea';

interface TextAreaFieldProps {
  label: string;
  value?: string;
  onHandleInputChange: (value: string) => void;
}

const TextAreaField = ({label, value, onHandleInputChange} : TextAreaFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <Textarea
      className='bg-white text-black'
      value={value}
      onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  )
}

export default TextAreaField