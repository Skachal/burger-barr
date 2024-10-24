import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Congrats.css';
import Win from '../kar/GalochkaWin.png';  // Галочка (Win)
import smallBall from '../kar/smallBall.png';  // Маленький шар
import MiniSredniBall from '../kar/MiniSredniBall.png';  // Средний шар
import SredniiBall from '../kar/SredniiBall.png';  // Ещё один шар
import bigBall from '../kar/bigBall.png';  // Большой шар

const Congrats = () => {
  const navigate = useNavigate();
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    // Запускаем анимацию только при первом рендере компонента
    if (!animationPlayed) {
      setAnimationPlayed(true);
    }
  }, [animationPlayed]);

  const handleNext = () => {
    navigate('/login'); // Переход на страницу логина
  };

  return (
    <div className="congrats-container">
      {/* Всплески шаров */}
      <div className="background-balls">
        <div className="ball small" style={{ backgroundImage: `url(${smallBall})` }}></div>
        <div className="ball miniSrednii" style={{ backgroundImage: `url(${MiniSredniBall})` }}></div>
        <div className="ball srednii" style={{ backgroundImage: `url(${SredniiBall})` }}></div>
        <div className="ball big" style={{ backgroundImage: `url(${bigBall})` }}></div>
      </div>

      {/* Галочка */}
      <div className="congrats-icon">
        <img src={Win} alt="win icon" className="wins" />
      </div>

      <h2 className="congrats-h2">Поздравляем!</h2>
      <p className="congrats-p">Ваш профиль готов к использованию</p>

      <button type="submit" className="congrats-next-button" onClick={handleNext}>
        Далее
      </button>
    </div>
  );
};

export default Congrats;
