import React from 'react'
import {Routes, Route} from 'react-router'
import Home from './home'
import Equipements from './equipement'
import IndexGroupe from './groupes'
import IndexUser from './utilisateur'
import IndexDroit from './droits'
import IndexEquip from './equipements'
import IndexLabo from './laboratoires'
import Login from "./login";
import  IndexReservations from "./reservations"
//import Admin from './admin'
import Statistic from './statistiques'
import IndexFile from './fichiers'
import IndexCategory from './categories/indexcategory'
//import Welcome from './welcome'




const Rout= ()=>{
    return (
        <>
            <Routes>
                
                <Route path='/home' element={<Home />}/>
                <Route path='/Equipements' element={<Equipements />}/>
                <Route path='/utilisateurs' element={<IndexUser />}/>
                <Route path='/groupes' element={<IndexGroupe />}/>
                <Route path='/droits' element={<IndexDroit />}/>
                <Route path='/equipement' element={<IndexEquip />}/>
                <Route path='/laboratoires' element={<IndexLabo />}/>
                <Route path='/reservations' element={<IndexReservations />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/administration" element={<Statistic />} />
                <Route path="/fichiers" element={<IndexFile />} />
                <Route path="/categorys" element={<IndexCategory />} />
               
                {/*<Route path='/statistiques' element={<AppStatistic />}/>*/}
            </Routes>
           
        </>
    )
}


export default Rout