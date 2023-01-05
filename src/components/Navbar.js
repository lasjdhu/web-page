import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

function Navbar() {
    const [toggle, setToggle] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);

    const handleClick = () => {
        setToggle(!toggle);

    };

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1023px)");
        media.addListener(handleMediaChange);
        handleMediaChange(media);

        return () => {
            media.removeListener(handleMediaChange);
        };
    }, []);

    const handleMediaChange = media => {
        if (media.matches){
            setSmallScreen(true);
        }
        else{
            setSmallScreen(false);
        }
    };

    return (
        <nav className="flex items-center justify-between flex-wrap p-10 bg-midnight">
            <div className="flex items-center flex-shrink-0 mr-16">
                <h1 className="font-semibold text-4xl tracking-tight">DI</h1>
            </div>
            <div className="block lg:hidden">
                <button 
                className="flex items-center px-4 py-3 border hover:bg-white hover:text-midnight hover:border-white"
                onClick={handleClick}>
                    {toggle ?
                    (<MdClose className=""/>) :
                    (<FiMenu className=""/>)}
                </button>
             </div>
            {(!smallScreen || toggle) &&
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-center">
                <div className="lg:flex-grow">
                    <a href="#about" className="block lg:inline-block lg:mt-0 mt-4 mx-5 hover:text-interactive">
                        About
                    </a>
                    <a href="#projects" className="block lg:inline-block lg:mt-0 mt-4 mx-5 hover:text-interactive">
                        Projects
                    </a>
                </div>
                <button 
                className="block inline-block mt-4 px-4 py-2 lg:mt-0 leading-none border text-white border-white hover:bg-white hover:text-midnight duration-300">
                    <a href="#contact">Contact</a>
                </button>
            </div>
            }
        </nav>
    );
}

export default Navbar;