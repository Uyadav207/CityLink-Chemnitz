import React, { ReactNode } from 'react';

interface AddressDropDownProps {
    children: ReactNode;
}

const AddressDropDown: React.FC<AddressDropDownProps> = ({ children }) => {
    return (
        <div className="dropdown dropdown-top">
            <div tabIndex={0} role="button" className="btn m-1">Select Home Address</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52">
                {children}
            </ul>
        </div>
    );
};

export default AddressDropDown;
