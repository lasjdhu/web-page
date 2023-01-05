import React from "react";
import { SocialIcon } from 'react-social-icons';

function Home() {
    return (
        <div className="">
            <div className="text-center text-8xl">
                <h1 className="py-5">Front-end</h1>
                <h1 className="">Web Developer</h1>
            </div>
            <ul className="block text-center">
                <li className="inline-block px-5 py-10"><SocialIcon url="https://linkedin.com/dmitrii-ivanushkin" fgColor="white" style={{ height: 40, width: 40 }} /></li>
                <li className="inline-block px-5 py-10"><SocialIcon url="https://github.com/re-roll" fgColor="white" style={{ height: 40, width: 40 }} /></li>
                <li className="inline-block px-5 py-10"><SocialIcon url="https://twitter.com/rerollorer" fgColor="white" style={{ height: 40, width: 40 }} /></li>
            </ul>
        </div>
    );
}

export default Home;