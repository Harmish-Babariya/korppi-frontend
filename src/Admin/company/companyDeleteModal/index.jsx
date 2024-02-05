import React, { useState } from 'react';
import { Button} from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { CgDanger } from "react-icons/cg";
import api from '../../../service/api';
const CompanyDeleteModal = ({deleteModalShow,setDeleteModalShow,deletedCompany,setDeletedCompanyy,fetchCompany}) => {
  const deletecompany = {
    id: deletedCompany
}

    const handleDeleteModalClose = () => setDeleteModalShow(false);

    const handleDelete = async () => {
  
        try {
          const resData = await api.post("/company/delete",deletecompany);
          if (resData.isSuccess) {
            toast.success("Company deleted successfully");
            setDeletedCompanyy("")
            fetchCompany(); 
          } else {
            toast.error(resData.message);
          }
        } catch (error) {
          toast.error("Failed to delete company", error);
        }
      };
  return (
    <div>
       <Modal show={deleteModalShow} className='mt-5' onHide={handleDeleteModalClose}>
     
      <Modal.Body>
        <h2 className='p-2 text-danger'><CgDanger />
Are You Sure 
This Data Was Delete </h2>
        <Button variant="contained" className='ms-5' onClick={handleDeleteModalClose}>
          Cancel
        </Button>
        <Button variant="contained"  className="ms-2" onClick={handleDelete}>
          Save
        </Button>
      </Modal.Body>
     
    </Modal>
    </div>
  )
}

export default CompanyDeleteModal
