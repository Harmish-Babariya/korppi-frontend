import React, { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import api from "../../../service/api";

const EditUserModal = ({
  editModalOpen,
  setEditModalOpen,
  editedUser,
  setEditedUser,
  fetchUsers,
}) => {
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditedUser({});
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
        if (!editedUser) {
            toast.error("User data is missing");
            return;
          }
      const resData = await api.post("/user/update", editedUser);
      if (resData.isSuccess) {
        toast.success("User Update Successful");
        handleEditModalClose();
        fetchUsers();
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error("User Data Not Updated", error);
    }
  };

  return (
    <Modal show={editModalOpen} className="mt-5" onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(editedUser).map((field, index) => (
          <TextField
            key={index}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={editedUser[field]}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" onClick={handleEditModalClose}>
          Cancel
        </Button>
        <Button variant="contained" className="ms-2" onClick={handleEditSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
