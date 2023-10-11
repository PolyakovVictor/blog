import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl pt-5">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the home page!</h1>
      <Link to="/blog" className="text-blue-500 hover:underline">
        Go to blog
      </Link>
    </div>
  );
};

export default HomePage;