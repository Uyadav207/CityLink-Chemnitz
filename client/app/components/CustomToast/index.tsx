import React from 'react';
import toast from 'react-hot-toast';

import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomToast = ({ result }: { result: any }) => {
  toast.custom(
    (t) => (
      <div
        className={`z-50 absolute${
          t.visible ? 'animate-bounce' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <FontAwesomeIcon icon={faCar} className="h-8 w-8 rounded-full" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Total Distance {result?.routes[0].legs[0].distance.text}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Estimated time to reach{' '}
                {result?.routes[0].legs[0].duration.text}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 z-50">
          <button
            onClick={() => {
              console.log('hereee', t.id);

              toast.remove(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      duration: 500,
    }
  );
};

export default CustomToast;
