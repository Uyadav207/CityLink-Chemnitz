'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '../store/userStore';
import toast from 'react-hot-toast';
import { Puffloader } from '../components/Loader';
import ToastMessage from '../components/Toast';

function IsAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const [loader, setLoader] = useState(true);
    // check localstorage for user token
    const { userData } = useUserStore();
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== undefined) {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('You are not authenticated');
          router.push('/login');
        } else {
          setLoader(false);
        }
      }
    }, [userData]);

    return (
      <>
        {loader ? (
          <div>
            <ToastMessage />
            <Puffloader />
          </div>
        ) : (
          <Component {...props!} />
        )}
      </>
    );
  };
}

export default IsAuth;
