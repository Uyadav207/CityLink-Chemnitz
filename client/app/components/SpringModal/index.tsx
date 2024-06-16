import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faEnvelope,
  faGlobe,
  faMapLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

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
            className="fixed top-[20%] left-[30%] lg:left-[40%] transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br bg-white p-6 rounded-lg w-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%]  shadow-2xl  "
          >
            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2"
            >
              <FontAwesomeIcon size="lg" icon={faClose} color="black" />
            </div>
            <div className={`relative  ${isFlipped ? 'hidden' : ''}`}>
              <div className=" bg-gray-400-900 text-black rounded-lg p-4">
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
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(attributes.TELEFON);
                      toast.success('Phone number copied to clipboard!');
                    }}
                    className="flex items-center "
                  >
                    <FontAwesomeIcon size="lg" icon={faPhone} color="black" />
                    <h5 className="text-black text-base font-normal leading-6 ml-5 hover:font-medium">
                      {attributes.TELEFON
                        ? attributes.TELEFON
                        : 'Not Available'}
                    </h5>
                  </div>
                  <div className="border-b-2 border-gray-400"></div>
                  <div className="flex items-center ">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faEnvelope}
                      color="black"
                    />

                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${attributes.EMAIL}`}
                      target="_blank"
                      className="text-black text-base font-normal leading-6 ml-5 hover:font-medium"
                    >
                      {attributes.EMAIL ? attributes.EMAIL : 'Not Available'}
                    </a>
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
                  <div className="flex items-center w-full ">
                    <FontAwesomeIcon size="lg" icon={faGlobe} color="black" />
                    <a
                      href={attributes.WWW}
                      target="_blank"
                      className="w-full break-all  text-black text-base font-normal leading-6 ml-5  hover:font-medium transition-colors duration-200"
                    >
                      {' '}
                      {attributes.WWW ? attributes.WWW : 'Not Available'}
                    </a>
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
                    &bull;{' '}
                    {attributes.Creator ? attributes.Creator : 'Not Available'}
                  </h5>
                </div>
                <div className="border-b-2 border-gray-400"></div>
                <div className="flex items-center ">
                  <p className="font-bold w-1/6"> Editor</p>
                  <h5 className="text-black text-base font-normal leading-6 ml-5 hover:font-medium">
                    &bull;{' '}
                    {attributes.Editor ? attributes.Editor : 'Not Available'}
                  </h5>
                </div>
                <div className="border-b-2 border-gray-400"></div>
                <div className="flex items-center ">
                  <p className="font-bold w-1/6"> Profile</p>
                  <h5 className="text-black text-base font-normal leading-6 ml-5 hover:font-medium">
                    &bull;{' '}
                    {attributes.PROFILE ? attributes.PROFILE : 'Not Available'}
                  </h5>
                </div>
                <div className="border-b-2 border-gray-400"></div>
                <div className="flex items-center overflow-wrap break-word ">
                  <p className="font-bold w-1/6"> Trager</p>
                  <h5 className="text-black text-base font-normal leading-6 ml-5  hover:font-medium transition-colors duration-200">
                    &bull;{' '}
                    {attributes.TRAEGER ? attributes.TRAEGER : 'Not Available'}
                  </h5>
                </div>
                <div className="border-b-2 border-gray-400"></div>
                <div className="flex items-center overflow-wrap break-word ">
                  <p className="font-bold w-1/6"> Fax</p>
                  <h5 className="text-black text-base font-normal leading-6 ml-5  hover:font-medium transition-colors duration-200">
                    &bull; {attributes.FAX ? attributes.FAX : 'Not Available'}
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
