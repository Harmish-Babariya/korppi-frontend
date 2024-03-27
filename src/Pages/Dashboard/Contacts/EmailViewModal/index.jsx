import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../Component/Button";
import { useSelector } from "react-redux";
import { Card } from "reactstrap";
import { TextareaAutosize } from "@mui/material";
import Input from "../../../../Component/Input";
import api from "../../../../service/api";
import { toast } from "react-toastify";

const EmailView = ({ show, setShow, emailData, isSent }) => {
  const [editedEmail, setEditedEmail] = useState({
    subject: emailData[0]?.subject,
    body: emailData[0]?.body,
  });
console.log(emailData)
  const userDatails = useSelector((state) => state.login.userDatails);

  const handleClose = () => setShow(false);

  const handleEmailEdit = async () => {
    try {
      const emailConfig = {
        subject: editedEmail.subject,
        body: editedEmail.body,
        id: emailData[0]?._id,
      };
      const resData = await api.post("/email/update", emailConfig);
      if (resData.isSuccess) {
        toast.success("Email updated successfully");
      } else {
        toast.error(resData.message || "Failed to update email");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("An error occurred while updating email");
    }
  };

  const handleChange = (e) => {
    setEditedEmail({
      ...editedEmail,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      className="modal"
      size="lg"
      dialogClassName="modal-90w w-100"
      style={{ letterSpacing: "1.5px", marginTop: "40px" }}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-medium">Email View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input
          id="subject"
          name="subject"
          className="w-75 mt-1"
          type="text"
          value={editedEmail?.subject}
          readOnly={isSent}
          onChange={handleChange}
        />
        <label htmlFor="email" className="mt-1 d-block">
          Email Body
        </label>
        <TextareaAutosize
          name="body"
          id="body"
          className="rounded-1"
          cols="65"
          rows="9"
          value={editedEmail?.body}
          readOnly={isSent}
          onChange={handleChange}
        />
        <div className="d-flex row">
          <div className="col-6">
            <Card className="mb-1 w-100 p-3 bg-body-secondary">
              <span>
                <span className="fw-bold">Email</span> being generated as:
              </span>
              <span>{`${userDatails.firstName} ${userDatails.lastName}`}</span>
            </Card>
          </div>
          <div className="col">
            {!isSent && (
              <Button
                variant="contained"
                size="large"
                className="ms-5 mt-4"
                onClick={handleEmailEdit}
              >
                Update
              </Button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EmailView;
