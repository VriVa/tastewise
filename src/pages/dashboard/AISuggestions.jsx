import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AISuggestions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Recipe Suggestions</h1>
        <p className="text-muted-foreground">Get personalized recommendations based on your ingredients, preferences, and cooking history.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">AI-powered recipe suggestions will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISuggestions;