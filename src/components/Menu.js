import React, { useState, useEffect } from 'react';
import './Menu.css';
import axios from 'axios';
import Modal from './Modal'; // Импортируем модальный компонент
import Burger1 from '../menuu/bur1.png';
import Burger2 from '../menuu/bur2.png';
import Burger3 from '../menuu/bur3.png';
import Burger4 from '../menuu/bur4.png';
import Burger5 from '../menuu/bur5.png';
import Pizz1 from '../menuu/piz1.png';
import Pizz2 from '../menuu/piz2.png';
import Pizz3 from '../menuu/piz3.png';
import Pizz4 from '../menuu/piz4.png';
import Pizz5 from '../menuu/piz5.png';
import Sup1 from '../menuu/sup1.png';
import Sup2 from '../menuu/sup2.png';
import Sup3 from '../menuu/sup3.png';
import Sup4 from '../menuu/sup4.png';
import Sup5 from '../menuu/sup5.png';
import Pirog1 from '../menuu/des1.png';
import Pirog2 from '../menuu/des2.png';
import Pirog3 from '../menuu/des3.png';
import Pirog4 from '../menuu/des4.png';
import Pirog5 from '../menuu/des5.png';
import Koktails1 from '../menuu/kok1.png';
import Koktails2 from '../menuu/kok2.png';
import Koktails3 from '../menuu/kok3.png';
import Koktails4 from '../menuu/kok4.png';
import Koktails5 from '../menuu/kok5.png';
import Salat1 from '../menuu/sal1.png';
import Salat2 from '../menuu/sal2.png';
import Salat3 from '../menuu/sal3.png';
import Salat4 from '../menuu/sal4.png';
import Salat5 from '../menuu/sal5.png';
import FrenchDog1 from '../menuu/hot1.png';
import FrenchDog2 from '../menuu/hot2.png';
import FrenchDog3 from '../menuu/hot3.png';
import FrenchDog4 from '../menuu/hot4.png';
import FrenchDog5 from '../menuu/hot5.png';
import Snacks1 from '../menuu/sn1.png';
import Snacks2 from '../menuu/sn2.png';
import Snacks3 from '../menuu/sn3.png';
import Snacks4 from '../menuu/sn4.png';
import Snacks5 from '../menuu/sn5.png';

// Уникальные элементы для каждой категории
const menuItems = {
  burgers: [
    { id: 1, name: 'Биф Бургер', description: 'Говяжья котлета, сыр чеддер, овощи', price: '₸3000', weight: '350g', image: Burger1 },
    { id: 2, name: 'Чиз Бургер', description: 'Говяжья котлета, сыр, соус', price: '₸3200', weight: '400g', image: Burger2 },
    { id: 3, name: 'Крестьянский Бургер', description: 'Говяжья котлета, картофель, соус', price: '₸3500', weight: '450g', image: Burger3 },
    { id: 4, name: 'Острый Бургер', description: 'Острая котлета, сыр, соус чили', price: '₸3400', weight: '400g', image: Burger4 },
    { id: 5, name: 'Двойной Бургер', description: 'Две говяжьи котлеты, сыр, соус', price: '₸4000', weight: '500g', image: Burger5 },
  ],
  pizza: [
    { id: 6, name: 'Пицца Пепперони', description: 'Пепперони, сыр, соус', price: '₸2500', weight: '300g', image: Pizz1 },
    { id: 7, name: 'Четыре сыра', description: 'Сыр моцарелла, пармезан, соус', price: '₸2700', weight: '350g', image: Pizz2 },
    { id: 8, name: 'Маргарита', description: 'Томаты, сыр моцарелла, базилик', price: '₸2300', weight: '300g', image: Pizz3 },
    { id: 9, name: 'Пицца Барбекю', description: 'Курица, соус барбекю, сыр', price: '₸2900', weight: '400g', image: Pizz4 },
    { id: 10, name: 'Пицца с грибами', description: 'Грибы, сыр, соус', price: '₸2600', weight: '350g', image: Pizz5 },
  ],
  'french-dogs': [
    { id: 11, name: 'Французский дог', description: 'Сосиска, сыр, кетчуп', price: '₸1200', weight: '150g', image: FrenchDog1 },
    { id: 12, name: 'Дог с беконом', description: 'Сосиска, бекон, соус', price: '₸1300', weight: '180g', image: FrenchDog2 },
    { id: 13, name: 'Острый дог', description: 'Сосиска, острый соус', price: '₸1400', weight: '160g', image: FrenchDog3 },
    { id: 14, name: 'Дог с сыром', description: 'Сосиска, сыр, майонез', price: '₸1500', weight: '170g', image: FrenchDog4 },
    { id: 15, name: 'Классический дог', description: 'Сосиска, горчица, кетчуп', price: '₸1100', weight: '150g', image: FrenchDog5 },
  ],
  snacks: [
    { id: 16, name: 'Картофель фри', description: 'Картофель фри, соус', price: '₸800', weight: '200g', image: Snacks1 },
    { id: 17, name: 'Картофельные дольки', description: 'Запеченные картофельные дольки', price: '₸900', weight: '250g', image: Snacks2 },
    { id: 18, name: 'Куриные наггетсы', description: 'Куриные наггетсы с соусом', price: '₸1000', weight: '200g', image: Snacks3 },
    { id: 19, name: 'Сырные палочки', description: 'Жареный сыр, соус', price: '₸1100', weight: '150g', image: Snacks4 },
    { id: 20, name: 'Луковые кольца', description: 'Луковые кольца с соусом', price: '₸850', weight: '180g', image: Snacks5 },
  ],
  soups: [
    { id: 21, name: 'Борщ', description: 'Традиционный украинский борщ', price: '₸1800', weight: '250g', image: Sup1 },
    { id: 22, name: 'Чикен Суп', description: 'Куриный суп с овощами', price: '₸2000', weight: '300g', image: Sup2 },
    { id: 23, name: 'Солянка', description: 'Суп с мясом и солеными огурцами', price: '₸2200', weight: '350g', image: Sup3 },
    { id: 24, name: 'Грибной суп', description: 'Грибы, картофель, сливки', price: '₸1900', weight: '300g', image: Sup4 },
    { id: 25, name: 'Томатный суп', description: 'Томаты, базилик, чеснок', price: '₸2100', weight: '280g', image: Sup5 },
  ],
  cocktails: [
    { id: 26, name: 'Фрукт коктейль', description: 'Микс фруктов', price: '₸1500', weight: '500g', image: Koktails1 },
    { id: 27, name: 'Коктейль с молоком', description: 'Молоко, банан, мед', price: '₸1600', weight: '400g', image: Koktails2 },
    { id: 28, name: 'Клубничный коктейль', description: 'Клубника, молоко, сахар', price: '₸1700', weight: '450g', image: Koktails3 },
    { id: 29, name: 'Шоколадный коктейль', description: 'Шоколад, молоко, сахар', price: '₸1800', weight: '400g', image: Koktails4 },
    { id: 30, name: 'Малиновый коктейль', description: 'Малина, молоко, сахар', price: '₸1700', weight: '450g', image: Koktails5 },
  ],
  salads: [
    { id: 31, name: 'Салат Цезарь', description: 'Куриная грудка, сыр пармезан', price: '₸2500', weight: '400g', image: Salat1 },
    { id: 32, name: 'Салат Греческий', description: 'Томаты, огурцы, сыр фета', price: '₸2200', weight: '350g', image: Salat2 },
    { id: 33, name: 'Салат Оливье', description: 'Традиционный русский салат', price: '₸2100', weight: '400g', image: Salat3 },
    { id: 34, name: 'Салат Винегрет', description: 'Свекла, картофель, соленые огурцы', price: '₸1900', weight: '350g', image: Salat4 },
    { id: 35, name: 'Салат с тунцом', description: 'Тунец, яйца, зелень', price: '₸2600', weight: '450g', image: Salat5 },
  ],
  desserts: [
    { id: 36, name: 'Пирог с ягодами', description: 'Пирог с свежими ягодами', price: '₸3000', weight: '350g', image: Pirog1 },
    { id: 37, name: 'Шоколадный торт', description: 'Торт с шоколадным кремом', price: '₸3200', weight: '400g', image: Pirog2 },
    { id: 38, name: 'Тирамису', description: 'Итальянский десерт с маскарпоне', price: '₸3300', weight: '300g', image: Pirog3 },
    { id: 39, name: 'Эклеры', description: 'Эклеры с заварным кремом', price: '₸2900', weight: '250g', image: Pirog4 },
    { id: 40, name: 'Чизкейк', description: 'Чизкейк с малиновым соусом', price: '₸3100', weight: '350g', image: Pirog5 },
  ],
};


