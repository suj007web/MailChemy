import React from 'react';
import { Input } from '../ui/input';

interface InputFieldProps {
  label: string;
  value?: string;
  onHandleInputChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onHandleInputChange }) => {
  return (
    <div>
      <label>{label}</label>
      <Input 
        className='bg-white text-black'
        
        value={value || '#'}
        onChange={(e) => {
          return onHandleInputChange(e.target.value)}}
      />
    </div>
  );
};

export default InputField;