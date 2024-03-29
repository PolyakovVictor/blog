import React, { Component } from 'react';
import axios from 'axios';
import './style/blogpage.css';
import { Post } from './components/post';
import Navbar from './components/navbar';
import "bootstrap/dist/js/bootstrap.min.js";
import Footer from './components/footer';
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';

class BlogPage extends Component {
  state = {
    posts: [],
    currentPage: 1,
    totalPages: 1,
  }

  //function to get posts with pagination
  fetchPosts = async (page : any) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/post/?page=${page}`);
      this.setState({
        posts: response.data.results,
        totalPages: response.data.count,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  componentDidMount() {
    this.fetchPosts(this.state.currentPage);
  }

  handlePageChange = ({ selected }: { selected : number }) => {
    const newPage = selected + 1;
    this.setState({ currentPage: newPage }, () => {
      this.fetchPosts(this.state.currentPage);
    });
  };

  render() {
    console.log(this.state.posts)
    if (this.state.posts) {
      return (
        <div>
          <Helmet>
            <html lang="en" data-bs-theme="dark"></html>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"></link>
          </Helmet>
          <Navbar />
          <div className="main album bg-body-tertiary div-content py-5">
            <div className='container'>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  {this.state.posts.map((output, id) => (
                      <Post key={id} product={output} />
                  ))}
              </div>
              <nav className="pagination justify-content-center py-3">
                <ReactPaginate
                  pageCount={Math.ceil(this.state.totalPages / 10)}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  onPageChange={this.handlePageChange}
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
}

export default BlogPage;