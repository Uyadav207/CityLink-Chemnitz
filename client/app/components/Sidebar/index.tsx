import React from "react";
import Profile from "./Profile";
import List from "./List";

const Sidebar = () => {
  return (
    <div className="top-0 left-0 w-80 bg-white-200 p-8">
      <Profile />
      <List />
    </div>
  );
};

export default Sidebar;
