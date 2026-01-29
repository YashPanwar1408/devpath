'use client';

import { useState } from 'react';

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState('DSA');
  const [selectedTopic, setSelectedTopic] = useState('Arrays');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const categories = [
    {
      name: 'DSA',
      icon: '🧮',
      topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching']
    },
    {
      name: 'MERN Stack',
      icon: '⚛️',
      topics: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs', 'Authentication']
    },
    {
      name: 'HTML/CSS',
      icon: '🌐',
      topics: ['HTML Basics', 'CSS Styling', 'Flexbox', 'Grid', 'Responsive Design']
    },
    {
      name: 'JavaScript',
      icon: '📜',
      topics: ['Variables', 'Functions', 'Arrays', 'Objects', 'Promises', 'Async/Await']
    },
    {
      name: 'AI & ML',
      icon: '🤖',
      topics: ['Machine Learning Basics', 'Neural Networks', 'NLP', 'Computer Vision']
    },
    {
      name: 'Web3',
      icon: '⛓️',
      topics: ['Blockchain Basics', 'Smart Contracts', 'Ethereum', 'Solidity']
    },
    {
      name: 'Android',
      icon: '📱',
      topics: ['Android Basics', 'Activities', 'Fragments', 'Jetpack Compose']
    },
    {
      name: 'System Design',
      icon: '🏗️',
      topics: ['Scalability', 'Load Balancing', 'Caching', 'Database Design']
    }
  ];

  const quizData = {
    question: 'What is the time complexity of accessing an element in an array by index?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
    correctAnswer: 1
  };

  const handleQuizSubmit = () => {
    setShowQuizResult(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Learning Hub</h2>
          <p className="text-sm text-gray-600">Choose a topic to learn</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {categories.map((category) => (
            <div key={category.name}>
              <button
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  selectedCategory === category.name
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
              
              {selectedCategory === category.name && (
                <div className="ml-8 mt-2 space-y-1">
                  {category.topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                        selectedTopic === topic
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedTopic}</h1>
              <p className="text-sm text-gray-600">{selectedCategory}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
              Bookmark
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Mark Complete
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Topic Explanation */}
            <section className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an Array?</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  An array is a collection of elements stored at contiguous memory locations. The idea is to store
                  multiple items of the same type together. This makes it easier to calculate the position of each
                  element by simply adding an offset to a base value.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Arrays are one of the most fundamental data structures in computer science. They offer constant-time
                  access to elements by index, making them extremely efficient for many operations.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside text-blue-800 space-y-1">
                    <li>Fixed size (in most languages)</li>
                    <li>Contiguous memory allocation</li>
                    <li>O(1) access time by index</li>
                    <li>Cache-friendly due to locality of reference</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Code Block */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
                <span className="text-white font-semibold">Example Code</span>
                <button className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition">
                  Copy
                </button>
              </div>
              <div className="p-6 bg-gray-900">
                <pre className="text-gray-100 font-mono text-sm overflow-x-auto">
                  <code>{`// Creating and using arrays in JavaScript
const numbers = [1, 2, 3, 4, 5];

// Accessing elements
console.log(numbers[0]); // Output: 1

// Adding elements
numbers.push(6);

// Iterating through array
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Using array methods
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12]`}</code>
                </pre>
              </div>
            </section>

            {/* Live Editor Placeholder */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-green-600 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">Try it Yourself</span>
                  <span className="text-green-100 text-sm">Interactive Editor</span>
                </div>
                <button className="px-4 py-1 bg-green-700 text-white text-sm rounded hover:bg-green-800 transition font-semibold">
                  Run Code
                </button>
              </div>
              <div className="p-6 bg-gray-50">
                <textarea
                  className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  defaultValue={`// Write your code here and click "Run Code"
const myArray = [1, 2, 3, 4, 5];

// Try modifying the code below
console.log(myArray);`}
                />
                <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                  <div className="text-gray-400 text-sm font-mono mb-2">Output:</div>
                  <div className="text-green-400 font-mono text-sm">
                    [1, 2, 3, 4, 5]
                  </div>
                </div>
              </div>
            </section>

            {/* More Examples */}
            <section className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Array Operations</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">1. Finding Maximum Element</h3>
                  <p className="text-gray-600 text-sm mb-3">Time Complexity: O(n)</p>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-gray-100 font-mono text-sm">
                      const max = Math.max(...numbers);
                    </code>
                  </div>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">2. Reversing an Array</h3>
                  <p className="text-gray-600 text-sm mb-3">Time Complexity: O(n)</p>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-gray-100 font-mono text-sm">
                      const reversed = numbers.reverse();
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Quiz Section */}
            <section className="bg-purple-50 rounded-xl shadow-sm p-8 border border-purple-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Your Knowledge</h2>
              <p className="text-gray-600 mb-6">Answer the question below to check your understanding</p>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{quizData.question}</h3>
                <div className="space-y-3">
                  {quizData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      disabled={showQuizResult}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
                        showQuizResult
                          ? index === quizData.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : selectedAnswer === index
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 bg-gray-50'
                          : selectedAnswer === index
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
                    </button>
                  ))}
                </div>
                
                {!showQuizResult && (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedAnswer === null}
                    className="mt-6 w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
                  >
                    Submit Answer
                  </button>
                )}
                
                {showQuizResult && (
                  <div className={`mt-6 p-4 rounded-lg ${
                    selectedAnswer === quizData.correctAnswer
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <p className="font-semibold">
                      {selectedAnswer === quizData.correctAnswer
                        ? '✓ Correct! Great job!'
                        : '✗ Incorrect. The correct answer is O(1).'}
                    </p>
                    <p className="text-sm mt-2">
                      Arrays provide constant-time access to elements when accessed by index because the
                      memory location can be calculated directly.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Navigation */}
            <div className="flex justify-between items-center py-6">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
                ← Previous Lesson
              </button>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">
                Next Lesson →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
