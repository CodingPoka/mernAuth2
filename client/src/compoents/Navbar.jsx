import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
        <div>
            <ul className='flex justify-center gap-8 bg-blue-600 py-3 text-white'>
                <li>
                  <NavLink to={"/"} className="hover:text-red-600">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/profile"className="hover:text-red-600">Profile</NavLink>
                </li>

                <li><NavLink to="/about"className="hover:text-red-600">About</NavLink ></li>

                <li><NavLink to="/register"className="hover:text-red-600">Register</NavLink ></li>

                <li>
                <NavLink to="/login" className="hover:text-red-600">Login</NavLink>
                </li>
    
            </ul>
        </div>
    );
};

export default Navbar;