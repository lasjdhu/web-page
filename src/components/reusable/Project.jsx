import React from "react";

function Project(props) {
	return (
		<div className="block text-center h-60 w-80 bg-white bg-opacity-5 center transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 m-5">
            <h2 className="text-xl pt-5 m-5 border-b border-accent">{props.title}</h2>
            <p className="text-left m-5">{props.desc}</p>
            <div className="text-accent inline-block mt-4 px-3 py-2 lg:mt-0">
                RUN
            </div>
        </div>
	);
}

export default Project;
