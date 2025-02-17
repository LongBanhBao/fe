import React, { useState } from 'react';
import './classroom.css';

const Classroom: React.FC = () => {
  const [members, setMembers] = useState<{ id: number; name: string }[]>([]);
  const [assignments, setAssignments] = useState<{ id: number; name: string; type: string; completed: number }[]>([]); // State để lưu trữ bài tập
  const [showMembers, setShowMembers] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false); // State để kiểm soát hiển thị bài tập
  const [showPosts, setShowPosts] = useState(true); // State để kiểm soát hiển thị bài đăng
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState<string[]>([]); // State để lưu trữ bài đăng

  const handleShowMembers = () => {
    const sampleMembers = [
      { id: 1, name: 'Nguyễn Văn A' },
      { id: 2, name: 'Trần Thị B' },
      { id: 3, name: 'Lê Văn C' },
    ];
    setMembers(sampleMembers);
    setShowMembers(true);
    setShowAssignments(false); // Ẩn bài tập khi hiển thị danh sách thành viên
    setShowPosts(false); // Ẩn bài đăng khi hiển thị danh sách thành viên
  };

  const handleShowAssignments = () => {
    const sampleAssignments = [
      { id: 1, name: 'Bài tập 1: Toán', type: 'Toán', completed: 0 },
      { id: 2, name: 'Bài tập 2: Lý', type: 'Lý', completed: 0 },
      { id: 3, name: 'Bài tập 3: Hóa', type: 'Hóa', completed: 0 },
    ];
    setAssignments(sampleAssignments);
    setShowAssignments(true);
    setShowMembers(false); // Ẩn danh sách thành viên khi hiển thị bài tập
    setShowPosts(false); // Ẩn bài đăng khi hiển thị bài tập
  };

  const handleRemoveMember = (id: number) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thành viên này?");
    if (confirmDelete) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      setPosts([...posts, postContent]); // Thêm bài đăng vào danh sách
      setPostContent(''); // Xóa nội dung trong khung chatbox
    } else {
      alert("Nội dung bài đăng không được để trống!"); // Thông báo nếu nội dung trống
    }
  };

  return (
    <div className="classroom-container">
      <div className="classroom-sidebar">
        <div className="logo">
          <div className="logo-placeholder"></div>
        </div>
        <div className="class-info">
          <p>Tên lớp:</p>
          <p>Mã lớp:</p>
          <p>Giáo viên:</p>
        </div>
        <nav className="class-nav">
          <button onClick={handleShowMembers}>Thành viên</button>
          <button onClick={handleShowAssignments}>Bài tập</button>
        </nav>
      </div>
      <div className="classroom-content">
        {showMembers && (
          <table className="members-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td style={{ position: 'relative' }}>
                    {member.name}
                    <button 
                      onClick={() => handleRemoveMember(member.id)} 
                      style={{ 
                        position: 'absolute', 
                        right: 0,
                        background: 'transparent', 
                        border: 'none', 
                        color: 'red', 
                        cursor: 'pointer' 
                      }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showAssignments && (
          <table className="assignments-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên bài</th>
                <th>Thể loại</th>
                <th>Số thành viên hoàn thành</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.id}</td>
                  <td>{assignment.name}</td>
                  <td>{assignment.type}</td>
                  <td>{assignment.completed}/{members.length}</td> {/* Hiển thị số thành viên hoàn thành */}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showPosts && (
          <div className="posts-container">
            {posts.map((post, index) => (
              <div key={index} className="post">
                {post}
              </div>
            ))}
          </div>
        )}

        {showPosts && (
          <div className="chatbox">
            <textarea 
              value={postContent} 
              onChange={(e) => setPostContent(e.target.value)} 
              placeholder="Nhập nội dung bài đăng..."
            />
            <button onClick={handlePostSubmit}>Đăng bài</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classroom;
