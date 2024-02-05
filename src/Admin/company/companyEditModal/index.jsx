import React from "react";
import Modal from "react-bootstrap/Modal";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import api from "../../../service/api";
const CompanyEditModal = ({
  editModalOpen,
  setEditModalOpen,
  editedCompany,
  setEditedCompany,
  fetchCompany
}) => {
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditedCompany({});
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };
  const handleEditSubmit = async () => {
    try {
      const resData = await api.post(
        "/company/update",
        ...editedCompany,
        editedCompany._id
      );
      console.log(resData);
      if (resData.isSuccess) {
        toast.success("Company Update SuccessFull");
        handleEditModalClose();
        fetchCompany(); 
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error("Company Data Not Updated", error);
    }
  };
  return (
    <Modal show={editModalOpen} className="mt-5" onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(editedCompany).map((field, index) => (
          <TextField
            key={index}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={editedCompany[field]}
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
        <Button variant="contained"  className="ms-2" onClick={handleEditSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompanyEditModal;
