'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ReactGoogleMaps from '@/app/components/ReactGoogleMaps';
import MobileView from '@/app/components/Sidebar/MobileView';
import isAuth from '@/app/helpers/protectedRoute';
import { NextPage } from 'next';

const CityLink: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex relative ">
      <MobileView setter={setShowSidebar} />
      <Sidebar show={showSidebar} setter={setShowSidebar} />
      <ReactGoogleMaps />
    </div>
  );
};

export default isAuth(CityLink);
