import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';



const PublicNavbar = () => {
    const {logOut} = useAuth();

    const logoutUser = async () => {
        await logOut();
    }

    return (
    <nav className='flex justify-between items-center bg-gray-800 text-white p-4'>
        <ul className='flex space-x-4'>
        <li><Link to={'home'}>Home</Link></li>
        <li><Link to={'chat'}>Chat</Link></li>
        </ul>
        <button  className='' onClick={logoutUser}>Logout</button>
  </nav>
  )
}

export default PublicNavbar