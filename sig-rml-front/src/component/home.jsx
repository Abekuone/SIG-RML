import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './home.css';
import Nav from "./nav";
import Footer from "./footer";
import { FaFlask, FaMicroscope, FaUser, FaUniversity } from "react-icons/fa";

const Home = () => {
    
   

    return (
        <>
            <Nav />
            <div className="container mt-5 text-center" style={{
              position: "relative",
              top: "50px"
          }}>
                <header className="text-center hero-section" style={{
                        backgroundImage: "url('/images/labequi.jpg')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}>
                <div className="overlay"></div>
                <div className="hero-content" >

                    <h1>Université Joseph Ki-Zerbo</h1>
                    <h2>Réservation de Matériels de Laboratoire</h2>
                    <a href="/reservation" className="btn btn-lg btn-warning fw-bold">Réserver maintenant</a>
                </div>
            </header>

                <div className="alert alert-info mt-4" role="alert">
                    <strong>Info :</strong> Découvrez les équipements de laboratoire les plus utilisés.
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                   
                    <div className="col">
                        <div className="card  border-0 h-100 card-box">
                            <img src="images/equip2.jpg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Becher</h5>
                            <p className="card-text">This is a short card.</p>
                            <div className="row justify-content-between align-items-start mx-1">
                                <button  className="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  className="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                                </div>
                        </div>
                        <div className="card-footer">
                                <small className="text-muted">Disponible</small>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card  border-0 h-100 card-box">
                            <img src="images/equip3.jpg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Liquide de nitrate</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <div className="row justify-content-between align-items-start mx-1">
                                <button  className="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  className="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                            </div>
                        </div>
                        <div className="card-footer">
                                <small className="text-muted">Disponible</small>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card  border-0 h-100 card-box">
                            <img src="images/equip4.jpg" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Microscope</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <div className="row justify-content-between align-items-start mx-1">
                                <button  className="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  className="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                                </div>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Disponible</small>
                            </div>
                        </div>
                    </div>
                    
                   
                    <div className="col">
                        <div className="card  border-0 h-100 card-box">
                            <img src="images/equip2.jpg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Becher</h5>
                            <p className="card-text">This is a short card.</p>
                            <div className="row justify-content-between align-items-start mx-1">
                                <button  className="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  className="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                                </div>
                        </div>
                        <div className="card-footer">
                                <small className="text-muted">Disponible</small>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card  border-0 h-100 card-box">
                            <img src="images/equip3.jpg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Liquide de nitrate</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <div className="row justify-content-between align-items-start mx-1">
                                <button  className="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  className="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                            </div>
                        </div>
                        <div className="card-footer">
                                <small className="text-muted">Disponible</small>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card  border-0 h-100 card-box">
                            <img src="images/equip4.jpg" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Microscope</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <div className="row justify-content-between align-items-start mx-1">
                                <button  className="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  className="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                                </div>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Disponible</small>
                            </div>
                        </div>
                    </div>
                
                </div>

                <div className="row justify-content-end mt-2 col-lg-2 col-md-6 col-sm-12">
                    <a href="/equipements" className="btn btn-lg btn-warning fw-bold justify-content-end">Afficher plus</a>
                </div>

                {/* 🎯 Sections pour différents types d'utilisateurs */}
                <h3 className="mt-5 mb-4"> Qui peut utiliser SIG-RML ?</h3>
                <div className="row">
                    {[
                        { title: "Écoles Doctorales", icon: <FaUniversity size={40} /> },
                        { title: "Laboratoires de Recherche", icon: <FaMicroscope size={40} /> },
                        { title: "Gestion des Matériels", icon: <FaFlask size={40} /> },
                        { title: "Responsables de Laboratoire", icon: <FaUser size={40} /> }
                    ].map((item, index) => (
                        <div key={index} className="col-md-3">
                            <div className="card shadow-sm border-0 p-4 text-center">
                                <div className="text-primary mb-3">{item.icon}</div>
                                <h5>{item.title}</h5>
                                <p>Découvrez les ressources et services disponibles.</p>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
            <Footer />
        </>
    );
};

export default Home;
