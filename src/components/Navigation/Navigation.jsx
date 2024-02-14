import './Navigation.css';

import { Link, NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { FaUserCircle } from "react-icons/fa";



export default function Navigation() {

    const token = useSelector((state) => state.auth.token);

    return (

        <div className="navigation">


            <Link to="/" className="logo">
                Poster
            </Link>



            <div className='nav-items'>



                {
                    token &&
                    <NavLink to="/profile" className='profile-logo'>
                        <FaUserCircle />
                    </NavLink>
                }


            </div>

        </div >
    )
}
