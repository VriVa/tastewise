import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookingHistory = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cooking History</h1>
        <p className="text-muted-foreground">Past prepared meals and cooking statistics.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cooking History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Historical cooking data and meal statistics will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookingHistory;