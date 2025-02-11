import { Element } from '@/types/types';
import React from 'react'
type TextComponentProps = Pick<Element, 'style' | 'textarea' >;
const TextComponent = ({style, textarea} : TextComponentProps) => {
  return (
    <div className='w-full'>
        <h2 style={style}>{textarea}</h2>
    </div>
  )
}

export default TextComponent