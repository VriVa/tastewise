import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NutritionOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Nutrition Analytics</h1>
        <p className="text-muted-foreground">Daily/Weekly nutrition overview with macronutrient breakdown and progress tracking.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nutrition Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Detailed nutrition analysis and tracking will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionOverview;