import React from 'react';
import Link from 'next/link';
import './Navbar.css';
// import { HomePageNavItems } from './Constants';

const Navbar = () => {
  return (
    <header className="p-4  bg-black/20">
      <div className="flex items-center justify-start">
        <img
          src="https://cdn-icons-png.flaticon.com/32/12300/12300557.png"
          alt="logo"
          className="w-10 h-10"
        />

        <a
          href="https://github.com/Uyadav207/CityLink-Chemnitz"
          target="_blank"
          className="nav-item"
        >
          Github
        </a>
      </div>

      <Link
        href="/login"
        className="nav-item border border-white p-2 rounded-lg"
      >
        Login
      </Link>
    </header>
  );
};

export default Navbar;
