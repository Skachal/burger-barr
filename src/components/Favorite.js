import React, { useState, useEffect, useRef } from 'react';
import './Favorite.css';
import HeartIcon from '../imgHome/RedSerdeshko.png';
import ChickenBurgerImage from '../imgHome/twokot.png';
import BeefBurgerImage from '../imgHome/proj.png';
import Pod from '../imgHome/podprig.png';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))?._id; // Получаем userId из localStorage
  const favoriteItemsRef = useRef(null);

  // Список бургеров для отображения
  const burgers = [
    { id: 1, name: 'Чикен Бургер', description: 'Котлета куриная, свежие овощи, сыр чеддер, соус для бургера', price: '₸16000', weight: '2900g', image: ChickenBurgerImage },
    { id: 2, name: 'Биф Бургер', description: 'Говяжья котлета, овощи, соус BBQ', price: '₸18000', weight: '3200g', image: BeefBurgerImage },
    { id: 3, name: 'Сырный Бургер', description: 'Говяжья котлета, сыр чеддер, салат', price: '₸15000', weight: '2800g', image: Pod },
  ];

  const fetchFavorites = async () => {
    if (!userId) {
      console.error('Необходимо войти в систему');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/favorites/${userId}`);

      if (!response.ok) {
        throw new Error('Ошибка при загрузке избранных элементов');
      }

      const data = await response.json();
      const favoriteItemIds = data.map((item) => parseInt(item.itemId)); // Извлекаем itemId избранных товаров
      setFavorites(favoriteItemIds);
    } catch (error) {
      console.error('Ошибка при загрузке избранных элементов:', error);
    }
  };

  const toggleFavorite = async (burger) => {
    if (!userId) {
      console.error('Необходимо войти в систему');
      return;
    }

    try {
      if (favorites.includes(burger.id)) {
        // Если элемент уже в избранном, удаляем его
        const response = await fetch(`http://localhost:5000/favorites/${userId}/${burger.id.toString()}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== burger.id));
        } else {
          console.error('Ошибка при удалении из избранного');
        }
      } else {
        // Если элемента нет в избранном, добавляем его
        const response = await fetch('http://localhost:5000/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            itemId: burger.id.toString(),
            name: burger.name,
            description: burger.description,
            price: burger.price,
            weight: burger.weight,
            image: burger.image,
          }),
        });

        if (response.ok) {
          setFavorites((prevFavorites) => [...prevFavorites, burger.id]);
        } else {
          console.error('Ошибка при добавлении в избранное');
        }
      }
    } catch (error) {
      console.error('Ошибка соединения с сервером:', error);
    }
  };

  const addToOrders = async (burger) => {
    if (!userId) {
      console.error('Необходимо войти в систему');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          items: [
            {
              itemId: burger.id.toString(),
              name: burger.name,
              description: burger.description,
              price: burger.price,
              quantity: 1,
              image: burger.image, // Добавляем поле image
              weight: burger.weight, // Добавляем поле weight
            },
          ],
          totalAmount: parseInt(burger.price.replace('₸', '')), // Преобразование строки в число
        }),
      });
  
      if (response.ok) {
        console.log('Заказ успешно создан');
      } else {
        console.error('Ошибка при добавлении в заказы');
      }
    } catch (error) {
      console.error('Ошибка при добавлении в заказы:', error);
    }
  };
  
  const handleScrollLeft = () => {
    favoriteItemsRef.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const handleScrollRight = () => {
    favoriteItemsRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  return (
    <div className="favorite-container">
      <h2 className="favorite-title">Ваши любимые товары</h2>
      <div className="scroll-buttons">
        <button className="scroll-button left" onClick={handleScrollLeft}>
          ←
        </button>
        <button className="scroll-button right" onClick={handleScrollRight}>
          →
        </button>
      </div>
      <div ref={favoriteItemsRef} className="favorite-items">
        {burgers.map((burger) => (
          <div key={burger.id} className="favorite-item">
            <img src={burger.image} alt={burger.name} className="burger-image" />
            <div className="favorite-info">
              <h3>
                {burger.name}
                <div className="icons">
                  <img
                    src={HeartIcon}
                    alt="favorite"
                    className={`icon heart-icon ${favorites.includes(burger.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(burger)}
                  />
                </div>
              </h3>
              <p className="Opis">{burger.description}</p>
              <div className="price-container">
                <p className="price-p">{burger.price}</p>
                <p className="weight-p">{burger.weight}</p>
              </div>
            </div>
            <div className="icons">
              <button className="add-to-order-button" onClick={() => addToOrders(burger)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;