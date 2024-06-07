import React from 'react';
import Profile from './Profile';
import List from './List';
import Logout from './Logout';

const Sidebar = () => {
  return (
    <div className="leftside-bar bg-white-200 px-2 py-6 ">
      <Profile />
      <List />
        <Profile />
        <List />
      </div>
      <Logout />
    </div>
  );
};

export default Sidebar;
