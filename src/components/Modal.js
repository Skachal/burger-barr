import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ item, onClose, addItemToCart }) => {
  // Используем безопасное значение по умолчанию для quantity
  const [quantity, setQuantity] = useState(item?.quantity || 1);

  if (!item) return null;

  const userId = JSON.parse(localStorage.getItem('user'))?._id;
  const handleAddToCart = async () => {
    if (!userId) {
      console.error('Необходимо войти в систему');
      return;
    }
  
    // Проверяем наличие всех необходимых полей
    if (!item.id || !item.name || !item.price || !item.weight || !quantity) {
      console.error('Все поля обязательны');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          itemId: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          weight: item.weight,
          image: item.image,
          quantity,
        }),
      });
  
      if (response.ok) {
        addItemToCart({ ...item, quantity });
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Ошибка при добавлении в корзину:', errorData.message || response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
    }
  };
  
  

  // Увеличение количества
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Уменьшение количества, но не меньше 1
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{item.name}</h2>
        <img src={item.image} alt={item.name} className="modal-image" />
        <p className="modal-description">{item.description}</p>
        <div className="modal-details">
          <div className="modal-krug"><span className="modal-weight">{item.weight}</span></div>
          <span className="modal-price">{item.price}</span>
          <div className="modal-quantity">
            <button className="modal-quantity-button-mn" onClick={decreaseQuantity}>-</button>
            <span className="modal-quantity-value">{quantity}</span>
            <button className="modal-quantity-button-pl" onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <button className="za-button" onClick={handleAddToCart}>
          Добавить в корзину
        </button>
        <button className="za-button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;
