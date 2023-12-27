import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  CardText,
} from "reactstrap";
import EmailIcon from "@mui/icons-material/Email";
import IosShareIcon from "@mui/icons-material/IosShare";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ContactPageIcon from '@mui/icons-material/ContactPage';
const Dashboardpage = () => {
  return (
    <div className="content">
    {/* <h2 style={{color:"#AF4650"}} className="ms-3 mt-2">Welcome:John Deo</h2> */}
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">28% from the last month</CardTitle>
            <CardText>
              <h2 style={{ color: "#81ACA8" }}>175$</h2>{" "}
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
              <h2 className="text-danger">42$</h2>{" "}
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
              <h2 style={{ color: "#81ACA8" }}>70$</h2>{" "}
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
              <h2 style={{ color: "#AF4650" }} className="">
                8$
              </h2>{" "}
            </CardText>
            <CardText>
              {" "}
              <IosShareIcon style={{ color: "#81ACA8" }} /> Email to send
            </CardText>
           
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="m-3 ">
            <CardHeader>
              <CardTitle tag="h5">Users Behavior</CardTitle>
              <p className="card-category">24 Hours performance</p>
            </CardHeader>
            <CardBody></CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="fa fa-history" /> Updated 3 minutes ago
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboardpage;
