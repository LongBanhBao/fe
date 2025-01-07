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

const sampleCode2 = `
def selectionSort(array, size):
   
    for step in range(size):
        min_idx = step

        for i in range(step + 1, size):
         
            # to sort in descending order, change > to < in this line
            # select the minimum element in each loop
            if array[i] < array[min_idx]:
                min_idx = i
         
        # put min at the correct position
        (array[step], array[min_idx]) = (array[min_idx], array[step])

arr = list(map(int, input().split()))

data = arr
size = len(data)
selectionSort(data, size)
print(data)
`;

const systenPrompt = `
# Bạn là 1 chuyên gia lập trình thuật toán với Python.
# Nhiệm vụ của bạn:
## So sánh code của người dùng với code mẫu có sẵn
## Ví dụ đúng thuật toán như sai logic so với thuật toán được dùng trong code mẫu:
### Code mẫu: 
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
### Code người dùng:
  arr = list(map(int, input().split()))
  def insertion_sort(arr):
      for i in range(1, len(arr)):
          key = arr[i]
          j = i - 1
          while j >= 0 and arr[j] < key:
              arr[j + 1] = arr[j]
              j -= 1
          arr[j + 1] = key
      return arr
  print(insertion_sort(arr))
### Phản hồi cho người dùng:
  Code của bạn đúng thuật toán Insertion Sort nhưng yêu cầu là tăng dần trong khi bạn sắp xếp giảm dần. Sửa lại điều kiện a[j] < key thành a[j] > key

## Ví dụ đúng thuật toán, đúng logic:
### Code mẫu: 
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
### Code người dùng:
  lst = list(map(int, input().split()))
  def selection_sort(lst):
      n = len(lst)
      for i in range(n - 1):
          min = i
          for j in range(i + 1, n):
              if(lst[j] < lst[min]):
                  min = j
          lst[i], lst[min] = lst[min], lst[i]
  print(selection_sort(lst))
### Phản hồi cho người dùng:
  Code của bạn không đúng thuật toán Insertion Sort. Bạn đang dùng thuật toán Selection Sort. Hãy dùng Insertion Sort

# Yêu cầu:
1.Trả lời bằng Tiếng Việt.
2.Ngôn ngữ lập trình được sử dụng: Python
3.Chỉ đánh giá đúng yêu cầu, không nói thêm lan man dài dòng
`;
const userPrompt = (sampleCode: string, code: string) => `
Code mẫu có sẵn: 
${sampleCode}
Code của người dùng:
${code}
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
  const [loading, setLoading] = React.useState<boolean>(false);
  const [aiReview, setAIReview] = React.useState<string>("");
  const handleAiReview = async (code: string) => {
    setLoading(true);
    const response = await mistralAPI.post("/chat/completions", {
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content: systenPrompt,
        },
        {
          role: "user",
          content: userPrompt(sampleCode2, code),
        },
      ],
    });
    setLoading(false);
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
    if (!is) {
      handleAiReview(code);
      alert("Chưa qua hết test case");
    } else {
      handleAiReview(code);
      alert("Đã qua hết test case");
    }
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
            <div className="exercise-input">input: [3,2,1]</div>
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
      {loading && <h1>Loading...</h1>}
      {!loading && <Markdown>{aiReview}</Markdown>}
    </div>
  );
};

export default Exercise;
