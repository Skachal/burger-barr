import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './AuthScreen.css';

const AuthScreen = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="nadpis"><h1 className="auth-h1">BURGER BAR</h1></div>
        <div className="vtorie">
          <p className="auth-p">Вкусный бургер — это то, <br></br> что вы заслуживаете <br></br>здесь и сейчас</p>
          <button className="loginn-button" onClick={handleLogin}>Войти</button>
          <button className="register-button" onClick={handleRegister}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
