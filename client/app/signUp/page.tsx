import React from 'react';

const Login = () => {
  return (
    <div className="w-full p-4 justify-center flex min-h-screen space-x-24">
      <div className="text-center p-4 my-auto">
        <h1 className="text-4xl font-bold">Sign Up!</h1>
        <p className="py-4 text-center text-xl font-semibold">
          Fill in your details to get started.
        </p>
        <p className="">
          Already have an account? <span>Sign in here</span>
        </p>
      </div>
      <div className="flex-col w-1/3 lg:flex-row-reverse mt-8">
        <div className="card shrink-0 w-full shadow-2xl bg-base-200">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Firstname</span>
              </label>
              <input
                type="email"
                placeholder="Firstname"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Lastname</span>
              </label>
              <input
                type="email"
                placeholder="Lastname"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="email"
                placeholder="Phone Number"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Lastname</span>
              </label>
              <input
                type="email"
                placeholder="Lastname"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
