import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";
const Send = () => {
  return (
    <Row>
    <Col md="4">
      <Card className='m-3'>
        <CardHeader>
          <CardTitle tag="h5">Email Statistics</CardTitle>
          <p className="card-category">Last Campaign Performance</p>
        </CardHeader>
        <CardBody style={{ height: "266px" }}>
    
        </CardBody>
        <CardFooter>
          <div className="legend">
            <i className="fa fa-circle text-primary" /> Opened{" "}
            <i className="fa fa-circle text-warning" /> Read{" "}
            <i className="fa fa-circle text-danger" /> Deleted{" "}
            <i className="fa fa-circle text-gray" /> Unopened
          </div>
          <hr />
          <div className="stats">
            <i className="fa fa-calendar" /> Number of emails sent
          </div>
        </CardFooter>
      </Card>
    </Col>
    <Col md="8">
      <Card className="card-chart m-3">
        <CardHeader>
          <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
          <p className="card-category">Line Chart with Points</p>
        </CardHeader>
        <CardBody>
          {/* <Line
            data={dashboardNASDAQChart.data}
            options={dashboardNASDAQChart.options}
            width={400}
            height={100}
          /> */}
        </CardBody>
        <CardFooter>
          <div className="chart-legend">
            <i className="fa fa-circle text-info" /> Tesla Model S{" "}
            <i className="fa fa-circle text-warning" /> BMW 5 Series
          </div>
          <hr />
          <div className="card-stats">
            <i className="fa fa-check" /> Data information certified
          </div>
        </CardFooter>
      </Card>
    </Col>
  </Row>
  )
}

export default Send
