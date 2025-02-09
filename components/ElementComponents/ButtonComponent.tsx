import { Element } from '@/types/types';
import React from 'react'
type ButtonComponentProps = Pick<Element, 'style' | 'content' | 'url'>;
const ButtonComponent = ({style, content, url} : ButtonComponentProps) => {
  return (
    <div>
      <a href={url} target='_black'>
      <button style={style}>{content}</button>
      </a>
    </div>
  )
}

export default ButtonComponent