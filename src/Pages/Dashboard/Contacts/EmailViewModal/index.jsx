import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../Component/Button";
import { useSelector } from "react-redux";
import { Card } from "reactstrap";
import { theme } from "../../../../Theme/Theme";
import Input from "../../../../Component/Input";
const EmailView = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const userDatails = useSelector((state) => state.login.userDatails);

  return (
    <Modal
      className=" modal"
      size="xl"
      dialogClassName="modal-90w w-100"
      style={{ letterSpacing: "1.5px", marginTop: "40px" }}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-medium"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="subject" className=" d-block mt-2">
          Subject
        </label>
        <Input
          id={"subject"}
          lebel={"Subject"}
          className={"w-75 mt-1"}
          type={"text"}
        />
        <label htmlFor="email" className="mt-1 d-block">
          Email
        </label>
        <textarea
          name=""
          id=""
          className="rounded-1"
          cols="92"
          rows="8"
        ></textarea>
        <Card className="mb-1 w-25 p-3 bg-body-secondary">
          <span>
            <span className="fw-bold">Email</span> being generated as:
          </span>
          <span>{`${
            userDatails?.firstName + " " + userDatails?.lastName
          }`}</span>
        </Card>
        <div className="d-flex justify-content-end mt-3 me-5">
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outlined"
            className="ms-1"
            style={{
              color: `${theme.palette.primary.main}`,
            }}
            onClick={handleClose}
          >
            Save Changes
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EmailView;
