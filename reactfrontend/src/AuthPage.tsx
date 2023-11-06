import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { Helmet } from 'react-helmet';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


const AuthPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      axios.post('http://localhost:8000/auth/token/login/', { username, password })
      .then((response) => {
        const token = response.data.auth_token;
        localStorage.setItem('auth_token', token);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error: incorrect username or password', error);
      });
    };
  
    return (
        <div>
            <Helmet>
            <html lang="en" data-bs-theme="dark"></html>
            </Helmet>
            <Navbar />
            <section className="vh-adjusted-section album bg-body-tertiary h-[calc(100vh-209px)]">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div className="card">
                            <div className="card-body-auth card-body p-5">
                            <h2 className="text-auth-logo text-auth text-center mb-5">Login</h2>

                            <form onSubmit={handleSubmit}>
                                <h1 className="h3 mb-3 fw-normal">Enter your e-mail and password</h1>

                                <div className="form-floating">
                                <input type="username" className="form-control" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                                <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <div className="form-check text-start my-3">
                                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Remember me
                                </label>
                                </div>
                                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                                <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
                            </form>

                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
  };

export default AuthPage;