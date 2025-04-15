import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div>
                <h4>Made with love by I-0110</h4>
                <a href="mailto:ivelisbecker@gmail.com" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope size={30} />
                </a>
                <a href="https://www.github.com/I-0110" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={30} />
                </a>
                <a href="https://www.linkedin.com/in/ivelis-becker" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={30} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;