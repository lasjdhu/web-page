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
        <nav class="flex items-center justify-between flex-wrap p-10">
            <div class="flex items-center flex-shrink-0 mr-16">
                <span class="font-semibold text-4xl tracking-tight">DI</span>
            </div>
            <div class="block lg:hidden">
                <button 
                class="flex items-center px-3 py-2 border hover:bg-stone-100 hover:border-stone-100 hover:text-stone-900"
                onClick={handleClick}>
                    {toggle ?
                    (<MdClose className=""/>) :
                    (<FiMenu className=""/>)}
                </button>
             </div>
            {(!smallScreen || toggle) &&
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="lg:flex-grow">
                    <a href="#" class="block mt-4 lg:inline-block lg:mt-0 mr-4">
                        Home
                    </a>
                    <a href="#about" class="block mt-4 lg:inline-block lg:mt-0 mr-4">
                        About
                    </a>
                    <a href="#projects" class="block mt-4 lg:inline-block lg:mt-0">
                        Projects
                    </a>
                </div>
                <a 
                href="#contact" 
                class="inline-block px-4 py-2 leading-none border text-white border-stone-100 hover:border-transparent hover:bg-stone-100 hover:text-stone-900 mt-4 lg:mt-0">
                    Contact
                </a>
            </div>
            }
        </nav>
    );
}

export default Navbar;