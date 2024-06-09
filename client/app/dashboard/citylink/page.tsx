import React from 'react';
import Sidebar from '../../components/Sidebar';
import MainMap from '@/app/components/Map';
import ReactGoogleMaps from '@/app/components/ReactGoogleMaps';

const App: React.FC = () => {
  return (
    <div className="flex ">
      <Sidebar />

      <ReactGoogleMaps />

      {/* <MapBox /> */}
      {/* <MainMap /> */}
    </div>
  );
};

export default App;