const Menu = ({ selectedCategory, addItemToCart }) => {
  const [selectedItem, setSelectedItem] = useState(null); // Хранит выбранный элемент
  const [favorites, setFavorites] = useState([]); // Хранит избранные элементы

  // Получаем идентификатор пользователя из localStorage
  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  useEffect(() => {
    // Загрузка избранных элементов пользователя при загрузке страницы
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/favorites/${userId}`);
        const favoriteIds = response.data.map(favorite => parseInt(favorite.itemId));
        setFavorites(favoriteIds);
      } catch (error) {
        console.error('Ошибка при загрузке избранных элементов:', error);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  // Функция для добавления/удаления элемента в избранное
  const toggleFavorite = async (item) => {
    try {
      if (!item || !item.id) {
        console.error('Ошибка: item или item.id не определены');
        return;
      }

      if (!userId) {
        console.error('Необходимо войти в систему');
        return;
      }

      // Проверяем, находится ли элемент в избранном
      const isFavorite = favorites.includes(item.id);

      if (isFavorite) {
        // Удаляем из избранного
        await axios.delete(`http://localhost:5000/favorites/${userId}/${item.id}`);
        setFavorites(favorites.filter(favId => favId !== item.id));
      } else {
        // Добавляем в избранное
        await axios.post('http://localhost:5000/favorites', {
          userId,
          itemId: item.id.toString(),
          name: item.name,
          description: item.description,
          price: item.price,
          weight: item.weight,
          image: item.image,
        });
        setFavorites([...favorites, item.id]);
      }
    } catch (error) {
      console.error('Ошибка при изменении состояния избранного:', error);
    }
  };

  const itemsToShow = selectedCategory === 'all' ? Object.values(menuItems).flat() : menuItems[selectedCategory] || [];

  // Функция для открытия модального окна
  const openModalHandler = (item) => {
    setSelectedItem(item); // Устанавливаем выбранный элемент, чтобы открыть модальное окно
  };

  return (
    <div className="menu-container">
      <div className="menu-items">
        {itemsToShow.map((item) => (
          <div key={item.id} className="menu-item" onClick={() => openModalHandler(item)}>
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-info">
              <h3>{item.name}</h3>
              <p className="menu-opisanie">{item.description}</p>
              <div className="menu-price-container">
                <p className="menu-price">{item.price}</p>
                <p className="menu-weight">{item.weight}</p>
                <button
                  className={`menu-favorite-button ${favorites.includes(item.id) ? 'favorite-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Чтобы не открывать модальное окно при клике на избранное
                    toggleFavorite(item);
                  }}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} addItemToCart={addItemToCart} />}
    </div>
  );
};

export default Menu;
