import React from 'react';
import '../ModalPopup/test.css';
import { AnimatePresence, motion } from 'framer-motion';
// import { FiAlertCircle } from 'react-icons/fi';

const SpringModal = ({ info, isOpen, setIsOpen }) => {
  console.log('infooooooo', info);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className=" p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="  absolute top-[52%] left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-red-300 to-red-600 text-white p-6 rounded-lg w-1/4  shadow-xl "
          >
            <div className="to"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-2">
                {info.TRAEGER}
              </h3>
              <p className="text-center mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                aperiam vitae, sapiente ducimus eveniet in velit.
              </p>
              {/* <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div> */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
