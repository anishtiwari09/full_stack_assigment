import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmationModal(props) {
  return (
    <Modal
    backdrop="static"
    keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...props}
    >

      <Modal.Body>
   <h4>Quiz Created Successfully</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



