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
    // make a api call to check if user is authenticated
    const { userData } = useUserStore();
    const router = useRouter();
    useEffect(() => {
      console.log(userData);

      if (typeof window !== undefined) {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('You are not authenticated');
          router.push('/login');
        } else {
          setLoader(false);
        }
      }
    }, []);

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
