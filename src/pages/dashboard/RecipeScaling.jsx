import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecipeScaling = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Recipe Scaling Tool</h1>
        <p className="text-muted-foreground">Portion size calculator and ingredient scaling.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recipe Scaling</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Recipe scaling calculator will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeScaling;