import React, { useState } from "react";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import Modal from "react-bootstrap/Modal";
import { theme } from "../../../Theme/Theme";
import { useSelector } from "react-redux";
import api from "../../../service/api";
import { toast } from "react-toastify";

const GoogleLoginModal = ({ showGoogleModal, setShowGoogleModal }) => {
  let userDatails = useSelector((state) => state.login.userDatails);

  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");

  const handleClose = () => setShowGoogleModal(false);

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    if (!email && !appPassword) {
      return toast.error("All Fields Requires!");
    }

    try {
      const payload = {
        email: email,
        userId: userDatails?._id,
        appPassword: appPassword,
      };
      const response = await api.post("/user/add/google", payload);
      if (response.isSuccess) {
        toast.success(response.data);
        setShowGoogleModal(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("An error occurred during Google login");
    }
  };

  return (
    <Modal
      show={showGoogleModal}
      onHide={handleClose}
      style={{ marginTop: "70px" }}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="mx-auto">
        <Modal.Title
          style={{
            color: `${theme.palette.primary.main}`,
            letterSpacing: "2px",
          }}
          className="text-center fw-bold fs-2"
        >
          Login with Google
        </Modal.Title>
        <form onSubmit={handleGoogleLogin}>
          <div className="mb-3">
            <label htmlFor="googleEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="googleEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="googleAppPassword" className="form-label">
              App Password
            </label>
            <input
              type="password"
              className="form-control"
              id="googleAppPassword"
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="outlined"
            className="btn mt-3 text-bg-light w-100"
            style={{
              backgroundColor: `${theme.palette.primary.main}`,
              letterSpacing: "2px",
            }}
          >
            <FcGoogle fontSize={"2.5rem"} /> &nbsp; Login With Google
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default GoogleLoginModal;
