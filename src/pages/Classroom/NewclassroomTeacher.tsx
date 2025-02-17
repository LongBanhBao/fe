import React, { useState } from 'react';
import './NewclassroomTeacher.css';

const NewClassroomTeacher: React.FC = () => {
  const [classrooms, setClassrooms] = useState<{ name: string; code: string }[]>([
    { name: 'Lớp 1', code: '123' },
    { name: 'Lớp 2', code: '456' },
  ]);
  const [showChatbox, setShowChatbox] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');

  const handleCreateClass = () => {
    if (newClassName && newClassCode) {
      setClassrooms([...classrooms, { name: newClassName, code: newClassCode }]);
      setNewClassName('');
      setNewClassCode('');
      setShowChatbox(false);
    }
  };

  return (
    <div className="new-classroom-teacher-container">
      <h2>Giáo viên: Nguyễn Văn A</h2> {/* Hiển thị họ tên giáo viên */}
      <table className="classroom-table">
        <thead>
          <tr>
            <th>Tên lớp</th>
            <th>Mã lớp</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom, index) => (
            <tr key={index}>
              <td>{classroom.name}</td>
              <td>{classroom.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="create-class-button" onClick={() => setShowChatbox(true)}>
        Tạo lớp học
      </button>

      {showChatbox && (
        <div className="chatbox">
          <h3>Tạo lớp học mới</h3>
          <input
            type="text"
            placeholder="Tên lớp"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mã lớp"
            value={newClassCode}
            onChange={(e) => setNewClassCode(e.target.value)}
          />
          <button onClick={handleCreateClass}>Xác nhận</button>
          <button onClick={() => setShowChatbox(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default NewClassroomTeacher;
