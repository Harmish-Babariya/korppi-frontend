import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ show, handleClose, handleDeleteUser }) => {
  return (
    <Modal show={show} onHide={handleClose} style={{marginTop:"200px"}}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteUser}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
