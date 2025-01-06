import React from 'react';
import './Exercise.css';
import Coder from '../Coder/Coder';

const Exercise: React.FC = () => {
  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <div className="exercise-info">
          <p><strong>Mã bài:</strong> 123456</p>
          <p><strong>Tên bài:</strong> Tên bài tập</p>
          <p><strong>Tác giả:</strong> Tác giả</p>
          <p><strong>Thể loại:</strong> Thể loại</p>
        </div>
        <div className="exercise-content">
          <div className="exercise-description">Đề bài</div>
          <div className="exercise-io">
            <div className="exercise-input">input</div>
            <div className="exercise-output">output</div>
          </div>
        </div>
      </div>
      <Coder />
    </div>
  );
};

export default Exercise;
