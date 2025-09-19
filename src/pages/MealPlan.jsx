import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit3,
  Trash2,
  Clock,
  Flame,
  Users,
  ChefHat,
  Zap,
  ShoppingCart,
  Download,
  RotateCcw
} from 'lucide-react';

// Mock data for initial meals
const mockMeals = {
  breakfast: [
    { name: 'Avocado Toast with Eggs', calories: 420, time: 15, servings: 2, ingredients: ['Avocado', 'Eggs', 'Bread', 'Salt', 'Pepper'] },
    { name: 'Greek Yogurt with Berries', calories: 280, time: 5, servings: 1, ingredients: ['Greek Yogurt', 'Blueberries', 'Strawberries', 'Honey'] },
    { name: 'Oatmeal with Nuts', calories: 350, time: 10, servings: 2, ingredients: ['Oats', 'Almonds', 'Walnuts', 'Milk', 'Cinnamon'] },
    { name: 'Smoothie Bowl', calories: 320, time: 8, servings: 1, ingredients: ['Banana', 'Spinach', 'Protein Powder', 'Coconut Milk', 'Chia Seeds'] },
    { name: 'Pancakes', calories: 450, time: 20, servings: 3, ingredients: ['Flour', 'Eggs', 'Milk', 'Butter', 'Maple Syrup'] }
  ],
  lunch: [
    { name: 'Quinoa Salad Bowl', calories: 520, time: 20, servings: 2, ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Tomatoes', 'Olive Oil'] },
    { name: 'Chicken Caesar Wrap', calories: 480, time: 15, servings: 1, ingredients: ['Chicken Breast', 'Tortilla', 'Romaine Lettuce', 'Caesar Dressing', 'Parmesan'] },
    { name: 'Vegetable Stir Fry', calories: 450, time: 25, servings: 2, ingredients: ['Bell Peppers', 'Broccoli', 'Carrots', 'Soy Sauce', 'Ginger'] },
    { name: 'Mediterranean Wrap', calories: 380, time: 12, servings: 1, ingredients: ['Hummus', 'Cucumber', 'Tomatoes', 'Olives', 'Feta Cheese'] },
    { name: 'Lentil Soup', calories: 340, time: 30, servings: 4, ingredients: ['Red Lentils', 'Onions', 'Carrots', 'Celery', 'Vegetable Broth'] }
  ],
  dinner: [
    { name: 'Salmon with Roasted Vegetables', calories: 650, time: 30, servings: 2, ingredients: ['Salmon Fillet', 'Broccoli', 'Sweet Potato', 'Olive Oil', 'Lemon'] },
    { name: 'Vegetable Curry with Rice', calories: 600, time: 35, servings: 3, ingredients: ['Basmati Rice', 'Cauliflower', 'Peas', 'Coconut Milk', 'Curry Powder'] },
    { name: 'Pasta with Tomato Sauce', calories: 550, time: 25, servings: 2, ingredients: ['Pasta', 'Canned Tomatoes', 'Garlic', 'Basil', 'Olive Oil'] },
    { name: 'Stuffed Bell Peppers', calories: 480, time: 40, servings: 4, ingredients: ['Bell Peppers', 'Ground Turkey', 'Rice', 'Onions', 'Cheese'] },
    { name: 'Grilled Chicken Salad', calories: 420, time: 20, servings: 2, ingredients: ['Chicken Breast', 'Mixed Greens', 'Cherry Tomatoes', 'Balsamic Vinegar', 'Olive Oil'] }
  ]
};

const MealPlan = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [meals, setMeals] = useState({});
  const [showGenerator, setShowGenerator] = useState(false);
  const [preferences, setPreferences] = useState({
    dietary: 'vegetarian',
    calories: 2000,
    servings: 2,
    time: 30
  });

  // Load meals from localStorage on component mount
  useEffect(() => {
    const savedMeals = localStorage.getItem('mealPlan');
    if (savedMeals) {
      try {
        const parsedMeals = JSON.parse(savedMeals);
        setMeals(parsedMeals);
      } catch (error) {
        console.error('Error parsing saved meals:', error);
        generateInitialMockData();
      }
    } else {
      // Generate initial mock data for current week
      generateInitialMockData();
    }
  }, []);

  // Save to localStorage whenever meals change
  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(meals));
  }, [meals]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('mealPreferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error parsing saved preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('mealPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const generateInitialMockData = () => {
    const weekDays = getWeekDays(currentDate);
    const newMeals = {};
    
    weekDays.forEach((day, index) => {
      const dayKey = day.toDateString();
      newMeals[dayKey] = {
        breakfast: mockMeals.breakfast[index % mockMeals.breakfast.length],
        lunch: mockMeals.lunch[index % mockMeals.lunch.length],
        dinner: mockMeals.dinner[index % mockMeals.dinner.length]
      };
    });
    
    setMeals(newMeals);
  };

  // Get days of the current week
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    return Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const weekDays = getWeekDays(currentDate);

  // Navigate to previous/next week
  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'prev' ? -7 : 7));
    setCurrentDate(newDate);
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Check if a day is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Add a meal to a specific day and time
  const addMeal = (day, mealType, meal) => {
    const dayKey = day.toDateString();
    setMeals(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [mealType]: meal
      }
    }));
    setIsEditing(false);
  };

  // Remove a meal from a specific day and time
  const removeMeal = (day, mealType) => {
    const dayKey = day.toDateString();
    setMeals(prev => {
      const updated = { ...prev };
      if (updated[dayKey]) {
        delete updated[dayKey][mealType];
        if (Object.keys(updated[dayKey]).length === 0) {
          delete updated[dayKey];
        }
      }
      return updated;
    });
  };

  // Generate meal plan based on preferences
  const generateMealPlan = () => {
    const newMeals = {};
    
    weekDays.forEach(day => {
      const dayKey = day.toDateString();
      newMeals[dayKey] = {
        breakfast: mockMeals.breakfast[Math.floor(Math.random() * mockMeals.breakfast.length)],
        lunch: mockMeals.lunch[Math.floor(Math.random() * mockMeals.lunch.length)],
        dinner: mockMeals.dinner[Math.floor(Math.random() * mockMeals.dinner.length)]
      };
    });
    
    setMeals(newMeals);
    setShowGenerator(false);
  };

  // Calculate total nutrition for the week
  const calculateWeeklyNutrition = () => {
    let totalCalories = 0;
    let totalTime = 0;
    let mealCount = 0;
    
    Object.values(meals).forEach(dayMeals => {
      Object.values(dayMeals).forEach(meal => {
        totalCalories += meal.calories;
        totalTime += meal.time;
        mealCount++;
      });
    });
    
    return { totalCalories, totalTime, mealCount };
  };

  const weeklyNutrition = calculateWeeklyNutrition();

  // Generate grocery list and save to localStorage
  const getCategoryForIngredient = (ingredient) => {
  const lower = ingredient.toLowerCase();
  if (["avocado", "broccoli", "tomato", "lettuce", "blueberries", "strawberries"].some(i => lower.includes(i))) {
    return "Produce";
  }
  if (["chicken", "salmon", "beef", "egg", "tofu"].some(i => lower.includes(i))) {
    return "Protein";
  }
  if (["milk", "cheese", "yogurt", "parmesan"].some(i => lower.includes(i))) {
    return "Dairy";
  }
  if (["rice", "pasta", "bread", "tortilla", "oil", "quinoa", "dressing", "honey"].some(i => lower.includes(i))) {
    return "Pantry";
  }
  return "Other";
};

 const handleGenerateGroceryList = () => {
  // ✅ Always load from localStorage
  const storedMealPlan = JSON.parse(localStorage.getItem("mealPlan")) || {};
  const ingredients = new Set();

  Object.values(storedMealPlan).forEach(dayMeals => {
    Object.values(dayMeals).forEach(meal => {
      if (meal?.ingredients?.length) {
        meal.ingredients.forEach(ingredient => ingredients.add(ingredient));
      }
    });
  });

  const groceryList = Array.from(ingredients).map(ingredient => ({
    name: ingredient,
    checked: false,
    category: getCategoryForIngredient(ingredient) || "Other"
  }));

  localStorage.setItem("groceryList", JSON.stringify(groceryList));
  window.location.href = "/dashboard/grocery-list";
};



  // Clear all meal plan data
  const clearMealPlan = () => {
    if (window.confirm('Are you sure you want to clear your entire meal plan?')) {
      localStorage.removeItem('mealPlan');
      setMeals({});
      generateInitialMockData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meal Planning</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Plan your meals for the week and generate a grocery list
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button 
            onClick={() => setShowGenerator(true)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg flex items-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-colors"
          >
            <Zap className="h-5 w-5" />
            <span>Generate Plan</span>
          </button>
          
          <button 
            onClick={clearMealPlan}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Reset</span>
          </button>
          
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigateWeek('prev')}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - 
          {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        </h2>
        
        <button 
          onClick={() => navigateWeek('next')}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Calories</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyNutrition.totalCalories}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Cooking Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyNutrition.totalTime} min</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Planned Meals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyNutrition.mealCount}/21</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <ChefHat className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
        {weekDays.map(day => {
          const dayKey = day.toDateString();
          const dayMeals = meals[dayKey] || {};
          
          return (
            <div 
              key={dayKey}
              className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-colors ${
                isToday(day) ? 'border-orange-500 ring-1 ring-orange-200' : 'border-gray-100 dark:border-gray-700'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className={`font-semibold ${isToday(day) ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'}`}>
                    {formatDate(day)}
                  </h3>
                  {isToday(day) && (
                    <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">
                      Today
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => {
                    setSelectedDay(day);
                    setIsEditing(true);
                  }}
                  className="p-1 text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {['breakfast', 'lunch', 'dinner'].map(mealType => (
                  <div key={mealType} className="text-sm">
                    <p className="text-gray-500 dark:text-gray-400 capitalize mb-1">{mealType}</p>
                    {dayMeals[mealType] ? (
                      <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                        <p className="font-medium text-gray-900 dark:text-white">{dayMeals[mealType].name}</p>
                        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>{dayMeals[mealType].calories} cal</span>
                          <span>{dayMeals[mealType].time} min</span>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2 text-center cursor-pointer hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
                        onClick={() => {
                          setSelectedDay(day);
                          setIsEditing(true);
                        }}
                      >
                        <p className="text-gray-400 dark:text-gray-500">No meal planned</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Meal Plan Generator Modal */}
      <AnimatePresence>
        {showGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Generate Meal Plan</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dietary Preference</label>
                  <select 
                    value={preferences.dietary}
                    onChange={(e) => setPreferences({...preferences, dietary: e.target.value})}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="keto">Keto</option>
                    <option value="mediterranean">Mediterranean</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Daily Calorie Target: {preferences.calories} cal
                  </label>
                  <input 
                    type="range" 
                    min="1200" 
                    max="3000" 
                    step="100"
                    value={preferences.calories}
                    onChange={(e) => setPreferences({...preferences, calories: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Servings per Meal</label>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={preferences.servings}
                      onChange={(e) => setPreferences({...preferences, servings: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Max Prep Time: {preferences.time} min
                  </label>
                  <input 
                    type="range" 
                    min="10" 
                    max="120" 
                    step="5"
                    value={preferences.time}
                    onChange={(e) => setPreferences({...preferences, time: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowGenerator(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={generateMealPlan}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg flex items-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-colors"
                >
                  <Zap className="h-5 w-5" />
                  <span>Generate</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meal Editing Modal */}
      <AnimatePresence>
        {isEditing && selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Plan Meals for {formatDate(selectedDay)}
              </h3>
              
              <div className="space-y-6 mb-6">
                {['breakfast', 'lunch', 'dinner'].map(mealType => {
                  const dayKey = selectedDay.toDateString();
                  const currentMeal = meals[dayKey] ? meals[dayKey][mealType] : null;
                  const suggestions = mockMeals[mealType];
                  
                  return (
                    <div key={mealType}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white capitalize">{mealType}</h4>
                        {currentMeal && (
                          <button 
                            onClick={() => removeMeal(selectedDay, mealType)}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center transition-colors"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        )}
                      </div>
                      
                      {currentMeal ? (
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                          <p className="font-medium text-gray-900 dark:text-white">{currentMeal.name}</p>
                          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>{currentMeal.calories} cal</span>
                            <span>{currentMeal.time} min</span>
                            <span>{currentMeal.servings} servings</span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                          {suggestions.map((meal, index) => (
                            <button
                              key={index}
                              onClick={() => addMeal(selectedDay, mealType, meal)}
                              className="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                            >
                              <p className="font-medium text-gray-900 dark:text-white">{meal.name}</p>
                              <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                                <span>{meal.calories} cal</span>
                                <span>{meal.time} min</span>
                                <span>{meal.servings} servings</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generate Grocery List Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={handleGenerateGroceryList}
          className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg flex items-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-colors hover:shadow-xl"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Generate Grocery List</span>
        </button>
      </div>
    </div>
  );
};

export default MealPlan;