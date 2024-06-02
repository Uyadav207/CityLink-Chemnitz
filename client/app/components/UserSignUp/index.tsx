'use client';

import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

import { authApis } from '../../api/auth';
import { Input, PhoneNumberInput } from '../Inputs';
import { Loader } from '../Loader';

import { INITIAL_VALUES, VALIDATION } from './constants';

const UserSignUp = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const handleSignUp = async (values: any) => {
    try {
      setLoader(true);
      const response = await authApis.signUp({
        username: values.Username,
        password: values.Password,
        firstName: values.Firstname,
        lastName: values.Lastname,
        phoneNo: values.PhoneNumber,
        email: values.Email,
      });

      toast.success(response.data.message);
      router.push('/login');
    } catch (err: any) {
      console.log('erorr', err.response);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full  p-4 justify-center items-center flex flex-col  xl:flex-row min-h-screen xl:space-x-24">
      <div className="text-center p-4">
        <h1 className="text-4xl font-bold">Sign Up!</h1>
        <p className="py-4 text-center text-xl font-semibold">
          Fill in your details to get started
        </p>
        <p className="">
          Already have an account?{' '}
          <Link href="/login">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </p>
      </div>
      <div className="flex-col w-full md:w-1/2 xl:w-1/3 mx-auto">
        <div className="card shrink-0 w-full shadow-2xl bg-base-200 p-2">
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION}
            onSubmit={handleSignUp}
          >
            <Form className="card-body">
              <Input
                label="Username"
                name="Username"
                placeholder="Enter your Username"
                type="text"
              />
              <Input
                label="Firstname"
                name="Firstname"
                placeholder="Enter your Firstname"
                type="text"
              />
              <Input
                label="Lastname"
                name="Lastname"
                placeholder="Enter your Lastname"
                type="text"
              />
              <Input
                label="Email"
                name="Email"
                placeholder="Enter your Email"
                type="text"
              />
              <PhoneNumberInput
                international
                label="PhoneNumber"
                className="w-full input input-bordered"
                defaultCountry="DE"
                name="PhoneNumber"
                placeholder="Enter Phone number"
              />
              <Input
                label="Password"
                name="Password"
                placeholder="Enter Password"
                type="password"
              />
              <Input
                label="Confirm Password"
                name="ConfirmPassword"
                placeholder="Enter Password"
                type="password"
              />
              <button
                type="submit"
                className="btn w-full xl:w-1/2 mt-4 mx-auto btn-primary"
              >
                Sign Up
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
