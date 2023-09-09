import React from 'react';
import { SocialIcon } from 'react-social-icons';

import Badge from '../components/Badge';

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
			<Badge name="soon" />
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
				<li className="px-5">
					<SocialIcon
						url="https://linkedin.com/in/dmitrii-ivanushkin"
						fgColor="transparent"
						bgColor="#0B223D"
						style={{ height: 50, width: 50 }}
						rel="noreferrer"
						target="_blank"
					/>
				</li>
				<li className="px-5">
					<SocialIcon
						url="https://github.com/lasjdhu"
						fgColor="transparent"
						bgColor="#0B223D"
						style={{ height: 50, width: 50 }}
						rel="noreferrer"
						target="_blank"
					/>
				</li>
			</ul>
		</main>
	);
}

export default Contact;
