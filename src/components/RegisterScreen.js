import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterScreen.css';
import PochtaIcon from '../iconss/mail.png';
import PhoneIcon from '../iconss/tel.png';
import ShieldIcon from '../iconss/par.png';
import iconnn from '../iconss/Img_box_duotone_line.png';

const RegisterScreen = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Use navigate to change routes
  };

  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState('');   // State for last name
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Reset errors
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    // Validation logic
    if (!firstName || !lastName || !email || !phone || !password || !profilePhoto) {
      alert('Пожалуйста, заполните все поля.');
      hasError = true;
    }

    // Validate email uniqueness (example: check against existing emails)
    const existingEmails = ['test@gmail.com', 'example@gmail.com']; // Replace this with a fetch to your database
    if (existingEmails.includes(email)) {
      setEmailError('Этот адрес электронной почты уже зарегистрирован.');
      hasError = true;
    }

    // Validate phone number
    const phonePattern = /^[0-9\s()+-]+$/; // Pattern to allow only numbers and some characters
    if (!phonePattern.test(phone)) {
      setPhoneError('Номер телефона должен содержать только цифры.');
      hasError = true;
    }

    // Validate password strength
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError('Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 цифру и 1 специальный символ.');
      hasError = true;
    }

    if (!hasError) {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }

      try {
        const response = await fetch('http://localhost:5000/registr', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Пользователь зарегистрирован:', result);
          navigate('/login');
        } else {
          const error = await response.json();
          console.error('Ошибка регистрации:', error);
          setEmailError(error.message || 'Ошибка регистрации');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-h1">BURGER BAR</h1>
        <h2 className="register-h2">Создать аккаунт</h2>
        <p className="register-p">Зарегистрируйтесь, чтобы продолжить</p>
        <form onSubmit={handleCreateAccount}>
          <input
            type="text"
            placeholder="Введите имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="name-input-field"
          />
          <input
            type="text"
            placeholder="Введите фамилию"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="name-input-field"
          />
          <div className='ph'>
            <h2 className="photo-h2"><img src={iconnn} alt="galeri" className="icon" /> Загрузите свое фото для профиля</h2>
            <label htmlFor="profilePhoto" className="ph-label">Выбрать фото</label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className='ph-btn'
              required
            />
          </div>

          <div className={`input-field ${emailError ? 'error' : ''}`}>
            <img src={PochtaIcon} alt="mail" className="icon" />
            <input
              type="email"
              placeholder="maksimbest@mail.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span className="error-text">{emailError}</span>}
          </div>
          <div className={`input-field ${phoneError ? 'error' : ''}`}>
            <img src={PhoneIcon} alt="phone" className="icon" />
            <input
              type="text"
              placeholder="+7 (953) 827 15-02"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && <span className="error-text">{phoneError}</span>}
          </div>
          <div className={`input-field ${passwordError ? 'error' : ''}`}>
            <img src={ShieldIcon} alt="password" className="icon" />
            <input
              type="password"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <span className="error-text">{passwordError}</span>}
          </div>
          <button type="submit" className="create-account-button">
            Создать аккаунт
          </button>
          <p className="login-link">
            Уже есть аккаунт? <a onClick={handleLogin}>Войти</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
