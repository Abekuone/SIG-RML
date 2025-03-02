import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function ShowEquip({ showModal, handleCloseModal, selectedEquip }) {
    return (
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false} animation={false} className='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>Details de l'équipement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEquip ? (
            <>
            <div className='row col-lg-12 col-md-12 col-sm-12'>
                <div className="row col-lg-6 col-md-12 col-sm-12 ">
                    <Form.Group className="mb-3 d-flex flex-wrap" controlId="Name">
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'><strong>Nom :</strong></Form.Label>
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'>{selectedEquip.name}</Form.Label>       
                    </Form.Group>
                </div>
                <div className="row col-lg-6 col-md-12-col-sm-12 ">
                    <Form.Group className="mb-3 d-flex flex-wrap" controlId="type">
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'><strong>Type :</strong></Form.Label>
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'>{selectedEquip.type}</Form.Label>       
                    </Form.Group>
                </div>
            </div>
            <div className='row col-lg-12 col-md-12 col-sm-12'>
                <div className="row col-lg-12 col-md-12-col-sm-12 ">
                    <Form.Group className="mb-3 d-flex flex-wrap" controlId="type">
                        <Form.Label className='col-lg-3 col-md-6 col-sm-12'><strong>Description :</strong></Form.Label>
                        <Form.Label className='col-lg-9 col-md-6 col-sm-12'>{selectedEquip.description}</Form.Label>       
                    </Form.Group>
                </div>
            </div>

            <div className='row col-lg-12 col-md-12 col-sm-12'>
                <div className="row col-lg-6 col-md-12 col-sm-12 ">
                    <Form.Group className="mb-3 d-flex flex-wrap" controlId="quantite">
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'><strong>Quantité :</strong></Form.Label>
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'>{selectedEquip.quantity}</Form.Label>       
                    </Form.Group>
                </div>
                <div className="row col-lg-6 col-md-12-col-sm-12 ">
                    <Form.Group className="mb-3 d-flex flex-wrap" controlId="type">
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'><strong>Qualité :</strong></Form.Label>
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'>{selectedEquip.quality}</Form.Label>       
                    </Form.Group>
                </div>
            </div>

            <div className='row col-lg-12 col-md-12 col-sm-12'>
                <div className="row col-lg-6 col-md-12 col-sm-12 ">
                    <Form.Group className="mb-3 d-flex flex-wrap" controlId="quantite">
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'><strong>Propretaire :</strong></Form.Label>
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'>{selectedEquip.proprietaire_id}</Form.Label>       
                    </Form.Group>
                </div>
                <div className="row col-lg-6 col-md-12-col-sm-12 ">
                    <Form.Group className="mb-3 d-flex flex-wrap" controlId="type">
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'><strong>Mutualisable :</strong></Form.Label>
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'>{selectedEquip.is_shared ? "Mutualisable" : "Non mutualisable"}</Form.Label>       
                    </Form.Group>
                </div>
            </div>

            <div className='row col-lg-12 col-md-12 col-sm-12'>
                <div className="row col-lg-6 col-md-12 col-sm-12 ">
                    <Form.Group className="mb-3 d-flex flex-wrap" controlId="quantite">
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'><strong>Créée le :</strong></Form.Label>
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'>{selectedEquip.created_at}</Form.Label>       
                    </Form.Group>
                </div>
                <div className="row col-lg-6 col-md-12-col-sm-12 ">
                    <Form.Group className="mb-3 d-flex flex-wrap" controlId="type">
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'><strong>Modifié le :</strong></Form.Label>
                        <Form.Label className='col-lg-6 col-md-6 col-sm-12'>{selectedEquip.updated_at}</Form.Label>       
                    </Form.Group>
                </div>
            </div>





            </>
          ) : (
            <p>Chargement...</p>
          )}
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
