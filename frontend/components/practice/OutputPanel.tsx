'use client';

import React from 'react';
import { Terminal } from 'lucide-react';

interface OutputPanelProps {
  output: string;
}

export default function OutputPanel({ output }: OutputPanelProps) {
  return (
    <div className="h-full flex flex-col bg-slate-900">
      
      {/* Header */}
      <div className="h-10 border-b border-slate-800 flex items-center px-4 bg-slate-900">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <Terminal size={16} />
          <span>Console</span>
        </div>
      </div>

      {/* Output Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {output ? (
          <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
            {output}
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm">
            Run your code to see output here
          </div>
        )}
      </div>
    </div>
  );
}
