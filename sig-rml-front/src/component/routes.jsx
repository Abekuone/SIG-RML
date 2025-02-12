import React from 'react'
import {Routes, Route} from 'react-router'
import Home from './home'
import Equipements from './equipement'


const Rout= ()=>{
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/equipements' element={<Equipements />}/>
            </Routes>
        </>
    )
}


export default Rout