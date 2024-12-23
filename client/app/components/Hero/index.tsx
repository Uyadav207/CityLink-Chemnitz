import React from 'react';
import Link from 'next/link';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero min-h-screen">
      <video autoPlay loop muted className="background-video">
        <source src={'/landingPageVideo.mp4'} type="video/mp4"></source>
      </video>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="relative flex items-center justify-center w-full h-full">
        <section className="content bg-opacity-60">
          <h1>City Link</h1>
          <p className="text-white text-xl my-4">
            An interactive Map UI to locate nearby facilities
          </p>
          <Link href="/signUp" className="homebtn light"></Link>
        </section>
      </div>
    </div>
  );
};

export default Hero;
