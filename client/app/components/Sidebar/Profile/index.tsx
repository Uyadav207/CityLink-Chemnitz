'use client';

import React from 'react';
import useUserStore from '@/app/store/userStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import RandomAvatar from '../../RandomAvatar';
import UserAvatar from '../../UserAvatar';

const Profile: React.FC = () => {
  const { userData }: any = useUserStore();
  const user = userData;
  return (
    <div className="flex my-4">
      {/* <RandomAvatar /> */}
      <UserAvatar name={user?.firstName} classNames="w-10 h-10" />
      <div className="flex flex-col ml-3">
        <h1 className="text-l font-bold">
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
