//import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { useState } from 'react';
import axios from 'axios';

function EditUser({ show, handleClose }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  

  const options = [
    { value: 1, label: 'Etudiant' },
    { value: 2, label: 'Responsable Laboratoire' },
    { value: 3, label: 'Administrateur' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Créez un objet pour envoyer les données
    const userData = {
      role: selectedOption ? selectedOption.value : null,
      username,
      firstName,
      lastName,
      email,
    
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
      

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Création d'utilisateur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Role</Form.Label>
                <Select
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              

             

              <div className="row mt-3">
                <div className="col d-flex justify-content-start mt-3">
                  <Button variant="secondary" onClick={handleClose}>
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

export default EditUser;