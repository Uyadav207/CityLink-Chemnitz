import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './springModal.css';
import {
  faClose,
  faEnvelope,
  faGlobe,
  faMapLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

type SpringModalProps = {
  fetchDirections: (arg0: { lat: number; lng: number }) => void;
  info: any;
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
};

const SpringModal = ({
  fetchDirections,
  info,
  isOpen,
  setIsOpen,
}: SpringModalProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { attributes, geometry } = info;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer  backdrop-filter backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: '0' }}
            animate={{
              scale: 1,
              rotateY: isFlipped ? '180deg' : '0deg',
              transition: { duration: 0.25 },
            }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[25%] left-[50%]  transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br bg-white    p-6 rounded-lg w-[20%] shadow-2xl  "
          >
            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2"
            >
              <FontAwesomeIcon size="lg" icon={faClose} color="black" />
            </div>
            <div className={`relative  ${isFlipped ? 'hidden' : ''}`}>
              <div className="max-w-sm bg-gray-400-900 text-black rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      {attributes.KURZBEZEICHNUNG}
                    </h2>
                    <p
                      onClick={() => {
                        fetchDirections({
                          lat: geometry.y,
                          lng: geometry.x,
                        });
                        setIsOpen(false);
                      }}
                      className="text-green-400  hover:text-green-500"
                    >
                      &bull; Show Direction
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm">{attributes.BEZEICHNUNGZUSATZ}</p>
                </div>
                <div className=" flex space-y-4 flex-col">
                  <div className="flex items-center ">
                    <FontAwesomeIcon size="lg" icon={faPhone} color="black" />
                    <h5 className="text-black text-base font-normal leading-6 ml-5 hover:font-medium">
                      {attributes.TELEFON}
                    </h5>
                  </div>
                  <div className="border-b-2 border-gray-400"></div>
                  <div className="flex items-center ">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faEnvelope}
                      color="black"
                    />
                    <h5 className="text-black text-base font-normal leading-6 ml-5 hover:font-medium">
                      {attributes.EMAIL}
                    </h5>
                  </div>
                  <div className="border-b-2 border-gray-400"></div>
                  <div className="flex items-center ">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faMapLocationDot}
                      color="black"
                    />
                    <h5 className="text-black text-base font-normal leading-6 ml-5 hover:font-medium">
                      {attributes.STRASSE}, {attributes.PLZ}, {attributes.ORT}
                    </h5>
                  </div>
                  <div className="border-b-2 border-gray-400"></div>
                  <div className="flex items-center overflow-wrap break-word  ">
                    <FontAwesomeIcon size="lg" icon={faGlobe} color="black" />
                    <h5 className=" text-black text-base font-normal leading-6 ml-5  hover:font-medium transition-colors duration-200">
                      {attributes.WWW}
                    </h5>
                  </div>
                  <div className="border-b-2 border-gray-400"></div>
                </div>
              </div>
              <div className="flex justify-center items-end h-full w-full">
                <button
                  className="btn    w-2/3 py-2 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  More Details
                </button>
              </div>
            </div>

            <div
              className={` relative  ${isFlipped ? '' : 'hidden'}`}
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
            >
              <h2 className="text-xl font-bold text-center mb-4">
                Additional Information
              </h2>
              <div className=" flex space-y-4 flex-col">
                <div className="flex items-center ">
                  <p className="font-bold w-1/6">Creator</p>
                  <h5 className="text-black text-base font-normal leading-6 ml-5 hover:font-medium">
                    &bull;{attributes.Creator}
                  </h5>
                </div>
                <div className="border-b-2 border-gray-400"></div>
                <div className="flex items-center ">
                  <p className="font-bold w-1/6"> Editor</p>
                  <h5 className="text-black text-base font-normal leading-6 ml-5 hover:font-medium">
                    &bull; {attributes.Editor}
                  </h5>
                </div>
                <div className="border-b-2 border-gray-400"></div>
                <div className="flex items-center ">
                  <p className="font-bold w-1/6"> Profile</p>
                  <h5 className="text-black text-base font-normal leading-6 ml-5 hover:font-medium">
                    &bull;{attributes.PROFILE}
                  </h5>
                </div>
                <div className="border-b-2 border-gray-400"></div>
                <div className="flex items-center overflow-wrap break-word ">
                  <p className="font-bold w-1/6"> Trager</p>
                  <h5 className="text-black text-base font-normal leading-6 ml-5  hover:font-medium transition-colors duration-200">
                    &bull;{attributes.TRAEGER}
                  </h5>
                </div>
                <div className="border-b-2 border-gray-400"></div>
                <div className="flex items-center overflow-wrap break-word ">
                  <p className="font-bold w-1/6"> Fax</p>
                  <h5 className="text-black text-base font-normal leading-6 ml-5  hover:font-medium transition-colors duration-200">
                    &bull;{attributes.FAX}
                  </h5>
                </div>
                <div className="border-b-2 border-gray-400"></div>
              </div>
              <div className="flex justify-center items-end h-full w-full">
                <button
                  className="btn mt-4   w-2/3 py-2 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  Basic Details
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
