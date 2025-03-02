import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export default function CreateFile({show,handleClose,selectedEquip}) {
  return (
    <>

<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false} >
        <Modal.Header closeButton>
          <Modal.Title>Ajout de document d'un equipement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap bg-secondary-subtle rounded p-2">
                <Form.Group
                    
                    controlId="exampleForm.Control4" >
                <Form.Label className='desable'>{selectedEquip ? selectedEquip.id+";"+selectedEquip.name : 'Aucun équipement sélectionné'}</Form.Label>
                
                </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
            <Form.Group
               
                controlId="exampleForm.Control4" >
                <Form.Label>Objectif document</Form.Label>
                <Form.Control type='text'  />
              </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
            <Form.Group
               
                controlId="exampleForm.Control4" >
                <Form.Label>Libéllé document</Form.Label>
                <Form.Control type='text'  />
              </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
              
                <Form.Group
                 
                  controlId="exampleForm.Control5" >
                  <Form.Label>Charger le document</Form.Label>
                  <Form.Control type='file'  />
              </Form.Group>
            </div>
              

            
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
