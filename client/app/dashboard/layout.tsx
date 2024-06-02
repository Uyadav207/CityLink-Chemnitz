import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { getUserTokenFromLocalStorage } from '../helpers/crypto';

import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const authToken = getUserTokenFromLocalStorage();
  // useEffect(() => {
  //   console.log(authToken);
  //   if (!authToken) {
  //     console.log('hereeee');

  //     toast.error('You are not authorized to view this page');

  //     // redirect('/login');
  //   }
  // }, []);
  // if (authToken) {
  return <div>{children}</div>;

  // return <></>;
}
