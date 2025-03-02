import React from 'react'

import { useState } from 'react';
import Admin from '../admin'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BiShow } from "react-icons/bi";
import DataTable from "react-data-table-component";
import "./index.css";
//import Nav from "../nav";



export default function IndexDroit() {

    const data = [
        { id: 1, Libelle: "ADMIN-EQUIPEMENT-CREATE", Description: "Le DROIT DE CREATION D'UN EQUIPEMENT" },
        { id: 2, Libelle: "ADMIN-EQUIPEMENT-EDIT", Description: "LE DROIT DE MODIFIER UN EQUIPEMENT" },
        { id: 3, Libelle: "ADMIN-EQUIPEMENT-DELETE", Description: "LE DROIT DE SUPPRIMER UN EQUIPEMENT" }
      ];

       const [searchText, setSearchText] = useState('');
       const [filteredData, setFilteredData] = useState(data);


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
                   { name: "Libelle", selector: row => row.Libelle, sortable: true },
                   { name: "Description", selector: row => row.Description, sortable: true },
                   
                   {
                     name: "Action",
                     cell: row => (
                       <div className='d-flex flex-wrap justify-content-center align-items-center'>
                        <button className="btn btn-info btn-sm me-2"><BiShow /></button>
                         
                       </div>
                     ),
                     ignoreRowClick: true,
                     allowOverflow: true,
                     button: true,
                     width: "100px"
                   }
                 ];
               
                 
               
               
                 const handleSearch = (event) => {
                   const value = event.target.value;
                   setSearchText(value);
               
                   const filtered = data.filter(row =>
                       row.Libelle.toLowerCase().includes(value.toLowerCase()) ||
                       row.Description.toLowerCase().includes(value.toLowerCase()) 
                       
                   );
                   
                   setFilteredData(filtered);
               };
    
  return (
    <>
    <Admin />


    <div className="mx-auto px-3 mb-3 mt-3 col-md-12 col-sm-12 col-lg-12 d-flex flex-wrap align-items-start div-position">
            


            <div className="row mx-auto card border-0 mt-3 shadow-sm col-md-12 col-lg-12 col-sm-12 p-3">
              <div className="row p-1 mb-1 rounded d-flex flex-wrap justify-content-between align-items-center">
                  <div className="col-lg-4 col-md-8 col-sm-6">
                      <p className="text-dark text-start fw-bold fs-5">Listes des équipements</p>
                  </div>
                  <div className="col-md-6 col-lg-5 col-sm-12">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Rechercher laboratoire..." 
                            value={searchText}
                            onChange={handleSearch} 
                        />
                    </div>
             
                  </div>
                  <div className="row table-responsive-sm dataTable-container">
                      <DataTable columns={columns} data={filteredData} pagination customStyles={customStyles} highlightOnHover />
                  </div>

                </div>
               
              </div>



      
                    
                
    </>
  )
}
