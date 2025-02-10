import { Element } from '@/types/types';
import React from 'react'

type LogoComponentProps = Pick<Element, 'style' | 'imageUrl' | 'alt' | 'outerStyle' >;
const LogoComponent = ({style, imageUrl, alt, outerStyle} : LogoComponentProps) => {
  return (
    <div style={outerStyle}>
        <img src={imageUrl} alt={alt} style={style} />
    </div>
  )
}

export default LogoComponent