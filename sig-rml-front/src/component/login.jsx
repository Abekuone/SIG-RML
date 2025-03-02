import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css"; // Import du fichier CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-container" style={{
      backgroundImage: "url('/images/labequi.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backdropFilter: "blur(5px)"
  }}>
      <div className="login-card">
        <h2 className="text-center">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon"><FaUser /></span>
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon"><FaLock /></span>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Se connecter</button>
        </form>
        <p className="text-center">
          <Link to="/forgot-password" className="forgot-link">Mot de passe oublié ?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
