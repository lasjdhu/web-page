import React from "react";

const currentYear = () => {
    return new Date().getFullYear();
};

function Footer() {
    return (
        <footer className="text-center pb-5 mt-20">
            <p>© {currentYear()} Dmitrii Ivanushkin</p>
        </footer>
    );
}

export default Footer;
