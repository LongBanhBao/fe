import React, { useState } from "react";
import { generateShareableUrl, saveCode } from "../../utils/codeStorage";

interface CodeActionsProps {
  code: string;
}

const CodeActions: React.FC<CodeActionsProps> = ({ code }) => {
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleSave = () => {
    const saved = saveCode(code);
    if (saved) {
      setShowSaveMessage(true);
      setTimeout(() => setShowSaveMessage(false), 2000);
    }
  };

  const handleShare = async () => {
    const url = generateShareableUrl(code);
    try {
      await navigator.clipboard.writeText(url);
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Lưu code
      </button>
      <button
        onClick={handleShare}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Chia sẻ
      </button>

      {showSaveMessage && <span className="text-green-600">Đã lưu code!</span>}
      {showCopyMessage && (
        <span className="text-green-600">Đã sao chép link!</span>
      )}
    </div>
  );
};

export default CodeActions;
