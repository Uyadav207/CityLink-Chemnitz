import React, { useState } from "react";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserStore from "@/app/store/userStore";
import Modal from "../../Modal"; // Adjust the path as necessary

const Logout: React.FC = () => {
  const { logout } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('mapData');
    window.location.href = '/login';
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmLogout = () => {
    handleLogout();
    closeModal();
  };

  return (
    <div className="absolute bottom-0 logout">
      <p onClick={openModal} className="btn flex text-lg text">
        Logout {""}
        <span className="ml-3">
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </span>
      </p>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
      />
    </div>
  );
};

export default Logout;
