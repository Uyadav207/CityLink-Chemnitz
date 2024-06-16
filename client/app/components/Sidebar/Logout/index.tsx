'use client';
// src/components/Logout.tsx
import React from 'react';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUserStore from '@/app/store/userStore';
import useModalStore from '@/app/store/modalStore';
import Modal from '../../Modal';

const Logout: React.FC = () => {
  const { logout } = useUserStore();
  const { setIsOpen, setModalData } = useModalStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('mapData');
    window.location.href = '/login';
  };

  const openModal = () => {
    setModalData(
      'Confirm Logout',
      'Are you sure you want to logout?',
      handleLogout
    );
    setIsOpen(true);
  };

  return (
    <div
      onClick={openModal}
      className="absolute bottom-2 w-full cursor-pointer"
    >
      <p className="flex justify-center w-3/4 rounded-lg border border-gray-400 btn text-base mx-auto">
        Logout
        <span className="ml-3">
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </span>
      </p>
      <Modal />
    </div>
  );
};

export default Logout;
