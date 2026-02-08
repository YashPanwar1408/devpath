export default function FullStackPage() {
  const learningPaths = [
    {
      category: "Frontend Fundamentals",
      topics: ["HTML", "CSS", "JavaScript"],
      icon: "🎨",
      description: "Master the building blocks of web interfaces"
    },
    {
      category: "Modern Frameworks",
      topics: ["React", "Next.js"],
      icon: "⚛️",
      description: "Build dynamic, scalable applications"
    },
    {
      category: "Backend & APIs",
      topics: ["Node.js", "Backend Architecture"],
      icon: "🔧",
      description: "Create powerful server-side applications"
    },
    {
      category: "Data & Infrastructure",
      topics: ["Databases", "DevOps", "Cloud"],
      icon: "💾",
      description: "Manage data and deploy applications"
    },
    {
      category: "Advanced Topics",
      topics: ["System Design", "Security", "Performance"],
      icon: "🚀",
      description: "Build enterprise-grade applications"
    },
    {
      category: "Professional Skills",
      topics: ["Testing", "Mobile Development", "Developer Tools"],
      icon: "💼",
      description: "Industry best practices and tools"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* Hero Section */}
      <div className="mb-16 space-y-6">
        <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold mb-4">
          🎓 Complete Learning Path
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-purple-400">
          Full Stack Development
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
          Master the complete web development stack from frontend to backend, databases to deployment. 
          Build production-ready applications with modern technologies and best practices.
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          <div className="px-4 py-2 bg-card/50 border border-white/10 rounded-lg">
            <span className="text-purple-400 font-semibold">16 Categories</span>
          </div>
          <div className="px-4 py-2 bg-card/50 border border-white/10 rounded-lg">
            <span className="text-pink-400 font-semibold">100+ Topics</span>
          </div>
          <div className="px-4 py-2 bg-card/50 border border-white/10 rounded-lg">
            <span className="text-blue-400 font-semibold">Beginner to Advanced</span>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-4xl">📚</span>
          What You&apos;ll Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map((path, idx) => (
            <div 
              key={idx}
              className="group p-6 bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{path.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                    {path.category}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{path.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {path.topics.map((topic, topicIdx) => (
                      <span 
                        key={topicIdx}
                        className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Full Stack */}
      <div className="mb-16 p-8 bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span className="text-4xl">🌟</span>
          Why Full Stack Development?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-400">Complete Control</div>
            <p className="text-gray-400">
              Build entire applications from database to user interface. Understand how all pieces fit together.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-pink-400">High Demand</div>
            <p className="text-gray-400">
              Full stack developers are among the most sought-after professionals in the tech industry.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-400">Versatility</div>
            <p className="text-gray-400">
              Work on diverse projects, from startups to enterprise applications, with the skills to handle any challenge.
            </p>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-4xl">🚀</span>
          Getting Started
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4 p-6 bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-green-500/30 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center text-green-400 font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Start with HTML</h3>
              <p className="text-gray-400">
                Begin with HTML to understand the structure of web pages. It&apos;s the foundation of everything you&apos;ll build.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-blue-500/30 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Style with CSS</h3>
              <p className="text-gray-400">
                Learn to make your pages beautiful and responsive. Master layouts, animations, and modern CSS features.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-yellow-500/30 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center text-yellow-400 font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Add Interactivity with JavaScript</h3>
              <p className="text-gray-400">
                Make your websites dynamic and interactive. JavaScript is the programming language of the web.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/30 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400 font-bold text-xl">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Progress Through The Curriculum</h3>
              <p className="text-gray-400">
                Continue with React, Node.js, databases, and beyond. Each topic builds on previous knowledge to create a complete skillset.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center p-12 bg-linear-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-3xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
        <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
          Select any topic from the sidebar to start learning. Each lesson includes comprehensive explanations, 
          examples, and best practices to help you master the material.
        </p>
        <div className="inline-flex items-center gap-2 text-purple-400 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          Choose a topic from the sidebar to get started
        </div>
      </div>
    </div>
  );
}
