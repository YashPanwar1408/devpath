'use client';

interface PracticeHeaderProps {
  sheet: string;
  onSheetChange: (sheet: string) => void;
  stats: {
    total: number;
    solved: number;
    easy: { solved: number; total: number };
    medium: { solved: number; total: number };
    hard: { solved: number; total: number };
  };
}

export default function PracticeHeader({ sheet, onSheetChange, stats }: PracticeHeaderProps) {
  const sheets = [
    { value: '75', label: 'DSA 75', duration: '<1 Month' },
    { value: '150', label: 'DSA 150', duration: '1–3 Months' },
    { value: '250', label: 'DSA 250', duration: '3+ Months' },
  ];

  const progressPercentage = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between">
        {/* Stats Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {stats.solved} / {stats.total} Solved
          </h2>
          
          {/* Difficulty Breakdown */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-400">Easy</span>
              <span className="text-sm font-bold text-green-500">
                {stats.easy.solved} / {stats.easy.total}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-400">Medium</span>
              <span className="text-sm font-bold text-yellow-500">
                {stats.medium.solved} / {stats.medium.total}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-400">Hard</span>
              <span className="text-sm font-bold text-red-500">
                {stats.hard.solved} / {stats.hard.total}
              </span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{
                    width: `${stats.easy.total > 0 ? (stats.easy.solved / stats.easy.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{
                    width: `${stats.medium.total > 0 ? (stats.medium.solved / stats.medium.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-500"
                  style={{
                    width: `${stats.hard.total > 0 ? (stats.hard.solved / stats.hard.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
