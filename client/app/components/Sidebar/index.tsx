import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";
import Search from "./Search";
import List from "./List";

const Sidebar = () => {
  return (
    <div className="top-0 left-0 w-100 bg-white-200 p-8">
      <Profile />
      <Search />
      <List />
    </div>
  );
};

export default Sidebar;
