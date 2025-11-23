import React from 'react';
import { SimulationData } from '../types';
import { PlayCircle, Info } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface Props {
  data: SimulationData | null;
  isLoading: boolean;
}

const SimulationView: React.FC<Props> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mb-4"></div>
        <p className="text-slate-500">Đang thiết kế kịch bản thí nghiệm...</p>
      </div>
    );
  }

  if (!data) return <div className="text-center p-10 text-slate-500">Không có dữ liệu mô phỏng.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl overflow-hidden shadow-lg text-white">
        <div className="relative h-64 md:h-80 bg-black">
          <img 
            src={data.imageUrl} 
            alt="Simulation Placeholder" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center p-6 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20">
                <PlayCircle size={48} className="mx-auto mb-2 text-white opacity-80" />
                <p className="font-semibold text-lg">Mô phỏng minh hoạ</p>
                <p className="text-xs text-slate-300 mt-1">(Hình ảnh mang tính chất minh hoạ)</p>
             </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
          <p className="text-indigo-200">{data.description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
            <Info size={20} className="text-secondary"/>
            Kịch bản thí nghiệm
          </h3>
          <div className="prose prose-sm prose-slate max-w-none">
            <MarkdownRenderer content={data.scenario} />
          </div>
        </div>
        
        <div className="space-y-4">
           <div className="bg-sky-50 p-5 rounded-xl border border-sky-100">
             <h4 className="font-semibold text-sky-900 mb-2">Mục đích</h4>
             <p className="text-sm text-sky-800">
               Giúp hình dung trực quan các hiện tượng vật lý khó quan sát bằng mắt thường hoặc diễn ra ở cấp độ vi mô.
             </p>
           </div>
           <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
             <h4 className="font-semibold text-emerald-900 mb-2">Hoạt động đề xuất</h4>
             <p className="text-sm text-emerald-800">
               Đọc kịch bản bên cạnh và thử tưởng tượng hoặc vẽ lại sơ đồ thí nghiệm vào vở.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationView;
