import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ShadcnTest = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Shadcn/UI Integration Test</h1>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>
            This card is from shadcn/ui components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Test input field" />
          <div className="flex gap-2">
            <Button>Primary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-sm text-muted-foreground">
        If you can see this styled card with working buttons and input, shadcn/ui is properly integrated!
      </div>
    </div>
  );
};

export default ShadcnTest;