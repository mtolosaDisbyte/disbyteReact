import React, { useState } from "react";
import './navbar.css'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import logo from '../assets/disbyteblanco.png'


const Navbar=()=>{
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <div className="navbar-bg">
            <div className="sb__navbar">
                <div className="sb__navbar-links">
                    <div className="sb__navbar-links_logo">
                        <a href="/">
                            <img src={logo} alt="logo" />
                        </a>
                    </div>
                <div className="sb__navbar-links_container">
                    <p>
                        <a href="/">MAIL</a>
                    </p> 
                    <p>
                        <a href="/">ABOUT</a>
                    </p>
                    <p>
                        <a href="/">
                            <AiOutlineLogout size={27}/>
                        </a>
                    </p>
                </div>
                </div>
            <div className="sb__navbar-menu">
                {toggleMenu ? (
                    <RiCloseLine
                    size={27}
                    onClick={()=> setToggleMenu(false)}
                    />) : (
                    <RiMenu3Line
                    size={27}
                    onClick={()=> setToggleMenu(true)}
                    />
                )}
                {toggleMenu && (
                    <div className="sb__navbar-menu_container scale-up-center">
                        <div className="sb__navbar-menu_container-links">
                        <p>
                            <a href="/">MAIL</a>
                        </p> 
                        <p>
                            <a href="/">ABOUT</a>
                        </p>
                        <p>
                            <a href="/">
                                <AiOutlineLogout size={27}/>
                            </a>
                        </p>   
                        </div>
                    </div>  
                )}
            </div>
            </div>
        </div>
    )
}

export default Navbar