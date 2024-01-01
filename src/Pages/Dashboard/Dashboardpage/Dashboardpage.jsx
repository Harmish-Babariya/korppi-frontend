import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
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
import ContactPageIcon from "@mui/icons-material/ContactPage";

const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Fev",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

const valueFormatter = (value) => `${value}mm`;

const Dashboardpage = () => {
  return (
    <div className="">
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card body className="m-3 shadow">
            <CardTitle tag="h6">28% from the last month</CardTitle>
            <CardText>
            <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart
          plotType="bar"
          data={[1, 4, 2, 5, 7, 2, 4, 6]}
          height={100}
        />
      </Box>
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
            <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} height={100} />
      </Box>
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
            <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart
          plotType="bar"
          data={[1, 4, 2, 5, 7, 2, 4, 6]}
          height={100}
        />
      </Box>            </CardText>
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
            <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} height={100} />
      </Box>
            </CardText>
            <CardText>
              {" "}
              <IosShareIcon style={{ color: "#81ACA8" }} /> Email send
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="m-3 ">
            <CardBody>
              <div className="d-flex">
                <BarChart
                  series={[
                    { data: [3, 4, 1, 6, 5], stack: "A", label: "Series A1" },
                    { data: [4, 3, 1, 5, 8], stack: "A", label: "Series A2" },
                    { data: [4, 2, 5, 4, 1], stack: "B", label: "Series B1" },
                    { data: [2, 8, 1, 3, 1], stack: "B", label: "Series B2" },
                    { data: [10, 6, 5, 8, 9], label: "Series C1" },
                  ]}
                  width={600}
                  height={350}
                />
                <BarChart
                  dataset={dataset}
                  yAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={[
                    {
                      dataKey: "seoul",
                      label: "Seoul rainfall",
                      valueFormatter,
                    },
                  ]}
                  layout="horizontal"
                  {...chartSetting}
                />{" "}
              </div>{" "}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboardpage;
