import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import MailIcon from "@mui/icons-material/Mail";
import BusinessIcon from "@mui/icons-material/Business";
import EmailSetting from "./EmailSetting/EmailSetting";
import CompanySetting from "./CompanySetting/CompanySetting";
function Settings({ show, setShow }) {
  const [value, setValue] = useState("User Profile Email Setting");

  const handleClose = () => setShow(false);
  return (
    <div className="">
      <Modal
        className="mt-5 mb-5 "
        size="lg"
        dialogClassName="modal-90w w-100"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-medium">{value}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container id="left-tabs-example" defaultActiveKey="email">
            <Row>
              <Col sm={3} className="border-end">
                <Nav className="flex-column">
                  <Nav.Item
                    style={{
                      margin: "5px",
                      backgroundColor: "#81ACA8",
                      borderRadius: "7px",
                      letterSpacing: "1px",
                    }}
                  >
                    <Nav.Link
                      onClick={() => setValue("User Profile Email Setting")}
                      style={{
                        backgroundColor: "#84A889",
                        borderRadius: "10px",
                      }}
                      className={`text-white fw-medium ${
                        value === "User Profile Email Setting"
                          ? "active fs-6 "
                          : ""
                      }`}
                      eventKey="email"
                    >
                      <MailIcon /> Email
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    style={{
                      margin: "5px",
                      backgroundColor: "#84A889",
                      borderRadius: "7px",
                      letterSpacing: "1px",
                    }}
                  >
                    <Nav.Link
                      onClick={() => setValue("Company Setting")}
                      className={`text-white fw-medium ${
                        value === "Company Setting" ? "active  rounded" : ""
                      }`}
                      eventKey="company"
                    >
                      <BusinessIcon /> Company
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="email">
                    <h4>Personal</h4>
                    <EmailSetting />
                  </Tab.Pane>
                  <Tab.Pane eventKey="company">
                    <h2>Company</h2>
                    <CompanySetting />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant=""
            style={{ backgroundColor: "#81ACA8", color: "white" }}
            onClick={handleClose}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Settings;
