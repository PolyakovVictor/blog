import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage';
import HomePage from './HomePage';
import AuthPage from './AuthPage';
import RegisterPage from './RegisterPage';
import CreatePostPage from './CreatePostPage';
import DailyChallengePage from './DailyChallengePage';
import DetailPostPage from './DetailPostPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/create-post" element={<CreatePostPage/> }></Route>
            <Route path="/detail-post/:id" element={<DetailPostPage /> }></Route>
            <Route path="/daily-challenge" element={<DailyChallengePage/> }></Route>
            <Route path="/register" element={<RegisterPage/> }></Route>
            <Route path="/auth" element={<AuthPage/ >} />
            <Route path="/blog" element={<BlogPage/ >} />
            <Route path="/" element={<HomePage/ >} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;