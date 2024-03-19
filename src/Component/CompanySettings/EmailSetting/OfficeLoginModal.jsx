import React, { useState } from "react";
import { Button } from "@mui/material";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { theme } from "../../../Theme/Theme";
import api from "../../../service/api";
import { toast } from "react-toastify";

const OfficeLoginModal = ({ showOfficeModal, setShowOfficeModal }) => {
  let userDatails = useSelector((state) => state.login.userDatails);

  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const handleClose = () => setShowOfficeModal(false);
  const handleOfficeLogin = async (e) => {
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
      const response = await api.post("/user/add/microsoft", payload);
      if (response.isSuccess) {
        toast.success(response.data);
        setShowOfficeModal(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("An error occurred during office login");
    }
  };

  return (
    <Modal
      show={showOfficeModal}
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
          Login with Office
        </Modal.Title>
        <form onSubmit={handleOfficeLogin}>
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
            <TfiMicrosoftAlt color="blue" fontSize={"1.5rem"} /> &nbsp; Login
            With Office
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default OfficeLoginModal;
