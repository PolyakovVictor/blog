import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import './style/profile.css';
import { IUserData } from './models';
import axios from 'axios';
import Footer from './components/footer';

const ProfilePage: React.FC = () => {
    const [key, setKey] = useState('favoritePins');
    const [userData, setUserData] = useState<IUserData>();
    const [userImageUrl, setUserImageUrl] = useState<string>();
    const auth_token = localStorage.getItem('auth_token');

    const user = {
        avatar: 'https://i.pinimg.com/236x/01/0c/75/010c75349d254794e63ef494f0444c00.jpg',
        username: 'username',
        favoritePins: ['https://i.pinimg.com/236x/4f/a2/09/4fa209222f83ed4fdff719e9041115a9.jpg', 'https://i.pinimg.com/236x/1b/d8/8c/1bd88c681912b46b6ef901e933273afb.jpg'],
        userPins: ['https://i.pinimg.com/236x/82/13/30/82133074ea1ea8156a93c4adbf6850bd.jpg', 'https://i.pinimg.com/236x/35/19/ca/3519cae0b007fcd6a6664b75fbe499d8.jpg', 'https://i.pinimg.com/236x/66/85/c9/6685c9073ab8739cd73909de349acf8b.jpg'],
      };
      

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/auth/users/me/', {
              headers: {
                Authorization: `Token ${auth_token}`
              }
            });
            
            setUserData(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };

        const fetchUserImage = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/profile_image/', {
              headers: {
                Authorization: `Token ${auth_token}`
              }
            });
            
            setUserImageUrl(response.data.profile_image);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        
        fetchUserImage();
        fetchUserData();
      }, []);


      const handleEditProfile = () => {
        // Logic to handle pressing the 'Edit Profile' button
        // For example, opening a modal window to edit a profile
      };
  if (userData){
    return (
      <div>
        <Helmet>
          <html lang="en" data-bs-theme="dark"></html>
        </Helmet>
        <Navbar/>
        <div className="container mt-4">
        <div className="text-center">
          <div className="avatar-container">
            <img src={userImageUrl} alt="Аватар" className="avatar" />
          </div>
          <h2>{userData.username}</h2>
          <button className="btn btn-primary" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
        <div className="mt-4">
          <Tabs activeKey={key} onSelect={(k) => setKey(k as string)}>
            <Tab eventKey="favoritePins" title="Favorite">
              <div className="row">
                {user.favoritePins.map((pin, index) => (
                  <div className="col-md-4 pt-3" key={index}>
                    <img src={pin} alt={`Favorite ${index + 1}`} className="img-fluid rounded-4" />
                  </div>
                ))}
              </div>
            </Tab>
            <Tab eventKey="userPins" title="User posts">
              <div className="row">
                {user.userPins.map((pin, index) => (
                  <div className="col-md-4 pt-3" key={index}>
                    <img src={pin} alt={`User posts${index + 1}`} className="img-fluid rounded-4" />
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      </div>
    );
  } else {
    return (
        <div>
            <Helmet>
            <html lang="en" data-bs-theme="dark"></html>
            </Helmet>
            <Navbar />
            <h4>Loading...</h4>
            <Footer/>
        </div>
    );
  }
};

export default ProfilePage;
