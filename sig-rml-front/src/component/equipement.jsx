import React from "react";
import { CiSearch } from "react-icons/ci";
import "./home.css"
import Footer from "./footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./footer.css";
import Nav from "./nav";
import { useState,useEffect } from "react";
import axios from "axios";
import CreateReservations from "./reservation";
import EquipDetails from "./equipementDetail";

const Equipements=()=>{
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);  // Stocke les équipements
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [show, setShow] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedEquip, setSelectedEquip] = useState(null);
    
     const handleCloseEquip = () => {
        
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleShowModal = (equip) => {
        setSelectedEquip(equip);
        setShowModal(true);
    };

    // Fermer le modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEquip(null);
    };
    


    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);
    
        const filtered = data.filter(row => {
            return (
                Object.values(row).some(field => 
                    field !== null && field !== undefined && String(field).toLowerCase().includes(value)
                )
            );
        });
    
        setFilteredData(filtered);
    };
    

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/equipments/`)
            .then(response => {
                //console.log("Réponse API:", response.data); // Vérifier le format des données
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
    return (
        <>
        <Nav />
             <div className=" mx-auto col-md-12 col-lg-8 col-sm-12 mt-3 mb-3 p-4 " style={{
              position: "relative",
              top: "50px"}}>
                <div className="row col-sm-12 col-md-12 col-lg-12 mid_header">
                                        
                    <div className="search_box">
                        <input type="text" value={searchText} onChange={handleSearch} placeholder="search" />
                        <button><CiSearch /></button>
                    </div>
                </div>
             <div className="row row-cols-1 row-cols-md-3 g-4">
                    {loading ? <p>Chargement des données...</p> : null}
                    {error ? <p className="text-danger">Erreur lors du chargement des données.</p> : null}

                    {filteredData.map((item,index)=>(
                        <div className="col" key={index}>
                            <div className="card border-0 h-100 card-box" >
                                <img src={"http://127.0.0.1:8000/" + item.image} className="card-img-top" alt="..."></img>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <div className="row justify-content-between align-items-start flex-wrap mx-1">
                                    <button className="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3" onClick={() => handleShowModal(item)}>Détails</button>

                                    <button  className="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12" onClick={handleShow}>Réserver</button>
                                    <EquipDetails showModal={showModal} handleCloseModal={handleCloseModal} selectedEquip={selectedEquip} />

                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{item.status}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                    <CreateReservations show={show} handleClose={handleCloseEquip} />
                    
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
                                <small class="text-muted">Disponible</small>
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
                                <small class="text-muted">Disponible</small>
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
             </div>
             <Footer />
        </>
    );
}


export default Equipements;