import axios from 'axios';
import '../style/navbar.css';
import { Helmet } from "react-helmet";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IUserData } from "../models"

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const auth_token = localStorage.getItem('auth_token');
  const [userData, setUserData] = useState<IUserData>()
  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:8000/auth/token/logout/",
      {},
      {
        headers: {
          Authorization: `Token ${auth_token}`,
        },
      }
    );

    if (response.status === 204) {
      localStorage.removeItem('auth_token');
      navigate('/');
    } else {
      console.log('Logout failed', response)
    }
  }


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

    fetchUserData();
  }, []);

  if (auth_token && userData){
    return (
      <header>
        <Helmet>
          <meta name="description" content="Описание страницы" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"></link>
        </Helmet>
        <div className="collapse text-bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">

                <div className="col-sm-8 col-md-auto pt-5">
                  <div className="card">
                    <Link to="/profile" className="navbar-brand d-flex align-items-center">
                      <div className="d-flex justify-content-start">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6doYkFa5roepE3s3molnp-2k9-C1ceaHZgw&usqp=CAU" className="card-img-top rounded-circle mt-2 ml-2 mb-2" style={{ width: '5rem', height: '5rem' }} alt="Avatar" />
                          <div className="card-body d-inline-block">
                              <h6 className="card-title text-align-center">{userData.username}</h6>
                          </div>
                      </div>
                    </Link>
                  </div>
                </div>

              <div className="col-sm-4 offset-md-3 py-4">
                <h4>Contact</h4>
                <ul className="list-unstyled">
                  <li><a href="https://getbootstrap.com/docs/5.3/examples/album/#" className="text-white">Follow on Twitter</a></li>
                  <li><a href="https://getbootstrap.com/docs/5.3/examples/album/#" className="text-white">Like on Facebook</a></li>
                  <li><a href="https://getbootstrap.com/docs/5.3/examples/album/#" className="text-white">Email me</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-signpost-split" viewBox="0 0 16 16">
                  <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7h5zm1 3V8H2l-.75 1L2 10h6zm0-5h6l.75-1L14 3H8v2z"/>
                </svg>
                <strong className='px-1'>Blog</strong>
            </Link>
            <div className='flex item-center'>
              <Link to="/blog" className='text-decoration-none flex mr-3'>
                <button className="navbar-toggler" type="button" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                  Gallery
                </button>
              </Link>
              <Link to="/daily-challenge" className='text-decoration-none flex mr-3'>
                <button className="navbar-toggler" type="button" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                  Daily
                </button>
              </Link>
              <div className="navbar-toggler dropdown mr-5">
                <button className="dropdown-toggle text-center lh-base" type="button" data-bs-toggle="dropdown" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                  Create
                </button>
                <ul className="dropdown-menu">
                  <Link to="/create-post"><li><a className="dropdown-item" href="#">Post</a></li></Link>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>

              <h4 className='mr-2 ml-2 mt-2'>Log</h4>
              <button className="navbar-toggler" type="button" onClick={handleLogout} aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                Out
              </button>
              <button className="navbar-toggler ml-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <Helmet>
          <meta name="description" content="Описание страницы" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"></link>
        </Helmet>
        <div className="collapse text-bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4>About</h4>
                <p className="text-body-secondary">Discover, Learn, and Share - Your Ultimate Blogging Hub! Dive into a world of captivating stories, insightful articles, and valuable knowledge. Join our vibrant community of writers and readers. Welcome to the Blogiverse!</p>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4>Contact</h4>
                <ul className="list-unstyled">
                  <li><a href="https://getbootstrap.com/docs/5.3/examples/album/#" className="text-white">Follow on Twitter</a></li>
                  <li><a href="https://getbootstrap.com/docs/5.3/examples/album/#" className="text-white">Like on Facebook</a></li>
                  <li><a href="https://getbootstrap.com/docs/5.3/examples/album/#" className="text-white">Email me</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-signpost-split" viewBox="0 0 16 16">
                  <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7h5zm1 3V8H2l-.75 1L2 10h6zm0-5h6l.75-1L14 3H8v2z"/>
                </svg>
                <strong className='px-1'>Blog</strong>
            </Link>
            <div className='flex item-center'>
              <Link to="/blog" className='text-decoration-none flex mr-3'>
                <button className="navbar-toggler" type="button" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                  Gallery
                </button>
              </Link>
              <Link to="/daily-challenge" className='text-decoration-none flex mr-3'>
                <button className="navbar-toggler" type="button" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                  Daily
                </button>
              </Link>
              <h4 className='mr-2 ml-2 mt-2 border-left'>Log</h4>
              <Link to="/auth" className='text-decoration-none flex'>
                <button className="navbar-toggler" type="button" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                  In
                </button>
              </Link>
              <Link to="/register" className='text-decoration-none flex'>
                <button className="navbar-toggler" type="button">
                  Up
                </button>
              </Link>
              <button className="navbar-toggler ml-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

export default Navbar;