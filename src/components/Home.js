import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Catalog from '../components/Catalog';
import Menu from '../components/Menu'; 
import './Home.css';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Ошибка при парсинге данных пользователя:', error);
            }
        } else {
            console.log('Данные пользователя не найдены или undefined');
        }
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="home-container">
            {user && (
                <Header 
                    firstName={user.firstName} 
                    lastName={user.lastName} 
                    profilePhoto={`http://localhost:5000/${user.profilePhoto}`} 
                />
            )}
            <Catalog onCategoryChange={handleCategoryChange} />
            <Menu selectedCategory={selectedCategory} />
            <Footer /> 
        </div>
    );
};

export default Home;
