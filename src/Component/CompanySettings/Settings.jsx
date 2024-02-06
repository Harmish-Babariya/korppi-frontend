import { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import MailIcon from "@mui/icons-material/Mail";
import BusinessIcon from "@mui/icons-material/Business";
import EmailSetting from "./EmailSetting/EmailSetting";
import CompanySetting from "./CompanySetting/CompanySetting";
import { theme } from "../../Theme/Theme";

function Settings({ show, setShow }) {
  const [value, setValue] = useState("User Profile Email Setting");
  const [email, setEmail] = useState(true);
  const [company, setCompany] = useState(false);
  const handleClose = () => setShow(false);

  const handleEmail = () => {
    setValue("User Profile Email Setting");
    setCompany(false);
    setEmail(true);
  };

  const handleCompany = () => {
    setValue("Company Setting");
    setEmail(false);
    setCompany(true);
  };

  return (
    <div>
      <Modal
        className="mt-5"
        size="lg"
        dialogClassName="modal-90w w-100"
        style={{ letterSpacing: "1.5px" }}
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
                      letterSpacing: "2px",
                    }}
                  >
                    <Nav.Link
                      onClick={() => handleEmail()}
                      style={{ borderRadius: "8px" }}
                      className={`${
                        email
                          ? "bg-body-secondary text-black fw-medium "
                          : "text-black fw-medium "
                      } `}
                      eventKey="email"
                    >
                      <MailIcon /> Email
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    style={{
                      letterSpacing: "1px",
                    }}
                  >
                    <Nav.Link
                      onClick={() => handleCompany()} 
                      style={{ borderRadius: "8px" }}
                      className={`${
                        company
                          ? "bg-body-secondary text-black fw-medium "
                          : "text-black fw-medium"
                      } `}
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
        {/* <Modal.Footer>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="outlined"
              className="ms-1"
              sx={{
                color: `${theme.palette.primary.main}`,
              }}
              onClick={handleClose}
            >
              Save Changes
            </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default Settings;
