import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GeneratePlans = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Generate Meal Plans</h1>
        <p className="text-muted-foreground">AI-powered meal plan generation based on your preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meal Plan Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Automated meal plan generation will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratePlans;