import React from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    // Must be inside a component to get the router instance

    // if (typeof window !== 'undefined') {
    //   const token = localStorage.getItem('token');
    //   console.log(token);

    //   if (!token) {
    //     router.replace('/login');
    //     return null;
    //   }
    // }

    return (
      <>
        <WrappedComponent {...props} />;
      </>
    );
  };
};

export default withAuth;
