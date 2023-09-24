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
			<ul className="flex flex-row justify-center pt-10">
				<li className="px-5">
					<SocialIcon
						url="https://linkedin.com/in/dmitrii-ivanushkin"
						fgColor="transparent"
						bgColor="#FFFFFF"
						style={{ height: 50, width: 50 }}
						rel="noreferrer"
						target="_blank"
					/>
				</li>
				<li className="px-5">
					<SocialIcon
						url="https://github.com/lasjdhu"
						fgColor="transparent"
						bgColor="#FFFFFF"
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
