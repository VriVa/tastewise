import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Clock,
  ChefHat,
  X,
  SlidersHorizontal,
  ArrowRight,
} from 'lucide-react'
import Fuse from 'fuse.js'
import { useNavigate } from 'react-router-dom'

// Import theme and data
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

  const navigate = useNavigate()

  // Initialize Fuse.js for fuzzy search with different thresholds
  useEffect(() => {
    if (recipes.length > 0) {
      const options = {
        keys: [
          'name',
          'diet',
          'cuisine',
          'ingredients.name',
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

    // Diet filter with exact matching for specific categories
    if (filterInputs.diet.trim()) {
      const dietQuery = filterInputs.diet.toLowerCase().trim()
      if (
        ['vegetarian', 'vegan', 'non-vegetarian', 'gluten-free'].includes(
          dietQuery
        )
      ) {
        // Exact match for specific diet types
        filtered = filtered.filter(
          (recipe) => recipe.diet.toLowerCase() === dietQuery
        )
      } else {
        // Fuzzy search for other diet queries
        const dietFuse = new Fuse(filtered, {
          keys: ['diet'],
          threshold: 0.4,
        })
        filtered = dietFuse
          .search(filterInputs.diet)
          .map((result) => result.item)
      }
    }

    // Cuisine filter (fuzzy search)
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
        keys: ['ingredients.name'],
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

  // Handle view recipe click
  const handleViewRecipe = (recipe) => {
    console.log('Selected Recipe:', recipe)
    localStorage.setItem('selectedRecipe', JSON.stringify(recipe))
    navigate('/dashboard/nutrition')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-2xl bg-gradient-to-r from-primary to-secondary"
            >
              <ChefHat className="h-8 w-8 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">
                CulinaryAI
              </h1>
              <p className="text-sm font-medium text-muted-foreground">
                Advanced Recipe Search
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all border-2 ${
              showFilters 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-card text-primary border-primary'
            }`}
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </motion.button>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search recipes by name, ingredients, cuisine..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-4 text-lg rounded-2xl border-2 border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card rounded-2xl shadow-lg p-6 mb-8 overflow-hidden border"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  Filter Recipes
                </h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Diet Filter */}
                <div>
                  <h3 className="font-medium mb-3 text-muted-foreground">
                    Diet Type
                  </h3>
                  <input
                    type="text"
                    placeholder="e.g. vegetarian, vegan, non-vegetarian"
                    value={filterInputs.diet}
                    onChange={(e) => handleFilterChange('diet', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border-2 border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-sm mt-1 text-muted-foreground">
                    Try: vegetarian, vegan, non-vegetarian, gluten-free
                  </p>
                </div>

                {/* Cuisine Filter */}
                <div>
                  <h3 className="font-medium mb-3 text-muted-foreground">
                    Cuisine Type
                  </h3>
                  <input
                    type="text"
                    placeholder="e.g. Italian, Indian, Mexican"
                    value={filterInputs.cuisine}
                    onChange={(e) =>
                      handleFilterChange('cuisine', e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-xl border-2 border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Time Filter */}
                <div>
                  <h3 className="font-medium mb-3 text-muted-foreground">
                    Max Cooking Time (minutes)
                  </h3>
                  <input
                    type="number"
                    placeholder="e.g. 30, 60, 120"
                    min="5"
                    max="240"
                    value={filterInputs.time}
                    onChange={(e) => handleFilterChange('time', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border-2 border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Calories Filter */}
                <div>
                  <h3 className="font-medium mb-3 text-muted-foreground">
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
                    className="w-full px-4 py-2 rounded-xl border-2 border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Ingredients Filter */}
                <div className="md:col-span-2">
                  <h3 className="font-medium mb-3 text-muted-foreground">
                    Ingredients
                  </h3>
                  <input
                    type="text"
                    placeholder="e.g. chicken, tomato, basil"
                    value={filterInputs.ingredients}
                    onChange={(e) =>
                      handleFilterChange('ingredients', e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-xl border-2 border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  className="px-6 py-2 rounded-xl font-medium bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Reset All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={applyFilters}
                  className="px-6 py-2 rounded-xl font-medium text-primary-foreground bg-gradient-to-r from-primary to-secondary"
                >
                  Apply Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Found {filteredRecipes.length} recipe
            {filteredRecipes.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all border"
              >
                <div className="h-48 flex items-center justify-center bg-primary/10">
                  <ChefHat size={64} className="text-primary" />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">
                    {recipe.name}
                  </h3>

                  <div className="flex items-center space-x-4 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
                      {recipe.diet}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                      {recipe.cuisine}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-muted-foreground">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{recipe.time} min</span>
                    </div>
                    <div className="flex items-center">
                      <span>🔥 {recipe.nutrition.calories} cal</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-muted-foreground">
                      Key Ingredients:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.slice(0, 4).map((ingredient) => (
                        <span
                          key={ingredient.name}
                          className="text-sm px-2 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {ingredient.name}
                        </span>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <span className="text-sm px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          +{recipe.ingredients.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewRecipe(recipe)}
                    className="w-full py-3 rounded-xl font-medium text-primary-foreground bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
                  >
                    View Recipe & Nutrition
                    <ArrowRight size={18} className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ChefHat size={64} className="mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-medium mb-2 text-muted-foreground">
              No recipes found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default RecipeSearch