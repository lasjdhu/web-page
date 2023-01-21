import React from "react";

const currentYear = () => {
    return new Date().getFullYear();
};

function Footer() {
    return (
        <footer className="text-center py-10">
            <p className="text-cyan-200">&copy; {currentYear()} Dmitrii Ivanushkin</p>
        </footer>
    );
}

export default Footer;