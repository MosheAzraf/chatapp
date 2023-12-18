import React from 'react'
import { Link } from 'react-router-dom';

const navbarItems = [
    { id: 1, title: 'Home', path: 'home' },
    { id: 2, title: 'Signup', path: 'signup' },
    { id: 3, title: 'Login', path: 'login' },
  ];


const PublicNavbar = () => {
  return (
    <nav className='flex items-start space-x-4 bg-gray-800 text-white p-4'>
    <ul className='flex space-x-4'>
      {navbarItems.map((item) => (
        <li key={item.id}>
          <Link to={item.path}>{item.title}</Link>
        </li>
      ))}
    </ul>
  </nav>
  )
}

export default PublicNavbar