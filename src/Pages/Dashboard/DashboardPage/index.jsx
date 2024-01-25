import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import EmailAnalyticsChart from "../chart";

import { Card, CardBody, CardTitle, Row, Col, CardText } from "reactstrap";
import EmailIcon from "@mui/icons-material/Email";
import IosShareIcon from "@mui/icons-material/IosShare";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const Dashboardpage = () => {
  return (
    <>
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6"><span style={{color:"#AF4650"}}>78%</span> from the last month</CardTitle>
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
            <CardTitle tag="h6"><span style={{color:"#AF4650"}}>28%</span> from the last month</CardTitle>
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
              <span style={{ color: "#AF4650" }}>+10 %</span> from the last
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
            <CardTitle tag="h6"> <span style={{ color: "#AF4650" }}>-42%</span> from the last month</CardTitle>
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
        <Col md="3" className="ms-5 mt-2">
          <h2>Email Analytics</h2>
          <select style={{padding:"5px 15px",border:"1px solid black",borderRadius:"7px"}} name="Month" id="Month">
            <option value="" selected>
              Select Month
            </option>
            <option value="">January</option>
            <option value="">February</option>
            <option value="">March</option>
            <option value="">April</option>
            <option value="">May</option>
            <option value="">June</option>
            <option value="">July</option>
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
          <p  className="mt-1">
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
          <h4 style={{marginTop:"0px"}} className="ms-3">56 mail</h4>
        </Col>
        <Col md="8" className="ms-auto me-2">
          <EmailAnalyticsChart />
        </Col>
      </Row>
    </>
  );
};

export default Dashboardpage;
