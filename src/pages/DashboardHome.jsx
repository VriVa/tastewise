import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Heart, Star, ChefHat, Calendar, ShoppingCart,Sun, Moon } from 'lucide-react';

const DashboardHome = () => {
  // Sample data
  const todayMeals = [
    { time: 'Breakfast', name: 'Avocado Toast with Eggs', calories: 420, timeToCook: 15, liked: true },
    { time: 'Lunch', name: 'Chicken Caesar Salad', calories: 580, timeToCook: 20, liked: false },
    { time: 'Dinner', name: 'Vegetable Stir Fry', calories: 650, timeToCook: 25, liked: true },
  ];

  const weeklyStats = [
    { day: 'Mon', meals: 3, calories: 1850 },
    { day: 'Tue', meals: 3, calories: 1720 },
    { day: 'Wed', meals: 3, calories: 1950 },
    { day: 'Thu', meals: 2, calories: 1450 },
    { day: 'Fri', meals: 3, calories: 2100 },
    { day: 'Sat', meals: 3, calories: 2300 },
    { day: 'Sun', meals: 2, calories: 1650 },
  ];

  const aiSuggestions = [
    { name: 'Mediterranean Bowl', match: 92, time: 25, calories: 520 },
    { name: 'Spicy Tofu Tacos', match: 88, time: 20, calories: 480 },
    { name: 'Quinoa Salad', match: 85, time: 15, calories: 410 },
  ];

  const groceryItems = [
    { category: 'Produce', items: ['Avocado', 'Spinach', 'Bell peppers', 'Tomatoes'], completed: 2 },
    { category: 'Protein', items: ['Chicken breast', 'Tofu', 'Eggs'], completed: 1 },
    { category: 'Dairy', items: ['Greek yogurt', 'Feta cheese'], completed: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, Sarah!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Here's your cooking plan for today</p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Today's Meals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3 Planned</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <ChefHat className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,650</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <Flame className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cooking Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">60 min</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Grocery Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">9 Needed</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Meals */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Meals</h2>
              </div>
              <div className="p-6">
                {todayMeals.map((meal, index) => (
                  <div key={index} className={`flex items-center justify-between py-4 ${index !== todayMeals.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${meal.time === 'Breakfast' ? 'bg-orange-100 dark:bg-orange-900' : meal.time === 'Lunch' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-purple-100 dark:bg-purple-900'}`}>
                        {meal.time === 'Breakfast' && <Sun className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
                        {meal.time === 'Lunch' && <Sun className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                        {meal.time === 'Dinner' && <Moon className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{meal.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{meal.calories} cal • {meal.timeToCook} min</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                      <Heart className={`h-5 w-5 ${meal.liked ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mt-8">
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Suggestions For You</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Based on your preferences and cooking history</p>
              </div>
              <div className="p-6">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className={`flex items-center justify-between py-4 ${index !== aiSuggestions.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg text-white">
                        <ChefHat className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{suggestion.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{suggestion.calories} cal • {suggestion.time} min</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium">
                        {suggestion.match}% match
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Grocery List Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Grocery List</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">From your meal plan</p>
              </div>
              <div className="p-6">
                {groceryItems.map((category, index) => (
                  <div key={index} className={`mb-6 ${index !== groceryItems.length - 1 ? 'pb-6 border-b border-gray-100 dark:border-gray-700' : ''}`}>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">{category.category}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="rounded text-orange-500 focus:ring-orange-500 mr-3" 
                            checked={itemIndex < category.completed}
                            onChange={() => {}}
                          />
                          <span className={`text-gray-700 dark:text-gray-300 ${itemIndex < category.completed ? 'line-through' : ''}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                  View Complete List
                </button>
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Weekly Overview</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your cooking activity</p>
              </div>
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  {weeklyStats.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{day.day}</div>
                      <div className="w-8 bg-gray-200 dark:bg-gray-700 rounded-full h-24 relative">
                        <div 
                          className="w-8 bg-gradient-to-t from-orange-500 to-red-500 rounded-full absolute bottom-0"
                          style={{ height: `${(day.calories / 2500) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1 text-gray-700 dark:text-gray-300">{day.meals}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total meals</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">19</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Avg. calories</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">1,860</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;