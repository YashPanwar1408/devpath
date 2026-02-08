'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface Cheatsheet {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  difficulty: string;
  tags: string[];
  popularity: number;
  overview: string;
  syntax: Record<string, { title: string; code: string }>;
  operations: Record<string, { title: string; code: string }>;
  examples: Record<string, { title: string; code: string }>;
  mistakes: string[];
  tips: string[];
  category: {
    slug: string;
    title: string;
    icon: string;
    color: string;
  };
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs text-white transition-colors"
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  );
};

const CodeBlock = ({ title, code }: { title: string; code: string }) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-white mb-3">{title}</h4>
      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 overflow-x-auto">
        <CopyButton text={code} />
        <pre className="text-sm text-gray-300 font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function CheatsheetPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.categorySlug as string;
  const cheatsheetSlug = params.cheatsheetSlug as string;

  const [cheatsheet, setCheatsheet] = useState<Cheatsheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    async function fetchCheatsheet() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/cheatsheets/${categorySlug}/${cheatsheetSlug}`
        );
        if (!response.ok) {
          router.push(`/cheatsheets/${categorySlug}`);
          return;
        }
        const data = await response.json();
        setCheatsheet(data);
      } catch (error) {
        console.error('Error fetching cheatsheet:', error);
        router.push(`/cheatsheets/${categorySlug}`);
      } finally {
        setLoading(false);
      }
    }

    fetchCheatsheet();
  }, [categorySlug, cheatsheetSlug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!cheatsheet) {
    return null;
  }

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'syntax', label: 'Syntax', icon: '💻' },
    { id: 'operations', label: 'Operations', icon: '⚙️' },
    { id: 'examples', label: 'Examples', icon: '✨' },
    { id: 'mistakes', label: 'Common Mistakes', icon: '⚠️' },
    { id: 'tips', label: 'Interview Tips', icon: '💡' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/cheatsheets/${categorySlug}`}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-3xl">{cheatsheet.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-white">{cheatsheet.title}</h1>
                <p className="text-sm text-gray-400">{cheatsheet.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg">
                <span className="text-sm text-amber-300 font-medium">{cheatsheet.difficulty}</span>
              </div>
              <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-sm text-gray-300">👁️ {cheatsheet.popularity} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="col-span-3">
            <div className="sticky top-24">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Sections</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
                          : 'hover:bg-white/5 text-gray-400'
                      }`}
                    >
                      <span>{section.icon}</span>
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Tags */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {cheatsheet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-8">
            {/* Overview */}
            <section id="overview">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">📖</span>
                  <h2 className="text-3xl font-bold text-white">Overview</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                    {cheatsheet.overview}
                  </div>
                </div>
              </Card>
            </section>

            {/* Syntax */}
            <section id="syntax">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">💻</span>
                  <h2 className="text-3xl font-bold text-white">Syntax & Core Concepts</h2>
                </div>
                <div className="space-y-6">
                  {Object.entries(cheatsheet.syntax).map(([key, value]) => (
                    <CodeBlock key={key} title={value.title} code={value.code} />
                  ))}
                </div>
              </Card>
            </section>

            {/* Operations */}
            <section id="operations">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">⚙️</span>
                  <h2 className="text-3xl font-bold text-white">Common Operations</h2>
                </div>
                <div className="space-y-6">
                  {Object.entries(cheatsheet.operations).map(([key, value]) => (
                    <CodeBlock key={key} title={value.title} code={value.code} />
                  ))}
                </div>
              </Card>
            </section>

            {/* Examples */}
            <section id="examples">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">✨</span>
                  <h2 className="text-3xl font-bold text-white">Practical Examples</h2>
                </div>
                <div className="space-y-6">
                  {Object.entries(cheatsheet.examples).map(([key, value]) => (
                    <CodeBlock key={key} title={value.title} code={value.code} />
                  ))}
                </div>
              </Card>
            </section>

            {/* Common Mistakes */}
            <section id="mistakes">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">⚠️</span>
                  <h2 className="text-3xl font-bold text-white">Common Mistakes</h2>
                </div>
                <ul className="space-y-4">
                  {cheatsheet.mistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-300 text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-gray-300 pt-1">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            {/* Interview Tips */}
            <section id="tips">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">💡</span>
                  <h2 className="text-3xl font-bold text-white">Interview Tips</h2>
                </div>
                <ul className="space-y-4">
                  {cheatsheet.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-gray-300 pt-1">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
