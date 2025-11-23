import React from 'react';

interface Props {
  content: string;
}

// A lightweight manual markdown parser for the core needs
const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = (keyPrefix: number) => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`ul-${keyPrefix}`} className="list-disc list-inside mb-4 pl-4 space-y-1 text-slate-700">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList(index);
      elements.push(<h3 key={index} className="text-xl font-semibold text-sky-700 mt-6 mb-3">{trimmed.substring(4)}</h3>);
    } else if (trimmed.startsWith('## ')) {
      flushList(index);
      elements.push(<h2 key={index} className="text-2xl font-bold text-slate-800 mt-8 mb-4 border-b pb-2 border-slate-200">{trimmed.substring(3)}</h2>);
    } else if (trimmed.startsWith('# ')) {
      flushList(index);
      elements.push(<h1 key={index} className="text-3xl font-extrabold text-slate-900 mb-6">{trimmed.substring(2)}</h1>);
    } 
    // Lists
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      inList = true;
      const text = trimmed.substring(2);
      // Basic bold parsing inside list
      const parts = text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      listItems.push(<li key={`li-${index}`}>{parts}</li>);
    } 
    // Empty lines
    else if (trimmed === '') {
      flushList(index);
    } 
    // Paragraphs
    else {
      flushList(index);
       // Basic bold parsing
       const parts = trimmed.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      elements.push(<p key={index} className="mb-3 text-slate-600 leading-relaxed text-justify">{parts}</p>);
    }
  });

  flushList(lines.length);

  return <div className="font-sans">{elements}</div>;
};

export default MarkdownRenderer;
