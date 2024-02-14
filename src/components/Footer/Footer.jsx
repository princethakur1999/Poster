import './Footer.css';

import { FaFacebook, FaWhatsapp, FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";

import { SiLeetcode } from "react-icons/si";

import { Link } from 'react-router-dom';

export default function Footer() {

    return (

        <div className='footer'>

            <div className='footer-content'>

                <div className='footer-section email'>
                    <p>prince.setu1999@gmail.com</p>
                </div>

                <div className='footer-section links'>

                    <Link to="">
                        <FaFacebook className='link fb' />
                    </Link>

                    <Link to="">
                        <FaWhatsapp className='link wa' />
                    </Link>

                    <Link to="">
                        <FaInstagram className='link it' />
                    </Link>

                    <Link to="">
                        <FaTwitter className='link tt' />
                    </Link>

                    <Link to="">
                        <FaLinkedin className='link ld' />
                    </Link>

                    <Link to="">
                        <FaGithub className='link gh' />
                    </Link>

                    <Link to="">
                        <SiLeetcode className='link lc' />
                    </Link>

                </div>

            </div>

            <div className='footer-bottom'>
                © 2024 Poster.

                <br />
                <br />
                <hr />
                <br />

                Developed by Prince Thakur.
            </div>
        </div >
    );
}
