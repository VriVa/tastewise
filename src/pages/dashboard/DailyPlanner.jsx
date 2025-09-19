import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DailyPlanner = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Daily Meal Planner</h1>
        <p className="text-muted-foreground">Plan your daily meals with detailed scheduling.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Planner</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Daily meal planning interface will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyPlanner;