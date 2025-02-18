//import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditUser({ show, handleClose }) {
 

  return (
    <>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Création d'utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                <Form.Label>Groupe</Form.Label>
                  <Form.Select
                    type="text"
                    autoFocus />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Nom Complet</Form.Label>
              <Form.Control
                type="text"
                autoFocus />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  autoFocus />
              </Form.Group>

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;