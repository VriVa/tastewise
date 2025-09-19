// Store exports
export { useRecipeStore } from './recipeStore';
export { useUserStore } from './userStore';
export { useMealPlanStore } from './mealPlanStore';
export { useGroceryStore } from './groceryStore';
export { useNutritionStore } from './nutritionStore';

// Store hooks for easier usage
import { useRecipeStore } from './recipeStore';
import { useUserStore } from './userStore';
import { useMealPlanStore } from './mealPlanStore';
import { useGroceryStore } from './groceryStore';
import { useNutritionStore } from './nutritionStore';

// Combined hooks for related data
export const useAppStores = () => ({
  recipes: useRecipeStore(),
  user: useUserStore(),
  mealPlan: useMealPlanStore(),
  grocery: useGroceryStore(),
  nutrition: useNutritionStore()
});

// Specific feature hooks
export const useRecipeSearch = () => {
  const {
    filteredRecipes,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    clearFilters,
    getUniqueValues
  } = useRecipeStore();
  
  return {
    recipes: filteredRecipes,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    clearFilters,
    getUniqueValues
  };
};

export const useFavoriteRecipes = () => {
  const {
    favoriteRecipes,
    addToFavorites,
    removeFromFavorites
  } = useRecipeStore();
  
  return {
    favorites: favoriteRecipes,
    addToFavorites,
    removeFromFavorites,
    isFavorite: (recipeName) => favoriteRecipes.some(r => r.name === recipeName)
  };
};

export const useUserProfile = () => {
  const {
    user,
    preferences,
    cookingStats,
    achievements,
    updateUser,
    updatePreferences,
    getDailyNutritionProgress
  } = useUserStore();
  
  return {
    user,
    preferences,
    cookingStats,
    achievements,
    updateUser,
    updatePreferences,
    nutritionProgress: getDailyNutritionProgress()
  };
};

export const useTodaysMealPlan = () => {
  const {
    getTodaysMeals,
    addMealToPlan,
    removeMealFromPlan,
    selectedDate
  } = useMealPlanStore();
  
  const today = new Date().toISOString().split('T')[0];
  
  return {
    todaysMeals: getTodaysMeals(),
    addMeal: (mealType, recipe) => addMealToPlan(today, mealType, recipe),
    removeMeal: (mealType) => removeMealFromPlan(today, mealType),
    selectedDate
  };
};

export const useCurrentGroceryList = () => {
  const {
    getActiveList,
    addItem,
    removeItem,
    toggleItemChecked,
    getItemsByCategory,
    getTotalCost
  } = useGroceryStore();
  
  const activeList = getActiveList();
  
  return {
    list: activeList,
    items: activeList?.items || [],
    itemsByCategory: getItemsByCategory(),
    totalCost: getTotalCost(),
    addItem,
    removeItem,
    toggleItemChecked
  };
};

export const useTodaysNutrition = () => {
  const {
    getCurrentDayData,
    getDayProgress,
    addMealToDay,
    updateWaterIntake,
    selectedDate
  } = useNutritionStore();
  
  const today = new Date().toISOString().split('T')[0];
  
  return {
    dayData: getCurrentDayData(),
    progress: getDayProgress(today),
    addMeal: (meal) => addMealToDay(today, meal),
    updateWater: (glasses) => updateWaterIntake(today, glasses),
    selectedDate
  };
};