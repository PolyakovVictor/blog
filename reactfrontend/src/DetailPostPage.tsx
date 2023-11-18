import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Comment from './components/comment';
import './style/detailPostPage.css';
import { Helmet } from 'react-helmet';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { IComment, ITagItem } from './models';


const DetailPostPage = () => {
    const { post_id } = useParams<{ post_id: string }>();
    const [post, setPost] = useState<any>(null);
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

    useEffect(() => {
        fetchPost(post_id);
    }, [post_id]);

    useEffect(() => {
        console.log(post);
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
  
    if (post) {
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

                        <section className="text-center border-bottom pb-4 mb-4">
                        <div className="bg-image hover-overlay ripple mb-4">
                            <img
                            src="https://mdbootstrap.com/wp-content/themes/mdbootstrap4/content/en/_mdb5/standard/about/assets/mdb5-about.webp"
                            className="img-fluid" />
                            <a href="https://mdbootstrap.com/docs/standard/" target="_blank">
                            <div className="mask"></div>
                            </a>
                        </div>
                        <h5>Material Design for Bootstrap 5</h5>

                        <a role="button" className="btn btn-primary d-block mt-2" href="https://mdbootstrap.com/docs/standard/"
                            target="_blank">Download for free<i className="fas fa-download ms-2"></i></a>
                        </section>



                        <section className="text-center">
                        <h5 className="mb-4">Learn the newest Bootstrap 5</h5>


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