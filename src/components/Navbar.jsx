import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Nav from "./forNavbar/Nav";
import Lang from "./forNavbar/Lang";

function Navbar() {
    const [toggle, setToggle] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1023px)");
        media.addListener(handleMediaChange);
        handleMediaChange(media);

        return () => {
            media.removeListener(handleMediaChange);
        };
    }, []);

    const handleMediaChange = media => {
        if (media.matches) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    };

    return (
        <nav className="flex items-center justify-between flex-wrap pt-10 pl-10 pr-10 bg-midnight">
            <div className="flex items-center flex-shrink-0 mr-16">
                <h1 className="font-semibold text-4xl tracking-tight">DI</h1>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-4 py-3 border hover:bg-white hover:text-midnight hover:border-white"
                    onClick={() => setToggle(!toggle)}
                >
                    {toggle ? <MdClose className="" /> : <FiMenu className="" />}
                </button>
            </div>
            {(!smallScreen || toggle) &&
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-center lg:pb-0 pb-10">
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-center">
                    <Nav />
                </div>
                <Lang value='EN' />
            </div>
            }
        </nav>
    );
}

export default Navbar;
