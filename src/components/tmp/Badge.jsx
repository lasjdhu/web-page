import React from "react";
import { FaHammer } from "react-icons/fa";

function Badge() {
	return (
		<div className="flex p-3 animate-pulse justify-center">
			<FaHammer size="1.5em"/>
			<p className="text-xl pl-5">Building . . .</p>
		</div>
	);
}

export default Badge;