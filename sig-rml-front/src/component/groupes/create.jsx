//import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function CreateGroupe({ show, handleClose }) {
 

  return (
    <>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Création de Groupe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                <Form.Label>Droits du groupe</Form.Label>
                  <Form.Select
                    type="text"
                    autoFocus />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Libellé du groupe</Form.Label>
              <Form.Control
                type="text"
                autoFocus />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Description</Form.Label>
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
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateGroupe;