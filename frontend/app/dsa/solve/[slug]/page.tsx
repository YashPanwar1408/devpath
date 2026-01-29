"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Play, Upload } from "lucide-react";
import { Panel, Group, Separator } from "react-resizable-panels";

type Language = "python" | "javascript" | "java" | "cpp";

interface Problem {
  title: string;
  difficulty: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
}

const LANGS: Record<Language, string> = {
  python: "Python",
  javascript: "JavaScript",
  java: "Java",
  cpp: "C++",
};

export default function SolvePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let cancelled = false;
    
    async function loadProblem() {
      try {
        const r = await fetch(`http://localhost:5000/api/dsa/problems/${slug}`);
        const j = await r.json();
        if (!cancelled) {
          // Adjust based on your actual API response structure
          setProblem(j); 
          setCode(j.starterCode?.[language] || "// Write your code here");
        }
      } catch (err) {
        console.error("Error loading problem:", err);
      }
    }
    
    loadProblem();
    
    return () => {
      cancelled = true;
    };
  }, [slug, language]);

  if (!problem)
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f172a] text-white">
        Loading...
      </div>
    );

  return (
    <div className="h-screen w-full flex flex-col bg-[#0f172a] text-white overflow-hidden">

      {/* HEADER */}
      <div className="h-14 shrink-0 border-b border-slate-800 px-4 flex items-center justify-between bg-[#020617]">

        <div className="flex items-center gap-3">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer hover:text-blue-500 transition" />
          <span className="font-medium">{problem.title}</span>
        </div>

        <div className="flex bg-slate-800 rounded overflow-hidden">
          {(Object.keys(LANGS) as Language[]).map(l => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`px-4 py-1 text-sm transition-colors ${
                language === l ? "bg-slate-600 text-white" : "text-slate-400 hover:bg-slate-700"
              }`}
            >
              {LANGS[l]}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => {
              setRunning(true);
              setOutput("Running code...");
              setTimeout(() => {
                setOutput("✓ Code executed successfully");
                setRunning(false);
              }, 1000);
            }} 
            disabled={running}
            className="bg-slate-700 hover:bg-slate-600 px-4 py-1 rounded flex items-center gap-2 disabled:opacity-50 transition-colors"
          >
            <Play size={14} /> Run
          </button>
          <button 
            onClick={() => {
              setOutput("Submitting...");
              setTimeout(() => setOutput("✓ Submission accepted"), 1000);
            }}
            className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded flex items-center gap-2 transition-colors"
          >
            <Upload size={14} /> Submit
          </button>
        </div>

      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal" className="h-full">

          {/* LEFT: Description */}
          <Panel defaultSize={40} minSize={20} className="h-full bg-slate-900/50">
            <div className="h-full overflow-y-auto p-6">
              {/* Problem Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                <div 
                  className="problem-content text-slate-300"
                  dangerouslySetInnerHTML={{ __html: problem.description }} 
                />
              </div>
              
              {/* Examples Section */}
              {problem.examples && problem.examples.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
                  <div className="space-y-4">
                    {problem.examples.map((ex, i) => (
                      <div key={i} className="bg-slate-800/30 border border-slate-700 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-emerald-400 mb-2">Example {i + 1}:</p>
                        <div className="space-y-2">
                          <div className="bg-slate-900/50 p-3 rounded">
                            <span className="text-xs text-slate-500 font-semibold">Input:</span>
                            <pre className="text-sm text-slate-200 mt-1 font-mono">{ex.input}</pre>
                          </div>
                          <div className="bg-slate-900/50 p-3 rounded">
                            <span className="text-xs text-slate-500 font-semibold">Output:</span>
                            <pre className="text-sm text-slate-200 mt-1 font-mono">{ex.output}</pre>
                          </div>
                          {ex.explanation && (
                            <div className="mt-2">
                              <span className="text-xs text-slate-500 font-semibold">Explanation:</span>
                              <div 
                                className="text-sm text-slate-300 mt-1 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: ex.explanation }} 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Constraints Section */}
              {problem.constraints && problem.constraints.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                  <ul className="space-y-2 list-none">
                    {problem.constraints.map((constraint, i) => (
                      <li 
                        key={i} 
                        className="text-sm text-slate-300 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-slate-500"
                        dangerouslySetInnerHTML={{ __html: constraint }} 
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Panel>

          <Separator className="w-2 bg-slate-800 hover:bg-blue-600 transition-colors flex items-center justify-center cursor-col-resize group">
             <div className="w-1 h-8 rounded-full bg-slate-600 group-hover:bg-white" />
          </Separator>

          {/* RIGHT: Editor & Console */}
          <Panel defaultSize={60} minSize={30} className="h-full">
            <Group orientation="vertical" className="h-full">
              {/* EDITOR */}
              <Panel defaultSize={70} minSize={20} className="h-full">
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="h-full w-full bg-[#020617] p-4 font-mono text-sm resize-none outline-none text-slate-300"
                  spellCheck={false}
                />
              </Panel>

              <Separator className="h-2 bg-slate-800 hover:bg-blue-600 transition-colors flex items-center justify-center cursor-row-resize group">
                 <div className="h-1 w-8 rounded-full bg-slate-600 group-hover:bg-white" />
              </Separator>

              {/* CONSOLE */}
              <Panel defaultSize={30} minSize={10} className="h-full">
                <div className="h-full bg-[#0f172a] flex flex-col">
                  <div className="h-8 border-b border-slate-800 flex items-center px-4 text-xs font-semibold text-slate-400 bg-slate-900/50">
                    Console
                  </div>
                  <div className="flex-1 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap text-green-400">
                    {output || <span className="text-slate-600">Output will appear here</span>}
                  </div>
                </div>
              </Panel>

            </Group>
          </Panel>

        </Group>
      </div>
    </div>
  );
}