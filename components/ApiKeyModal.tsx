
import React, { useState } from 'react';
import { Key, ExternalLink, Save, AlertCircle } from 'lucide-react';
import { saveApiKey } from '../services/geminiService';

interface Props {
  isOpen: boolean;
  onSuccess: () => void;
  forceOpen?: boolean;
}

const ApiKeyModal: React.FC<Props> = ({ isOpen, onSuccess, forceOpen = false }) => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  if (!isOpen && !forceOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) {
      setError('Vui lòng nhập API Key');
      return;
    }
    if (!inputKey.startsWith('AIza')) {
      setError('API Key không hợp lệ (phải bắt đầu bằng AIza...)');
      return;
    }
    
    saveApiKey(inputKey);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-primary p-6 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
             <Key className="text-white" size={32} />
          </div>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Nhập API Key</h2>
          <p className="text-center text-slate-500 mb-6 text-sm">
            Để sử dụng ứng dụng, bạn cần cung cấp mã Google Gemini API Key miễn phí của mình.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Google AI Studio Key</label>
              <input 
                type="password" 
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setError('');
                }}
                placeholder="AIzaSyD..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono text-sm"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-sky-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Lưu & Bắt đầu học
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
            >
              Chưa có Key? Lấy miễn phí tại đây <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
