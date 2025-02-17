import React from 'react'
import { Input } from '../ui/input';

interface ImagePreviewProps {
    label: string;
    value?: string;
    onHandleInputChange: (value: string) => void;
}

const ImagePreview = ({label, value, onHandleInputChange} : ImagePreviewProps) => {
  return (
    <div>
        <label>{label}</label>
        <img src={value} alt='image' className='w-full h-[150px] object-cover mb-2'/>
        <Input value={value} className='bg-white text-black' onChange={(e) => onHandleInputChange(e.target.value)} />
    </div>
  )
}

export default ImagePreview