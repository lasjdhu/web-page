import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Nav from "./Nav";
import Lang from "./Lang";

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
        <header className="flex items-center justify-between flex-wrap p-10">
            <div id="logo" className="flex items-center flex-shrink-0 mr-16">
                <NavLink to="/" className="text-4xl tracking-tight">
                    <h1>DI</h1>
                </NavLink>
            </div>
            <button
                className="flex lg:hidden items-center px-4 py-3 text-accent border border-accent"
                onClick={() => setToggle(!toggle)}
            >
                {toggle ? <MdClose className="" /> : <FiMenu className="" />}
            </button>
            {(!smallScreen || toggle) &&
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-center">
                <Nav />
                <Lang />
            </div>}
        </header>
    );
}

export default Navbar;
