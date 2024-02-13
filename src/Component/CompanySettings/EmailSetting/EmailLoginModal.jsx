import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import Input from "../../Input";
import { toast } from "react-toastify";
import api from "../../../service/api";
import { theme } from "../../../Theme/Theme";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, loginhandle } from "../../../Redux/AuthSlice";
import { FcGoogle } from "react-icons/fc";
import { TfiMicrosoftAlt } from "react-icons/tfi";


const EmailLoginModal = ({ show, setShow }) => {
  let userDatails = useSelector((state) => state.login.userDatails);
  const [email, setEmail] = useState(userDatails.emailConfig.email);
  const [password, setPassword] = useState(userDatails.emailConfig.password);
  const [SMPTServer, setSMPTServer] = useState(userDatails.emailConfig.smtpServer);
  const [SMPTPort, setSMPTPort] = useState(userDatails.emailConfig.smtpPort);
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, SMPTServer, SMPTPort);
    try {
      const editedUser = {
        emailConfig: {
          email: email,
          password: password,
          smtpServer: SMPTServer,
          smtpPort: SMPTPort,
        },
        id: userDatails._id,
      };
      const resData = await api.post("/user/update", editedUser);
      if (resData.isSuccess) {
        toast.success("User Update SuccessFull");
        // dispatch(fetchUser)
      } else {
        toast.error(resData.message);
      }
      
      try {
        let response = await api.post("user/getById");
        if (response.isSuccess) {
          dispatch(loginhandle(response.data));
          userDatails = useSelector((state) => state.login.userDatails);
        } else {
          toast.error(response.response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error)
      toast.error("User Data Not Updated", error);
    }
  };
  const handleClose = () => setShow(false);

  return (
    <>
      {" "}
      <Modal show={show} onHide={handleClose} style={{ marginTop: "70px" }}>
        <Modal.Header className="" closeButton></Modal.Header>
        <Modal.Body className="mx-auto ">
          <Modal.Title
            style={{
              color: `${theme.palette.primary.main}`,
              letterSpacing: "2px",
            }}
            className="text-center fw-bold fs-2"
          >
            Login
          </Modal.Title>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "45ch" },
            }}
            autoComplete="off"
          >
            <div className="d-flex flex-column mb-4">
              <Input
                id={"email"}
                lebel={"Email"}
                className={"mb-2"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size={"small"}
                classnamelebal={"mb-1.5 fs-6 fw-medium"}
              />

              <Input
                id={"password"}
                lebel={"Password"}
                className={"mb-2"}
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size={"small"}
                classnamelebal={"mb-1.5 fs-6 fw-medium"}
              />
              <Input
                id={"SMPT Server"}
                lebel={"SMPT Server"}
                className={"mb-2"}
                type={"text"}
                value={SMPTServer}
                onChange={(e) => setSMPTServer(e.target.value)}
                size={"small"}
                classnamelebal={"mb-1.5 fs-6 fw-medium"}
              />

              <Input
                id={"SMPT port"}
                lebel={"SMPT Port"}
                className={"mb-2"}
                type={"text"}
                value={SMPTPort}
                onChange={(e) => setSMPTPort(e.target.value)}
                size={"small"}
                classnamelebal={"mb-1.5 fs-6 fw-medium"}
              />

              <Button
                type="submit"
                variant="outlined"
                className="btn mt-3 fw-bold text-white "
                style={{
                  backgroundColor: `${theme.palette.primary.main}`,
                  letterSpacing: "2px",
                }}
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
              <div className="d-flex flex-row">
              <Button
                variant="outlined"
                className="btn mt-3 text-bg-light w-50"
                style={{
                  backgroundColor: `white`,
                  letterSpacing: "2px",
                }}
              >
                <FcGoogle fontSize={"2.5rem"} /> &nbsp; Login With Google
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                className="btn mt-3 text-bg-light w-50"
              >
                <TfiMicrosoftAlt color="blue" fontSize={"1.5rem"} /> &nbsp; Login With Office 
              </Button>
              </div>
            </div>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmailLoginModal;
