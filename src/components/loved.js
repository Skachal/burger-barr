import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loved.css';
import Footer from '../components/Footer';
import Back from '../components/Back';

const Loved = () => {
  const [lovedItems, setLovedItems] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))?._id; // Получаем userId из localStorage

  const fetchLovedItems = async () => {
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
      setLovedItems(data);
    } catch (error) {
      console.error('Ошибка при загрузке избранных элементов:', error);
    }
  };
  const toggleLovedItem = async (itemId) => {
    if (!userId) {
      console.error('Необходимо войти в систему');
      return;
    }
  
    try {
      // Удаляем элемент из избранного по userId и itemId
      const response = await fetch(`http://localhost:5000/favorites/${userId}/${itemId.toString()}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setLovedItems((prevItems) => prevItems.filter((item) => item.itemId !== itemId));
      } else {
        console.error('Ошибка при удалении из избранного');
      }
    } catch (error) {
      console.error('Ошибка соединения с сервером:', error);
    }
  };
  


  useEffect(() => {
    fetchLovedItems();
  }, [userId]);

  const navigate = useNavigate();

  return (
    <div className="loved-container">
      <Back />
      <div className="loved-header">
        <h2 className="loved-title">Любимое</h2>
      </div>
      <div className="loved-items">
        {lovedItems.map((item) => (
          <div key={item.itemId} className="loved-item">
            <div className="item-im"> <img src={item.image} alt={item.name} className="item-image" /></div>
            <div className="loved-item-details">
              <div className="loved-ax">
                <h2 className="loved-h2">{item.name}</h2>
                <button
                  className={`heart-icon ${lovedItems.some((loved) => loved.itemId === item.itemId) ? 'active' : ''}`}
                  onClick={() => toggleLovedItem(item.itemId)}
                >
                  ❤️
                </button>
              </div>
              <p className="loved-p">{item.description}</p>
              <div className='muni'>
                <p className="loved-item-price">{item.price}</p>
                <div className="loved-krug"><p className="loved-item-weight">{item.weight}</p></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Loved;
