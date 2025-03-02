import React from 'react'
import { useState} from 'react';
//import Button from 'react-bootstrap/Button';
//import Nav from './nav'
import Admin from '../admin'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import DataTable from "react-data-table-component";
//import Nav from "../nav";
import { FaRegCircle } from "react-icons/fa";

//import axios from 'axios';
import './index.css'
import CreateCategory from './create';
import EditCategory from './edit';




export default function IndexCategory() {


  const data = [
    {id: 1, name: "file ordinateur", description: "Cest un document representant le mode d'utilisation"  },
    {id: 2, name: "file ordinateur", description: "Cest un document representant le mode d'utilisation" },
    {id: 3, name: "file ordinateur", description: "Cest un document representant le mode d'utilisation" },
  ];


    const [showEdit, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    //const [showDelete, setShowDelete] = useState(false);

    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    //const handleCloseDelete = () => setShowDelete(false);
    //const handleShowDelete = () => setShowDelete(true);

    //const [data, setData] = useState([]);  // Stocke les équipements
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);
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
                { name: "Libellé", selector: row => row.name, sortable: true },
                { name: "Description", selector: row => row.description, sortable: true },
               
                
                {
                  name: "Action",
                  cell: row => (
                    <div className='d-flex flex-wrap justify-content-center align-items-center'>
                     
                      <button className="btn btn-warning btn-sm me-2" onClick={()=>handleShowEdit()}><CiEdit /></button>
                      <button className="btn btn-danger btn-sm" ><MdDeleteOutline /></button>
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
                  row.name.toLowerCase().includes(value.toLowerCase()) ||
                  row.description.toLowerCase().includes(value.toLowerCase()) 
                 
              );
              
                
                setFilteredData(filtered);
            };

  return (
    <>
    <Admin />
        <div className="row mx-auto px-3 mb-3 mt-3 col-md-12 col-sm-12 col-lg-12 d-flex flex-wrap align-items-start div-position">
            


            <div className=" row mx-auto card border-0 shadow-sm rounded col-md-12 col-lg-12 col-sm-12 p-3">
                <div class="row p-1 mb-1 rounded d-flex flex-wrap justify-content-between align-items-start" >
                    <div class="col-lg-4 col-md-8 col-sm-6 justify-content-start">
                        <p class="text-dark text-start text-sm-start text-md-start  text-lg-start fw-bold fs-5">Listes des caegores d'équipement</p>
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
                   
                    <div class="col-lg-3 col-md-4 col-sm-6 d-flex flex-wrap justify-content-end">
                        <button class="btn btn-primary me-2 fw-500 " onClick={handleShowCreate}><FaRegCircle /> Nouveau</button>
                        
                        
                    </div>
                </div>
                
               
              
              <div className="row table-responsive-sm dataTable-container">
                  <DataTable columns={columns} data={filteredData} pagination  customStyles={customStyles} highlightOnHover  />
              </div>
            </div>
        </div>
        <CreateCategory show={showCreate} handleClose={handleCloseCreate} />
        <EditCategory show={showEdit} handleClose={handleCloseEdit} />
        
    </>
  )
}
