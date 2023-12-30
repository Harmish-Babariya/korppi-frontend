import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import { RiCustomerServiceLine } from "react-icons/ri";
import { BiLogoPeriscope } from "react-icons/bi";
import { DiCoda } from "react-icons/di";

import Input from "../../Input";
const CompanyEditService = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <div>
      <div className="modal-background"></div>{" "}
      <Modal
        style={{ marginTop: "150px", width: "900px", marginLeft: "312px" }}
        className=" bg-opacity-100"
        size="lg"
        dialogClassName="modal-100w"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header style={{ backgroundColor: "#84A889" }} closeButton>
          <Modal.Title className="fw-medium text-white">
            Company Edit Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Tab.Container id="left-tabs-example" defaultActiveKey="email">
            <Row>
              <Col sm={3} className="border-end">
                <Nav className="flex-column">
                  <Nav.Item
                    style={{
                      margin: "5px",
                      backgroundColor: "#A2C2BF",
                      borderRadius: "7px",
                    }}
                  >
                    <Nav.Link
                      style={{
                        backgroundColor: "#84A889",
                        borderRadius: "10px",
                      }}
                      className={`text-white fw-medium `}
                      eventKey="email"
                    >
                      <RiCustomerServiceLine /> Servise
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    style={{
                      margin: "5px",
                      backgroundColor: "#84A889",
                      borderRadius: "7px",
                    }}
                  >
                    <Nav.Link
                      className={`text-white fw-medium `}
                      eventKey="feature"
                    >
                      <BiLogoPeriscope /> Features
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    style={{
                      margin: "5px",
                      backgroundColor: "#84A889",
                      borderRadius: "7px",
                    }}
                  >
                    <Nav.Link
                      className={`text-white fw-medium `}
                      eventKey="benefits"
                    >
                      <DiCoda />
                      Benefits
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="email">
                    <div className="d-flex flex-column m-2">
                      <Input
                        id={"service"}
                        lebel={"Servise Name"}
                        className={""}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-1"}
                      />

                      <Input
                        id={"price"}
                        lebel={"Price"}
                        className={""}
                        type={"number"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      <Input
                        id={"offers"}
                        lebel={"Offers"}
                        className={""}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                    </div>
                    <button
                      style={{
                        margin: "5px",
                        padding: "8px ",
                        backgroundColor: "#84A889",
                        borderRadius: "7px",
                      }}
                      className="ms-2 border-0 text-white"
                    >
                      Back
                    </button>
                    <button
                      style={{
                        margin: "5px",
                        padding: "8px ",
                        backgroundColor: "#84A889",
                        borderRadius: "7px",
                      }}
                      className="ms-2 border-0 text-white"
                    >
                      Next
                    </button>
                  </Tab.Pane>
                  <Tab.Pane eventKey="feature">
                    <div className="d-flex flex-column m-2">
                      <Input
                        id={"feature1"}
                        lebel={"Feature1"}
                        className={""}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-1"}
                      />

                      <Input
                        id={"feature2"}
                        lebel={"Feature2"}
                        className={""}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      <Input
                        id={"feature3"}
                        lebel={"Feature3"}
                        className={""}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                    </div>
                    <button
                      style={{
                        margin: "5px",
                        padding: "8px ",
                        backgroundColor: "#84A889",
                        borderRadius: "7px",
                      }}
                      className="ms-2 border-0 text-white"
                    >
                      Add Feature
                    </button>
                    <button
                      style={{
                        margin: "5px",
                        padding: "8px ",
                        backgroundColor: "#84A889",
                        borderRadius: "7px",
                      }}
                      className="ms-2 border-0 text-white"
                    >
                      Next
                    </button>
                  </Tab.Pane>
                  <Tab.Pane eventKey="benefits">
                    <div className="d-flex flex-column m-2">
                      <Input
                        id={"benefits1"}
                        lebel={"Benefits1"}
                        className={""}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-1"}
                      />

                      <Input
                        id={"benefits2"}
                        lebel={"Benefits2"}
                        className={""}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      <Input
                        id={"benefits3"}
                        lebel={"Benefits3"}
                        className={""}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                    </div>
                    <button
                      style={{
                        margin: "5px",
                        padding: "8px ",
                        backgroundColor: "#84A889",
                        borderRadius: "7px",
                      }}
                      className="ms-2 border-0 text-white"
                    >
                      Add benefit
                    </button>
                    <button
                      style={{
                        margin: "5px",
                        padding: "8px ",
                        backgroundColor: "#84A889",
                        borderRadius: "7px",
                      }}
                      className="ms-2 border-0 text-white"
                    >
                      Save & Close
                    </button>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer className="bg-body-secondary">
          <Button
            variant=""
            style={{ backgroundColor: "#84A889", color: "white" }}
            onClick={handleClose}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyEditService;
