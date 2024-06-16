'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';

import useUserStore from '@/app/store/userStore';
import useModalStore from '@/app/store/modalStore';
import { Input, PhoneNumberInput } from '@/app/components/Inputs';
import { Loader } from '@/app/components/Loader';

import {
  CONTACT_INITIAL_VALUES,
  CONTACT_VALIDATION,
  USER_INITIAL_VALUES,
  USER_VALIDATION,
} from './constants';

import { settingsApi } from '@/app/api/settings';
import withAuth from '@/app/helpers/protectedRoute';

const Settings = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);
  const [editClicked, setEditClicked] = useState(true);
  const [editAddress, setEditAddress] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [index, setIndex] = useState(0);
  const { userData, setUser } = useUserStore();
  const [pageLoader, setPageLoader] = useState(true);
  const [loader, setLoader] = useState(false);
  const { setIsOpen, setModalData } = useModalStore();

  const handleEdit = async (values: any) => {
    try {
      setLoader(true);
      const response = await settingsApi.editUserDetails(userData.id, values);
      toast.success(response.data.message);
      setEditClicked(true);
      setUser(response.data.user);
    } catch (err: any) {
      console.log('erorr', err.response);
    } finally {
      setLoader(false);
    }
  };

  const handleAddContact = async (values: any) => {
    try {
      setLoader(true);
      const response = await settingsApi.editContactDetails(
        userData.id,
        values
      );
      toast.success(response.data.message);
      setAddAddress(false);
      setEditAddress(false);
      setUser(response.data.updatedUser);
      console.log(response.data.updatedUser);
    } catch (err: any) {
      console.log('erorr', err.response);
    } finally {
      setLoader(false);
    }
  };

  const handleEditAddress = async (values: any) => {
    try {
      setLoader(true);
      console.log(values);
      const response = await settingsApi.updateAddress(userData.id, values);
      toast.success(response.data.message);
      setAddAddress(false);
      setEditAddress(false);
      setUser(response.data.updatedUser);
    } catch (err: any) {
      console.log('erorr', err.response);
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = async () => {
    setEditAddress(false);
    setAddAddress(false);
  };

  const handleEditClicked = async (index: any) => {
    setEditAddress(true);
    setIndex(index);
    console.log(index);
  };

  const handleDeleteAddress = async (id: number, addressId: number) => {
    try {
      setLoader(true);
      const response = await settingsApi.deleteAddress(id, addressId);
      toast.success(response.data.message);
      setUser(response.data.updatedUser);
    } catch (err: any) {
      console.log('erorr', err.response);
    } finally {
      setLoader(false);
    }
  };

  const handleUserTypeChange = async () => {
    try {
      setLoader(true);
      console.log(userData.userType);

      const payload = {
        userType: userData.userType === 'REGULAR' ? 'SUPER' : 'REGULAR',
      };

      const response = await settingsApi.switchUserMode(userData.id, payload);
      toast.success(response.data.message);
      console.log('response', response.data);

      setUser(response.data.user);
      setEditClicked(true);
    } catch (err: any) {
      console.log('erorr', err.response);
    } finally {
      setLoader(false);
    }
  };

  const handleTypeChange = () => {
    if (userData.userType === 'SUPER') {
      setModalData(
        'Confirm Switching User',
        'Switch Back to REGULAR USER Deletes multiple Favorutes and Addresses. Are you sure you want to switch user mode?',
        handleUserTypeChange
      );
      setIsOpen(true);
    } else if (userData.userType === 'REGULAR') {
      handleUserTypeChange();
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      setPageLoader(true);
      const response = await settingsApi.deleteUser(userData.id);
      toast.success(response.data.message);
      router.refresh();
      router.push('/signUp');
    } catch (err: any) {
      console.log('erorr', err.response);
    } finally {
      setPageLoader(false);
    }
  };

  const handleDeleteAccount = () => {
    setModalData(
      'Confirm Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      confirmDeleteAccount
    );
    setIsOpen(true);
  };

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="w-full p-6 mx-auto ">
        {pageLoader && <Loader />}
        <div className="flex flex-wrap">
          <div className="w-full px-3 mx-auto shrink-0 md:w-4/5 md:flex-0">
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                <Link className="btn" href="/dashboard/citylink">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-3xl cursor-pointer"
                  />
                </Link>
                <div className="flex items-center justify-between my-4">
                  <p className="mb-0 text-2xl font-bold">Settings</p>
                  <button
                    className="btn btn-error text-white btn-outline"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>

              <div className="flex-auto p-6">
                <div
                  onClick={() => setEditClicked(!editClicked)}
                  className="btn flex space-x-2 items-center my-8 cursor-pointer"
                >
                  <button>
                    {editClicked ? 'Edit Profile' : 'Cancel Edit'}
                  </button>
                  <FontAwesomeIcon icon={faPencil} size="sm" />
                </div>
                {!editClicked && (
                  <div className="w-full p-5 flex justify-center items-center">
                    <p className="text-l mr-3 font-medium">Switch User Mode</p>
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={toggle}
                      onChange={() => {
                        setToggle(!toggle);
                        handleTypeChange();
                      }}
                    />
                  </div>
                )}
                <p className="flex justify-between uppercase dark:text-dark dark:opacity-60 text-lg font-bold">
                  User Information
                  <span className="badge badge-accent badge-outline font-normal p-3 text-white text-sm">
                    {userData?.userType.toLowerCase()} User
                  </span>
                </p>
                <div className="flex flex-wrap -mx-3 ">
                  <Formik
                    initialValues={USER_INITIAL_VALUES}
                    validationSchema={USER_VALIDATION}
                    onSubmit={handleEdit}
                  >
                    {({ setValues, values }) => {
                      useEffect(() => {
                        if (userData) {
                          setValues((values) => ({
                            ...values,
                            username: userData.username,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email,
                            phoneNumber: userData.phoneNo,
                          }));
                          setPageLoader(false);
                        }
                      }, [userData]);

                      return (
                        <Form className="w-full grid-cols-1 grid md:grid-cols-2">
                          <div className="w-full max-w-full px-3 shrink-0 md:flex-0 md:w-full">
                            <Input
                              disabled={editClicked}
                              label="Username"
                              name="username"
                              value={values.username}
                              placeholder="Enter your Username"
                              type="text"
                              className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div className="w-full max-w-full px-3 shrink-0 md:flex-0 md:w-full">
                            <Input
                              disabled={editClicked}
                              label="Firstname"
                              name="firstName"
                              value={values.firstName}
                              placeholder="Enter your Firstname"
                              type="text"
                              className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div className="w-full max-w-full px-3 shrink-0 md:flex-0 md:w-flull">
                            <Input
                              disabled={editClicked}
                              label="Lastname"
                              name="lastName"
                              value={values.lastName}
                              placeholder="Enter your Lastname"
                              type="text"
                              className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div className="w-full max-w-full px-3 shrink-0 md:flex-0">
                            <Input
                              disabled={editClicked}
                              label="Email"
                              name="email"
                              value={values.email}
                              placeholder="Enter your Email"
                              type="text"
                              className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div className="w-full max-w-full px-3 shrink-0 md:flex-0">
                            <PhoneNumberInput
                              disabled={editClicked}
                              international
                              value={values.phoneNumber}
                              label="Phone Number"
                              className="w-full input input-bordered"
                              defaultCountry="DE"
                              name="phoneNumber"
                              placeholder="Enter Phone number"
                            />
                          </div>
                          {!editClicked && (
                            <div className="px-3 w-1/2 mt-8 ">
                              <button
                                type="submit"
                                className="btn w-full btn-outline btn-accent"
                              >
                                Update Details
                              </button>
                            </div>
                          )}
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
                {(!addAddress && (
                  <button
                    onClick={() => setAddAddress(true)}
                    className="btn mt-10 w-full"
                  >
                    Add Address
                  </button>
                )) || (
                  <button
                    onClick={() => handleCancel()}
                    className="btn mt-10 w-full"
                  >
                    Cancel
                  </button>
                )}

                {(userData?.addresses.length > 0 &&
                  editAddress === false &&
                  addAddress === false && (
                    <p className="leading-normal uppercase dark:text-dark dark:opacity-60 text-lg mt-8 font-bold">
                      Home Addresses
                    </p>
                  )) ||
                  (addAddress === true && (
                    <p className="leading-normal uppercase dark:text-dark dark:opacity-60 text-lg mt-8 font-bold">
                      Add Home Address
                    </p>
                  )) ||
                  (editAddress === true && (
                    <p className="leading-normal uppercase dark:text-dark dark:opacity-60 text-lg mt-8 font-bold">
                      Edit Home Address
                    </p>
                  ))}
                {(addAddress === true && (
                  <Formik
                    initialValues={CONTACT_INITIAL_VALUES}
                    validationSchema={CONTACT_VALIDATION}
                    onSubmit={handleAddContact}
                  >
                    {({ setValues, values }) => {
                      useEffect(() => {
                        if (userData) {
                          console.log(userData);
                        }
                      }, [userData]);
                      return (
                        <Form>
                          <div className="flex flex-wrap justify-around">
                            <div className="w-full max-w-full shrink-0 md:w-1/2 md:flex-0">
                              <Input
                                label="Street"
                                name="street"
                                placeholder="Enter your Street"
                                value={values.street}
                                type="text"
                                className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div className="w-full max-w-full shrink-0 md:w-1/2 md:flex-0">
                              <Input
                                label="City"
                                name="city"
                                placeholder="Enter your City"
                                value={values.city}
                                type="text"
                                className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div className="w-full max-w-full shrink-0 md:w-4/12 md:flex-0">
                              <Input
                                label="State"
                                name="state"
                                placeholder="Enter your Address"
                                value={values.state}
                                type="text"
                                className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div className="w-full max-w-full shrink-0 md:w-4/12 md:flex-0">
                              <Input
                                label="Country"
                                name="country"
                                placeholder="Enter your Country"
                                value={values.country}
                                type="text"
                                className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>

                            <div className="w-full max-w-full shrink-0 md:w-4/12 md:flex-0">
                              <Input
                                label="Postal Code"
                                name="zipCode"
                                placeholder="Enter your Country"
                                type="text"
                                value={values.zipCode}
                                className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="px-3 w-full flex  mt-8 ">
                            <button
                              type="submit"
                              className="btn w-1/4 btn-outline btn-accent"
                            >
                              Add Address
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                )) ||
                  (editAddress === true && (
                    <Formik
                      initialValues={CONTACT_INITIAL_VALUES}
                      validationSchema={CONTACT_VALIDATION}
                      onSubmit={handleEditAddress}
                    >
                      {({ setValues, values }) => {
                        useEffect(() => {
                          if (userData) {
                            console.log(userData);
                            console.log(index);
                            const address = userData.addresses[index];
                            setValues((values) => ({
                              ...values,
                              street: address.street,
                              city: address.city,
                              state: address.state,
                              country: address.country,
                              zipCode: address.zipCode,
                              id: address.id,
                            }));
                          }
                        }, [userData]);
                        return (
                          <Form>
                            <div className="flex flex-wrap ">
                              <div className="w-full max-w-full shrink-0 md:w-1/2 md:flex-0">
                                <Input
                                  label="Street"
                                  name="street"
                                  placeholder="Enter your Street"
                                  value={values.street}
                                  type="text"
                                  className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                />
                              </div>
                              <div className="w-full max-w-full shrink-0 md:w-1/2 md:flex-0">
                                <Input
                                  label="City"
                                  name="city"
                                  placeholder="Enter your City"
                                  value={values.city}
                                  type="text"
                                  className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                />
                              </div>
                              <div className="w-full max-w-full shrink-0 md:w-4/12 md:flex-0">
                                <Input
                                  label="State"
                                  name="state"
                                  placeholder="Enter your Address"
                                  value={values.state}
                                  type="text"
                                  className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                />
                              </div>
                              <div className="w-full max-w-full shrink-0 md:w-4/12 md:flex-0">
                                <Input
                                  label="Country"
                                  name="country"
                                  placeholder="Enter your Country"
                                  value={values.country}
                                  type="text"
                                  className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="w-full max-w-full shrink-0 md:w-4/12 md:flex-0">
                                <Input
                                  label="Postal Code"
                                  name="zipCode"
                                  placeholder="Enter your Country"
                                  type="text"
                                  value={values.zipCode}
                                  className=" focus:shadow-primary-outline dark:bg-slate-850 dark:text-dark text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="px-3 w-full flex  mt-8 ">
                              <button
                                type="submit"
                                className="btn w-1/4 btn-outline btn-accent"
                              >
                                Edit Address
                              </button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  )) ||
                  (editAddress === false && addAddress === false && (
                    <div className="grid grid-cols-3 gap-8 w-full">
                      {userData &&
                        userData.addresses.map(
                          (
                            {
                              country,
                              state,
                              city,
                              street,
                              zipCode,
                              id,
                              userId,
                            }: any,
                            index: number
                          ) => (
                            <div
                              key={id}
                              className="border w-full p-2  relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl "
                            >
                              <h5 className="text-center block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Address {index + 1}
                              </h5>
                              {index === 0 ? (
                                <p className="text-center">(Primary Address)</p>
                              ) : (
                                <br />
                              )}

                              <div className="p-6">
                                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                  <strong>Country:</strong> {country} <br />
                                  <strong>State:</strong> {state} <br />
                                  <strong>City:</strong> {city} <br />
                                  <strong>Street:</strong> {street} <br />
                                  <strong>Postal Code:</strong> {zipCode}
                                </p>
                              </div>
                              <div className="flex p-2">
                                <button
                                  onClick={() => handleEditClicked(index)}
                                  className="btn w-1/2 mr-1"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteAddress(userId, id)
                                  }
                                  className="btn w-1/2 ml-1"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Settings);
