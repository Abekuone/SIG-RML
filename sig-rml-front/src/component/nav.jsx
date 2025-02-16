import * as React from "react";
import { MdLocalShipping } from 'react-icons/md'
import { CiSearch } from "react-icons/ci";
import {Link} from 'react-router-dom';
import './nav.css'
import { FiLogIn } from "react-icons/fi";
import { CiUser } from "react-icons/ci";


const Nav=()=> {
    return(
        <>
            <div className="header">
                <div className="top_header">
                    <div className="icon">
                        <MdLocalShipping />
                    </div>
                    <div className="info">
                        <p>Université Joseph KI-ZERBO. Equipements des laboratoires de recherches</p>
                    </div>
                </div>
                <div className="mid_header">
                    <div className="logo">
                        
                    </div>
                    <div className="search_box">
                        <input type="text" value="" defaultValue="Texte initial" placeholder="search" />
                        <button><CiSearch /></button>
                    </div>
                    {/*<div className="user">
                        <div className="icon">
                            <FiLogIn />
                        </div>
                        <div className="btn">
                            <button>Login</button>
                        </div>
                    </div>*/}
                    
                </div>
                <div className='last_header'>
                    <div className='user_profile'>
                        
                        <div className='icon'>
                            <CiUser />
                        </div>
                        <div className='info'>
                            <h2>Logo</h2>
                           
                        </div>  
                    </div>
                    <div className='nav-head'>
                        <ul>
                        <li><Link to='/' className='link'>Accueil</Link></li>
                        <li><Link to='/equipements' className='link'>Equipements</Link></li>
                        <li><Link to='' className='link'>Historique</Link></li>
                        <li><Link to='' className='link'>A Propos</Link></li>
                        <li><Link to='' className='link'>Contact</Link></li>
                        </ul>
                    </div>
                    <div className='offer'>
                        <div className='user_profile'>
                            
                        <div className="icon">
                            <FiLogIn />
                        </div>
                            <div className='info'>
                                <p>Connexion</p>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Nav;