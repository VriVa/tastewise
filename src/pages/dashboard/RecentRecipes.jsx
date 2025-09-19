import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecentRecipes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Recently Viewed</h1>
        <p className="text-muted-foreground">Your recently viewed recipes and cooking history.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Recently viewed recipes will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentRecipes;