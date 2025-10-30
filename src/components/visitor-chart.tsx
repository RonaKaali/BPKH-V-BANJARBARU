'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Helper to generate initial data
const generateInitialData = (length = 15) => {
    const data = [];
    let lastValue = Math.floor(Math.random() * 250) + 5000;
    for (let i = 0; i < length; i++) {
        data.push({ value: lastValue });
        lastValue += Math.floor(Math.random() * 20) - 10;
    }
    return data;
};

export function VisitorChart() {
  const [liveData, setLiveData] = useState(generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prevData => {
        const lastValue = prevData[prevData.length - 1].value;
        const newValue = lastValue + Math.floor(Math.random() * 20) - 9;
        const newData = [...prevData.slice(1), { value: Math.max(4800, newValue) }]; // Ensure it doesn't drop too low
        return newData;
      });
    }, 2500); // Update every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const visitorCount = liveData[liveData.length - 1].value;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jumlah Pengunjung Live</CardTitle>
        <CardDescription>Total pengunjung saat ini dan tren aktivitas terbaru.</CardDescription>
      </CardHeader>
      <CardContent className="h-[244px] flex flex-col justify-center text-center">
        <div className="flex items-center justify-center gap-2">
            <span className="material-icons text-6xl text-blue-500">groups</span>
            <div className="text-7xl font-bold text-gray-800">
                {visitorCount.toLocaleString()}
            </div>
        </div>
        <div className="h-[100px] -mx-6 -mb-10 opacity-70">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={liveData}>
                    <defs>
                        <linearGradient id="liveVisitorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip contentStyle={{ display: 'none' }} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#liveVisitorGradient)"
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
      </Card>
  );
}
                                    