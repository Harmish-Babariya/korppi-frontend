import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({
  variant,
  size,
  color,
  style,
  type,
  className,
  onClick,
  children,
}) => {
  return (
    <MuiButton
      variant={variant}
      size={size}
      color={color}
      style={style}
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
