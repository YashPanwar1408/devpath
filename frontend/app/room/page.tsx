'use client';

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

type ViewMode = 'grid' | 'screen-share' | 'whiteboard' | 'code';
type Tool = 'pen' | 'eraser' | 'rectangle' | 'circle' | 'line' | 'text';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  isMe: boolean;
}

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  avatar: string;
}

export default function InterviewRoom() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initialize messages with timestamp on client side only
  useEffect(() => {
    setMessages([{
      id: '1',
      sender: 'Interviewer',
      message: 'Welcome to the interview! Feel free to use the whiteboard or code editor.',
      timestamp: new Date(Date.now() - 120000),
      isMe: false
    }]);
  }, []);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'You',
      isMuted: false,
      isVideoOff: false,
      isScreenSharing: false,
      avatar: '👤'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      isMuted: false,
      isVideoOff: false,
      isScreenSharing: false,
      avatar: '👩‍💼'
    },
    {
      id: '3',
      name: 'Michael Chen',
      isMuted: true,
      isVideoOff: false,
      isScreenSharing: false,
      avatar: '👨‍💻'
    }
  ]);

  // Whiteboard state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<Tool>('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);

  // Code editor state
  const [code, setCode] = useState(`// Write your solution here
function twoSum(nums, target) {
  // Your code here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]`);
  const [language, setLanguage] = useState('javascript');

  const [roomDuration, setRoomDuration] = useState(0);

  // Timer for room duration
  useEffect(() => {
    const timer = setInterval(() => {
      setRoomDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    setParticipants(prev => prev.map(p => 
      p.id === '1' ? { ...p, isMuted: isMicOn } : p
    ));
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    setParticipants(prev => prev.map(p => 
      p.id === '1' ? { ...p, isVideoOff: isCameraOn } : p
    ));
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    if (!isScreenSharing) {
      setViewMode('screen-share');
    } else {
      setViewMode('grid');
    }
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        message: chatMessage,
        timestamp: new Date(),
        isMe: true
      };
      setMessages([...messages, newMessage]);
      setChatMessage('');

      // Simulate response
      setTimeout(() => {
        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'Sarah Johnson',
          message: 'Got it, thanks!',
          timestamp: new Date(),
          isMe: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  // Whiteboard functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    if (currentTool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = lineWidth * 3;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearWhiteboard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const runCode = () => {
    // Simulate code execution
    const outputDiv = document.getElementById('code-output');
    if (outputDiv) {
      outputDiv.innerText = '// Executing...\n// Output: [0, 1]\n// Output: [1, 2]\n// All tests passed! ✓';
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-semibold text-lg">Interview Room</h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatDuration(roomDuration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-red-400 text-sm">Recording</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm">
            Copy Link
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
            Leave Room
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video/Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* View Mode Tabs */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              📹 Video Grid
            </button>
            <button
              onClick={() => setViewMode('whiteboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === 'whiteboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              ✏️ Whiteboard
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === 'code'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              💻 Code Editor
            </button>
            {isScreenSharing && (
              <button
                onClick={() => setViewMode('screen-share')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  viewMode === 'screen-share'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🖥️ Screen Share
              </button>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 overflow-auto">
            {/* Video Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video flex items-center justify-center"
                  >
                    {participant.isVideoOff ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-6xl">{participant.avatar}</div>
                        <span className="text-white font-medium">{participant.name}</span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-blue-900 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-2">{participant.avatar}</div>
                          <span className="text-white text-sm">Video Active</span>
                        </div>
                      </div>
                    )}

                    {/* Participant Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">{participant.name}</span>
                        <div className="flex items-center gap-2">
                          {participant.isMuted ? (
                            <div className="bg-red-600 p-1.5 rounded-full">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <div className="bg-green-600 p-1.5 rounded-full">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {participant.id === '1' && (
                      <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        You
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Screen Share View */}
            {viewMode === 'screen-share' && (
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🖥️</div>
                    <h3 className="text-white text-xl font-semibold mb-2">Screen Sharing Active</h3>
                    <p className="text-gray-400">Your screen is being shared with all participants</p>
                  </div>
                </div>
                {/* Small video thumbnails */}
                <div className="flex gap-2 mt-4">
                  {participants.slice(0, 3).map((participant) => (
                    <div
                      key={participant.id}
                      className="w-32 h-20 bg-gray-800 rounded-lg flex items-center justify-center relative"
                    >
                      <span className="text-2xl">{participant.avatar}</span>
                      <span className="absolute bottom-1 left-1 text-white text-xs bg-black/60 px-2 py-0.5 rounded">
                        {participant.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Whiteboard View */}
            {viewMode === 'whiteboard' && (
              <div className="h-full flex flex-col">
                {/* Toolbar */}
                <div className="bg-gray-800 rounded-t-lg p-3 flex items-center gap-3 flex-wrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentTool('pen')}
                      className={`p-2 rounded-lg transition ${
                        currentTool === 'pen' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      title="Pen"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setCurrentTool('eraser')}
                      className={`p-2 rounded-lg transition ${
                        currentTool === 'eraser' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      title="Eraser"
                    >
                      🧹
                    </button>
                    <button
                      onClick={() => setCurrentTool('rectangle')}
                      className={`p-2 rounded-lg transition ${
                        currentTool === 'rectangle' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      title="Rectangle"
                    >
                      ▭
                    </button>
                    <button
                      onClick={() => setCurrentTool('circle')}
                      className={`p-2 rounded-lg transition ${
                        currentTool === 'circle' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      title="Circle"
                    >
                      ⭕
                    </button>
                    <button
                      onClick={() => setCurrentTool('text')}
                      className={`p-2 rounded-lg transition ${
                        currentTool === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      title="Text"
                    >
                      T
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Color:</span>
                    <input
                      type="color"
                      value={currentColor}
                      onChange={(e) => setCurrentColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Size:</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={lineWidth}
                      onChange={(e) => setLineWidth(Number(e.target.value))}
                      className="w-24"
                    />
                    <span className="text-gray-400 text-sm">{lineWidth}px</span>
                  </div>

                  <button
                    onClick={clearWhiteboard}
                    className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    Clear All
                  </button>
                </div>

                {/* Canvas */}
                <canvas
                  ref={canvasRef}
                  width={1200}
                  height={600}
                  className="flex-1 bg-white rounded-b-lg cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
            )}

            {/* Code Editor View */}
            {viewMode === 'code' && (
              <div className="h-full flex flex-col">
                {/* Editor Toolbar */}
                <div className="bg-gray-800 rounded-t-lg p-3 flex items-center gap-3">
                  <span className="text-gray-400 text-sm">Language:</span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm outline-none"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="typescript">TypeScript</option>
                  </select>

                  <button
                    onClick={runCode}
                    className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                  >
                    ▶️ Run Code
                  </button>
                </div>

                {/* Editor */}
                <div className="flex-1 bg-gray-900">
                  <Editor
                    height="100%"
                    defaultLanguage={language}
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      lineNumbers: 'on',
                      renderWhitespace: 'selection'
                    }}
                  />
                </div>

                {/* Output */}
                <div className="bg-gray-800 p-4 rounded-b-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm font-medium">Output:</span>
                    <button className="text-gray-400 hover:text-white text-xs">Clear</button>
                  </div>
                  <pre
                    id="code-output"
                    className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono min-h-15"
                  >
                    {/* Click Run Code to execute */}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Sidebar */}
        {isChatOpen && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-semibold">Chat</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-xs text-gray-400 mb-1">
                    {msg.sender} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      msg.isMe
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Participants Sidebar */}
        {isParticipantsOpen && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-semibold">
                Participants ({participants.length})
              </h3>
              <button
                onClick={() => setIsParticipantsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg"
                >
                  <div className="text-3xl">{participant.avatar}</div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{participant.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {participant.isMuted ? (
                        <span className="text-xs text-red-400">🔇 Muted</span>
                      ) : (
                        <span className="text-xs text-green-400">🎤 Active</span>
                      )}
                      {participant.isVideoOff && (
                        <span className="text-xs text-gray-400">📹 Off</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMic}
              className={`p-4 rounded-full transition ${
                isMicOn
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              title={isMicOn ? 'Mute' : 'Unmute'}
            >
              {isMicOn ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleCamera}
              className={`p-4 rounded-full transition ${
                isCameraOn
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
            >
              {isCameraOn ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleScreenShare}
              className={`p-4 rounded-full transition ${
                isScreenSharing
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`p-4 rounded-full transition relative ${
                isChatOpen
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              title="Chat"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              {messages.length > 1 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {messages.length - 1}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
              className={`p-4 rounded-full transition ${
                isParticipantsOpen
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              title="Participants"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </button>

            <button
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition"
              title="Settings"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition"
              title="More options"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>

          {/* Right - Leave Button */}
          <div>
            <button className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition font-medium">
              Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
