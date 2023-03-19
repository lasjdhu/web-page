import React from "react";
import { SocialIcon } from "react-social-icons";
import Badge from "../reusable/Badge";

function Contact() {
 	// const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
  	// const [message, setMessage] = useState("");

  	// const handleSubmit = (event) => {
    // 	event.preventDefault();
    // 	// Handle form submission
  	// };

  	return (
  		<main className="m-auto">
  			<Badge />
			{/*<form className="flex flex-col" onSubmit={handleSubmit}>
		  		<label>
		    	Name:
		        	<input
		          		type="text"
		          		value={name}
		          		onChange={(event) => setName(event.target.value)}
		        	/>
		  		</label>
			    <label>
			    Email:
			        <input
			        	type="email"
			        	value={email}
			        	onChange={(event) => setEmail(event.target.value)}
			        />
			    </label>
		  		<label>
		    	Message:
			        <textarea
			        	value={message}
			        	onChange={(event) => setMessage(event.target.value)}
			        />
		  		</label>
		  	<button type="submit">Submit</button>
			</form>*/}
			<ul className="flex flex-row justify-center pt-10">
 	            <li className="px-10">
 	                <SocialIcon
 		                url="https://linkedin.com/in/dmitrii-ivanushkin"
 		                className="hover:scale-120 duration-300"
 		                fgColor="white"
 		                bgColor="black"
 		                style={{ height: 50, width: 50 }}
 	                />
 	            </li>
 	            <li className="px-10">
 	                <SocialIcon
 	                	url="https://github.com/re-roll"
 	                	className="hover:scale-120 duration-300" 
 	                	fgColor="white"
 	                	bgColor="black"
 	                	style={{ height: 50, width: 50 }} 
 	                />
 	            </li>
 	        </ul>
	 	</main>
  	);
}

export default Contact;