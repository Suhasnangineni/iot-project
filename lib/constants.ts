export const DEFAULT_THRESHOLDS = {
  low: 30,
  high: 70,
};

export const MOISTURE_LEVELS = {
  dry: 'Too Dry',
  optimal: 'Optimal',
  wet: 'Too Wet',
} as const;

export const CHART_COLORS = {
  line: 'hsl(var(--chart-1))',
  grid: 'hsl(var(--border))',
  text: 'hsl(var(--muted-foreground))',
};