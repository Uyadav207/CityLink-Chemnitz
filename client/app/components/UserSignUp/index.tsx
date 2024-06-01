'use client';

import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import Link from 'next/link';

import { loginApi } from '../../api/auth';
import { Input, PhoneNumberInput } from '../Inputs';
import { Loader } from '../Loader';

import { INITIAL_VALUES, VALIDATION } from './constants';

const UserSignUp = () => {
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
    <div className="w-full p-4 justify-center flex min-h-screen space-x-24">
      <div className="text-center p-4 my-auto">
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
      <div className="flex-col w-1/3 lg:flex-row-reverse mt-8">
        <div className="card shrink-0 w-full shadow-2xl bg-base-200 p-2">
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION}
            onSubmit={handleLogin}
          >
            <Form className="card-body">
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
                label="Phone Number"
                className="w-full input input-bordered"
                defaultCountry="DE"
                name="phoneNumber"
                placeholder="Enter Phone number"
              />
              <Input
                label="Email"
                name="Email"
                placeholder="Enter your Email"
                type="text"
              />
              <Input
                label="Password"
                name="Password"
                placeholder="Enter Password"
                type="password"
              />
              <Input
                label="Confirm Password"
                name="Password"
                placeholder="Enter Password"
                type="password"
              />
            </Form>
          </Formik>
          <div className="form-control">
            <button className="btn w-1/2 mx-auto btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
