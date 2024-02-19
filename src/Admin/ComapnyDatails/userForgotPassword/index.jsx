import React, { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import api from "../../../service/api";

import { theme } from "../../../Theme/Theme";

const UserForgotPassword = ({ show, setShow, forgotUserId }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await api.post("/user/update", {
        id: forgotUserId,
        password: password,
      });
      if (response.isSuccess) {
        toast.success("Password updated successfully");
        setShow(false);
      } else {
        setError(response.response.data.message);
      }
    } catch (error) {
      setError("An error occurred while updating the password");
    }
  };

  const handleClose = () => setShow(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
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
            onSubmit={handleSubmit}
            sx={{
              "& > :not(style)": { width: "45ch" },
            }}
            autoComplete="off"
          >
            <div className="d-flex flex-column mb-4">
              <FormControl className="d-grid mb-2" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  New Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  label="Confirm Password"
                />
              </FormControl>
              {error && <p style={{ color: "red" }}>{error}</p>}
    
              <Button
                type="submit"
                variant="outlined"
                className="btn mt-3 fw-bold text-white "
                style={{
                  backgroundColor: `${theme.palette.primary.main}`,
                  letterSpacing: "2px",
                }}
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
