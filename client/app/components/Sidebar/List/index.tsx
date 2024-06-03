import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const List: React.FC = () => {
    return (
        <ul>
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
    );
}

export default List;


