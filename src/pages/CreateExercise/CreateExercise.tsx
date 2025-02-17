import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateExercise.css';

const CreateExercise: React.FC = () => {
  const [category, setCategory] = useState('');
  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');
  const [inputSample, setInputSample] = useState('');
  const [outputSample, setOutputSample] = useState('');
  const [sampleCode, setSampleCode] = useState('');
  const navigate = useNavigate();

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

  const updateLineNumbers = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const lineNumbers = textarea.parentElement?.querySelector('.line-numbers');
    if (lineNumbers) {
      const lines = textarea.value.split('\n').length;
      lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    }
  };

  const handleCreateExercise = () => {
    if (!exerciseName) {
      alert('Bạn chưa nhập tên bài');
      return;
    }
    if (!category) {
      alert('Bạn chưa chọn thể loại');
      return;
    }
    if (!description) {
      alert('Bạn chưa nhập đề bài');
      return;
    }
    if (!inputSample) {
      alert('Bạn chưa nhập Input mẫu');
      return;
    }
    if (!outputSample) {
      alert('Bạn chưa nhập Output mẫu');
      return;
    }
    if (testCases.some(tc => !tc.input || !tc.output)) {
      alert('Bạn chưa nhập đầy đủ testcase');
      return;
    }
    if (!sampleCode) {
      alert('Bạn chưa nhập Code mẫu');
      return;
    }

    if (window.confirm('Bạn xác nhận tạo bài?')) {
      navigate('/list-Exercise');
    }
  };

  return (
    <div className="create-exercise-container">
      <div className="exercise-header">
        <div className="exercise-info">
          <label>Tên bài</label>
          <input type="text" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
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
            <textarea 
              placeholder="Đề bài" 
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="exercise-description">
            <div className="line-numbers"></div>
            <textarea
              placeholder="Code mẫu"
              className="description-output"
              value={sampleCode}
              onChange={(e) => setSampleCode(e.target.value)}
              onInput={updateLineNumbers}
            />
          </div>
          <div className="exercise-io">
            <div className="exercise-input">
              <label>Input mẫu:</label>
              <textarea
                placeholder="Nhập input mẫu"
                value={inputSample}
                onChange={(e) => setInputSample(e.target.value)}
              />
            </div>
            <div className="exercise-output">
              <label>Output mẫu:</label>
              <textarea
                placeholder="Nhập output mẫu"
                value={outputSample}
                onChange={(e) => setOutputSample(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="testcase-container">
        <h3>TESTCASES</h3>
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
          <button onClick={addTestCase}>Thêm Testcase</button>
          <button onClick={removeTestCase}>Xoá Testcase</button>
        </div>
      </div>
      <button onClick={handleCreateExercise}>Tạo bài</button>
    </div>
  );
};

export default CreateExercise;
