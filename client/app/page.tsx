import Link from 'next/link';
import Navbar from './components/Navbar/Navbar';
// import Banner from '../public/assets/banner.mp4';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="hero min-h-[90vh]">
        <video width={'100%'} height={'60%'} autoPlay loop muted>
          <source src={'/test.mp4'} type="video/mp4"></source>
        </video>

        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">City Link Chemnitz</h1>
            <p className="mb-5">Easy way to access public services</p>
            <Link href="/signUp" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="border border-red-800 p-4">
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
    </>
  );
};

export default Home;
