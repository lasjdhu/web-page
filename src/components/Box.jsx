import React from 'react';
import { NavLink } from 'react-router-dom';

function Box(props) {
	return (
		<article className="lg:w-96 w-80 flex flex-col text-center bg-white bg-opacity-5 center m-5">
			<h2 className="text-xl pt-5 mt-2 my-4">{props.title}</h2>
			<p className="text-left text-light m-5">{props.desc}</p>
			<div className="flex flex-row h-10 mb-6 mt-4 justify-center items-center">
				{props.isEnabled && (
					<div className="flex h-10 justify-center items-center mx-5 px-3 bg-transparent hover:bg-accent text-accent hover:text-midnight border-accent border cursor-pointer transition ease-in-out hover:-translate-y-1 duration-300">
						<NavLink to={props.to} className="cursor-pointer">
							RUN
						</NavLink>
					</div>
				)}
				<a
					href={props.src}
					className="border-b mx-5"
					rel="noreferrer"
					target="_blank"
				>
					Source
				</a>
			</div>
		</article>
	);
}

export default Box;
