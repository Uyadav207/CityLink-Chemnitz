'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ReactGoogleMaps from '@/app/components/ReactGoogleMaps';
import MobileView from '@/app/components/Sidebar/MobileView';
import withAuth from '@/app/helpers/protectedRoute';

const App: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex relative">
      <MobileView setter={setShowSidebar} />
      <Sidebar show={showSidebar} setter={setShowSidebar} />
      <ReactGoogleMaps />
    </div>
  );
};

export default withAuth(App);
