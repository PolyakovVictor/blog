import React, { Component } from 'react';
import axios from 'axios';
import './style/blogpage.css';
import { Post } from './components/post';
import Navbar from './components/navbar';
import "bootstrap/dist/js/bootstrap.min.js";
import Footer from './components/footer';
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PostByTagPage = () => {
  const { tag_id } = useParams<{ tag_id: string }>();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page: number, tag_id: any) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/post/by_tag/${tag_id}/?page=${page}`);
      setPosts(response.data.results);
      setTotalPages(response.data.count);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, tag_id);
  }, [currentPage, tag_id]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Helmet>
        <html lang="en" data-bs-theme="dark"></html>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"></link>
      </Helmet>
      <Navbar />
      <div className="album bg-body-tertiary div-content py-5">
        <div className='container'>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {posts.map((output, id) => (
                  <Post key={id} product={output} />
              ))}
          </div>
          <nav className="pagination justify-content-center py-3">
            <ReactPaginate
              pageCount={Math.ceil(totalPages / 10)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName='page-item active'
              breakClassName='page-item'
              nextClassName='page-item'
              disabledClassName='page-item disabled'
              pageClassName='page-item'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              activeLinkClassName='page-link'
              pageLinkClassName='page-link'
              nextLinkClassName='page-link'
            />
          </nav>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostByTagPage;