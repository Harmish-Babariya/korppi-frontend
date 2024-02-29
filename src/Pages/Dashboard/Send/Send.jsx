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
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./send.css";

const Send = () => {
  dayjs.extend(utc);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [emailToSend, setEmailToSend] = useState("");
  const navigate = useNavigate();
  const [isSchedule, setIsSchedule] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const userDatails = useSelector((state) => state.login.userDatails);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [industryOptions, setIndustryOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [schedule, setSchedule] = useState({
    allDaysChecked: false,
    daysChecked: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
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
  function handleIndustryChange(selectedList) {
    setSelectedIndustry(selectedList.map((item) => item.name));
  }
  const handleCreateSchedule = async () => {
    const payload = {
      daysOfWeek: { ...schedule.daysChecked },
      time: dayjs.utc(selectedTime).format("HH:mm"),
      endDate: new Date(selectedEndDate).toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    try {
      const resData = await api.post("/email/dailyschedule", payload);
      if (resData.isSuccess) {
        navigate("/dashboard/contacts");
        toast.success("Email schedule created successfully!");
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const daysOfWeekInNo = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };

  const handleCheckboxChange = (event) => {
    let { id, checked } = event.target;
    id = daysOfWeekInNo[id];
    if (id === "allDays") {
      setSchedule({
        ...schedule,
        allDaysChecked: checked,
        daysChecked: {
          0: checked,
          1: checked,
          2: checked,
          3: checked,
          4: checked,
          5: checked,
          6: checked,
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
    const payload = {
      isScheduled: isSchedule,
    };
    if (isSchedule) {
      console.log(selectedDate);
      payload.scheduledTime = selectedDate;
    }
    try {
      const resData = await api.post("email/send", payload);
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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDateChange = (date) => {
    const utcDate = date.toISOString();
    setSelectedDate(utcDate);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  // Function to delete the schedule
  const handleCancel = async () => {
    try {
      // Make an API call to delete the schedule
      // const resData = await api.delete("schedule/delete");
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Function to update the schedule
  const handleUpdateSchedule = async () => {
    try {
      // Make an API call to update the schedule
      // const resData = await api.put("schedule/update", updatedScheduleData);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const handleSelect = () => {
    setShowModal(false);
    console.log("Selected Service:", selectedService);
    console.log("Selected Industry:", selectedIndustry);
  };
  const handleTimeChange = (newTime) => {
    // const utcTime = dayjs.utc(newTime.$d);
    // // Format the UTC time in the desired format
    // const formattedDateTime = utcTime.format("YYYY-MM-DDTHH:mm:ss");
    setSelectedTime(newTime);
    console.log(newTime.$d);
  };

  return (
    <div style={{ letterSpacing: "1px", marginTop: "20px" }}>
      <Row className="w-100  d-flex justify-content-center ">
        <Col md="4">
          <Card
            className="m-3 shadow rounded-3"
            style={{ minHeight: "450px", maxWidth: "450px" }}
          >
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
              <h6 style={{ letterSpacing: "1.5px" }} className="mt-3 fw-bold">
                Email Available to send
              </h6>
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

                {isSchedule && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        className="mb-2"
                        label="Basic date time picker"
                        onChange={handleDateChange}
                        renderInput={(params) => <input {...params} />}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              </div>
              <Button
                style={{ backgroundColor: `${theme.palette.primary.main}` }}
                variant="contained"
                className="w-100"
                onClick={handleSend}
              >
                Send
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card
            className="m-3 shadow rounded-3"
            style={{ minHeight: "450px", maxWidth: "450px" }}
          >
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
                <label htmlFor="Days to send" className="mt-2">
                  Days to send
                </label>
                <div className="">
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
                  <DatePicker
                    label="End Date"
                    className="mb-2 mt-2"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                  />
                </LocalizationProvider>
                <div className="mt-2">
                  <Checkbox
                    checked={isChecked}
                    onClick={handleAutoGenerate}
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
                  <div>
                    <Select
                      name="services"
                      id="services"
                      className="w-100"
                      value={selectedService ? selectedService : "Default"}
                      onChange={handleServiceChange}
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
                    <Multiselect
                      options={industryOptions}
                      selectedValues={selectedIndustry}
                      onSelect={(selectedList) =>
                        setSelectedIndustry(
                          selectedList.map((item) => {
                            return { name: item.name };
                          })
                        )
                      }
                      onRemove={(selectedList) =>
                        setSelectedIndustry(
                          selectedList.map((item) => {
                            return { name: item.name };
                          })
                        )
                      }
                      displayValue={"name"}
                      placeholder="Select Target Market"
                      className="mt-2"
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer className="m-2">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleSelect}
                  >
                    Select
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className="d-flex flex-row justify-content-between">
                <Button
                  style={{ backgroundColor: `${theme.palette.primary.main}` }}
                  variant="contained"
                  onClick={handleCreateSchedule}
                >
                  Create
                </Button>

                <>
                  <Button
                    style={{
                      backgroundColor: `${theme.palette.primary.main}`,
                    }}
                    variant="contained"
                    onClick={handleUpdateSchedule}
                  >
                    Update
                  </Button>
                  <Button
                    style={{
                      backgroundColor: `${theme.palette.primary.main}`,
                    }}
                    variant="contained"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Send;
