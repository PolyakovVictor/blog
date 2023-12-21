import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import './style/profile.css';
import { IUserData, State } from './models';
import axios from 'axios';
import Footer from './components/footer';
import UploadProfileImageModal from './components/uploadProfileImageModal';
import ReactPaginate from 'react-paginate';

const ProfilePage: React.FC = () => {
    const [key, setKey] = useState('favoritePins');
    const [userData, setUserData] = useState<IUserData>();
    const [userImageUrl, setUserImageUrl] = useState<string>();
    const [showModal, setShowModal] = useState(false);
    const [api_link, setApi_link] = useState('http://localhost:8000/api/post/favorite_posts_list_by_user/?page=')
    const auth_token = localStorage.getItem('auth_token');

    // const [posts, setPosts] = useState([]);
    // const [currentPage, setCurrentPage] = useState();
    // const [totalPages, setTotalPages] = useState();

    const [state, setState] = useState<State>({
      posts: [],
      currentPage: 1,
      totalPages: 1,
    });

    useEffect(() => {
      if (api_link) {
        fetchPosts(state.currentPage);
      }
    }, [api_link, state.currentPage]);
  
    const handleTabSelect = (selectedKey: string | null): void => {
      let newApiLink = api_link;
      if (selectedKey === 'favoritePins') {
        newApiLink = 'http://localhost:8000/api/post/favorite_posts_list_by_user/?page=';
      } else if (selectedKey === 'userPins') {
        newApiLink = 'http://localhost:8000/api/post/user_posts_list_view/?page=';
      }
      setKey(selectedKey as string);
      setApi_link(newApiLink);
      setState((prevState: State) => ({
        ...prevState,
        currentPage: 1,
      }));
    };
    
    
    

    const fetchPosts = async (page: number): Promise<void> => {
      try {
        const response = await axios.get(`${api_link}${page}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${auth_token}`,
        },
        });
        setState((prevState: State) => ({
          ...prevState,
          posts: response.data.results,
          totalPages: response.data.count,
        }));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
  
    useEffect(() => {
      fetchPosts(state.currentPage, );
    }, []);
  
    const handlePageChange = ({ selected }: { selected: number }): void => {
      const newPage = selected + 1;
      setState((prevState: State) => {
        const newState = {
          ...prevState,
          currentPage: newPage,
        };
        fetchPosts(newPage);
        return newState;
      });
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/users/me/', {
          headers: {
            Authorization: `Token ${auth_token}`
          }
        });
        
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserImage = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile_image/', {
          headers: {
            Authorization: `Token ${auth_token}`
          }
        });
        
        setUserImageUrl(response.data.profile_image);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const user = {
        avatar: 'https://i.pinimg.com/236x/01/0c/75/010c75349d254794e63ef494f0444c00.jpg',
        username: 'username',
        favoritePins: ['https://i.pinimg.com/236x/4f/a2/09/4fa209222f83ed4fdff719e9041115a9.jpg', 'https://i.pinimg.com/236x/1b/d8/8c/1bd88c681912b46b6ef901e933273afb.jpg'],
        userPins: ['https://i.pinimg.com/236x/82/13/30/82133074ea1ea8156a93c4adbf6850bd.jpg', 'https://i.pinimg.com/236x/35/19/ca/3519cae0b007fcd6a6664b75fbe499d8.jpg', 'https://i.pinimg.com/236x/66/85/c9/6685c9073ab8739cd73909de349acf8b.jpg'],
    };
      

    useEffect(() => {        
      fetchUserImage();
      fetchUserData();
    }, []);


    const handleModalClose = () => {
      setShowModal(false);
    };

    const handleModalShow = () => {
        setShowModal(true);
    };

  if (userData){
    return (
      <div>
        <Helmet>
          <html lang="en" data-bs-theme="dark"></html>
        </Helmet>
        <Navbar/>
        <div className="container mt-4">
        <div className="text-center">
          <div className="avatar-container">
            <img src={userImageUrl} alt="Аватар" className="avatar" style={{ width: '10rem', height: '10rem' }} />
          </div>
          <h2>{userData.username}</h2>
          <div>
            <button className="btn btn-primary" onClick={handleModalShow}>
              Upload image
            </button>
            <UploadProfileImageModal show={showModal} handleClose={handleModalClose} />
          </div>
        </div>
        <div className="mt-4">
        <Tabs activeKey={key} onSelect={(k) => handleTabSelect(k as string)}>
            <Tab eventKey="favoritePins" title="Favorite">
              <div className="row">
                {state.posts.map((output, id) => (
                  <div className="col-md-4 pt-3" key={id}>
                    <img src={output.image} alt={`Favorite ${id + 1}`} className="img-fluid rounded-4" />
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center mt-3">
                  <ReactPaginate
                  pageCount={Math.ceil(state.totalPages / 10)}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageChange}
                  containerClassName={'pagination'}
                  activeClassName='page-item active'
                  breakClassName='page-item'
                  nextClassName='page-item'
                  disabledClassName='page-item disabled '
                  pageClassName='page-item'
                  previousClassName='page-item'
                  previousLinkClassName='page-link'
                  activeLinkClassName='page-link'
                  pageLinkClassName='page-link'
                  nextLinkClassName='page-link'
                />
              </div>
            </Tab>
            <Tab eventKey="userPins" title="User posts">
              <div className="row">
                  {state.posts.map((output, id) => (
                    <div className="col-md-4 pt-3" key={id}>
                      <img src={output.image} alt={`Favorite ${id + 1}`} className="img-fluid rounded-4" />
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <ReactPaginate
                    pageCount={Math.ceil(state.totalPages / 10)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName='page-item active'
                    breakClassName='page-item'
                    nextClassName='page-item'
                    disabledClassName='page-item disabled '
                    pageClassName='page-item'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    activeLinkClassName='page-link'
                    pageLinkClassName='page-link'
                    nextLinkClassName='page-link'
                  />
                </div>
            </Tab>
          </Tabs>
        </div>
      </div>
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
};

export default ProfilePage;
