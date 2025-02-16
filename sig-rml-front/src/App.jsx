import React from 'react';
import Nav from './component/nav'
import Footer from './component/footer'
//import Cart from './component/cart'

import {BrowserRouter} from 'react-router-dom'
import Rout from './component/routes'

const App =() => {
   return (
    <>
      <BrowserRouter>
        <Nav /> 
        <Rout />
        
        <Footer />
      </BrowserRouter>
    </>
   )
  
}



export default App;
