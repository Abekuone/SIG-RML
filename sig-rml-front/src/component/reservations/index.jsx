import React from 'react'
import { useState,useEffect } from 'react';

import Admin from '../admin'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
//import Nav from "../nav";
import { FaRegCircle } from "react-icons/fa";

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import DataTable from "react-data-table-component";
import "./index.css"
import { BiShow } from "react-icons/bi";
import axios from 'axios';
import { TbReportAnalytics } from "react-icons/tb";
import CreateRapport from './createRapport';

export default function IndexReservations() {
  /*const data = [
    { id: 1,Utilisateur:"TRAORE", Libelle: "Becher", DateDebut:"20-02-2025",DateFin:"27-02-2025", Status:"Validé"},
    { id: 2,Utilisateur:"Jean", Libelle: "Miscroscope",  DateDebut:"20-02-2025",DateFin:"27-02-2025",Status:"En attente" },
    { id: 3,Utilisateur:"TRAORE", Libelle: "Lentille",DateDebut:"20-02-2025",DateFin:"27-02-2025",Status:"Réjété" }
  ];*/


    const [selectedReservation, setSelectedReservation] = useState(null);
    const [showModalRapport, setShowModalRapport] = useState(false);



    
   const [data, setData] = useState([]);  // Stocke les équipements
    const [loading, setLoading] = useState(true);
       const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);


    const handleCloseRapport = () => {
        setShowModalRapport(false)
        setSelectedReservation(null);
      };
      const handleShowRapport = (reservation) => {
        setSelectedReservation(reservation);
        setShowModalRapport(true)
      };

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
        axios.get(`http://127.0.0.1:8000/api/reservations/`)
            .then(response => {
                console.log("Réponse API:", response.data); 
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
        { name: "Utilisateur", selector: row => row.user_id, sortable: true },
        { name: "Equipement", selector: row => row.equipment_id, sortable: true },
        { name: "Date Debut", selector: row => row.start_date, sortable: true },
        { name: "Date Fin", selector: row => row.end_date, sortable: true },
        { name: "Commentaire", selector: row => row.comment, sortable: true },
        { name: "Status", selector: row => row.status, sortable: true },
        
        {
            name: "Action",
            cell: row => (
                <div className='d-flex flex-wrap justify-content-center align-items-center'>
                    {row.status === "pending1" ? (
                        <>
                            <button className="btn btn-success btn-sm me-2">Confirmer</button>
                            <button className="btn btn-danger btn-sm">Annuler</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-info btn-sm me-2"><BiShow /></button>
                            <button className="btn btn-success btn-sm me-2" onClick={()=>handleShowRapport(row)}><TbReportAnalytics /></button>
                            <button className="btn btn-warning btn-sm me-2"><CiEdit /></button>
                            <button className="btn btn-danger btn-sm"><MdDeleteOutline /></button>
                        </>
                    )}
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
            row.equipment.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
            row.start_date.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
            row.end_date.toString().toLowerCase().includes(value.toString().toLowerCase()) 
        );
        
        setFilteredData(filtered);
    };

    return (
    <>
    <Admin />
        <div className="mx-auto px-3 mb-3 mt-3 col-md-12 col-sm-12 col-lg-12 d-flex flex-wrap align-items-start div-position">
            <div className="row  mx-auto col-md-12 col-lg-8  col-sm-12 p-3">
                
            </div> 


            <div className="row mx-auto card border-0 mt-3 shadow-sm col-md-12 col-lg-12 col-sm-12 p-3">
                <div class="row p-1 mb-1 rounded d-flex flex-wrap justify-content-between align-items-center" >
                    <div class="col-lg-4 col-md-12 col-sm-6 justify-content-start">
                        <p class="text-dark text-start text-sm-start text-md-start  text-lg-start fw-bold fs-5">Listes des reservations</p>
                    </div>

                    <div className="mb-3 col-lg-5 col-md-12 col-sm-12">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Rechercher une reservation..." 
                            value={searchText}
                            onChange={handleSearch} 
                        />
                    </div>
                    
                    <div class="col-lg-3 col-md-12 col-sm-12 d-flex flex-wrap justify-content-end">
                        <button class="btn btn-primary me-2 fw-500 "><FaRegCircle />Exporter</button>

                        
                    </div>
                </div>
                <div className="row col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center mb-3">
                        <div className="col-lg-4 col-md-12 col-sm-12 d-flex">
                            <button type="button" class=" col-lg-2 col-md-12 col-sm-12 btn bg-primary bg-opacity-25  position-relative rounded-pill p-2 mx-3">
                            Tous
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        3+
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                            </button>
                            <button type="button" class="btn  col-lg-2 col-md-12 col-sm-12 bg-primary bg-opacity-25 position-relative rounded-pill p-2 mx-3">
                            En cours
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        3+
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                            </button>
                            <button type="button" class="btn  col-lg-2 col-md-12 col-sm-12 bg-primary bg-opacity-25 position-relative rounded-pill p-2 mx-3">
                            En attente
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        3+
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                            </button>
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 d-flex">
                            <div className="col-lg-4 col-md-12 col-sm-12 p-2">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Date debut..." 
                                    value="Date Debut"
                                    
                                />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 p-2">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Date fin..." 
                                    value="Date Fin"
                                    
                                />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 p-2">
                                    <button className='btn btn-info col-lg-12 col-md-12 col-sm-12'>Filtrer</button>
                                    
                               
                            </div>
                        </div>
                    </div>

                    {loading ? <p>Chargement des données...</p> : 
                     <div className="row table-responsive-sm">
                
                        <DataTable columns={columns} data={filteredData} pagination customStyles={customStyles} highlightOnHover/>
                     </div>
                 }
                    {error ? <p className="text-danger">Erreur lors du chargement des données.</p> : null}

               
            </div>
        </div>
        <CreateRapport show={showModalRapport} handleClose={handleCloseRapport} selectedReservation={selectedReservation} />
    </>
    )
}
