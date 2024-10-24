// src/components/forgot.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Forgot.css'; // Убедитесь, что у вас есть CSS файл для стилей

const Forgot = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика для отправки запроса на восстановление пароля
    console.log('Запрос на восстановление пароля отправлен');
    // После успешной отправки можно перенаправить пользователя
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-h2">Восстановление пароля</h2>
      <form onSubmit={handleSubmit} className="forgot-form">
        <input
          type="email"
          placeholder="Введите ваш Email"
          required
          className="email-input"
        />
        <button type="submit" className="submit-button">Отправить ссылку для восстановления</button>
      </form>
      <div className="back-link">
        <a onClick={() => navigate(-1)}>Назад к входу</a>
      </div>
    </div>
  );
};

export default Forgot;
