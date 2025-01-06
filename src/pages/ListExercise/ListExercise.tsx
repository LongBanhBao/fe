import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListExercise.css';

const ListExercise: React.FC = () => {
  const [category, setCategory] = useState('');
  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);
  const navigate = useNavigate();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === 'Tìm kiếm') {
      setAlgorithms(['Tìm kiếm tuần tự', 'Tìm kiếm nhị phân']);
    } else if (selectedCategory === 'Sắp xếp') {
      setAlgorithms(['Sắp xếp chèn', 'Sắp xếp chọn', 'Sắp xếp nổi bọt']);
    } else {
      setAlgorithms([]);
    }
  };

  const handleCreateExercise = () => {
    navigate('/create-exercise');
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, colIndex: number) => {
    const startX = e.clientX;
    const startWidth = (tableRef.current?.rows[0].cells[colIndex] as HTMLTableCellElement).offsetWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (tableRef.current) {
        tableRef.current.rows[0].cells[colIndex].style.width = `${newWidth}px`;
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="exercise-container">
      <div className="search-box">
        <div className="form-group">
          <label>Tên bài</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Thể loại</label>
          <select value={category} onChange={handleCategoryChange}>
            <option value="" disabled hidden>
              Chọn thể loại
            </option>
            <option value="Tìm kiếm">Tìm kiếm</option>
            <option value="Sắp xếp">Sắp xếp</option>
          </select>
        </div>
        <div className="form-group">
          <label>Thuật toán</label>
          <select>
            {algorithms.length === 0 && (
              <option value="" disabled hidden>
                Chọn thuật toán
              </option>
            )}
            {algorithms.map((algo, index) => (
              <option key={index} value={algo}>
                {algo}
              </option>
            ))}
          </select>
        </div>
        <button className="search-button">Tìm</button>
        <button className="create-button" onClick={handleCreateExercise}>
          Tạo bài tập
        </button>
      </div>

      <table className="exercise-table" ref={tableRef}>
        <thead>
          <tr>
            <th>
              STT
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 0)} />
            </th>
            <th>
              Tên bài
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 1)} />
            </th>
            <th>
              Thể loại
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 2)} />
            </th>
            <th>
              Người tạo
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 3)} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListExercise;
