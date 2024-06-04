import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
    return (
        <span className="flex items-center mb-5 rounded-xl border border-black-400">
            <input
                type="text"
                className="flex-grow p-2 focus:outline-none"
                placeholder="Search"
                value={value}
                onChange={onChange}
            />
            <button className="p-2 text-gray-600">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </span>
    );
}

export default Search;
