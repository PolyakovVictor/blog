import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { Helmet } from 'react-helmet';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";


const RegisterPage = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Nickname:', nickname);
      console.log('Email:', email);
      console.log('Password1:', password1);
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
                                    <input type="nickname" className="form-control" id="nickname" placeholder="Nickname" onChange={(e) => setNickname(e.target.value)}/>
                                    <label htmlFor="floatingInput">Nickname</label>
                                </div>
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password1" className="form-control" id="password1" placeholder="Password" onChange={(e) => setPassword1(e.target.value)}/>
                                    <label htmlFor="floatingInput">Password</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password2" className="form-control" id="password2" placeholder="Password" onChange={(e) => setPassword2(e.target.value)}/>
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