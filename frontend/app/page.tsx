'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- UI Icons (General Interface) ---
const Icons = {
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Brain: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  FileText: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
  Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1"/><path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4"/></svg>,
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
};



export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-blue-500/30">
      
      {/* --- Dynamic Navbar (Big to Small) --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${
        scrolled ? 'pt-4' : 'pt-6'
      }`}>
        <div className={`transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'w-100 md:w-150 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6 shadow-glow-blue' 
            : 'w-full max-w-7xl bg-transparent py-4 px-6 border-transparent'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className={`font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400 transition-all duration-500 ${
              scrolled ? 'text-lg' : 'text-2xl'
            }`}>
              DevPath
            </div>
            
            {/* Links - Fade out on mobile when scrolled to save space, or keep generic */}
            <div className={`hidden md:flex items-center gap-6 text-sm font-medium transition-all duration-500 ${
               scrolled ? 'gap-4 text-xs' : 'gap-8'
            }`}>
              {['Features', 'Roadmaps', 'Pricing'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                  {item}
                </Link>
              ))}
            </div>

            {/* Action Button */}
            <Link href="/sign-in">
              <button className={`bg-white text-black font-bold hover:bg-gray-200 transition-all rounded-full ${
                scrolled ? 'px-4 py-1.5 text-xs' : 'px-6 py-2.5 text-sm'
              }`}>
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Spotlight */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
        {/* Spotlight Effect */}
        <div className="absolute top-0 left-0 md:left-60 w-full h-full animate-spotlight pointer-events-none opacity-0">
          <div className="w-full h-full bg-blue-500/10 blur-3xl transform -rotate-45" />
        </div>
        
        {/* Dot Pattern Background with Mask */}
        <div className="absolute inset-0 bg-dot-white/[0.2] -z-10" />
        <div className="absolute inset-0 bg-black mask-radial-gradient -z-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300 mb-4 animate-fadeIn">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v1.0 is now live
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tight">
            <span className="block text-gray-300">Crack the Code to</span>
            <span className="bg-clip-text text-transparent bg-linear-to-b from-blue-400 via-purple-500 to-pink-500">
              Your Dream Career
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The all-in-one platform for CS students. Master DSA, build ATS-proof resumes, and ace AI mock interviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/sign-in">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Get Started Free
                </span>
              </button>
            </Link>
            
            <button className="flex items-center gap-2 px-8 py-3 rounded-full text-gray-300 hover:text-white transition-colors text-sm font-medium group">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                 <Icons.Play />
              </span>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Infinite Scroll Slider with Brand Icons */}
      <div className="py-16 relative border-y border-white/5 bg-slate-900/30 backdrop-blur-sm">
        <InfiniteSlider />
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-slate-950 via-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-slate-950 via-slate-950 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Excellence</h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            We&apos;ve deconstructed the placement process into four essential pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-auto">
          
          {/* Card 1: Learning (Large, spans 2 cols) */}
          <div className="glass-card md:col-span-2 md:row-span-1 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:opacity-40 transition-opacity">
               <div className="w-64 h-64 bg-blue-500 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <Icons.Code />
              </div>
              <h3 className="text-3xl font-bold mb-4">Interactive Learning Paths</h3>
              <p className="text-gray-400 max-w-md mb-8">
                Structured roadmaps for Full Stack, AI/ML, and DevOps. Learn by doing with our in-browser IDE and real-time project validation.
              </p>
              
              {/* Mock UI Code Snippet */}
              <div className="w-full bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-gray-300">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <p><span className="text-pink-400">const</span> <span className="text-blue-400">student</span> = <span className="text-yellow-400">new</span> Developer();</p>
                <p>student.<span className="text-purple-400">master</span>(<span className="text-green-400">&quot;Next.js&quot;</span>);</p>
                <p className="text-gray-500">{"// Result: Hired 🎉"}</p>
              </div>
            </div>
          </div>

          {/* Card 2: Resume (Tall, spans 1 col, 2 rows) */}
          <div className="glass-card md:col-span-1 md:row-span-2 rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between">
             <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div>
               <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 mb-6">
                 <Icons.FileText />
               </div>
               <h3 className="text-3xl font-bold mb-4">ATS Resumes</h3>
               <p className="text-gray-400 mb-8">
                 Beat the bots. Our AI analyzes your resume against job descriptions to ensure you pass the screening.
               </p>
             </div>

             <div className="relative h-64 w-full bg-white/5 rounded-xl border border-white/10 p-4 transform group-hover:scale-105 transition-transform duration-500">
                <div className="absolute top-4 right-4 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">98 Score</div>
                <div className="w-16 h-16 rounded-full bg-gray-700 mb-4" />
                <div className="h-2 w-3/4 bg-gray-700 rounded mb-2" />
                <div className="h-2 w-1/2 bg-gray-700 rounded mb-6" />
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-gray-800 rounded" />
                  <div className="h-1.5 w-full bg-gray-800 rounded" />
                  <div className="h-1.5 w-5/6 bg-gray-800 rounded" />
                </div>
             </div>
          </div>

          {/* Card 3: Interview (Square, spans 1 col) */}
          <div className="glass-card md:col-span-1 md:row-span-1 rounded-3xl p-8 relative group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
              <Icons.Brain />
            </div>
            <h3 className="text-2xl font-bold mb-2">AI Interviews</h3>
            <p className="text-gray-400 text-sm">
              Practice with a realistic AI interviewer that adapts to your responses and provides detailed feedback on tone and accuracy.
            </p>
          </div>

          {/* Card 4: Practice (Square, spans 1 col) */}
          <div className="glass-card md:col-span-1 md:row-span-1 rounded-3xl p-8 relative group">
             <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-6">
              <Icons.Rocket />
            </div>
            <h3 className="text-2xl font-bold mb-2">500+ Problems</h3>
            <p className="text-gray-400 text-sm">
              Curated DSA sheets (Striver, Love Babbar) integrated with a powerful code editor and test cases.
            </p>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-24 px-6 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-blue-600 mb-2">
                10K+
              </div>
              <div className="text-gray-400 text-sm md:text-base">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-400 to-purple-600 mb-2">
                500+
              </div>
              <div className="text-gray-400 text-sm md:text-base">DSA Problems</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-pink-400 to-pink-600 mb-2">
                95%
              </div>
              <div className="text-gray-400 text-sm md:text-base">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-green-600 mb-2">
                24/7
              </div>
              <div className="text-gray-400 text-sm md:text-base">AI Support</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Loved by Students</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands who transformed their careers with DevPath
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-transform">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;DevPath helped me land my dream job at Google. The AI mock interviews were incredibly realistic!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-sm text-gray-400">SDE @ Google</div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-transform">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;The DSA practice section is better than LeetCode. Clean UI and excellent problem categorization.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600" />
                <div>
                  <div className="font-semibold">Rahul Kumar</div>
                  <div className="text-sm text-gray-400">SDE @ Microsoft</div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-transform">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;The resume ATS checker saved me! Went from 40% to 98% score. Got 3 interview calls in a week.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-600" />
                <div>
                  <div className="font-semibold">Priya Sharma</div>
                  <div className="text-sm text-gray-400">SDE @ Amazon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Ready to <span className="text-blue-400">Launch?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join 10,000+ students who have already secured their dream jobs using DevPath.
          </p>
          <Link href="/sign-in">
            <button className="px-12 py-5 rounded-full bg-white text-black font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
              Start for Free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">DevPath</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <Link href="#" className="hover:text-blue-400 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">GitHub</Link>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm border-t border-white/5 pt-8">
            © 2026 DevPath Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Components ---

