import React from "react";
import { SocialIcon } from 'react-social-icons';

function Contacts() {
    return (
    	<div id="contacts" className="text-center my-5">
            <h1 className="text-3xl pb-10">Contacts</h1>
	    	<ul className="block text-center">
	            <li className="inline-block px-5">
	                <SocialIcon url="https://linkedin.com/in/dmitrii-ivanushkin" className="hover:scale-125 duration-300" fgColor="white" style={{ height: 40, width: 40 }} />
	            </li>
	            <li className="inline-block px-5">
	                <SocialIcon url="https://github.com/re-roll" className="hover:scale-125 duration-300" fgColor="white" style={{ height: 40, width: 40 }} />
	            </li>
	            <li className="inline-block px-5">
	                <SocialIcon url="https://twitter.com/rerollorer" className="hover:scale-125 duration-300" fgColor="white" style={{ height: 40, width: 40 }} />
	            </li>
	        </ul>
        </div>
    );
}

export default Contacts;