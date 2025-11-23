import React from 'react';
import { CURRICULUM } from '../constants';
import { Lesson } from '../types';
import { BookOpen, ChevronRight, Atom } from 'lucide-react';

interface SidebarProps {
  currentLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentLesson, onSelectLesson, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-30
        w-72 bg-white border-r border-slate-200 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Atom size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Phys12</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {CURRICULUM.map((chapter) => (
            <div key={chapter.id}>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                {chapter.title}
              </h3>
              <div className="space-y-1">
                {chapter.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(lesson);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${currentLesson.id === lesson.id 
                        ? 'bg-sky-50 text-primary' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    <BookOpen size={16} className={currentLesson.id === lesson.id ? 'text-primary' : 'text-slate-400'} />
                    <span className="flex-1 text-left truncate">{lesson.title}</span>
                    {currentLesson.id === lesson.id && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-center text-slate-500">
             Chân Trời Sáng Tạo © 2024
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
