import React from "react";
import TextField from "@mui/material/TextField";

const Input = ({
  id,
  lebel,
  className,
  type,
  value,
  onBlur,
  onChange,
  size,
  name,
  disabled
}) => {
  return (
    <>
      <TextField
        id={id}
        label={lebel}
        name={name}
        type={type}
        value={value}
        size={size}
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled || false}
      />
    </>
  );
};

export default Input;
