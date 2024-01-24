import React from "react";
import TextField from "@mui/material/TextField";

const Input = ({
  id,
  lebel,
  className,
  type,
  value,
  onchange,
  size,
  classnamelebal,
}) => {
  return (
    <>
      {/* <label
        style={{ letterSpacing: "1px" }}
        htmlFor={lebel}
        id={id}
        className={classnamelebal}
      >
        {lebel}
      </label> */}
      <TextField
        id={id}
        label={lebel}
        type={type}
        value={value}
        size={size}
        className={className}
        onChange={onchange}
      />
    </>
  );
};

export default Input;
