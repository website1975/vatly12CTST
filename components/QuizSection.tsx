import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  isLoading: boolean;
  onRefresh: () => void;
}

const QuizSection: React.FC<Props> = ({ questions, isLoading, onRefresh }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const getScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-slate-500">Đang khởi tạo bộ câu hỏi trắc nghiệm...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">Chưa có dữ liệu câu hỏi.</p>
        <button onClick={onRefresh} className="text-primary font-medium hover:underline">Tải lại</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Củng cố kiến thức</h2>
        {!showResults ? (
          <button 
            onClick={() => setShowResults(true)}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Nộp bài
          </button>
        ) : (
          <div className="flex items-center gap-4">
             <span className="text-lg font-bold text-slate-800">
               Điểm: <span className="text-primary">{getScore()}/{questions.length}</span>
             </span>
             <button 
              onClick={() => {
                setSelectedAnswers({});
                setShowResults(false);
                onRefresh(); // Get new questions
              }}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
             >
               <RefreshCw size={18} /> Làm đề mới
             </button>
          </div>
        )}
      </div>

      {questions.map((q, index) => {
        const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
        const isSelected = selectedAnswers[q.id] !== undefined;

        return (
          <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-600">
                {index + 1}
              </span>
              <h3 className="text-lg font-medium text-slate-800 pt-1">{q.question}</h3>
            </div>

            <div className="space-y-3 pl-11">
              {q.options.map((opt, i) => {
                let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
                
                if (showResults) {
                  if (i === q.correctAnswer) {
                    btnClass += "border-green-500 bg-green-50 text-green-900";
                  } else if (i === selectedAnswers[q.id]) {
                    btnClass += "border-red-500 bg-red-50 text-red-900";
                  } else {
                    btnClass += "border-slate-100 text-slate-400";
                  }
                } else {
                  if (selectedAnswers[q.id] === i) {
                    btnClass += "border-primary bg-sky-50 text-sky-900";
                  } else {
                    btnClass += "border-slate-100 hover:border-slate-300 hover:bg-slate-50";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(q.id, i)}
                    disabled={showResults}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showResults && i === q.correctAnswer && <CheckCircle size={20} className="text-green-500"/>}
                      {showResults && i === selectedAnswers[q.id] && i !== q.correctAnswer && <XCircle size={20} className="text-red-500"/>}
                    </div>
                  </button>
                );
              })}
            </div>

            {showResults && (
              <div className="mt-4 ml-11 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 flex items-start gap-3">
                <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm mb-1">Giải thích:</p>
                  <p className="text-sm">{q.explanation}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizSection;
