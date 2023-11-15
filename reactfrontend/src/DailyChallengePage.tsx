import React, { Component } from 'react';
import axios from 'axios';
import './style/blogpage.css';
import { Post } from './components/post';
import Navbar from './components/navbar';
import Footer from './components/footer';
import TagsBar from './components/tagsBar';
import "bootstrap/dist/js/bootstrap.min.js";
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';

class DailyChallengePage extends Component {
  state = {
    posts: [],
    currentPage: 1,
    totalPages: 1,
    tags: [],
  }

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
    this.fetchTags();
  }

  handlePageChange = ({ selected }: { selected : number }) => {
    const newPage = selected + 1;
    this.setState({ currentPage: newPage }, () => {
      this.fetchPosts(this.state.currentPage);
    });
  };

  fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tag/');
      const tags = response.data;
      this.setState({tags: tags});
      console.log(tags)
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  render() {
    return (
      <div>
        <Helmet>
          <html lang="en" data-bs-theme="dark"></html>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"></link>
        </Helmet>
        <Navbar />
        <div className="album bg-body-tertiary div-content py-4">
              {this.state.tags ? (
                  <TagsBar tags={this.state.tags}/>
              ) : (
                <p>Loading...</p>
              )}
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
  }
}

export default DailyChallengePage;