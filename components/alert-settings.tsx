'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertThresholds } from '@/lib/types';

interface AlertSettingsProps {
  thresholds: AlertThresholds;
  onUpdate: (thresholds: AlertThresholds) => void;
}

export function AlertSettings({ thresholds, onUpdate }: AlertSettingsProps) {
  const [values, setValues] = useState(thresholds);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(values);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-medium">Alert Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="low">Low Moisture Alert (%)</Label>
            <Input
              id="low"
              type="number"
              min="0"
              max="100"
              value={values.low}
              onChange={(e) =>
                setValues({ ...values, low: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="high">High Moisture Alert (%)</Label>
            <Input
              id="high"
              type="number"
              min="0"
              max="100"
              value={values.high}
              onChange={(e) =>
                setValues({ ...values, high: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <Button type="submit">Update Thresholds</Button>
      </form>
    </Card>
  );
}