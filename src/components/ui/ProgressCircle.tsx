
import React from 'react';

// Recharts is loaded from a CDN and available on the window object.
const { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } = (window as any).Recharts;

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
                        background={{ fill: '#E5E5EA' }} /* ios-tertiary-gray */
                        dataKey="value"
                        cornerRadius={6}
                        fill="#007AFF" /* ios-blue */
                    />
                </RadialBarChart>
            </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-ios-primary-text tracking-tighter">{progress}<span className="text-2xl font-medium text-ios-secondary-text">%</span></span>
                <span className="text-sm text-ios-secondary-text font-medium uppercase tracking-widest">Complete</span>
            </div>
        </div>
    );
};

export default ProgressCircle;