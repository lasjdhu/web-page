import React from 'react';
import { NavLink } from 'react-router-dom';

function Box(props) {
	return (
		<article className="h-64 w-80 block text-center bg-white bg-opacity-5 center m-5">
			<h2 className="text-xl pt-5 mt-2">{props.title}</h2>
			<p className="text-left text-light m-5">{props.desc}</p>
			<div
				className={`inline-block mt-2 mx-5 px-3 py-2 lg:mt-0 ${
					props.isEnabled
						? 'bg-light text-midnight cursor-pointer transition ease-in-out hover:-translate-y-1 duration-300'
						: 'bg-transparent border border-dashed cursor-not-allowed'
				}`}
			>
				<NavLink
					to={props.to}
					className={`${
						props.isEnabled
							? 'cursor-pointer'
							: 'cursor-not-allowed'
					}`}
				>
					RUN
				</NavLink>
			</div>
			<a
				href={props.src}
				className="text-center text-accent border-b mx-5"
				rel="noreferrer"
				target="_blank"
			>
				Source
			</a>
		</article>
	);
}

export default Box;
