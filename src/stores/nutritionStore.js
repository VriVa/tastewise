import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNutritionStore = create(
  persist(
    (set, get) => ({
      // Daily Nutrition Tracking
      dailyIntake: {
        // Format: 'YYYY-MM-DD': { meals: [...], totals: {...} }
        '2024-12-16': {
          meals: [
            {
              id: '1',
              name: 'Greek Yogurt Bowl',
              type: 'breakfast',
              time: '08:30',
              nutrition: { calories: 250, protein: 15, carbs: 30, fat: 8, fiber: 5, sugar: 20 },
              ingredients: ['greek yogurt', 'berries', 'granola', 'honey']
            },
            {
              id: '2',
              name: 'Quinoa Salad',
              type: 'lunch',
              time: '12:45',
              nutrition: { calories: 280, protein: 8, carbs: 35, fat: 12, fiber: 6, sugar: 8 },
              ingredients: ['quinoa', 'cucumber', 'tomato', 'feta', 'olive oil']
            },
            {
              id: '3',
              name: 'Grilled Salmon',
              type: 'dinner',
              time: '19:15',
              nutrition: { calories: 450, protein: 35, carbs: 15, fat: 28, fiber: 3, sugar: 5 },
              ingredients: ['salmon', 'asparagus', 'sweet potato', 'lemon']
            }
          ],
          totals: { calories: 980, protein: 58, carbs: 80, fat: 48, fiber: 14, sugar: 33 },
          water: 6, // glasses
          notes: 'Felt energetic throughout the day'
        },
        '2024-12-17': {
          meals: [],
          totals: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 },
          water: 0,
          notes: ''
        }
      },
      
      // Nutrition Goals (from user preferences)
      nutritionGoals: {
        daily: {
          calories: 2000,
          protein: 150, // grams
          carbs: 250,   // grams
          fat: 67,      // grams
          fiber: 25,    // grams
          sugar: 50,    // grams (max)
          water: 8      // glasses
        },
        weekly: {
          avgCalories: 2000,
          proteinTarget: 1050, // 7 * 150
          exerciseDays: 4
        }
      },
      
      // Nutrition Analysis & Insights
      weeklyAnalysis: {
        '2024-W50': {
          avgCalories: 1850,
          avgProtein: 140,
          avgCarbs: 220,
          avgFat: 65,
          daysMetGoals: 5,
          topNutrients: ['protein', 'fiber'],
          needsImprovement: ['calories', 'water'],
          score: 82
        }
      },
      
      // Food Database (simplified)
      foodDatabase: [
        { name: 'chicken breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, per: '100g' },
        { name: 'brown rice', calories: 112, protein: 2.6, carbs: 23, fat: 0.9, per: '100g' },
        { name: 'salmon', calories: 208, protein: 25, carbs: 0, fat: 12, per: '100g' },
        { name: 'avocado', calories: 160, protein: 2, carbs: 9, fat: 15, per: '100g' },
        { name: 'broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, per: '100g' }
      ],
      
      // Recipe Nutrition Cache
      recipeNutritionCache: new Map(),
      
      // Current day selection
      selectedDate: new Date().toISOString().split('T')[0],
      
      // Actions
      setSelectedDate: (date) => {
        set({ selectedDate: date });
      },
      
      updateNutritionGoals: (goals) => {
        set((state) => ({
          nutritionGoals: {
            ...state.nutritionGoals,
            daily: { ...state.nutritionGoals.daily, ...goals }
          }
        }));
      },
      
      // Meal Tracking
      addMealToDay: (date, meal) => {
        set((state) => {
          const dayData = state.dailyIntake[date] || { meals: [], totals: {}, water: 0, notes: '' };
          const newMeal = {
            id: Date.now().toString(),
            ...meal,
            time: meal.time || new Date().toTimeString().slice(0, 5)
          };
          
          const updatedMeals = [...dayData.meals, newMeal];
          const newTotals = get().calculateDayTotals(updatedMeals);
          
          return {
            dailyIntake: {
              ...state.dailyIntake,
              [date]: {
                ...dayData,
                meals: updatedMeals,
                totals: newTotals
              }
            }
          };
        });
      },
      
      removeMealFromDay: (date, mealId) => {
        set((state) => {
          const dayData = state.dailyIntake[date];
          if (!dayData) return state;
          
          const updatedMeals = dayData.meals.filter(meal => meal.id !== mealId);
          const newTotals = get().calculateDayTotals(updatedMeals);
          
          return {
            dailyIntake: {
              ...state.dailyIntake,
              [date]: {
                ...dayData,
                meals: updatedMeals,
                totals: newTotals
              }
            }
          };
        });
      },
      
      updateMealInDay: (date, mealId, updates) => {
        set((state) => {
          const dayData = state.dailyIntake[date];
          if (!dayData) return state;
          
          const updatedMeals = dayData.meals.map(meal =>
            meal.id === mealId ? { ...meal, ...updates } : meal
          );
          const newTotals = get().calculateDayTotals(updatedMeals);
          
          return {
            dailyIntake: {
              ...state.dailyIntake,
              [date]: {
                ...dayData,
                meals: updatedMeals,
                totals: newTotals
              }
            }
          };
        });
      },
      
      updateWaterIntake: (date, glasses) => {
        set((state) => {
          const dayData = state.dailyIntake[date] || { meals: [], totals: {}, water: 0, notes: '' };
          
          return {
            dailyIntake: {
              ...state.dailyIntake,
              [date]: {
                ...dayData,
                water: glasses
              }
            }
          };
        });
      },
      
      addDayNotes: (date, notes) => {
        set((state) => {
          const dayData = state.dailyIntake[date] || { meals: [], totals: {}, water: 0, notes: '' };
          
          return {
            dailyIntake: {
              ...state.dailyIntake,
              [date]: {
                ...dayData,
                notes
              }
            }
          };
        });
      },
      
      // Utility Functions
      calculateDayTotals: (meals) => {
        return meals.reduce((totals, meal) => {
          const nutrition = meal.nutrition || {};
          return {
            calories: (totals.calories || 0) + (nutrition.calories || 0),
            protein: (totals.protein || 0) + (nutrition.protein || 0),
            carbs: (totals.carbs || 0) + (nutrition.carbs || 0),
            fat: (totals.fat || 0) + (nutrition.fat || 0),
            fiber: (totals.fiber || 0) + (nutrition.fiber || 0),
            sugar: (totals.sugar || 0) + (nutrition.sugar || 0)
          };
        }, {});
      },
      
      getDayData: (date) => {
        return get().dailyIntake[date] || { meals: [], totals: {}, water: 0, notes: '' };
      },
      
      getCurrentDayData: () => {
        return get().getDayData(get().selectedDate);
      },
      
      getDayProgress: (date) => {
        const dayData = get().getDayData(date);
        const goals = get().nutritionGoals.daily;
        
        return {
          calories: {
            current: dayData.totals.calories || 0,
            goal: goals.calories,
            percentage: Math.round(((dayData.totals.calories || 0) / goals.calories) * 100)
          },
          protein: {
            current: dayData.totals.protein || 0,
            goal: goals.protein,
            percentage: Math.round(((dayData.totals.protein || 0) / goals.protein) * 100)
          },
          carbs: {
            current: dayData.totals.carbs || 0,
            goal: goals.carbs,
            percentage: Math.round(((dayData.totals.carbs || 0) / goals.carbs) * 100)
          },
          fat: {
            current: dayData.totals.fat || 0,
            goal: goals.fat,
            percentage: Math.round(((dayData.totals.fat || 0) / goals.fat) * 100)
          },
          water: {
            current: dayData.water || 0,
            goal: goals.water,
            percentage: Math.round(((dayData.water || 0) / goals.water) * 100)
          }
        };
      },
      
      getWeekProgress: (weekStart) => {
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(weekStart);
          date.setDate(date.getDate() + i);
          weekDates.push(date.toISOString().split('T')[0]);
        }
        
        const weekData = weekDates.map(date => get().getDayData(date));
        const weekTotals = weekData.reduce((totals, dayData) => ({
          calories: totals.calories + (dayData.totals.calories || 0),
          protein: totals.protein + (dayData.totals.protein || 0),
          carbs: totals.carbs + (dayData.totals.carbs || 0),
          fat: totals.fat + (dayData.totals.fat || 0)
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
        
        const avgDaily = {
          calories: Math.round(weekTotals.calories / 7),
          protein: Math.round(weekTotals.protein / 7),
          carbs: Math.round(weekTotals.carbs / 7),
          fat: Math.round(weekTotals.fat / 7)
        };
        
        return { weekTotals, avgDaily, dailyData: weekData };
      },
      
      // Recipe Nutrition Calculation
      calculateRecipeNutrition: (recipe) => {
        const cacheKey = recipe.name;
        if (get().recipeNutritionCache.has(cacheKey)) {
          return get().recipeNutritionCache.get(cacheKey);
        }
        
        // Simple calculation based on ingredients
        const { foodDatabase } = get();
        let totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
        
        recipe.ingredients?.forEach(ingredient => {
          const foodItem = foodDatabase.find(food => 
            food.name.toLowerCase().includes(ingredient.toLowerCase())
          );
          
          if (foodItem) {
            // Assuming 100g serving per ingredient (simplified)
            totalNutrition.calories += foodItem.calories;
            totalNutrition.protein += foodItem.protein;
            totalNutrition.carbs += foodItem.carbs;
            totalNutrition.fat += foodItem.fat;
          }
        });
        
        // Adjust for typical serving size (divide by estimated servings)
        const servings = recipe.servings || 4;
        const perServing = {
          calories: Math.round(totalNutrition.calories / servings),
          protein: Math.round(totalNutrition.protein / servings),
          carbs: Math.round(totalNutrition.carbs / servings),
          fat: Math.round(totalNutrition.fat / servings)
        };
        
        // Cache the result
        set((state) => {
          const newCache = new Map(state.recipeNutritionCache);
          newCache.set(cacheKey, perServing);
          return { recipeNutritionCache: newCache };
        });
        
        return perServing;
      },
      
      // Insights and Analysis
      getNutritionInsights: (days = 7) => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        const insights = [];
        const goals = get().nutritionGoals.daily;
        
        // Analyze recent intake
        let totalDays = 0;
        let avgIntake = { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0 };
        
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0];
          const dayData = get().getDayData(dateStr);
          
          if (dayData.meals.length > 0) {
            totalDays++;
            avgIntake.calories += dayData.totals.calories || 0;
            avgIntake.protein += dayData.totals.protein || 0;
            avgIntake.carbs += dayData.totals.carbs || 0;
            avgIntake.fat += dayData.totals.fat || 0;
            avgIntake.water += dayData.water || 0;
          }
        }
        
        if (totalDays > 0) {
          avgIntake.calories = Math.round(avgIntake.calories / totalDays);
          avgIntake.protein = Math.round(avgIntake.protein / totalDays);
          avgIntake.carbs = Math.round(avgIntake.carbs / totalDays);
          avgIntake.fat = Math.round(avgIntake.fat / totalDays);
          avgIntake.water = Math.round(avgIntake.water / totalDays);
          
          // Generate insights
          if (avgIntake.calories < goals.calories * 0.8) {
            insights.push({
              type: 'warning',
              category: 'calories',
              message: `Your average calorie intake (${avgIntake.calories}) is below your goal. Consider adding healthy snacks.`
            });
          }
          
          if (avgIntake.protein > goals.protein * 1.2) {
            insights.push({
              type: 'success',
              category: 'protein',
              message: `Excellent protein intake! You're consistently exceeding your protein goals.`
            });
          }
          
          if (avgIntake.water < goals.water * 0.7) {
            insights.push({
              type: 'warning',
              category: 'water',
              message: `Try to drink more water. You're averaging ${avgIntake.water} glasses vs your goal of ${goals.water}.`
            });
          }
        }
        
        return { insights, avgIntake, totalDays };
      }
    }),
    {
      name: 'nutrition-store',
      partialize: (state) => ({
        dailyIntake: state.dailyIntake,
        nutritionGoals: state.nutritionGoals,
        weeklyAnalysis: state.weeklyAnalysis
      })
    }
  )
);