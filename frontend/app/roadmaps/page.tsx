'use client';

import React, { useState } from 'react';

type RoadmapType = 'frontend' | 'backend' | 'fullstack' | 'ai' | 'blockchain';

interface Milestone {
  id: string;
  level: string;
  duration: string;
  skills: string[];
  projects: string[];
  resources: string[];
  completed?: boolean;
}

interface Roadmap {
  id: RoadmapType;
  title: string;
  description: string;
  color: string;
  icon: string;
  totalDuration: string;
  milestones: Milestone[];
}

export default function RoadmapsPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapType>('fullstack');
  const [completedMilestones, setCompletedMilestones] = useState<Set<string>>(new Set());
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);

  const roadmaps: Record<RoadmapType, Roadmap> = {
    frontend: {
      id: 'frontend',
      title: 'Frontend Developer',
      description: 'Master modern frontend development with React, TypeScript, and cutting-edge tools',
      color: 'from-blue-500 to-cyan-500',
      icon: '🎨',
      totalDuration: '6-9 months',
      milestones: [
        {
          id: 'fe-1',
          level: 'Fundamentals',
          duration: '6-8 weeks',
          skills: [
            'HTML5 & Semantic Markup',
            'CSS3, Flexbox & Grid',
            'JavaScript ES6+',
            'DOM Manipulation',
            'Git & GitHub',
            'Responsive Design',
            'Browser DevTools'
          ],
          projects: [
            'Personal Portfolio Website',
            'Restaurant Landing Page',
            'Todo List with Local Storage',
            'Weather App with API'
          ],
          resources: [
            'MDN Web Docs',
            'freeCodeCamp',
            'JavaScript.info',
            'CSS Tricks'
          ]
        },
        {
          id: 'fe-2',
          level: 'React Basics',
          duration: '6-8 weeks',
          skills: [
            'React Components & JSX',
            'State & Props',
            'Hooks (useState, useEffect)',
            'Event Handling',
            'Conditional Rendering',
            'Lists & Keys',
            'Forms & Controlled Components'
          ],
          projects: [
            'Shopping Cart Application',
            'Movie Search App (TMDB API)',
            'Social Media Dashboard',
            'Recipe Finder App'
          ],
          resources: [
            'React Official Docs',
            'React Beta Docs',
            'Scrimba React Course',
            'React Patterns'
          ]
        },
        {
          id: 'fe-3',
          level: 'Advanced React',
          duration: '6-8 weeks',
          skills: [
            'React Router',
            'Context API & useContext',
            'useReducer & Complex State',
            'Custom Hooks',
            'Performance Optimization',
            'Code Splitting & Lazy Loading',
            'Error Boundaries'
          ],
          projects: [
            'E-commerce Platform',
            'Real-time Chat Application',
            'Project Management Tool (Trello Clone)',
            'Video Streaming Platform'
          ],
          resources: [
            'Epic React by Kent C. Dodds',
            'React Advanced Patterns',
            'Testing Library',
            'React Performance'
          ]
        },
        {
          id: 'fe-4',
          level: 'Modern Stack',
          duration: '8-10 weeks',
          skills: [
            'TypeScript with React',
            'Next.js & SSR',
            'State Management (Redux/Zustand)',
            'React Query / SWR',
            'CSS-in-JS (styled-components)',
            'Tailwind CSS',
            'Testing (Jest, React Testing Library)'
          ],
          projects: [
            'Full-stack Blog with Next.js',
            'Real Estate Listing Platform',
            'Analytics Dashboard',
            'Multi-vendor Marketplace'
          ],
          resources: [
            'Next.js Docs',
            'TypeScript Handbook',
            'TotalTypeScript',
            'Testing JavaScript'
          ]
        },
        {
          id: 'fe-5',
          level: 'Professional',
          duration: '6-8 weeks',
          skills: [
            'Design Systems & Component Libraries',
            'Accessibility (WCAG)',
            'Web Performance Optimization',
            'SEO Best Practices',
            'CI/CD Pipelines',
            'Progressive Web Apps',
            'Micro-frontends'
          ],
          projects: [
            'Design System & Storybook',
            'Enterprise Dashboard',
            'PWA with Offline Support',
            'Open Source Contribution'
          ],
          resources: [
            'web.dev',
            'A11y Project',
            'Lighthouse',
            'Webpack Academy'
          ]
        }
      ]
    },
    backend: {
      id: 'backend',
      title: 'Backend Developer',
      description: 'Build scalable server-side applications with Node.js, databases, and APIs',
      color: 'from-green-500 to-emerald-500',
      icon: '⚙️',
      totalDuration: '6-9 months',
      milestones: [
        {
          id: 'be-1',
          level: 'Fundamentals',
          duration: '6-8 weeks',
          skills: [
            'JavaScript/Node.js Basics',
            'npm & Package Management',
            'Express.js Framework',
            'RESTful API Design',
            'HTTP Methods & Status Codes',
            'Middleware Concepts',
            'Environment Variables'
          ],
          projects: [
            'Basic REST API Server',
            'User Authentication System',
            'Blog API with CRUD',
            'Task Management API'
          ],
          resources: [
            'Node.js Official Docs',
            'Express.js Guide',
            'Postman Learning Center',
            'REST API Tutorial'
          ]
        },
        {
          id: 'be-2',
          level: 'Databases',
          duration: '6-8 weeks',
          skills: [
            'SQL & PostgreSQL',
            'MongoDB & Mongoose',
            'Database Design & Normalization',
            'ORMs (Sequelize/Prisma)',
            'Indexing & Query Optimization',
            'Transactions & ACID',
            'Data Migration'
          ],
          projects: [
            'E-commerce Database Schema',
            'Social Network Data Model',
            'Analytics System',
            'Content Management System'
          ],
          resources: [
            'PostgreSQL Tutorial',
            'MongoDB University',
            'SQL Practice',
            'Database Design Course'
          ]
        },
        {
          id: 'be-3',
          level: 'Authentication & Security',
          duration: '4-6 weeks',
          skills: [
            'JWT & Session Management',
            'OAuth 2.0 & Social Login',
            'Password Hashing (bcrypt)',
            'CORS & Security Headers',
            'Input Validation & Sanitization',
            'Rate Limiting',
            'SQL Injection Prevention'
          ],
          projects: [
            'Secure Authentication Service',
            'Multi-tenant SaaS Backend',
            'Role-based Access Control',
            'OAuth Provider Integration'
          ],
          resources: [
            'OWASP Top 10',
            'JWT.io',
            'Auth0 Blog',
            'Web Security Academy'
          ]
        },
        {
          id: 'be-4',
          level: 'Advanced Backend',
          duration: '8-10 weeks',
          skills: [
            'GraphQL & Apollo Server',
            'WebSockets & Real-time',
            'Message Queues (RabbitMQ/Redis)',
            'Caching Strategies',
            'File Upload & Storage (S3)',
            'Email & SMS Integration',
            'Payment Gateway (Stripe)'
          ],
          projects: [
            'Real-time Collaboration Platform',
            'GraphQL API Server',
            'Background Job Processing',
            'Notification System'
          ],
          resources: [
            'GraphQL Official Docs',
            'Socket.io Guide',
            'Redis University',
            'AWS Documentation'
          ]
        },
        {
          id: 'be-5',
          level: 'Production Ready',
          duration: '6-8 weeks',
          skills: [
            'Microservices Architecture',
            'Docker & Containerization',
            'Kubernetes Basics',
            'CI/CD with GitHub Actions',
            'Logging & Monitoring (ELK)',
            'Load Balancing & Scaling',
            'API Documentation (Swagger)'
          ],
          projects: [
            'Microservices E-commerce',
            'Dockerized Application',
            'Auto-scaling API Service',
            'Production Monitoring Setup'
          ],
          resources: [
            'Docker Docs',
            'Kubernetes Tutorial',
            'System Design Primer',
            'Site Reliability Engineering'
          ]
        }
      ]
    },
    fullstack: {
      id: 'fullstack',
      title: 'Full Stack Developer',
      description: 'Combine frontend and backend skills to build complete web applications',
      color: 'from-purple-500 to-pink-500',
      icon: '🚀',
      totalDuration: '10-12 months',
      milestones: [
        {
          id: 'fs-1',
          level: 'Web Fundamentals',
          duration: '8-10 weeks',
          skills: [
            'HTML, CSS, JavaScript',
            'Responsive Design',
            'Git & Version Control',
            'Command Line Basics',
            'HTTP & Web Protocols',
            'Browser & Server Basics',
            'API Fundamentals'
          ],
          projects: [
            'Portfolio Website',
            'Landing Page with Forms',
            'Multi-page Website',
            'Simple REST API'
          ],
          resources: [
            'MDN Web Docs',
            'freeCodeCamp',
            'The Odin Project',
            'Web.dev'
          ]
        },
        {
          id: 'fs-2',
          level: 'Frontend Mastery',
          duration: '10-12 weeks',
          skills: [
            'React.js & Components',
            'State Management (Redux)',
            'React Router',
            'TypeScript',
            'CSS Frameworks (Tailwind)',
            'API Integration',
            'Form Handling & Validation'
          ],
          projects: [
            'Social Media Dashboard',
            'E-commerce Frontend',
            'Admin Panel',
            'Real-time Chat UI'
          ],
          resources: [
            'React Docs',
            'TypeScript Handbook',
            'Redux Toolkit',
            'Tailwind CSS'
          ]
        },
        {
          id: 'fs-3',
          level: 'Backend Development',
          duration: '10-12 weeks',
          skills: [
            'Node.js & Express',
            'RESTful API Design',
            'MongoDB & PostgreSQL',
            'Authentication & JWT',
            'File Upload & Storage',
            'Email Integration',
            'Error Handling'
          ],
          projects: [
            'User Authentication API',
            'Blog API with Database',
            'File Sharing Service',
            'RESTful Task Manager'
          ],
          resources: [
            'Node.js Docs',
            'Express Guide',
            'MongoDB University',
            'PostgreSQL Tutorial'
          ]
        },
        {
          id: 'fs-4',
          level: 'Full Stack Integration',
          duration: '10-12 weeks',
          skills: [
            'Next.js Full Stack',
            'Server-Side Rendering',
            'API Routes',
            'Database Integration',
            'Authentication Flow',
            'State Management',
            'Deployment (Vercel/Railway)'
          ],
          projects: [
            'Full Stack E-commerce',
            'Social Media Platform',
            'Project Management Tool',
            'Learning Management System'
          ],
          resources: [
            'Next.js Docs',
            'Full Stack Open',
            'Prisma Docs',
            'Deployment Guides'
          ]
        },
        {
          id: 'fs-5',
          level: 'Advanced & DevOps',
          duration: '8-10 weeks',
          skills: [
            'Docker & Containerization',
            'CI/CD Pipelines',
            'AWS/Cloud Services',
            'GraphQL',
            'WebSockets & Real-time',
            'Testing (Jest, Cypress)',
            'Performance Optimization'
          ],
          projects: [
            'Microservices Application',
            'Real-time Collaboration Tool',
            'Scalable SaaS Platform',
            'Open Source Contribution'
          ],
          resources: [
            'Docker Tutorial',
            'AWS Free Tier',
            'GraphQL Docs',
            'Testing Library'
          ]
        },
        {
          id: 'fs-6',
          level: 'Professional',
          duration: '6-8 weeks',
          skills: [
            'System Design',
            'Architecture Patterns',
            'Security Best Practices',
            'Code Review',
            'Agile Methodologies',
            'Team Collaboration',
            'Technical Documentation'
          ],
          projects: [
            'Enterprise Application',
            'System Design Portfolio',
            'Mentoring Junior Developers',
            'Technical Blog/YouTube'
          ],
          resources: [
            'System Design Primer',
            'Clean Code',
            'Designing Data-Intensive Apps',
            'Software Engineering at Google'
          ]
        }
      ]
    },
    ai: {
      id: 'ai',
      title: 'AI Engineer',
      description: 'Build intelligent applications with machine learning and AI technologies',
      color: 'from-orange-500 to-red-500',
      icon: '🤖',
      totalDuration: '8-12 months',
      milestones: [
        {
          id: 'ai-1',
          level: 'Programming Foundation',
          duration: '6-8 weeks',
          skills: [
            'Python Advanced',
            'NumPy & Pandas',
            'Data Structures',
            'Algorithms',
            'Jupyter Notebooks',
            'Git & GitHub',
            'Linux Command Line'
          ],
          projects: [
            'Data Analysis Tool',
            'CSV Parser & Analyzer',
            'Web Scraper',
            'Automation Scripts'
          ],
          resources: [
            'Python Docs',
            'NumPy Tutorial',
            'Pandas Guide',
            'Automate Boring Stuff'
          ]
        },
        {
          id: 'ai-2',
          level: 'Math & Statistics',
          duration: '6-8 weeks',
          skills: [
            'Linear Algebra',
            'Calculus & Derivatives',
            'Probability & Statistics',
            'Data Visualization (Matplotlib)',
            'Statistical Analysis',
            'Hypothesis Testing',
            'Correlation & Regression'
          ],
          projects: [
            'Statistical Analysis Dashboard',
            'Data Visualization Portfolio',
            'A/B Testing Framework',
            'Predictive Analytics Tool'
          ],
          resources: [
            'Khan Academy',
            '3Blue1Brown',
            'StatQuest',
            'Mathematics for ML'
          ]
        },
        {
          id: 'ai-3',
          level: 'Machine Learning',
          duration: '8-10 weeks',
          skills: [
            'Scikit-learn',
            'Supervised Learning',
            'Classification & Regression',
            'Unsupervised Learning',
            'Feature Engineering',
            'Model Evaluation',
            'Cross-validation'
          ],
          projects: [
            'House Price Prediction',
            'Customer Segmentation',
            'Spam Email Classifier',
            'Recommendation System'
          ],
          resources: [
            'Coursera ML by Andrew Ng',
            'Scikit-learn Docs',
            'Kaggle Learn',
            'Hands-On ML Book'
          ]
        },
        {
          id: 'ai-4',
          level: 'Deep Learning',
          duration: '10-12 weeks',
          skills: [
            'TensorFlow & Keras',
            'PyTorch',
            'Neural Networks',
            'CNNs for Computer Vision',
            'RNNs & LSTMs',
            'Transfer Learning',
            'GPU Computing'
          ],
          projects: [
            'Image Classification Model',
            'Object Detection System',
            'Time Series Forecasting',
            'Sentiment Analysis Tool'
          ],
          resources: [
            'Fast.ai',
            'Deep Learning Specialization',
            'PyTorch Tutorials',
            'Papers with Code'
          ]
        },
        {
          id: 'ai-5',
          level: 'NLP & Transformers',
          duration: '8-10 weeks',
          skills: [
            'Natural Language Processing',
            'BERT, GPT Models',
            'Hugging Face Transformers',
            'Text Preprocessing',
            'Named Entity Recognition',
            'Question Answering',
            'Text Generation'
          ],
          projects: [
            'Chatbot with NLP',
            'Text Summarization Tool',
            'Language Translation App',
            'Sentiment Analysis API'
          ],
          resources: [
            'Hugging Face Course',
            'NLP with Transformers',
            'Stanford NLP',
            'OpenAI Cookbook'
          ]
        },
        {
          id: 'ai-6',
          level: 'MLOps & Production',
          duration: '6-8 weeks',
          skills: [
            'Model Deployment',
            'FastAPI & Flask',
            'Docker for ML',
            'Cloud Platforms (AWS/GCP)',
            'MLflow & Experiment Tracking',
            'Model Monitoring',
            'CI/CD for ML'
          ],
          projects: [
            'ML Model API Service',
            'End-to-end ML Pipeline',
            'Real-time Prediction System',
            'ML Monitoring Dashboard'
          ],
          resources: [
            'MLOps Community',
            'AWS SageMaker',
            'Google Vertex AI',
            'Full Stack Deep Learning'
          ]
        }
      ]
    },
    blockchain: {
      id: 'blockchain',
      title: 'Blockchain Developer',
      description: 'Build decentralized applications and smart contracts on blockchain',
      color: 'from-yellow-500 to-orange-500',
      icon: '⛓️',
      totalDuration: '6-10 months',
      milestones: [
        {
          id: 'bc-1',
          level: 'Blockchain Basics',
          duration: '4-6 weeks',
          skills: [
            'Blockchain Fundamentals',
            'Cryptography Basics',
            'Bitcoin & Cryptocurrency',
            'Consensus Mechanisms',
            'Wallets & Keys',
            'Blockchain Architecture',
            'Distributed Ledger'
          ],
          projects: [
            'Simple Blockchain in Python',
            'Cryptocurrency Wallet',
            'Block Explorer Clone',
            'Hash Function Visualizer'
          ],
          resources: [
            'Blockchain Basics',
            'Bitcoin Whitepaper',
            'Coursera Blockchain',
            'CryptoZombies'
          ]
        },
        {
          id: 'bc-2',
          level: 'Ethereum & Solidity',
          duration: '8-10 weeks',
          skills: [
            'Solidity Programming',
            'Smart Contracts',
            'Ethereum Virtual Machine',
            'Web3.js & Ethers.js',
            'Remix IDE',
            'Gas Optimization',
            'Contract Testing'
          ],
          projects: [
            'ERC-20 Token',
            'NFT Collection',
            'Voting Smart Contract',
            'Multi-signature Wallet'
          ],
          resources: [
            'Solidity Docs',
            'Ethereum.org',
            'OpenZeppelin',
            'Solidity by Example'
          ]
        },
        {
          id: 'bc-3',
          level: 'DApp Development',
          duration: '8-10 weeks',
          skills: [
            'React with Web3',
            'MetaMask Integration',
            'IPFS & Decentralized Storage',
            'The Graph & Indexing',
            'Wallet Connect',
            'Frontend Integration',
            'Transaction Handling'
          ],
          projects: [
            'Decentralized Marketplace',
            'NFT Minting Platform',
            'DeFi Dashboard',
            'DAO Governance Platform'
          ],
          resources: [
            'Web3.js Docs',
            'Ethers.js Guide',
            'Moralis',
            'Alchemy University'
          ]
        },
        {
          id: 'bc-4',
          level: 'DeFi & Advanced',
          duration: '8-10 weeks',
          skills: [
            'DeFi Protocols',
            'AMM & Liquidity Pools',
            'Yield Farming',
            'Lending & Borrowing',
            'Oracle Integration (Chainlink)',
            'Layer 2 Solutions',
            'Cross-chain Bridges'
          ],
          projects: [
            'Decentralized Exchange (DEX)',
            'Lending Protocol',
            'Staking Platform',
            'Yield Aggregator'
          ],
          resources: [
            'Uniswap Docs',
            'Aave Documentation',
            'Chainlink Docs',
            'DeFi Developer Roadmap'
          ]
        },
        {
          id: 'bc-5',
          level: 'Security & Auditing',
          duration: '6-8 weeks',
          skills: [
            'Smart Contract Security',
            'Common Vulnerabilities',
            'Reentrancy Attacks',
            'Access Control',
            'Testing with Hardhat',
            'Security Tools (Slither)',
            'Audit Best Practices'
          ],
          projects: [
            'Security Audit Report',
            'Vulnerable Contract Fixes',
            'Security Testing Suite',
            'Bug Bounty Participation'
          ],
          resources: [
            'Smart Contract Security',
            'OpenZeppelin Security',
            'Consensys Best Practices',
            'Secureum'
          ]
        },
        {
          id: 'bc-6',
          level: 'Professional',
          duration: '4-6 weeks',
          skills: [
            'Multi-chain Development',
            'Polygon, BSC, Arbitrum',
            'Advanced Architecture',
            'Tokenomics Design',
            'Community Building',
            'Documentation',
            'Open Source Contribution'
          ],
          projects: [
            'Cross-chain Application',
            'Full DApp with Backend',
            'Token Launch Project',
            'Open Source Smart Contracts'
          ],
          resources: [
            'Polygon Docs',
            'Optimism Guide',
            'Web3 University',
            'Buildspace'
          ]
        }
      ]
    }
  };

  const currentRoadmap = roadmaps[selectedRoadmap];

  const toggleMilestone = (milestoneId: string) => {
    const newCompleted = new Set(completedMilestones);
    if (newCompleted.has(milestoneId)) {
      newCompleted.delete(milestoneId);
    } else {
      newCompleted.add(milestoneId);
    }
    setCompletedMilestones(newCompleted);
  };

  const calculateProgress = () => {
    const total = currentRoadmap.milestones.length;
    const completed = currentRoadmap.milestones.filter(m => 
      completedMilestones.has(m.id)
    ).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Career Roadmaps 🗺️</h1>
          <p className="text-gray-600 text-lg">
            Choose your path and follow a structured learning journey to achieve your career goals
          </p>
        </div>

        {/* Roadmap Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {Object.values(roadmaps).map((roadmap) => (
            <button
              key={roadmap.id}
              onClick={() => setSelectedRoadmap(roadmap.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedRoadmap === roadmap.id
                  ? `bg-linear-to-r ${roadmap.color} text-white border-transparent shadow-lg scale-105`
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="text-4xl mb-3">{roadmap.icon}</div>
              <h3 className="font-bold text-lg mb-1">{roadmap.title}</h3>
              <p className={`text-sm ${
                selectedRoadmap === roadmap.id ? 'text-white/90' : 'text-gray-600'
              }`}>
                {roadmap.totalDuration}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Roadmap Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-5xl">{currentRoadmap.icon}</span>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {currentRoadmap.title} Roadmap
                  </h2>
                  <p className="text-gray-600 mt-1">{currentRoadmap.description}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{calculateProgress()}%</div>
              <div className="text-sm text-gray-600">Complete</div>
              <div className="text-xs text-gray-500 mt-1">
                {currentRoadmap.milestones.filter(m => completedMilestones.has(m.id)).length} / {currentRoadmap.milestones.length} milestones
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-linear-to-r ${currentRoadmap.color} transition-all duration-500`}
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>

          {/* Total Duration Badge */}
          <div className="flex items-center gap-2 mb-8">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700 font-medium">
              Total Duration: <strong>{currentRoadmap.totalDuration}</strong>
            </span>
            <span className="text-gray-500 text-sm ml-2">
              • {currentRoadmap.milestones.length} milestones to complete
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-linear-to-b from-gray-300 via-gray-200 to-gray-300" />

          {/* Milestones */}
          <div className="space-y-8">
            {currentRoadmap.milestones.map((milestone, index) => {
              const isCompleted = completedMilestones.has(milestone.id);
              const isExpanded = expandedMilestone === milestone.id;

              return (
                <div key={milestone.id} className="relative pl-20">
                  {/* Timeline Node */}
                  <div
                    className={`absolute left-4 w-9 h-9 rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-pointer transition-all ${
                      isCompleted
                        ? `bg-linear-to-r ${currentRoadmap.color}`
                        : 'bg-white border-gray-300'
                    }`}
                    onClick={() => toggleMilestone(milestone.id)}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-sm font-bold text-gray-400">{index + 1}</span>
                    )}
                  </div>

                  {/* Milestone Card */}
                  <div
                    className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                      isCompleted ? 'opacity-75' : ''
                    }`}
                  >
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {milestone.level}
                            </h3>
                            {isCompleted && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                ✓ Completed
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {milestone.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {milestone.skills.length} skills
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                              {milestone.projects.length} projects
                            </span>
                          </div>
                        </div>
                        <svg
                          className={`w-6 h-6 text-gray-400 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Skills */}
                          <div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              Skills to Learn
                            </h4>
                            <ul className="space-y-2">
                              {milestone.skills.map((skill, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-700">
                                  <span className={`mt-1 w-2 h-2 rounded-full bg-blue-600 shrink-0`} />
                                  <span>{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Projects */}
                          <div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                              Projects to Build
                            </h4>
                            <ul className="space-y-2">
                              {milestone.projects.map((project, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-700">
                                  <span className="mt-1 text-green-600">✓</span>
                                  <span>{project}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Resources */}
                        <div className="mt-6">
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Learning Resources
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {milestone.resources.map((resource, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                              >
                                📚 {resource}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 flex gap-3">
                          <button
                            onClick={() => toggleMilestone(milestone.id)}
                            className={`px-6 py-2 rounded-lg font-medium transition ${
                              isCompleted
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : `bg-blue-600 text-white hover:shadow-lg`
                            }`}
                          >
                            {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                          </button>
                          <button className="px-6 py-2 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
                            View Resources
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {currentRoadmap.milestones.filter(m => completedMilestones.has(m.id)).length}
              </div>
              <div className="text-gray-600 mt-1">Milestones Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {currentRoadmap.milestones.length - currentRoadmap.milestones.filter(m => completedMilestones.has(m.id)).length}
              </div>
              <div className="text-gray-600 mt-1">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {currentRoadmap.milestones.reduce((acc, m) => acc + m.skills.length, 0)}
              </div>
              <div className="text-gray-600 mt-1">Total Skills</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {currentRoadmap.milestones.reduce((acc, m) => acc + m.projects.length, 0)}
              </div>
              <div className="text-gray-600 mt-1">Total Projects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
