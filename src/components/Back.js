import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Back.css'; // Создайте и стилизуйте этот файл
import ba from '../iconss/ba.png';

const Back = () => {
  const navigate = useNavigate(); // Инициализация навигации

  const goBack = () => {
    navigate(-1); // Возвращает на предыдущую страницу
  };

  return (
    <button className="back-button" onClick={goBack}>
      <img src={ba} alt="Back" /> {/* Добавьте иконку или изображение для кнопки */}
    </button>
  );
};

export default Back;
