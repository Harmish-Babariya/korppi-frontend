import { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import { RiCustomerServiceLine } from "react-icons/ri";
import { BiLogoPeriscope } from "react-icons/bi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { DiCoda } from "react-icons/di";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";
const CompanyCreateService = ({ show2, setShow2 }) => {
  const [activeTab, setActiveTab] = useState("service");
  const [title, setTitle] = useState("Company Create Service");

  const handleClose = () => setShow2(false);

  const tabs = [
    { key: "service", label: "Service", icon: <RiCustomerServiceLine /> },
    { key: "feature", label: "Features", icon: <BiLogoPeriscope /> },
    { key: "benefits", label: "Benefits", icon: <DiCoda /> },
    { key: "targetmarket", label: "Target Market", icon: <AcUnitIcon /> },
  ];

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    tabKey === "targetmarket"
      ? setTitle("Company Target Market")
      : setTitle("Company Create Service");
  };

  return (
    <div>
      <div className="modal-background"></div>{" "}
      <Modal
        style={{
          marginTop: "65px",
          backgroundColor: "rgba(0, 0, 0, 0.54)",
        }}
        className="w-100 h-100"
        size="lg"
        dialogClassName="modal-100w"
        show={show2}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-medium">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab}>
            <Row>
              <Col sm={3} className="border-end">
                <Nav className="flex-column">
                  {tabs.map((tab) => (
                    <Nav.Item key={tab.key}>
                      <Nav.Link
                        onClick={() => handleTabChange(tab.key)}
                        className={`${
                          activeTab === tab.key
                            ? "bg-body-secondary text-black fw-medium ms-2 rounded-3"
                            : "text-black fw-medium ms-2 "
                        } `}
                        eventKey={tab.key}
                      >
                        {tab.icon} {tab.label}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="service">
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
                        className={"mt-2"}
                        type={"number"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      <Input
                        id={"offers"}
                        lebel={"Offers"}
                        className={"mt-2"}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                    </div>
                    <Button
                      variant="contained"
                      onClick={() => handleClose()}
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
                        className={"mt-2"}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      <Input
                        id={"feature3"}
                        lebel={"Feature3"}
                        className={"mt-2"}
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
                        className={"mt-2"}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      <Input
                        id={"benefits3"}
                        lebel={"Benefits3"}
                        className={"mt-2"}
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
                  <Tab.Pane eventKey="targetmarket">
                    <div className="d-flex flex-column m-2">
                      <Input
                        id={"target market labal"}
                        lebel={"Target Market Labal"}
                        className={""}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-1"}
                      />

                      <Input
                        id={"target location(s)"}
                        lebel={"Target Location(s)"}
                        className={"mt-2"}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      <Input
                        id={"employee count"}
                        lebel={"Employee Count"}
                        className={"mt-2"}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      <Input
                        id={"Industr(y)/(ies)"}
                        lebel={"Industr(y)/(ies)"}
                        className={"mt-2"}
                        type={"text"}
                        // value={user}
                        // onchange={(e) => setUser(e.target.value)}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      <Input
                        id={"Job Title(s)"}
                        lebel={"Job Title(s)"}
                        className={"mt-2"}
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

export default CompanyCreateService;
