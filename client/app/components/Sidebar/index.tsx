import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSearch } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="top-0 left-0 w-100 h-screen bg-white-200 p-8">
      <div className="flex mb-5">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">John Doe</h1>
          <p className="text-sm text-gray-500">@utkarshwhosnaps</p>
        </div>
        <button className="ml-auto mr-0">
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
      <span className="flex items-justify mb-5 rounded-xlg border border-black-400">
        <input
          type="text"
          className="flex-grow p-2 focus:outline-none"
          placeholder="Search"
        />
        <button className="p-2 text-gray-600">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </span>
      <ul>
        <li className="mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer flex">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold">Verein zur Beruflichen Förderung und Ausbildung e. V.</h1>
            <p className="text-sm text-gray-500">
              0.5mi, <span>Open Till 6PM</span>
            </p>
          </div>
        </li>
        <li className="mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer flex">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold">Stadtmission Chemnitz e. V.</h1>
            <p className="text-sm text-gray-500">
              0.5mi, <span>Open Till 6PM</span>
            </p>
          </div>
        </li>
        <li className="mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer flex">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold">Stadtmission Chemnitz e. V.</h1>
            <p className="text-sm text-gray-500">
              0.5mi, <span>Open Till 6PM</span>
            </p>
          </div>
        </li>
        <li className="mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer flex">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold">Stadtmission Chemnitz e. V.</h1>
            <p className="text-sm text-gray-500">
              0.5mi, <span>Open Till 6PM</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
