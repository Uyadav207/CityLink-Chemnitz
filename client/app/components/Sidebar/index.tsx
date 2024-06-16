import React, { useState } from 'react';
import Profile from './Profile';
import List from './List';
import Logout from './Logout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ show, setter }) => {
  const [loading, setLoading] = useState(true);

  const className =
    'bg-white w-[350px] transition-[margin-left] ease-in-out duration-500  fixed md:static';

  const appendClass = show ? ' ml-0' : ' ml-[-350px] md:ml-0';

  return (
    <>
      <div className={`md:relative leftside-bar ${className}${appendClass}`}>
        <div className="">
          <div
            className={`md:hidden cursor-pointer absolute top-2 right-2 `}
            onClick={() => {
              setter((oldVal) => !oldVal);
            }}
          >
            <FontAwesomeIcon size="lg" icon={faClose} color="black" />
          </div>
          {!loading && (
            <div className="p-4">
              <Profile />
            </div>
          )}

          <List loading={loading} setLoading={setLoading} />
        </div>
        <div className="border border-b  "></div>
        {!loading && <Logout />}
      </div>
    </>
  );
};

export default Sidebar;
