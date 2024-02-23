import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Input from "../../../Component/Input";
import { FaCheckCircle } from "react-icons/fa";
import { theme } from "../../../Theme/Theme";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { MenuItem, Select } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { servicehandle } from "../../../Redux/CompanyServiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ServiceSelected } from "../../../Redux/SelectedServiceSlice";
import Button from "../../../Component/Button";
import api from "../../../service/api";
import { toast } from "react-toastify";

const Generate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { service } = useSelector((state) => state.Service);
  const userDatails = useSelector((state) => state.login.userDatails);
  const [selectedService, setSelectedService] = useState();
  const [generate, setGenerate] = useState(0);
  const [targetMarket, setTargetMarket] = useState([]);
  const [selectedTargetMarket, setSelectedTargetMarket] = useState();
  const [count, setCount] = useState(0);
  const [expanded, setExpanded] = React.useState("panel1");
  const [companyData, setCompanyData] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleGenerate = async () => {
    if (generate === 0) {
      toast.error("Set the value for emails to be generated");
      return;
    }
    const emails = companyData.map((ele) => {
      return { companyId: ele.company._id, prospectId: ele._id };
    });

    try {
      const resData = await api.post("/email/generate", {
        emails: emails,
        userId: userDatails._id,
        sentBy: `${userDatails.firstName} ${userDatails.lastName}`,
        serviceId: selectedService._id,
      });
      if (resData.isSuccess) {
        navigate("/dashboard/send");
        toast.success("email Genrate Successful!");
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const handleSelect = async () => {
    if (generate === 0) {
      toast.error("Set the value for emails to be generated");
      return;
    }
    let data = selectedTargetMarket;
    const payload = {
      employeeCount: data?.employeeCount,
      location: data?.location,
      industry: data?.industry,
      role: data?.jobTitle,
      pageSize: parseInt(generate),
    };

    try {
      const resData = await api.post("/prospects/get", payload);
      if (resData.isSuccess) {
        setCount(resData.meta.totalCount);
        setCompanyData(resData.data);
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const fetchService = async () => {
    try {
      const resData = await api.post("/service/get");
      if (resData.isSuccess) {
        dispatch(servicehandle(resData.data));
        service = useSelector((state) => state.Service);
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const fetchTargetMarket = async () => {
    try {
      const resData = await api.post("target-market/get");
      if (resData.isSuccess) {
        setTargetMarket(resData.data);
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const fetchCompanyData = async (companyData) => {
    try {
      const resData = await api.post("/prospects/get", companyData);
      if (resData.isSuccess) {
        setCount(resData.meta.totalCount);
        setCompanyData(resData.data);
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  function handleServiceChange(e) {
    e.preventDefault();
    const newValue = e.target.value;
    setSelectedService(service.find((item) => item._id === newValue));
    dispatch(ServiceSelected({ service, newValue }));
  }

  function handleMarketChange(e) {
    e.preventDefault();
    const newValue = e.target.value;
    let data = targetMarket.find((item) => item._id === newValue);
    setSelectedTargetMarket(data);
    const payload = {
      employeeCount: data?.employeeCount,
      location: data?.location,
      industry: data?.industry,
      role: data?.jobTitle,
    };
    fetchCompanyData(payload);
  }

  useEffect(() => {
    fetchService();
    fetchTargetMarket();
  }, []);

  useEffect(() => {
    setSelectedService(service[0]);
    setSelectedTargetMarket(targetMarket[0]);
    const payload = {
      employeeCount: targetMarket[0]?.employeeCount,
      location: targetMarket[0]?.location,
      industry: targetMarket[0]?.industry,
      role: targetMarket[0]?.jobTitle,
    };
    targetMarket[0] && fetchCompanyData(payload);
  }, [service, targetMarket]);
  return (
    <div
      style={{ letterSpacing: "1px", marginTop: "30px" }}
      className="content"
    >
      {/* <Row>
        <Col md="12">
          <Card className="mb-2 border-0">
            <CardBody> */}
      <Row>
        <Col md="4">
          <Card className="shadow rounded-3" style={{ height: "560px" }}>
            <CardHeader>
              <CardTitle tag="h5">
                <Select
                  name="services"
                  id="services"
                  className="w-100"
                  value={selectedService ? selectedService._id : "Default"}
                  onChange={(e) => handleServiceChange(e)}
                >
                  <MenuItem value="Default" disabled>
                    Select service
                  </MenuItem>
                  {service ? (
                    service.map((single) => (
                      <MenuItem key={single._id} value={single._id}>
                        {single.title}
                      </MenuItem>
                    ))
                  ) : (
                    <option value="">Data Loading...</option>
                  )}
                </Select>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <h3 className="fw-bold fs-3">
                {" "}
                {selectedService?.offer
                  ? selectedService?.offer + "Off"
                  : "No Offer"}
              </h3>

              <span className=" fw-bold fs-3 bg-transparent ">
                {selectedService?.currency === "USD"
                  ? "$"
                  : selectedService?.currency === "EUR"
                  ? "£"
                  : selectedService?.currency}
                {selectedService?.price}
              </span>
              <div className="d-flex flex-column mb-3">
                <Card className="w-100">
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
                      <Typography className="fs-5 fw-light">
                        Features
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="mw-100 overflow-y-scroll">
                      {selectedService
                        ? selectedService.features.map((ele, index) => (
                            <Typography key={index}>
                              <FaCheckCircle /> &nbsp;
                              {ele.description}
                            </Typography>
                          ))
                        : "Data Loading..."}
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
                      {selectedService
                        ? selectedService.benefits.map((ele, index) => (
                            <Typography key={index}>
                              <FaCheckCircle /> &nbsp;
                              {ele.description}
                            </Typography>
                          ))
                        : "Data Loading..."}
                    </AccordionDetails>
                  </Accordion>
                </Card>

                {/* <div className="mt-3 p-1">
                            <span>
                              <b>Target Market Label: </b>
                              {selectedService?.target_market?.targetName}
                            </span>
                            <br />
                            <span>
                              <b>Target location: </b>
                              {selectedService?.target_market?.location.map(
                                (ele) => (
                                  <>{ele}</>
                                )
                              )}
                            </span>
                            <br />
                            <span>
                              <b>Employee Count: </b>
                              {selectedService?.target_market?.employeeCount[0]}
                            </span>
                            <br />
                            <span>
                              <b>Industry: </b>
                              {selectedService?.target_market?.industry.map(
                                (ele) => (
                                  <>{ele}</>
                                )
                              )}
                            </span>
                            <br />
                            <span>
                              <b>Job Title: </b>
                              {selectedService?.target_market?.jobTitle}
                            </span>
                            <br />
                          </div> */}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="shadow rounded-3" style={{ height: "560px" }}>
            <CardHeader>
              <CardTitle tag="h5">
                {userDatails?.companyId?.name} Analytics
              </CardTitle>
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
                  <div>
                    <p>
                      <strong>Industry :</strong>
                      {selectedService?.company?.industryId?.name
                        ? selectedService?.company?.industryId?.name
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Companies You Work With :</strong>
                      {userDatails?.companyId?.partnerCompanies}
                    </p>
                  </div>

                  <hr />
                  <label htmlFor="" className="fw-bold">
                    Select Target Market
                  </label>
                  <select
                    id="selectTargetMarket"
                    className="form-select mb-2 mt-1"
                    value={selectedTargetMarket?._id}
                    onChange={(e) => handleMarketChange(e)}
                  >
                    {targetMarket ? (
                      targetMarket.map((market, index) => (
                        <option key={index} value={market._id}>
                          {market?.targetName}
                        </option>
                      ))
                    ) : (
                      <option>Data Loading...</option>
                    )}
                  </select>

                  <p className="fw-light fs-6">{count} Emails to genereted</p>
                  <div className="mt-3 p-1">
                    <span>
                      <b>Target Market Label: </b>
                      {selectedTargetMarket?.targetName}
                    </span>
                    <br />
                    <span>
                      <b>Target location: </b>
                      {selectedTargetMarket?.location.map((ele) => (
                        <>{ele}</>
                      ))}
                    </span>
                    <br />
                    <span>
                      <b>Employee Count: </b>
                      {selectedTargetMarket?.employeeCount[0]}
                    </span>
                    <br />
                    <span>
                      <b>Industry: </b>
                      {selectedTargetMarket?.industry.map((ele) => (
                        <>{ele}</>
                      ))}
                    </span>
                    <br />
                    <span>
                      <b>Job Title: </b>
                      {selectedTargetMarket?.jobTitle}
                    </span>
                    <br />
                  </div>
                </div>
              </Box>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="shadow rounded-3" style={{ height: "560px" }}>
            <CardHeader>
              <CardTitle tag="h5">Generate</CardTitle>
            </CardHeader>
            <CardBody>
              <Card className="mb-1 p-3 bg-body-secondary">
                <span>
                  <span className="fw-bold">Email</span> being generated as:
                </span>
                <span>{`${
                  userDatails?.firstName + " " + userDatails?.lastName
                }`}</span>
              </Card>
              <div>
                <label htmlFor="" className="fw-bold w-100 mb-1">
                  Emails to generate
                </label>

                <div className="d-flex flex-row">
                  <Input
                    id={"Emails to generate"}
                    lebel={"Emails to generate"}
                    type={"text"}
                    value={generate}
                    onChange={(e) => setGenerate(e.target.value)}
                    size={"small"}
                    className={"mt-2 w-75"}
                  />

                  <Button
                    style={{
                      backgroundColor: `${theme.palette.primary.main}`,
                    }}
                    variant="contained"
                    className="m-2 "
                    size="medium"
                    onClick={() => handleSelect()}
                  >
                    Select
                  </Button>
                </div>
                <div className="mt-2 mb-2" style={{ maxHeight: "300px" }}>
                  <table
                    className="table table-hover bg-body-secondary"
                    style={{ minWidth: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>
                          {" "}
                          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                          Company
                        </th>
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
                            <td>{`${value.firstName} ${value.lastName}`}</td>
                            <td>{value.company.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Button
                  style={{
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
        </Col>
      </Row>
      {/* </CardBody>
           </Card> 
        </Col>
      </Row> */}
    </div>
  );
};

export default Generate;
