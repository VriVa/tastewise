import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChefHat,
  Sparkles,
  Heart,
  Clock,
  Star,
  Zap,
  TrendingUp,
  ArrowRight,
  Filter,
  Brain,
  Target,
  Calendar,
  Utensils,
} from 'lucide-react'
import { theme } from '../../lib/theme.js'
import recipesData from '../../lib/data.json'

const AISuggestions = () => {
  const [userPreferences, setUserPreferences] = useState(null)
  const [suggestedRecipes, setSuggestedRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Function to save preferences to localStorage
  const savePreferencesToLocalStorage = (preferences) => {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(preferences))
    } catch (e) {
      console.error('Error saving to localStorage:', e)
    }
  }

  // Load user preferences from localStorage
  useEffect(() => {
    const loadPreferences = () => {
      const preferences = localStorage.getItem('userPreferences')
      if (preferences) {
        setUserPreferences(JSON.parse(preferences))
      } else {
        // Default preferences if none exist
        const defaultPreferences = {
          diet: 'non-vegetarian',
          preferredCuisines: ['Indian'],
          maxCookingTime: 65,
          maxCalories: 1000,
          favoriteIngredients: ['chicken', 'rice', 'tomato'],
          dislikedIngredients: [],
          healthGoals: ['weight maintenance', 'balanced nutrition'],
          skillLevel: 'intermediate',
        }
        setUserPreferences(defaultPreferences)
        savePreferencesToLocalStorage(defaultPreferences)
      }
    }

    loadPreferences()
  }, [])

  // Generate AI suggestions based on preferences
  useEffect(() => {
    if (userPreferences) {
      generateSuggestions()
    }
  }, [userPreferences])

  const generateSuggestions = () => {
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      // Filter recipes based on user preferences
      const filteredRecipes = recipesData.filter((recipe) => {
        // Diet filter
        if (userPreferences.diet && recipe.diet !== userPreferences.diet) {
          return false
        }

        // Cuisine filter
        if (
          userPreferences.preferredCuisines &&
          userPreferences.preferredCuisines.length > 0 &&
          !userPreferences.preferredCuisines.includes(recipe.cuisine)
        ) {
          return false
        }

        // Time filter
        if (
          userPreferences.maxCookingTime &&
          recipe.time > userPreferences.maxCookingTime
        ) {
          return false
        }

        // Calories filter
        if (
          userPreferences.maxCalories &&
          recipe.nutrition.calories > userPreferences.maxCalories
        ) {
          return false
        }

        // Favorite ingredients (at least one match)
        if (
          userPreferences.favoriteIngredients &&
          userPreferences.favoriteIngredients.length > 0
        ) {
          const hasFavoriteIngredient = recipe.ingredients.some((ingredient) =>
            userPreferences.favoriteIngredients.includes(ingredient.name)
          )
          if (!hasFavoriteIngredient) return false
        }

        // Disliked ingredients (no matches)
        if (
          userPreferences.dislikedIngredients &&
          userPreferences.dislikedIngredients.length > 0
        ) {
          const hasDislikedIngredient = recipe.ingredients.some((ingredient) =>
            userPreferences.dislikedIngredients.includes(ingredient.name)
          )
          if (hasDislikedIngredient) return false
        }

        return true
      })

      // Sort by relevance (simple algorithm)
      const sortedRecipes = filteredRecipes.sort((a, b) => {
        // Prioritize recipes with more favorite ingredients
        const aFavoriteCount = a.ingredients.filter((ingredient) =>
          userPreferences.favoriteIngredients.includes(ingredient.name)
        ).length

        const bFavoriteCount = b.ingredients.filter((ingredient) =>
          userPreferences.favoriteIngredients.includes(ingredient.name)
        ).length

        return bFavoriteCount - aFavoriteCount
      })

      // Take top 6 suggestions
      setSuggestedRecipes(sortedRecipes.slice(0, 6))
      setIsLoading(false)
    }, 1500) // Simulate AI processing time
  }

  // Handle saving preferences
  const handleSavePreferences = () => {
    savePreferencesToLocalStorage(userPreferences)
    alert('Preferences saved successfully!')
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        delay: 0.2,
      },
    },
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom right, ${theme.colors.primary[50]}, white, ${theme.colors.primary[50]})`,
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
            scale: { duration: 0.5, repeat: Infinity },
          }}
          className="text-center"
        >
          <Sparkles size={48} style={{ color: theme.colors.primary[500] }} />
          <p className="mt-4 text-lg" style={{ color: theme.colors.gray[600] }}>
            AI is generating personalized recommendations...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(to bottom right, ${theme.colors.primary[50]}, white, ${theme.colors.primary[50]})`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              background: `linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]})`,
            }}
          >
            <Brain className="h-8 w-8 text-white" />
          </motion.div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: theme.colors.gray[900] }}
          >
            AI-Powered Recommendations
          </h1>
          <p className="text-lg" style={{ color: theme.colors.gray[600] }}>
            Personalized recipes based on your preferences
          </p>
        </motion.div>

        {/* User Preferences Summary */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl p-6 shadow-lg mb-8"
          style={{ border: `1px solid ${theme.colors.gray[200]}` }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ color: theme.colors.gray[900] }}
            >
              Your Preferences
            </h2>
            <Filter size={24} style={{ color: theme.colors.primary[500] }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userPreferences && (
              <>
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: theme.colors.primary[50] }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: theme.colors.primary[600] }}
                  >
                    Diet
                  </p>
                  <p
                    className="font-semibold"
                    style={{ color: theme.colors.gray[800] }}
                  >
                    {userPreferences.diet}
                  </p>
                </div>

                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: theme.colors.primary[50] }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: theme.colors.primary[600] }}
                  >
                    Max Time
                  </p>
                  <p
                    className="font-semibold"
                    style={{ color: theme.colors.gray[800] }}
                  >
                    {userPreferences.maxCookingTime} min
                  </p>
                </div>

                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: theme.colors.primary[50] }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: theme.colors.primary[600] }}
                  >
                    Max Calories
                  </p>
                  <p
                    className="font-semibold"
                    style={{ color: theme.colors.gray[800] }}
                  >
                    {userPreferences.maxCalories}
                  </p>
                </div>

                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: theme.colors.primary[50] }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: theme.colors.primary[600] }}
                  >
                    Cuisines
                  </p>
                  <p
                    className="font-semibold"
                    style={{ color: theme.colors.gray[800] }}
                  >
                    {userPreferences.preferredCuisines.join(', ')}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Save Preferences Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 py-2 px-4 rounded-xl font-medium text-white"
            style={{
              background: `linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]})`,
            }}
            onClick={handleSavePreferences}
          >
            Save Preferences
          </motion.button>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-8"
          style={{ border: `1px solid ${theme.colors.gray[200]}` }}
        >
          <div className="flex items-center mb-4">
            <Sparkles
              size={24}
              style={{ color: theme.colors.primary[500] }}
              className="mr-3"
            />
            <h2
              className="text-xl font-bold"
              style={{ color: theme.colors.gray[900] }}
            >
              AI Insights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl"
              style={{ backgroundColor: theme.colors.primary[50] }}
            >
              <Target
                size={20}
                style={{ color: theme.colors.primary[500] }}
                className="mb-2"
              />
              <h3
                className="font-semibold mb-2"
                style={{ color: theme.colors.gray[800] }}
              >
                Based on your health goals
              </h3>
              <p style={{ color: theme.colors.gray[600] }}>
                We've selected recipes that align with your{' '}
                {userPreferences.healthGoals.join(' and ')} objectives, focusing
                on balanced nutrition and appropriate calorie levels.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl"
              style={{ backgroundColor: theme.colors.primary[50] }}
            >
              <Utensils
                size={20}
                style={{ color: theme.colors.primary[500] }}
                className="mb-2"
              />
              <h3
                className="font-semibold mb-2"
                style={{ color: theme.colors.gray[800] }}
              >
                Perfect for your skill level
              </h3>
              <p style={{ color: theme.colors.gray[600] }}>
                These {userPreferences.skillLevel}-friendly recipes match your
                cooking expertise while incorporating your favorite ingredients
                like{' '}
                {userPreferences.favoriteIngredients.slice(0, 3).join(', ')}.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Recommended Recipes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ color: theme.colors.gray[900] }}
            >
              Recommended For You
            </h2>
            <div
              className="flex items-center"
              style={{ color: theme.colors.primary[500] }}
            >
              <TrendingUp size={20} className="mr-2" />
              <span className="font-medium">Personalized matches</span>
            </div>
          </div>

          {suggestedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  style={{ border: `1px solid ${theme.colors.gray[200]}` }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className="h-40 flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.primary[100] }}
                  >
                    <ChefHat
                      size={48}
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
                        Why we recommend it:
                      </h4>
                      <ul
                        className="text-sm space-y-1"
                        style={{ color: theme.colors.gray[600] }}
                      >
                        <li>
                          • Matches your {userPreferences.diet} diet preference
                        </li>
                        <li>
                          • Fits your {userPreferences.maxCookingTime}min time
                          limit
                        </li>
                        <li>
                          • Under your {userPreferences.maxCalories} calorie
                          goal
                        </li>
                        {userPreferences.favoriteIngredients
                          .slice(0, 2)
                          .map(
                            (ingredient) =>
                              recipe.ingredients.some(
                                (i) => i.name === ingredient
                              ) && (
                                <li key={ingredient}>
                                  • Contains your favorite: {ingredient}
                                </li>
                              )
                          )}
                      </ul>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 rounded-xl font-medium text-white flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]})`,
                      }}
                      onClick={() => {
                        localStorage.setItem(
                          'selectedRecipe',
                          JSON.stringify(recipe)
                        )
                        window.location.href = '/nutrition'
                      }}
                    >
                      View Details
                      <ArrowRight size={16} className="ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-white rounded-3xl shadow-lg"
              style={{ border: `1px solid ${theme.colors.gray[200]}` }}
            >
              <Zap
                size={48}
                style={{ color: theme.colors.gray[300] }}
                className="mx-auto mb-4"
              />
              <h3
                className="text-xl font-medium mb-2"
                style={{ color: theme.colors.gray[700] }}
              >
                No perfect matches found
              </h3>
              <p style={{ color: theme.colors.gray[500] }}>
                Try adjusting your preferences for more recommendations
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Weekly Plan Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
          style={{ border: `1px solid ${theme.colors.gray[200]}` }}
        >
          <div className="flex items-center mb-4">
            <Calendar
              size={24}
              style={{ color: theme.colors.primary[500] }}
              className="mr-3"
            />
            <h2
              className="text-xl font-bold"
              style={{ color: theme.colors.gray[900] }}
            >
              Weekly Plan Suggestion
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3
                className="font-semibold mb-3"
                style={{ color: theme.colors.gray[800] }}
              >
                This week's balanced menu:
              </h3>
              <ul
                className="space-y-2"
                style={{ color: theme.colors.gray[600] }}
              >
                <li>
                  • Monday: {suggestedRecipes[0]?.name || 'Vegetable Stir Fry'}
                </li>
                <li>
                  • Tuesday: {suggestedRecipes[1]?.name || 'Quinoa Salad'}
                </li>
                <li>
                  • Wednesday: {suggestedRecipes[2]?.name || 'Pasta Primavera'}
                </li>
                <li>• Thursday: {suggestedRecipes[3]?.name || 'Bean Soup'}</li>
                <li>• Friday: {suggestedRecipes[4]?.name || 'Fish Tacos'}</li>
              </ul>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: theme.colors.primary[50] }}
            >
              <h3
                className="font-semibold mb-2"
                style={{ color: theme.colors.primary[700] }}
              >
                <Sparkles size={16} className="inline mr-2" />
                Pro Tip
              </h3>
              <p style={{ color: theme.colors.primary[600] }}>
                Meal prep the ingredients on Sunday to save time during the
                week. This plan averages{' '}
                {Math.round(
                  suggestedRecipes.reduce(
                    (acc, recipe) => acc + recipe.nutrition.calories,
                    0
                  ) / suggestedRecipes.length
                )}
                calories per meal.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AISuggestions
