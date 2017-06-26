import * as React from "react";

interface ISelectProps {
  css?: any;
  options: {
    value: string;
    label: string;
  }[];
  selection: string;
  onChange: (value: string) => void;
}

const Select = ({ css, options, selection, onChange }: ISelectProps) => {
  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value);
  };

  const items = options.map(option => {
    return (
      <option value={option.value} selected={option.value === selection}>
        {option.label}
      </option>
    );
  });

  return (
    <div className="pt-select pt-inline" {...css}>
      <select onChange={handleChange}>
        {items}
      </select>
    </div>
  );
};

export default Select;
