import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import {  useSelector } from "react-redux";
import { theme } from "../../../Theme/Theme";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Input from "../../../Component/Input";
import "./send.css";

const Send = () => {
  const [emailToSend, setEmailToSend] = useState("");
  const [isSchedule, setIsSchedule] = useState(false);
  const userDatails = useSelector((state) => state.login.userDatails); 
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

  const handleSend = () => {
    // Handle sending email with the provided data
    console.log("Email to send:", emailToSend);
    console.log("Days checked:", schedule.daysChecked);
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
                <span>{`${userDatails?.emailConfig.email}`}</span>
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
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Day" className="mb-2" disabled={!isSchedule}/>
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
                <span>{`${userDatails?.emailConfig.email}`}</span>
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
                <p>Auto-generate</p>
              </div>
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
