import React from 'react';
import { BookText, Microscope, BrainCircuit, MessageCircleQuestion, X, Smartphone, Share, Download } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Hướng dẫn học tập</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Section: Install App */}
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                 <Smartphone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sky-900 text-sm">Cách cài đặt App vào điện thoại</h3>
                <p className="text-xs text-sky-800 mt-1 mb-2">
                  Để sử dụng toàn màn hình và tiện lợi hơn, hãy thêm web này vào màn hình chính:
                </p>
                <div className="text-xs text-slate-600 bg-white/60 p-2 rounded border border-sky-100 space-y-1">
                  <p className="flex items-center gap-1">
                    <span className="font-semibold">iOS (iPhone):</span> Nhấn nút <Share size={12}/> Chia sẻ &rarr; Chọn "Thêm vào MH chính"
                  </p>
                  <p className="flex items-center gap-1">
                    <span className="font-semibold">Android:</span> Nhấn dấu 3 chấm &rarr; Chọn "Cài đặt ứng dụng" hoặc "Thêm vào màn hình chính"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-600 text-sm font-medium">Các tính năng chính:</p>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <BookText size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">1. Lý thuyết</h3>
                <p className="text-xs text-slate-500 mt-1">Đọc tóm tắt kiến thức trọng tâm do AI biên soạn ngắn gọn, dễ hiểu.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Microscope size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">2. Mô phỏng</h3>
                <p className="text-xs text-slate-500 mt-1">Xem kịch bản thí nghiệm ảo để hình dung hiện tượng vật lý.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <BrainCircuit size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">3. Trắc nghiệm</h3>
                <p className="text-xs text-slate-500 mt-1">Tự kiểm tra kiến thức với bộ câu hỏi được sinh ngẫu nhiên mỗi lần.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                <MessageCircleQuestion size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">4. Hỏi đáp AI</h3>
                <p className="text-xs text-slate-500 mt-1">Chưa hiểu bài? Chat trực tiếp với gia sư AI để được giải thích chi tiết.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-sky-600 font-medium transition-colors shadow-sm shadow-sky-200"
          >
            Đã hiểu, bắt đầu học
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;