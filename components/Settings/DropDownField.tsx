import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DropDownFieldProps {
  label: string;
  value?: string;
  onHandleStyleChange: (value: string) => void;
  options: any;
}

const DropDownField = ({
  label,
  value,
  onHandleStyleChange,
  options,
}: DropDownFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <Select

      onValueChange={(v) => onHandleStyleChange(v)}
      defaultValue={value}
      >
        <SelectTrigger className="w-full bg-white text-black">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any, index: number) => (
            <SelectItem
              key={index}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownField;
