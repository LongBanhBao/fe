import React, { useState } from 'react';
import './UpdateProfile.css';

const UpdateProfile: React.FC = () => {
  // State để lưu trữ thông tin người dùng
  const [userInfo, setUserInfo] = useState({
    studentId: '',
    fullName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    phone: '',
    gender: ''
  });

  // Hàm xử lý khi input thay đổi
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="update-profile-wrapper">
      <div className="update-profile-container">
        {/* Avatar section */}
        <div className="avatar-section">
          <div className="avatar-circle">
            <span className="avatar-text">Avatar</span>
          </div>
        </div>

        {/* Form section */}
        <div className="form-section">
          <div className="form-header">
            Thông tin sinh viên
          </div>
          
          <div className="form-content">
            <div className="form-group">
              <label>Mã sinh viên:</label>
              <input 
                type="text" 
                name="studentId"
                value={userInfo.studentId}
                onChange={handleInputChange}
                placeholder="47.01.103.***"
              />
            </div>

            <div className="form-group">
              <label>Họ tên:</label>
              <input 
                type="text" 
                name="fullName"
                value={userInfo.fullName}
                onChange={handleInputChange}
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="form-group">
              <label>Ngày sinh:</label>
              <input 
                type="date" 
                name="dateOfBirth"
                value={userInfo.dateOfBirth}
                onChange={handleInputChange}
                placeholder="dd/mm/yy"
              />
            </div>

            <div className="form-group">
              <label>Nơi sinh:</label>
              <input 
                type="text" 
                name="placeOfBirth"
                value={userInfo.placeOfBirth}
                onChange={handleInputChange}
                placeholder="TP HCM"
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại:</label>
              <input 
                type="tel" 
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                placeholder="0**********"
              />
            </div>

            <div className="form-group">
              <label>Giới tính:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="gender"
                    value="Nam"
                    checked={userInfo.gender === "Nam"}
                    onChange={handleInputChange}
                  />
                  <span>Nam</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="gender"
                    value="Nữ"
                    checked={userInfo.gender === "Nữ"}
                    onChange={handleInputChange}
                  />
                  <span>Nữ</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="gender"
                    value="Khác"
                    checked={userInfo.gender === "Khác"}
                    onChange={handleInputChange}
                  />
                  <span>Khác</span>
                </label>
              </div>
            </div>

            <button className="update-button">
              Cập nhật thông tin cá nhân
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
