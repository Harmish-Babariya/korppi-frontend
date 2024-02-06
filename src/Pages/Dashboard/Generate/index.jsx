import React, { useState } from "react";
import Box from "@mui/material/Box";
import Input from "../../../Component/Input";

import Paper from "@mui/material/Paper";
import { theme } from "../../../Theme/Theme";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Generate = () => {
  const [expanded, setExpanded] = React.useState("panel1");
  const [companyData, setCompanyData] = useState([
    {
      name: "Noumair",
      company: "Microsoft",
    },
    {
      name: "Alvarado Turner",
      company: "Microsoft",
    },
    {
      name: "Evangelina Mcclain",
      company: "Microsoft",
    },
    {
      name: "Candice Munoz",
      company: "Microsoft",
    },
    {
      name: "Bernard Langley",
      company: "Microsoft",
    },
    {
      name: "Noumair",
      company: "Microsoft",
    },
    {
      name: "Alvarado Turner",
      company: "Microsoft",
    },
    {
      name: "Evangelina Mcclain",
      company: "Microsoft",
    },
    {
      name: "Candice Munoz",
      company: "Microsoft",
    },
    {
      name: "Bernard Langley",
      company: "Microsoft",
    },
  ]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleGetStarted = () => {
    console.log("Get Started button clicked");
  };
  const handleGenerate = () => {
    console.log("Generate button clicked");
  };
  const handleSelect = () => {
    console.log("Select button clicked");
  };
  return (
    <div style={{ letterSpacing: "1px" }} className="content">
      <Row>
        <Col md="12">
          <Card className="mb-2 border-0">
            <CardBody>
              <Row>
                <Col md="4">
                  <Paper elevation={3}>
                    <Card className="shadow">
                      <CardHeader>
                        <CardTitle tag="h5">Interactive Dashboards</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <div className="d-flex flex-column mb-3">
                          <label htmlFor="" className="fw-bold">
                            Free Plan
                          </label>
                          <Input
                            id={"freepaln"}
                            lebel={"Free"}
                            className={"mb-2"}
                            type={"text"}
                            // value={password}
                            // onchange={(e) => setPassword(e.target.value)}
                            size={"small"}
                            classnamelebal={"mb-1.5 fs-6 fw-medium"}
                          />
                          <div className="w-100">
                            <Accordion
                              className="w-auto"
                              expanded={expanded === "panel1"}
                              onChange={handleChange("panel1")}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="fs-3" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className="bg-body-secondary"
                              >
                                <Typography className="fs-5 fw-lighter">
                                  Featurs
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Suspendisse malesuada lacus
                                  ex, sit amet blandit leo lobortis eget.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="fs-3" />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                className="bg-body-secondary"
                              >
                                <Typography className="fs-5 fw-light">
                                  Benefits
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Suspendisse malesuada lacus
                                  ex, sit amet blandit leo lobortis eget.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Button
                              sx={{
                                backgroundColor: `${theme.palette.primary.main}`,
                              }}
                              variant="contained"
                              className="mt-3 w-100 fw-medium "
                              onClick={handleGetStarted}
                            >
                              Get Started
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Paper>
                </Col>
                <Col md="4">
                  <Paper elevation={3}>
                    <Card className="shadow">
                      <CardHeader>
                        <CardTitle tag="h5">Odin's Eye Analytics</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { width: "auto" },
                          }}
                          autoComplete="off"
                        >
                          <div className="d-flex flex-column mb-3">
                            <Input
                              id={"endustry"}
                              lebel={"Industry"}
                              className={"mb-2"}
                              type={"text"}
                              // value={endustry}
                              // onchange={(e) => endustry(e.target.value)}
                              size={"small"}
                              classnamelebal={"mb-1.5 fs-6 fw-medium"}
                            />

                            <Input
                              id={"goal of email"}
                              lebel={"Goal Of Email"}
                              className={"mb-2"}
                              type={"text"}
                              // value={password}
                              // onchange={(e) => setPassword(e.target.value)}
                              size={"small"}
                              classnamelebal={"mb-1.5 fs-6 fw-medium"}
                            />
                            <Input
                              id={"companies you work with"}
                              lebel={"Companies You Work With"}
                              className={"mb-2"}
                              type={"text"}
                              // value={SMPTServer}
                              // onchange={(e) => setSMPTServer(e.target.value)}
                              size="small"
                              classnamelebal={"mb-1.5 fs-6 fw-medium"}
                            />
                            <hr />
                            <label htmlFor="" className="fw-bold">
                              Select Industry
                            </label>
                            <Input
                              id={"select industry"}
                              lebel={"Select Industry"}
                              className={"mb-2 mt-1"}
                              type={"text"}
                              // value={SMPTPort}
                              // onchange={(e) => setSMPTPort(e.target.value)}
                              classnamelebal={"mb-1.5 fs-6 fw-medium"}
                              size="small"
                            />
                            <p className="fw-light fs-6">87 Email to generet</p>
                          </div>
                        </Box>
                      </CardBody>
                    </Card>
                  </Paper>
                </Col>
                <Col md="4">
                  <Paper elevation={3}>
                    <Card className="shadow">
                      <CardHeader>
                        <CardTitle tag="h5">Generate</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <div>
                          <label htmlFor="" className="fw-bold w-100 mb-1">
                            Emails to generate
                          </label>
                          <Input
                            id={"Emails to generate"}
                            lebel={"Emails to generate"}
                            className={""}
                            type={"text"}
                            // value={user}
                            // onchange={(e) => setUser(e.target.value)}
                            size={"small"}
                            classnamelebal={"mt-2 w-100"}
                          />

                          <Button
                            sx={{
                              backgroundColor: `${theme.palette.primary.main}`,
                            }}
                            variant="contained"
                            className="ms-2 "
                            size="medium"
                            onClick={()=>handleSelect()}
                          >
                            Select
                          </Button>
                          <div
                            className="mt-2 mb-2"
                            style={{ maxHeight: "300px" }}
                          >
                            <table
                              className="table table-hover bg-body-secondary"
                              style={{ minWidth: "100%" }}
                            >
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Company</th>
                                </tr>
                              </thead>
                            </table>
                            <div
                              style={{
                                marginTop: "-15px",
                                maxHeight: "250px",
                                overflowY: "scroll",
                              }}
                            >
                              <table
                                className="table table-hover"
                                style={{ minWidth: "100%" }}
                              >
                                <tbody>
                                  {companyData?.map((value, index) => (
                                    <tr key={index}>
                                      <td>{value.name}</td>
                                      <td>{value.company}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <Button
                            sx={{
                              backgroundColor: `${theme.palette.primary.main}`,
                            }}
                            variant="contained"
                            className="w-100 mt-2"
                            onClick={() => handleGenerate()}
                          >
                            Generate
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </Paper>

                  <Card className="mt-2 p-3 bg-body-secondary">
                    <span>
                      <span className="fw-bold">Email</span> being generated as:
                    </span>
                    <span>Noumair.rafiq@odinseye.live</span>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Generate;
