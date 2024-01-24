import React, { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import {
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  TextField,
  FormControl,
} from "@mui/material";
import { theme } from "../../../Theme/Theme";
const UserForgotPassword = ({ show, setShow }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
  };
  const handleClose = () => setShow(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {" "}
      <Modal show={show} onHide={handleClose} style={{ marginTop: "70px" }}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="mx-auto ">
          <Modal.Title
            style={{
              color: `${theme.palette.primary.main}`,
              letterSpacing: "2px",
            }}
            className="text-center fw-bold fs-3 mb-3"
          >
          Forgot Password
          </Modal.Title>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "45ch" },
            }}
            autoComplete="off"
          >
            <div className="d-flex flex-column mb-4">
              <FormControl className="d-grid mb-2" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  New Password{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  // value={formik.values.password}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl className="d-grid mb-2" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  // value={formik.values.password}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Button
                type="submit"
                variant="outlined"
                className="btn mt-3 fw-bold text-white "
                style={{
                  backgroundColor: `${theme.palette.primary.main}`,
                  letterSpacing: "2px",
                }}
                // onClick={(e) => handleSubmit(e)}
              >
                Save
              </Button>
            </div>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserForgotPassword;
