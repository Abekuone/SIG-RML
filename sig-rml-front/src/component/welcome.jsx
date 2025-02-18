import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './welcome.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Welcome = () => {
    const images = useMemo(() => [
        { src: "images/equip4.jpg", title: "Card 1" },
        { src: "images/equip2.jpg", title: "Card 2" },
        { src: "images/equip3.jpg", title: "Card 3" },
        { src: "images/equip4.jpg", title: "Card 4" },
        { src: "images/equip1.jpg", title: "Card 5" }
    ], []);

    const visibleImages = 3; // Nombre d'images affichées
    const [currentImages, setCurrentImages] = useState(images.slice(0, visibleImages));

    const getNextImage = useCallback((current) => {
        const lastIndex = images.findIndex((img) => img.src === current[current.length - 1].src);
        return images[(lastIndex + 1) % images.length];
    }, [images]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImages((prevImages) => {
                const newImages = [...prevImages.slice(1), getNextImage(prevImages)];
                return newImages;
            });
        }, 5000); // Défilement toutes les 5 secondes

        return () => clearInterval(interval);
    }, [getNextImage]);

    return (
        <>
            <header className="text-center mb-4">
                <h1>Université Joseph Ki-Zerbo</h1>
                <h2>Réservation de Matériels de Laboratoire</h2>
            </header>

            <div className="container mx-auto mt-5">
                {/* Section de Connexion */}
                <div className="row mb-4">
                    <div className="row mx-auto col col-md-12 col-lg-6 col-sm-12 text-center">
                        <h3>Connectez-vous pour réserver</h3>
                        <form className="form-inline justify-content-center">
                            <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Nom d'utilisateur" />
                            <input type="password" className="form-control mb-2 mr-sm-2" placeholder="Mot de passe" />
                            <button type="submit" className="btn btn-primary mb-2">Se connecter</button>
                        </form>
                    </div>
                </div>

                {/* Section de Réservation */}
                <div className="row mb-4">
                    <div className="col text-center">
                        <h3>Réservez votre matériel</h3>
                        <a href="/reservation" className="btn btn-success">Réserver maintenant</a>
                    </div>
                </div>

                {/* Carousel d'Images */}
                <div className="row mb-4">
                    <div className="col">
                        <div className="card text-dark position-relative card-opacity">
                            <img src="/images/labequi.jpg" className="card-img w-100 carousel-img" alt="..." />
                            <div className="overlay"></div>
                            <div className="card-img-overlay">
                                <h5 className="card-title fs-1 fw-bold">SIG-RML</h5>
                                <p className="card-text fs-3">Réservations de matériels de laboratoires. This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section d'Informations */}
                <div className="row mb-4">
                    <div className="col text-center">
                        <h3>À propos de nos services</h3>
                        <p>Nous offrons une large gamme de matériels de laboratoire pour répondre à vos besoins académiques et de recherche.</p>
                    </div>
                </div>

                {/* Carousel d'Images des Équipements */}
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

                {/* Section de Contact */}
                <div className="row col-lg-12 col-md-12 col-sm-12 mt-3 mb-3 mx-auto div-doc p-3">
                    <div className="col text-center">
                        <h3>Contactez-nous</h3>
                        <p>Pour toute question, veuillez nous contacter à l'adresse suivante : <a href="mailto:contact@univ-ki-zerbo.bf">contact@univ-ki-zerbo.bf</a></p>
                    </div>
                </div>
            </div>

            {/* Pied de page */}
            <footer className="text-center mt-5">
                <p>&copy; {new Date().getFullYear()} Université Joseph Ki-Zerbo. Tous droits réservés.</p>
            </footer>
        </>
    );
}

export default Welcome;