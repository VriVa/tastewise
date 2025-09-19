import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GroceryList = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Smart Grocery List</h1>
        <p className="text-muted-foreground">Auto-generated from meal plans with categorized items and check-off system.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grocery List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Smart grocery list with categorization and waste tracking will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroceryList;