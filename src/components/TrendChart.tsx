'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { PremiumYear } from '@/types';

interface TrendChartProps {
  premiumHistory: PremiumYear[];
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export default function TrendChart({ premiumHistory }: TrendChartProps) {
  const data = premiumHistory.map((p) => ({
    year: p.year.toString(),
    premium: p.premium,
    yoy: p.yoyChange ? `+${p.yoyChange}%` : '',
  }));

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h4 className="font-serif text-lg text-navy mb-4">
        5-Year Premium Trajectory
      </h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: '#4a5568', fontSize: 13 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fill: '#4a5568', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip
              formatter={(value) => [formatCurrency(value as number), 'Total Premium']}
              contentStyle={{
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '13px',
              }}
            />
            <Bar dataKey="premium" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === data.length - 1 ? '#9b2c2c' : '#2b6cb0'}
                />
              ))}
              <LabelList
                dataKey="yoy"
                position="top"
                style={{ fill: '#9b2c2c', fontSize: 11, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
