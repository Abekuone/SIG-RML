import React from 'react'
import { useState } from 'react';

import Admin from '../admin'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { FaRegCircle } from "react-icons/fa";

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import DataTable from "react-data-table-component";
import "./index.css"
import { BiShow } from "react-icons/bi";

export default function IndexReservations() {
  const data = [
    { id: 1,Utilisateur:"TRAORE", Libelle: "Becher", DateDebut:"20-02-2025",DateFin:"27-02-2025", Status:"Validé"},
    { id: 2,Utilisateur:"Jean", Libelle: "Miscroscope",  DateDebut:"20-02-2025",DateFin:"27-02-2025",Status:"En attente" },
    { id: 3,Utilisateur:"TRAORE", Libelle: "Lentille",DateDebut:"20-02-2025",DateFin:"27-02-2025",Status:"Réjété" }
  ];


    
   
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);


    const columns = [
        { 
            name: "#", 
            selector: (row, index) => index + 1,  
            sortable: false, 
            width: "70px" 
        },
        { name: "Utilisateur", selector: row => row.Utilisateur, sortable: true },
        { name: "Libelle", selector: row => row.Libelle, sortable: true },
        { name: "DateDebut", selector: row => row.DateDebut, sortable: true },
        { name: "DateFin", selector: row => row.DateFin, sortable: true },
        { name: "Status", selector: row => row.Status, sortable: true },
        
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
        width:"200px"
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
        <div className="mx-auto px-3 mb-3 mt-3 col-md-12 col-sm-12 col-lg-12 d-flex flex-wrap align-items-start">
            <div className="row  mx-auto col-md-12 col-lg-8  col-sm-12 p-3">
                <Admin />
            </div> 


            <div className="row mx-auto card border-0 mt-3 shadow-sm col-md-12 col-lg-10 col-sm-12 p-3">
                <div class="row p-1 mb-1 rounded d-flex flex-wrap justify-content-between align-items-center" >
                    <div class="col-lg-4 col-md-12 col-sm-6 justify-content-start">
                        <p class="text-dark text-start text-sm-start text-md-start  text-lg-start fw-bold">Listes des reservations</p>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 d-flex">
                    <button type="button" class="btn bg-primary bg-opacity-25  position-relative rounded-pill p-2 mx-2">
                       Tous
                       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3+
                                <span class="visually-hidden">unread messages</span>
                            </span>
                    </button>
                    <button type="button" class="btn bg-primary bg-opacity-25 position-relative rounded-pill p-2 mx-2">
                       En cours
                       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3+
                                <span class="visually-hidden">unread messages</span>
                            </span>
                    </button>
                    <button type="button" class="btn bg-primary bg-opacity-25 position-relative rounded-pill p-2 mx-2">
                       En attente
                       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3+
                                <span class="visually-hidden">unread messages</span>
                            </span>
                    </button>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-6 d-flex flex-wrap justify-content-end">
                        <button class="btn btn-primary me-2 fw-500 "><FaRegCircle />Exporter</button>
                      
                        
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
