import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { Helmet } from 'react-helmet';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      axios.post('http://localhost:8000/auth/users/', { email, username, password })
          .then((response) => {
            console.log(response);
            navigate('/auth/');
          })
          .catch((error) => {
            console.error('Ошибка авторизации', error);
          });
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Password2:', password2);
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
                            <h2 className="text-auth-logo text-auth text-center mb-5">Registration</h2>

                            <form onSubmit={handleSubmit}>
                                <h1 className="h3 mb-3 fw-normal">Sign in to continue</h1>
                                
                                <div className="form-floating">
                                    <input type="username" className="form-control" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="password2" placeholder="Password" onChange={(e) => setPassword2(e.target.value)}/>
                                    <label htmlFor="floatingPassword">Repeat password</label>
                                </div>

                                <div className="form-check text-start my-3">
                                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Remember me
                                    </label>
                                </div>
                                <button className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
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

export default RegisterPage;