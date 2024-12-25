import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="h-16 flex items-center px-4 bg-purple-500 text-white">
      <Link to="/" className="flex items-center">
        <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mr-4">
          <span className="text-white text-2xl">M</span>
        </div>
        <h1 className="text-4xl font-bold">Kết nối tương lai</h1>
      </Link>
    </header>
  );
};

export default Header; 