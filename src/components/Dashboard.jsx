import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import {
  Clock,
  Flame,
  Heart,
  Star,
  ChefHat,
  Calendar,
  ShoppingCart,
  BarChart3,
  Calculator,
  Search,
  Users,
  TrendingUp
} from 'lucide-react';

// Import page components
import DashboardHome from './pages/DashboardHome';
import RecipeDiscovery from './pages/RecipeDiscovery';
import MealPlanning from './pages/MealPlanning';
import GroceryList from './pages/GroceryList';
import NutritionAnalytics from './pages/NutritionAnalytics';
import RecipeScaling from './pages/RecipeScaling';
import CookingHistory from './pages/CookingHistory';
import Preferences from './pages/Preferences';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const user = {
    name: 'Sarah K.',
    email: 'sarah@example.com',
    membership: 'Premium'
  };

  // Render the appropriate component based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'discovery':
      case 'search':
      case 'ai-suggestions':
      case 'recent':
      case 'saved':
        return <RecipeDiscovery activeSubTab={activeTab} />;
      case 'planning':
      case 'calendar':
      case 'planner':
      case 'generate':
        return <MealPlanning activeSubTab={activeTab} />;
      case 'grocery':
        return <GroceryList />;
      case 'nutrition':
        return <NutritionAnalytics />;
      case 'scaling':
        return <RecipeScaling />;
      case 'history':
        return <CookingHistory />;
      case 'preferences':
        return <Preferences />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar 
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode} 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            user={user}
          />
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            {renderContent()}
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;