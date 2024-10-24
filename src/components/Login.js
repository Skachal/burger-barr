import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import PochtaIcon from '../iconss/mail.png';
import ShieldIcon from '../iconss/par.png';
import Facebook from '../kar/Facebuk.png';
import Google from '../kar/Google.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Состояние для сообщения об ошибке
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Проверяем, что поля не пустые перед вызовом trim()
    if (!email || !password) {
      setErrorMessage('Заполните все поля');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),  // Используем trim только после проверки на null
          password: password.trim(),  // Используем trim только после проверки на null
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/home');
      } else {
        setErrorMessage('Неправильный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setErrorMessage('Ошибка при выполнении входа');
    }
  };
  

  const handleRegister = () => {
    navigate('/register'); // Переход на страницу регистрации
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-h1">BURGER BAR</h1>
        <h2 className="login-h2">Войдите в свой профиль</h2>
        <p className="login-p">Войдите, чтобы продолжить</p>
        <div className="login-input-field">
          <img src={PochtaIcon} alt="mail" className="icon" />
          <input
            type="email"
            placeholder="maksimbest@mail.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-input-field">
          <img src={ShieldIcon} alt="shield" className="icon" />
          <input
            type="password"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Отображение ошибки */}
        <div className="social-buttons">
          <button className="social-button facebook-button">
            <img src={Facebook} alt="Facebook" className="social-icon" /> Facebook
          </button>
          <button className="social-button google-button">
            <img src={Google} alt="Google" className="social-icon" /> Google
          </button>
        </div>
        <a className="zabil" onClick={() => navigate('/forgot')}>Забыли пароль?</a>
        <button className="login-button" onClick={handleLogin}>
          Войти
        </button>
        <p className="registr-link">
          Нет аккаунта? <a onClick={handleRegister}> Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
