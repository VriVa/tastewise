import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMealPlanStore = create(
  persist(
    (set, get) => ({
      // Meal Plan State
      weeklyMealPlan: {
        // Format: 'YYYY-MM-DD': { breakfast: recipe, lunch: recipe, dinner: recipe, snacks: [recipes] }
        '2024-12-16': {
          breakfast: { name: 'Greek Yogurt Bowl', time: 15, calories: 250 },
          lunch: { name: 'Quinoa Salad', time: 20, calories: 280 },
          dinner: { name: 'Grilled Salmon', time: 30, calories: 450 },
          snacks: [{ name: 'Apple with Almonds', time: 5, calories: 150 }]
        },
        '2024-12-17': {
          breakfast: { name: 'Avocado Toast', time: 10, calories: 320 },
          lunch: { name: 'Lentil Curry', time: 40, calories: 350 },
          dinner: { name: 'Butter Chicken', time: 50, calories: 550 },
          snacks: []
        }
      },
      
      currentWeek: new Date().toISOString().split('T')[0], // Current week start date
      selectedDate: new Date().toISOString().split('T')[0],
      
      // Meal Templates
      mealTemplates: [
        {
          id: 'healthy_week',
          name: 'Healthy Week',
          description: 'Balanced meals with focus on nutrition',
          meals: {
            monday: { breakfast: 'Oatmeal Bowl', lunch: 'Quinoa Salad', dinner: 'Grilled Chicken' },
            tuesday: { breakfast: 'Greek Yogurt', lunch: 'Lentil Soup', dinner: 'Baked Salmon' },
            // ... more days
          }
        },
        {
          id: 'quick_meals',
          name: 'Quick & Easy',
          description: 'Meals that take 30 minutes or less',
          meals: {
            // Quick meal plans
          }
        }
      ],
      
      // Meal Generation Preferences
      generationPreferences: {
        mealsPerDay: 3, // breakfast, lunch, dinner
        includeSnacks: true,
        maxPrepTime: 60,
        budgetPerMeal: 15,
        variety: 'high', // low, medium, high
        repeatMeals: false,
        cuisineBalance: true
      },
      
      // Cooking Schedule
      cookingSchedule: [
        { date: '2024-12-16', meals: ['breakfast', 'dinner'], status: 'planned' },
        { date: '2024-12-17', meals: ['lunch'], status: 'in-progress' },
        { date: '2024-12-18', meals: ['breakfast', 'lunch', 'dinner'], status: 'completed' }
      ],
      
      // Actions
      setSelectedDate: (date) => {
        set({ selectedDate: date });
      },
      
      setCurrentWeek: (weekStart) => {
        set({ currentWeek: weekStart });
      },
      
      addMealToPlan: (date, mealType, recipe) => {
        set((state) => ({
          weeklyMealPlan: {
            ...state.weeklyMealPlan,
            [date]: {
              ...state.weeklyMealPlan[date],
              [mealType]: recipe
            }
          }
        }));
      },
      
      removeMealFromPlan: (date, mealType) => {
        set((state) => {
          const dayPlan = { ...state.weeklyMealPlan[date] };
          delete dayPlan[mealType];
          
          return {
            weeklyMealPlan: {
              ...state.weeklyMealPlan,
              [date]: dayPlan
            }
          };
        });
      },
      
      addSnackToPlan: (date, snack) => {
        set((state) => ({
          weeklyMealPlan: {
            ...state.weeklyMealPlan,
            [date]: {
              ...state.weeklyMealPlan[date],
              snacks: [...(state.weeklyMealPlan[date]?.snacks || []), snack]
            }
          }
        }));
      },
      
      removeSnackFromPlan: (date, snackIndex) => {
        set((state) => {
          const dayPlan = { ...state.weeklyMealPlan[date] };
          dayPlan.snacks = dayPlan.snacks?.filter((_, index) => index !== snackIndex) || [];
          
          return {
            weeklyMealPlan: {
              ...state.weeklyMealPlan,
              [date]: dayPlan
            }
          };
        });
      },
      
      clearDayPlan: (date) => {
        set((state) => {
          const newPlan = { ...state.weeklyMealPlan };
          delete newPlan[date];
          return { weeklyMealPlan: newPlan };
        });
      },
      
      clearWeekPlan: () => {
        set({ weeklyMealPlan: {} });
      },
      
      // Meal Plan Generation
      generateWeeklyPlan: (preferences = {}) => {
        const { generationPreferences } = get();
        const prefs = { ...generationPreferences, ...preferences };
        
        // Mock meal plan generation (in real app, this would call an API)
        const startDate = new Date(get().currentWeek);
        const generatedPlan = {};
        
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          const dateStr = date.toISOString().split('T')[0];
          
          generatedPlan[dateStr] = {
            breakfast: { name: 'Generated Breakfast', time: 15, calories: 300 },
            lunch: { name: 'Generated Lunch', time: 30, calories: 400 },
            dinner: { name: 'Generated Dinner', time: 45, calories: 500 },
            snacks: prefs.includeSnacks ? [{ name: 'Healthy Snack', time: 5, calories: 100 }] : []
          };
        }
        
        set({ weeklyMealPlan: generatedPlan });
      },
      
      applyMealTemplate: (templateId) => {
        const template = get().mealTemplates.find(t => t.id === templateId);
        if (!template) return;
        
        // Apply template logic here
        console.log('Applying template:', template.name);
      },
      
      updateGenerationPreferences: (prefs) => {
        set((state) => ({
          generationPreferences: { ...state.generationPreferences, ...prefs }
        }));
      },
      
      // Cooking Schedule Management
      updateMealStatus: (date, status) => {
        set((state) => ({
          cookingSchedule: state.cookingSchedule.map(item =>
            item.date === date ? { ...item, status } : item
          )
        }));
      },
      
      addToCookingSchedule: (date, meals) => {
        set((state) => {
          const existingIndex = state.cookingSchedule.findIndex(item => item.date === date);
          
          if (existingIndex >= 0) {
            // Update existing entry
            const updated = [...state.cookingSchedule];
            updated[existingIndex] = { date, meals, status: 'planned' };
            return { cookingSchedule: updated };
          } else {
            // Add new entry
            return {
              cookingSchedule: [...state.cookingSchedule, { date, meals, status: 'planned' }]
            };
          }
        });
      },
      
      // Utility Functions
      getMealsForDate: (date) => {
        return get().weeklyMealPlan[date] || {};
      },
      
      getWeeklyCalories: () => {
        const { weeklyMealPlan } = get();
        let totalCalories = 0;
        
        Object.values(weeklyMealPlan).forEach(dayPlan => {
          ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            if (dayPlan[mealType]) {
              totalCalories += dayPlan[mealType].calories || 0;
            }
          });
          
          if (dayPlan.snacks) {
            dayPlan.snacks.forEach(snack => {
              totalCalories += snack.calories || 0;
            });
          }
        });
        
        return totalCalories;
      },
      
      getWeeklyPrepTime: () => {
        const { weeklyMealPlan } = get();
        let totalTime = 0;
        
        Object.values(weeklyMealPlan).forEach(dayPlan => {
          ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            if (dayPlan[mealType]) {
              totalTime += dayPlan[mealType].time || 0;
            }
          });
          
          if (dayPlan.snacks) {
            dayPlan.snacks.forEach(snack => {
              totalTime += snack.time || 0;
            });
          }
        });
        
        return totalTime;
      },
      
      getTodaysMeals: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().getMealsForDate(today);
      }
    }),
    {
      name: 'meal-plan-store',
      partialize: (state) => ({
        weeklyMealPlan: state.weeklyMealPlan,
        generationPreferences: state.generationPreferences,
        cookingSchedule: state.cookingSchedule
      })
    }
  )
);