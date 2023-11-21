import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import './style/profile.css';

const ProfilePage: React.FC = () => {
    const [key, setKey] = useState('favoritePins');
    const user = {
        avatar: 'ссылка_на_аватар',
        username: 'Имя_пользователя',
        favoritePins: ['ссылка_на_избранный_pin1', 'ссылка_на_избранный_pin2'],
        userPins: ['ссылка_на_pin1', 'ссылка_на_pin2', 'ссылка_на_pin3'],
      };
    
      const handleEditProfile = () => {
        // Логика для обработки нажатия кнопки 'Edit Profile'
        // Например, открытие модального окна для редактирования профиля
      };

  return (
    <div>
      <Helmet>
        <html lang="en" data-bs-theme="dark"></html>
      </Helmet>
      <Navbar/>
      <div className="container mt-4">
      <div className="text-center">
        <img src={user.avatar} alt="Аватар" className="avatar" />
        <h2>{user.username}</h2>
        <button className="btn btn-primary" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
      <div className="mt-4">
        <Tabs activeKey={key} onSelect={(k) => setKey(k as string)}> {/* Преобразуем k в строку */}
          <Tab eventKey="favoritePins" title="Избранные пины">
            <div className="row">
              {user.favoritePins.map((pin, index) => (
                <div className="col-md-4" key={index}>
                  <img src={pin} alt={`Избранный пин ${index + 1}`} className="img-fluid" />
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="userPins" title="Мои пины">
            <div className="row">
              {user.userPins.map((pin, index) => (
                <div className="col-md-4" key={index}>
                  <img src={pin} alt={`Пин пользователя ${index + 1}`} className="img-fluid" />
                </div>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;