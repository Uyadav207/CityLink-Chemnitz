'use client';

import { Input, PhoneNumberInput } from '@/app/components/Inputs';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUserStore from '../../store/userStore';

import { Form, Formik, Field, FieldArray } from 'formik';
import {
  faCircle,
  faCircleMinus,
  faCirclePause,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  const [toggle, setToggle] = useState(false);
  const { userData } = useUserStore();
  console.log(userData);

  return (
    <div className="w-full p-6 mx-auto ">
      <div className="flex flex-wrap">
        <div className="w-fullpx-3 mx-auto shrink-0 md:w-4/5 md:flex-0">
          <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
              <div className="flex items-center">
                <p className="mb-0 dark:text-dark/80 text-2xl">Settings</p>
              </div>
            </div>
            <div className="w-full mt-8 flex px-6 justify-between items-center">
              <div className="flex space-x-4 w-1/2 ">
                <p className="text-sm">Switch User Mode</p>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={toggle}
                  onChange={() => setToggle(!toggle)}
                />
              </div>
              <button className="btn btn-error text-white">
                Delete Account
              </button>
            </div>
            <div className="flex-auto p-6">
              <p className="leading-normal uppercase dark:text-dark dark:opacity-60 text-sm">
                User Information
              </p>
              <div className="flex flex-wrap -mx-3 ">
                <Formik
                //   initialValues={INITIAL_VALUES}
                //   validationSchema={VALIDATION}
                //   onSubmit={handleLogin}
                >
                  <Form className="w-full grid-cols-1 grid md:grid-cols-2">
                    <div className="w-full max-w-full px-3 shrink-0 md:flex-0 md:w-full">
                      <Input
                        label="Firstname"
                        name="Firstname"
                        placeholder="Enter your Firstname"
                        type="text"
                        className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:flex-0 md:w-flull">
                      <Input
                        label="Lastname"
                        name="Lastname"
                        placeholder="Enter your Lastname"
                        type="text"
                        className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:flex-0">
                      <Input
                        label="Email"
                        name="Email"
                        placeholder="Enter your Email"
                        type="text"
                        className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:flex-0">
                      <PhoneNumberInput
                        international
                        label="Phone Number"
                        className="w-full input input-bordered"
                        defaultCountry="DE"
                        name="phoneNumber"
                        placeholder="Enter Phone number"
                      />
                    </div>
                  </Form>
                </Formik>
              </div>

              <p className="leading-normal uppercase dark:text-dark dark:opacity-60 text-sm mt-8">
                Contact Information
              </p>

              <Formik initialValues={{ contacts: [] }}>
                {({ values }) => (
                  <Form>
                    <FieldArray
                      name="contacts"
                      render={(arrayHelpers) => (
                        <div className="">
                          {values && values?.contacts.length > 0 ? (
                            values?.contacts.map(
                              ({ address, city, country, postal }, index) => (
                                <div className="flex flex-wrap " key={index}>
                                  <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                                    <Input
                                      label="Street"
                                      name={`address[${index}]`}
                                      placeholder="Enter your Street"
                                      value={address}
                                      type="text"
                                      className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                    />
                                  </div>
                                  <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                                    <Input
                                      label="City"
                                      name={`city[${index}]`}
                                      placeholder="Enter your Address"
                                      value={city}
                                      type="text"
                                      className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                    />
                                  </div>
                                  <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                                    <Input
                                      label="Country"
                                      name="Country"
                                      placeholder="Enter your Country"
                                      value={country}
                                      type="text"
                                      className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                    />
                                  </div>

                                  <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                                    <Input
                                      label="Postal Code"
                                      name="Postal"
                                      placeholder="Enter your Country"
                                      type="text"
                                      value={postal}
                                      className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                    />
                                  </div>
                                  <div className="p-2 flex justify-end w-full space-x-2">
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faCircleMinus}
                                        size="lg"
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.insert(index, {
                                          address: '',
                                          city: '',
                                          country: '',
                                          postal: '',
                                        })
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faCirclePlus}
                                        size="lg"
                                      />
                                    </button>
                                  </div>
                                </div>
                              )
                            )
                          ) : (
                            <button
                              className="btn btn-sm w-1/4 mt-4"
                              type="button"
                              onClick={() => {
                                arrayHelpers.push({
                                  address: '',
                                  city: '',
                                  country: '',
                                  postal: '',
                                });
                                console.log('values', values);
                              }}
                            >
                              Add Contact details
                            </button>
                          )}
                        </div>
                      )}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
