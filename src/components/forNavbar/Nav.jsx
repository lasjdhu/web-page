import React from "react";
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Nav() {
    const { t } = useTranslation();

    return (
        <div className="lg:flex-grow">
            <NavLink 
                to="/" 
                className="block lg:inline-block lg:mt-0 mt-4 mx-5 duration:300" 
                style={ ({ isActive }) => ({
                    color: isActive ? '#3698A7' : 'white',
                }) }
            >
                {t('Home')}
            </NavLink>
            <NavLink 
                to="/about" 
                className="block lg:inline-block lg:mt-0 mt-4 mx-5" 
                style={({ isActive }) => ({
                    color: isActive ? '#3698A7' : 'white',
                })}
            >
                {t('About')}
            </NavLink>
            <NavLink 
                to="/projects" 
                className="block lg:inline-block lg:mt-0 mt-4 mx-5" 
                style={({ isActive }) => ({
                    color: isActive ? '#3698A7' : 'white',
                })}
            >
                {t('Projects')}
            </NavLink>
            <NavLink 
                to="/contact" 
                className="block lg:inline-block lg:mt-0 mt-4 mx-5" 
                style={({ isActive }) => ({
                    color: isActive ? '#3698A7' : 'white',
                })}
            >
                {t('Contact')}
            </NavLink>    
        </div>
    );
}

export default Nav;