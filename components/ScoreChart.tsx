import React from 'react';
import { Score } from '../types';
import { PROFILE_DETAILS } from '../constants';

interface ScoreChartProps {
  scores: Score[];
}

const ScoreChart: React.FC<ScoreChartProps> = ({ scores }) => {
  const maxScore = Math.max(...scores.map(s => s.value), 40);

  return (
    <div className="space-y-3 my-6">
      {scores.map(score => {
        const details = PROFILE_DETAILS[score.profile];
        const percentage = (score.value / maxScore) * 100;
        const bgColor = `bg-${details.color}`;
        
        return (
          <div key={score.profile} className="flex items-center">
            <div className="w-28 text-sm font-bold text-slate-600 dark:text-slate-300 pr-2 text-right">
              {details.alternativeName}
            </div>
            <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-6">
              <div
                className={`${bgColor} h-6 rounded-full flex items-center justify-end px-2 text-white text-sm font-bold transition-all duration-700 ease-out`}
                style={{ width: `${percentage}%` }}
              >
                {score.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScoreChart;
