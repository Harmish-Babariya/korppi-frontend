import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import api from "../../../service/api";

const CompanyEditModal = ({
  editModalOpen,
  setEditModalOpen,
  fetchCompany,
  companyid,
}) => {
  const [editedCompany, setEditedCompany] = useState({});
  const handleEditGetByID = async () => {
    try {
      const resData = await api.post("/client/getById", { id: companyid });
      if (resData.isSuccess) {
        const { name, postalCode, region, revenue, size, country } =
          resData.data;
        const editdata = {
          name: name,
          postalCode: postalCode,
          region: region,
          revenue: revenue,
          size: size,
          country: country,
        };
        setEditedCompany(editdata);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error("Failed to fetch company data", error);
    }
  };
  useEffect(() => {
    if (editModalOpen && companyid) {
      handleEditGetByID();
    }
  }, [editModalOpen, companyid]);
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
    const updatedData = { ...editedCompany, id: companyid };
    try {
      const resData = await api.post("/client/update", updatedData);
      if (resData.isSuccess) {
        toast.success("Company Update Successful");
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
        <Button variant="contained" className="ms-2" onClick={handleEditSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompanyEditModal;
