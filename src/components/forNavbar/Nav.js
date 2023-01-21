import React, { useState, useEffect } from "react";

function Menu() {
    return (
    	<div className="lg:flex-grow">
            <a href="#about" className="block lg:inline-block lg:mt-0 mt-4 mx-5 hover:text-interactive">
                About
            </a>
            <a href="#projects" className="block lg:inline-block lg:mt-0 mt-4 mx-5 hover:text-interactive">
                Projects
            </a>
            <a href="#contacts" className="block lg:inline-block lg:mt-0 mt-4 mx-5 hover:text-interactive">
                Contacts
            </a>
        </div>
    );
}

export default Menu;