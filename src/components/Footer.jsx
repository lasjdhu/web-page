import React from "react";

const currentYear = () => {
    return new Date().getFullYear();
};

function Footer() {
    return (
        <footer className="text-center text-blue my-5">
            <p>&copy; {currentYear()} Dmitrii Ivanushkin</p>
        </footer>
    );
}

export default Footer;