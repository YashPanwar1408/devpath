'use client';

import { useState, useEffect, useRef } from 'react';

// Define SpeechRecognition interfaces for TypeScript
interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  [index: number]: { transcript: string; confidence: number };
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface Question {
  question: string;
  topic: string;
  difficulty: string;
  skillsTested: string[];
  keyPoints: string[];
}

interface Evaluation {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  detailedFeedback: string;
  overallAssessment: string;
}

interface InterviewReport {
  overallScore: number;
  recommendation: string;
  strengths: string[];
  improvements: string[];
  skillAssessment: {
    technical: number;
    problemSolving: number;
    communication: number;
  };
  detailedReport: string;
  nextSteps: string[];
}

export default function InterviewPage() {
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [report, setReport] = useState<InterviewReport | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognitionConstructor = (window as typeof window & {
        webkitSpeechRecognition?: new() => SpeechRecognition;
        SpeechRecognition?: new() => SpeechRecognition
      }).webkitSpeechRecognition || (window as typeof window & {
        webkitSpeechRecognition?: new() => SpeechRecognition;
        SpeechRecognition?: new() => SpeechRecognition
      }).SpeechRecognition;
      
      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscript(prev => prev + finalTranscript || interimTranscript);
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startInterview = async (topic: string, difficulty: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:5000/api/interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, numberOfQuestions: 5 })
      });

      const data = await response.json();
      if (data.success) {
        setInterviewId(data.interviewId);
        setCurrentQuestion(data.firstQuestion);
        setProgress({ current: 1, total: data.totalQuestions });
        setInterviewStarted(true);
        speakQuestion(data.firstQuestion.question);
      }
    } catch (error) {
      console.error('Failed to start interview:', error);
      alert('Failed to start interview. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const submitAnswer = async () => {
    if (!transcript.trim() || !interviewId) {
      alert('Please provide an answer before submitting.');
      return;
    }

    setIsProcessing(true);
    setShowEvaluation(false);

    try {
      const response = await fetch('http://localhost:5000/api/interview/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interviewId, answer: transcript })
      });

      const data = await response.json();
      if (data.success) {
        setEvaluation(data.evaluation);
        setShowEvaluation(true);

        if (data.complete) {
          setReport(data.report);
        } else {
          setCurrentQuestion(data.nextQuestion);
          setProgress(data.progress);
          setTranscript('');
          
          // Auto-speak next question after 3 seconds
          setTimeout(() => {
            setShowEvaluation(false);
            speakQuestion(data.nextQuestion.question);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const skipQuestion = () => {
    setTranscript('I do not know the answer to this question.');
    submitAnswer();
  };

  if (report) {
    return (
      <div className="min-h-screen bg-purple-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Complete!</h1>
              <p className="text-gray-600">Here&apos;s your comprehensive performance report</p>
            </div>

            {/* Overall Score */}
            <div className="bg-indigo-600 rounded-xl p-6 mb-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Overall Score</h2>
                  <div className="text-5xl font-bold">{report.overallScore}%</div>
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-semibold mb-2">Recommendation</h2>
                  <div className="text-2xl font-bold">{report.recommendation}</div>
                </div>
              </div>
            </div>

            {/* Skill Assessment */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-sm text-blue-600 font-medium mb-2">Technical</div>
                <div className="text-3xl font-bold text-blue-900">{report.skillAssessment.technical}/10</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-sm text-green-600 font-medium mb-2">Problem Solving</div>
                <div className="text-3xl font-bold text-green-900">{report.skillAssessment.problemSolving}/10</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-sm text-purple-600 font-medium mb-2">Communication</div>
                <div className="text-3xl font-bold text-purple-900">{report.skillAssessment.communication}/10</div>
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">💪 Strengths</h3>
              <ul className="space-y-2">
                {report.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📈 Areas for Improvement</h3>
              <ul className="space-y-2">
                {report.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-orange-600 mt-1">→</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 Next Steps</h3>
              <ul className="space-y-2">
                {report.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-indigo-600 font-bold">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Report */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📋 Detailed Analysis</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{report.detailedReport}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Start New Interview
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-semibold"
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎤</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Voice Interview</h1>
            <p className="text-gray-600">Practice technical interviews with AI-powered voice interaction</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Topic</label>
              <select
                id="topic"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="Data Structures">Data Structures</option>
                <option value="Algorithms">Algorithms</option>
                <option value="System Design">System Design</option>
                <option value="Database">Database</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-3">
                {['Easy', 'Medium', 'Hard'].map(level => (
                  <button
                    key={level}
                    id={`difficulty-${level}`}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition font-semibold"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">💡 How it works:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• AI will ask you 5 technical questions</li>
                <li>• Use the microphone to answer verbally</li>
                <li>• Get instant feedback on each answer</li>
                <li>• Receive a comprehensive report at the end</li>
              </ul>
            </div>

            <button
              onClick={() => {
                const topic = (document.getElementById('topic') as HTMLSelectElement).value;
                const difficultyButtons = document.querySelectorAll('[id^="difficulty-"]');
                let difficulty = 'Medium';
                difficultyButtons.forEach(btn => {
                  if (btn.classList.contains('border-indigo-500')) {
                    difficulty = btn.textContent || 'Medium';
                  }
                });
                startInterview(topic, difficulty);
              }}
              disabled={isProcessing}
              className="w-full px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Starting Interview...' : 'Start Interview'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Voice Interview</h1>
            <p className="text-sm text-gray-600">Question {progress.current} of {progress.total}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Progress: <span className="font-semibold text-indigo-600">{Math.round((progress.current / progress.total) * 100)}%</span>
            </div>
            <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-5xl mx-auto w-full p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Question Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">❓</span>
              <h2 className="text-xl font-bold text-gray-900">Current Question</h2>
            </div>

            {currentQuestion && (
              <div className="space-y-4">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <p className="text-lg text-gray-900 leading-relaxed">{currentQuestion.question}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills Tested:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentQuestion.skillsTested.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Difficulty:</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => speakQuestion(currentQuestion.question)}
                  className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-semibold flex items-center justify-center gap-2"
                >
                  <span>🔊</span>
                  <span>Replay Question</span>
                </button>
              </div>
            )}
          </div>

          {/* Answer Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎤</span>
              <h2 className="text-xl font-bold text-gray-900">Your Answer</h2>
            </div>

            {/* Voice Controls */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={toggleListening}
                  disabled={isProcessing}
                  className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl transition-all ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-xl' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isListening ? '⏸️' : '🎤'}
                </button>
              </div>
              <p className="text-center text-sm text-gray-600">
                {isListening ? 'Listening... Click to stop' : 'Click to start recording'}
              </p>
            </div>

            {/* Transcript */}
            <div className="flex-1 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Transcript</label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Your answer will appear here as you speak... You can also type directly."
                className="w-full h-full min-h-50 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={skipQuestion}
                disabled={isProcessing}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Skip
              </button>
              <button
                onClick={submitAnswer}
                disabled={isProcessing || !transcript.trim()}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Submitting...' : 'Submit Answer'}
              </button>
            </div>
          </div>
        </div>

        {/* Evaluation Panel */}
        {showEvaluation && evaluation && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-200 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📊</span>
              <h2 className="text-xl font-bold text-gray-900">Answer Evaluation</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-indigo-600 rounded-lg p-6 text-white">
                <div className="text-sm mb-2">Your Score</div>
                <div className="text-5xl font-bold">{evaluation.score}/10</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Assessment</div>
                  <div className="text-xl font-bold text-gray-900">{evaluation.overallAssessment}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                  <span>✓</span> Strengths
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {evaluation.strengths.map((strength, index) => (
                    <li key={index}>• {strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-orange-700 mb-2 flex items-center gap-2">
                  <span>→</span> Suggestions
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {evaluation.suggestions.map((suggestion, index) => (
                    <li key={index}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{evaluation.detailedFeedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
