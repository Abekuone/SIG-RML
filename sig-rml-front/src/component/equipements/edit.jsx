import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';

function EditEquip({ show, handleClose,selectedEquip }) {

  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 1, label: 'Etudiant' },
    { value: 2, label: 'Responsable Laboratoire' },
    { value: 3, label: 'Administrateur' },
  ];

  return (
    <>
      {/*<Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>*/}

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false} className='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>Modification d'un equipement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          {selectedEquip ? (
            <>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
              <Form.Group className="col-lg-6 col-md-12 col-sm-12" controlId="exampleForm.ControlInput1">
                  <Form.Label>Responsable de l'equipement</Form.Label>
                  <Select
                      value={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
              </Form.Group>

              <Form.Group className=" col-lg-6 col-md-12 col-sm-12" controlId="exampleForm.ControlInput1">
                  <Form.Label>Laboratoire de l'équipement</Form.Label>
                  <Select
                      value={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
              </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
              <Form.Group className="col-lg-6 col-md-12 col-sm-12" controlId="exampleForm.ControlInput1">
                  <Form.Label>Categorie equipement</Form.Label>
                  <Select
                      value={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
              </Form.Group>

              <Form.Group className="col-lg-6 col-md-12 col-sm-12" controlId="exampleForm.ControlInput2">
              <Form.Label>Libellé Equipement</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus value={selectedEquip.name} />
                  
                </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
              <Form.Group className="col-lg-6 col-md-12 col-sm-12" controlId="exampleForm.ControlInput1">
                  <Form.Label>Qualité de l'equipement</Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus value={selectedEquip.quality}/>
              </Form.Group>

              <Form.Group className="col-lg-6 col-md-12 col-sm-12" controlId="exampleForm.ControlInput1">
                  <Form.Label>Quantité de l'equipement</Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus value={selectedEquip.quantity} />
              </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
              <Form.Group
                className="col-lg-6 col-md-12 col-sm-12"
                controlId="exampleForm.Control4" >
                <Form.Label>Status</Form.Label>
                <Form.Control type='text' value={selectedEquip.status}  />
              </Form.Group>

                <Form.Group
                  className="col-lg-6 col-md-12 col-sm-12"
                  controlId="exampleForm.Control5" >
                  <Form.Label>Image Equipement</Form.Label>
                  <Form.Control type='file'  />
              </Form.Group>
            </div>

            
            <div className="row mb-3 col-lg-12 col-md-12-sm-12 d-flex flex-wrap">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus value={selectedEquip.description}/>
              </Form.Group>
            </div>
            <div className="row mb-3 col-lg-12 col-md-12 col-sm-12 d-flex flex-wrap mx-3">
              <div class="form-check form-switch col-lg-4 col-md-6 col-sm-12">
                  <input className="form-check-input" type="radio" id="flexSwitchCheckDefault" value="option1"/>
                  <label className="form-check-label" for="flexSwitchCheckDefault">Mutualisable</label>
                </div>
                <div className="form-check form-switch col-lg-4 col-md-6 col-sm-12">
                  <input className="form-check-input" type="radio" id="flexSwitchCheckChecked" value="option2" checked/>
                  <label className="form-check-label" for="flexSwitchCheckChecked">Non Mutulisable</label>
                </div>
                
                
            </div>
              
            </>
            
          ):""};
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

export default EditEquip;