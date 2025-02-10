import { Element } from '@/types/types';
import React from 'react'

type LogoHeaderComponentProps = Pick<Element, 'style' | 'imageUrl' | 'alt' | 'outerStyle'>;

const LogoHeader = ({style, imageUrl, alt, outerStyle} : LogoHeaderComponentProps) => {
  return (
    <div style={outerStyle}>
        <img src={imageUrl} alt={alt} style={style} />
    </div>
  )
}

export default LogoHeader