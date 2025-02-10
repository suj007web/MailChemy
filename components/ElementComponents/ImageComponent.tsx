import { Element } from '@/types/types';
import React from 'react'

type ImageComponentProps = Pick<Element, 'style'  | 'outerStyle' | 'alt' | 'url' | 'imageUrl'>;
const ImageComponent = ({style,  outerStyle, alt, imageUrl } : ImageComponentProps ) => {
  return (
    <div style={outerStyle}>
        <img src={imageUrl} alt={alt} style={style}/>
    </div>
  )
}

export default ImageComponent