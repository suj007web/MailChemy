import React, { ForwardRefExoticComponent } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { LucideProps } from 'lucide-react';

interface ToggleGroupFieldProps {
  label: string;
  value?: string;
  onHandleStyleChange: (value: string) => void;
  options : any;
}

const ToggleGroupField = ({
  label,
  value,
  onHandleStyleChange,
  options
}: ToggleGroupFieldProps) => {
  return (
    <div >
      <label>{label}</label>
      <ToggleGroup type="single"
      
      defaultValue={value}
      onValueChange={(v) => onHandleStyleChange(v)}
      >
        {options.map((option:any, index:number) => (
             <ToggleGroupItem className='w-full' value={option?.value as string} key={index}>
                <option.icon/>
             </ToggleGroupItem>
        ))}
       

      </ToggleGroup>
    </div>
  );
};

export default ToggleGroupField;
