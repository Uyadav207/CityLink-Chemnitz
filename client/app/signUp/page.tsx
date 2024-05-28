import React from 'react';

const Login = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="flex-col lg:flex-row-reverse">
        <div className="text-center p-4">
          <h1 className="text-4xl font-bold">Sign Up!</h1>
          <p className="py-6">Fill in your details to get started.</p>
        </div>
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
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
                <span className="label-text">Email</span>
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
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;