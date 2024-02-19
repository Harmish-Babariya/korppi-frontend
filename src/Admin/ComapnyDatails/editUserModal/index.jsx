import React, { useState, useEffect } from "react";
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
  const [editUser, setEditUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    linkedinUrl: "",
    role: "",
    phone: "",
  });

  useEffect(() => { 

    setEditUser({
      email:editedUser.email,
      firstName:editedUser.firstName,
      lastName:editedUser.lastName,
      linkedinUrl:editedUser.linkedinUrl,
      role:editedUser.role,
      phone:editedUser.phone
    });
  }, [editedUser]);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditedUser({});
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevEditUser) => ({
      ...prevEditUser,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      if (!editUser || Object.keys(editUser).length === 0) {
        toast.error("User data is missing");
        return;
      }

      const resData = await api.post("/user/update", {
        ...editUser,
        id: editedUser._id,
      });

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
        {Object.keys(editUser).map((field, index) => (
          <TextField
            key={index}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={editUser[field]}
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
        <Button
          variant="contained"
          className="ms-2"
          onClick={handleEditSubmit}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
