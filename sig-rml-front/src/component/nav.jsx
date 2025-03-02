import * as React from "react";
import { useState, useEffect } from "react";
//import { FiLogIn } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./nav.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaUser } from "react-icons/fa";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="header">
        
       

        {/* Barre de navigation */}
        <div className={`last_header ${scrolled ? "scrolled" : ""}`}>
          <div className="user_profile">
            <div className="info">
              <h2>SIG-RML</h2>
            </div>
            {/* Icône du menu burger */}
            <div className="burger-menu" onClick={toggleMenu}>
              {isOpen ? <FaTimes className="burger-icon" /> : <FaBars className="burger-icon" />}
            </div>
          </div>

          

          {/* Menu de navigation */}
          <div className={`nav-head ${isOpen ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/" className={`link ${location.pathname === "/home" ? "active" : ""}`} onClick={toggleMenu}>Accueil</Link>
              </li>
              <li>
                <Link to="/equipements" className={`link ${location.pathname === "/equipements" ? "active" : ""}`} onClick={toggleMenu}>Equipements</Link>
              </li>
              <li>
                <Link to="/historique" className={`link ${location.pathname === "/historique" ? "active" : ""}`} onClick={toggleMenu}>Mes réservations</Link>
              </li>
              <li>
                <Link to="/apropos" className={`link ${location.pathname === "/apropos" ? "active" : ""}`} onClick={toggleMenu}>À Propos</Link>
              </li>
              <li>
                <Link to="/contact" className={`link ${location.pathname === "/contact" ? "active" : ""}`} onClick={toggleMenu}>Contact</Link>
              </li>
              <li>
                <Link to="/administration" className={`link ${location.pathname === "/administration" ? "active" : ""}`} onClick={toggleMenu}>Administration</Link>
              </li>
            </ul>
          </div>

         
            <div className="btn-connexion">
              
              <div className="info">
               
              <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUser />
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><button className="dropdown-item" href="#">Profile</button></li>
                    <li><button className="dropdown-item" href="#">Modifier le password</button></li>
                    <li><button className="dropdown-item" href="#">Deconnexion</button></li>
                  </ul>
                </div>
               
              </div>
            </div>
        
        </div>
      </div>
    </>
  );
};

export default Nav;
