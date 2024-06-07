import React from 'react';
import Profile from './Profile';
import List from './List';

const Sidebar = () => {
  return (
    <div className="leftside-bar bg-white-200 px-2 py-6 ">
      <Profile />
      <List />
    </div>
  );
};

export default Sidebar;
