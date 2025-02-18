import React from "react";
import { CiSearch } from "react-icons/ci";
import "./home.css"

const Equipements=()=>{
    return (
        <>
             <div className=" mx-auto col-md-8 col-lg-8 col-sm-12 mt-3 mb-3 p-4 ">
                 <div className="row col-sm-12 col-md-12 col-lg-12 mid_header">
                                        
                                        <div className="search_box">
                                            <input type="text" value="" defaultValue="Texte initial" placeholder="search" />
                                            <button><CiSearch /></button>
                                        </div>
                                    </div>
             <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card border-0 h-100 card-box" >
                            <img src="images/equip4.jpg" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Microscope</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <div className="row justify-content-between align-items-start mx-1">
                                <button  class="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  class="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">En Maintenance</small>
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
                                <button  class="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  class="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                                </div>
                        </div>
                        <div class="card-footer">
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
                                <button  class="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  class="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                            </div>
                        </div>
                        <div class="card-footer">
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
                                <button  class="btn btn-sm btn-info col-lg-3 col-md-12 col-sm-12 mb-3">Détails</button>
                                <button  class="btn btn-sm btn-primary col-lg-3 col-md-12 col-sm-12">Réserver</button>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">Disponible</small>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </>
    );
}


export default Equipements;