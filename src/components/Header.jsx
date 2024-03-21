import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import Nav from "./Nav";
import Lang from "./Lang";

function Header() {
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

  const handleMediaChange = (media) => {
    if (media.matches) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  };

  const closeMenu = () => {
    setToggle(false);
  };

  return (
    <header className="flex flex-wrap items-center justify-between px-10 pt-12 mb-12 lg:m-0">
      <NavLink to="/">
        <button
          className="flex items-center flex-shrink-0 mr-12 cursor-pointer"
          onClick={closeMenu}
        >
          <h1 className="text-5xl tracking-wide lg:text-6xl">DI</h1>
        </button>
      </NavLink>
      <button
        className="flex items-center px-4 py-3 border rounded-sm lg:hidden text-accent border-accent"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <MdClose /> : <FiMenu />}
      </button>
      {(!smallScreen || toggle) && (
        <div className="flex-grow block w-full text-center lg:flex lg:items-center lg:w-auto">
          <Nav onCloseMenu={closeMenu} />
          <Lang />
        </div>
      )}
    </header>
  );
}

export default Header;
