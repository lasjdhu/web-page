import React from "react";
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <div className="lg:flex-grow">
            <NavLink 
                to="/" 
                className="block lg:inline-block lg:mt-0 mt-4 mx-5 hover:text-interactive " 
                style={ ({ isActive }) => ({
                    color: isActive ? '#678983' : 'white',
                }) }
            >
                Home
            </NavLink>
            <NavLink 
                to="/about" 
                className="block lg:inline-block lg:mt-0 mt-4 mx-5 hover:text-interactive " 
                style={({ isActive }) => ({
                    color: isActive ? '#678983' : 'white',
                })}
            >
                About
            </NavLink>
            <NavLink 
                to="/projects" 
                className="block lg:inline-block lg:mt-0 mt-4 mx-5 hover:text-interactive " 
                style={({ isActive }) => ({
                    color: isActive ? '#678983' : 'white',
                })}
            >
                Projects
            </NavLink>
            <NavLink 
                to="/contact" 
                className="block lg:inline-block lg:mt-0 mt-4 mx-5 hover:text-interactive " 
                style={({ isActive }) => ({
                    color: isActive ? '#678983' : 'white',
                })}
            >
                Contact
            </NavLink>    
        </div>
    );
}

export default Nav;