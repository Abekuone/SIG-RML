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

export default function IndexUser() {

    const data = [
        { id: 1, Nomcomplet: "Toure Sekou", email: "toure@gmail.com", Groupe: "Enseignant chercheur" },
        { id: 2, Nomcomplet: "KOARE Jean", email: "jean@gmail.com", Groupe: "Étudiant" },
        { id: 3, Nomcomplet: "TRAORE Ali", email: "Ali@gmail.com", Groupe: "Enseignant chercheur" }
      ];
      
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  
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
          <button className="btn btn-warning btn-sm me-2"><CiEdit /></button>
          <button className="btn btn-danger btn-sm"><MdDeleteOutline /></button>
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
      <div className="mx-auto px-3 mb-3 mt-3 col-md-12 col-sm-12 col-lg-12 d-flex flex-wrap align-items-start">
        <div className="row mx-auto col-md-12 col-lg-8 col-sm-12 p-3">
          <Admin />
        </div>

        <div className="row mx-auto card border-0 shadow-sm rounded col-md-12 col-lg-12 col-sm-12 p-3 mt-3">
          <div className="row p-1 mb-1 rounded d-flex flex-wrap justify-content-between align-items-start">
            <div className="col-lg-6 col-md-6 col-sm-12 justify-content-start">
              <p className="text-dark fw-bold">Listes des utilisateurs</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-wrap justify-content-end">
              <button className="btn btn-primary me-2" onClick={handleShow}>
                <CiUser /> Nouveau
              </button>
              <CreateUser show={show} handleClose={handleClose} />
            </div>
          </div>
          <div className="row table-responsive-sm">
          <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Rechercher un utilisateur..." 
                            value={searchText}
                            onChange={handleSearch} 
                        />
                    </div>
            <DataTable columns={columns} data={filteredData} pagination />
          </div>
        </div>
      </div>
    </>
  );
}
