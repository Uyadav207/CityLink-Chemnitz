'use client';

import React from 'react';
import useUserStore from '@/app/store/userStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import RandomAvatar from '../../RandomAvatar';

const Profile: React.FC = () => {
  const { userData }: any = useUserStore();
  const user = userData;
  return (
    <div className="flex mb-5">
      {/* <span className="mt-2">
        <RandomAvatar name={'John Doe'} />
      </span> */}
      <div className="flex flex-col ml-3">
        <h1 className="text-lg font-bold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-sm text-gray-500">@{user?.username}</p>
      </div>
      <Link href="/dashboard/settings" className="ml-auto mr-0">
        <FontAwesomeIcon icon={faGear} />
      </Link>
    </div>
  );
};

export default Profile;
