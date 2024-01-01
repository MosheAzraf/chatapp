import React from 'react'
import { Link } from 'react-router-dom';

const PublicNavbar = () => {
  return (
    <nav className='flex items-start space-x-4 bg-gray-800 text-white p-4'>
        <ul className='flex space-x-4'>
            <Link className='' to={'home'}>Home</Link>
            <Link className='' to={'chat'}>Chat</Link>
            <button>Logout</button>
        </ul>
    </nav>
  )
}

export default PublicNavbar