'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertThresholds, MoistureSensorData } from '@/lib/types';
import { MOISTURE_LEVELS } from '@/lib/constants';

interface MoistureGaugeProps {
  data: MoistureSensorData;
  thresholds: AlertThresholds;
}

export function MoistureGauge({ data, thresholds }: MoistureGaugeProps) {
  const getMoistureLevel = (value: number) => {
    if (value < thresholds.low) return MOISTURE_LEVELS.dry;
    if (value > thresholds.high) return MOISTURE_LEVELS.wet;
    return MOISTURE_LEVELS.optimal;
  };

  const getStatusColor = (level: string) => {
    switch (level) {
      case MOISTURE_LEVELS.dry:
        return 'text-destructive';
      case MOISTURE_LEVELS.wet:
        return 'text-blue-500';
      default:
        return 'text-green-500';
    }
  };

  const level = getMoistureLevel(data.value);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Current Moisture Level</h3>
          <span className={`text-lg font-bold ${getStatusColor(level)}`}>
            {level}
          </span>
        </div>
        <Progress value={data.value} className="h-4" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0%</span>
          <span className="font-medium text-foreground">{data.value}%</span>
          <span>100%</span>
        </div>
      </div>
    </Card>
  );
}