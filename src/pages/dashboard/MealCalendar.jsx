import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MealCalendar = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Weekly Meal Calendar</h1>
        <p className="text-muted-foreground">Visual calendar with drag-and-drop meal planning.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meal Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Weekly calendar view with drag-and-drop functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealCalendar;