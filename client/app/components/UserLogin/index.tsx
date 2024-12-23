'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApis } from '../../api/auth';

import { Input } from '../Inputs';
import { Loader } from '../Loader';

import useUserStore from '../../store/userStore';

import { INITIAL_VALUES, VALIDATION } from './constants';
import { storeUserTokenInLocalStorage } from '../../helpers/crypto.js';

const UserLogin = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const { userData, setUser } = useUserStore();

  const handleLogin = async (values: any) => {
    try {
      setLoader(true);
      const response = await authApis.login({
        username: values.Username,
        password: values.Password,
      });
      toast.success(response.data.message);
      storeUserTokenInLocalStorage(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/dashboard/citylink');
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
              <p className="my-2">
                Do not have an account?{' '}
                <Link href="/signUp">
                  <span className="text-blue-500">Register</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
