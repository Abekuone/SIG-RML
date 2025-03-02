import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Admin from '../admin'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
//import Nav from "../nav";
import { FaRegCircle } from "react-icons/fa";
import CreateEquip from './create';

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import DataTable from "react-data-table-component";
import "./index.css"
import { BiShow } from "react-icons/bi";
import { CiFileOn } from "react-icons/ci";
import EditEquip from './edit';
import CreateFile from './createFile';
import ShowEquip from './showEquip';

export default function IndexEquip() {

    

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showCreateFile, setShowCreateFile] = useState(false);
    const [selectedEquip, setSelectedEquip] = useState(null);
     const [showModalEquip, setShowModalEquip] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => {
      setShowEdit(false)
      setSelectedEquip(null);
    };
    const handleShowEdit = (equip) => {
      setSelectedEquip(equip);
      setShowEdit(true)
    };

    const handleCloseCreateFile = () => {
      setSelectedEquip(null);
      setShowCreateFile(false);
    };

    const handleShowCreateFile = (equip) => {
      setSelectedEquip(equip);
      setShowCreateFile(true);
      
    };


    const handleShowModalEquip = (equip) => {
      setSelectedEquip(equip);
      setShowModalEquip(true);
  };

  // Fermer le modal
  const handleCloseModalEquip = () => {
      setShowModalEquip(false);
      setSelectedEquip(null);
  };


    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState("");
    const [data, setData] = useState([]);  // Stocke les équipements
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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


    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/equipments/`)
          .then(response => {
              console.log("Réponse API:", response.data); // Vérifier le format des données
              if (Array.isArray(response.data)) {
                  setData(response.data);
                  setFilteredData(response.data);
              } else {
                  console.error("Les données ne sont pas un tableau:", response.data);
                  setData([]);
                  setFilteredData([]);
              }
              setLoading(false);
          })
          .catch(error => {
              console.error("Erreur lors de la récupération des données:", error);
              setError(error);
              setLoading(false);
          });
  }, []);


    const columns = [
        { 
            name: "#", 
            selector: (row, index) => index + 1,  
            sortable: false, 
            width: "70px" 
          },
        { name: "Libelle", selector: row => row.name, sortable: true },
        { name: "Description", selector: row => row.description, sortable: true },
        { name: "Type", selector: row => row.type, sortable: true },
        { name: "Quantité", selector: row => row.quantity, sortable: true },
        { name: "Qualité", selector: row => row.quality, sortable: true },
        { name: "Status", selector: row => row.status, sortable: true },
        
        {
          name: "Action",
          cell: row => (
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
              <button className="btn btn-info btn-sm me-2" onClick={() => handleShowModalEquip(row)}><BiShow /></button>
              <button className="btn btn-primary btn-sm me-2" onClick={() =>handleShowCreateFile(row)}><CiFileOn /></button>
              <button className="btn btn-warning btn-sm me-2" onClick={()=>handleShowEdit(row)}><CiEdit /></button>
              <button className="btn btn-danger btn-sm"><MdDeleteOutline /></button>
            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width:"200px"
        }
      ];
    
      
    
    
      const handleSearch = (event) => {
        const value = event.target.value;
        setSearchText(value);
    
        const filtered = data.filter(row =>
          row.name.toLowerCase().includes(value.toLowerCase()) ||
          row.description.toLowerCase().includes(value.toLowerCase()) ||
          row.type.toLowerCase().includes(value.toLowerCase()) ||
          row.quantity.toString().includes(value.toString()) ||
          row.quality.toLowerCase().includes(value.toLowerCase()) ||
          row.status.toLowerCase().includes(value.toLowerCase()) 
          
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
                  <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-end">
                      <button className="btn btn-primary me-2 fw-500" onClick={handleShow}>
                          <FaRegCircle /> Nouveau
                      </button>
                      <CreateEquip show={show} handleClose={handleClose} />
                  </div>
              </div>

              {/* Ajout de row et alignement correct du champ de recherche */}
              
              {loading ? <p>Chargement des données...</p> : null}
                    {error ? <p className="text-danger">Erreur lors du chargement des données.</p> : null}

              <div className="row table-responsive-sm dataTable-container">
                  <DataTable columns={columns} data={filteredData} pagination customStyles={customStyles} highlightOnHover />
              </div>
          </div>

        </div>

        <EditEquip   show={showEdit} handleClose={handleCloseEdit} selectedEquip={selectedEquip}/>
        <CreateFile  show={showCreateFile} handleClose={handleCloseCreateFile} selectedEquip={selectedEquip} />
        <ShowEquip showModal={showModalEquip} handleCloseModal={handleCloseModalEquip} selectedEquip={selectedEquip} />
    </>
  )
}
