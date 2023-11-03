import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { Helmet } from 'react-helmet';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<File | null>(null);
   
    const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
   
       console.log({ title, body, category, image });
    };
  
    return (
        <div>
            <Helmet>
            <html lang="en" data-bs-theme="dark"></html>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+Knujsl5/5v4k1Jw3lEyJ/L+AxMwzL90QC0d2EyY/A+lIhQOeXwlqsUY0C0qRZrFQsPZD"></link>
            </Helmet>
            <Navbar />
            <section className="vh-adjusted-section album bg-body-tertiary h-[calc(100vh-209px)]">
                <div className='mask d-flex align-items-center h-100 gradient-custom-3'>
                    <div className='container card w-50'>
                        <form className='m-12' onSubmit={handleSubmit}>
                            <legend>Post creation form</legend>
                            <div className="form-group pb-3">
                                <label htmlFor="title">Title</label>
                                <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group pb-3">
                                <label htmlFor="body">Body</label>
                                <textarea
                                className="form-control"
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                />
                            </div>
                            <div className="form-group pb-3">
                                <label htmlFor="category">Category</label>
                                <select
                                className="form-control"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                >
                                <option value="">Choose...</option>
                                <option value="1">Category 1</option>
                                <option value="2">Category 2</option>
                                <option value="3">Category 3</option>
                                </select>
                            </div>
                            <div className="form-group pb-3">
                                <label htmlFor="image">Image</label>
                                <input
                                type="file"
                                className="form-control-file"
                                id="image"
                                onChange={(e) => setImage(e.target.files && e.target.files[0])}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Create Post
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
  };

export default CreatePostPage;