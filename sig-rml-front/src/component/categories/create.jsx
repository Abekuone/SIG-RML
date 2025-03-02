import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



export default function CreateCategory({show,handleClose}) {

     
  return (
    <>

<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false} >
        <Modal.Header closeButton>
          <Modal.Title>Création d'une categorie d'equipement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
            <Form.Group
               
                controlId="exampleForm.Control4" >
                <Form.Label>Libellé</Form.Label>
                <Form.Control type='text'  />
              </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
            <Form.Group
               
                controlId="exampleForm.Control4" >
                <Form.Label>Description</Form.Label>
                <Form.Control type='text'  />
              </Form.Group>
            </div>
             
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary">
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
