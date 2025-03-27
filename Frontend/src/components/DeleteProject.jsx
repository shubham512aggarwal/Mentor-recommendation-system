import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DeleteConfirmationModal = ({ show, onClose, onDelete, projectName }) => {
  const [confirmationText, setConfirmationText] = useState("");

  const handleConfirmDelete = () => {
    if (confirmationText.toLowerCase() === "delete") {
      onDelete();
      setConfirmationText("");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the project <strong>{projectName}</strong>?</p>
        <p>Type <code>delete</code> below to confirm.</p>
        <Form.Control
          type="text"
          placeholder="Type 'delete' to confirm"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button
          variant="danger"
          onClick={handleConfirmDelete}
          disabled={confirmationText.toLowerCase() !== "delete"}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
