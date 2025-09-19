import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChefHat, Star, Heart } from 'lucide-react';

const ThemedShadcnTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <ChefHat className="text-primary" />
            TasteWise with shadcn/ui
          </h1>
          <p className="text-gray-600 text-lg">Testing your custom theme integration</p>
        </div>

        {/* Cards showing different variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary themed card */}
          <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Star className="w-5 h-5" />
                Primary Theme
              </CardTitle>
              <CardDescription>
                Using your custom orange primary color
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">
                Primary Button
              </Button>
              <Button variant="outline" className="w-full">
                Outline Button
              </Button>
            </CardContent>
          </Card>

          {/* Secondary themed card */}
          <Card className="border-2 border-secondary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-secondary flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Secondary Theme
              </CardTitle>
              <CardDescription>
                Using your custom red secondary color
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="secondary" className="w-full">
                Secondary Button
              </Button>
              <Button variant="destructive" className="w-full">
                Destructive Button
              </Button>
            </CardContent>
          </Card>

          {/* Form elements */}
          <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-gray-700">Form Elements</CardTitle>
              <CardDescription>
                Testing inputs with your theme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter your recipe name..." />
              <Input placeholder="Search ingredients..." />
              <Button variant="ghost" className="w-full">
                Ghost Button
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature showcase using your theme colors */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Your Custom Theme in Action</CardTitle>
            <CardDescription className="text-gray-600">
              shadcn/ui components now use your orange and red color palette
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">Theme Colors:</h3>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-primary rounded border-2 border-gray-200" title="Primary Orange"></div>
                  <div className="w-8 h-8 bg-primary-50 rounded border-2 border-gray-200" title="Orange 50"></div>
                  <div className="w-8 h-8 bg-secondary rounded border-2 border-gray-200" title="Secondary Red"></div>
                  <div className="w-8 h-8 bg-gray-500 rounded border-2 border-gray-200" title="Gray 500"></div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-secondary">Component Variants:</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm">Small</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThemedShadcnTest;