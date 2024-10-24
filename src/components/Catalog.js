import React from 'react';
import './Catalog.css'; 
import Cake from '../iconss/des.png';
import Snek from '../iconss/fry.png';
import Korm from '../iconss/dogs.png';
import Pizza from '../iconss/piz.png';
import Bur from '../iconss/gam.png';
import Kok from '../iconss/koktail.png';
import Salat from '../iconss/sal.png';
import Sup from '../iconss/soup.png';

const Catalog = ({ onCategoryChange }) => {
  return (
    <div className="catalog-container">
      <div className='blockk'>
        <h2 className="catalog-title">Все товары</h2>
        <button className="view-all-button" onClick={() => onCategoryChange('all')}>Посмотреть все</button>
      </div>
      <div className="catalog-items">
        <button className="catalog-item" onClick={() => onCategoryChange('burgers')}>
          <img src={Bur} alt="Бургеры" className="catalog-icon" />
          Бургеры
        </button>
        <button className="catalog-item" onClick={() => onCategoryChange('pizza')}>
          <img src={Pizza} alt="Пицца" className="catalog-icon" />
          Пицца
        </button>
        <button className="catalog-item" onClick={() => onCategoryChange('french-dogs')}>
          <img src={Korm} alt="Френч Доги" className="catalog-icon" />
          Френч Доги
        </button>
        <button className="catalog-item" onClick={() => onCategoryChange('snacks')}>
          <img src={Snek} alt="Снэки" className="catalog-icon" />
          Снэки
        </button>
        <button className="catalog-item" onClick={() => onCategoryChange('cocktails')}>
          <img src={Kok} alt="Коктейли" className="catalog-icon" />
          Коктейли
        </button>
        <button className="catalog-item" onClick={() => onCategoryChange('salads')}>
          <img src={Salat} alt="Салаты" className="catalog-icon" />
          Салаты
        </button>
        <button className="catalog-item" onClick={() => onCategoryChange('soups')}>
          <img src={Sup} alt="Супы" className="catalog-icon" />
          Супы
        </button>
        <button className="catalog-item" onClick={() => onCategoryChange('desserts')}>
          <img src={Cake} alt="Десерты" className="catalog-icon" />
          Десерты
        </button>
      </div>
      
    </div>
  );
};

export default Catalog;
