import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import Modal from "react-bootstrap/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../Theme/Theme";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import Input from "../../../Component/Input";
import api from "../../../service/api";
import "./send.css";

const Send = () => {
  const [emailToSend, setEmailToSend] = useState("");
  const navigate = useNavigate();
  const [isSchedule, setIsSchedule] = useState(false);
  const userDatails = useSelector((state) => state.login.userDatails);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [industryOptions, setIndustryOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [schedule, setSchedule] = useState({
    allDaysChecked: false,
    daysChecked: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  });
  const [showModal, setShowModal] = useState(false);
  const handleAutoGenerate = () => {
    setShowModal(true);
  };
  function handleServiceChange(e) {
    e.preventDefault();
    const newValue = e.target.value;
    setSelectedService(newValue);
  }
  function handleIndustryChange(e) {
    e.preventDefault();
    const newValue = e.target.value;
    setSelectedIndustry(newValue);
  }
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (id === "allDays") {
      setSchedule({
        ...schedule,
        allDaysChecked: checked,
        daysChecked: {
          monday: checked,
          tuesday: checked,
          wednesday: checked,
          thursday: checked,
          friday: checked,
          saturday: checked,
          sunday: checked,
        },
      });
    } else {
      setSchedule({
        ...schedule,
        allDaysChecked: false,
        daysChecked: { ...schedule.daysChecked, [id]: checked },
      });
    }
  };
  const fetchDataIndustry = async () => {
    try {
      const response = await api.post("/industry/get");
      if (response.isSuccess) {
        setIndustryOptions(response.data);
      } else toast.error(response.message);
    } catch (error) {
      console.error("Error fetching industry data:", error);
    }
  };
  const fetchDataService = async () => {
    try {
      const resData = await api.post("service/get");
      if (resData.isSuccess) {
        setServiceOptions(resData.data);
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  useEffect(() => {
    fetchDataIndustry();
    fetchDataService();
  }, []);

  const handleSend = async () => {
    try {
      const resData = await api.post("email/send", {
        isScheduled: isSchedule,
      });
      if (resData.isSuccess) {
        navigate("/dashboard/contacts");
        toast.success("email Send Successful!");
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div style={{ letterSpacing: "1px" }}>
      <Row className="w-100 ">
        <Col md="4">
          <Card className="m-3 shadow">
            <CardHeader>
              <CardTitle tag="h5">Send</CardTitle>
            </CardHeader>
            <CardBody>
              <Card className="mt-2 p-3 bg-body-secondary">
                <span>
                  <span className="fw-bold">Email</span> being generated as:
                </span>
                <span>{`${userDatails?.emailConfig?.email}`}</span>
              </Card>
              <h4 style={{ letterSpacing: "1.5px" }} className="mt-3">
                Email <span className="text-secondary">Available</span> to send
              </h4>
              <div className="d-flex flex-column">
                <Input
                  id={"email to send"}
                  lebel={"Email To Send"}
                  className={"mb-2"}
                  type={"text"}
                  classnamelebal={"mb-1.5 fs-6 fw-medium"}
                />
                <div>
                  <label className="fs-6 fw-medium">Schedule</label>
                  <Checkbox
                    checked={isSchedule}
                    onClick={() => setIsSchedule(!isSchedule)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Day"
                    className="mb-2"
                    disabled={!isSchedule}
                  />
                </LocalizationProvider>
              </div>
              <Button
                sx={{ backgroundColor: `${theme.palette.primary.main}` }}
                variant="contained"
                className="w-100"
                onClick={() => handleSend()}
              >
                Send
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="m-3 shadow">
            <CardHeader>
              <CardTitle tag="h5">Daily Scheduler</CardTitle>
            </CardHeader>
            <CardBody>
              <Card className="mt-2 p-3 bg-body-secondary">
                <span>
                  <span className="fw-bold">Email</span> being generated as:
                </span>
                <span>{`${userDatails?.emailConfig?.email}`}</span>
              </Card>
              <div className="d-flex flex-column">
                <Input
                  id={"email to send"}
                  lebel={"Email To Send Per Day"}
                  className={"mb-2 mt-2"}
                  type={"text"}
                  classnamelebal={"mb-1.5 fs-6 fw-medium"}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time To Send"
                    defaultValue={dayjs("2022-04-17T15:30")}
                    className="mt-2"
                  />
                </LocalizationProvider>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id="allDays"
                    checked={schedule.allDaysChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="allDays">All Days</label>
                  {daysOfWeek.map((day) => (
                    <React.Fragment key={day}>
                      <input
                        type="checkbox"
                        id={day.toLowerCase()}
                        checked={schedule.daysChecked[day.toLowerCase()]}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={day.toLowerCase()}>
                        {day.substring(0, 1)}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="End Date" className="mb-2 mt-2" />
                </LocalizationProvider>
                <div className="mt-2">
                  <Checkbox
                    checked={isSchedule}
                    onClick={() => {
                      setIsSchedule(!isSchedule);
                      handleAutoGenerate();
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <label htmlFor="autoGenerate">Auto-generate</label>
                </div>
              </div>
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                style={{ marginTop: "100px" }}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="ms-2 fw-bold">
                    Auto-generate
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="m-2">
                  {" "}
                  <div>
                    
                    <Select
                      name="services"
                      id="services"
                      className="w-100"
                      value={ selectedService ? selectedService : "Default"}
                      onChange={(e) => handleServiceChange(e)}
                    >
                      <MenuItem value="Default" disabled>
                        Select service
                      </MenuItem>
                      {serviceOptions ? (
                        serviceOptions.map((single) => (
                          <MenuItem key={single._id} value={single._id}>
                            {single.title}
                          </MenuItem>
                        ))
                      ) : (
                        <option value="">Data Loading...</option>
                      )}
                    </Select>
                    <Select
                      name="industry"
                      id="industry"
                      className="w-100 mt-2"
                      value={ selectedIndustry ? selectedIndustry : "Default"}
                      onChange={(e) => handleIndustryChange(e)}
                    >
                      <MenuItem value="Default" disabled>
                      Select an industry
                      </MenuItem>
                      {industryOptions ? (
                        industryOptions.map((industry) => (
                          <MenuItem key={industry._id} value={industry._id}>
                            {industry.name}
                          </MenuItem>
                        ))
                      ) : (
                        <option value="">Data Loading...</option>
                      )}
                    </Select>
                  </div>
                </Modal.Body>
                <Modal.Footer className="m-2">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Select
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className="d-flex flex-row justify-content-between">
                <Button
                  sx={{ backgroundColor: `${theme.palette.primary.main}` }}
                  variant="contained"
                  onClick={() => handleCreateSchedule()}
                >
                  Create
                </Button>
                <Button
                  sx={{ backgroundColor: `${theme.palette.primary.main}` }}
                  variant="contained"
                  onClick={() => handleUpdateSchedule()}
                >
                  Update
                </Button>
                <Button
                  sx={{ backgroundColor: `${theme.palette.primary.main}` }}
                  variant="contained"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Send;
