import { Element } from '@/types/types';
import React from 'react'
type SocialIconsComponentProps = Pick<Element, 'socialIcons' | 'style' | 'outerStyle'>;
const SocialIconsComponent = ({socialIcons, style, outerStyle} : SocialIconsComponentProps) => {
  return (
    <div style={outerStyle}>
        <a href={socialIcons && socialIcons[0].url} target='_blank'>
        <img src={socialIcons && socialIcons[0].icon} alt="" style={style} />
        </a>
        <a href={socialIcons && socialIcons[1].url} target='_blank'>
        <img src={socialIcons && socialIcons[1].icon} alt="" style={style} />
        </a>
        <a href={socialIcons && socialIcons[2].url} target='_blank'>
        <img src={socialIcons && socialIcons[2].icon} alt="" style={style} />
        </a>
        
    </div>
  )
}

export default SocialIconsComponent