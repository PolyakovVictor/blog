import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage';
import HomePage from './HomePage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/blog" element={<BlogPage/ >} />
            <Route path="/" element={<HomePage/ >} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;