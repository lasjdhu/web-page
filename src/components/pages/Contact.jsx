import React from "react";
import { SocialIcon } from 'react-social-icons';
import Badge from "../tmp/Badge";

function Contact() {
    return (
    	<div className="m-auto">
    		<Badge />
	    	<ul className="flex pt-20">
	            <li className="inline-block px-5">
    				<p className="text-3xl">Social:</p>
	            </li>
	            <li className="inline-block px-5">
	                <SocialIcon 
		                url="https://linkedin.com/in/dmitrii-ivanushkin" 
		                className="hover:scale-125 duration-300" 
		                fgColor="white" 
		                style={{ height: 40, width: 40 }} 
	                />
	            </li>
	            <li className="inline-block px-5">
	                <SocialIcon 
	                	url="https://github.com/re-roll" 
	                	className="hover:scale-125 duration-300" 
	                	bgColor="white" 
	                	style={{ height: 40, width: 40 }} 
	                />
	            </li>
	            <li className="inline-block px-5">
	                <SocialIcon 
	                	url="https://twitter.com/rerollorer" 
	                	className="hover:scale-125 duration-300" 
	                	fgColor="white" 
	                	style={{ height: 40, width: 40 }} 
	                />
	            </li>
	        </ul>
        </div>
    );
}

export default Contact;