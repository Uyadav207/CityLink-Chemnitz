import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <span className="bg-gray-100 relative flex items-center mb-5 rounded-lg p-1">
      <input
        type="text "
        className="bg-gray-100 flex-grow p-2 focus:outline-none"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
      <button className="absolute right-0 right-2 text-gray-600">
        <FontAwesomeIcon icon={faSearch} color='#D3D3D3' />
      </button>
    </span>
  );
};

export default Search;
