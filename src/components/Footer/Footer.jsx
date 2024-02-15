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

                    <Link to="https://www.facebook.com/profile.php?id=100005320754965">
                        <FaFacebook className='link fb' />
                    </Link>

                    <Link to="https://wa.link/yo3dgy">
                        <FaWhatsapp className='link wa' />
                    </Link>

                    <Link to="https://www.instagram.com/setu__13/">
                        <FaInstagram className='link it' />
                    </Link>

                    <Link to="https://twitter.com/Princesetu13">
                        <FaTwitter className='link tt' />
                    </Link>

                    <Link to="https://www.linkedin.com/in/princethakur1999/">
                        <FaLinkedin className='link ld' />
                    </Link>

                    <Link to="https://github.com/princethakur1999">
                        <FaGithub className='link gh' />
                    </Link>

                    <Link to="https://leetcode.com/princethakur1999/">
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
