import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CiUser } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRegCircle } from "react-icons/fa";
import "./admin.css";
//import { FaUser } from "react-icons/fa";


const Admin = () => {
    return (
        
        <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
            <div className="  mx-auto container justify-content-center">
                {/*<Link className="navbar-brand" to="/">Administration</Link>*/}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="row mx-auto d-flex  collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav align-items-center justify-content-center">
                        <li className='nav-item p-2 mx-3'>
                            <Link to="/home" className="nav-link">Accueil</Link>
                        </li>
                        
                        {/* Gestion Utilisateurs */}
                        <li className="nav-item dropdown p-2 mx-3">
                            <button className="nav-link dropdown-toggle" id="userDropdown"  data-bs-toggle="dropdown">
                                Gestion Utilisateurs
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to='/utilisateurs'><CiUser /> Utilisateurs</Link></li>
                                <li><Link className="dropdown-item" to='/groupes'><HiOutlineUserGroup /> Groupes</Link></li>
                                <li><Link className="dropdown-item" to='/droits'><FaRegCircle /> Droits</Link></li>
                            </ul>
                        </li>

                        {/* Gestion Matériels */}
                        <li className="nav-item dropdown p-2 mx-3">
                            <button className="nav-link dropdown-toggle" id="equipmentDropdown"  data-bs-toggle="dropdown">
                                Gestion Matériels
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to='/categorys'><FaRegCircle /> Categories</Link></li>
                                <li><Link className="dropdown-item" to='/fichiers'><FaRegCircle /> Fichiers</Link></li>
                                <li><Link className="dropdown-item" to='/equipement'><FaRegCircle /> Équipements</Link></li>
                                <li><Link className="dropdown-item" to='/laboratoires'><FaRegCircle /> Laboratoires</Link></li>
                            </ul>
                        </li>

                        {/* Gestions Réservations */}
                        <li className="nav-item dropdown p-2 mx-3">
                            <button className="nav-link dropdown-toggle" id="reservationDropdown"  data-bs-toggle="dropdown">
                                Gestions Réservations
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to='/reservations'><FaRegCircle /> Reservations</Link></li>
                                <li><Link className="dropdown-item" to=''><FaRegCircle /> Rapports</Link></li>
                                
                            </ul>
                        </li>

                        {/* Statistiques & Rapports */}
                        <li className="nav-item dropdown p-2 mx-3">
                            <button className="nav-link dropdown-toggle" id="statsDropdown"  data-bs-toggle="dropdown">
                                Statistiques & Rapports
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to='/administration'><FaRegCircle /> Statistiques</Link></li>
                                <li><Link className="dropdown-item" to=''><FaRegCircle />Générer Rapports</Link></li>
                            </ul>
                        </li>

                        

                    </ul>
                    
                </div>
            </div>
        </nav>
    );
}

export default Admin;
