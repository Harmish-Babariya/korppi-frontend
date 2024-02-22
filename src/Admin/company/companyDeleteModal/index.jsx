import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../Component/Button";
import { toast } from "react-toastify";
import api from "../../../service/api";
const CompanyDeleteModal = ({
  deleteModalShow,
  setDeleteModalShow,
  deletedCompany,
  setDeletedCompany,
  fetchCompany,
}) => {
  const deletecompany = {
    status: 3,
    id: deletedCompany,
  };

  const handleDeleteModalClose = () => setDeleteModalShow(false);

  const handleDelete = async () => {
    try {
      const resData = await api.post("/client/update", deletecompany);
      if (resData.isSuccess) {
        fetchCompany();
        handleDeleteModalClose();
        toast.success("Company deleted successfully");
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error("Failed to delete company", error);
    }
  };
  return (
    <div>
      <Modal
        show={deleteModalShow}
        style={{ marginTop: "200px" }}
        onHide={handleDeleteModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Company?</Modal.Body>
        <Modal.Footer>
        <Button variant="outlined" onClick={handleDeleteModalClose}>
          Cancel
        </Button>
        <Button variant="contained" className="ms-2" onClick={handleDelete}>
          Delete
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyDeleteModal;
