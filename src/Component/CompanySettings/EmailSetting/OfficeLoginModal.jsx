import React from "react";
import { Button } from "@mui/material";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import Modal from "react-bootstrap/Modal";
import { theme } from "../../../Theme/Theme";

const OfficeLoginModal = ({ show, handleClose }) => {
  const handleOfficeLogin = () => {
    // Add logic for Office login
  };

  return (
    <Modal show={show} onHide={handleClose}>
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
        <Button
          variant="outlined"
          className="btn mt-3 text-bg-light w-100"
          style={{
            backgroundColor: `${theme.palette.primary.main}`,
            letterSpacing: "2px",
          }}
          onClick={handleOfficeLogin}
        >
          <TfiMicrosoftAlt color="blue" fontSize={"1.5rem"} /> &nbsp; Login With Office
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default OfficeLoginModal;
