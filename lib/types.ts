export interface MoistureSensorData {
  value: number;
  timestamp: string;
}

export interface AlertThresholds {
  low: number;
  high: number;
}