'use client';

import { useEffect } from 'react';
import React from 'react';
import ModalPopup from '../components/ModalPopup';
// import { userApi } from '../api/settings';

const Dashboard = () => {
  // useEffect(() => {
  //   fetchUserDetails();
  // }, []);

  // const fetchUserDetails = async () => {
  //   try {
  //     const response = await userApi.getUser();
  //     console.log(response.data);
  //   } catch (err: any) {
  //     console.log('erorr', err.response);
  //   } finally {
  //     // setLoader(false);
  //   }
  // };

  return (
    <>
      <h1 className="text-center">Dashboard</h1>
      <div className="flex items-center min-h-sceeen">
        <ModalPopup />
      </div>
    </>
  );
};

export default Dashboard;
