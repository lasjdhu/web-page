import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Nav() {
	const { t } = useTranslation();

	return (
		<nav className="lg:flex-grow">
			<NavLink
				to="/"
				className="block lg:inline-block text-accent lg:mt-0 mt-4 mx-5"
				style={({ isActive }) => ({
					color: isActive ? '' : 'white',
				})}
			>
				{t('home')}
			</NavLink>
			<NavLink
				to="/about"
				className="block lg:inline-block text-accent lg:mt-0 mt-4 mx-5"
				style={({ isActive }) => ({
					color: isActive ? '' : 'white',
				})}
			>
				{t('about')}
			</NavLink>
			<NavLink
				to="/projects"
				className="block lg:inline-block text-accent lg:mt-0 mt-4 mx-5"
				style={({ isActive }) => ({
					color: isActive ? '' : 'white',
				})}
			>
				{t('projects')}
			</NavLink>
			<NavLink
				to="/contact"
				className="block lg:inline-block text-accent lg:mt-0 mt-4 mx-5"
				style={({ isActive }) => ({
					color: isActive ? '' : 'white',
				})}
			>
				{t('contact')}
			</NavLink>
		</nav>
	);
}

export default Nav;
