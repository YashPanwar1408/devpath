'use client';

import React, { useState } from 'react';

type TabType = 'discussions' | 'mentors' | 'study-rooms';
type Category = 'all' | 'technical' | 'behavioral' | 'career' | 'system-design';

interface Discussion {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  category: Category;
  content: string;
  likes: number;
  comments: number;
  views: number;
  timestamp: string;
  tags: string[];
  isResolved: boolean;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  likes: number;
  timestamp: string;
  replies: Comment[];
  isMentor?: boolean;
}

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  reviews: number;
  sessionsCompleted: number;
  pricePerHour: number;
  availability: string;
  bio: string;
}

interface StudyRoom {
  id: string;
  title: string;
  host: string;
  hostAvatar: string;
  topic: string;
  participants: number;
  maxParticipants: number;
  startTime: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  isLive: boolean;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>('discussions');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newComment, setNewComment] = useState('');

  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'How to approach system design interviews at FAANG?',
      author: 'Sarah Chen',
      authorAvatar: '👩‍💻',
      category: 'system-design',
      content: 'I have an upcoming interview at Google and need advice on how to structure my system design answers. What frameworks do you recommend?',
      likes: 45,
      comments: 23,
      views: 892,
      timestamp: '2 hours ago',
      tags: ['system-design', 'FAANG', 'google'],
      isResolved: false
    },
    {
      id: '2',
      title: 'Best resources for learning dynamic programming?',
      author: 'Mike Johnson',
      authorAvatar: '👨‍🎓',
      category: 'technical',
      content: 'I struggle with DP problems. Can someone share their learning path and recommended resources?',
      likes: 67,
      comments: 34,
      views: 1250,
      timestamp: '5 hours ago',
      tags: ['algorithms', 'dynamic-programming', 'leetcode'],
      isResolved: true
    },
    {
      id: '3',
      title: 'How to negotiate salary for entry-level positions?',
      author: 'Emily Davis',
      authorAvatar: '👩‍🦰',
      category: 'career',
      content: 'Got my first offer but not sure if the salary is fair. What should I consider when negotiating?',
      likes: 89,
      comments: 56,
      views: 2134,
      timestamp: '1 day ago',
      tags: ['salary', 'negotiation', 'career-advice'],
      isResolved: false
    },
    {
      id: '4',
      title: 'Common behavioral interview questions at startups',
      author: 'Alex Kumar',
      authorAvatar: '👨‍💼',
      category: 'behavioral',
      content: 'Preparing for interviews at Series A startups. What behavioral questions should I expect?',
      likes: 32,
      comments: 18,
      views: 654,
      timestamp: '3 days ago',
      tags: ['behavioral', 'startups', 'interview-prep'],
      isResolved: true
    },
    {
      id: '5',
      title: 'Tips for mock interviews - giving and receiving feedback',
      author: 'David Park',
      authorAvatar: '👨‍🏫',
      category: 'career',
      content: 'Looking to organize mock interview sessions. What are some best practices?',
      likes: 54,
      comments: 27,
      views: 987,
      timestamp: '1 week ago',
      tags: ['mock-interview', 'feedback', 'practice'],
      isResolved: false
    }
  ];

  const comments: Record<string, Comment[]> = {
    '1': [
      {
        id: 'c1',
        author: 'Tech Mentor John',
        authorAvatar: '👨‍🏫',
        content: 'Start with the 4-step approach: 1) Clarify requirements, 2) High-level design, 3) Deep dive, 4) Wrap up. Always ask clarifying questions first!',
        likes: 34,
        timestamp: '1 hour ago',
        isMentor: true,
        replies: [
          {
            id: 'c1r1',
            author: 'Sarah Chen',
            authorAvatar: '👩‍💻',
            content: 'Thank you! Should I draw the diagrams first or explain verbally?',
            likes: 5,
            timestamp: '45 mins ago',
            replies: []
          },
          {
            id: 'c1r2',
            author: 'Tech Mentor John',
            authorAvatar: '👨‍🏫',
            content: 'Draw as you explain! Visual aids help both you and the interviewer stay on the same page.',
            likes: 12,
            timestamp: '30 mins ago',
            isMentor: true,
            replies: []
          }
        ]
      },
      {
        id: 'c2',
        author: 'Lisa Wang',
        authorAvatar: '👩‍💼',
        content: 'I recommend the book "System Design Interview" by Alex Xu. It covers all the essential patterns.',
        likes: 28,
        timestamp: '30 mins ago',
        replies: []
      }
    ]
  };

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Martinez',
      avatar: '👩‍🏫',
      title: 'Senior SWE',
      company: 'Google',
      expertise: ['System Design', 'Algorithms', 'Career Coaching'],
      rating: 4.9,
      reviews: 127,
      sessionsCompleted: 245,
      pricePerHour: 80,
      availability: 'Available today',
      bio: '10+ years at Google, helped 200+ engineers land FAANG jobs'
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: '👨‍💻',
      title: 'Tech Lead',
      company: 'Meta',
      expertise: ['Frontend', 'React', 'System Design'],
      rating: 4.8,
      reviews: 89,
      sessionsCompleted: 156,
      pricePerHour: 75,
      availability: 'Tomorrow at 2 PM',
      bio: 'Specialized in frontend architecture and React performance'
    },
    {
      id: '3',
      name: 'Priya Patel',
      avatar: '👩‍💼',
      title: 'Engineering Manager',
      company: 'Amazon',
      expertise: ['Leadership', 'Behavioral', 'Career Growth'],
      rating: 5.0,
      reviews: 203,
      sessionsCompleted: 378,
      pricePerHour: 90,
      availability: 'Available now',
      bio: 'Former hiring manager, expert in behavioral interviews'
    },
    {
      id: '4',
      name: 'James Wilson',
      avatar: '👨‍🎓',
      title: 'ML Engineer',
      company: 'OpenAI',
      expertise: ['Machine Learning', 'AI', 'Python'],
      rating: 4.7,
      reviews: 64,
      sessionsCompleted: 98,
      pricePerHour: 85,
      availability: 'This weekend',
      bio: 'AI/ML interview prep specialist with research background'
    }
  ];

  const studyRooms: StudyRoom[] = [
    {
      id: '1',
      title: 'Dynamic Programming Marathon',
      host: 'Alex Kim',
      hostAvatar: '👨‍💻',
      topic: 'Solving 10 DP problems together',
      participants: 8,
      maxParticipants: 15,
      startTime: 'Now',
      duration: '2 hours',
      level: 'Intermediate',
      tags: ['algorithms', 'dp', 'leetcode'],
      isLive: true
    },
    {
      id: '2',
      title: 'System Design Study Group',
      host: 'Maria Garcia',
      hostAvatar: '👩‍🔬',
      topic: 'Design Instagram Feed',
      participants: 12,
      maxParticipants: 20,
      startTime: 'In 30 mins',
      duration: '1.5 hours',
      level: 'Advanced',
      tags: ['system-design', 'scalability'],
      isLive: false
    },
    {
      id: '3',
      title: 'JavaScript Fundamentals',
      host: 'Tom Anderson',
      hostAvatar: '👨‍🏫',
      topic: 'Closures, Promises, and Async/Await',
      participants: 6,
      maxParticipants: 10,
      startTime: 'Today 6 PM',
      duration: '1 hour',
      level: 'Beginner',
      tags: ['javascript', 'fundamentals', 'web-dev'],
      isLive: false
    },
    {
      id: '4',
      title: 'Mock Interview Practice',
      host: 'Rachel Brown',
      hostAvatar: '👩‍💼',
      topic: 'Behavioral + Technical rounds',
      participants: 4,
      maxParticipants: 8,
      startTime: 'Now',
      duration: '3 hours',
      level: 'Intermediate',
      tags: ['mock-interview', 'practice', 'feedback'],
      isLive: true
    },
    {
      id: '5',
      title: 'React Advanced Patterns',
      host: 'Kevin Lee',
      hostAvatar: '👨‍🚀',
      topic: 'Custom Hooks & State Management',
      participants: 15,
      maxParticipants: 15,
      startTime: 'Tomorrow 3 PM',
      duration: '2 hours',
      level: 'Advanced',
      tags: ['react', 'frontend', 'hooks'],
      isLive: false
    }
  ];

  const categories = [
    { id: 'all' as Category, name: 'All Topics', icon: '📚' },
    { id: 'technical' as Category, name: 'Technical', icon: '💻' },
    { id: 'behavioral' as Category, name: 'Behavioral', icon: '🗣️' },
    { id: 'career' as Category, name: 'Career', icon: '📈' },
    { id: 'system-design' as Category, name: 'System Design', icon: '🏗️' }
  ];

  const filteredDiscussions = discussions.filter(d => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePostComment = () => {
    if (newComment.trim() && selectedDiscussion) {
      // Add comment logic here
      alert('Comment posted successfully!');
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">Community Forum 💬</h1>
          <p className="text-purple-100 text-lg">
            Connect with peers, learn from mentors, and grow together
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'discussions'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            💬 Discussions
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'mentors'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            👨‍🏫 Find Mentors
          </button>
          <button
            onClick={() => setActiveTab('study-rooms')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'study-rooms'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📚 Study Rooms
          </button>
        </div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${
                        selectedCategory === cat.id
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Create New */}
              <button className="w-full bg-purple-600 text-white py-4 rounded-lg hover:shadow-lg transition font-medium">
                + Start New Discussion
              </button>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {selectedDiscussion ? (
                // Discussion Detail View
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <button
                      onClick={() => setSelectedDiscussion(null)}
                      className="text-purple-600 hover:text-purple-700 mb-4 flex items-center gap-2"
                    >
                      ← Back to discussions
                    </button>
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{selectedDiscussion.authorAvatar}</div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedDiscussion.title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="font-medium">{selectedDiscussion.author}</span>
                          <span>•</span>
                          <span>{selectedDiscussion.timestamp}</span>
                          <span>•</span>
                          <span>{selectedDiscussion.views} views</span>
                        </div>
                      </div>
                      {selectedDiscussion.isResolved && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          ✓ Resolved
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4">{selectedDiscussion.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedDiscussion.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {selectedDiscussion.likes}
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {selectedDiscussion.comments}
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-4">
                      {selectedDiscussion.comments} Comments
                    </h3>

                    <div className="space-y-6 mb-6">
                      {comments[selectedDiscussion.id]?.map((comment) => (
                        <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
                          <div className="flex items-start gap-3">
                            <div className="text-3xl">{comment.authorAvatar}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900">
                                  {comment.author}
                                </span>
                                {comment.isMentor && (
                                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                    Mentor
                                  </span>
                                )}
                                <span className="text-sm text-gray-500">
                                  {comment.timestamp}
                                </span>
                              </div>
                              <p className="text-gray-700 mb-2">{comment.content}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <button className="text-gray-600 hover:text-purple-600 flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                  </svg>
                                  {comment.likes}
                                </button>
                                <button className="text-gray-600 hover:text-purple-600">
                                  Reply
                                </button>
                              </div>

                              {/* Replies */}
                              {comment.replies.length > 0 && (
                                <div className="mt-4 space-y-4">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex items-start gap-3">
                                      <div className="text-2xl">{reply.authorAvatar}</div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-medium text-gray-900">
                                            {reply.author}
                                          </span>
                                          {reply.isMentor && (
                                            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                              Mentor
                                            </span>
                                          )}
                                          <span className="text-sm text-gray-500">
                                            {reply.timestamp}
                                          </span>
                                        </div>
                                        <p className="text-gray-700 text-sm mb-1">
                                          {reply.content}
                                        </p>
                                        <button className="text-gray-600 hover:text-purple-600 flex items-center gap-1 text-xs">
                                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                          </svg>
                                          {reply.likes}
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Add your comment</h4>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={4}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                      />
                      <div className="flex justify-end mt-3">
                        <button
                          onClick={handlePostComment}
                          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Discussion List View
                <div className="space-y-4">
                  {filteredDiscussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      onClick={() => setSelectedDiscussion(discussion)}
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{discussion.authorAvatar}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600">
                              {discussion.title}
                            </h3>
                            {discussion.isResolved && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                ✓ Resolved
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {discussion.content}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {discussion.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                              <span className="font-medium">{discussion.author}</span>
                              <span>•</span>
                              <span>{discussion.timestamp}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                👍 {discussion.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                💬 {discussion.comments}
                              </span>
                              <span className="flex items-center gap-1">
                                👁️ {discussion.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Find Expert Mentors</h2>
                <div className="flex gap-3">
                  <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                    <option>All Expertise</option>
                    <option>System Design</option>
                    <option>Algorithms</option>
                    <option>Frontend</option>
                    <option>Backend</option>
                  </select>
                  <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                    <option>Sort by Rating</option>
                    <option>Sort by Price</option>
                    <option>Sort by Reviews</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{mentor.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                      <p className="text-purple-600 font-medium">{mentor.title}</p>
                      <p className="text-gray-600 text-sm">{mentor.company}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          {'⭐'.repeat(Math.floor(mentor.rating))}
                        </div>
                        <span className="font-bold">{mentor.rating}</span>
                        <span className="text-gray-500 text-sm">
                          ({mentor.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        ${mentor.pricePerHour}
                      </div>
                      <div className="text-sm text-gray-600">per hour</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{mentor.bio}</p>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Expertise:</div>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">
                      ✓ {mentor.sessionsCompleted} sessions completed
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      {mentor.availability}
                    </div>
                  </div>

                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition font-medium">
                    Book Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Rooms Tab */}
        {activeTab === 'study-rooms' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Group Study Rooms</h2>
                  <p className="text-gray-600">Join live study sessions and learn together</p>
                </div>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition font-medium">
                  + Create Study Room
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studyRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{room.title}</h3>
                    {room.isLive && (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                        LIVE
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{room.hostAvatar}</div>
                    <div>
                      <div className="text-sm text-gray-600">Hosted by</div>
                      <div className="font-medium">{room.host}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{room.topic}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-gray-600">Start Time</div>
                      <div className="font-medium">{room.startTime}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Duration</div>
                      <div className="font-medium">{room.duration}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Level</div>
                      <div className="font-medium">{room.level}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Participants</div>
                      <div className="font-medium">
                        {room.participants}/{room.maxParticipants}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-purple-600 h-full"
                        style={{
                          width: `${(room.participants / room.maxParticipants) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-medium transition ${
                      room.participants >= room.maxParticipants
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : room.isLive
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                    disabled={room.participants >= room.maxParticipants}
                  >
                    {room.participants >= room.maxParticipants
                      ? 'Room Full'
                      : room.isLive
                      ? 'Join Now'
                      : 'Reserve Spot'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
