import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      // User State
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: '',
        joinDate: '2024-01-15',
        isAuthenticated: true
      },
      
      // User Preferences
      preferences: {
        dietaryRestrictions: ['vegetarian'], // vegan, vegetarian, gluten-free, dairy-free, etc.
        allergies: ['nuts'],
        favoriteCuisines: ['Italian', 'Japanese'],
        cookingLevel: 'intermediate', // beginner, intermediate, advanced
        defaultServings: 4,
        preferredMealTimes: {
          breakfast: '08:00',
          lunch: '12:30',
          dinner: '19:00'
        },
        nutritionGoals: {
          dailyCalories: 2000,
          protein: 150, // grams
          carbs: 250,   // grams
          fat: 67       // grams
        },
        theme: 'light', // light, dark, system
        notifications: {
          mealReminders: true,
          recipeOfTheDay: true,
          groceryReminders: true
        }
      },
      
      // Cooking Stats
      cookingStats: {
        mealsCooked: 156,
        recipesLearned: 89,
        favoriteCuisine: 'Italian',
        avgCookTime: 35,
        thisWeekMeals: 12,
        thisMonthMeals: 48,
        nutritionScore: 87,
        cookingStreak: 7 // days
      },
      
      // Achievements/Badges
      achievements: [
        { id: 'first_meal', name: 'First Meal', description: 'Cooked your first meal', earned: true, date: '2024-01-16' },
        { id: 'week_streak', name: 'Week Warrior', description: 'Cooked for 7 days straight', earned: true, date: '2024-03-10' },
        { id: 'healthy_month', name: 'Healthy Month', description: 'Maintained nutrition goals for a month', earned: true, date: '2024-06-01' },
        { id: 'cuisine_explorer', name: 'Cuisine Explorer', description: 'Tried 10 different cuisines', earned: false, date: null }
      ],
      
      // Actions
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }));
      },
      
      updatePreferences: (prefs) => {
        set((state) => ({
          preferences: { ...state.preferences, ...prefs }
        }));
      },
      
      updateNutritionGoals: (goals) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            nutritionGoals: { ...state.preferences.nutritionGoals, ...goals }
          }
        }));
      },
      
      addDietaryRestriction: (restriction) => {
        set((state) => {
          if (state.preferences.dietaryRestrictions.includes(restriction)) return state;
          return {
            preferences: {
              ...state.preferences,
              dietaryRestrictions: [...state.preferences.dietaryRestrictions, restriction]
            }
          };
        });
      },
      
      removeDietaryRestriction: (restriction) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            dietaryRestrictions: state.preferences.dietaryRestrictions.filter(r => r !== restriction)
          }
        }));
      },
      
      addAllergy: (allergy) => {
        set((state) => {
          if (state.preferences.allergies.includes(allergy)) return state;
          return {
            preferences: {
              ...state.preferences,
              allergies: [...state.preferences.allergies, allergy]
            }
          };
        });
      },
      
      removeAllergy: (allergy) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            allergies: state.preferences.allergies.filter(a => a !== allergy)
          }
        }));
      },
      
      updateCookingStats: (stats) => {
        set((state) => ({
          cookingStats: { ...state.cookingStats, ...stats }
        }));
      },
      
      incrementMealsCooked: () => {
        set((state) => ({
          cookingStats: {
            ...state.cookingStats,
            mealsCooked: state.cookingStats.mealsCooked + 1,
            thisWeekMeals: state.cookingStats.thisWeekMeals + 1,
            thisMonthMeals: state.cookingStats.thisMonthMeals + 1
          }
        }));
      },
      
      earnAchievement: (achievementId) => {
        set((state) => ({
          achievements: state.achievements.map(achievement =>
            achievement.id === achievementId
              ? { ...achievement, earned: true, date: new Date().toISOString().split('T')[0] }
              : achievement
          )
        }));
      },
      
      // Authentication
      login: (userData) => {
        set({
          user: { ...userData, isAuthenticated: true }
        });
      },
      
      logout: () => {
        set((state) => ({
          user: { ...state.user, isAuthenticated: false }
        }));
      },
      
      // Utility functions
      isVegetarian: () => {
        const { preferences } = get();
        return preferences.dietaryRestrictions.includes('vegetarian') || preferences.dietaryRestrictions.includes('vegan');
      },
      
      isVegan: () => {
        const { preferences } = get();
        return preferences.dietaryRestrictions.includes('vegan');
      },
      
      hasAllergy: (ingredient) => {
        const { preferences } = get();
        return preferences.allergies.some(allergy => 
          ingredient.toLowerCase().includes(allergy.toLowerCase())
        );
      },
      
      getDailyNutritionProgress: () => {
        // This would typically be calculated from daily meals
        // For now, returning mock data
        return {
          calories: { consumed: 1650, goal: 2000, percentage: 82.5 },
          protein: { consumed: 125, goal: 150, percentage: 83.3 },
          carbs: { consumed: 180, goal: 250, percentage: 72 },
          fat: { consumed: 52, goal: 67, percentage: 77.6 }
        };
      }
    }),
    {
      name: 'user-store', // unique name for localStorage
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
        cookingStats: state.cookingStats,
        achievements: state.achievements
      })
    }
  )
);