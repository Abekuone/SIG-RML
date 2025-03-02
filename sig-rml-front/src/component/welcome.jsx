import React, {  useMemo } from 'react';
import { Link } from 'react-router-dom';
import './welcome.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaUniversity, FaSchool, FaBook, FaChalkboardTeacher, FaUserGraduate, FaBaby } from "react-icons/fa";
import { LuUniversity } from "react-icons/lu";


const Welcome = () => {
    

    const services = [
        { icon: <FaUniversity />, title: "Projecteurs" },
        { icon: <FaSchool />, title: "Tableau" },
        { icon: <LuUniversity />, title: "Laboratoires de recherches" },
        { icon:<FaBook />, title: "Bibliothèques" },
        { icon: <FaChalkboardTeacher />, title: "Enseignement" },
        { icon: <FaUserGraduate />, title: "Tutorat" },
        { icon: <FaBaby />, title: "Microscopes" },
        { icon:  <FaChalkboardTeacher />, title: "Ordinateurs" }
    ];
    const images = useMemo(() => [
        { src: "images/equip4.jpg", title: "Card 1" },
        { src: "images/equip2.jpg", title: "Card 2" },
        { src: "images/equip3.jpg", title: "Card 3" },
        { src: "images/equip4.jpg", title: "Card 4" },
        { src: "images/labequi.jpg", title: "Card 5" }
    ], []);

    //const visibleImages = 3; useState, useEffect, useCallback,
    //const [currentImages, setCurrentImages] = useState(images.slice(0, visibleImages));
    //const [isSliding, setIsSliding] = useState(false);

    /*const getNextImage = useCallback((current) => {
        const lastIndex = images.findIndex((img) => img.src === current[current.length - 1].src);
        return images[(lastIndex + 1) % images.length];
    }, [images]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsSliding(true);

            setTimeout(() => {
                setCurrentImages(prevImages => [...prevImages.slice(1), getNextImage(prevImages)]);
                setIsSliding(false);
            }, 500); // Durée de la transition

        }, 3000); // Défilement toutes les 3s

        return () => clearInterval(interval);
    }, [getNextImage]);*/

    return (
        <>
            {/* Navbar sticky */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-white  sticky-top shadow">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-dark" to="/">SIG-RML</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item"><Link className="nav-link text-dark" to="/">Accueil</Link></li>
                            <li className="nav-item"><Link className="nav-link text-dark" to="/">A Prospos</Link></li>
                            <li className="nav-item"><Link className="nav-link text-dark" to="/login">Connexion</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Header */}
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

            {/* Connexion 
            <div className="container mt-5 mb-4 position-relative">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center p-4 mb-4 shadow rounded bg-white">
                        <h3>Connectez-vous pour réserver</h3>
                        <form className="mt-3">
                            <input type="text" className="form-control mb-3" placeholder="Nom d'utilisateur" />
                            <input type="password" className="form-control mb-3 mt-3" placeholder="Mot de passe" />
                            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
                        </form>
                    </div>
                </div>
            </div>*/}

            {/* Section d'information */}
            <div className="container mt-5 text-center">
                <h3 className='text-primary fw-bold fs-1 mt-4'>À propos de nos services</h3>
                <p className="lead fs-3 fw-600">Nous offrons une large gamme de matériels de laboratoire pour répondre à vos besoins académiques et de recherche.</p>
            </div>

            {/* Galerie */}
            <div className="carousel-container mt-5">
                <div className="row justify-content-center carousel-track flex-nowrap" >
                {[...images, ...images].map((item, index) => (
                    <div key={index} className="carousel-item">
                        <img src={item.src} alt={item.title} className="carousel-image" />
                    </div>
                ))}
                </div>
            </div>


            <section className="bg-light py-5">
                <div className="container py-5">
                <h2 className="text-center mb-5 text-primary fw-bold fs-1">Nos Ressources Éducatives</h2>
                <p className="text-center mb-5 fs-3">Nous offrons une large gamme de services pour soutenir l'éducation, la recherhe et l'innovation .</p>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {services.map((item, index) => (
                            <div key={index} className="col">
                                <div className="service-card bg-white shadow-lg rounded-3 border-0 p-4 text-center">
                                    <div className="mb-3 fs-1">{item.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='bg-light bg-gradient'>
                <div className="container py-5">
                    <h2 className="text-center mb-5 text-primary fw-bold fs-1">Avez-vous déjà utilisé un équipement dans un laboratoire ?</h2>
                    <div className="row d-flex flex-wrap mx-auto">
                        <div className="card border-0 shadow-sm mb-3 col-md-6 col-lg-5 col-sm-12 p-2 mx-2 h-100" >
                            <div className="row g-0 h-100">
                                <div className="col-md-4">
                                    <img src="images/equip4.jpg" className="img-fluid rounded-start h-100 w-100" style={{ objectFit: "cover" }} alt="..." />
                                </div>
                                <div className="col-md-8 ">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-3 col-md-6 col-lg-5 col-sm-12 p-2 mx-2">
                            <div className="row g-0">
                                <div className="col-md-4 h-100">
                                    <img src="images/equip4.jpg" className="img-fluid rounded-start h-100 w-100" style={{ objectFit: "cover" }} alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>



            {/* Contact */}
            <div className="container text-center mt-5 mb-4 p-4 bg-primary-subtle rounded shadow-sm">
                <h3>Contactez-nous</h3>
                <p>Pour toute question, veuillez nous contacter à : <a href="mailto:contact@univ-ki-zerbo.bf">contact@univ-ki-zerbo.bf</a></p>
            </div>

            {/* Footer */}
            <footer className="text-center bg-dark text-light p-3">
                <p>&copy; {new Date().getFullYear()} Université Joseph Ki-Zerbo. Tous droits réservés.</p>
            </footer>
        </>
    );
}

export default Welcome;
