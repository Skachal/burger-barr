import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css'; // Create a new CSS file for styling if needed

const Payment = () => {
  const navigate = useNavigate();

  const handleReturnToMenu = () => {
    navigate('/home');
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <h1>Оплата прошла успешно!</h1>
        <p>Спасибо за ваш заказ. Мы скоро свяжемся с вами для подтверждения заказа.</p>
        <button className="return-button" onClick={handleReturnToMenu}>
          Вернуться в меню
        </button>
      </div>
    </div>
  );
};

export default Payment;
