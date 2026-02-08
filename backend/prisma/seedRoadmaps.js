const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedRoadmaps() {
  console.log('🗺️  Seeding Career Roadmaps...\n');

  // ============================================================================
  // FULL STACK DEVELOPER ROADMAP
  // ============================================================================

  // Delete existing roadmap if it exists
  await prisma.roadmap.deleteMany({
    where: {
      slug: 'full-stack-developer'
    }
  });

  const fullStackRoadmap = await prisma.roadmap.create({
    data: {
      slug: 'full-stack-developer',
      title: 'Full Stack Developer',
      description: 'Master both frontend and backend development to build complete web applications from scratch.',
      icon: '🚀',
      level: 'Advanced',
      duration: '10-12 months',
      gradient: 'from-purple-500 to-pink-500',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
      popularity: 98,
      order: 1,
      phases: {
        create: [
          {
            title: 'Phase 0: Foundations',
            description: 'Build a strong foundation in web development fundamentals',
            order: 0,
            steps: {
              create: [
                {
                  title: 'How the Web Works',
                  description: 'Understand the fundamental concepts of how the internet and web browsers work, including HTTP/HTTPS protocols, DNS, domain names, hosting, and client-server architecture.',
                  difficulty: 'Beginner',
                  estimatedTime: '3-5 days',
                  order: 0,
                  topics: ['HTTP/HTTPS', 'DNS', 'Domain Names', 'Hosting', 'Browsers', 'Client-Server Model'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'How the Internet Works in 5 Minutes',
                      url: 'https://www.youtube.com/watch?v=7_LPdttKXPc',
                      description: 'Quick overview of internet fundamentals'
                    },
                    {
                      type: 'article',
                      title: 'MDN - How the Web Works',
                      url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works',
                      description: 'Comprehensive guide by Mozilla'
                    },
                    {
                      type: 'video',
                      title: 'HTTP Crash Course',
                      url: 'https://www.youtube.com/watch?v=iYM2zFP3Zn0',
                      description: 'Deep dive into HTTP protocol'
                    },
                    {
                      type: 'interactive',
                      title: 'How DNS Works',
                      url: 'https://howdns.works/',
                      description: 'Interactive comic explaining DNS'
                    }
                  ],
                  checkpoints: [
                    'Explain the difference between HTTP and HTTPS',
                    'Describe how DNS resolution works',
                    'Understand the request-response cycle',
                    'Know the difference between client-side and server-side'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Version Control with Git & GitHub',
                  description: 'Learn version control fundamentals using Git and collaborate on GitHub. Master branching, merging, pull requests, and collaboration workflows.',
                  difficulty: 'Beginner',
                  estimatedTime: '1 week',
                  order: 1,
                  topics: ['Git Basics', 'GitHub', 'Branching', 'Merging', 'Pull Requests', 'Collaboration'],
                  prerequisites: ['Command Line Basics'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Git and GitHub for Beginners',
                      url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
                      description: 'Complete Git tutorial by freeCodeCamp'
                    },
                    {
                      type: 'documentation',
                      title: 'Git Documentation',
                      url: 'https://git-scm.com/doc',
                      description: 'Official Git documentation'
                    },
                    {
                      type: 'interactive',
                      title: 'Learn Git Branching',
                      url: 'https://learngitbranching.js.org/',
                      description: 'Interactive Git visualization tool'
                    },
                    {
                      type: 'cheatsheet',
                      title: 'GitHub Git Cheat Sheet',
                      url: 'https://education.github.com/git-cheat-sheet-education.pdf',
                      description: 'Quick reference for Git commands'
                    }
                  ],
                  checkpoints: [
                    'Initialize a Git repository',
                    'Make commits with meaningful messages',
                    'Create and merge branches',
                    'Resolve merge conflicts',
                    'Use GitHub for collaboration',
                    'Understand .gitignore files'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Command Line Interface (CLI) Basics',
                  description: 'Master the terminal/command line to navigate file systems, manage files, and run commands efficiently.',
                  difficulty: 'Beginner',
                  estimatedTime: '3-5 days',
                  order: 2,
                  topics: ['Terminal Navigation', 'File Operations', 'Permissions', 'Environment Variables', 'Shell Scripting Basics'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'Command Line Crash Course',
                      url: 'https://www.youtube.com/watch?v=yz7nYlnXLfE',
                      description: 'Terminal basics for beginners'
                    },
                    {
                      type: 'interactive',
                      title: 'The Command Line Challenge',
                      url: 'https://cmdchallenge.com/',
                      description: 'Practice CLI commands interactively'
                    },
                    {
                      type: 'article',
                      title: 'Linux Command Line Basics',
                      url: 'https://ubuntu.com/tutorials/command-line-for-beginners',
                      description: 'Ubuntu tutorial for beginners'
                    }
                  ],
                  checkpoints: [
                    'Navigate directories using cd, ls, pwd',
                    'Create, copy, move, and delete files',
                    'Understand file permissions',
                    'Use package managers (npm, apt, brew)',
                    'Run shell scripts'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 1: Frontend Basics',
            description: 'Build responsive websites with HTML, CSS, and JavaScript',
            order: 1,
            steps: {
              create: [
                {
                  title: 'HTML5 Fundamentals',
                  description: 'Learn semantic HTML5 to structure web content properly with accessibility in mind.',
                  difficulty: 'Beginner',
                  estimatedTime: '1-2 weeks',
                  order: 0,
                  topics: ['Semantic HTML', 'Forms', 'Tables', 'Multimedia', 'SEO Basics', 'Accessibility'],
                  prerequisites: ['How the Web Works'],
                  resources: [
                    {
                      type: 'course',
                      title: 'HTML Full Course - freeCodeCamp',
                      url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
                      description: 'Complete HTML tutorial for beginners'
                    },
                    {
                      type: 'documentation',
                      title: 'MDN HTML Guide',
                      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
                      description: 'Comprehensive HTML documentation'
                    },
                    {
                      type: 'practice',
                      title: 'HTML Exercises',
                      url: 'https://www.w3schools.com/html/html_exercises.asp',
                      description: 'Practice HTML concepts'
                    }
                  ],
                  checkpoints: [
                    'Create semantic HTML documents',
                    'Build accessible forms with validation',
                    'Use appropriate HTML5 elements',
                    'Implement meta tags for SEO',
                    'Understand document structure'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'CSS3 & Responsive Design',
                  description: 'Style websites with modern CSS3, including Flexbox, Grid, animations, and responsive design techniques.',
                  difficulty: 'Beginner',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['CSS Selectors', 'Box Model', 'Flexbox', 'Grid', 'Responsive Design', 'Animations', 'Transitions'],
                  prerequisites: ['HTML5 Fundamentals'],
                  resources: [
                    {
                      type: 'course',
                      title: 'CSS Complete Course - freeCodeCamp',
                      url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
                      description: 'Full CSS course for beginners'
                    },
                    {
                      type: 'game',
                      title: 'Flexbox Froggy',
                      url: 'https://flexboxfroggy.com/',
                      description: 'Learn Flexbox through games'
                    },
                    {
                      type: 'game',
                      title: 'Grid Garden',
                      url: 'https://cssgridgarden.com/',
                      description: 'Learn CSS Grid through games'
                    },
                    {
                      type: 'reference',
                      title: 'CSS Tricks - Complete Guide to Flexbox',
                      url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
                      description: 'Comprehensive Flexbox guide'
                    }
                  ],
                  checkpoints: [
                    'Style elements using various CSS selectors',
                    'Build layouts with Flexbox and Grid',
                    'Create responsive designs with media queries',
                    'Implement CSS animations and transitions',
                    'Understand the CSS box model',
                    'Use CSS variables'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'JavaScript Fundamentals',
                  description: 'Master JavaScript basics including variables, data types, functions, arrays, objects, and control flow.',
                  difficulty: 'Beginner',
                  estimatedTime: '3-4 weeks',
                  order: 2,
                  topics: ['Variables', 'Data Types', 'Functions', 'Arrays', 'Objects', 'Loops', 'Conditionals', 'Scope'],
                  prerequisites: ['HTML5 Fundamentals'],
                  resources: [
                    {
                      type: 'course',
                      title: 'JavaScript Programming - Full Course',
                      url: 'https://www.youtube.com/watch?v=jS4aFq5-91M',
                      description: 'Complete JavaScript course'
                    },
                    {
                      type: 'book',
                      title: 'JavaScript.info',
                      url: 'https://javascript.info/',
                      description: 'Modern JavaScript tutorial'
                    },
                    {
                      type: 'documentation',
                      title: 'MDN JavaScript Guide',
                      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
                      description: 'Official JavaScript documentation'
                    },
                    {
                      type: 'practice',
                      title: 'JavaScript30',
                      url: 'https://javascript30.com/',
                      description: '30 Day Vanilla JS Coding Challenge'
                    }
                  ],
                  checkpoints: [
                    'Understand JavaScript data types and variables',
                    'Write functions and arrow functions',
                    'Manipulate arrays and objects',
                    'Use loops and conditionals',
                    'Understand scope and hoisting',
                    'Work with callback functions'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: ['arrays', 'strings'],
                  relatedInterviews: []
                },
                {
                  title: 'DOM Manipulation & Events',
                  description: 'Learn to interact with web pages dynamically using JavaScript DOM APIs and event handling.',
                  difficulty: 'Beginner',
                  estimatedTime: '1-2 weeks',
                  order: 3,
                  topics: ['DOM Selection', 'DOM Manipulation', 'Event Listeners', 'Event Delegation', 'Local Storage', 'Form Handling'],
                  prerequisites: ['JavaScript Fundamentals', 'CSS3 & Responsive Design'],
                  resources: [
                    {
                      type: 'video',
                      title: 'JavaScript DOM Crash Course',
                      url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc',
                      description: 'Complete DOM manipulation tutorial'
                    },
                    {
                      type: 'documentation',
                      title: 'MDN DOM Introduction',
                      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction',
                      description: 'Official DOM documentation'
                    },
                    {
                      type: 'practice',
                      title: 'DOM Challenges',
                      url: 'https://www.codingame.com/playgrounds/2418/javascript-dom-tutorial',
                      description: 'Interactive DOM exercises'
                    }
                  ],
                  checkpoints: [
                    'Select elements using querySelector',
                    'Modify element content and styles',
                    'Add and remove event listeners',
                    'Handle form submissions',
                    'Use local storage for data persistence',
                    'Understand event bubbling and delegation'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Async JavaScript & APIs',
                  description: 'Master asynchronous JavaScript with Promises, async/await, and fetch data from REST APIs.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2-3 weeks',
                  order: 4,
                  topics: ['Callbacks', 'Promises', 'Async/Await', 'Fetch API', 'REST APIs', 'JSON', 'Error Handling'],
                  prerequisites: ['JavaScript Fundamentals', 'DOM Manipulation & Events'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Async JavaScript Crash Course',
                      url: 'https://www.youtube.com/watch?v=PoRJizFvM7s',
                      description: 'Complete async JavaScript tutorial'
                    },
                    {
                      type: 'article',
                      title: 'JavaScript Promises',
                      url: 'https://javascript.info/promise-basics',
                      description: 'Detailed promises guide'
                    },
                    {
                      type: 'video',
                      title: 'Fetch API Tutorial',
                      url: 'https://www.youtube.com/watch?v=Oive66jrwBs',
                      description: 'Working with APIs using Fetch'
                    }
                  ],
                  checkpoints: [
                    'Understand the JavaScript event loop',
                    'Use Promises effectively',
                    'Work with async/await syntax',
                    'Fetch data from REST APIs',
                    'Handle API errors properly',
                    'Parse and work with JSON data'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 2: Advanced Frontend',
            description: 'Master modern frontend development with React and TypeScript',
            order: 2,
            steps: {
              create: [
                {
                  title: 'Modern JavaScript (ES6+)',
                  description: 'Learn modern JavaScript features including destructuring, spread operator, modules, classes, and more.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2 weeks',
                  order: 0,
                  topics: ['ES6+ Features', 'Modules', 'Classes', 'Destructuring', 'Spread/Rest', 'Template Literals', 'Arrow Functions'],
                  prerequisites: ['JavaScript Fundamentals', 'Async JavaScript & APIs'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Modern JavaScript ES6+',
                      url: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc',
                      description: 'Complete ES6+ features tutorial'
                    },
                    {
                      type: 'article',
                      title: 'ES6 Features',
                      url: 'https://javascript.info/es6',
                      description: 'Modern JavaScript features explained'
                    },
                    {
                      type: 'documentation',
                      title: 'MDN JavaScript Reference',
                      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference',
                      description: 'Complete JavaScript reference'
                    }
                  ],
                  checkpoints: [
                    'Use destructuring for arrays and objects',
                    'Apply spread and rest operators',
                    'Work with ES6 modules (import/export)',
                    'Use template literals',
                    'Understand arrow function behavior',
                    'Use optional chaining and nullish coalescing'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'TypeScript Fundamentals',
                  description: 'Add static typing to JavaScript with TypeScript for better code quality and developer experience.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['Type Annotations', 'Interfaces', 'Types', 'Generics', 'Type Guards', 'Utility Types', 'Decorators'],
                  prerequisites: ['Modern JavaScript (ES6+)'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'TypeScript Handbook',
                      url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
                      description: 'Official TypeScript documentation'
                    },
                    {
                      type: 'video',
                      title: 'TypeScript Tutorial',
                      url: 'https://www.youtube.com/watch?v=d56mG7DezGs',
                      description: 'TypeScript crash course'
                    },
                    {
                      type: 'course',
                      title: 'TypeScript Deep Dive',
                      url: 'https://basarat.gitbook.io/typescript/',
                      description: 'Free TypeScript book'
                    }
                  ],
                  checkpoints: [
                    'Define types and interfaces',
                    'Use generic types',
                    'Implement type guards',
                    'Work with utility types',
                    'Configure tsconfig.json',
                    'Type third-party libraries'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'React.js Fundamentals',
                  description: 'Build interactive UIs with React components, hooks, and state management.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 2,
                  topics: ['JSX', 'Components', 'Props', 'State', 'Hooks', 'Event Handling', 'Conditional Rendering', 'Lists & Keys'],
                  prerequisites: ['Modern JavaScript (ES6+)', 'DOM Manipulation & Events'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'React Official Docs',
                      url: 'https://react.dev/',
                      description: 'Official React documentation'
                    },
                    {
                      type: 'video',
                      title: 'React Full Course',
                      url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
                      description: 'Complete React tutorial'
                    },
                    {
                      type: 'interactive',
                      title: 'React Tutorial',
                      url: 'https://react.dev/learn',
                      description: 'Interactive React tutorial'
                    }
                  ],
                  checkpoints: [
                    'Create functional components',
                    'Use useState and useEffect hooks',
                    'Pass props between components',
                    'Handle events in React',
                    'Render lists with keys',
                    'Implement conditional rendering',
                    'Understand component lifecycle'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'React State Management',
                  description: 'Master complex state management with Context API, useReducer, and Zustand/Redux.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2-3 weeks',
                  order: 3,
                  topics: ['Context API', 'useReducer', 'useContext', 'Zustand', 'Redux Toolkit', 'State Patterns'],
                  prerequisites: ['React.js Fundamentals'],
                  resources: [
                    {
                      type: 'video',
                      title: 'React Context & Hooks',
                      url: 'https://www.youtube.com/watch?v=35lXWvCuM8o',
                      description: 'Context API and hooks tutorial'
                    },
                    {
                      type: 'documentation',
                      title: 'Zustand Documentation',
                      url: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
                      description: 'Simple state management library'
                    },
                    {
                      type: 'documentation',
                      title: 'Redux Toolkit',
                      url: 'https://redux-toolkit.js.org/',
                      description: 'Official Redux Toolkit docs'
                    }
                  ],
                  checkpoints: [
                    'Use Context API for global state',
                    'Implement useReducer for complex state',
                    'Choose appropriate state management solution',
                    'Avoid prop drilling',
                    'Optimize re-renders',
                    'Handle async state updates'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'React Router & Navigation',
                  description: 'Implement client-side routing and navigation in React applications.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1-2 weeks',
                  order: 4,
                  topics: ['React Router', 'Routes', 'Navigation', 'URL Parameters', 'Protected Routes', 'Nested Routes'],
                  prerequisites: ['React.js Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'React Router Docs',
                      url: 'https://reactrouter.com/',
                      description: 'Official React Router documentation'
                    },
                    {
                      type: 'video',
                      title: 'React Router v6 Tutorial',
                      url: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU',
                      description: 'Complete routing tutorial'
                    }
                  ],
                  checkpoints: [
                    'Set up React Router',
                    'Create routes and navigation',
                    'Access URL parameters',
                    'Implement protected routes',
                    'Use nested routes',
                    'Handle 404 pages'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 3: Backend Development',
            description: 'Build scalable server-side applications with Node.js and databases',
            order: 3,
            steps: {
              create: [
                {
                  title: 'Node.js & Express.js',
                  description: 'Build backend servers with Node.js and Express framework.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['Node.js Runtime', 'npm', 'Express.js', 'Middleware', 'REST APIs', 'Error Handling', 'Environment Variables'],
                  prerequisites: ['JavaScript Fundamentals', 'Async JavaScript & APIs'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Node.js & Express Full Course',
                      url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
                      description: 'Complete Node.js tutorial'
                    },
                    {
                      type: 'documentation',
                      title: 'Node.js Documentation',
                      url: 'https://nodejs.org/docs/latest/api/',
                      description: 'Official Node.js docs'
                    },
                    {
                      type: 'documentation',
                      title: 'Express.js Guide',
                      url: 'https://expressjs.com/en/guide/routing.html',
                      description: 'Official Express documentation'
                    }
                  ],
                  checkpoints: [
                    'Create an Express server',
                    'Build RESTful API endpoints',
                    'Use middleware functions',
                    'Handle errors properly',
                    'Work with environment variables',
                    'Parse request bodies and query parameters'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'SQL Databases & PostgreSQL',
                  description: 'Learn relational databases, SQL queries, and PostgreSQL.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 1,
                  topics: ['SQL Basics', 'PostgreSQL', 'Database Design', 'Joins', 'Indexes', 'Transactions', 'Normalization'],
                  prerequisites: ['Node.js & Express.js'],
                  resources: [
                    {
                      type: 'video',
                      title: 'SQL Tutorial - Full Course',
                      url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
                      description: 'Complete SQL course'
                    },
                    {
                      type: 'documentation',
                      title: 'PostgreSQL Tutorial',
                      url: 'https://www.postgresql.org/docs/current/tutorial.html',
                      description: 'Official PostgreSQL tutorial'
                    },
                    {
                      type: 'interactive',
                      title: 'SQLBolt',
                      url: 'https://sqlbolt.com/',
                      description: 'Interactive SQL lessons'
                    }
                  ],
                  checkpoints: [
                    'Write SELECT, INSERT, UPDATE, DELETE queries',
                    'Use joins (INNER, LEFT, RIGHT)',
                    'Design normalized database schemas',
                    'Create indexes for performance',
                    'Use transactions',
                    'Understand foreign keys and constraints'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Prisma ORM',
                  description: 'Use Prisma as a modern ORM for type-safe database access.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1-2 weeks',
                  order: 2,
                  topics: ['Prisma Schema', 'Migrations', 'Queries', 'Relations', 'Prisma Client', 'Type Safety'],
                  prerequisites: ['SQL Databases & PostgreSQL', 'TypeScript Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Prisma Documentation',
                      url: 'https://www.prisma.io/docs',
                      description: 'Official Prisma docs'
                    },
                    {
                      type: 'video',
                      title: 'Prisma Course',
                      url: 'https://www.youtube.com/watch?v=RebA5J-rlwg',
                      description: 'Complete Prisma tutorial'
                    }
                  ],
                  checkpoints: [
                    'Define Prisma schema',
                    'Run migrations',
                    'Perform CRUD operations',
                    'Handle relations',
                    'Use Prisma Client',
                    'Seed databases'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Authentication & Authorization',
                  description: 'Implement secure authentication with JWT, sessions, and OAuth.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 3,
                  topics: ['JWT', 'Sessions', 'OAuth', 'Password Hashing', 'RBAC', 'Clerk', 'NextAuth'],
                  prerequisites: ['Node.js & Express.js', 'SQL Databases & PostgreSQL'],
                  resources: [
                    {
                      type: 'video',
                      title: 'JWT Authentication Tutorial',
                      url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4',
                      description: 'Complete JWT authentication guide'
                    },
                    {
                      type: 'documentation',
                      title: 'Clerk Documentation',
                      url: 'https://clerk.com/docs',
                      description: 'Modern authentication solution'
                    },
                    {
                      type: 'documentation',
                      title: 'NextAuth.js',
                      url: 'https://next-auth.js.org/',
                      description: 'Authentication for Next.js'
                    }
                  ],
                  checkpoints: [
                    'Hash passwords securely',
                    'Implement JWT authentication',
                    'Create protected routes',
                    'Set up OAuth providers',
                    'Implement role-based access control',
                    'Handle token refresh'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'NoSQL & MongoDB',
                  description: 'Learn document-based databases with MongoDB.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2 weeks',
                  order: 4,
                  topics: ['MongoDB', 'Collections', 'Documents', 'Queries', 'Aggregation', 'Mongoose', 'Indexing'],
                  prerequisites: ['Node.js & Express.js'],
                  resources: [
                    {
                      type: 'video',
                      title: 'MongoDB Crash Course',
                      url: 'https://www.youtube.com/watch?v=ofme2o29ngU',
                      description: 'Complete MongoDB tutorial'
                    },
                    {
                      type: 'documentation',
                      title: 'MongoDB Documentation',
                      url: 'https://www.mongodb.com/docs/',
                      description: 'Official MongoDB docs'
                    },
                    {
                      type: 'documentation',
                      title: 'Mongoose Guide',
                      url: 'https://mongoosejs.com/docs/guide.html',
                      description: 'Mongoose ODM documentation'
                    }
                  ],
                  checkpoints: [
                    'Create collections and documents',
                    'Perform CRUD operations',
                    'Use aggregation pipelines',
                    'Define Mongoose schemas',
                    'Create indexes',
                    'Understand when to use NoSQL vs SQL'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 4: Full Stack Integration',
            description: 'Integrate frontend and backend to build complete applications',
            order: 4,
            steps: {
              create: [
                {
                  title: 'Next.js Framework',
                  description: 'Build full-stack React applications with Next.js framework.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['App Router', 'Server Components', 'API Routes', 'SSR', 'SSG', 'ISR', 'Middleware', 'Metadata'],
                  prerequisites: ['React.js Fundamentals', 'Node.js & Express.js'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Next.js Documentation',
                      url: 'https://nextjs.org/docs',
                      description: 'Official Next.js docs'
                    },
                    {
                      type: 'video',
                      title: 'Next.js 14 Full Course',
                      url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
                      description: 'Complete Next.js tutorial'
                    },
                    {
                      type: 'course',
                      title: 'Next.js Learn',
                      url: 'https://nextjs.org/learn',
                      description: 'Official Next.js course'
                    }
                  ],
                  checkpoints: [
                    'Create Next.js applications',
                    'Use App Router',
                    'Build API routes',
                    'Implement server components',
                    'Optimize with SSR/SSG',
                    'Handle dynamic routes',
                    'Configure middleware'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'API Integration & Data Fetching',
                  description: 'Connect frontend to backend APIs with proper data fetching strategies.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2 weeks',
                  order: 1,
                  topics: ['Axios', 'React Query', 'SWR', 'Error Handling', 'Loading States', 'Caching', 'Optimistic Updates'],
                  prerequisites: ['React.js Fundamentals', 'Node.js & Express.js'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'React Query Docs',
                      url: 'https://tanstack.com/query/latest',
                      description: 'Powerful data fetching for React'
                    },
                    {
                      type: 'documentation',
                      title: 'SWR Documentation',
                      url: 'https://swr.vercel.app/',
                      description: 'React hooks for data fetching'
                    },
                    {
                      type: 'video',
                      title: 'React Query Tutorial',
                      url: 'https://www.youtube.com/watch?v=r8Dg0KVnfMA',
                      description: 'Complete React Query course'
                    }
                  ],
                  checkpoints: [
                    'Fetch data from APIs',
                    'Handle loading and error states',
                    'Implement caching strategies',
                    'Use React Query or SWR',
                    'Perform optimistic updates',
                    'Paginate data'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'File Upload & Storage',
                  description: 'Handle file uploads and integrate cloud storage solutions.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1-2 weeks',
                  order: 2,
                  topics: ['Multer', 'AWS S3', 'Cloudinary', 'File Validation', 'Presigned URLs', 'Image Optimization'],
                  prerequisites: ['Node.js & Express.js'],
                  resources: [
                    {
                      type: 'video',
                      title: 'File Upload with Node.js',
                      url: 'https://www.youtube.com/watch?v=srPXMt1Q0nY',
                      description: 'Complete file upload tutorial'
                    },
                    {
                      type: 'documentation',
                      title: 'AWS S3 Documentation',
                      url: 'https://docs.aws.amazon.com/s3/',
                      description: 'AWS S3 official docs'
                    },
                    {
                      type: 'documentation',
                      title: 'Cloudinary Docs',
                      url: 'https://cloudinary.com/documentation',
                      description: 'Image and video management'
                    }
                  ],
                  checkpoints: [
                    'Handle multipart form data',
                    'Upload files to cloud storage',
                    'Validate file types and sizes',
                    'Generate presigned URLs',
                    'Optimize images',
                    'Handle large files'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Real-time Features with WebSockets',
                  description: 'Implement real-time functionality using WebSockets and Socket.io.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 3,
                  topics: ['WebSockets', 'Socket.io', 'Real-time Chat', 'Broadcasting', 'Rooms', 'Namespaces'],
                  prerequisites: ['Node.js & Express.js', 'React.js Fundamentals'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Socket.io Tutorial',
                      url: 'https://www.youtube.com/watch?v=UUddpbgPEJM',
                      description: 'Complete Socket.io course'
                    },
                    {
                      type: 'documentation',
                      title: 'Socket.io Documentation',
                      url: 'https://socket.io/docs/v4/',
                      description: 'Official Socket.io docs'
                    }
                  ],
                  checkpoints: [
                    'Set up WebSocket server',
                    'Connect client to WebSocket',
                    'Emit and listen to events',
                    'Implement chat functionality',
                    'Use rooms and namespaces',
                    'Handle disconnections'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Testing Full Stack Apps',
                  description: 'Write tests for both frontend and backend code.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 4,
                  topics: ['Jest', 'React Testing Library', 'Vitest', 'Supertest', 'E2E Testing', 'Playwright', 'Test Coverage'],
                  prerequisites: ['React.js Fundamentals', 'Node.js & Express.js'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Jest Documentation',
                      url: 'https://jestjs.io/docs/getting-started',
                      description: 'JavaScript testing framework'
                    },
                    {
                      type: 'documentation',
                      title: 'React Testing Library',
                      url: 'https://testing-library.com/docs/react-testing-library/intro/',
                      description: 'Testing React components'
                    },
                    {
                      type: 'documentation',
                      title: 'Playwright Docs',
                      url: 'https://playwright.dev/docs/intro',
                      description: 'End-to-end testing'
                    }
                  ],
                  checkpoints: [
                    'Write unit tests',
                    'Test React components',
                    'Test API endpoints',
                    'Write integration tests',
                    'Perform E2E testing',
                    'Measure test coverage'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 5: DevOps & Deployment',
            description: 'Deploy and maintain applications in production',
            order: 5,
            steps: {
              create: [
                {
                  title: 'Docker & Containerization',
                  description: 'Containerize applications with Docker for consistent deployment.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 0,
                  topics: ['Docker', 'Dockerfile', 'Docker Compose', 'Images', 'Containers', 'Volumes', 'Networks'],
                  prerequisites: ['Node.js & Express.js'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Docker Tutorial for Beginners',
                      url: 'https://www.youtube.com/watch?v=pTFZFxd4hOI',
                      description: 'Complete Docker course'
                    },
                    {
                      type: 'documentation',
                      title: 'Docker Documentation',
                      url: 'https://docs.docker.com/',
                      description: 'Official Docker docs'
                    },
                    {
                      type: 'practice',
                      title: 'Play with Docker',
                      url: 'https://labs.play-with-docker.com/',
                      description: 'Practice Docker online'
                    }
                  ],
                  checkpoints: [
                    'Write Dockerfiles',
                    'Build Docker images',
                    'Run containers',
                    'Use Docker Compose',
                    'Manage volumes and networks',
                    'Optimize Docker images'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'CI/CD with GitHub Actions',
                  description: 'Automate testing and deployment with continuous integration/deployment pipelines.',
                  difficulty: 'Advanced',
                  estimatedTime: '1-2 weeks',
                  order: 1,
                  topics: ['GitHub Actions', 'Workflows', 'CI/CD', 'Automated Testing', 'Deployment Automation'],
                  prerequisites: ['Version Control with Git & GitHub', 'Testing Full Stack Apps'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'GitHub Actions Documentation',
                      url: 'https://docs.github.com/en/actions',
                      description: 'Official GitHub Actions docs'
                    },
                    {
                      type: 'video',
                      title: 'GitHub Actions Tutorial',
                      url: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
                      description: 'Complete CI/CD tutorial'
                    }
                  ],
                  checkpoints: [
                    'Create GitHub Actions workflows',
                    'Run automated tests on push',
                    'Deploy to production automatically',
                    'Set up environment variables',
                    'Handle deployment failures',
                    'Use workflow secrets'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Cloud Deployment (AWS/Vercel)',
                  description: 'Deploy applications to cloud platforms like AWS, Vercel, or Railway.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 2,
                  topics: ['AWS EC2', 'AWS RDS', 'Vercel', 'Railway', 'Environment Variables', 'Domain Configuration', 'SSL/TLS'],
                  prerequisites: ['Docker & Containerization', 'Next.js Framework'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Vercel Documentation',
                      url: 'https://vercel.com/docs',
                      description: 'Deploy Next.js apps'
                    },
                    {
                      type: 'documentation',
                      title: 'AWS Documentation',
                      url: 'https://docs.aws.amazon.com/',
                      description: 'AWS cloud services'
                    },
                    {
                      type: 'video',
                      title: 'Deploy to AWS EC2',
                      url: 'https://www.youtube.com/watch?v=oHAQ3TzUTro',
                      description: 'AWS deployment tutorial'
                    }
                  ],
                  checkpoints: [
                    'Deploy frontend to Vercel',
                    'Deploy backend to cloud VPS',
                    'Set up environment variables',
                    'Configure custom domains',
                    'Enable HTTPS with SSL',
                    'Set up database hosting'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Monitoring & Logging',
                  description: 'Monitor application performance and implement proper logging.',
                  difficulty: 'Advanced',
                  estimatedTime: '1-2 weeks',
                  order: 3,
                  topics: ['Winston', 'Morgan', 'Sentry', 'Application Monitoring', 'Error Tracking', 'Performance Metrics'],
                  prerequisites: ['Node.js & Express.js', 'Cloud Deployment'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Sentry Documentation',
                      url: 'https://docs.sentry.io/',
                      description: 'Error tracking and monitoring'
                    },
                    {
                      type: 'video',
                      title: 'Application Monitoring',
                      url: 'https://www.youtube.com/watch?v=iJ6koNfVRIs',
                      description: 'Monitoring Node.js apps'
                    }
                  ],
                  checkpoints: [
                    'Implement logging with Winston',
                    'Track errors with Sentry',
                    'Monitor API performance',
                    'Set up alerts',
                    'Analyze logs',
                    'Track user metrics'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Performance Optimization',
                  description: 'Optimize application performance for production.',
                  difficulty: 'Advanced',
                  estimatedTime: '2 weeks',
                  order: 4,
                  topics: ['Caching', 'CDN', 'Database Optimization', 'Code Splitting', 'Lazy Loading', 'Image Optimization'],
                  prerequisites: ['Next.js Framework', 'SQL Databases & PostgreSQL'],
                  resources: [
                    {
                      type: 'article',
                      title: 'Web Performance',
                      url: 'https://web.dev/learn-web-vitals/',
                      description: 'Google Web Vitals guide'
                    },
                    {
                      type: 'documentation',
                      title: 'Next.js Performance',
                      url: 'https://nextjs.org/docs/app/building-your-application/optimizing',
                      description: 'Performance optimization guide'
                    }
                  ],
                  checkpoints: [
                    'Implement Redis caching',
                    'Use CDN for static assets',
                    'Optimize database queries',
                    'Enable code splitting',
                    'Lazy load components',
                    'Optimize images'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 6: Projects Portfolio',
            description: 'Build impressive projects to showcase your skills',
            order: 6,
            steps: {
              create: [
                {
                  title: 'Advanced Todo App',
                  description: 'Build a feature-rich todo application with authentication, real-time updates, and filters.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1-2 weeks',
                  order: 0,
                  topics: ['CRUD Operations', 'Authentication', 'Real-time Sync', 'Drag & Drop', 'Filters & Search'],
                  prerequisites: ['Next.js Framework', 'Prisma ORM', 'Authentication & Authorization'],
                  resources: [
                    {
                      type: 'inspiration',
                      title: 'Todoist',
                      url: 'https://todoist.com/',
                      description: 'Feature inspiration'
                    }
                  ],
                  checkpoints: [
                    'User authentication',
                    'Create, read, update, delete todos',
                    'Priority levels and categories',
                    'Due dates and reminders',
                    'Search and filter',
                    'Responsive design'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Full Stack Blog Platform',
                  description: 'Create a blog platform with markdown editor, comments, and user profiles.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 1,
                  topics: ['Markdown Editor', 'Comments System', 'User Profiles', 'SEO', 'File Upload'],
                  prerequisites: ['Next.js Framework', 'Prisma ORM', 'Authentication & Authorization'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'MDX Documentation',
                      url: 'https://mdxjs.com/',
                      description: 'Markdown for React'
                    },
                    {
                      type: 'inspiration',
                      title: 'Dev.to',
                      url: 'https://dev.to/',
                      description: 'Feature inspiration'
                    }
                  ],
                  checkpoints: [
                    'Rich markdown editor',
                    'Create and publish posts',
                    'Comments and reactions',
                    'User profiles',
                    'Follow system',
                   'SEO optimization',
                    'Image uploads'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'E-commerce Store',
                  description: 'Build a full-featured e-commerce platform with cart, checkout, and payment integration.',
                  difficulty: 'Advanced',
                  estimatedTime: '4-6 weeks',
                  order: 2,
                  topics: ['Shopping Cart', 'Stripe Payment', 'Order Management', 'Product Search', 'Admin Dashboard'],
                  prerequisites: ['Next.js Framework', 'Prisma ORM', 'Authentication & Authorization', 'File Upload & Storage'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Stripe Documentation',
                      url: 'https://stripe.com/docs',
                      description: 'Payment integration'
                    },
                    {
                      type: 'video',
                      title: 'E-commerce Tutorial',
                      url: 'https://www.youtube.com/watch?v=4mOkFXyxfsU',
                      description: 'Build e-commerce with Next.js'
                    }
                  ],
                  checkpoints: [
                    'Product catalog with filters',
                    'Shopping cart functionality',
                    'Stripe payment integration',
                    'Order management',
                    'User reviews and ratings',
                    'Admin dashboard',
                    'Email notifications'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 7: Interview Preparation',
            description: 'Prepare for technical interviews and land your dream job',
            order: 7,
            steps: {
              create: [
                {
                  title: 'Data Structures & Algorithms',
                  description: 'Master essential DSA concepts for coding interviews.',
                  difficulty: 'Advanced',
                  estimatedTime: '4-8 weeks',
                  order: 0,
                  topics: ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting & Searching'],
                  prerequisites: ['JavaScript Fundamentals'],
                  resources: [
                    {
                      type: 'platform',
                      title: 'LeetCode',
                      url: 'https://leetcode.com/',
                      description: 'Practice coding problems'
                    },
                    {
                      type: 'book',
                      title: 'NeetCode',
                      url: 'https://neetcode.io/',
                      description: 'Curated problem list'
                    },
                    {
                      type: 'video',
                      title: 'DSA Course',
                      url: 'https://www.youtube.com/watch?v=8hly31xKli0',
                      description: 'Complete DSA course'
                    }
                  ],
                  checkpoints: [
                    'Solve 150+ LeetCode problems',
                    'Master array and string problems',
                    'Understand tree traversals',
                    'Solve graph problems',
                    'Learn dynamic programming',
                    'Practice system design basics'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: ['arrays', 'strings', 'linked-lists', 'trees', 'graphs'],
                  relatedInterviews: []
                },
                {
                  title: 'System Design Fundamentals',
                  description: 'Learn to design scalable systems for system design interviews.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 1,
                  topics: ['Scalability', 'Load Balancing', 'Caching', 'Database Sharding', 'Microservices', 'API Design'],
                  prerequisites: ['Backend Development', 'DevOps & Deployment'],
                  resources: [
                    {
                      type: 'book',
                      title: 'System Design Primer',
                      url: 'https://github.com/donnemartin/system-design-primer',
                      description: 'GitHub repo with resources'
                    },
                    {
                      type: 'video',
                      title: 'System Design Course',
                      url: 'https://www.youtube.com/watch?v=F2FmTdLtb_4',
                      description: 'System design interview prep'
                    },
                    {
                      type: 'platform',
                      title: 'ByteByteGo',
                      url: 'https://bytebytego.com/',
                      description: 'System design resources'
                    }
                  ],
                  checkpoints: [
                    'Design scalable systems',
                    'Understand CAP theorem',
                    'Learn database scaling',
                    'Design API architecture',
                    'Understand caching strategies',
                    'Practice common design problems'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Behavioral Interview Prep',
                  description: 'Prepare for behavioral interviews with STAR method and common questions.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1-2 weeks',
                  order: 2,
                  topics: ['STAR Method', 'Leadership', 'Teamwork', 'Conflict Resolution', 'Project Stories'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'article',
                      title: 'Amazon Leadership Principles',
                      url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles',
                      description: 'Behavioral interview framework'
                    },
                    {
                      type: 'video',
                      title: 'Behavioral Interview Tips',
                      url: 'https://www.youtube.com/watch?v=PJKYqLP6MRE',
                      description: 'How to answer behavioral questions'
                    }
                  ],
                  checkpoints: [
                    'Prepare 10+ project stories',
                    'Practice STAR methodology',
                    'Prepare questions for interviewer',
                    'Research company culture',
                    'Practice with peer or mentor'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Resume & Portfolio',
                  description: 'Create an impressive resume and portfolio to showcase your skills.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1 week',
                  order: 3,
                  topics: ['Resume Writing', 'Portfolio Website', 'GitHub Profile', 'LinkedIn Optimization'],
                  prerequisites: ['Projects Portfolio'],
                  resources: [
                    {
                      type: 'tool',
                      title: 'Resume.io',
                      url: 'https://resume.io/',
                      description: 'Resume builder'
                    },
                    {
                      type: 'article',
                      title: 'Developer Resume Guide',
                      url: 'https://www.freecodecamp.org/news/writing-a-killer-software-engineering-resume-b11c91ef699d/',
                      description: 'How to write a developer resume'
                    }
                  ],
                  checkpoints: [
                    'Create ATS-friendly resume',
                    'Build portfolio website',
                    'Optimize GitHub profile',
                    'Update LinkedIn profile',
                    'Write project descriptions',
                    'Collect testimonials'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log(`✅ Created Full Stack Developer Roadmap`);

  // ============================================================================
  // FRONTEND DEVELOPER ROADMAP
  // ============================================================================

  await prisma.roadmap.deleteMany({
    where: {
      slug: 'frontend-developer'
    }
  });

  await prisma.roadmap.create({
    data: {
      slug: 'frontend-developer',
      title: 'Frontend Developer',
      description: 'Master modern frontend development with React, TypeScript, and responsive design.',
      icon: '🎨',
      level: 'Intermediate',
      duration: '6-8 months',
      gradient: 'from-blue-500 to-cyan-500',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind'],
      popularity: 95,
      order: 2,
      phases: {
        create: [
          {
            title: 'Phase 0: Web Fundamentals',
            description: 'Learn HTML, CSS, and JavaScript basics',
            order: 0,
            steps: {
              create: [
                {
                  title: 'HTML5 & Semantic Markup',
                  description: 'Master HTML5 elements, semantic structure, forms, and accessibility best practices.',
                  difficulty: 'Beginner',
                  estimatedTime: '1-2 weeks',
                  order: 0,
                  topics: ['Semantic HTML', 'Forms', 'Accessibility', 'SEO', 'Meta Tags'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'HTML Crash Course For Absolute Beginners',
                      url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
                      description: 'Learn HTML basics in 1 hour'
                    },
                    {
                      type: 'documentation',
                      title: 'MDN HTML Guide',
                      url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
                      description: 'Complete HTML documentation'
                    },
                    {
                      type: 'interactive',
                      title: 'freeCodeCamp Responsive Web Design',
                      url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
                      description: 'Interactive HTML certification course'
                    }
                  ],
                  checkpoints: [
                    'Create semantic HTML documents',
                    'Build accessible forms',
                    'Understand SEO basics',
                    'Use proper meta tags'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'CSS3 & Flexbox/Grid',
                  description: 'Master CSS styling, layouts with Flexbox and Grid, and responsive design principles.',
                  difficulty: 'Beginner',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['CSS Selectors', 'Box Model', 'Flexbox', 'CSS Grid', 'Responsive Design', 'Media Queries'],
                  prerequisites: ['HTML5 & Semantic Markup'],
                  resources: [
                    {
                      type: 'video',
                      title: 'CSS Crash Course',
                      url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
                      description: 'Complete CSS fundamentals'
                    },
                    {
                      type: 'interactive',
                      title: 'Flexbox Froggy',
                      url: 'https://flexboxfroggy.com/',
                      description: 'Learn Flexbox by playing a game'
                    },
                    {
                      type: 'interactive',
                      title: 'Grid Garden',
                      url: 'https://cssgridgarden.com/',
                      description: 'Learn CSS Grid through gaming'
                    },
                    {
                      type: 'article',
                      title: 'CSS Tricks - Complete Guide to Flexbox',
                      url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
                      description: 'Comprehensive Flexbox reference'
                    }
                  ],
                  checkpoints: [
                    'Style elements effectively',
                    'Build layouts with Flexbox',
                    'Create Grid-based designs',
                    'Implement responsive layouts'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'JavaScript ES6+ Fundamentals',
                  description: 'Learn modern JavaScript including variables, functions, arrays, objects, and ES6+ features.',
                  difficulty: 'Beginner',
                  estimatedTime: '3-4 weeks',
                  order: 2,
                  topics: ['Variables', 'Functions', 'Arrays', 'Objects', 'ES6 Features', 'Arrow Functions', 'Destructuring'],
                  prerequisites: ['HTML5 & Semantic Markup'],
                  resources: [
                    {
                      type: 'video',
                      title: 'JavaScript Full Course',
                      url: 'https://www.youtube.com/watch?v=jS4aFq5-91M',
                      description: 'Complete JavaScript course by freeCodeCamp'
                    },
                    {
                      type: 'documentation',
                      title: 'JavaScript.info',
                      url: 'https://javascript.info/',
                      description: 'Modern JavaScript tutorials'
                    },
                    {
                      type: 'documentation',
                      title: 'MDN JavaScript Guide',
                      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
                      description: 'Official JavaScript documentation'
                    }
                  ],
                  checkpoints: [
                    'Understand JavaScript data types',
                    'Write functions and arrow functions',
                    'Work with arrays and objects',
                    'Use ES6+ features'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: ['arrays', 'strings'],
                  relatedInterviews: []
                },
                {
                  title: 'DOM Manipulation & Events',
                  description: 'Learn to interact with HTML elements using JavaScript and handle user events.',
                  difficulty: 'Beginner',
                  estimatedTime: '1-2 weeks',
                  order: 3,
                  topics: ['DOM API', 'Query Selectors', 'Event Listeners', 'Event Bubbling', 'Form Validation'],
                  prerequisites: ['JavaScript ES6+ Fundamentals'],
                  resources: [
                    {
                      type: 'video',
                      title: 'DOM Manipulation Crash Course',
                      url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc',
                      description: 'Learn DOM manipulation'
                    },
                    {
                      type: 'documentation',
                      title: 'MDN DOM Guide',
                      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model',
                      description: 'DOM API documentation'
                    },
                    {
                      type: 'interactive',
                      title: 'JavaScript30',
                      url: 'https://javascript30.com/',
                      description: '30 projects to practice DOM manipulation'
                    }
                  ],
                  checkpoints: [
                    'Select and manipulate DOM elements',
                    'Add event listeners',
                    'Handle form submissions',
                    'Understand event propagation'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 1: React & Modern Frontend',
            description: 'Build interactive UIs with React and TypeScript',
            order: 1,
            steps: {
              create: [
                {
                  title: 'React.js Fundamentals',
                  description: 'Master React components, hooks, state management, and JSX.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['JSX', 'Components', 'Props', 'State', 'Hooks', 'useEffect', 'Event Handling'],
                  prerequisites: ['JavaScript ES6+ Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'React Official Docs',
                      url: 'https://react.dev/',
                      description: 'New React documentation'
                    },
                    {
                      type: 'video',
                      title: 'React Course - Beginner to Advanced',
                      url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
                      description: 'Complete React tutorial'
                    },
                    {
                      type: 'interactive',
                      title: 'React Tutorial - freeCodeCamp',
                      url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
                      description: 'Interactive React course'
                    }
                  ],
                  checkpoints: [
                    'Create functional components',
                    'Use useState and useEffect',
                    'Handle events in React',
                    'Understand component lifecycle'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'TypeScript for React',
                  description: 'Add type safety to React applications with TypeScript.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2 weeks',
                  order: 1,
                  topics: ['Type Annotations', 'Interfaces', 'Types', 'Generics', 'React TypeScript Patterns'],
                  prerequisites: ['React.js Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'TypeScript Handbook',
                      url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
                      description: 'Official TypeScript docs'
                    },
                    {
                      type: 'video',
                      title: 'TypeScript Course for Beginners',
                      url: 'https://www.youtube.com/watch?v=d56mG7DezGs',
                      description: 'TypeScript crash course'
                    },
                    {
                      type: 'documentation',
                      title: 'React TypeScript Cheatsheet',
                      url: 'https://react-typescript-cheatsheet.netlify.app/',
                      description: 'React + TypeScript patterns'
                    }
                  ],
                  checkpoints: [
                    'Type React components',
                    'Define interfaces for props',
                    'Use TypeScript with hooks',
                    'Handle events with types'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Tailwind CSS',
                  description: 'Master utility-first CSS with Tailwind for rapid UI development.',
                  difficulty: 'Beginner',
                  estimatedTime: '1 week',
                  order: 2,
                  topics: ['Utility Classes', 'Responsive Design', 'Custom Configuration', 'Dark Mode'],
                  prerequisites: ['CSS3 & Flexbox/Grid'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Tailwind CSS Docs',
                      url: 'https://tailwindcss.com/docs',
                      description: 'Official Tailwind documentation'
                    },
                    {
                      type: 'video',
                      title: 'Tailwind CSS Crash Course',
                      url: 'https://www.youtube.com/watch?v=UBOj6rqRUME',
                      description: 'Learn Tailwind in 1 hour'
                    }
                  ],
                  checkpoints: [
                    'Use Tailwind utility classes',
                    'Build responsive layouts',
                    'Configure Tailwind',
                    'Implement dark mode'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 2: Advanced React & Tools',
            description: 'Master state management, routing, and modern tooling',
            order: 2,
            steps: {
              create: [
                {
                  title: 'React Router',
                  description: 'Implement client-side routing and navigation in React apps.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1 week',
                  order: 0,
                  topics: ['Routes', 'Navigation', 'URL Parameters', 'Nested Routes', 'Protected Routes'],
                  prerequisites: ['React.js Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'React Router Docs',
                      url: 'https://reactrouter.com/',
                      description: 'Official React Router documentation'
                    },
                    {
                      type: 'video',
                      title: 'React Router v6 Tutorial',
                      url: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU',
                      description: 'Complete routing guide'
                    }
                  ],
                  checkpoints: [
                    'Set up routes',
                    'Navigate between pages',
                    'Access URL parameters',
                    'Create protected routes'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'State Management (Zustand/Redux)',
                  description: 'Manage complex application state effectively.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2 weeks',
                  order: 1,
                  topics: ['Global State', 'Context API', 'Zustand', 'Redux Toolkit', 'State Patterns'],
                  prerequisites: ['React.js Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Zustand Documentation',
                      url: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
                      description: 'Simple state management'
                    },
                    {
                      type: 'documentation',
                      title: 'Redux Toolkit',
                      url: 'https://redux-toolkit.js.org/',
                      description: 'Modern Redux approach'
                    }
                  ],
                  checkpoints: [
                    'Set up global state',
                    'Manage complex state',
                    'Choose appropriate solution',
                    'Optimize performance'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'API Integration',
                  description: 'Connect to REST APIs using React Query or SWR.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2 weeks',
                  order: 2,
                  topics: ['Fetch API', 'Axios', 'React Query', 'SWR', 'Error Handling', 'Caching'],
                  prerequisites: ['React.js Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'TanStack Query (React Query)',
                      url: 'https://tanstack.com/query/latest',
                      description: 'Powerful data fetching for React'
                    },
                    {
                      type: 'video',
                      title: 'React Query Tutorial',
                      url: 'https://www.youtube.com/watch?v=r8Dg0KVnfMA',
                      description: 'Complete React Query course'
                    }
                  ],
                  checkpoints: [
                    'Fetch data from APIs',
                    'Handle loading states',
                    'Implement error handling',
                    'Use caching strategies'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 3: Production & Performance',
            description: 'Deploy and optimize React applications',
            order: 3,
            steps: {
              create: [
                {
                  title: 'Next.js Framework',
                  description: 'Build production-ready React apps with Next.js.',
                  difficulty: 'Advanced',
                  estimatedTime: '3 weeks',
                  order: 0,
                  topics: ['App Router', 'Server Components', 'API Routes', 'SSR', 'SSG', 'Metadata'],
                  prerequisites: ['React.js Fundamentals', 'TypeScript for React'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Next.js Documentation',
                      url: 'https://nextjs.org/docs',
                      description: 'Official Next.js docs'
                    },
                    {
                      type: 'video',
                      title: 'Next.js 14 Full Course',
                      url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
                      description: 'Complete Next.js tutorial'
                    },
                    {
                      type: 'interactive',
                      title: 'Next.js Learn',
                      url: 'https://nextjs.org/learn',
                      description: 'Official Next.js course'
                    }
                  ],
                  checkpoints: [
                    'Create Next.js apps',
                    'Use Server Components',
                    'Build API routes',
                    'Implement SSR/SSG'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Testing React Apps',
                  description: 'Write tests for React components and applications.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2 weeks',
                  order: 1,
                  topics: ['Jest', 'React Testing Library', 'Unit Tests', 'Integration Tests'],
                  prerequisites: ['React.js Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'React Testing Library',
                      url: 'https://testing-library.com/docs/react-testing-library/intro/',
                      description: 'Test React components'
                    },
                    {
                      type: 'video',
                      title: 'React Testing Tutorial',
                      url: 'https://www.youtube.com/watch?v=8Xwq35cPwYg',
                      description: 'Complete testing guide'
                    }
                  ],
                  checkpoints: [
                    'Write unit tests',
                    'Test components',
                    'Mock API calls',
                    'Run E2E tests'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Deployment & CI/CD',
                  description: 'Deploy React apps and set up continuous integration.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1 week',
                  order: 2,
                  topics: ['Vercel', 'Netlify', 'GitHub Actions', 'Environment Variables'],
                  prerequisites: ['Next.js Framework'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Vercel Documentation',
                      url: 'https://vercel.com/docs',
                      description: 'Deploy Next.js apps'
                    },
                    {
                      type: 'documentation',
                      title: 'GitHub Actions Documentation',
                      url: 'https://docs.github.com/en/actions',
                      description: 'Set up CI/CD pipelines'
                    }
                  ],
                  checkpoints: [
                    'Deploy to Vercel',
                    'Set up CI/CD',
                    'Configure environment variables',
                    'Optimize performance'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log(`✅ Created Frontend Developer Roadmap`);

  // ============================================================================
  // BACKEND DEVELOPER ROADMAP
  // ============================================================================

  await prisma.roadmap.deleteMany({
    where: {
      slug: 'backend-developer'
    }
  });

  await prisma.roadmap.create({
    data: {
      slug: 'backend-developer',
      title: 'Backend Developer',
      description: 'Build robust server-side applications with Node.js, databases, and APIs.',
      icon: '⚙️',
      level: 'Intermediate',
      duration: '6-9 months',
      gradient: 'from-green-500 to-emerald-500',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Docker'],
      popularity: 88,
      order: 3,
      phases: {
        create: [
          {
            title: 'Phase 0: Programming Fundamentals',
            description: 'Master JavaScript and Node.js basics',
            order: 0,
            steps: {
              create: [
                {
                  title: 'JavaScript for Backend',
                  description: 'Learn JavaScript fundamentals needed for backend development.',
                  difficulty: 'Beginner',
                  estimatedTime: '2-3 weeks',
                  order: 0,
                  topics: ['Variables', 'Functions', 'Async/Await', 'Promises', 'Error Handling'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'JavaScript Full Course',
                      url: 'https://www.youtube.com/watch?v=jS4aFq5-91M',
                      description: 'Complete JavaScript course'
                    },
                    {
                      type: 'documentation',
                      title: 'JavaScript.info',
                      url: 'https://javascript.info/',
                      description: 'Modern JavaScript tutorials'
                    }
                  ],
                  checkpoints: [
                    'Understand async JavaScript',
                    'Handle errors properly',
                    'Work with modules',
                    'Use ES6+ features'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Node.js Fundamentals',
                  description: 'Learn Node.js runtime, npm, and building server-side applications.',
                  difficulty: 'Beginner',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['Node.js Runtime', 'npm', 'Modules', 'File System', 'Events', 'Streams'],
                  prerequisites: ['JavaScript for Backend'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Node.js Tutorial for Beginners',
                      url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
                      description: 'Node.js crash course'
                    },
                    {
                      type: 'documentation',
                      title: 'Node.js Documentation',
                      url: 'https://nodejs.org/docs/latest/api/',
                      description: 'Official Node.js docs'
                    },
                    {
                      type: 'video',
                      title: 'Node.js Full Course',
                      url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
                      description: 'Complete Node.js tutorial'
                    }
                  ],
                  checkpoints: [
                    'Create Node.js applications',
                    'Use npm packages',
                    'Work with file system',
                    'Understand Node.js architecture'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 1: Web APIs & Express',
            description: 'Build RESTful APIs with Express.js',
            order: 1,
            steps: {
              create: [
                {
                  title: 'Express.js Framework',
                  description: 'Master Express.js for building web servers and APIs.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2-3 weeks',
                  order: 0,
                  topics: ['Routing', 'Middleware', 'Request/Response', 'Error Handling', 'REST APIs'],
                  prerequisites: ['Node.js Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Express.js Guide',
                      url: 'https://expressjs.com/en/guide/routing.html',
                      description: 'Official Express documentation'
                    },
                    {
                      type: 'video',
                      title: 'Express JS Crash Course',
                      url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
                      description: 'Learn Express quickly'
                    },
                    {
                      type: 'video',
                      title: 'REST API Tutorial',
                      url: 'https://www.youtube.com/watch?v=-MTSQjw5DrM',
                      description: 'Build REST APIs with Express'
                    }
                  ],
                  checkpoints: [
                    'Create Express servers',
                    'Build RESTful APIs',
                    'Use middleware',
                    'Handle errors'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'API Design & Best Practices',
                  description: 'Learn REST API design principles and best practices.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1-2 weeks',
                  order: 1,
                  topics: ['REST Principles', 'API Versioning', 'Status Codes', 'API Documentation', 'Rate Limiting'],
                  prerequisites: ['Express.js Framework'],
                  resources: [
                    {
                      type: 'article',
                      title: 'REST API Design Best Practices',
                      url: 'https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/',
                      description: 'API design guidelines'
                    },
                    {
                      type: 'documentation',
                      title: 'Swagger/OpenAPI Documentation',
                      url: 'https://swagger.io/docs/',
                      description: 'API documentation standards'
                    }
                  ],
                  checkpoints: [
                    'Design RESTful endpoints',
                    'Use proper HTTP methods',
                    'Implement API versioning',
                    'Document APIs'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 2: Databases',
            description: 'Work with SQL and NoSQL databases',
            order: 2,
            steps: {
              create: [
                {
                  title: 'PostgreSQL & SQL',
                  description: 'Master relational databases and SQL queries.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['SQL Queries', 'Joins', 'Indexes', 'Transactions', 'Database Design'],
                  prerequisites: ['Node.js Fundamentals'],
                  resources: [
                    {
                      type: 'video',
                      title: 'SQL Tutorial - Full Course',
                      url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
                      description: 'Complete SQL course'
                    },
                    {
                      type: 'documentation',
                      title: 'PostgreSQL Tutorial',
                      url: 'https://www.postgresql.org/docs/current/tutorial.html',
                      description: 'Official PostgreSQL docs'
                    },
                    {
                      type: 'interactive',
                      title: 'SQLBolt',
                      url: 'https://sqlbolt.com/',
                      description: 'Interactive SQL lessons'
                    }
                  ],
                  checkpoints: [
                    'Write complex SQL queries',
                    'Design database schemas',
                    'Use joins effectively',
                    'Optimize queries with indexes'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Prisma ORM',
                  description: 'Use Prisma for type-safe database access.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1-2 weeks',
                  order: 1,
                  topics: ['Schema Definition', 'Migrations', 'CRUD Operations', 'Relations', 'Type Safety'],
                  prerequisites: ['PostgreSQL & SQL'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Prisma Documentation',
                      url: 'https://www.prisma.io/docs',
                      description: 'Official Prisma docs'
                    },
                    {
                      type: 'video',
                      title: 'Prisma Course',
                      url: 'https://www.youtube.com/watch?v=RebA5J-rlwg',
                      description: 'Complete Prisma tutorial'
                    }
                  ],
                  checkpoints: [
                    'Define Prisma schemas',
                    'Run migrations',
                    'Perform CRUD operations',
                    'Handle relations'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'MongoDB & NoSQL',
                  description: 'Learn document-based databases with MongoDB.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2-3 weeks',
                  order: 2,
                  topics: ['Collections', 'Documents', 'Queries', 'Aggregation', 'Mongoose'],
                  prerequisites: ['Node.js Fundamentals'],
                  resources: [
                    {
                      type: 'video',
                      title: 'MongoDB Crash Course',
                      url: 'https://www.youtube.com/watch?v=ofme2o29ngU',
                      description: 'Learn MongoDB quickly'
                    },
                    {
                      type: 'documentation',
                      title: 'MongoDB Documentation',
                      url: 'https://www.mongodb.com/docs/',
                      description: 'Official MongoDB docs'
                    },
                    {
                      type: 'documentation',
                      title: 'Mongoose Guide',
                      url: 'https://mongoosejs.com/docs/guide.html',
                      description: 'Mongoose ODM documentation'
                    }
                  ],
                  checkpoints: [
                    'Create MongoDB databases',
                    'Perform CRUD operations',
                    'Use aggregation pipelines',
                    'Work with Mongoose'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 3: Authentication & Security',
            description: 'Implement secure authentication systems',
            order: 3,
            steps: {
              create: [
                {
                  title: 'JWT & Authentication',
                  description: 'Implement JWT-based authentication and authorization.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 0,
                  topics: ['JWT', 'Password Hashing', 'Sessions', 'OAuth', 'RBAC'],
                  prerequisites: ['Express.js Framework', 'PostgreSQL & SQL'],
                  resources: [
                    {
                      type: 'video',
                      title: 'JWT Authentication Tutorial',
                      url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4',
                      description: 'Complete JWT auth guide'
                    },
                    {
                      type: 'documentation',
                      title: 'Passport.js Documentation',
                      url: 'http://www.passportjs.org/docs/',
                      description: 'Authentication middleware'
                    },
                    {
                      type: 'documentation',
                      title: 'JWT Best Practices',
                      url: 'https://jwt.io/introduction',
                      description: 'JWT token guide'
                    }
                  ],
                  checkpoints: [
                    'Hash passwords securely',
                    'Generate JWT tokens',
                    'Implement protected routes',
                    'Set up OAuth'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'API Security',
                  description: 'Secure your APIs against common vulnerabilities.',
                  difficulty: 'Advanced',
                  estimatedTime: '1-2 weeks',
                  order: 1,
                  topics: ['CORS', 'Rate Limiting', 'Input Validation', 'SQL Injection', 'XSS'],
                  prerequisites: ['Express.js Framework'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'OWASP Top 10',
                      url: 'https://owasp.org/www-project-top-ten/',
                      description: 'Web security risks'
                    },
                    {
                      type: 'video',
                      title: 'Node.js Security Best Practices',
                      url: 'https://www.youtube.com/watch?v=BEB6jZsJiNM',
                      description: 'Secure Node.js apps'
                    }
                  ],
                  checkpoints: [
                    'Configure CORS properly',
                    'Implement rate limiting',
                    'Validate user input',
                    'Prevent common attacks'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 4: DevOps & Deployment',
            description: 'Deploy and maintain backend applications',
            order: 4,
            steps: {
              create: [
                {
                  title: 'Docker & Containerization',
                  description: 'Containerize backend applications with Docker.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 0,
                  topics: ['Docker', 'Dockerfile', 'Docker Compose', 'Containers'],
                  prerequisites: ['Express.js Framework'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Docker Tutorial for Beginners',
                      url: 'https://www.youtube.com/watch?v=pTFZFxd4hOI',
                      description: 'Complete Docker course'
                    },
                    {
                      type: 'documentation',
                      title: 'Docker Documentation',
                      url: 'https://docs.docker.com/',
                      description: 'Official Docker docs'
                    }
                  ],
                  checkpoints: [
                    'Write Dockerfiles',
                    'Build Docker images',
                    'Use Docker Compose',
                    'Optimize containers'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Cloud Deployment',
                  description: 'Deploy backend services to cloud platforms.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['AWS', 'EC2', 'RDS', 'Environment Variables', 'Load Balancing'],
                  prerequisites: ['Docker & Containerization'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'AWS Documentation',
                      url: 'https://docs.aws.amazon.com/',
                      description: 'AWS cloud services'
                    },
                    {
                      type: 'video',
                      title: 'Deploy Node.js to AWS',
                      url: 'https://www.youtube.com/watch?v=oHAQ3TzUTro',
                      description: 'AWS deployment guide'
                    }
                  ],
                  checkpoints: [
                    'Deploy to AWS EC2',
                    'Set up RDS database',
                    'Configure environment variables',
                    'Implement load balancing'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'CI/CD & Monitoring',
                  description: 'Automate deployments and monitor applications.',
                  difficulty: 'Advanced',
                  estimatedTime: '1-2 weeks',
                  order: 2,
                  topics: ['GitHub Actions', 'CI/CD Pipelines', 'Logging', 'Monitoring'],
                  prerequisites: ['Cloud Deployment'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'GitHub Actions Documentation',
                      url: 'https://docs.github.com/en/actions',
                      description: 'CI/CD automation'
                    },
                    {
                      type: 'video',
                      title: 'GitHub Actions Tutorial',
                      url: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
                      description: 'Automate deployments'
                    }
                  ],
                  checkpoints: [
                    'Set up CI/CD pipelines',
                    'Automate testing',
                    'Implement logging',
                    'Monitor applications'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log(`✅ Created Backend Developer Roadmap`);

  // ============================================================================
  // DEVOPS ENGINEER ROADMAP
  // ============================================================================
  
  await prisma.roadmap.deleteMany({
    where: {
      slug: 'devops-engineer'
    }
  });

  await prisma.roadmap.create({
    data: {
      slug: 'devops-engineer',
      title: 'DevOps Engineer',
      description: 'Master CI/CD, containerization, orchestration, and cloud infrastructure automation.',
      icon: '🔧',
      level: 'Advanced',
      duration: '8-10 months',
      gradient: 'from-orange-500 to-red-500',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Linux'],
      popularity: 92,
      order: 4,
      phases: {
        create: [
          {
            title: 'Phase 0: Foundations',
            description: 'Master Linux, networking, and scripting',
            order: 0,
            steps: {
              create: [
                {
                  title: 'Linux Fundamentals',
                  description: 'Master Linux command line, file systems, processes, and system administration.',
                  difficulty: 'Beginner',
                  estimatedTime: '2-3 weeks',
                  order: 0,
                  topics: ['Command Line', 'File System', 'Processes', 'Permissions', 'Package Management'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'Linux for Beginners',
                      url: 'https://www.youtube.com/watch?v=sWbUDq4S6Y8',
                      description: 'Complete Linux basics course'
                    },
                    {
                      type: 'interactive',
                      title: 'Linux Journey',
                      url: 'https://linuxjourney.com/',
                      description: 'Interactive Linux learning'
                    },
                    {
                      type: 'documentation',
                      title: 'The Linux Documentation Project',
                      url: 'https://tldp.org/',
                      description: 'Comprehensive Linux guides'
                    }
                  ],
                  checkpoints: [
                    'Navigate Linux filesystem',
                    'Manage processes',
                    'Configure permissions',
                    'Install packages'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Bash Scripting',
                  description: 'Automate tasks with Bash shell scripting.',
                  difficulty: 'Beginner',
                  estimatedTime: '1-2 weeks',
                  order: 1,
                  topics: ['Shell Scripts', 'Variables', 'Loops', 'Functions', 'Text Processing'],
                  prerequisites: ['Linux Fundamentals'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Bash Scripting Tutorial',
                      url: 'https://www.youtube.com/watch?v=tK9Oc6AEnR4',
                      description: 'Complete Bash scripting guide'
                    },
                    {
                      type: 'documentation',
                      title: 'Bash Guide for Beginners',
                      url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/',
                      description: 'Comprehensive Bash guide'
                    }
                  ],
                  checkpoints: [
                    'Write shell scripts',
                    'Use variables and conditionals',
                    'Process text files',
                    'Automate system tasks'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Networking Basics',
                  description: 'Understand TCP/IP, DNS, HTTP, and network troubleshooting.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2 weeks',
                  order: 2,
                  topics: ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'Load Balancing', 'Firewalls'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'Computer Networking Course',
                      url: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
                      description: 'Networking fundamentals'
                    },
                    {
                      type: 'article',
                      title: 'Networking Basics',
                      url: 'https://www.cloudflare.com/learning/network-layer/what-is-a-computer-network/',
                      description: 'Network concepts explained'
                    }
                  ],
                  checkpoints: [
                    'Understand TCP/IP model',
                    'Troubleshoot network issues',
                    'Configure DNS',
                    'Use network tools'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 1: Containerization',
            description: 'Master Docker and container technologies',
            order: 1,
            steps: {
              create: [
                {
                  title: 'Docker Mastery',
                  description: 'Master Docker for containerizing applications.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2-3 weeks',
                  order: 0,
                  topics: ['Docker', 'Dockerfile', 'Images', 'Containers', 'Volumes', 'Networks'],
                  prerequisites: ['Linux Fundamentals'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Docker Tutorial for Beginners',
                      url: 'https://www.youtube.com/watch?v=pTFZFxd4hOI',
                      description: 'Complete Docker course'
                    },
                    {
                      type: 'documentation',
                      title: 'Docker Documentation',
                      url: 'https://docs.docker.com/',
                      description: 'Official Docker docs'
                    },
                    {
                      type: 'video',
                      title: 'Docker Deep Dive',
                      url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
                      description: 'Advanced Docker concepts'
                    }
                  ],
                  checkpoints: [
                    'Write Dockerfiles',
                    'Build and manage images',
                    'Run containers',
                    'Use volumes and networks'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Docker Compose',
                  description: 'Orchestrate multi-container applications with Docker Compose.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1 week',
                  order: 1,
                  topics: ['docker-compose.yml', 'Services', 'Multi-container Apps', 'Orchestration'],
                  prerequisites: ['Docker Mastery'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Docker Compose Documentation',
                      url: 'https://docs.docker.com/compose/',
                      description: 'Official Compose docs'
                    },
                    {
                      type: 'video',
                      title: 'Docker Compose Tutorial',
                      url: 'https://www.youtube.com/watch?v=SXwC9fSwct8',
                      description: 'Multi-container orchestration'
                    }
                  ],
                  checkpoints: [
                    'Write docker-compose files',
                    'Orchestrate multi-container apps',
                    'Manage services',
                    'Configure networks and volumes'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 2: CI/CD',
            description: 'Automate builds, tests, and deployments',
            order: 2,
            steps: {
              create: [
                {
                  title: 'GitHub Actions',
                  description: 'Automate workflows with GitHub Actions.',
                  difficulty: 'Intermediate',
                  estimatedTime: '1-2 weeks',
                  order: 0,
                  topics: ['Workflows', 'Actions', 'CI/CD Pipelines', 'Secrets', 'Artifacts'],
                  prerequisites: ['Docker Mastery'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'GitHub Actions Documentation',
                      url: 'https://docs.github.com/en/actions',
                      description: 'Official GitHub Actions docs'
                    },
                    {
                      type: 'video',
                      title: 'GitHub Actions Tutorial',
                      url: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
                      description: 'Complete CI/CD with GitHub Actions'
                    }
                  ],
                  checkpoints: [
                    'Create workflows',
                    'Build CI/CD pipelines',
                    'Run automated tests',
                    'Deploy applications'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Jenkins',
                  description: 'Build advanced CI/CD pipelines with Jenkins.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['Jenkins Pipeline', 'Jenkinsfile', 'Plugins', 'Distributed Builds'],
                  prerequisites: ['GitHub Actions'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Jenkins Documentation',
                      url: 'https://www.jenkins.io/doc/',
                      description: 'Official Jenkins docs'
                    },
                    {
                      type: 'video',
                      title: 'Jenkins Tutorial',
                      url: 'https://www.youtube.com/watch?v=6YZvp2GwT0A',
                      description: 'Complete Jenkins course'
                    }
                  ],
                  checkpoints: [
                    'Set up Jenkins',
                    'Create pipelines',
                    'Configure plugins',
                    'Implement distributed builds'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 3: Cloud & Infrastructure',
            description: 'Deploy and manage cloud infrastructure',
            order: 3,
            steps: {
              create: [
                {
                  title: 'AWS Fundamentals',
                  description: 'Master AWS cloud services and architecture.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['EC2', 'S3', 'RDS', 'VPC', 'IAM', 'Lambda'],
                  prerequisites: ['Networking Basics'],
                  resources: [
                    {
                      type: 'video',
                      title: 'AWS Certified Cloud Practitioner Course',
                      url: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
                      description: 'Complete AWS fundamentals'
                    },
                    {
                      type: 'documentation',
                      title: 'AWS Documentation',
                      url: 'https://docs.aws.amazon.com/',
                      description: 'Official AWS docs'
                    }
                  ],
                  checkpoints: [
                    'Launch EC2 instances',
                    'Use S3 storage',
                    'Configure VPCs',
                    'Manage IAM'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Terraform',
                  description: 'Infrastructure as Code with Terraform.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['HCL', 'Resources', 'Modules', 'State Management', 'Providers'],
                  prerequisites: ['AWS Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Terraform Documentation',
                      url: 'https://developer.hashicorp.com/terraform/docs',
                      description: 'Official Terraform docs'
                    },
                    {
                      type: 'video',
                      title: 'Terraform Course',
                      url: 'https://www.youtube.com/watch?v=SLB_c_ayRMo',
                      description: 'Complete Terraform tutorial'
                    }
                  ],
                  checkpoints: [
                    'Write Terraform configs',
                    'Provision infrastructure',
                    'Manage state',
                    'Create modules'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 4: Kubernetes',
            description: 'Orchestrate containers at scale',
            order: 4,
            steps: {
              create: [
                {
                  title: 'Kubernetes Fundamentals',
                  description: 'Master container orchestration with Kubernetes.',
                  difficulty: 'Advanced',
                  estimatedTime: '4-5 weeks',
                  order: 0,
                  topics: ['Pods', 'Services', 'Deployments', 'ConfigMaps', 'Secrets', 'Ingress'],
                  prerequisites: ['Docker Mastery'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Kubernetes Tutorial for Beginners',
                      url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
                      description: 'Complete Kubernetes course'
                    },
                    {
                      type: 'documentation',
                      title: 'Kubernetes Documentation',
                      url: 'https://kubernetes.io/docs/home/',
                      description: 'Official Kubernetes docs'
                    },
                    {
                      type: 'interactive',
                      title: 'Kubernetes Learning Path',
                      url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
                      description: 'Interactive K8s tutorials'
                    }
                  ],
                  checkpoints: [
                    'Deploy applications',
                    'Manage pods and services',
                    'Configure deployments',
                    'Set up ingress'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Helm Package Manager',
                  description: 'Manage Kubernetes applications with Helm charts.',
                  difficulty: 'Advanced',
                  estimatedTime: '1-2 weeks',
                  order: 1,
                  topics: ['Helm Charts', 'Releases', 'Repositories', 'Templating'],
                  prerequisites: ['Kubernetes Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Helm Documentation',
                      url: 'https://helm.sh/docs/',
                      description: 'Official Helm docs'
                    },
                    {
                      type: 'video',
                      title: 'Helm Tutorial',
                      url: 'https://www.youtube.com/watch?v=-ykwb1d0DXU',
                      description: 'Kubernetes package management'
                    }
                  ],
                  checkpoints: [
                    'Create Helm charts',
                    'Deploy with Helm',
                    'Manage releases',
                    'Use chart repositories'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 5: Monitoring & Observability',
            description: 'Monitor and troubleshoot production systems',
            order: 5,
            steps: {
              create: [
                {
                  title: 'Prometheus & Grafana',
                  description: 'Monitor and visualize metrics.',
                  difficulty: 'Advanced',
                  estimatedTime: '2 weeks',
                  order: 0,
                  topics: ['Prometheus', 'Grafana', 'Metrics', 'Alerting', 'Dashboards'],
                  prerequisites: ['Kubernetes Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Prometheus Documentation',
                      url: 'https://prometheus.io/docs/introduction/overview/',
                      description: 'Official Prometheus docs'
                    },
                    {
                      type: 'video',
                      title: 'Prometheus & Grafana Tutorial',
                      url: 'https://www.youtube.com/watch?v=h4Sl21AKiDg',
                      description: 'Complete monitoring setup'
                    },
                    {
                      type: 'documentation',
                      title: 'Grafana Documentation',
                      url: 'https://grafana.com/docs/',
                      description: 'Official Grafana docs'
                    }
                  ],
                  checkpoints: [
                    'Set up Prometheus',
                    'Create Grafana dashboards',
                    'Configure alerts',
                    'Monitor applications'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'ELK Stack',
                  description: 'Centralized logging with Elasticsearch, Logstash, and Kibana.',
                  difficulty: 'Advanced',
                  estimatedTime: '2 weeks',
                  order: 1,
                  topics: ['Elasticsearch', 'Logstash', 'Kibana', 'Logs', 'Search'],
                  prerequisites: ['Kubernetes Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Elastic Stack Documentation',
                      url: 'https://www.elastic.co/guide/index.html',
                      description: 'Official ELK docs'
                    },
                    {
                      type: 'video',
                      title: 'ELK Stack Tutorial',
                      url: 'https://www.youtube.com/watch?v=gS_nHTWZEJ8',
                      description: 'Complete ELK course'
                    }
                  ],
                  checkpoints: [
                    'Set up ELK stack',
                    'Collect logs',
                    'Search and analyze',
                    'Create visualizations'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('✅ Created DevOps Engineer Roadmap');

  // ============================================================================
  // DATA SCIENTIST ROADMAP
  // ============================================================================
  
  await prisma.roadmap.deleteMany({
    where: {
      slug: 'data-scientist'
    }
  });

  await prisma.roadmap.create({
    data: {
      slug: 'data-scientist',
      title: 'Data Scientist',
      description: 'Master statistics, machine learning, and data analysis with Python.',
      icon: '📊',
      level: 'Advanced',
      duration: '10-12 months',
      gradient: 'from-indigo-500 to-purple-500',
      skills: ['Python', 'Statistics', 'Machine Learning', 'Pandas', 'Scikit-learn', 'SQL'],
      popularity: 90,
      order: 5,
      phases: {
        create: [
          {
            title: 'Phase 0: Python & Stats Foundations',
            description: 'Master Python and statistics basics',
            order: 0,
            steps: {
              create: [
                {
                  title: 'Python for Data Science',
                  description: 'Learn Python fundamentals for data analysis.',
                  difficulty: 'Beginner',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['Python Basics', 'Data Structures', 'Functions', 'OOP', 'Libraries'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'Python for Data Science',
                      url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
                      description: 'Complete Python for data science'
                    },
                    {
                      type: 'interactive',
                      title: 'Python Data Science Handbook',
                      url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
                      description: 'Free online book'
                    },
                    {
                      type: 'course',
                      title: 'Python for Everybody',
                      url: 'https://www.py4e.com/',
                      description: 'Comprehensive Python course'
                    }
                  ],
                  checkpoints: [
                    'Write Python programs',
                    'Use data structures',
                    'Import libraries',
                    'Handle files'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: ['arrays', 'sorting'],
                  relatedInterviews: []
                },
                {
                  title: 'Statistics & Probability',
                  description: 'Master statistical concepts for data science.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 1,
                  topics: ['Descriptive Statistics', 'Probability', 'Distributions', 'Hypothesis Testing', 'Correlation'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'Statistics for Data Science',
                      url: 'https://www.youtube.com/watch?v=xxpc-HPKN28',
                      description: 'Statistics fundamentals'
                    },
                    {
                      type: 'book',
                      title: 'Think Stats',
                      url: 'https://greenteapress.com/thinkstats2/html/index.html',
                      description: 'Free statistics book'
                    },
                    {
                      type: 'interactive',
                      title: 'Seeing Theory',
                      url: 'https://seeing-theory.brown.edu/',
                      description: 'Visual intro to probability'
                    }
                  ],
                  checkpoints: [
                    'Calculate statistics',
                    'Understand distributions',
                    'Perform hypothesis tests',
                    'Interpret p-values'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'NumPy & Pandas',
                  description: 'Master data manipulation with NumPy and Pandas.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2-3 weeks',
                  order: 2,
                  topics: ['NumPy Arrays', 'Pandas DataFrames', 'Data Cleaning', 'Aggregation', 'Merging'],
                  prerequisites: ['Python for Data Science'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Pandas Tutorial',
                      url: 'https://www.youtube.com/watch?v=vmEHCJofslg',
                      description: 'Complete Pandas course'
                    },
                    {
                      type: 'documentation',
                      title: 'Pandas Documentation',
                      url: 'https://pandas.pydata.org/docs/',
                      description: 'Official Pandas docs'
                    },
                    {
                      type: 'documentation',
                      title: 'NumPy Documentation',
                      url: 'https://numpy.org/doc/stable/',
                      description: 'Official NumPy docs'
                    }
                  ],
                  checkpoints: [
                    'Manipulate arrays',
                    'Process DataFrames',
                    'Clean data',
                    'Aggregate data'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 1: Data Analysis & Visualization',
            description: 'Analyze and visualize data',
            order: 1,
            steps: {
              create: [
                {
                  title: 'Data Visualization',
                  description: 'Create visualizations with Matplotlib and Seaborn.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2 weeks',
                  order: 0,
                  topics: ['Matplotlib', 'Seaborn', 'Charts', 'Plots', 'Visualization Best Practices'],
                  prerequisites: ['NumPy & Pandas'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Matplotlib Documentation',
                      url: 'https://matplotlib.org/stable/contents.html',
                      description: 'Official Matplotlib docs'
                    },
                    {
                      type: 'video',
                      title: 'Data Visualization with Python',
                      url: 'https://www.youtube.com/watch?v=DAQNHzOcO5A',
                      description: 'Complete visualization course'
                    },
                    {
                      type: 'documentation',
                      title: 'Seaborn Tutorial',
                      url: 'https://seaborn.pydata.org/tutorial.html',
                      description: 'Statistical visualizations'
                    }
                  ],
                  checkpoints: [
                    'Create basic plots',
                    'Make statistical plots',
                    'Customize visualizations',
                    'Tell stories with data'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'SQL for Data Analysis',
                  description: 'Query databases with SQL.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['SQL Queries', 'Joins', 'Aggregation', 'Subqueries', 'Window Functions'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'SQL Tutorial - Full Course',
                      url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
                      description: 'Complete SQL course'
                    },
                    {
                      type: 'interactive',
                      title: 'SQLBolt',
                      url: 'https://sqlbolt.com/',
                      description: 'Interactive SQL lessons'
                    },
                    {
                      type: 'interactive',
                      title: 'Mode SQL Tutorial',
                      url: 'https://mode.com/sql-tutorial/',
                      description: 'SQL for data analysis'
                    }
                  ],
                  checkpoints: [
                    'Write complex queries',
                    'Join tables',
                    'Aggregate data',
                    'Use window functions'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 2: Machine Learning',
            description: 'Build predictive models',
            order: 2,
            steps: {
              create: [
                {
                  title: 'Machine Learning Fundamentals',
                  description: 'Learn ML concepts and algorithms.',
                  difficulty: 'Advanced',
                  estimatedTime: '4-5 weeks',
                  order: 0,
                  topics: ['Supervised Learning', 'Unsupervised Learning', 'Regression', 'Classification', 'Clustering'],
                  prerequisites: ['Statistics & Probability', 'NumPy & Pandas'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Machine Learning Course - Andrew Ng',
                      url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I',
                      description: 'Stanford ML course'
                    },
                    {
                      type: 'course',
                      title: 'Google Machine Learning Crash Course',
                      url: 'https://developers.google.com/machine-learning/crash-course',
                      description: 'Free ML course by Google'
                    },
                    {
                      type: 'book',
                      title: 'Introduction to Statistical Learning',
                      url: 'https://www.statlearning.com/',
                      description: 'Free ML textbook'
                    }
                  ],
                  checkpoints: [
                    'Understand ML concepts',
                    'Choose algorithms',
                    'Evaluate models',
                    'Avoid overfitting'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Scikit-learn',
                  description: 'Build ML models with Scikit-learn.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 1,
                  topics: ['Scikit-learn', 'Model Training', 'Cross-Validation', 'Hyperparameter Tuning', 'Pipelines'],
                  prerequisites: ['Machine Learning Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Scikit-learn Documentation',
                      url: 'https://scikit-learn.org/stable/user_guide.html',
                      description: 'Official scikit-learn docs'
                    },
                    {
                      type: 'video',
                      title: 'Scikit-learn Tutorial',
                      url: 'https://www.youtube.com/watch?v=0B5eIE_1vpU',
                      description: 'Complete scikit-learn course'
                    }
                  ],
                  checkpoints: [
                    'Train ML models',
                    'Cross-validate',
                    'Tune hyperparameters',
                    'Build pipelines'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 3: Advanced Topics',
            description: 'Deep learning and big data',
            order: 3,
            steps: {
              create: [
                {
                  title: 'Feature Engineering',
                  description: 'Create and select features for ML models.',
                  difficulty: 'Advanced',
                  estimatedTime: '2 weeks',
                  order: 0,
                  topics: ['Feature Creation', 'Feature Selection', 'Encoding', 'Scaling', 'Dimensionality Reduction'],
                  prerequisites: ['Scikit-learn'],
                  resources: [
                    {
                      type: 'course',
                      title: 'Feature Engineering Guide',
                      url: 'https://www.kaggle.com/learn/feature-engineering',
                      description: 'Kaggle feature engineering course'
                    },
                    {
                      type: 'video',
                      title: 'Feature Engineering for Machine Learning',
                      url: 'https://www.youtube.com/watch?v=6WDFfaYtN6s',
                      description: 'Feature engineering techniques'
                    }
                  ],
                  checkpoints: [
                    'Create features',
                    'Select features',
                    'Encode categorical variables',
                    'Scale features'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Introduction to Deep Learning',
                  description: 'Learn neural networks with TensorFlow/PyTorch.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 1,
                  topics: ['Neural Networks', 'TensorFlow', 'PyTorch', 'CNNs', 'RNNs'],
                  prerequisites: ['Machine Learning Fundamentals'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Deep Learning Specialization',
                      url: 'https://www.youtube.com/watch?v=CS4cs9xVecg&list=PLkDaE6sCZn6Gl29AoE31iwdVwSG-KnDzF',
                      description: 'Andrew Ng deep learning course'
                    },
                    {
                      type: 'documentation',
                      title: 'TensorFlow Tutorials',
                      url: 'https://www.tensorflow.org/tutorials',
                      description: 'Official TensorFlow tutorials'
                    },
                    {
                      type: 'documentation',
                      title: 'PyTorch Tutorials',
                      url: 'https://pytorch.org/tutorials/',
                      description: 'Official PyTorch tutorials'
                    }
                  ],
                  checkpoints: [
                    'Build neural networks',
                    'Train deep learning models',
                    'Use TensorFlow/PyTorch',
                    'Implement CNNs'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('✅ Created Data Scientist Roadmap');

  // ============================================================================
  // AI/ML ENGINEER ROADMAP
  // ============================================================================
  
  await prisma.roadmap.deleteMany({
    where: {
      slug: 'ai-ml-engineer'
    }
  });

  await prisma.roadmap.create({
    data: {
      slug: 'ai-ml-engineer',
      title: 'AI/ML Engineer',
      description: 'Build and deploy AI systems with deep learning, NLP, and computer vision.',
      icon: '🤖',
      level: 'Advanced',
      duration: '12-15 months',
      gradient: 'from-pink-500 to-rose-500',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision'],
      popularity: 96,
      order: 6,
      phases: {
        create: [
          {
            title: 'Phase 0: ML Foundations',
            description: 'Master machine learning fundamentals',
            order: 0,
            steps: {
              create: [
                {
                  title: 'Python & Math for ML',
                  description: 'Learn Python, linear algebra, and calculus for ML.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['Python', 'NumPy', 'Linear Algebra', 'Calculus', 'Probability'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'Mathematics for Machine Learning',
                      url: 'https://www.youtube.com/watch?v=Rt6beTKDtqY',
                      description: 'ML math fundamentals'
                    },
                    {
                      type: 'book',
                      title: 'Mathematics for Machine Learning',
                      url: 'https://mml-book.github.io/',
                      description: 'Free ML math textbook'
                    }
                  ],
                  checkpoints: [
                    'Use NumPy efficiently',
                    'Understand linear algebra',
                    'Apply calculus concepts',
                    'Work with probability'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Machine Learning Algorithms',
                  description: 'Master supervised and unsupervised learning algorithms.',
                  difficulty: 'Advanced',
                  estimatedTime: '4-5 weeks',
                  order: 1,
                  topics: ['Regression', 'Classification', 'Clustering', 'Decision Trees', 'Random Forests', 'SVM'],
                  prerequisites: ['Python & Math for ML'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Machine Learning Course - Andrew Ng',
                      url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I',
                      description: 'Complete ML course'
                    },
                    {
                      type: 'course',
                      title: 'Google ML Crash Course',
                      url: 'https://developers.google.com/machine-learning/crash-course',
                      description: 'Free ML course by Google'
                    }
                  ],
                  checkpoints: [
                    'Implement ML algorithms',
                    'Train and evaluate models',
                    'Choose appropriate algorithms',
                    'Optimize hyperparameters'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 1: Deep Learning',
            description: 'Master neural networks and deep learning',
            order: 1,
            steps: {
              create: [
                {
                  title: 'Neural Networks',
                  description: 'Learn neural network architectures and training.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['Neural Networks', 'Backpropagation', 'Activation Functions', 'Optimization'],
                  prerequisites: ['Machine Learning Algorithms'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Deep Learning Specialization',
                      url: 'https://www.youtube.com/watch?v=CS4cs9xVecg&list=PLkDaE6sCZn6Gl29AoE31iwdVwSG-KnDzF',
                      description: 'Andrew Ng deep learning'
                    },
                    {
                      type: 'book',
                      title: 'Deep Learning Book',
                      url: 'https://www.deeplearningbook.org/',
                      description: 'Free deep learning textbook'
                    }
                  ],
                  checkpoints: [
                    'Build neural networks',
                    'Train deep models',
                    'Implement backpropagation',
                    'Prevent overfitting'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'TensorFlow & PyTorch',
                  description: 'Master deep learning frameworks.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 1,
                  topics: ['TensorFlow', 'PyTorch', 'Model Building', 'GPU Acceleration'],
                  prerequisites: ['Neural Networks'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'TensorFlow Tutorials',
                      url: 'https://www.tensorflow.org/tutorials',
                      description: 'Official TensorFlow tutorials'
                    },
                    {
                      type: 'documentation',
                      title: 'PyTorch Tutorials',
                      url: 'https://pytorch.org/tutorials/',
                      description: 'Official PyTorch tutorials'
                    }
                  ],
                  checkpoints: [
                    'Use TensorFlow/PyTorch',
                    'Build custom models',
                    'Train on GPUs',
                    'Save and load models'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 2: Computer Vision & NLP',
            description: 'Build CV and NLP applications',
            order: 2,
            steps: {
              create: [
                {
                  title: 'Computer Vision with CNNs',
                  description: 'Build computer vision applications.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['CNNs', 'Image Classification', 'Object Detection', 'Transfer Learning'],
                  prerequisites: ['TensorFlow & PyTorch'],
                  resources: [
                    {
                      type: 'video',
                      title: 'Computer Vision Course',
                      url: 'https://www.youtube.com/watch?v=5C7VWlSAwxg',
                      description: 'Complete computer vision'
                    },
                    {
                      type: 'course',
                      title: 'CS231n Stanford',
                      url: 'http://cs231n.stanford.edu/',
                      description: 'CNNs for visual recognition'
                    }
                  ],
                  checkpoints: [
                    'Build CNNs',
                    'Train image classifiers',
                    'Implement object detection',
                    'Use transfer learning'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'NLP & Transformers',
                  description: 'Master natural language processing.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 1,
                  topics: ['NLP', 'Transformers', 'BERT', 'GPT', 'Hugging Face'],
                  prerequisites: ['TensorFlow & PyTorch'],
                  resources: [
                    {
                      type: 'article',
                      title: 'Illustrated Transformer',
                      url: 'http://jalammar.github.io/illustrated-transformer/',
                      description: 'Visual guide to transformers'
                    },
                    {
                      type: 'documentation',
                      title: 'Hugging Face Transformers',
                      url: 'https://huggingface.co/docs/transformers/index',
                      description: 'State-of-the-art NLP'
                    }
                  ],
                  checkpoints: [
                    'Understand transformers',
                    'Use pretrained models',
                    'Fine-tune models',
                    'Build NLP applications'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('✅ Created AI/ML Engineer Roadmap');

  // ============================================================================
  // MOBILE DEVELOPER ROADMAP
  // ============================================================================
  
  await prisma.roadmap.deleteMany({
    where: {
      slug: 'mobile-developer'
    }
  });

  await prisma.roadmap.create({
    data: {
      slug: 'mobile-developer',
      title: 'Mobile App Developer',
      description: 'Build cross-platform mobile apps with React Native or Flutter.',
      icon: '📱',
      level: 'Intermediate',
      duration: '6-8 months',
      gradient: 'from-teal-500 to-green-500',
      skills: ['React Native', 'Flutter', 'JavaScript', 'Mobile UI', 'APIs'],
      popularity: 85,
      order: 7,
      phases: {
        create: [
          {
            title: 'Phase 0: Foundations',
            description: 'Learn mobile development basics',
            order: 0,
            steps: {
              create: [
                {
                  title: 'JavaScript for Mobile',
                  description: 'Master JavaScript for React Native development.',
                  difficulty: 'Beginner',
                  estimatedTime: '2-3 weeks',
                  order: 0,
                  topics: ['ES6+', 'Async/Await', 'Modules', 'Arrow Functions'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'JavaScript Full Course',
                      url: 'https://www.youtube.com/watch?v=jS4aFq5-91M',
                      description: 'Complete JavaScript'
                    },
                    {
                      type: 'documentation',
                      title: 'JavaScript.info',
                      url: 'https://javascript.info/',
                      description: 'Modern JavaScript tutorials'
                    }
                  ],
                  checkpoints: [
                    'Write modern JavaScript',
                    'Use async/await',
                    'Work with modules',
                    'Understand closures'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 1: React Native',
            description: 'Build mobile apps with React Native',
            order: 1,
            steps: {
              create: [
                {
                  title: 'React Native Fundamentals',
                  description: 'Master React Native components and navigation.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['Components', 'Navigation', 'State', 'Hooks', 'StyleSheet'],
                  prerequisites: ['JavaScript for Mobile'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'React Native Documentation',
                      url: 'https://reactnative.dev/docs/getting-started',
                      description: 'Official React Native docs'
                    },
                    {
                      type: 'video',
                      title: 'React Native Crash Course',
                      url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
                      description: 'Complete React Native tutorial'
                    }
                  ],
                  checkpoints: [
                    'Create React Native apps',
                    'Build UI components',
                    'Implement navigation',
                    'Style components'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'Native Features & APIs',
                  description: 'Access device features and native APIs.',
                  difficulty: 'Intermediate',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['Camera', 'Location', 'Storage', 'Notifications'],
                  prerequisites: ['React Native Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Expo SDK',
                      url: 'https://docs.expo.dev/versions/latest/',
                      description: 'Device APIs'
                    },
                    {
                      type: 'video',
                      title: 'React Native Camera & Permissions',
                      url: 'https://www.youtube.com/watch?v=9Wa9977XM_I',
                      description: 'Access device features'
                    }
                  ],
                  checkpoints: [
                    'Use camera and photos',
                    'Get location data',
                    'Store data locally',
                    'Send notifications'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 2: Deployment',
            description: 'Publish apps to app stores',
            order: 2,
            steps: {
              create: [
                {
                  title: 'App Store Deployment',
                  description: 'Build and publish to iOS App Store and Google Play.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 0,
                  topics: ['App Store', 'Google Play', 'Code Signing', 'Release Management'],
                  prerequisites: ['React Native Fundamentals'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Expo Application Services',
                      url: 'https://docs.expo.dev/eas/',
                      description: 'Build and submit apps'
                    },
                    {
                      type: 'video',
                      title: 'Publish to App Store',
                      url: 'https://www.youtube.com/watch?v=LE4Mgkrf4Sk',
                      description: 'Complete deployment tutorial'
                    }
                  ],
                  checkpoints: [
                    'Build production apps',
                    'Submit to App Store',
                    'Publish to Google Play',
                    'Manage app updates'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('✅ Created Mobile App Developer Roadmap');

  // ============================================================================
  // CLOUD ENGINEER ROADMAP
  // ============================================================================
  
  await prisma.roadmap.deleteMany({
    where: {
      slug: 'cloud-engineer'
    }
  });

  await prisma.roadmap.create({
    data: {
      slug: 'cloud-engineer',
      title: 'Cloud Engineer',
      description: 'Master AWS, Azure, and cloud infrastructure management.',
      icon: '☁️',
      level: 'Advanced',
      duration: '8-10 months',
      gradient: 'from-sky-500 to-blue-600',
      skills: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Networking'],
      popularity: 89,
      order: 8,
      phases: {
        create: [
          {
            title: 'Phase 0: Cloud Fundamentals',
            description: 'Learn cloud computing basics',
            order: 0,
            steps: {
              create: [
                {
                  title: 'Cloud Computing Concepts',
                  description: 'Understand cloud service models and deployment types.',
                  difficulty: 'Beginner',
                  estimatedTime: '1-2 weeks',
                  order: 0,
                  topics: ['IaaS', 'PaaS', 'SaaS', 'Public Cloud', 'Private Cloud'],
                  prerequisites: [],
                  resources: [
                    {
                      type: 'video',
                      title: 'Cloud Computing Full Course',
                      url: 'https://www.youtube.com/watch?v=M988_fsOSWo',
                      description: 'Cloud computing fundamentals'
                    },
                    {
                      type: 'course',
                      title: 'AWS Cloud Practitioner Essentials',
                      url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/',
                      description: 'Free cloud basics course'
                    }
                  ],
                  checkpoints: [
                    'Understand cloud models',
                    'Know deployment types',
                    'Compare cloud providers',
                    'Learn cloud benefits'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 1: AWS Core Services',
            description: 'Master Amazon Web Services',
            order: 1,
            steps: {
              create: [
                {
                  title: 'AWS Compute & Storage',
                  description: 'Learn EC2, S3, and core AWS services.',
                  difficulty: 'Intermediate',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['EC2', 'S3', 'EBS', 'Lambda', 'Load Balancers'],
                  prerequisites: ['Cloud Computing Concepts'],
                  resources: [
                    {
                      type: 'video',
                      title: 'AWS Certified Solutions Architect',
                      url: 'https://www.youtube.com/watch?v=Ia-UEYYR44s',
                      description: 'Complete AWS course'
                    },
                    {
                      type: 'documentation',
                      title: 'AWS Documentation',
                      url: 'https://docs.aws.amazon.com/',
                      description: 'Official AWS docs'
                    }
                  ],
                  checkpoints: [
                    'Launch EC2 instances',
                    'Use S3 storage',
                    'Create Lambda functions',
                    'Configure load balancers'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                },
                {
                  title: 'AWS Networking & Security',
                  description: 'Master VPC, IAM, and security best practices.',
                  difficulty: 'Advanced',
                  estimatedTime: '2-3 weeks',
                  order: 1,
                  topics: ['VPC', 'IAM', 'Security Groups', 'ACLs', 'Route 53'],
                  prerequisites: ['AWS Compute & Storage'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'AWS VPC Guide',
                      url: 'https://docs.aws.amazon.com/vpc/',
                      description: 'VPC documentation'
                    },
                    {
                      type: 'video',
                      title: 'AWS Networking Deep Dive',
                      url: 'https://www.youtube.com/watch?v=hiKPPy584Mg',
                      description: 'Advanced networking'
                    }
                  ],
                  checkpoints: [
                    'Design VPCs',
                    'Manage IAM',
                    'Configure security groups',
                    'Set up DNS'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          },
          {
            title: 'Phase 2: Infrastructure as Code',
            description: 'Automate infrastructure with Terraform',
            order: 2,
            steps: {
              create: [
                {
                  title: 'Terraform',
                  description: 'Provision cloud infrastructure with Terraform.',
                  difficulty: 'Advanced',
                  estimatedTime: '3-4 weeks',
                  order: 0,
                  topics: ['HCL', 'Modules', 'State', 'Providers'],
                  prerequisites: ['AWS Core Services'],
                  resources: [
                    {
                      type: 'documentation',
                      title: 'Terraform Documentation',
                      url: 'https://developer.hashicorp.com/terraform/docs',
                      description: 'Official Terraform docs'
                    },
                    {
                      type: 'video',
                      title: 'Terraform Course',
                      url: 'https://www.youtube.com/watch?v=SLB_c_ayRMo',
                      description: 'Complete Terraform tutorial'
                    }
                  ],
                  checkpoints: [
                    'Write Terraform configs',
                    'Manage state',
                    'Create modules',
                    'Deploy infrastructure'
                  ],
                  relatedCheatsheets: [],
                  relatedDSA: [],
                  relatedInterviews: []
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('✅ Created Cloud Engineer Roadmap');

  console.log('\n✅ All roadmaps seeded successfully!\n');
}

async function main() {
  try {
    await seedRoadmaps();
  } catch (error) {
    console.error('Error seeding roadmaps:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
