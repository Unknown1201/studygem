
import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

interface ProgressCircleProps {
    progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
    const data = [{ name: 'progress', value: progress }];

    return (
        <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    innerRadius="80%"
                    outerRadius="100%"
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                    barSize={12}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        background={{ fill: 'rgba(229, 229, 234, 0.5)' }} 
                        dataKey="value"
                        cornerRadius={6}
                        fill="rgb(0, 122, 255)"
                    />
                </RadialBarChart>
            </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold tracking-tighter text-slate-800 dark:text-slate-100">{progress}<span className="text-2xl font-medium text-slate-500 dark:text-slate-400">%</span></span>
                <span className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">Complete</span>
            </div>
        </div>
    );
};

export default ProgressCircle;
