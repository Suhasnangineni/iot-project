'use client';

import { Card } from '@/components/ui/card';
import { MoistureSensorData } from '@/lib/types';
import { CHART_COLORS } from '@/lib/constants';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format } from 'date-fns';

interface MoistureChartProps {
  data: MoistureSensorData[];
}

export function MoistureChart({ data }: MoistureChartProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Moisture History</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
              <XAxis
                dataKey="timestamp"
                stroke={CHART_COLORS.text}
                tickFormatter={(time) => format(new Date(time), 'HH:mm')}
              />
              <YAxis
                stroke={CHART_COLORS.text}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--card))' }}
                labelFormatter={(time) => format(new Date(time), 'HH:mm:ss')}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={CHART_COLORS.line}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}