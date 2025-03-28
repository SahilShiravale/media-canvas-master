
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DimensionInputProps } from '@/types';

const DimensionInput: React.FC<DimensionInputProps> = ({ 
  label, 
  value, 
  onChange,
  min = 10,
  max = 2000
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="input-group">
      <Label htmlFor={label.toLowerCase()} className="input-label">{label}</Label>
      <Input
        type="number"
        id={label.toLowerCase()}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        className="bg-gray-800 border-gray-700 text-white"
      />
    </div>
  );
};

export default DimensionInput;
