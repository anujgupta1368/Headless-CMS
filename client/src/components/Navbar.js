import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
        </div>
        <div className='text-2xl text-white'>
          Headless CMS
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/createEntity" className="text-white text-lg hover:text-gray-300">Create Entity</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
