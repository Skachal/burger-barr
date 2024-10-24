import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css'; // Ensure you have a corresponding CSS file for styling
import Footer from '../components/Footer';
import Back from '../components/Back';
import leftt from '../iconss/Left.png';
import zaka from '../iconss/bbb.png';
import one from '../iconss/ogal.png'; // Иконка для доставляемых заказов
import two from '../iconss/tgal.png'; // Иконка для доставленных заказов

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const orders = [
    {
      id: '#035912',
      status: 'delivering',
      items: 4,
      stages: [
        { status: 'Товар в пути', date: '12:20, 20 июня 2024', delivered: true },
        { status: 'Товар доставлен', date: '12:20, 20 июня 2024', delivered: false },
      ],
      date: '12:20, 20 июня 2024',
      iconColor: 'gold',
    },
    {
      id: '#035911',
      status: 'self-pickup',
      items: 3,
      stages: [{ status: 'Забран самостоятельно', date: '12:20, 20 июня 2024', delivered: true }],
      date: '12:20, 20 июня 2024',
      iconColor: 'blue',
    },
    {
      id: '#035910',
      status: 'delivered',
      items: 6,
      stages: [{ status: 'Товар доставлен', date: '12:20, 20 июня 2024', delivered: true }],
      date: '12:20, 20 июня 2024',
      iconColor: 'blue',
    },
    {
      id: '#035909',
      status: 'on-site',
      items: 2,
      stages: [{ status: 'На месте', date: '12:20, 20 июня 2024', delivered: true }],
      date: '12:20, 20 июня 2024',
      iconColor: 'blue',
    },
  ];

  const filteredOrders = selectedStatus === 'all' ? orders : orders.filter(order => order.status === selectedStatus);

  const toggleOrderDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="orders-container">
      <Back />
      <div className="orders-header">
        <h2>Мои заказы</h2>
      </div>

      <div className="orders-list">
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-info" onClick={() => toggleOrderDetails(order.id)}>
              <div className="order-header">
                <div className={`order-icon ${order.iconColor}`} ><img src={zaka} alt="izb" className="iconn" /></div>
                <div>
                  <p className="order-id">Заказ ID {order.id}</p>
                  <p>{order.items} товара - {order.status === 'delivering' ? 'Доставляется' : order.status === 'self-pickup' ? 'Забран самостоятельно' : 'Доставлено'}</p>
                </div>
              </div>
              <img src={leftt} alt="Arrow" className={`arrow-icon ${expandedOrder === order.id ? 'expanded' : ''}`} />
            </div>

            {expandedOrder === order.id && (
              <div className="order-details">
                {order.stages.map((stage, i) => (
                  <div key={i} className="order-stage">
                    <div className={`stage-icon ${stage.delivered ? 'delivered' : 'delivering'}`}>
                      <img src={stage.delivered ? two : one} alt="Stage Icon" />
                    </div>
                    <div className="stage-info">
                      <p>{stage.status}</p>
                      <p>{stage.date}</p>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
