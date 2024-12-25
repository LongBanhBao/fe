import React from "react";

interface CodeOutputProps {
  output: string;
  error?: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ output, error }) => {
  return <div className="coder-results"></div>;
};

export default CodeOutput;
