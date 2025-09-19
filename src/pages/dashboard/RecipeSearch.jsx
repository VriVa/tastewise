import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecipeSearch = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Advanced Recipe Search</h1>
        <p className="text-muted-foreground">Find recipes with advanced filters for dietary restrictions, cuisine types, and cooking time.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recipe Search</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Advanced search functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeSearch;