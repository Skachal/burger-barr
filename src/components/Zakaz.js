import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Zakaz.css';
import Footer from '../components/Footer';
import Back from '../components/Back';
import Modal from './Modal';

const Zakaz = () => {
  const [items, setItems] = useState([]); // Состояние для товаров в корзине
  const [selectedItem, setSelectedItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // For showing error messages
  const userId = JSON.parse(localStorage.getItem('user'))?._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      if (!userId) {
        console.error('Необходимо войти в систему');
        return;
      }
  
      try {
        // Fetch cart items
        const cartResponse = await fetch(`http://localhost:5000/cart/${userId}`);
        if (cartResponse.ok) {
          const cartData = await cartResponse.json();
          setItems(cartData);
        } else if (cartResponse.status === 404) {
          console.log('Корзина пуста');
        } else {
          console.error('Ошибка при загрузке товаров в корзине:', cartResponse.status);
        }
  
        // Fetch orders for the user
        const ordersResponse = await fetch(`http://localhost:5000/orders/${userId}`);
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setItems((prevItems) => [...prevItems, ...ordersData.flatMap(order => order.items)]);
        } else if (ordersResponse.status === 404) {
          console.log('Заказы не найдены');
        } else {
          console.error('Ошибка при загрузке заказов:', ordersResponse.status);
        }
      } catch (error) {
        console.error('Ошибка при загрузке товаров и заказов:', error);
      }
    };
  
    fetchItems();
  }, [userId]);
  const addItemToCart = async (item) => {
    if (!userId) {
      console.error('Необходимо войти в систему');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/cart/${userId}/${item.itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: item.quantity + 1,  // Увеличиваем количество
        }),
      });
  
      if (response.ok) {
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.itemId === item.itemId ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
      } else {
        const errorData = await response.json();
        console.error('Ошибка при обновлении количества товара:', errorData.message || response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при обновлении количества товара:', error);
    }
  };
  
  const removeItemFromCart = async (item) => {
    if (!userId) {
      console.error('Необходимо войти в систему');
      return;
    }
  
    if (item.quantity > 1) {
      try {
        const response = await fetch(`http://localhost:5000/cart/${userId}/${item.itemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quantity: item.quantity - 1,  // Уменьшаем количество
          }),
        });
  
        if (response.ok) {
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.itemId === item.itemId ? { ...i, quantity: i.quantity - 1 } : i
            )
          );
        } else {
          const errorData = await response.json();
          console.error('Ошибка при уменьшении количества товара:', errorData.message || response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при уменьшении количества товара:', error);
      }
    } else {
      // Если количество товара 1 и его надо уменьшить до 0, удаляем его из корзины
      try {
        const response = await fetch(`http://localhost:5000/cart/${userId}/${item.itemId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setItems((prevItems) => prevItems.filter((i) => i.itemId !== item.itemId));
        } else {
          const errorData = await response.json();
          console.error('Ошибка при удалении товара из корзины:', errorData.message || response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при удалении товара из корзины:', error);
      }
    }
  };
  
  
  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handlePayment = () => {
    // Check if there are items in the cart before proceeding
    if (items.length === 0) {
      setErrorMessage('Пожалуйста сначала выберите заказ');
      return;
    }
    
    // Reset error message and proceed to payment
    setErrorMessage('');
    navigate('/payment');
  };

  return (
    <div className="zakaz-container">
      <Back />
      <div className="zakaz-con">
        <h2 className="zakaz-title">Детали заказа</h2>

        <div className="zakaz-items">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={`${item._id}-${index}`} className="zakaz-item">
                <div className="zakaz-im"><img src={item.image} alt={item.name} className="item-image" /></div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p id="tg">₸{item.price}</p>
                </div>
                <div className="item-quantity">
                  <button
                    id="plus"
                    className="quantity-button"
                    onClick={() => addItemToCart(item)}
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    id="minus"
                    className="quantity-button"
                    onClick={() => removeItemFromCart(item)}
                  >
                    -
                  </button>
                </div>

              </div>
            ))
          ) : (
            <p className="no-orders-message">У вас пока нет заказов.</p>
          )}
        </div>
      </div>
      <div className="zakaz-summary">
          <p>
              Стоимость всех товаров <span>₸{items.reduce((total, item) => total + parseInt(item.price.replace('₸', '')) * item.quantity, 0)}</span>
          </p>
          
          <div className="pay-button-container">
              <button className="pay-button" onClick={handlePayment} disabled={items.length === 0}>Оплатить</button>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Отображение сообщения об ошибке */}
      </div>


      <Footer />

      {selectedItem && (
        <Modal item={selectedItem} onClose={handleCloseModal} addItemToCart={addItemToCart} />
      )}
    </div>
  );
};

export default Zakaz;
