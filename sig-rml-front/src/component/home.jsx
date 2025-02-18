import React from 'react'
import './home.css'
import './admin'
import Footer from "./footer";
import "./footer.css";
//import { FaPiggyBank, FaShippingFast, FaHeadphonesAlt, FaWallet} from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
//import Admin from './admin';
//import { CiSearch } from "react-icons/ci";
import { useState,useEffect,useCallback,useMemo } from 'react';


const Home = () => {
    //const [searchTerm, setSearchTerm] = useState("");
    

    const images = useMemo(() => [
        { src: "images/equip4.jpg", title: "Card 1" },
        { src: "images/equip2.jpg", title: "Card 2" },
        { src: "images/equip3.jpg", title: "Card 3" },
        { src: "images/equip4.jpg", title: "Card 4" },
        { src: "images/equip1.jpg", title: "Card 5" }
      ], []);

    //const [startIndex, setStartIndex] = useState(0);
    const visibleImages = 3; // Nombre d'images affichées
    const [currentImages, setCurrentImages] = useState(images.slice(0, visibleImages));

    const getNextImage = useCallback((current) => {
        const lastIndex = images.findIndex((img) => img.src === current[current.length - 1].src);
        return images[(lastIndex + 1) % images.length];
      }, [images]);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImages((prevImages) => {
            // Supprime la première image et ajoute la suivante à la fin
            const newImages = [...prevImages.slice(1), getNextImage(prevImages)];
            return newImages;
          });
        }, 5000); // Défilement toutes les 2 secondes
    
        return () => clearInterval(interval);
      }, [getNextImage]);

    // Fonction pour récupérer la prochaine image après la dernière affichée
    
  return (
    <>

            
        <div className=" container mx-auto col-md-12 col-lg-12 col-sm-12 col-md-12 mt-5">

            <div className=" container mx-auto col-md-12 col-lg-12 col-sm-12 col-md-12 mt-5">
                {/*<div className="row col-sm-12 col-md-12 col-lg-12 mid_header">
                        
                        <div className="search_box">
                            <input type="text" value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                placeholder="Rechercher..." />
                            <button><CiSearch /></button>
                        </div>
                    </div>*/}
                <div className="row row-cols-1 mb-3">
                    <div className="col ">


                    <div class="card text-dark position-relative card-opacity">
                        <img src="/images/labequi.jpg" className="card-img w-100 carousel-img" alt="..." />
                        <div class="overlay"></div> 
                        <div class="card-img-overlay">
                            <h5 class="card-title fs-1 fw-bold">SIG-RML</h5>
                            <p class="card-text fs-3">Réservations de matériels de laboratoires. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
                                            
                        
                    </div>
                </div>
                <div className="row row-cols-1 mb-4 mt-3">
                    <div className="alert alert-primary d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" display= "none">
                            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </symbol>
                            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </symbol>
                            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </symbol>
                        </svg>

                        <div className="alert alert-primary d-flex align-items-center" role="alert">
                            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"> <use href="#info-fill" /></svg>
                            <div>
                            Les equipements de laboratoires les plus utilisés dans les laboratoires .This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </div>
                        </div>
                        
                    </div>
                </div>


                <div className="  d-flex justify-content-center align-items-center">
                    {/* Carousel d'images défilant */}
                    <div className="row mx-auto d-flex overflow-hidden justify-content-center" style={{ width: "100%" }}>
                    {currentImages.map((item, index) => (
                        <img
                        key={index}
                        src={item.src}
                        alt={item.title}
                        className="img-thumbnail mx-3"
                        style={{
                            width: "300px",
                            height: "300px",
                            objectFit: "cover",
                            borderRadius: "5px",
                            transition: "transform 0.5s ease-in-out",
                        }}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <div className="row col-lg-12 col-md'12 col-sm-12 mt-3 mb-3 mx-auto div-doc p-3">

            <div class="row d-flex">
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card card-box border-0">
                    <div class="card-body">
                        <h5 class="card-title">Ecoles Doctorales</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                       
                    </div>
                    </div>
                </div>
                <div class="col-sm-6  col-md-4 col-lg-3">
                    <div class="card card-box border-0">
                    <div class="card-body">
                        <h5 class="card-title">Laboratoires de recherches</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                       
                    </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card card-box border-0">
                    <div class="card-body">
                        <h5 class="card-title">Materiels des laboratoires</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                       
                    </div>
                    </div>
                </div>
                <div class="col-sm-6  col-md-4 col-lg-3">
                    <div class="card card-box border-0">
                    <div class="card-body">
                        <h5 class="card-title">Responsables de Laboratoires</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        
                    </div>
                    </div>
                </div>
            </div>

            </div>  

        </div>
        <Footer />
    </>
  )
}

export default Home