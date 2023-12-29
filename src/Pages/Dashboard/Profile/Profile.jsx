import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Profile = () => {
  return (
    <div className="content">
      <Row>
        <Col md="4">
          <Card className="card-user m-2 w-100 shadow">
            <CardBody>
              <div
                style={{ backgroundColor: " #81ACA8", color: "white" }}
                className="author text-center rounded "
              >
                <a
                  className="text-decoration-none"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <AccountCircleIcon className="fs-1 m-2 text-white" />
                  <h5 className="title text-white">John Doe</h5>
                  <p className="description text-white pb-2">@johndoe</p>
                </a>
              </div>
              <p className="description text-center">
                "I like the way you work it <br />
                No diggity <br />I wanna bag it up"
              </p>
            </CardBody>
            <CardFooter className="text-center">
              <hr />
              <div className="button-container">
                <Row>
                  <Col className="ml-auto" lg="3" md="6" xs="6">
                    <h5>
                      12 <br />
                      <small>Post</small>
                    </h5>
                  </Col>
                  <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                    <h5>
                      2.2k <br />
                      <small>messages</small>
                    </h5>
                  </Col>
                  <Col className="mr-auto" lg="3">
                    <h5>
                      24,6k <br />
                      <small>Members</small>
                    </h5>
                  </Col>
                </Row>
              </div>
            </CardFooter>
          </Card>
          <Card className="m-2">
            <CardHeader>
              <CardTitle tag="h4">Team Members</CardTitle>
            </CardHeader>
            <CardBody>
              <ul className="list-unstyled team-members">
                <li>
                  <Row>
                    <Col md="2" xs="2">
                      <div className="avatar">
                        <img
                          alt="..."
                          className="img-circle img-no-padding img-responsive"
                          src="Salvatore Roese"
                        />
                      </div>
                    </Col>
                    <Col md="7" xs="7">
                      DJ Khaled <br />
                      <span className="text-muted">
                        <small>Offline</small>
                      </span>
                    </Col>
                    <Col className="text-right" md="3" xs="3">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        outline
                        size="sm"
                      >
                        <i className="fa fa-envelope" />
                      </Button>
                    </Col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <Col md="2" xs="2">
                      <div className="avatar">
                        <img
                          alt="..."
                          className="img-circle img-no-padding img-responsive"
                          // src={require("assets/img/faces/joe-gardner-2.jpg")}
                        />
                      </div>
                    </Col>
                    <Col md="7" xs="7">
                      Creative Tim <br />
                      <span className="text-success">
                        <small>Available</small>
                      </span>
                    </Col>
                    <Col className="text-right" md="3" xs="3">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        outline
                        size="sm"
                      >
                        <i className="fa fa-envelope" />
                      </Button>
                    </Col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <Col md="2" xs="2">
                      <div className="avatar">
                        <img
                          alt="..."
                          className="img-circle img-no-padding img-responsive"
                          src={"assets/img/faces/clem-onojeghuo-2.jpg"}
                        />
                      </div>
                    </Col>
                    <Col className="col-ms-7" xs="7">
                      Flume <br />
                      <span className="text-danger">
                        <small>Busy</small>
                      </span>
                    </Col>
                    <Col className="text-right" md="3" xs="3">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        outline
                        size="sm"
                      >
                        <i className="fa fa-envelope" />
                      </Button>
                    </Col>
                  </Row>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col md="8">
          <Card className="card-user m-2 shadow ">
            <CardHeader style={{ backgroundColor: " #81ACA8", color: "white" }}>
              <CardTitle tag="h5">Edit Profile</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>Company</label>
                      <Input
                        defaultValue="Creative Code Inc."
                        placeholder="Company"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="3">
                    <FormGroup>
                      <label>Username</label>
                      <Input
                        defaultValue="michael23"
                        placeholder="Username"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <Input placeholder="Email" type="email" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>First Name</label>
                      <Input placeholder="First Name" type="text" />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Last Name</label>
                      <Input placeholder="Last Name" type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Address</label>
                      <Input
                        defaultValue="Melbourne, Australia"
                        placeholder="Home Address"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>City</label>
                      <Input
                        defaultValue="Melbourne"
                        placeholder="City"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="4">
                    <FormGroup>
                      <label>Country</label>
                      <Input
                        defaultValue="Australia"
                        placeholder="Country"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Postal Code</label>
                      <Input placeholder="ZIP Code" type="number" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        type="textarea"
                        defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button
                      className="btn-round border-0"
                      style={{ backgroundColor: " #81ACA8" }}
                      type="submit"
                    >
                      Update Profile
                    </Button>
                  </div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
