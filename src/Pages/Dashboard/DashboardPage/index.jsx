import React, { useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Chart from "chart.js/auto";
import MyChart from "../chart";

import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Card, CardBody, CardTitle, Row, Col, CardText } from "reactstrap";
import EmailIcon from "@mui/icons-material/Email";
import IosShareIcon from "@mui/icons-material/IosShare";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ContactPageIcon from "@mui/icons-material/ContactPage";

// const chartSetting = {
//   xAxis: [
//     {
//       label: "rainfall (mm)",
//     },
//   ],
//   width: 500,
//   height: 400,
// };
// const dataset = [
//   {
//     london: 59,
//     paris: 57,
//     newYork: 86,
//     seoul: 21,
//     month: "Jan",
//   },
//   {
//     london: 50,
//     paris: 52,
//     newYork: 78,
//     seoul: 28,
//     month: "Fev",
//   },
//   {
//     london: 47,
//     paris: 53,
//     newYork: 106,
//     seoul: 41,
//     month: "Mar",
//   },
//   {
//     london: 54,
//     paris: 56,
//     newYork: 92,
//     seoul: 73,
//     month: "Apr",
//   },
//   {
//     london: 57,
//     paris: 69,
//     newYork: 92,
//     seoul: 99,
//     month: "May",
//   },
//   {
//     london: 60,
//     paris: 63,
//     newYork: 103,
//     seoul: 144,
//     month: "June",
//   },
//   {
//     london: 59,
//     paris: 60,
//     newYork: 105,
//     seoul: 319,
//     month: "July",
//   },
//   {
//     london: 65,
//     paris: 60,
//     newYork: 106,
//     seoul: 249,
//     month: "Aug",
//   },
//   {
//     london: 51,
//     paris: 51,
//     newYork: 95,
//     seoul: 131,
//     month: "Sept",
//   },
//   {
//     london: 60,
//     paris: 65,
//     newYork: 97,
//     seoul: 55,
//     month: "Oct",
//   },
//   {
//     london: 67,
//     paris: 64,
//     newYork: 76,
//     seoul: 48,
//     month: "Nov",
//   },
//   {
//     london: 61,
//     paris: 70,
//     newYork: 103,
//     seoul: 25,
//     month: "Dec",
//   },
// ];

// const valueFormatter = (value) => `${value}mm`;

const Dashboardpage = () => {
  return (
    <>
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">28% from the last month</CardTitle>
            <CardText>
              <h2>100</h2>
            </CardText>
            <CardText>
              {" "}
              <EmailIcon style={{ color: "#AF4650" }} /> Email send
            </CardText>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">28% from the last month</CardTitle>
            <CardText>
              <h2>76</h2>
            </CardText>
            <CardText>
              {" "}
              <LocalPrintshopIcon style={{ color: "#81ACA8" }} /> Email opened
            </CardText>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">
              +10 <span style={{ color: "#AF4650" }}>%</span> from the last
              month
            </CardTitle>
            <CardText>
              <h2>175</h2>
            </CardText>
            <CardText>
              {" "}
              <ContactPageIcon style={{ color: "#AF4650" }} /> Email to send
            </CardText>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">-28% from the last month</CardTitle>
            <CardText>
              <h2>5</h2>
            </CardText>
            <CardText>
              {" "}
              <IosShareIcon style={{ color: "#81ACA8" }} /> Email send
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row className="">
        <Col md="3" style={{ lineHeight: "2px" }} className="ms-5 mt-2">
          <h2>Email Analytics</h2>
          <select name="Month" id="Month">
            <option value="" selected>
              Select Month
            </option>
            <option value="">Jan</option>
            <option value="">Feb</option>
            <option value="">march</option>
            <option value="">April</option>
            <option value="">May</option>
          </select>
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
          <h4 className="ms-3">56 mail</h4>
        </Col>
        <Col md="8" className="ms-auto me-2">
          <MyChart />
        </Col>
      </Row>
    </>
  );
};

export default Dashboardpage;
