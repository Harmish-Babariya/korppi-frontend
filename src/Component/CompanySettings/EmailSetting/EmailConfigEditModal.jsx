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
const EmailConfigEditModal = ({
  showEmailConfigEdit,
  setShowEmailConfigEdit,
  editedConfig,
  fetchUser,
}) => {
  let userDatails = useSelector((state) => state.login.userDatails);
  const [oldEmail, setOldEmail] = useState(editedConfig?.email);
  const [email, setEmail] = useState(editedConfig?.email);
  const [password, setPassword] = useState(editedConfig?.password);
  const [SMPTServer, setSMPTServer] = useState(editedConfig?.smtpServer);
  const [SMPTPort, setSMPTPort] = useState(editedConfig?.smtpPort);
  const [imapServer, setImapServer] = useState(editedConfig?.imapServer);
  const [imapPort, setImapPort] = useState(editedConfig?.imapPort);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempEmailConfig = [...userDatails.emailConfig];
    tempEmailConfig = tempEmailConfig?.map((value, index) => {
      if (value.email === oldEmail) {
        return {
          email: email,
          password: password,
          smtpServer: SMPTServer,
          smtpPort: SMPTPort,   
          imapServer: imapServer,
          imapPort: imapPort,
          isActive: editedConfig?.isActive,
        };
      }
      return value;
    });

    try {
      const editedUser = {
        emailConfig: tempEmailConfig,
        id: userDatails._id,
      };
      const resData = await api.post("/user/update", editedUser);
      if (resData.isSuccess) {
        toast.success("User EmailConfig Update Successful");
        fetchUser();
        setShowEmailConfigEdit(false);
      } else {
        toast.error(resData.message);
      }

      //   try {
      //     let response = await api.post("user/getById");
      //     if (response.isSuccess) {
      //       dispatch(loginhandle(response.data));
      //       userDatails = useSelector((state) => state.login.userDatails);
      //     } else {
      //       toast.error(response.response.data.message);
      //     }
      //   } catch (error) {
      //     console.error(error);
      //   }
    } catch (error) {
      toast.error("User Data Not Updated", error);
    }
  };
  const handleClose = () => setShowEmailConfigEdit(false);

  return (
    <>
      <Modal
        show={showEmailConfigEdit}
        onHide={handleClose}
        style={{ marginTop: "70px" }}
      >
        <Modal.Header className="" closeButton></Modal.Header>
        <Modal.Body className="mx-auto ">
          <Modal.Title
            style={{
              color: `${theme.palette.primary.main}`,
              letterSpacing: "2px",
            }}
            className="text-center fw-bold fs-2"
          >
            Update Email
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
              <Input
                id={"imapServer"}
                lebel={"IMAP Server"}
                className={"mb-2"}
                type={"text"}
                value={imapServer}
                onChange={(e) => setImapServer(e.target.value)}
                size={"small"}
                labelClassName={"mb-1.5 fs-6 fw-medium"}
              />

              <Input
                id={"imapPort"}
                lebel={"IMAP Port"}
                className={"mb-2"}
                type={"text"}
                value={imapPort}
                onChange={(e) => setImapPort(e.target.value)}
                size={"small"}
                labelClassName={"mb-1.5 fs-6 fw-medium"}
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
                Update
              </Button>
            </div>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmailConfigEditModal;
