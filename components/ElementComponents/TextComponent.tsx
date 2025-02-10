import { Element } from '@/types/types';
import React from 'react'
type TextComponentProps = Pick<Element, 'style' | 'content' >;
const TextComponent = ({style, content} : TextComponentProps) => {
  return (
    <div >
        <h2 style={style}>{content}</h2>
    </div>
  )
}

export default TextComponent