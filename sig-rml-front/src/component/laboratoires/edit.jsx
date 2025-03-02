import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';

function EditLabo({ show, handleClose }) {

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 1, label: 'Etudiant' },
    { value: 2, label: 'Responsable Laboratoire' },
    { value: 3, label: 'Administrateur' },
  ];
 

  return (
    <>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modification de laboratoire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
           

            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Responsable de laboratoire</Form.Label>
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Libellé du laboratoire</Form.Label>
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

export default EditLabo;