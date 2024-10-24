// src/components/EditProfileModal.js
import React, { useState, useEffect } from 'react';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    if (isOpen && user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber || '');
      setProfilePhoto(user.profilePhoto);
    }
  }, [isOpen, user]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setProfilePhoto(result.filePath);
        } else {
          console.error('Ошибка загрузки файла');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  };

  const handleSave = async () => {
    const updatedUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      profilePhoto,
    };

    try {
      const response = await fetch('http://localhost:5000/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        onSave(updatedUserData);
        onClose();
      } else {
        console.error('Ошибка при сохранении данных пользователя');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Изменить профиль</h2>
        <label htmlFor="file-upload" className="file-upload-label">
          Выберите изображение
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
          style={{ display: 'none' }} // Скрываем стандартное поле
        />
        <button className="edit-btn" onClick={() => document.getElementById('file-upload').click()}>
          Загрузить изображение
        </button>
        <img
          src={profilePhoto ? `http://localhost:5000/uploads/${profilePhoto}` : `http://localhost:5000/uploads/${user.profilePhoto}`}
          alt="Profile Preview"
          className="profile-preview"
        />
        <input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button    className="edit-btn" onClick={handleSave}>Сохранить</button>
        <button    className="edit-btn" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default EditProfileModal;
