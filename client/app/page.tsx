<<<<<<< HEAD
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
=======
'use client'
import Link from 'next/link';
import Navbar from './components/Navbar/Navbar';
// import Banner from '../public/assets/banner.mp4';
>>>>>>> f519d0d (feat: add React google Maps)

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="p-4">
        <h1 className="text-center text-5xl font-bold">Categories</h1>

        <div className="grid grid-cols-2 gap-8 p-4 mt-8 w-1/2 mx-auto">
          <div className="w-full px-2 mb-4">
            <div className="w-full h-full bg-grey shadow-lg text-center p-8">
              <h3 className="mb-4">Title</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus eveniet eum earum reprehenderit distinctio minus, magni
                nemo alias maiores, illum quasi natus? Quam deleniti rerum
                suscipit id. Eaque, esse totam?
              </p>
            </div>
          </div>

          <div className="w-full px-2 mb-4">
            <div className="w-full h-full bg-grey-light shadow-lg  text-center p-8">
              <h3 className="mb-4">Title</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus eveniet eum earum reprehenderit distinctio minus, magni
                nemo alias maiores, illum quasi natus? Quam deleniti rerum
                suscipit id. Eaque, esse totam?
              </p>
            </div>
          </div>

          <div className="w-full px-2 mb-4">
            <div className="w-full h-full bg-grey shadow-lg  text-center p-8">
              <h3 className="mb-4">Title</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus eveniet eum earum reprehenderit distinctio minus, magni
                nemo alias maiores
              </p>
            </div>
          </div>
          <div className="w-full px-2 mb-4">
            <div className="w-full h-full bg-grey-light shadow-lg  text-center p-8">
              <h3 className="mb-4">Title</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus eveniet eum earum reprehenderit distinctio minus, magni
                nemo alias maiores, illum quasi natus? Quam deleniti rerum
                suscipit id. Eaque, esse totam?
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div className="flex">
          Made with
          <FontAwesomeIcon
            icon={faHeart}
            className="animate-pulse w-5 h-5"
            style={{ color: 'red' }}
          />
          by
          <p className="font-bold">Nithin & Utkarsh</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
