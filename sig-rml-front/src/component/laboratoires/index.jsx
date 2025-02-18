import React from 'react'
import { useState } from 'react';
//import Button from 'react-bootstrap/Button';
//import Nav from './nav'
import Admin from '../admin'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import DataTable from "react-data-table-component";

import { FaRegCircle } from "react-icons/fa";
import CreateLabo from './create';

export default function IndexLabo() {

    const data = [
        { id: 1, Libelle: "LAMI", Description: "Laboratoire de mathématiques et informatiques",Responsable:"Pr OUARO" },
        { id: 2, Libelle: "LS", Description: "Laboratoires de statistiques",Responsable:"Pr OUARO" },
        { id: 3, Libelle: "LSS", Description: "Laboratoires de science de la santé",Responsable:"Pr OUARO" }
      ];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [searchText, setSearchText] = useState('');
        const [filteredData, setFilteredData] = useState(data);
        
        
            const columns = [
                { 
                    name: "#", 
                    selector: (row, index) => index + 1,  
                    sortable: false, 
                    width: "70px" 
                  },
                { name: "Libelle", selector: row => row.Libelle, sortable: true },
                { name: "Description", selector: row => row.Description, sortable: true },
                { name: "Responsable", selector: row => row.Responsable, sortable: true },
                
                {
                  name: "Action",
                  cell: row => (
                    <div className='d-flex flex-wrap justify-content-center align-items-center'>
                     <button className="btn btn-info btn-sm me-2"><BiShow /></button>
                      <button className="btn btn-warning btn-sm me-2"><CiEdit /></button>
                      <button className="btn btn-danger btn-sm"><MdDeleteOutline /></button>
                    </div>
                  ),
                  ignoreRowClick: true,
                  allowOverflow: true,
                  button: true,
                  width: "200px"
                }
              ];
            
              
            
            
              const handleSearch = (event) => {
                const value = event.target.value;
                setSearchText(value);
            
                const filtered = data.filter(row =>
                    row.Libelle.toLowerCase().includes(value.toLowerCase()) ||
                    row.Description.toLowerCase().includes(value.toLowerCase()) ||
                    row.Responsable.toLowerCase().includes(value.toLowerCase())
                );
                
                setFilteredData(filtered);
            };

  return (
    <>
        <div className="row mx-auto px-3 mb-3 mt-3 col-md-12 col-sm-12 col-lg-12 d-flex flex-wrap align-items-start">
            <div className="row mx-auto col-md-12 col-lg-8  col-sm-12 p-3">
                <Admin />
            </div> 


            <div className=" row mx-auto card border-0 shadow-sm rounded col-md-12 col-lg-12 col-sm-12 p-3">
                <div class="row p-1 mb-1 rounded d-flex flex-wrap justify-content-between align-items-start" >
                    <div class="col-lg-6 col-md-8 col-sm-6 justify-content-start">
                        <p class="text-dark text-start text-sm-start text-md-start  text-lg-start fw-bold">Listes des laboratoires</p>
                    </div>
                    <div class="col-lg-6 col-md-4 col-sm-6 d-flex flex-wrap justify-content-end">
                        <button class="btn btn-primary me-2 fw-500 " onClick={handleShow}><FaRegCircle /> Nouveau</button>
                        <CreateLabo show={show} handleClose={handleClose} />
                        
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
  )
}
