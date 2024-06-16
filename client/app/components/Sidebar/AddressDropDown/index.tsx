import React, { ReactNode } from 'react';

interface AddressDropDownProps {
  children: ReactNode;
}

const AddressDropDown: React.FC<AddressDropDownProps> = ({ children }) => {
  return (
    <div className="dropdown dropdown-bottom">
      <div
        tabIndex={0}
        role="button"
        className=" border  btn hover:border-black m-2 bg-white shadow"
      >
        Select Home Address
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content  shadow rounded-xl bg-white w-52"
      >
        {children}
      </ul>
    </div>
  );
};

export default AddressDropDown;
