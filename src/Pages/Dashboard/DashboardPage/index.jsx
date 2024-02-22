import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import EmailAnalyticsChart from "../chart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Row, Col, CardText } from "reactstrap";
import SMSSEARCH from "../../../assets/img/sms-search.png";
import DIRECTBOX from "../../../assets/img/directbox-notif.svg";
import SEND from "../../../assets/img/send.png";
import PROFILRUSER from "../../../assets/img/profileuser.png";

const Dashboardpage = () => {
  const [selectedDate, setSelectedDate] = useState(null); 

  const handleDateChange = (date) => {
    setSelectedDate(date); 
    const newDate = new Date(date)
    console.log("Selected date:", newDate.getFullYear(), newDate.getMonth() + 1  ); 
  };
  return (
    <>
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">
              <span style={{ color: "#3a9432" }}>+78%</span> from the last month
            </CardTitle>
            <CardText>
              <h2>100</h2>
            </CardText>
            <CardText>
              {" "}
              <img src={SMSSEARCH} alt="" /> Emails sent
            </CardText>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">
              <span style={{ color: "#3a9432" }}>+28%</span> from the last month
            </CardTitle>
            <CardText>
              <h2>76</h2>
            </CardText>
            <CardText>
              {" "}
              <img src={DIRECTBOX} alt="" /> Emails Opened
            </CardText>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">
              <span style={{ color: "#3a9432" }}>+10 %</span> from the last
              month
            </CardTitle>
            <CardText>
              <h2>175</h2>
            </CardText>
            <CardText>
              {" "}
              <img src={SEND} alt="" /> Emails to send
            </CardText>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">
              {" "}
              <span style={{ color: "#ed0520" }}>-42%</span> from the last month
            </CardTitle>
            <CardText>
              <h2>5</h2>
            </CardText>
            <CardText>
              {" "}
              <img src={PROFILRUSER} alt="" /> Leads Generated
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row className="">
        <Col md="3" className="d-flex flex-column ms-5 mt-2">
          <h2>Email Analytics</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Select Month"}
              value={selectedDate} 
              onChange={handleDateChange}
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
          </p>
          <h4 className="ms-3">100 mail</h4>
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
          </p>
          <h4 className="ms-3">76 mail</h4>
          <p className="mt-2">
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
          </p>
          <h4 style={{ marginTop: "0px" }} className="ms-3">
            56 mail
          </h4>
        </Col>
        <Col md="8" className="ms-auto me-2">
          <EmailAnalyticsChart
            months={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
            ]}
            years={[2024]}
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboardpage;
