import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export default function CreateRapport({show,handleClose,selectedReservation}) {
  return (
    <>

<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false} >
        <Modal.Header closeButton>
          <Modal.Title>Creation du rapport d'une reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap bg-secondary-subtle rounded p-2">
                <Form.Group
                    
                    controlId="exampleForm.Control4" >
                <Form.Label className='desable'>{selectedReservation ? selectedReservation.id+";"+selectedReservation.start_date+";"+selectedReservation.end_date : 'Aucun équipement sélectionné'}</Form.Label>
                
                </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
            <Form.Group
               
                controlId="exampleForm.Control4" >
                <Form.Label>Libellé du Rapport</Form.Label>
                <Form.Control type='text'  />
              </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
            <Form.Group className="mb-3">
              <Form.Label>Commentaire</Form.Label>
              <Form.Control as="textarea" rows={3} />
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
