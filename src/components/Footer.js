import React from "react";

const currentYear = () => {
    return new Date().getFullYear();
};

function Footer() {
    return (
        <footer className="text-center py-6">
            <p className="text-cyan-200">Copyright &copy; {currentYear()} Dmitrii Ivanushkin</p>
        </footer>
    );
}

export default Footer;