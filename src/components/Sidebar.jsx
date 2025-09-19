import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Search,
  Calendar,
  ShoppingCart,
  BarChart3,
  Calculator,
  History,
  Settings,
  Bookmark,
  ChefHat,
  X,
  Plus,
  Star
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'discovery', label: 'Recipe Discovery', icon: Search, subItems: [
      { id: 'search', label: 'Advanced Search' },
      { id: 'ai-suggestions', label: 'AI Suggestions' },
      { id: 'recent', label: 'Recently Viewed' },
      { id: 'saved', label: 'Saved Recipes' }
    ]},
    { id: 'planning', label: 'Meal Planning', icon: Calendar, subItems: [
      { id: 'calendar', label: 'Weekly Calendar' },
    ]},
    { id: 'grocery', label: 'Smart Grocery List', icon: ShoppingCart },
    { id: 'nutrition', label: 'Nutrition Analytics', icon: BarChart3 },
    { id: 'scaling', label: 'Recipe Scaling', icon: Calculator },
    { id: 'history', label: 'Cooking History', icon: History },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  const [expandedItems, setExpandedItems] = useState([]);

  const toggleSubItems = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 lg:z-auto lg:translate-x-0 flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">CulinaryAI</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 dark:text-gray-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.subItems) {
                    toggleSubItems(item.id);
                  } else {
                    handleItemClick(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 ${
                  activeTab === item.id ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' : 
                  'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.subItems && (
                  <motion.span
                    animate={{ rotate: expandedItems.includes(item.id) ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                )}
              </button>

              {/* Sub-items */}
              {item.subItems && expandedItems.includes(item.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 mt-1 space-y-1"
                >
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleItemClick(subItem.id)}
                      className={`w-full text-left p-2 rounded-lg text-sm ${
                        activeTab === subItem.id ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300' : 
                        'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
            <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
              <Star className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-white">Upgrade to Pro</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Unlock all features</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;