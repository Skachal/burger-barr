import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setProfilePhoto(user.profilePhoto);
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('modal-overlay-h') || e.target.tagName === 'IMG') {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="header-container">
      <div className="header-left">
        <h1>Привет, {firstName} {lastName}</h1>
        <div className="header-divider"></div>
      </div>
      <div className="header-right">
        <button className="profile-button" onClick={handleProfileClick}>
          <img src={`http://localhost:5000/uploads/${profilePhoto}`} alt="Профиль" className="header-icon" />
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay-h" onClick={handleCloseModal}>
          <div className="modal-content-h">
            <img src={`http://localhost:5000/uploads/${profilePhoto}`} alt="Профиль" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
