import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../Component/Button";
import { useSelector } from "react-redux";
import { Card } from "reactstrap";
import { TextareaAutosize } from "@mui/material";
import { theme } from "../../../../Theme/Theme";
import Input from "../../../../Component/Input";
const EmailView = ({ show, setShow, emailData }) => {
  const handleClose = () => setShow(false);
  const userDatails = useSelector((state) => state.login.userDatails);

  return (
    <Modal
      className=" modal"
      size="lg"
      dialogClassName="modal-90w w-100"
      style={{ letterSpacing: "1.5px", marginTop: "40px" }}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-medium"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input
          id={"subject"}
          lebel={"Subject"}
          className={"w-75 mt-1"}
          type={"text"}
          value={emailData[0]?.subject}
          readOnly
        />
        <label htmlFor="email" className="mt-1 d-block">
          Email
        </label>
        <TextareaAutosize
          name=""
          id=""
          className="rounded-1"
          cols="65"
          rows="9"
          value={emailData[0]?.body}
          readOnly
        ></TextareaAutosize>
        <Card className="mb-1 w-50 p-3 bg-body-secondary">
          <span>
            <span className="fw-bold">Email</span> being generated as:
          </span>
          <span>{`${
            userDatails?.firstName + " " + userDatails?.lastName
          }`}</span>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default EmailView;
