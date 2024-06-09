import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToastMessage from './components/Toast';
import Modal from './components/Modal';
// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CityLink-Chemnitz',
  description:
    'An interactive map application for Chemnitz with data to access info about public and private facilities',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        {children}
        <ToastMessage />
        <Modal />
      </body>
    </html>
  );
}
