import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import TKTT from './pages/TKTT/TKTT';
import TKNP from './pages/TKNP/TKNP';
import SXChon from './pages/SXChon/SXChon';
import SXChenK from './pages/SXChenK/SXChenK';
import SXNoiBot from './pages/SXNoiBot/SXNoiBot';
import Coder from './pages/Coder/Coder';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ProfileStudent from './pages/Profile/ProfileStudent';
import ProfileTeacher from './pages/Profile/ProfileTeacher';
const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tktt" element={<TKTT />} />
          <Route path="/tknp" element={<TKNP />} />
          <Route path="/sx-chon" element={<SXChon />} />
          <Route path="/sx-chen" element={<SXChenK />} />
          <Route path="/sx-noi-bot" element={<SXNoiBot />} />
          <Route path="/coder" element={<Coder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile-student" element={<ProfileStudent />} />
          <Route path="/profile-teacher" element={<ProfileTeacher />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
