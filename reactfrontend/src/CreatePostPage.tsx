import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { Helmet } from 'react-helmet';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


const CreatePostPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<any[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const token = localStorage.getItem('auth_token')

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000/', // Замініть на URL вашого DRF API
        headers: {
          'Authorization': `token ${token}`, // Додаємо токен до заголовків
          'Content-Type': 'application/json', // Можливо, знадобиться Content-Type залежно від вашого API
        },
      });

    useEffect(() => {
        axiosInstance.get('api/categories/')
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.log('Error: ', error);
        })
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(image)
        axiosInstance.post('api/post/', {title, description, category, tags, image})
        .then((response) => {
            console.log(response)
            navigate('/blog');
        })
        .catch((error) => {
            console.error('Error: Create post: ', error)
        })
    }
  
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                                {categories.map((cat) => (
                                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="form-group pb-3">
                                <label htmlFor="tags">Tags</label>
                                <input
                                type="text"
                                className="form-control"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                />
                            </div>
                            <div className="form-group pb-3">
                                <label htmlFor="image">Image</label>
                                <input
                                type="file"
                                className="form-control-file pl-1.5"
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