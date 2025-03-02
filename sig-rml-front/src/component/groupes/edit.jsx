import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

function EditGroupe({ show, handleClose }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const options = [
    { value: 'read', label: 'Lire' },
    { value: 'write', label: 'Écrire' },
    { value: 'delete', label: 'Supprimer' },
    { value: 'admin', label: 'Administrateur' },
  ];

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Création de Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Champ Permissions */}
            <Form.Group className="mb-3">
              <Form.Label>Permissions du role</Form.Label>
              <DualListBox
                options={options}
                selected={selectedPermissions}
                onChange={(selected) => setSelectedPermissions(selected)}
              />
            </Form.Group>

            {/* Libellé du Groupe */}
            <Form.Group className="mb-3">
              <Form.Label>Libellé du role</Form.Label>
              <Form.Control type="text" autoFocus />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
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

export default EditGroupe;
