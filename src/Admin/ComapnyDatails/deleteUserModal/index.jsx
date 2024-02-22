import React from "react";
import { Modal} from "react-bootstrap";
import Button from "../../../Component/Button";
const ConfirmationModal = ({ show, handleClose, handleDeleteUser }) => {
  return (
    <Modal show={show} onHide={handleClose} style={{marginTop:"200px"}}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" className="ms-2" onClick={handleDeleteUser}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
