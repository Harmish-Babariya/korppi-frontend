import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Row,
  Col,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../../Component/Input";
import { toast } from "react-toastify";
import { theme } from "../../../Theme/Theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { updateUserData } from "../../../Redux/AuthSlice";
import api from "../../../service/api";
const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userDatails);
  const [editedUserData, setEditedUserData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, role, linkedinUrl } = editedUserData;
    const userUpdate = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      linkedinUrl: linkedinUrl,
      id: userData._id,
    };
    try {
      const updateUser = await api.post("/user/update", userUpdate);
      if (updateUser.isSuccess) {
        dispatch(updateUserData(updateUser.data));
        setEditedUserData(updateUser.data);
        toast.success("User Update Successful");
      } else {
        toast.error(resData.message || "User Update Failed");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };
  return (
    <div>
      <Row>
        <Col md="7">
          <Card className="card-user m-2 w-100 shadow ">
            <CardBody>
              <div
                style={{
                  backgroundColor: `${theme.palette.primary.main}`,
                  color: "white",
                }}
                className="author text-center rounded "
              >
                <a
                  className="text-decoration-none"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <AccountCircleIcon className="fs-1 m-2 text-white" />
                  <h5 className="title text-white">{userData.firstName}</h5>
                  <p className="description text-white pb-2">
                    {userData.lastName}
                  </p>
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
                    <h6>
                      12 <br />
                      <small>Post</small>
                    </h6>
                  </Col>
                  <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                    <h6>
                      2.2k <br />
                      <small>messages</small>
                    </h6>
                  </Col>
                  <Col className="mr-auto" lg="3">
                    <h6>
                      24,6k <br />
                      <small>Members</small>
                    </h6>
                  </Col>
                </Row>
              </div>
            </CardFooter>
          </Card>
          <Card className="m-2">
            <CardHeader
              style={{
                backgroundColor: `${theme.palette.primary.main}`,
                color: "white",
              }}
            >
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
                          className="w-50 h-50 rounded-5"
                          src="https://randomuser.me/api/portraits/men/75.jpg"
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
                        className=""
                        variant="outlined"
                        color="success"
                        outline
                        size="sm"
                      >
                        view
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
                          className="w-50 h-50 rounded-5"
                          src="https://randomuser.me/api/portraits/men/75.jpg"
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
                        variant="outlined"
                        className=""
                        color="success"
                        outline
                        size="sm"
                      >
                        view{" "}
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
                          className="w-50 h-50 rounded-5"
                          src="https://randomuser.me/api/portraits/men/75.jpg"
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
                        variant="contained"
                        className="text-white"
                        size="sm"
                      >
                        view{" "}
                      </Button>
                    </Col>
                  </Row>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-user m-2 shadow ">
            <CardHeader
              style={{
                backgroundColor: `${theme.palette.primary.main}`,
                color: "white",
              }}
            >
              <CardTitle tag="h5">Edit Profile</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row className="mt-3 ">
                  <Col className="pr-1 d-flex flex-column" md="6">
                    <Input
                      id={"firstname"}
                      name={"firstName"}
                      lebel={"First Name"}
                      type={"text"}
                      value={editedUserData.firstName}
                      onChange={handleInputChange}
                      size={"small"}
                    />
                  </Col>
                  <Col className="pl-1 d-flex flex-column" md="6">
                    <Input
                      id={"last name"}
                      lebel={"Last Name"}
                      name={"lastName"}
                      className={""}
                      type={"text"}
                      value={editedUserData.lastName}
                      onChange={handleInputChange}
                      size={"small"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex flex-column mt-2" md="12">
                    <Input
                      id={"email"}
                      lebel={"Email"}
                      name={"email"}
                      type={"email"}
                      value={editedUserData.email}
                      onChange={handleInputChange}
                      size={"small"}
                    />{" "}
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="d-flex flex-column mt-2">
                    <Input
                      id={"role"}
                      lebel={"Role"}
                      name={"role"}
                      type={"text"}
                      value={editedUserData.role}
                      onChange={handleInputChange}
                      size={"small"}
                    />
                  </Col>
                </Row>
                <Row className="">
                  <Col className="d-flex flex-column mt-2" md="12">
                    <Input
                      id={"linkedinUrl"}
                      lebel={"LinkedinUrl"}
                      name={"linkedinUrl"}
                      className={""}
                      type={"text"}
                      value={editedUserData.linkedinUrl}
                      onChange={handleInputChange}
                      size={"small"}
                    />
                  </Col>
                </Row>

                <Row>
                  <div className=" mr-auto mt-2">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      onClick={handleSubmit}
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
