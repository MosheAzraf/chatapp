import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import NavbarSearch from '../components/NavbarSearch';

const PrivateNavbar = () => {
    const { logOut } = useAuth();

    const logoutUser = async () => {
        await logOut();
    }

    return (
        <nav className='flex justify-between items-center bg-gray-800 text-white p-4'>
            <ul className='flex space-x-4'>
                <li><Link to={'/home'} className="hover:text-gray-300">Home</Link></li>
                <li><Link to={'/chat'} className="hover:text-gray-300">Chat</Link></li>
            </ul>
            <NavbarSearch />
            <button 
                onClick={logoutUser} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
                Logout
            </button>
        </nav>
    )
}

export default PrivateNavbar;
