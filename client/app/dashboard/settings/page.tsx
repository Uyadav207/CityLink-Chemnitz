'use client';

import { Input } from '@/app/components/Inputs';
import React from 'react';

import { Form, Formik } from 'formik';

const Settings = () => {
  return (
    <div className="w-full p-6 mx-auto ">
      <div className="flex flex-wrap">
        <div className="w-fullpx-3 mx-auto shrink-0 md:w-4/5 md:flex-0">
          <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
              <div className="flex items-center">
                <p className="mb-0 dark:text-dark/80">Edit Profile</p>
              </div>
            </div>
            <div className="flex-auto p-6">
              <p className="leading-normal uppercase dark:text-dark dark:opacity-60 text-sm">
                User Information
              </p>
              <div className="flex flex-wrap -mx-3">
                <Formik
                //   initialValues={INITIAL_VALUES}
                //   validationSchema={VALIDATION}
                //   onSubmit={handleLogin}
                >
                  <Form className="w-full flex">
                    <div className="w-full max-w-full px-3 shrink-0 md:flex-0 md:w-1/2">
                      <Input
                        label="Firstname"
                        name="Firstname"
                        placeholder="Enter your Firstname"
                        type="text"
                        className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:flex-0 md:w-1/2">
                      <Input
                        label="Firstname"
                        name="Firstname"
                        placeholder="Enter your Firstname"
                        type="text"
                        className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </Form>
                </Formik>
              </div>

              <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />

              <p className="leading-normal uppercase dark:text-dark dark:opacity-60 text-sm">
                Contact Information
              </p>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-dark/80"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                      className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                  <div className="mb-4">
                    <label
                      htmlFor="city"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-dark/80"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value="New York"
                      className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                  <div className="mb-4">
                    <label
                      htmlFor="country"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-dark/80"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value="United States"
                      className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                  <div className="mb-4">
                    <label
                      htmlFor="postal code"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-dark/80"
                    >
                      Postal code
                    </label>
                    <input
                      type="text"
                      name="postal code"
                      value="437300"
                      className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
