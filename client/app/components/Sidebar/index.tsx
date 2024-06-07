import React from 'react';
import Profile from './Profile';
import List from './List';
import Logout from './Logout';

const Sidebar = () => {
  return (
    <div className="bg-white bg-transparent top-0 left-0 w-80 rounded-lg">
      <div className='p-8'>
        <Profile />
        <List />
      </div>
      <Logout />
    </div>
  );
};

export default Sidebar;
