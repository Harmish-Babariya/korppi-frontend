import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import Input from "../../Input";
const EmailLoginModal = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SMPTServer, setSMPTServer] = useState("");
  const [SMPTPort, setSMPTPort] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, SMPTServer, SMPTPort);
  };
  const handleClose = () => setShow(false);

  return (
    <>
      {" "}
      <Modal show={show} onHide={handleClose} style={{ marginTop: "70px" }}>
        <Modal.Header className="" closeButton></Modal.Header>
        <Modal.Body className="mx-auto ">
          <Modal.Title
            style={{ color: "#84A889", letterSpacing: "2px" }}
            className="text-center fw-bold fs-2"
          >
            Login
          </Modal.Title>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "45ch" },
            }}
            autoComplete="off"
          >
            <div className="d-flex flex-column mb-4">
              <Input
                id={"email"}
                lebel={"Email"}
                className={"mb-2"}
                type={"email"}
                value={email}
                onchange={(e) => setEmail(e.target.value)}
                size={"small"}
                classnamelebal={"mb-1.5 fs-6 fw-medium"}
              />

              <Input
                id={"password"}
                lebel={"Password"}
                className={"mb-2"}
                type={"password"}
                value={password}
                onchange={(e) => setPassword(e.target.value)}
                size={"small"}
                classnamelebal={"mb-1.5 fs-6 fw-medium"}
              />
              <Input
                id={"SMPT Server"}
                lebel={"SMPT Server"}
                className={"mb-2"}
                type={"text"}
                value={SMPTServer}
                onchange={(e) => setSMPTServer(e.target.value)}
                size={"small"}
                classnamelebal={"mb-1.5 fs-6 fw-medium"}
              />

              <Input
                id={"SMPT port"}
                lebel={"SMPT Port"}
                className={"mb-2"}
                type={"text"}
                value={SMPTPort}
                onchange={(e) => setSMPTPort(e.target.value)}
                size={"small"}
                classnamelebal={"mb-1.5 fs-6 fw-medium"}
              />

              <Button
                type="submit"
                variant="outlined"
                className="btn mt-3 fw-bold text-white "
                style={{ backgroundColor: "#84A889", letterSpacing: "2px" }}
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
            </div>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmailLoginModal;
