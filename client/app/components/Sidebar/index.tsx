import React from 'react';
import Profile from './Profile';
import List from './List';
import Logout from './Logout';

const Sidebar = () => {
  return (
    <div className='sidebar leftside-bar'>
      <div className="p-3">
        <Profile />
        <List />
      </div>
      <Logout />
    </div>
  )
};

export default Sidebar;
