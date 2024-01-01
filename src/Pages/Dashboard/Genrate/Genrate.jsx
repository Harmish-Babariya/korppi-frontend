import React from "react";
import Box from "@mui/material/Box";
import Input from "../../../Component/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
const Genrate = () => {
  const [personName, setPersonName] = React.useState([]);
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="content m-2">
      <Row>
        <Col md="12">
          <Card className="mb-2">
            <CardBody>
              <Row>
                <Col md="4">
                  <Card className="shadow">
                    <CardHeader>
                      <CardTitle tag="h5">Interactive Dashboards</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="d-flex flex-column mb-3">
                        <Button className="fw-bolder">Free Plan</Button>

                        <h1 className="fw-medium fs-3 mt-2">
                          $ 180 <span className="fs-5 fw-light">/month</span>{" "}
                        </h1>
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
                                adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
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
                                adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Button className="mt-3 w-100 fw-medium">
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
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
                            lebel={"Endustry"}
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
                            size={"small"}
                            classnamelebal={"mb-1.5 fs-6 fw-medium"}
                          />
                          <hr />
                          <Input
                            id={"select industry"}
                            lebel={"Select Industry"}
                            className={"mb-2"}
                            type={"text"}
                            // value={SMPTPort}
                            // onchange={(e) => setSMPTPort(e.target.value)}
                            size={"small"}
                            classnamelebal={"mb-1.5 fs-6 fw-medium"}
                          />
                          <p className="fw-light fs-6">87 Email to generet</p>
                        </div>
                      </Box>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="shadow">
                    <CardHeader>
                      <CardTitle tag="h5">Generate</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div>
                        <label htmlFor="Emails to generate">
                          Emails to generate
                        </label>
                        <div>
                          <input
                            type="text"
                            className="rounded border-1 h-100 p-1"
                          />
                          <Button className="ms-2 w-auto">Select</Button>
                        </div>
                        <div className="text-center mt-2">
                          <FormControl
                            sx={{ m: 1, minWidth: 150, maxWidth: 400 }}
                          >
                            <InputLabel shrink htmlFor="select-multiple-native">
                              Company
                            </InputLabel>
                            <Select
                              multiple
                              native
                              value={personName}
                              onChange={handleChangeMultiple}
                              label="Native"
                              inputProps={{
                                id: "select-multiple-native",
                              }}
                            >
                              {names.map((name) => (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <Button className="w-100 mt-2">Generate</Button>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="mt-2 p-3 bg-body-secondary">
                    <span>Email being generated as:</span>
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

export default Genrate;
