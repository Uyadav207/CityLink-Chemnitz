import React from 'react';
import Image from 'next/image';
import UserAvatar from '../UserAvatar';
import Link from 'next/link';
import useUserStore from '@/app/store/userStore';

type MobileViewProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileView({ setter }: MobileViewProps) {
  const { userData } = useUserStore();
  return (
    <>
      <div className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] navbar bg-base-100 flex [&>*]:my-auto px-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              onClick={() => {
                setter((oldVal) => !oldVal);
              }}
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <UserAvatar
                  name={userData?.firstName}
                  classNames="w-10 h-10 "
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/dashboard/settings">Settings</Link>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
