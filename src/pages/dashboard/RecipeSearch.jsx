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

// Import shadcn components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Import data
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-primary/10">
              <ChefHat className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                CulinaryAI
              </h1>
              <p className="text-sm font-medium text-muted-foreground">
                Advanced Recipe Search
              </p>
            </div>
          </div>

          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? "default" : "outline"}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all"
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search recipes by name, ingredients, cuisine..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-4 text-lg rounded-2xl border-2 focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-8 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Filter Recipes
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFilters(false)}
                className="h-8 w-8 p-0"
              >
                <X size={20} className="text-muted-foreground" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Diet Filter */}
              <div>
                <h3 className="font-medium mb-3 text-muted-foreground">
                  Diet Type
                </h3>
                <Input
                  type="text"
                  placeholder="e.g. vegetarian, vegan, gluten-free"
                  value={filterInputs.diet}
                  onChange={(e) => handleFilterChange('diet', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl"
                />
              </div>

              {/* Cuisine Filter */}
              <div>
                <h3 className="font-medium mb-3 text-muted-foreground">
                  Cuisine Type
                </h3>
                <Input
                  type="text"
                  placeholder="e.g. Italian, Indian, Mexican"
                  value={filterInputs.cuisine}
                  onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl"
                />
              </div>

              {/* Time Filter */}
              <div>
                <h3 className="font-medium mb-3 text-muted-foreground">
                  Max Cooking Time (minutes)
                </h3>
                <Input
                  type="number"
                  placeholder="e.g. 30, 60, 120"
                  min="5"
                  max="240"
                  value={filterInputs.time}
                  onChange={(e) => handleFilterChange('time', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl"
                />
              </div>

              {/* Calories Filter */}
              <div>
                <h3 className="font-medium mb-3 text-muted-foreground">
                  Max Calories
                </h3>
                <Input
                  type="number"
                  placeholder="e.g. 300, 500, 800"
                  min="100"
                  max="1000"
                  value={filterInputs.maxCalories}
                  onChange={(e) => handleFilterChange('maxCalories', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl"
                />
              </div>

              {/* Ingredients Filter */}
              <div className="md:col-span-2">
                <h3 className="font-medium mb-3 text-muted-foreground">
                  Ingredients
                </h3>
                <Input
                  type="text"
                  placeholder="e.g. chicken, tomato, basil"
                  value={filterInputs.ingredients}
                  onChange={(e) => handleFilterChange('ingredients', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl"
                />
                <p className="text-sm mt-1 text-muted-foreground">
                  Search for recipes containing specific ingredients
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                onClick={resetFilters}
                variant="outline"
                className="px-6 py-2 rounded-xl font-medium"
              >
                Reset All
              </Button>
              <Button
                onClick={applyFilters}
                className="px-6 py-2 rounded-xl font-medium"
              >
                Apply Filters
              </Button>
            </div>
          </Card>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found {filteredRecipes.length} recipe
            {filteredRecipes.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <Card
                key={`${recipe.name}-${index}`}
                className="overflow-hidden transition-all rounded-2xl"
              >
                <div className="h-48 flex items-center justify-center bg-primary/10">
                  <ChefHat
                    size={64}
                    className="text-primary"
                  />
                </div>

                <CardContent className="p-5">
                  <CardTitle className="text-xl font-bold mb-2">
                    {recipe.name}
                  </CardTitle>

                  <div className="flex items-center space-x-4 mb-3">
                    <Badge className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
                      {recipe.diet}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 rounded-full text-sm font-medium">
                      {recipe.cuisine}
                    </Badge>
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
                      Ingredients:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.slice(0, 4).map((ingredient, ingredientIndex) => (
                        <Badge
                          key={`${recipe.name}-${index}-ingredient-${ingredientIndex}`}
                          variant="outline"
                          className="text-sm px-2 py-1 rounded-full"
                        >
                          {ingredient.name}
                        </Badge>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <Badge variant="outline" className="text-sm px-2 py-1 rounded-full">
                          +{recipe.ingredients.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button className="w-full py-3 rounded-xl font-medium">
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent className="pt-6">
              <ChefHat
                size={64}
                className="mx-auto mb-4 text-muted-foreground"
              />
              <h3 className="text-xl font-medium mb-2 text-muted-foreground">
                No recipes found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default RecipeSearch