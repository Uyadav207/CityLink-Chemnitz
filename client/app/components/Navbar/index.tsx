import React from 'react';
import Link from 'next/link';
import './Navbar.css';
// import { HomePageNavItems } from './Constants';

const Navbar = () => {
  return (
    <header className="p-4  bg-black/20">
      <div className="flex items-center justify-start">
        <a href="#">
          <img
            src="https://github.com/ecemgo/today-i-learned-app/assets/13468728/4f2923ea-9eca-4221-8b18-7198f78fd04e"
            alt="logo"
            className="logo"
          />
        </a>

        <a href="#" className="nav-item">
          Github
        </a>
      </div>

      <a href="#" className="nav-item border border-white p-2 rounded-lg">
        Login
      </a>
    </header>
  );
};

export default Navbar;
