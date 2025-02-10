import { Element } from '@/types/types';
import React from 'react'
type ButtonComponentProps = Pick<Element, 'style' | 'content' | 'url' | 'outerStyle'>;
const ButtonComponent = ({style, content, url, outerStyle} : ButtonComponentProps) => {
  return (
    <div>
      <a href={url} target='_black' style={outerStyle} >
      <button style={style}>{content}</button>
      </a>
    </div>
  )
}

export default ButtonComponent