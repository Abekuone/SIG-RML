import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Rout from './component/routes';
import Login from "./component/login";
import Nav from "./component/nav";
//import Footer from "./component/footer";

const Layout = () => {
  const location = useLocation();
  
  // Liste des pages sans header et footer
  const noHeaderFooterRoutes = ["/login"];

  return (
    <>
      {!noHeaderFooterRoutes.includes(location.pathname) && <Nav />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Rout />} />
      </Routes>

      {!noHeaderFooterRoutes.includes(location.pathname)}
    </>
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
