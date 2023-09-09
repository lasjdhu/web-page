import React from 'react';

const currentYear = () => {
	return new Date().getFullYear();
};

function Footer() {
	return (
		<footer className="text-center py-5">
			<p>© {currentYear()} Dmitrii Ivanushkin</p>
		</footer>
	);
}

export default Footer;
