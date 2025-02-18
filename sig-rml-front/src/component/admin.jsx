import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CiUser } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRegCircle } from "react-icons/fa";
import "./admin.css";

const Admin = () => {
    return (
        <div className="container position-sticky top-50">
            <div className="card custom-card border-primary shadow-sm ">
               
                <div className="card-body">
                    
                    {/* Navigation Tabs */}
                    <ul className="nav nav-tabs justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#users">Gestion Utilisateurs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#equipments">Gestion Materiels</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#reservations">Gestions Réservations</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#stats">Statistiques & Rapports</a>
                        </li>
                    </ul>

                    {/* Content Tabs */}
                    <div className="tab-content">
                        {/* Utilisateurs */}
                        <div id="users" className="tab-pane fade show active">
                            <ul className="list-unstyled text-center d-flex justify-content-center gap-3">
                                <li><Link to='/utilisateurs' className='link'><CiUser /> Utilisateurs</Link></li>
                                <li><Link to='/groupes' className='link'><HiOutlineUserGroup /> Groupes</Link></li>
                                <li><Link to='/droits' className='link'><FaRegCircle /> Droits</Link></li>
                            </ul>
                        </div>

                        {/* Équipements */}
                        <div id="equipments" className="tab-pane fade">
                            <ul className="list-unstyled text-center d-flex justify-content-center gap-2">
                                <li><Link to='/equipement' className='link'><FaRegCircle /> Équipements</Link></li>
                                <li><Link to='/laboratoires' className='link'><FaRegCircle /> Laboratoires</Link></li>
                            </ul>
                        </div>

                        {/* Réservations */}
                        <div id="reservations" className="tab-pane fade">
                            <ul className="list-unstyled text-center d-flex justify-content-center gap-3">
                                <li><Link to='/reservations' className='link'><FaRegCircle /> Toutes</Link></li>
                                <li><Link to='' className='link'><FaRegCircle /> En Cours</Link></li>
                                <li><Link to='' className='link'><FaRegCircle /> En Attente</Link></li>
                            </ul>
                        </div>

                        {/* Statistiques & Rapports */}
                        <div id="stats" className="tab-pane fade">
                            <ul className="list-unstyled text-center d-flex justify-content-center gap-2">
                                <li><Link to='/administration' className='link'><FaRegCircle /> Statistiques</Link></li>
                                <li><Link to='' className='link'><FaRegCircle /> Rapports</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Admin;
