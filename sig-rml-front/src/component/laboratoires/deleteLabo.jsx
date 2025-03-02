import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



export default function DeleteLabo({ show, handleClose }) {
  return (
    <>

<Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Suppression d'un laboratoire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Etes-vous sur de vouloir supprimer ce laboratoire ?</Form.Label>
                <Form.Control
                  type="hidden"
                  value=""
                
                  required
                />
              </Form.Group>

              

             

              <div className="row mt-3">
                <div className="col d-flex justify-content-start mt-3">
                  <Button variant="warning" onClick={handleClose}>
                    Annuler
                  </Button>
                </div>
                <div className="col d-flex justify-content-end mt-3">
                  <Button variant="danger" type="submit">
                    Supprimer
                  </Button>
                </div>
              </div>

            </Form>
          </Modal.Body>
        </Modal>
    
    </>
  )
}
