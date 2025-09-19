import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import recipesData from '../lib/data.json';

export const useRecipeStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    recipes: recipesData,
    filteredRecipes: recipesData,
    favoriteRecipes: [],
    recentlyViewed: [],
    searchQuery: '',
    filters: {
      diet: [],
      cuisine: [],
      timeRange: { min: 0, max: 120 },
      calories: { min: 0, max: 1000 }
    },
    isLoading: false,
    
    // Search and Filter Actions
    setSearchQuery: (query) => {
      set({ searchQuery: query });
      get().applyFilters();
    },
    
    setFilters: (newFilters) => {
      set((state) => ({
        filters: { ...state.filters, ...newFilters }
      }));
      get().applyFilters();
    },
    
    applyFilters: () => {
      const { recipes, searchQuery, filters } = get();
      
      let filtered = recipes.filter((recipe) => {
        // Search by name or ingredients
        const matchesSearch = searchQuery === '' || 
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchQuery.toLowerCase())
          );
        
        // Diet filter
        const matchesDiet = filters.diet.length === 0 || 
          filters.diet.includes(recipe.diet);
        
        // Cuisine filter
        const matchesCuisine = filters.cuisine.length === 0 || 
          filters.cuisine.includes(recipe.cuisine);
        
        // Time filter
        const matchesTime = recipe.time >= filters.timeRange.min && 
          recipe.time <= filters.timeRange.max;
        
        // Calories filter
        const matchesCalories = recipe.nutrition.calories >= filters.calories.min && 
          recipe.nutrition.calories <= filters.calories.max;
        
        return matchesSearch && matchesDiet && matchesCuisine && matchesTime && matchesCalories;
      });
      
      set({ filteredRecipes: filtered });
    },
    
    clearFilters: () => {
      set({
        searchQuery: '',
        filters: {
          diet: [],
          cuisine: [],
          timeRange: { min: 0, max: 120 },
          calories: { min: 0, max: 1000 }
        },
        filteredRecipes: recipesData
      });
    },
    
    // Recipe Actions
    addToFavorites: (recipeName) => {
      set((state) => {
        const isAlreadyFavorite = state.favoriteRecipes.some(recipe => recipe.name === recipeName);
        if (isAlreadyFavorite) return state;
        
        const recipe = state.recipes.find(r => r.name === recipeName);
        if (!recipe) return state;
        
        return {
          favoriteRecipes: [...state.favoriteRecipes, recipe]
        };
      });
    },
    
    removeFromFavorites: (recipeName) => {
      set((state) => ({
        favoriteRecipes: state.favoriteRecipes.filter(recipe => recipe.name !== recipeName)
      }));
    },
    
    addToRecentlyViewed: (recipeName) => {
      set((state) => {
        const recipe = state.recipes.find(r => r.name === recipeName);
        if (!recipe) return state;
        
        const filtered = state.recentlyViewed.filter(r => r.name !== recipeName);
        return {
          recentlyViewed: [recipe, ...filtered].slice(0, 10) // Keep only last 10
        };
      });
    },
    
    // Utility Functions
    getRecipeByName: (name) => {
      return get().recipes.find(recipe => recipe.name === name);
    },
    
    getUniqueValues: (field) => {
      const { recipes } = get();
      return [...new Set(recipes.map(recipe => recipe[field]))].sort();
    },
    
    // AI Suggestions (mock for now)
    getAISuggestions: () => {
      const { recipes, favoriteRecipes } = get();
      
      // Simple recommendation based on favorite cuisines
      const favoriteCuisines = [...new Set(favoriteRecipes.map(r => r.cuisine))];
      
      if (favoriteCuisines.length === 0) {
        // Return random recipes if no favorites
        return recipes.slice(0, 6);
      }
      
      const suggestions = recipes.filter(recipe => 
        favoriteCuisines.includes(recipe.cuisine) && 
        !favoriteRecipes.some(fav => fav.name === recipe.name)
      ).slice(0, 6);
      
      return suggestions;
    }
  }))
);

// Initialize filters on store creation
useRecipeStore.getState().applyFilters();