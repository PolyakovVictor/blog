import '../style/navbar.css';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {

  return (
    <header>
      <Helmet>
        <meta name="description" content="Описание страницы" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"></link>
      </Helmet>
      <div className="collapse text-bg-dark" id="navbarHeader">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-md-7 py-4">
              <h4>About</h4>
              <p className="text-body-secondary">Discover, Learn, and Share - Your Ultimate Blogging Hub! Dive into a world of captivating stories, insightful articles, and valuable knowledge. Join our vibrant community of writers and readers. Welcome to the Blogiverse!</p>
            </div>
            <div className="col-sm-4 offset-md-1 py-4">
              <h4>Contact</h4>
              <ul className="list-unstyled">
                <li><a href="https://getbootstrap.com/docs/5.3/examples/album/#" className="text-white">Follow on Twitter</a></li>
                <li><a href="https://getbootstrap.com/docs/5.3/examples/album/#" className="text-white">Like on Facebook</a></li>
                <li><a href="https://getbootstrap.com/docs/5.3/examples/album/#" className="text-white">Email me</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-signpost-split" viewBox="0 0 16 16">
                <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7h5zm1 3V8H2l-.75 1L2 10h6zm0-5h6l.75-1L14 3H8v2z"/>
              </svg>
              <strong className='px-1'>Blog</strong>
          </Link>
          <div className='flex item-center'>
            <h4 className='mr-2 ml-2 mt-2'>Sign</h4>
            <Link to="/auth" className='text-decoration-none flex'>
              <button className="navbar-toggler" type="button" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                In
              </button>
            </Link>
            <Link to="/register" className='text-decoration-none flex'>
              <button className="navbar-toggler" type="button">
                Up
              </button>
            </Link>
            <button className="navbar-toggler ml-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;