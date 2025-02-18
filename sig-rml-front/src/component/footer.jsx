
import React from 'react'
import './footer.css'
//import { FaPiggyBank, FaShippingFast, FaHeadphonesAlt, FaWallet} from 'react-icons/fa';
const Footer = () => {
  return (
    <>
    <div className='footer'>
        <div className='container-footer'>
            
            <div className='right_box'>
                <div className='header'>
                    
                    <p>Lorem ipsum dolor sit amet, consectetur Nuliscing elit. Duis faucibus ipsum id sem Putconsequat Text.</p>
                </div>
                <div className='bottom'>
                    <div className='box'>
                        <h3>Mon Compte</h3>
                        <ul>
                            <li>About us</li>
                            <li>Account</li>
                            <li>Payment</li>
                            <li>sales</li>
                        </ul>
                    </div>
                    <div className='box'>
                        <h3>Loboratoires</h3>
                        <ul>
                            <li>Delivery</li>
                            <li>Track Oder</li>
                            <li>New product</li>
                            <li>old product</li>
                        </ul>
                    </div>
                    <div className='box'>
                        <h3>contacts</h3>
                        <ul>
                            <li>4005, Silver Business PointIndia</li>
                            <li>+(012)99999999</li>
                            <li>info@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Footer