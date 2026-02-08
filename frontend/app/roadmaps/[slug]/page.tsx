'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ChevronDown,
  ChevronRight,
  Check,
  Clock,
  BookOpen,
  Target,
  ArrowLeft,
  CheckCircle2,
  Circle,
} from 'lucide-react';

interface Resource {
  type: string;
  title: string;
  url: string;
  description: string;
}

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  order: number;
  topics: string[];
  prerequisites: string[];
  resources: Resource[];
  relatedCheatsheets: string[];
  relatedDSA: string[];
  relatedInterviews: string[];
  checkpoints: string[];
}

interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  order: number;
  steps: RoadmapStep[];
}

interface Roadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  level: string;
  duration: string;
  gradient: string;
  phases: RoadmapPhase[];
}

export default function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    new Set()
  );
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/roadmaps/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap');
        }
        const data = await response.json();
        setRoadmap(data);
        
        // Set first phase as expanded and first step as selected
        if (data.phases && data.phases.length > 0) {
          setExpandedPhases(new Set([data.phases[0].id]));
          if (data.phases[0].steps && data.phases[0].steps.length > 0) {
            setSelectedStep(data.phases[0].steps[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching roadmap:', err);
        setError('Failed to load roadmap. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Roadmap not found'}</p>
          <Button onClick={() => router.push('/roadmaps')}>Back to Roadmaps</Button>
        </div>
      </div>
    );
  }

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const toggleStepComplete = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const getCurrentStep = () => {
    if (!selectedStep) return null;
    for (const phase of roadmap.phases) {
      const step = phase.steps.find((s) => s.id === selectedStep);
      if (step) return step;
    }
    return null;
  };

  const currentStep = getCurrentStep();

  // Calculate progress
  const totalSteps = roadmap.phases.reduce(
    (sum, phase) => sum + phase.steps.length,
    0
  );
  const completedCount = completedSteps.size;
  const progressPercentage = (completedCount / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/roadmaps')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Roadmaps
              </Button>
              <div className="h-6 w-px bg-gray-700" />
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-2xl">{roadmap.icon}</span>
                  {roadmap.title}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                {completedCount} / {totalSteps} steps completed
              </div>
              <div className="w-48">
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <Badge
                className={`${
                  roadmap.level === 'Beginner'
                    ? 'bg-green-500/20 text-green-300 border-green-500/30'
                    : roadmap.level === 'Intermediate'
                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      : 'bg-red-500/20 text-red-300 border-red-500/30'
                } border`}
              >
                {roadmap.level}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto flex">
        {/* Left Sidebar - Roadmap Tree */}
        <div className="w-96 border-r border-gray-800 bg-gray-900/50 h-[calc(100vh-73px)] overflow-y-auto sticky top-[73px]">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-400 mb-2">
                LEARNING PATH
              </h2>
              <p className="text-xs text-gray-500">{roadmap.description}</p>
            </div>

            {/* Phase Tree */}
            <div className="space-y-2">
              {roadmap.phases.map((phase) => {
                const phaseCompleted = phase.steps.every((step) =>
                  completedSteps.has(step.id)
                );
                const phaseProgress =
                  (phase.steps.filter((step) =>
                    completedSteps.has(step.id)
                  ).length /
                    phase.steps.length) *
                  100;

                return (
                  <div key={phase.id}>
                    {/* Phase Header */}
                    <button
                      onClick={() => togglePhase(phase.id)}
                      className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
                        expandedPhases.has(phase.id)
                          ? 'bg-gray-800 text-white'
                          : 'hover:bg-gray-800/50 text-gray-300'
                      }`}
                    >
                      {expandedPhases.has(phase.id) ? (
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      )}
                      {phaseCompleted ? (
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-500" />
                      ) : (
                        <Circle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                      )}
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">
                          Phase {phase.order}: {phase.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {phase.steps.length} steps
                        </div>
                      </div>
                    </button>

                    {/* Phase Progress Bar */}
                    {phaseProgress > 0 && phaseProgress < 100 && (
                      <div className="ml-9 mt-1 mb-2">
                        <Progress
                          value={phaseProgress}
                          className="h-1"
                        />
                      </div>
                    )}

                    {/* Steps */}
                    {expandedPhases.has(phase.id) && (
                      <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-800 pl-3">
                        {phase.steps.map((step) => {
                          const isCompleted = completedSteps.has(step.id);
                          const isSelected = selectedStep === step.id;

                          return (
                            <div
                              key={step.id}
                              onClick={() => setSelectedStep(step.id)}
                              className={`w-full flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-blue-600/20 border-l-2 border-blue-500'
                                  : 'hover:bg-gray-800/50'
                              }`}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStepComplete(step.id);
                                }}
                                className="flex-shrink-0 mt-0.5"
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-600 hover:text-gray-400" />
                                )}
                              </button>
                              <div className="flex-1">
                                <div
                                  className={`text-sm ${
                                    isCompleted
                                      ? 'line-through text-gray-500'
                                      : 'text-gray-200'
                                  }`}
                                >
                                  {step.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {step.estimatedTime}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-73px)]">
          <div className="max-w-4xl mx-auto p-8">
            {currentStep ? (
              <>
                {/* Step Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      variant="outline"
                      className="border-blue-500/30 text-blue-300"
                    >
                      {currentStep.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{currentStep.estimatedTime}</span>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold mb-4">
                    {currentStep.title}
                  </h1>
                  <p className="text-xl text-gray-400">
                    {currentStep.description}
                  </p>
                </div>

                {/* Learning Checkpoints */}
                {currentStep.checkpoints.length > 0 && (
                  <Card className="bg-gray-900 border-gray-800 p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-blue-400" />
                      <h2 className="text-xl font-bold">
                        Learning Checkpoints
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {currentStep.checkpoints.map((checkpoint, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">
                            {checkpoint}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Resources */}
                {currentStep.resources.length > 0 && (
                  <Card className="bg-gray-900 border-gray-800 p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                      <h2 className="text-xl font-bold">
                        Learning Resources
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {currentStep.resources.map((resource, idx) => (
                        <li key={idx} className="border border-gray-800 rounded-lg p-3 hover:border-gray-700 transition">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {resource.type === 'video' && '🎥'}
                                {resource.type === 'article' && '📄'}
                                {resource.type === 'documentation' && '📚'}
                                {resource.type === 'course' && '🎓'}
                                {resource.type === 'interactive' && '🎮'}
                                {resource.type === 'book' && '📖'}
                                {resource.type === 'practice' && '💻'}
                                {resource.type === 'cheatsheet' && '📝'}
                                {resource.type === 'game' && '🎯'}
                                {resource.type === 'reference' && '🔖'}
                                {!['video', 'article', 'documentation', 'course', 'interactive', 'book', 'practice', 'cheatsheet', 'game', 'reference'].includes(resource.type) && '🔗'}
                              </div>
                              <div className="flex-1">
                                <div className="text-blue-400 hover:text-blue-300 font-medium">
                                  {resource.title}
                                </div>
                                <div className="text-sm text-gray-400 mt-1">
                                  {resource.description}
                                </div>
                                <div className="text-xs text-gray-500 mt-1 capitalize">
                                  {resource.type}
                                </div>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Related Content */}
                {(currentStep.relatedCheatsheets.length > 0 ||
                  currentStep.relatedDSA.length > 0 ||
                  currentStep.relatedInterviews.length > 0) && (
                  <Card className="bg-gray-900 border-gray-800 p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">
                      Related PrepWise Content
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                      {currentStep.relatedCheatsheets.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-400 mb-2">
                            Cheatsheets
                          </h3>
                          <ul className="space-y-1">
                            {currentStep.relatedCheatsheets.map(
                              (item, idx) => (
                                <li key={idx}>
                                  <a
                                    href="#"
                                    className="text-sm text-blue-400 hover:underline"
                                  >
                                    {item}
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      {currentStep.relatedDSA.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-400 mb-2">
                            DSA Problems
                          </h3>
                          <ul className="space-y-1">
                            {currentStep.relatedDSA.map((item, idx) => (
                              <li key={idx}>
                                <a
                                  href="#"
                                  className="text-sm text-blue-400 hover:underline"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {currentStep.relatedInterviews.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-400 mb-2">
                            Interview Prep
                          </h3>
                          <ul className="space-y-1">
                            {currentStep.relatedInterviews.map(
                              (item, idx) => (
                                <li key={idx}>
                                  <a
                                    href="#"
                                    className="text-sm text-blue-400 hover:underline"
                                  >
                                    {item}
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => toggleStepComplete(currentStep.id)}
                    className={
                      completedSteps.has(currentStep.id)
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }
                  >
                    {completedSteps.has(currentStep.id) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark as Incomplete
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 mr-2" />
                        Mark as Complete
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="border-gray-700">
                    Start Learning
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400 mb-4">
                  Select a step to begin
                </p>
                <p className="text-gray-500">
                  Choose a topic from the roadmap tree on the left
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
