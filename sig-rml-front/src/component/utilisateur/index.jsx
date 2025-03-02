import React, { useState } from "react";
import Admin from "../admin";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CiUser } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import CreateUser from "./create";
import DataTable from "react-data-table-component";
import './index.css'
import EditUser from "./edit";
import DeleteUser from "./deleteuser";
//import Nav from "../nav";

export default function IndexUser() {

    const data = [
        { id: 1, Nomcomplet: "Toure Sekou", email: "toure@gmail.com", Groupe: "Enseignant chercheur" },
        { id: 2, Nomcomplet: "KOARE Jean", email: "jean@gmail.com", Groupe: "Étudiant" },
        { id: 3, Nomcomplet: "TRAORE Ali", email: "Ali@gmail.com", Groupe: "Enseignant chercheur" }
      ];
      
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const customStyles = {
    rows: {
      style: {
        fontSize: '18px', 
        '&:hover': {
          backgroundColor: '#f1f1f1', 
        },
      },
    },
    headCells: {
      style: {
        fontSize: '20px', 
        fontWeight: 'bold',
        backgroundColor: '#1E3A8A',
        color:"white"
      },
    },
    cells: {
      style: {
        fontSize: '18px', 
      },
    },
  };

  

  
  const columns = [
    { 
        name: "#", 
        selector: (row, index) => index + 1,  
        sortable: false, 
        width: "70px" 
      },
    { name: "Nom complet", selector: row => row.Nomcomplet, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Groupe", selector: row => row.Groupe, sortable: true },
    {
      name: "Action",
      cell: row => (
        <div>
          <button className="btn btn-warning btn-sm me-2" onClick={()=> handleShowEdit()}><CiEdit /></button>
          <button className="btn btn-danger btn-sm" onClick={()=> handleShowDelete()}><MdDeleteOutline /></button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  


  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);

    const filtered = data.filter(row =>
        row.Nomcomplet.toLowerCase().includes(value.toLowerCase()) ||
        row.email.toLowerCase().includes(value.toLowerCase()) ||
        row.Groupe.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredData(filtered);
};

  return (
    <>
    <Admin />
      <div className="mx-auto px-3 mb-3 mt-3 col-md-12 col-sm-12 col-lg-12 d-flex flex-wrap align-items-start div-position">
        

        <div className="row mx-auto card border-0 shadow-sm rounded col-md-12 col-lg-12 col-sm-12 p-3 mt-3">
          <div className="row p-1 mb-1 rounded d-flex flex-wrap justify-content-between align-items-start">
            <div className="col-lg-4 col-md-12 col-sm-12 justify-content-start">
              <p className="text-dark fw-bold fs-5">Listes des utilisateurs</p>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Rechercher un utilisateur..." 
                            value={searchText}
                            onChange={handleSearch} 
                        />
                    </div>
            <div className="col-lg-3 col-md-12 col-sm-12 d-flex flex-wrap justify-content-end">
              <button className="btn btn-primary me-2" onClick={handleShow}>
                <CiUser /> Nouveau
              </button>
             
            </div>
          </div>
          <div className="row table-responsive-sm">
         
            <DataTable columns={columns} data={filteredData} pagination customStyles={customStyles} highlightOnHover />
          </div>
        </div>
      </div>
      <CreateUser show={show} handleClose={handleClose} />
      <EditUser show={showEdit} handleClose={handleCloseEdit} />
      <DeleteUser show={showDelete} handleClose={handleCloseDelete} />
    </>
  );
}
