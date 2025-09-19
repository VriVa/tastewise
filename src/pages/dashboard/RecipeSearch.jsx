import React, { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  Clock,
  Star,
  ChefHat,
  X,
  SlidersHorizontal,
  Heart,
  ArrowLeft,
} from 'lucide-react'
import Fuse from 'fuse.js'

// Import theme and data (assuming these files exist in the lib directory)
import { theme } from '../../lib/theme.js'
import recipesData from '../../lib/data.json'

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [fuse, setFuse] = useState(null)
  const [filterInputs, setFilterInputs] = useState({
    diet: '',
    cuisine: '',
    time: '',
    maxCalories: '',
    ingredients: '',
  })

  // Initialize Fuse.js for fuzzy search
  useEffect(() => {
    if (recipes.length > 0) {
      const options = {
        keys: [
          'name',
          'diet',
          'cuisine',
          'ingredients',
          { name: 'nutrition.calories', weight: 0.5 },
        ],
        threshold: 0.4,
        includeScore: true,
      }
      setFuse(new Fuse(recipes, options))
    }
  }, [recipes])

  // Load recipes from JSON file
  useEffect(() => {
    setRecipes(recipesData)
    setFilteredRecipes(recipesData)
  }, [])

  // Handle main search with fuzzy matching
  const handleSearch = (query) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setFilteredRecipes(recipes)
      return
    }

    if (fuse) {
      const results = fuse.search(query)
      setFilteredRecipes(results.map((result) => result.item))
    }
  }

  // Apply filters based on text inputs
  const applyFilters = () => {
    let filtered = [...recipes]

    // Create a Fuse instance for each filter type
    if (filterInputs.diet.trim()) {
      const dietFuse = new Fuse(filtered, {
        keys: ['diet'],
        threshold: 0,
      })
      filtered = dietFuse.search(filterInputs.diet).map((result) => result.item)
    }

    if (filterInputs.cuisine.trim()) {
      const cuisineFuse = new Fuse(filtered, {
        keys: ['cuisine'],
        threshold: 0.4,
      })
      filtered = cuisineFuse
        .search(filterInputs.cuisine)
        .map((result) => result.item)
    }

    // Time filter (exact match)
    if (filterInputs.time.trim()) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.time <= parseInt(filterInputs.time) ||
          isNaN(parseInt(filterInputs.time))
      )
    }

    // Calories filter (exact match)
    if (filterInputs.maxCalories.trim()) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.nutrition.calories <= parseInt(filterInputs.maxCalories) ||
          isNaN(parseInt(filterInputs.maxCalories))
      )
    }

    // Ingredients filter (fuzzy search)
    if (filterInputs.ingredients.trim()) {
      const ingredientsFuse = new Fuse(filtered, {
        keys: ['ingredients'],
        threshold: 0.4,
      })
      filtered = ingredientsFuse
        .search(filterInputs.ingredients)
        .map((result) => result.item)
    }

    setFilteredRecipes(filtered)
    setShowFilters(false)
  }

  // Reset all filters
  const resetFilters = () => {
    setFilterInputs({
      diet: '',
      cuisine: '',
      time: '',
      maxCalories: '',
      ingredients: '',
    })
    setFilteredRecipes(recipes)
    setSearchQuery('')
  }

  // Handle filter input changes
  const handleFilterChange = (type, value) => {
    setFilterInputs((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom right, ${theme.colors.primary[50]}, white, ${theme.colors.primary[50]})`,
      }}
    >
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div
              className="p-3 rounded-2xl shadow-lg"
              style={{
                background: `linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]})`,
              }}
            >
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: theme.colors.gray[900] }}
              >
                CulinaryAI
              </h1>
              <p
                className="text-sm font-medium"
                style={{ color: theme.colors.primary[600] }}
              >
                Advanced Recipe Search
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all"
            style={{
              backgroundColor: showFilters
                ? theme.colors.primary[500]
                : theme.colors.white,
              color: showFilters
                ? theme.colors.white
                : theme.colors.primary[600],
              border: `2px solid ${theme.colors.primary[500]}`,
            }}
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search
              className="h-5 w-5"
              style={{ color: theme.colors.gray[500] }}
            />
          </div>
          <input
            type="text"
            placeholder="Search recipes by name, ingredients, cuisine..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-4 text-lg rounded-2xl border-2 focus:outline-none focus:ring-2"
            style={{
              borderColor: theme.colors.gray[200],
              focusBorderColor: theme.colors.primary[500],
              focusRingColor: theme.colors.primary[100],
            }}
          />
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            style={{ border: `1px solid ${theme.colors.gray[200]}` }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-xl font-bold"
                style={{ color: theme.colors.gray[900] }}
              >
                Filter Recipes
              </h2>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} style={{ color: theme.colors.gray[500] }} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Diet Filter */}
              <div>
                <h3
                  className="font-medium mb-3"
                  style={{ color: theme.colors.gray[700] }}
                >
                  Diet Type
                </h3>
                <input
                  type="text"
                  placeholder="e.g. vegetarian, vegan, gluten-free"
                  value={filterInputs.diet}
                  onChange={(e) => handleFilterChange('diet', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none"
                  style={{
                    borderColor: theme.colors.gray[200],
                    focusBorderColor: theme.colors.primary[500],
                  }}
                />
              </div>

              {/* Cuisine Filter */}
              <div>
                <h3
                  className="font-medium mb-3"
                  style={{ color: theme.colors.gray[700] }}
                >
                  Cuisine Type
                </h3>
                <input
                  type="text"
                  placeholder="e.g. Italian, Indian, Mexican"
                  value={filterInputs.cuisine}
                  onChange={(e) =>
                    handleFilterChange('cuisine', e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none"
                  style={{
                    borderColor: theme.colors.gray[200],
                    focusBorderColor: theme.colors.primary[500],
                  }}
                />
              </div>

              {/* Time Filter */}
              <div>
                <h3
                  className="font-medium mb-3"
                  style={{ color: theme.colors.gray[700] }}
                >
                  Max Cooking Time (minutes)
                </h3>
                <input
                  type="number"
                  placeholder="e.g. 30, 60, 120"
                  min="5"
                  max="240"
                  value={filterInputs.time}
                  onChange={(e) => handleFilterChange('time', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none"
                  style={{
                    borderColor: theme.colors.gray[200],
                    focusBorderColor: theme.colors.primary[500],
                  }}
                />
              </div>

              {/* Calories Filter */}
              <div>
                <h3
                  className="font-medium mb-3"
                  style={{ color: theme.colors.gray[700] }}
                >
                  Max Calories
                </h3>
                <input
                  type="number"
                  placeholder="e.g. 300, 500, 800"
                  min="100"
                  max="1000"
                  value={filterInputs.maxCalories}
                  onChange={(e) =>
                    handleFilterChange('maxCalories', e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none"
                  style={{
                    borderColor: theme.colors.gray[200],
                    focusBorderColor: theme.colors.primary[500],
                  }}
                />
              </div>

              {/* Ingredients Filter */}
              <div className="md:col-span-2">
                <h3
                  className="font-medium mb-3"
                  style={{ color: theme.colors.gray[700] }}
                >
                  Ingredients
                </h3>
                <input
                  type="text"
                  placeholder="e.g. chicken, tomato, basil"
                  value={filterInputs.ingredients}
                  onChange={(e) =>
                    handleFilterChange('ingredients', e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none"
                  style={{
                    borderColor: theme.colors.gray[200],
                    focusBorderColor: theme.colors.primary[500],
                  }}
                />
                <p
                  className="text-sm mt-1"
                  style={{ color: theme.colors.gray[500] }}
                >
                  Search for recipes containing specific ingredients
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={resetFilters}
                className="px-6 py-2 rounded-xl font-medium"
                style={{
                  backgroundColor: theme.colors.gray[100],
                  color: theme.colors.gray[700],
                }}
              >
                Reset All
              </button>
              <button
                onClick={applyFilters}
                className="px-6 py-2 rounded-xl font-medium text-white"
                style={{
                  background: `linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]})`,
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p style={{ color: theme.colors.gray[600] }}>
            Found {filteredRecipes.length} recipe
            {filteredRecipes.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                style={{ border: `1px solid ${theme.colors.gray[200]}` }}
              >
                <div
                  className="h-48 flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary[100] }}
                >
                  <ChefHat
                    size={64}
                    style={{ color: theme.colors.primary[500] }}
                  />
                </div>

                <div className="p-5">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: theme.colors.gray[900] }}
                  >
                    {recipe.name}
                  </h3>

                  <div className="flex items-center space-x-4 mb-3">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: theme.colors.primary[100],
                        color: theme.colors.primary[600],
                      }}
                    >
                      {recipe.diet}
                    </span>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: theme.colors.gray[100],
                        color: theme.colors.gray[700],
                      }}
                    >
                      {recipe.cuisine}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className="flex items-center"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      <Clock size={16} className="mr-1" />
                      <span>{recipe.time} min</span>
                    </div>
                    <div
                      className="flex items-center"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      <span>🔥 {recipe.nutrition.calories} cal</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4
                      className="font-medium mb-2"
                      style={{ color: theme.colors.gray[700] }}
                    >
                      Ingredients:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.slice(0, 4).map((ingredient) => (
                        <span
                          key={ingredient}
                          className="text-sm px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: theme.colors.gray[100],
                            color: theme.colors.gray[700],
                          }}
                        >
                          {ingredient}
                        </span>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <span
                          className="text-sm px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: theme.colors.gray[100],
                            color: theme.colors.gray[700],
                          }}
                        >
                          +{recipe.ingredients.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    className="w-full py-3 rounded-xl font-medium text-white text-center"
                    style={{
                      background: `linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]})`,
                    }}
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <ChefHat
              size={64}
              className="mx-auto mb-4"
              style={{ color: theme.colors.gray[300] }}
            />
            <h3
              className="text-xl font-medium mb-2"
              style={{ color: theme.colors.gray[700] }}
            >
              No recipes found
            </h3>
            <p style={{ color: theme.colors.gray[500] }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeSearch
