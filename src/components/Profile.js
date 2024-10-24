// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Back from '../components/Back';
import EditProfileModal from '../components/EditProfileModal';
import us from '../iconss/Us.png';
import uved from '../iconss/uved.png';
import ed from '../iconss/edit.png';
import onas from '../iconss/onas.png';
import bez from '../iconss/bez.png';
import ex from '../iconss/ex.png';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  const handleLogout = () => {
    localStorage.removeItem('user'); // Очищаем localStorage
    navigate('/login'); // Перенаправляем на страницу входа
  };
  return (
    <div className="profile-container">
      <Back />
      <div className="profile-header">
        <h2 className="profile-title">Профиль</h2>
      </div>

      <div className="profile-info">
        {user && (
          <div className="profile-info-header">
            <img
              className="profile-picture"
              src={`http://localhost:5000/uploads/${user.profilePhoto}`}
              alt="Profile"
            />
            <div className="profile-name-email">
              <h3>{user.firstName} {user.lastName}</h3>
              <p>{user.email}</p>
            </div>
            <div className="edit-icon" onClick={() => setIsModalOpen(true)}><img src={ed} alt="edit" className="iicon" /></div>
          </div>
        )}
      </div>
      <div className="profile-section">
        <h3>Общее</h3>
        <div className="profile-option">
          <div className="profile-option-icon">     <img src={us} alt="user" className="iicon" /></div>
          <div className="profile-option-text">
            <h4>Общее</h4>
            <p>Изменяйте вашу личную информацию</p>
          </div>
        </div>
        <div className="profile-option">
          <div className="profile-option-icon">     <img src={uved} alt="uvedom" className="iicon" /></div>
          <div className="profile-option-text">
            <h4>Уведомления</h4>
            <p>Будьте в курсе всех событий</p>
          </div>
        </div>
        <div className="profile-option">
          <div className="profile-option-icon">     <img src={onas} alt="o nas" className="iicon" /></div>
          <div className="profile-option-text">
            <h4>О нас</h4>
            <p>Напишите нам, если хотите помочь</p>
          </div>
        </div>
        <div className="profile-option">
          <div className="profile-option-icon">     <img src={bez} alt="bezop" className="iicon" /></div>
          <div className="profile-option-text">
            <h4>Безопасность</h4>
            <p>Ваши данные никто не украдет</p>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3>Больше</h3>
        <div className="profile-option" onClick={handleLogout}> {/* Добавляем обработчик onClick */}
          <div className="profile-option-icon">     <img src={ex} alt="exit" className="iicon" /></div>
          <div className="profile-option-text">
            <h4>Выйти</h4>
            <p>Но лучше не выходите</p>
          </div>
        </div>
      </div>
      <Footer />

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSave={handleSave}
      />
    </div>
  );
};

export default Profile;
