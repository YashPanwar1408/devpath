'use client';

import React, { useState } from 'react';
import { Video, MessageSquare } from 'lucide-react';

interface InterviewSessionUIProps {
  type?: 'video' | 'chat';
}

export default function InterviewSessionUI({ type: initialType }: InterviewSessionUIProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'chat'>(initialType || 'video');
  
  return (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('video')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 hover:bg-slate-800 transition ${
            activeTab === 'video' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-400'
          }`}
        >
          <Video size={18} />
          <span className="text-sm font-medium">Call</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 hover:bg-slate-800 transition ${
            activeTab === 'chat' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-400'
          }`}
        >
          <MessageSquare size={18} />
          <span className="text-sm font-medium">Chat</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'video' ? (
          <div className="h-full flex flex-col items-center justify-center bg-slate-950 p-8">
            <div className="w-full max-w-md space-y-6 text-center">
              <div className="w-20 h-20 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                <Video size={40} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Video Call</h3>
                <p className="text-slate-400 text-sm">
                  Video calling feature will be integrated here using GetStream SDK.
                  This will enable real-time video communication during interview sessions.
                </p>
              </div>
              <div className="space-y-3">
                <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  Start Call
                </button>
                <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">
                  Schedule Call
                </button>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500">
                  Integration with @stream-io/video-react-sdk
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col bg-slate-950">
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium shrink-0">
                  I
                </div>
                <div className="flex-1">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-sm text-slate-300">
                      Hi! I&apos;m your interviewer. Feel free to ask any clarifying questions about the problem.
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 inline-block">2 minutes ago</span>
                </div>
              </div>

              <div className="flex items-start gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-medium shrink-0">
                  Y
                </div>
                <div className="flex-1 text-right">
                  <div className="bg-blue-600 rounded-lg p-3 inline-block text-left">
                    <p className="text-sm text-white">
                      Thanks! Can you clarify the constraints for the input array?
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 inline-block">1 minute ago</span>
                </div>
              </div>

              <div className="flex items-center justify-center py-4">
                <div className="bg-slate-800/50 px-4 py-2 rounded-full">
                  <p className="text-xs text-slate-400">
                    Chat powered by stream-chat-react
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-800 p-4">
              <div className="flex items-end gap-2">
                <textarea
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-800 text-white placeholder-slate-500 px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shrink-0">
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
