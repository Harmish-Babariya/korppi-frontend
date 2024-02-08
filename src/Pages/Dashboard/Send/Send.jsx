import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { theme } from "../../../Theme/Theme";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import Input from "../../../Component/Input";
const Send = () => {
  const handleSend = () => {
    // Add your logic here to handle sending email
    console.log("Send button clicked");
    // Example logic: You can make API calls, update state, etc.
  };

  const handleCreateSchedule = () => {
    // Add your logic here to handle creating a daily schedule
    console.log("Create button clicked");
    // Example logic: You can make API calls, update state, etc.
  };

  const handleUpdateSchedule = () => {
    // Add your logic here to handle updating a daily schedule
    console.log("Update button clicked");
    // Example logic: You can make API calls, update state, etc.
  };

  const handleCancel = () => {
    // Add your logic here to handle canceling the operation
    console.log("Cancel button clicked");
    // Example logic: You can navigate to a different page, reset state, etc.
  };
  return (
    <div style={{ letterSpacing: "1px" }}>
      {" "}
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
                <span>Noumair.rafiq@odinseye.live</span>
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
                  // value={endustry}
                  // onchange={(e) => endustry(e.target.value)}
                  classnamelebal={"mb-1.5 fs-6 fw-medium"}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Day" className="mb-2" />
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
                <span>Noumair.rafiq@odinseye.live</span>
              </Card>
              <div className="d-flex flex-column">
                <Input
                  id={"email to send"}
                  lebel={"Email To Send Per Day"}
                  className={"mb-2 mt-2"}
                  type={"text"}
                  // value={endustry}
                  // onchange={(e) => endustry(e.target.value)}

                  classnamelebal={"mb-1.5 fs-6 fw-medium"}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time To Send"
                    defaultValue={dayjs("2022-04-17T15:30")}
                    className="mt-2"
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Day TO Send" className=" mt-2" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="End Date" className="mb-2 mt-2" />
                </LocalizationProvider>
                <p>Auto-generate</p>
              </div>
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
                className="ms-2 "
                onClick={() => handleUpdateSchedule()}
              >
                Update
              </Button>
              <Button
                sx={{ backgroundColor: `${theme.palette.primary.main}` }}
                variant="contained"
                className="ms-2"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Send;
