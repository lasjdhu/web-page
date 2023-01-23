import React from "react";

const currentYear = () => {
    return new Date().getFullYear();
};

function Footer() {
    return (
        <footer className="">
            <p className="text-center text-interactive my-5">&copy; {currentYear()} Dmitrii Ivanushkin</p>
        </footer>
    );
}

export default Footer;