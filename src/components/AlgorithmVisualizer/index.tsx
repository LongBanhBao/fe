import React, { useState, useEffect } from 'react';
import ArrayVisualization from '../Visualization/ArrayVisualization';
import CodeEditor from '../CodeEditor';
import AlgorithmControls from '../controls/AlgorithmControls';

interface AlgorithmVisualizerProps {
  algorithmType: string;
  defaultCode: string;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  algorithmType,
  defaultCode
}) => {
  const [array, setArray] = useState<number[]>([]);
  const [visualSteps, setVisualSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Hàm tạo mảng ngẫu nhiên
  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, () => 
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
  };

  // Xử lý kết quả từ code editor
  const handleCodeResult = (result: any) => {
    try {
      const steps = JSON.parse(result);
      setVisualSteps(steps);
      setCurrentStep(0);
    } catch (error) {
      console.error('Invalid visualization data');
    }
  };

  // Điều khiển animation
  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const handleNextStep = () => {
    if (currentStep < visualSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <button 
          onClick={generateRandomArray}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Tạo mảng mới
        </button>
      </div>

      <ArrayVisualization 
        array={array}
        highlightIndices={visualSteps[currentStep]?.highlights || []}
        comparingIndices={visualSteps[currentStep]?.comparing || []}
        swappingIndices={visualSteps[currentStep]?.swapping || []}
      />

      <AlgorithmControls 
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onNextStep={handleNextStep}
        isPlaying={isPlaying}
      />
      <CodeEditor
        algorithmId={algorithmType}
        defaultCode={defaultCode}
        onCodeChange={handleCodeResult}
      />
    </div>
  );
};

export default AlgorithmVisualizer;
