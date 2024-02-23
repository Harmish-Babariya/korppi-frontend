import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Modal from "react-bootstrap/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../Theme/Theme";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import Button from "../../../Component/Button";
import { Checkbox, FormControlLabel } from "@mui/material";
import Input from "../../../Component/Input";
import api from "../../../service/api";
import "./send.css";

const Send = () => {
  dayjs.extend(utc);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [emailToSend, setEmailToSend] = useState("");
  const navigate = useNavigate();
  const [isSchedule, setIsSchedule] = useState(false);
  const [selectedTime, setSelectedTime] = useState(dayjs("2022-04-17T15:30"));
  const [isChecked, setIsChecked] = useState(false);
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
    setShowModal(!isChecked);
    setIsChecked(!isChecked);
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
  const handleDateChange = (date) => {
    setSelectedDate(dayjs.utc(date));
    console.log(selectedDate);
  };

  // Function to delete the schedule
  const handleCancel = async () => {
    try {
      // Make an API call to delete the schedule
      // Example:
      // const resData = await api.delete("schedule/delete");
      // Handle success or failure accordingly
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Function to update the schedule
  const handleUpdateSchedule = async () => {
    try {
      // Make an API call to update the schedule
      // Example:
      // const resData = await api.put("schedule/update", updatedScheduleData);
      // Handle success or failure accordingly
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    console.log(newTime);
  };

  return (
    <div style={{ letterSpacing: "1px", marginTop: "20px" }}>
      <Row className="w-100  d-flex justify-content-center ">
        <Col md="4">
          <Card className="m-3 shadow rounded-3" style={{ height: "450px" }}>
            <CardHeader>
              <CardTitle tag="h5">Send</CardTitle>
            </CardHeader>
            <CardBody>
              <Card className="mt-2 p-3 bg-body-secondary">
                <span>
                  Emails being sent as:{" "}
                  {`${userDatails?.firstName} ${userDatails?.lastName}`}
                </span>
              </Card>
              <h4 style={{ letterSpacing: "1.5px" }} className="mt-3">
                Email <span className="text-secondary">Available</span> to send
              </h4>
              {/* Display number of emails available to send */}
              <div className="d-flex flex-column">
                <span>{/* Display number of emails available to send */}</span>
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
                {/* Conditional rendering for the calendar */}
                {isSchedule && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Day"
                      className="mb-2"
                      onChange={handleDateChange}
                      renderInput={(params) => <input {...params} />}
                    />
                  </LocalizationProvider>
                )}
              </div>
              <Button
                style={{ backgroundColor: `${theme.palette.primary.main}` }}
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
          <Card className="m-3 shadow rounded-3" style={{ height: "450px" }}>
            <CardHeader>
              <CardTitle tag="h5">Daily Scheduler</CardTitle>
            </CardHeader>
            <CardBody>
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
                    ampm={false}
                    onChange={handleTimeChange}
                    renderInput={(params) => <input {...params} />}
                    value={selectedTime}
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
                    checked={isChecked}
                    onClick={() => {
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
                      value={selectedService ? selectedService : "Default"}
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
                      value={selectedIndustry ? selectedIndustry : "Default"}
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
              {/* Dynamic rendering of buttons */}
              <div className="d-flex flex-row justify-content-between">
                {!isSchedule ? ( // If scheduler is not set, render Create button
                  <Button
                    style={{ backgroundColor: `${theme.palette.primary.main}` }}
                    variant="contained"
                    onClick={() => handleCreateSchedule()}
                  >
                    Create
                  </Button>
                ) : (
                  // If scheduler is set, render Update and Cancel buttons
                  <>
                    <Button
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      variant="contained"
                      onClick={() => handleUpdateSchedule()}
                    >
                      Update
                    </Button>
                    <Button
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      variant="contained"
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Send;
