import React, { useState } from "react";
import Chart from "chart.js/auto";
import EmailAnalyticsChart from "../chart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Card, CardBody, CardTitle, Row, Col, CardText } from "reactstrap";
import SMSSEARCH from "../../../assets/img/sms-search.png";
import DIRECTBOX from "../../../assets/img/directbox-notif.svg";
import SEND from "../../../assets/img/send.png";
import PROFILRUSER from "../../../assets/img/profileuser.png";
import { theme } from "../../../Theme/Theme";

const Dashboardpage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const newDate = new Date(date);
  };
  return (
    <>
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card
            body
            style={{ borderLeft: `4px solid ${theme.palette.primary.main}` }}
            className=" shadow"
          >
            <CardTitle tag="h6">
              <span style={{ color: "#3a9432" }}>+78%</span> from the last month
            </CardTitle>
            <CardText>
              <h2 className="fw-bold">100</h2>
            </CardText>
            <CardText>
              {" "}
              <img src={SMSSEARCH} alt="" /> Emails sent
            </CardText>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card
            body
            style={{ borderLeft: `4px solid ${theme.palette.primary.main}` }}
            className=" shadow"
          >
            <CardTitle tag="h6">
              <span style={{ color: "#3a9432" }}>+28%</span> from the last month
            </CardTitle>
            <CardText>
              <h2 className="fw-bold">76</h2>
            </CardText>
            <CardText>
              {" "}
              <img src={DIRECTBOX} alt="" /> Emails Opened
            </CardText>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card
            body
            style={{ borderLeft: `4px solid ${theme.palette.primary.main}` }}
            className=" shadow"
          >
            <CardTitle tag="h6">
              <span style={{ color: "#3a9432" }}>+10 %</span> from the last
              month
            </CardTitle>
            <CardText>
              <h2 className="fw-bold">175</h2>
            </CardText>
            <CardText>
              {" "}
              <img src={SEND} alt="" /> Emails to send
            </CardText>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card
            body
            style={{ borderLeft: `4px solid ${theme.palette.primary.main}` }}
            className=" shadow"
          >
            <CardTitle tag="h6">
              {" "}
              <span style={{ color: "#ed0520" }}>-42%</span> from the last month
            </CardTitle>
            <CardText>
              <h2 className="fw-bold">5</h2>
            </CardText>
            <CardText>
              {" "}
              <img src={PROFILRUSER} alt="" /> Leads Generated
            </CardText>
          </Card>
        </Col>
      </Row>
      <Box
        className={`w-100 rounded-4  card shadow `}
        sx={{ marginTop: "12px", height: "435px", boxSizing: "border-box" }}
      >
        <Row className="d-flex">
          <Col md="3" className="d-flex flex-column ms-3 mt-2">
            <h2 className="fs-2 mt-2">Email Analytics</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"Select Month"}
                value={selectedDate}
                onChange={handleDateChange}
                slotProps={{ textField: { size: "small" } }}
                renderInput={(params) => <TextField {...params} />}
                views={["month", "year"]}
              />
            </LocalizationProvider>
            <p className="mt-3">
              <span className="me-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <circle cx="7" cy="7.5" r="7" fill="#9EAFFF" />
                </svg>
              </span>
              Emails Sent
              <h4 className="ms-4 mt-1">100 mail</h4>
            </p>

            <p className="mt-1">
              {" "}
              <span className="me-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <circle cx="7" cy="7.5" r="7" fill="#567B65" />
                </svg>
              </span>
              Emails Opened
              <h4 className="ms-4 mt-1">76 mail</h4>
            </p>
            <p className="">
              {" "}
              <span className="me-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <circle cx="7" cy="7.5" r="7" fill="#D7D6C6" />
                </svg>
              </span>
              Leads Generated
              <h4 className="ms-4 mt-1">56 mail</h4>
            </p>
          </Col>
          <Col md="8" className="m-3 p-0">
            <Box
              className={`p-2 bg-body-secondary rounded-4 border-0`}
              style={{ minWidth: "100%", height: "410px", width: "900px"  }}
            >
              <EmailAnalyticsChart
                months={[
                  "Jan",
                  "Feb",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ]}
                years={[2024]}
                width={"900px"} 
                height={"410px"}
              />
            </Box>
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default Dashboardpage;
