import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Search,
  Sparkles,
  Clock,
  Heart,
  Calendar,
  CalendarDays,
  Wand2,
  ShoppingCart,
  BarChart3,
  Calculator,
  ChefHat,
  Settings,
  History
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const navigation = [
    {
      title: 'Dashboard',
      items: [
        {
          title: 'Overview',
          href: '/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Recipe Discovery',
      items: [
        {
          title: 'Advanced Search',
          href: '/dashboard/recipe-search',
          icon: Search,
        },
        {
          title: 'Saved Recipes',
          href: '/dashboard/saved-recipes',
          icon: Heart,
        },
      ],
    },
    {
      title: 'Meal Planning',
      items: [
        {
          title: 'Weekly Calendar',
          href: '/dashboard/weekly-calendar',
          icon: Calendar,
        }
      ],
    },
    {
      title: 'Shopping & Groceries',
      items: [
        {
          title: 'Grocery Lists',
          href: '/dashboard/grocery-lists',
          icon: ShoppingCart,
        },
      ],
    },
    {
      title: 'Nutrition & Analytics',
      items: [
        {
          title: 'Nutrition Dashboard',
          href: '/dashboard/nutrition-dashboard',
          icon: BarChart3,
        },
        {
          title: 'Calorie Calculator',
          href: '/dashboard/calorie-calculator',
          icon: Calculator,
        },
        {
          title: 'Recipe Nutrition',
          href: '/dashboard/recipe-nutrition',
          icon: ChefHat,
        },
        {
          title: 'History',
          href: '/dashboard/history',
          icon: History,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Preferences',
          href: '/dashboard/preferences',
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
        <div className="fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border">
        <div className="flex flex-col h-full pt-14">
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-6">
            {navigation.map((section) => (
                <div key={section.title} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground px-2">
                    {section.title}
                </h3>
                <div className="space-y-1">
                    {section.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link key={item.href} to={item.href}>
                        <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={cn(
                            "w-full justify-start gap-2 h-9",
                            isActive && "bg-primary/10 text-primary"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Button>
                        </Link>
                    );
                    })}
                </div>
                {section.title !== 'Settings' && <Separator />}
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
    
  );
};

export default Sidebar;