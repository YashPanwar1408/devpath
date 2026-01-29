'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { Play, Send } from 'lucide-react';

interface CodeEditorPanelProps {
  code: string;
  language: string;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
}

const languageMap: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'cpp',
};

const languageLabels: Record<string, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  java: 'Java',
  cpp: 'C++',
};

export default function CodeEditorPanel({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning,
}: CodeEditorPanelProps) {
  
  const handleEditorChange = (value: string | undefined) => {
    onCodeChange(value || '');
  };

  return (
    <div className="h-full flex flex-col bg-slate-950">
      
      {/* Top Bar: Language Selector & Actions */}
      <div className="h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900">
        
        {/* Language Tabs */}
        <div className="flex items-center gap-1">
          {Object.keys(languageMap).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                language === lang
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run'}
          </button>
          <button
            onClick={onSubmit}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={languageMap[language]}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            bracketPairColorization: { enabled: true },
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
}
