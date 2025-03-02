//import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useState } from 'react';
import axios from 'axios';

function CreateReservations({ show, handleClose }) {
 
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [comment, setComment] = useState('');
  

 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Créez un objet pour envoyer les données
    const userData = {
     
      start_date,
      end_date,
      comment,
      
    };

    try {
      // Envoi des données vers le serveur (mettez l'URL de votre API ici)
      const response = await axios.post('URL_DE_VOTRE_API', userData);
      
      if (response.status === 200) {
        console.log('Utilisateur créé avec succès');
        handleClose(); // Ferme le modal après succès
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur', error);
    }
  };


 
  
 
 

  return (
    <>
      

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>

                <Modal.Header closeButton>
                <Modal.Title>Reservation d'un équipement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    

                    <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Date Debut</Form.Label>
                    <Form.Control
                        type="date"
                        value={start_date}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Date Fin</Form.Label>
                    <Form.Control
                        type="date"
                        value={end_date}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Commentaire</Form.Label>
                    <Form.Control
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
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
                        <Button variant="primary" type="submit">
                        Enregistrer
                        </Button>
                    </div>
                    </div>

                </Form>
                </Modal.Body>
            </Modal>
    </>
  );
}

export default CreateReservations;