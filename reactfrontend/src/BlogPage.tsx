import React from 'react';
import axios from 'axios';
import './style/blogpage.css';
import { Post } from './components/post';
import Navbar from './components/navbar';
import "bootstrap/dist/js/bootstrap.min.js";
import Footer from './components/footer';
import { Helmet } from 'react-helmet';



class BlogPage extends React.Component{
  state = { details: [], }


  componentDidMount(): void {
      let data;
      axios.get('http://localhost:8000/api/post/')
      .then(res => {data = res.data; this.setState({ details: data});})
      .catch(err => {console.log(err);})
      console.log(data)
  }
  render() {
    return (
      <div>
        <Helmet>
          <html lang="en" data-bs-theme="dark"></html>
        </Helmet>
        <Navbar />
        <div className="album bg-body-tertiary div-content py-5">
          <div className='container'>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {this.state.details.map((output, id) => (
                    <Post key={id} product={output} />
                ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default BlogPage;
