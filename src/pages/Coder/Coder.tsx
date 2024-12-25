import React from "react";
import CodeEditor from "../../components/CodeEditor";
import "./Coder.css";

const Coder: React.FC = () => {
  return (
    <div className="coder-container">
      <div className="coder-breadcrumb">Bài tập &gt; Coder</div>
      <CodeEditor defaultCode="#hello" />
    </div>
  );
};

export default Coder;
