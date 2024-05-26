import Link from 'next/link';
// import Banner from '../public/assets/banner.mp4';

const Home = () => {
  return (
    <>
      <div className=" navbar-items sticky top-0 z-50">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">City Link</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="hero min-h-[90vh]">
        <video width={'100%'} height={'60%'} autoPlay loop muted>
          <source src={'/test.mp4'} type="video/mp4"></source>
        </video>

        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">City Link Chemnitz</h1>
            <p className="mb-5">Easy way to access public services</p>
            <Link href="/login" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
