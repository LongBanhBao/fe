import React, { useState } from 'react';
import './CreateExercise.css';

const CreateExercise: React.FC = () => {
  const [category, setCategory] = useState('');
  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === 'Thuật toán tìm kiếm') {
      setAlgorithms(['Tìm kiếm tuần tự', 'Tìm kiếm nhị phân']);
    } else if (selectedCategory === 'Thuật toán sắp xếp') {
      setAlgorithms(['Sắp xếp chèn', 'Sắp xếp chọn', 'Sắp xếp nổi bọt']);
    } else {
      setAlgorithms([]);
    }
  };

  const handleTestCaseChange = (index: number, field: 'input' | 'output', value: string) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const removeTestCase = () => {
    if (testCases.length > 1) {
      setTestCases(testCases.slice(0, -1));
    }
  };

  return (
    <div className="create-exercise-container">
      <div className="exercise-header">
        <div className="exercise-info">
          <label>Tên bài</label>
          <input type="text" />
          <label>Thể loại</label>
          <select value={category} onChange={handleCategoryChange}>
            <option value="" disabled hidden>
              Chọn thể loại
            </option>
            <option value="Thuật toán tìm kiếm">Thuật toán tìm kiếm</option>
            <option value="Thuật toán sắp xếp">Thuật toán sắp xếp</option>
          </select>
          <label>Thuật toán</label>
          <select>
            {algorithms.map((algo, index) => (
              <option key={index} value={algo}>
                {algo}
              </option>
            ))}
          </select>
        </div>
        <div className="exercise-content">
          <div className="exercise-description">
            <textarea />
          </div>
          <div className="exercise-io">
            <div className="exercise-input">
              <label>Input mẫu</label>
              <textarea />
            </div>
            <div className="exercise-output">
              <label>Output mẫu</label>
              <textarea />
            </div>
          </div>
        </div>
      </div>
      <h3>Các testcase</h3>
      <table className="testcase-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Input</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map((testCase, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={testCase.output}
                  onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={addTestCase}>Thêm Test case</button>
        <button onClick={removeTestCase}>Xoá Test case</button>
      </div>
    </div>
  );
};

export default CreateExercise;
