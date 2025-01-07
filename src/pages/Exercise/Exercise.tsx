import axios from "axios";
import React from "react";
import Markdown from "react-markdown";
import CodeEditor from "../../components/CodeEditor";
import { runPythonCode } from "../../utils/runPythonCode";
import "./Exercise.css";
const testCase = [
  {
    id: "1",
    input: `3 2 1`,
    output: `[1, 2, 3]`,
  },
  {
    id: "2",
    input: `3 1 2`,
    output: `[1, 2, 3]`,
  },
];

const sampleCode = `
# Nhập mảng dưới dạng một dòng số cách nhau bởi dấu cách
arr = list(map(int, input().split()))
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Thay dấu để test arr[j] < key
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
print(insertion_sort(arr))
`;

const mistralAPI = axios.create({
  baseURL: "https://api.mistral.ai/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_MISTRAL_API_KEY,
  },
});

const Exercise: React.FC = () => {
  const [runTestCases, setRunTestCases] = React.useState<
    Array<{ id: string; result: string; output: string; input: string }>
  >(testCase.map((tc) => ({ ...tc, result: "" })));
  const [aiReview, setAIReview] = React.useState<string>("");
  const handleAiReview = async (code: string) => {
    const response = await mistralAPI.post("/chat/completions", {
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content: 
          `
          Answer language: Vietnamese
          Programming language: Python
          Your task is to check whether the user program is the program of the sample algorithm on ${sampleCode} or not:
            - If the user program is an algorithm and different from the algorithm of ${sampleCode}, display the message: "you have not implemented the algorithm that the problem requires".
            - If the user program is not an algorithm, display the message: "the program is not an algorithm, please implement the algorithm of the problem correctly".
            - Avoid giving complete programs. If the user program is wrong, point out the specific error in the user program and give instructions to correct that program.
            - Compare the user program with the sample program ${sampleCode} and point out the correct error that needs to be corrected.
            - Check the print function to make sure the output is the same as the sample output. If it is not the same as the sample output, display the message: "Incorrect output, please perform the correct algorithm of the problem".
          `,
        },
        {
          role: "user",
          content: code,
        },
      ],
    });
    setAIReview(response.data.choices[0].message.content);
  };
  const handleRunCode = async (code: string) => {
    setRunTestCases(testCase.map((tc) => ({ ...tc, result: "" })));
    setAIReview("");
    const results = await Promise.all(
      testCase.map(async (tc) => {
        const result = await runPythonCode(code, tc.input);
        if (result.code === 1) {
          return { ...tc, result: result.stderr };
        }
        return { ...tc, result: result.stdout };
      })
    );
    setRunTestCases(results);

    const is = results.every((r) => r.result.trim() === r.output);
    if (!is){
      alert("Chưa qua hết test case")
      handleAiReview(code);
    }
    if (is) alert("Đã qua hết test case");
  };
  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <div className="exercise-info">
          <p>
            <strong>Mã bài:</strong> 123456
          </p>
          <p>
            <strong>Tên bài:</strong> Tên bài tập
          </p>
          <p>
            <strong>Tác giả:</strong> Tác giả
          </p>
          <p>
            <strong>Thể loại:</strong> Thể loại
          </p>
        </div>
        <div className="exercise-content">
          <div className="exercise-description">
            Đề bài: viết thuật toán sx chèn
          </div>
          <div className="exercise-io">
            <div className="exercise-input">input: 3 2 1</div>
            <div className="exercise-output">output: [1,2,3]</div>
          </div>
        </div>
      </div>
      <CodeEditor defaultCode={sampleCode} onSuccess={handleRunCode}>
        <h3>Test cases</h3>
        <div className="bg-blue-300">
          {runTestCases.map((tc, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              <pre className="">Input: {tc.input}</pre>
              <pre className="">Output mong đợi: {tc.output}</pre>
              <pre>
                Nhận được: {runTestCases.find((r) => r.id === tc.id)?.result}
              </pre>
              <pre>
                {tc.output.trim() === tc.result.trim() ? "Đúng" : "Sai"}
              </pre>
            </div>
          ))}
        </div>
      </CodeEditor>
      <Markdown>{aiReview}</Markdown>
    </div>
  );
};

export default Exercise;
