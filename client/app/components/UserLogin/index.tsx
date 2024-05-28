'use client';

import React, { useState } from 'react';
import { Form, Formik } from 'formik';

import { loginApi } from '../../api/auth';
import { Input } from '../Inputs';
import { Loader } from '../Loader';

import { INITIAL_VALUES, VALIDATION } from './constants';

const UserLogin = () => {
  const [loader, setLoader] = useState(false);

  const handleLogin = async (values: any) => {
    try {
      setLoader(true);
      await loginApi.login({
        username: values.Username,
        password: values.Password,
      });
    } catch (err: any) {
      console.log('erorr', err.response);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="relative hero min-h-screen bg-base-200">
        <div className=" flex-col lg:flex-row-reverse w-full sm:w-1/2  xl:w-1/4">
          <div className="text-center p-4">
            <h1 className="text-4xl font-bold">Login!</h1>
            <p className="py-6">Enter your email address and password.</p>
            <div className="card shrink-0 w-full shadow-2xl bg-base-100">
              <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={VALIDATION}
                onSubmit={handleLogin}
              >
                <Form className="card-body">
                  <Input
                    label="Username"
                    name="Username"
                    placeholder="Enter Username"
                    type="text"
                  />
                  <Input
                    label="Password"
                    name="Password"
                    placeholder="Enter Password"
                    type="password"
                  />
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
