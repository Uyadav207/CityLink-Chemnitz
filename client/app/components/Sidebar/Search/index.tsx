import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search: React.FC = () => {
    return (
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
    );
}

export default Search;


