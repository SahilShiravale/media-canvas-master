
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TimeInputProps } from '@/types';

const TimeInput: React.FC<TimeInputProps> = ({ 
  label, 
  value, 
  onChange,
  min = 0,
  max = 300 // 5 minutes max
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
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
        step="0.1"
        className="bg-gray-800 border-gray-700 text-white"
      />
    </div>
  );
};

export default TimeInput;
