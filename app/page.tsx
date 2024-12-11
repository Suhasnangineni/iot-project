'use client';

import { useState, useEffect } from 'react';
import { MoistureGauge } from '@/components/moisture-gauge';
import { MoistureChart } from '@/components/moisture-chart';
import { AlertSettings } from '@/components/alert-settings';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_THRESHOLDS } from '@/lib/constants';
import { MoistureSensorData, AlertThresholds } from '@/lib/types';
import { Droplets } from 'lucide-react';

// Simulated sensor data for demonstration
// Replace this with actual ESP32 WebSocket or API integration
const simulateSensorData = () => ({
  value: Math.floor(Math.random() * 100),
  timestamp: new Date().toISOString(),
});

export default function Home() {
  const [currentData, setCurrentData] = useState<MoistureSensorData>(
    simulateSensorData()
  );
  const [historicalData, setHistoricalData] = useState<MoistureSensorData[]>([]);
  const [thresholds, setThresholds] = useState<AlertThresholds>(DEFAULT_THRESHOLDS);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newData = simulateSensorData();
      setCurrentData(newData);
      setHistoricalData((prev) => [...prev.slice(-50), newData]);

      // Check thresholds and show alerts
      if (newData.value < thresholds.low) {
        toast({
          title: 'Low Moisture Alert',
          description: `Current moisture level (${newData.value}%) is below the threshold of ${thresholds.low}%`,
          variant: 'destructive',
        });
      } else if (newData.value > thresholds.high) {
        toast({
          title: 'High Moisture Alert',
          description: `Current moisture level (${newData.value}%) is above the threshold of ${thresholds.high}%`,
          variant: 'destructive',
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [thresholds, toast]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <header className="flex items-center space-x-2">
          <Droplets className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Moisture Monitor</h1>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <MoistureGauge data={currentData} thresholds={thresholds} />
          <AlertSettings thresholds={thresholds} onUpdate={setThresholds} />
        </div>

        <MoistureChart data={historicalData} />
      </div>
    </div>
  );
}