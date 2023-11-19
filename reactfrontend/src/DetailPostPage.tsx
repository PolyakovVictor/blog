import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Comment from './components/comment';
import {SamePost} from './components/samePost';
import './style/detailPostPage.css';
import { Helmet } from 'react-helmet';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { IComment, ITagItem } from './models';


const DetailPostPage = () => {
    const { post_id } = useParams<{ post_id: string }>();
    const [post, setPost] = useState<any>(null);
    const [same_posts, setSamePosts] = useState([]);
    const [comment_text, setComment_text] = useState('');
    const token = localStorage.getItem('auth_token')

    const fetchPost = async (page_id: any) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/post/${page_id}/`);
            setPost(response.data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const fetchSamePosts = async (category_id: any) => {
        try {
            const countResponse = await axios.get(`http://localhost:8000/api/post/by_category/${category_id}/?page=1`);
            const totalCount = countResponse.data.count;

            const postsPerPage = 9;
            const totalPages = Math.ceil(totalCount / postsPerPage);

            const randomPage = Math.floor(Math.random() * totalPages) + 1;

            const response = await axios.get(`http://localhost:8000/api/post/by_category/${category_id}/?page=${randomPage}`);
            setSamePosts(response.data.results);
        } catch (error) {
            console.error('Error loading data:', error);
        }
      };

    useEffect(() => {
        fetchPost(post_id);
    }, [post_id]);

    useEffect(() => {
        if (post && post.category.id) {
            fetchSamePosts(post.category.id);
        }
    }, [post]);


    const handleSubmit = async (event : any) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`,
                },
                body: JSON.stringify({ content: comment_text, post: post_id }),
            });
            if (response.ok) {
                window.location.reload();
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log('Error: added comments ', error)
        }
    };

    const handleTextChange = (event : any) => {
        setComment_text(event.target.value);
    };
  
    if (post && same_posts) {
    return (
        <div>
            <Helmet>
            <html lang="en" data-bs-theme="dark"></html>
            </Helmet>
            <Navbar />
            <section className="vh-adjusted-section album bg-body-tertiary pt-5">
            <div className="container">

                <div className="row">

                    <div className="col-md-8 mb-4">

                    <section className="border-bottom mb-4">
                        <img src={post.image}
                        className="img-fluid shadow-2-strong rounded-2 mb-4 main-image" alt="" />

                        <div className="row align-items-center mb-4">
                            <div className="col-lg-6 text-center text-lg-start mb-3 m-lg-0">
                                <div className="d-inline-flex align-items-center">
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img (23).jpg" className="user-image rounded-5 shadow-1-strong me-2"
                                    alt="" loading="lazy" />
                                    <span>{post.title} Published <u>15.07.2020</u> by</span>
                                    <a href="" className="ms-2">{post.author.username}</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='border-bottom pb-4'>

                        {post.tags.map((tag: ITagItem) => (
                            <Link to={`/post-by-tag/${tag.id}`}>
                                <span key={tag.id} className="badge text-bg-dark fs-6 p-3 mr-2">{tag.name}</span>
                            </Link>
                        ))}

                    </section>

                    <section className='pt-2'>
                        <p><strong>Description</strong></p>
                        <p>{post.description}</p>

                    </section>




                    <section className="border-bottom border-top py-4 mb-3 pl-3 pr-3">
                        <p className="text-center"><strong>Comments</strong></p>

                        {post.comments.map((comment : IComment) => (
                            <Comment comment={comment} key={comment.id} />
                        ))}

                    </section>



                    <section>
                        <p className="text-center"><strong>Leave a reply</strong></p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <textarea className="form-control" id="form4Example3" onChange={handleTextChange}></textarea>
                                <label className="form-label">Text</label>
                            </div>


                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                Publish
                            </button>
                        </form>
                    </section>

                    </div>



                    <div className="col-md-4 mb-4">

                    <section className="sticky-top">

                        <section className="text-center">
                            <h5 className="mb-4">Category {post.category.name}</h5>
                        </section>

                        <section className="text-center border-bottom pb-4 mb-4">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
                                {same_posts.map((output, id) => (
                                    <SamePost key={id} product={output} />
                                ))}
                            </div>
                        </section>

                    </section>
                    </div>
                </div>
                </div>
            </section>
            <Footer/>
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
}

export default DetailPostPage;