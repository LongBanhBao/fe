import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [showSearchAlgo, setShowSearchAlgo] = useState(false);
  const [showSortAlgo, setShowSortAlgo] = useState(false);
  const [showAlgoMenu, setShowAlgoMenu] = useState(false);

  const searchAlgorithms = [
    { name: 'Tìm kiếm tuần tự', path: '/tktt' },
    { name: 'Tìm kiếm nhị phân', path: '/tknp' }
  ];

  const sortAlgorithms = [
    { name: 'Sắp xếp chọn', path: '/sx-chon' },
    { name: 'Sắp xếp chèn', path: '/sx-chen' },
    { name: 'Sắp xếp nổi bọt', path: '/sx-noi-bot' }
  ];

  const commonLinkStyles = "flex items-center px-6 py-4 text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200";

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left side navigation */}
          <div className="flex space-x-8">
            {/* Trang chủ */}
            <Link to="/" className={commonLinkStyles}>
              Trang chủ
            </Link>

            {/* Thuật toán dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowAlgoMenu(true)}
              onMouseLeave={() => setShowAlgoMenu(false)}
            >
              <button className={`${commonLinkStyles} w-full h-full text-left`}>
                Thuật toán
              </button>

              {/* First level dropdown */}
              {showAlgoMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {/* Thuật toán tìm kiếm */}
                  <div
                    className="relative"
                    onMouseEnter={() => setShowSearchAlgo(true)}
                    onMouseLeave={() => setShowSearchAlgo(false)}
                  >
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Thuật toán tìm kiếm
                    </button>

                    {/* Search algorithms dropdown */}
                    {showSearchAlgo && (
                      <div className="absolute left-full top-0 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                        {searchAlgorithms.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thuật toán sắp xếp */}
                  <div
                    className="relative"
                    onMouseEnter={() => setShowSortAlgo(true)}
                    onMouseLeave={() => setShowSortAlgo(false)}
                  >
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Thuật toán sắp xếp
                    </button>

                    {/* Sort algorithms dropdown */}
                    {showSortAlgo && (
                      <div className="absolute left-full top-0 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                        {sortAlgorithms.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bài tập */}
            <Link to="/coder" className={commonLinkStyles}>
              Bài tập
            </Link>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            {/* Avatar circle */}
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">A</span>
            </div>
            
            {/* Auth links */}
            <Link to="/login" className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Đăng nhập
            </Link>
            <Link to="/register" className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;