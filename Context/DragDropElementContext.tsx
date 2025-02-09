
import {createContext} from 'react'

import { DragDropLayoutContextType } from '@/types/types';

export const DragDropLayoutContext = createContext<DragDropLayoutContextType>({
    dragDropLayout: undefined,
    setDragDropLayout: ()=>{}
})