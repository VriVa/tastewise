import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SavedRecipes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Saved Recipes</h1>
        <p className="text-muted-foreground">Your collection of saved and favorite recipes.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your saved recipes collection will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedRecipes;