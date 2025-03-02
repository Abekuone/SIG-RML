import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Rout from './component/routes';
import Login from "./component/login";
import { AuthProvider } from './context/authContext';
//import PrivateRoute from './auth/privateRoutes';
import Welcome from './component/welcome';

const Layout = () => {
  //const location = useLocation();

  // Liste des pages sans header et footer
  //const noHeaderFooterRoutes = ["/login"];

  return (
    <AuthProvider>
      <Routes>
        {/* Page Welcome affichée par défaut */}
        <Route path="/" element={<Welcome />} />
        
        {/* Route publique pour la connexion */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes privées accessibles après connexion  <Route path="/*" element={<PrivateRoute><Rout /></PrivateRoute>} />*/}
        <Route path="/*" element={<Rout />} />
      </Routes>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
