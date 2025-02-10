import { Element } from '@/types/types';
import React from 'react'
type DividerComponentProps = Pick<Element, 'style' >;
const DividerComponent = ({style} : DividerComponentProps) => {
  return (
   
        <hr style={style}/>

  )
}

export default DividerComponent