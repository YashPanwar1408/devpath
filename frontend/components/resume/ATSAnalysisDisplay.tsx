/**
 * ATS Analysis Display - Transparent Scoring Breakdown
 * Shows exactly WHY and HOW the score was calculated
 */

import React from 'react';
import type { ATSAnalysis } from '@/lib/schemas/ats.schema';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ATSAnalysisDisplayProps {
  analysis: ATSAnalysis;
  onClose?: () => void;
}

export const ATSAnalysisDisplay: React.FC<ATSAnalysisDisplayProps> = ({ analysis, onClose }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (score >= 40) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };
  
  const getScoreLabel = (score: number) => {
    if (score >= 90) return '🎯 Excellent';
    if (score >= 75) return '✅ Strong';
    if (score >= 60) return '⚠️ Moderate';
    if (score >= 40) return '🔻 Weak';
    return '❌ Poor';
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">ATS Compatibility Report</h2>
              <p className="text-sm text-gray-500 mt-1">
                Analyzed: {new Date(analysis.analyzedAt).toLocaleString()} • Version {analysis.analysisVersion}
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close report"
              >
                ×
              </button>
            )}
          </div>
          
          {/* Overall Score */}
          <div className="mt-6 flex items-center gap-6">
            <div className="shrink-0 flex flex-col items-center">
              <div className={`text-6xl font-bold ${getScoreColor(analysis.overallScore).split(' ')[0]}`}>
                {analysis.overallScore}
              </div>
              <div className="text-sm text-gray-600 text-center mt-1">out of 100</div>
            </div>
            <div className="flex-1">
              <div className={`inline-block px-4 py-2 rounded-lg font-semibold border ${getScoreColor(analysis.overallScore)}`}>
                {getScoreLabel(analysis.overallScore)}
              </div>
              <p className="text-sm text-gray-700 mt-2">
                {analysis.jobMatch.hasJobDescription 
                  ? `${analysis.jobMatch.matchLevel ? analysis.jobMatch.matchLevel.charAt(0).toUpperCase() + analysis.jobMatch.matchLevel.slice(1) : 'Unknown'} match for target role (${analysis.jobMatch.matchPercentage}%)`
                  : 'General ATS optimization score (add job description for targeted analysis)'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8 pb-8">
            {/* Score Formula Breakdown */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                📊 Score Breakdown <span className="text-sm font-normal text-gray-500">(Transparent Formula)</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Object.entries(analysis.scoreFormula).map(([key, data]) => (
                  <Card key={key} className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-2 h-8">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{data.score}</div>
                    <div className="flex justify-between items-end text-xs">
                       <span className="text-gray-400">Weight: {(data.weight * 100).toFixed(0)}%</span>
                       <span className="text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                         +{(data.score * data.weight).toFixed(1)}
                       </span>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-100 italic">
                <strong>Formula:</strong> Overall Score = (Keyword Match × 30%) + (Skill Coverage × 25%) + (Experience Alignment × 20%) + (Formatting × 15%) + (AI Quality × 10%)
              </div>
            </section>
            
            {/* Strengths & Weaknesses */}
            <section className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card className="p-5 border-l-4 border-l-green-500 bg-green-50/30">
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                  ✅ Strengths
                </h3>
                <ul className="space-y-3">
                  {analysis.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-gray-800 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      {strength}
                    </li>
                  ))}
                  {analysis.strengths.length === 0 && (
                    <li className="text-sm text-gray-500 italic">No specific strengths identified yet. Keep improving!</li>
                  )}
                </ul>
              </Card>
              
              {/* Weaknesses */}
              <Card className="p-5 border-l-4 border-l-red-500 bg-red-50/30">
                <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                  ⚠️ Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {analysis.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-gray-800 flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      {weakness}
                    </li>
                  ))}
                   {analysis.weaknesses.length === 0 && (
                    <li className="text-sm text-gray-500 italic">Great job! No major weaknesses detected.</li>
                  )}
                </ul>
              </Card>
            </section>
            
            {/* Critical Issues */}
            {analysis.criticalIssues.length > 0 && (
              <section>
                <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                  🚨 Critical Issues <span className="text-sm font-normal text-red-600">(Fix These First)</span>
                </h3>
                <div className="space-y-3">
                  {analysis.criticalIssues.map((issue, idx) => (
                    <Card key={idx} className="p-4 border-l-4 border-red-600 bg-white hover:bg-red-50/20 transition-colors shadow-sm">
                      <div className="flex items-start gap-4">
                        <Badge className={`${getPriorityColor(issue.impact)} text-xs px-2 py-1 shrink-0 mt-0.5`}>
                          {issue.impact.toUpperCase()}
                        </Badge>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">{issue.issue}</div>
                          <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">
                            <strong className="text-gray-900">Fix:</strong> {issue.fix}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
            
            {/* Keyword Analysis */}
            {analysis.jobMatch.hasJobDescription && (
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4">🔑 Keyword Analysis</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Missing Keywords */}
                  <Card className="p-5 border border-orange-200 bg-orange-50/30">
                    <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                      Missing Keywords <span className="text-xs font-normal bg-orange-100 px-2 py-0.5 rounded text-orange-800">Add These</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.jobMatch.topMissingKeywords?.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="bg-white text-orange-800 border-orange-300 hover:bg-orange-50">
                          {keyword}
                        </Badge>
                      ))}
                       {(!analysis.jobMatch.topMissingKeywords || analysis.jobMatch.topMissingKeywords.length === 0) && (
                        <span className="text-sm text-gray-500 italic">No major keywords missing!</span>
                      )}
                    </div>
                  </Card>
                  
                  {/* Matched Keywords */}
                  <Card className="p-5 border border-green-200 bg-green-50/30">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                      Competitive Advantages <span className="text-xs font-normal bg-green-100 px-2 py-0.5 rounded text-green-800">Keep These</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.jobMatch.competitiveAdvantage?.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="bg-white text-green-800 border-green-300 hover:bg-green-50">
                          {keyword}
                        </Badge>
                      ))}
                      {(!analysis.jobMatch.competitiveAdvantage || analysis.jobMatch.competitiveAdvantage.length === 0) && (
                        <span className="text-sm text-gray-500 italic">No specific competitive keywords found yet.</span>
                      )}
                    </div>
                  </Card>
                </div>
              </section>
            )}
            
            {/* Recommendations */}
            {analysis.recommendations.length > 0 && (
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Prioritized Recommendations</h3>
                <div className="space-y-4">
                  {analysis.recommendations
                    .sort((a, b) => {
                      const priority = { critical: 0, high: 1, medium: 2, low: 3 };
                      return priority[a.priority] - priority[b.priority];
                    })
                    .map((rec, idx) => (
                      <Card key={idx} className="p-5 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <Badge className={`${getPriorityColor(rec.priority)} text-xs px-2.5 py-1 shrink-0 mt-1`}>
                            {rec.priority.toUpperCase()}
                          </Badge>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="text-xs text-gray-500 mb-0.5 uppercase tracking-wide font-semibold">{rec.category}</div>
                                <div className="font-bold text-gray-900 text-lg">{rec.title}</div>
                              </div>
                              <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                {rec.expectedImpact}
                              </div>
                            </div>
                            <div className="text-sm text-gray-700 mb-4 leading-relaxed">{rec.description}</div>
                            {rec.actionSteps.length > 0 && (
                              <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                                <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Action Steps:</div>
                                <ul className="list-decimal list-inside space-y-1.5 text-sm text-gray-700">
                                  {rec.actionSteps.map((step, stepIdx) => (
                                    <li key={stepIdx} className="pl-1">{step}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </section>
            )}
            
            {/* Completeness Score */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Section Completeness</h3>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-semibold text-gray-700">Completion Status</span>
                    <span className="text-2xl font-bold text-blue-600">{analysis.completeness.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${analysis.completeness.score}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {analysis.completeness.requiredSections.map((section, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-lg border flex flex-col gap-2 ${
                        section.present 
                          ? 'bg-white border-green-200' 
                          : 'bg-white border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-semibold text-gray-900">{section.section}</span>
                         <span className={`text-lg leading-none ${section.present ? 'text-green-500' : 'text-red-400'}`}>
                           {section.present ? '✓' : '✗'}
                         </span>
                      </div>
                      <div className={`text-xs font-medium uppercase tracking-wide ${
                        section.quality === 'excellent' ? 'text-green-600' :
                        section.quality === 'good' ? 'text-blue-600' :
                        section.quality === 'needs-improvement' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {section.quality.replace('-', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 p-1 rounded-full">💡</span>
              Scores above 75 typically pass initial ATS screening
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-semibold text-sm transition-colors shadow-sm"
              >
                Close Report
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};