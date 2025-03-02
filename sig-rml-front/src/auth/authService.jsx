import axios from 'axios';

// Fonction pour s'authentifier via Keycloak
export async function authenticateWithKeycloak() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/callback', { withCredentials: true });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Stocker le token
            return response.data.user; // Retourner l'utilisateur
        }
    } catch (error) {
        console.error('Erreur d’authentification:', error);
        return null;
    }
}

// Fonction pour vérifier si l'utilisateur est authentifié
export function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Fonction pour se déconnecter
export function logout() {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirection vers la page d'accueil
}