function InfiniteSlider() {
  const items = [
    { label: 'React', icon: '/icons8-react-48.png' },
    { label: 'JavaScript', icon: '/icons8-javascript-48.png' },
    { label: 'TypeScript', icon: '/icons8-typescript-48.png' },
    { label: 'Python', icon: '/icons8-python-48.png' },
    { label: 'Java', icon: '/icons8-java-48.png' },
    { label: 'C', icon: '/icons8-c-48.png' },
    { label: 'Node.js', icon: '/icons8-nodejs-96.png' },
    { label: 'HTML', icon: '/icons8-html-48.png' },
    { label: 'CSS', icon: '/icons8-css-48.png' },
    { label: 'Docker', icon: '/icons8-docker-48.png' },
    { label: 'Kubernetes', icon: '/icons8-kubernetes-50.png' },
    { label: 'AWS', icon: '/icons8-aws-96.png' },
    { label: 'MongoDB', icon: '/icons8-mongodb-48.png' },
    { label: 'MySQL', icon: '/icons8-mysql-48.png' },
    { label: 'Next.js', icon: '/icons8-nextjs-48.png' },
  ];

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex animate-scroll hover:pause-animation gap-12 w-max">
        {/* Triple the items to ensure seamless infinity scroll on large screens */}
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-8 py-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer group shrink-0">
            <div className="relative w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
              <Image
                src={item.icon}
                alt={item.label}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-gray-400 group-hover:text-white transition-colors whitespace-nowrap">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}