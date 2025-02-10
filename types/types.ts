import { LucideProps } from "lucide-react";
import { CSSProperties, ForwardRefExoticComponent, RefAttributes } from "react";


interface BaseItem {
    id?: string | number;
    label: string;
    type: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  }
  

  interface ElementStyle extends CSSProperties {
    backgroundColor?: string;
    color?: string;
    padding?: string;
    width?: string | number;
    height?: string | number;
    textAlign?: 'left' | 'center' | 'right';
    fontSize?: string;
    fontWeight?: string | number;
    borderRadius?: string;
    margin?: string;
    // textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
 
  }
  
  interface OuterStyle {
    display?: string;
    justifyContent?: string;
    alignItems?: string;
    width?: string;
    backgroundColor?: string;
    gap?: number;
  }
  

  interface SocialIcon {
    icon: string;
    url: string;
  }
  

  export interface Element extends BaseItem {
    type: 'Button' | 'Text' | 'Image' | 'Logo' | 'LogoHeader' | 'Divider' | 'SocialIcons';
    content?: string;
    textarea?: string;
    imageUrl?: string;
    alt?: string;
    url?: string;
    style: ElementStyle;
    outerStyle?: OuterStyle;
    socialIcons?: SocialIcon[];
    options?: SocialIcon[];
    [key: string]: any;
  }
  

  export interface Layout extends BaseItem {
    type: 'column';
    numOfCol: number;
    [key: number]: Element | undefined; 
  }
  

  export type EmailTemplate = (Layout | Element)[];
  
  export type SelectedElement = {
    item : Layout;
    index: number;
  }

  export interface EmailTemplateContextType {
    emailTemplate: EmailTemplate;
    setEmailTemplate: React.Dispatch<React.SetStateAction<EmailTemplate>>;
  }
  
  export interface DragDropLayoutContextType {
    dragDropLayout: Layout | Element | undefined;
    setDragDropLayout: React.Dispatch<React.SetStateAction<Layout | Element | undefined>>;
  }
  
  export interface ScreenSizeContextType {
    screenSize: 'desktop' | 'mobile';
    setScreenSize: React.Dispatch<React.SetStateAction<'desktop' | 'mobile'>>;
  }
  
  export interface SelectedElementContextType {
    selectedElement:SelectedElement | undefined;
    setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElement | undefined>>;
  }
  export interface ColumnLayoutProps {
    item: Layout;
  }
  
  export interface DragDropState {
    index: number;
    columnId: string | number | undefined;
  }
  

  export const isLayout = (item: Layout | Element): item is Layout => {
    return item.type === 'column';
  };
  
  export const isElement = (item: Layout | Element): item is Element => {
    return 'style' in item;
  };