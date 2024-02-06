import React, { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { CgDanger } from "react-icons/cg";
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
      const resData = await api.post("/company/update", deletecompany);
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
        <Modal.Body>
          <h3 className="p-2 pt-3 text-danger">
            <CgDanger />
            Are you sure you want to delete?{" "}
          </h3>
          <div className="d-flex justify-content-center mt-3 mb-2">
            <Button
              variant="outlined"
              className=" px-5"
              onClick={handleDeleteModalClose}
            >
              NO
            </Button>
            <Button
              variant="contained"
              className="ms-2 px-5"
              onClick={handleDelete}
            >
              YES
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CompanyDeleteModal;
