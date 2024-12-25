import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import { runPythonCode } from "../../utils/runPythonCode";
import CodeActions from "../CodeActions";
interface CodeEditorProps {
  defaultCode: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultCode }) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  const handleExecuteCode = async () => {
    try {
      setOutput("");
      setError("");
      if (code) {
        const output = await runPythonCode(code, input);
        if (output.code === 1) {
          setError(output.stderr);
        } else {
          setOutput(output.stdout);
        }
      } else {
        setError("Không có code để chạy");
      }
    } catch (error) {
      console.log("Error in handle execute code", error);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <h3 className="font-semibold">Code Editor</h3>
        <div className="flex items-center space-x-4">
          <CodeActions code={code} />
          <button
            onClick={handleExecuteCode}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Chạy code
          </button>
        </div>
      </div>

      <Editor
        height="400px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => {
          setCode(value || "");
        }}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
      <div className="coder-results">
        <h3 className="coder-results-title">Kết quả:</h3>

        <div className="coder-results-grid">
          <div className="coder-input-section">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="coder-input"
              placeholder="Nhập input cho chương trình..."
            />
          </div>

          <div className="coder-output-section">
            <div className="coder-output">
              {output && (
                <pre className="coder-output-text">
                  {output || "Chưa có kết quả"}
                </pre>
              )}
              {error && (
                <pre className="coder-output-text text-red-400">
                  {error || "Chưa có kết quả"}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
