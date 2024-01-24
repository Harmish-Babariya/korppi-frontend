import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "@mui/material";
import { theme } from "../../../Theme/Theme";
import Input from "../../../Component/Input";
import { Row, Col } from "reactstrap";
const CreateUser = ({ showUser, setShowUser }) => {
  const handleClose = () => setShowUser(false);

  return (
    <Modal
      className="mt-5 mb-5 "
      size="lg"
      dialogClassName="modal-100w w-100"
      style={{ letterSpacing: "1px" }}
      show={showUser}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-medium">Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="pr-1 d-flex flex-column" md="5">
            <Input
              id={"first_name"}
              lebel={"First Name"}
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
              id={"last_name"}
              lebel={"Last Name"}
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
              id={"role"}
              lebel={"Role"}
              className={""}
              type={"text"}
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
              id={"email"}
              lebel={"Email"}
              className={""}
              type={"email"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />
          </Col>
          <Col className="" md="4">
            <Input
              id={"phone"}
              lebel={"Phone"}
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
              id={"company_id"}
              lebel={"Company Id"}
              className={""}
              type={"text"}
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
              lebel={"Linkedin Url"}
              className={""}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-2"}
            />
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

export default CreateUser;
