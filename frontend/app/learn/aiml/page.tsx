export default function AIMLPage() {
  const learningPaths = [
    {
      category: "Python Fundamentals",
      topics: ["Python", "Python OOP", "File Handling", "Python Libraries"],
      icon: "🐍",
      description: "Master Python programming from basics to OOP"
    },
    {
      category: "Data Science Tools",
      topics: ["NumPy", "Pandas", "Data Visualization", "Statistics"],
      icon: "📊",
      description: "Essential libraries for data manipulation and analysis"
    },
    {
      category: "Mathematics & Theory",
      topics: ["Mathematics for AI", "Data Science", "Statistics"],
      icon: "🧮",
      description: "Build strong mathematical foundations"
    },
    {
      category: "Machine Learning",
      topics: ["ML Algorithms", "Model Training", "Deep Learning"],
      icon: "🤖",
      description: "Implement ML models and neural networks"
    },
    {
      category: "Frameworks & Tools",
      topics: ["TensorFlow", "Python DSA", "Databases"],
      icon: "🛠️",
      description: "Production ML with modern frameworks"
    },
    {
      category: "AI Theory & Practice",
      topics: ["AI History", "Prompt Engineering", "References"],
      icon: "🧠",
      description: "Understand AI evolution and practical techniques"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* Hero Section */}
      <div className="mb-16 space-y-6">
        <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-semibold mb-4">
          🤖 Complete AI/ML Curriculum
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-400 via-yellow-400 to-orange-400">
          AI & Machine Learning with Python
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
          Master artificial intelligence and machine learning from fundamentals to advanced topics. 
          Learn Python, data science tools, ML algorithms, and deploy production-ready AI systems.
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          <div className="px-4 py-2 bg-card/50 border border-white/10 rounded-lg">
            <span className="text-orange-400 font-semibold">32 Categories</span>
          </div>
          <div className="px-4 py-2 bg-card/50 border border-white/10 rounded-lg">
            <span className="text-yellow-400 font-semibold">282 Topics</span>
          </div>
          <div className="px-4 py-2 bg-card/50 border border-white/10 rounded-lg">
            <span className="text-amber-400 font-semibold">Beginner to Advanced</span>
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
              className="group p-6 bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{path.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-300 transition-colors">
                    {path.category}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{path.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {path.topics.map((topic, topicIdx) => (
                      <span 
                        key={topicIdx}
                        className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-300"
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

      {/* Why AI/ML */}
      <div className="mb-16 p-8 bg-linear-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span className="text-4xl">🌟</span>
          Why Learn AI & Machine Learning?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-orange-400">Future-Proof Career</div>
            <p className="text-gray-400">
              AI/ML skills are among the most in-demand in tech. Lead innovation and solve real-world problems.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-yellow-400">High Impact</div>
            <p className="text-gray-400">
              Build intelligent systems that learn, adapt, and make predictions. Transform industries with AI.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-amber-400">Rapid Growth</div>
            <p className="text-gray-400">
              The AI field evolves constantly. Early expertise positions you at the forefront of technological advancement.
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
              <h3 className="text-xl font-bold mb-2 text-white">Start with Python Basics</h3>
              <p className="text-gray-400">
                Begin with Python fundamentals. Learn variables, data types, functions, and object-oriented programming concepts.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-blue-500/30 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Master Data Science Tools</h3>
              <p className="text-gray-400">
                Learn NumPy, Pandas, and Matplotlib. These are essential for data manipulation, analysis, and visualization.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/30 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400 font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Build ML Models</h3>
              <p className="text-gray-400">
                Apply machine learning algorithms. Implement regression, classification, and neural networks with real datasets.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-orange-500/30 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center text-orange-400 font-bold text-xl">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Deploy Production Systems</h3>
              <p className="text-gray-400">
                Learn TensorFlow, model deployment, and production best practices. Build AI systems that scale.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center p-12 bg-linear-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 border border-orange-500/20 rounded-3xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
        <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
          Select any topic from the sidebar to begin learning. Each lesson includes comprehensive explanations, 
          practical examples, and real-world applications to accelerate your AI/ML mastery.
        </p>
        <div className="inline-flex items-center gap-2 text-orange-400 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          Choose a topic from the sidebar to get started
        </div>
      </div>
    </div>
  );
}
