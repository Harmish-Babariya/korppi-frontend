import { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import { RiCustomerServiceLine } from "react-icons/ri";
import { BiLogoPeriscope } from "react-icons/bi";
import { DiCoda } from "react-icons/di";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";
const CompanyEditService = ({ show, setShow }) => {
  const [service, setService] = useState(true);
  const [features, setFeatures] = useState(false);
  const [benefits, setBenefits] = useState(false);

  const handleClose = () => setShow(false);
  const handleService = () => {
    setFeatures(false);
    setBenefits(false);
    setService(true);
  };
  const handleFeatures = () => {
    setBenefits(false);
    setService(false);
    setFeatures(true);
  };
  const handleBenefits = () => {
    setFeatures(false);
    setService(false);
    setBenefits(true);
  };
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
        <Modal.Header closeButton>
          <Modal.Title className="fw-medium">Company Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Tab.Container id="left-tabs-example" defaultActiveKey="email">
            <Row>
              <Col sm={3} className="border-end">
                <Nav className="flex-column">
                  <Nav.Item
                    style={{
                      margin: "2px",
                      // color: `${theme.palette.primary.main}`,
                      borderRadius: "7px",
                    }}
                  >
                    <Nav.Link
                      onClick={() => handleService()}
                      style={{
                        borderRadius: "10px",
                      }}
                      className={`${
                        service
                          ? "bg-body-secondary text-black fw-medium ms-2"
                          : "text-black fw-medium ms-2"
                      } `}
                      eventKey="email"
                    >
                      <RiCustomerServiceLine /> Servise
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    style={{
                      margin: "2px",
                      borderRadius: "10px",
                    }}
                  >
                    <Nav.Link
                      onClick={() => handleFeatures()}
                      style={{
                        borderRadius: "10px",
                      }}
                      className={`${
                        features
                          ? "bg-body-secondary text-black fw-medium ms-2"
                          : "text-black fw-medium ms-2"
                      } `}
                      eventKey="feature"
                    >
                      <BiLogoPeriscope /> Features
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    style={{
                      margin: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    <Nav.Link
                      style={{
                        borderRadius: "10px",
                      }}
                      onClick={() => handleBenefits()}
                      className={`${
                        benefits
                          ? "bg-body-secondary text-black fw-medium ms-2"
                          : "text-black fw-medium ms-2"
                      } `}
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
                    <Button
                      variant="contained"
                      onClick={()=>handleClose()}
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      eventKey="feature"
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2"
                    >
                      Next
                    </Button>
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
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2"
                    >
                      Add Feature
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 "
                    >
                      Next
                    </Button>
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
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2"
                    >
                      Add benefit
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2"
                    >
                      Save & Close
                    </Button>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            sx={{ backgroundColor: `${theme.palette.primary.main}` }}
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
