import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "@mui/material";
import { theme } from "../../Theme/Theme";
import Input from "../../Component/Input";
import {
  Row,
  Col,
} from "reactstrap";
const CreateCompany = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal
      className="mt-5 mb-5 "
      size="lg"
      dialogClassName="modal-100w w-100"
      style={{ letterSpacing: "1px" }}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-medium">Create Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="pr-1 d-flex flex-column" md="5">
            <Input
              id={"Industry_id"}
              lebel={"Industry_Id"}
              className={""}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />
          </Col>
          <Col className="" md="3">
            <Input
              id={"size"}
              lebel={"Size"}
              className={""}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />
          </Col>
          <Col className="pl-" md="4">
            <Input
              id={"revenue"}
              lebel={"Revenue"}
              className={""}
              type={"email"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />{" "}
          </Col>
        </Row>
        <Row>
          <Col className="pr-1 d-flex flex-column" md="4">
            <Input
              id={"region"}
              lebel={"Region"}
              className={""}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />
          </Col>
          <Col className="" md="4">
            <Input
              id={"country"}
              lebel={"Country"}
              className={""}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />
          </Col>
          <Col className="pl-" md="4">
            <Input
              id={"postal_code"}
              lebel={"Postal_code"}
              className={""}
              type={"email"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />{" "}
          </Col>
        </Row>
        <Row>
          <Col className="pr-1 d-flex flex-column" md="4">
            <Input
              id={"linkedin_url"}
              lebel={"linkedin_url"}
              className={""}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />
          </Col>
          <Col className="" md="3">
            <Input
              id={"linkedin_about"}
              lebel={"linkedin_about"}
              className={""}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />
          </Col>
          <Col className="pl-" md="5">
            <Input
              id={"linkedin_post"}
              lebel={"linkedin_post"}
              className={""}
              type={"email"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />{" "}
          </Col>
        </Row>
    
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="contained"
          className="ms-1 text-white"
          sx={{
            color: `${theme.palette.primary.main}`,
          }}
          onClick={handleClose}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCompany;
