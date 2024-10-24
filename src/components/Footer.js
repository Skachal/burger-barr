import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации
import HomeIcon from '../kar/Home.png';
import CartIcon from '../kar/Zakazi.png';
import FavoriteIcon from '../kar/Favorite.png';
import ProfileIcon from '../kar/Profile.png';
import KorzFoot from '../kar/KorzFoot.png'; 

const Footer = () => {
  const navigate = useNavigate(); // Используем хук для навигации

  return (
    <div className="footer-container">
      <button className="footer-icon" onClick={() => navigate('/home')}>
        <img src={HomeIcon} alt="Home" />
      </button>

      <button className="footer-icon" onClick={() => navigate('/orders')}>
        <img src={CartIcon} alt="Orders" />
      </button>

      <button className="footer-icon cart" onClick={() => navigate('/zakaz')}>
        <img src={KorzFoot} alt="Korzina" />
      </button>

      <button className="footer-icon" onClick={() => navigate('/loved')}>
        <img src={FavoriteIcon} alt="Favorites" />
      </button>

      <button className="footer-icon" onClick={() => navigate('/profile')}> {/* Переход на профиль */}
        <img src={ProfileIcon} alt="Profile" />
      </button>
    </div>
  );
};

export default Footer;
