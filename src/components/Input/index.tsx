import React, {FC, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import "./style.css";

export interface IInputProps {
  className?: string;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (field: string, newValue: string) => void;
}

export const Input: FC<IInputProps> = ({
  className,
  type,
  name,
  label,
  placeholder,
  required,
  value,
  onChange,
}) => {
  const [text, setText] = useState(value || "");

  const id = useMemo(() => `${name}-${Math.floor(Math.random() * 10000)}`, [name]);

  useEffect(() => {
    setText(value || "");
  }, [value]);

  const onChangeValue = (newValue: string) => {
    setText(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
  };

  return (
    <div className={classNames("input-wrapper", className)}>
      {Boolean(label) && (
        <label htmlFor={id} data-testid="label">{label}</label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={text}
        onChange={(e) => onChangeValue(e.target.value)}
        data-testid="input"
      />
    </div>
  );
};
