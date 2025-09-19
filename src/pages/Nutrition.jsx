import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChefHat,
  Clock,
  Star,
  Heart,
  ArrowLeft,
  Zap,
  BarChart3,
  Calculator,
  Sparkles,
  Flame,
  Carrot,
  Beef,
  Wheat,
  Apple,
  Calendar,
} from 'lucide-react'
import { theme } from '../lib/theme.js'
import recipesData from '../lib/data.json'

const NutritionalAnalysis = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Select a random recipe on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * recipesData.length)
    setSelectedRecipe(recipesData[randomIndex])
  }, [])

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

  if (!selectedRecipe) {
    return <div>Loading...</div>
  }

  const { name, diet, cuisine, time, ingredients, nutrition } = selectedRecipe

  // Calculate percentage of daily values (based on 2000 calorie diet)
  const dailyValues = {
    calories: 2000,
    protein: 50, // grams
    carbs: 300, // grams
    fat: 65, // grams
  }

  const caloriePercentage = Math.round(
    (nutrition.calories / dailyValues.calories) * 100
  )
  const proteinPercentage = Math.round(
    (nutrition.protein / dailyValues.protein) * 100
  )
  const carbsPercentage = Math.round(
    (nutrition.carbs / dailyValues.carbs) * 100
  )
  const fatPercentage = Math.round((nutrition.fat / dailyValues.fat) * 100)

  // Generate random vitamin and mineral data for demonstration
  const vitaminsMinerals = [
    { name: 'Vitamin A', value: '15%', icon: Carrot },
    { name: 'Vitamin C', value: '35%', icon: Apple },
    { name: 'Calcium', value: '20%', icon: Sparkles },
    { name: 'Iron', value: '25%', icon: Zap },
  ]

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(to bottom right, ${theme.colors.primary[50]}, white, ${theme.colors.primary[50]})`,
      }}
    >
      <div className="max-w-4xl mx-auto">
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
            <BarChart3 className="h-8 w-8 text-white" />
          </motion.div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: theme.colors.gray[900] }}
          >
            Nutritional Analysis
          </h1>
          <p className="text-lg" style={{ color: theme.colors.gray[600] }}>
            Detailed breakdown of calories, macronutrients, vitamins, and
            minerals
          </p>
        </motion.div>

        {/* Recipe Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
          style={{ border: `1px solid ${theme.colors.gray[200]}` }}
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <motion.h2
                  className="text-3xl font-bold mb-2"
                  style={{ color: theme.colors.gray[900] }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {name}
                </motion.h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <motion.span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: theme.colors.primary[100],
                      color: theme.colors.primary[600],
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {diet}
                  </motion.span>
                  <motion.span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: theme.colors.gray[100],
                      color: theme.colors.gray[700],
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {cuisine}
                  </motion.span>
                </div>
              </div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div
                  className="flex items-center"
                  style={{ color: theme.colors.gray[600] }}
                >
                  <Clock size={20} className="mr-1" />
                  <span>{time} min</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl font-medium text-white"
                  style={{
                    background: `linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]})`,
                  }}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </motion.button>
              </motion.div>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Ingredients:
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {ingredients.map((ingredient, index) => (
                      <motion.span
                        key={ingredient}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: theme.colors.gray[100],
                          color: theme.colors.gray[700],
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {ingredient}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Nutrition Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Calories Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-6 shadow-lg"
            style={{ border: `1px solid ${theme.colors.gray[200]}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-xl font-semibold"
                style={{ color: theme.colors.gray[900] }}
              >
                Calories
              </h3>
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame size={24} style={{ color: theme.colors.primary[500] }} />
              </motion.div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                className="text-5xl font-bold mb-2"
                style={{ color: theme.colors.primary[600] }}
              >
                {nutrition.calories}
              </motion.div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <motion.div
                  className="h-4 rounded-full"
                  style={{
                    backgroundColor: theme.colors.primary[500],
                    width: `${caloriePercentage}%`,
                    maxWidth: '100%',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${caloriePercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="mt-2" style={{ color: theme.colors.gray[600] }}>
                {caloriePercentage}% of daily value
              </p>
            </div>
          </motion.div>

          {/* Macronutrients Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-6 shadow-lg"
            style={{ border: `1px solid ${theme.colors.gray[200]}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-xl font-semibold"
                style={{ color: theme.colors.gray[900] }}
              >
                Macronutrients
              </h3>
              <motion.div
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Calculator
                  size={24}
                  style={{ color: theme.colors.primary[500] }}
                />
              </motion.div>
            </div>

            <div className="space-y-4">
              {/* Protein */}
              <div>
                <div className="flex justify-between mb-1">
                  <span
                    className="font-medium"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Protein
                  </span>
                  <span style={{ color: theme.colors.gray[600] }}>
                    {nutrition.protein}g ({proteinPercentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: theme.colors.secondary[500],
                      width: `${Math.min(proteinPercentage, 100)}%`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(proteinPercentage, 100)}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>

              {/* Carbs */}
              <div>
                <div className="flex justify-between mb-1">
                  <span
                    className="font-medium"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Carbs
                  </span>
                  <span style={{ color: theme.colors.gray[600] }}>
                    {nutrition.carbs}g ({carbsPercentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: theme.colors.primary[500],
                      width: `${Math.min(carbsPercentage, 100)}%`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(carbsPercentage, 100)}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>

              {/* Fat */}
              <div>
                <div className="flex justify-between mb-1">
                  <span
                    className="font-medium"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Fat
                  </span>
                  <span style={{ color: theme.colors.gray[600] }}>
                    {nutrition.fat}g ({fatPercentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: theme.colors.primary[400],
                      width: `${Math.min(fatPercentage, 100)}%`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(fatPercentage, 100)}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Vitamins & Minerals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-8"
          style={{ border: `1px solid ${theme.colors.gray[200]}` }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ color: theme.colors.gray[900] }}
            >
              Vitamins & Minerals
            </h2>
            <Sparkles size={24} style={{ color: theme.colors.primary[500] }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vitaminsMinerals.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={item.name}
                  className="text-center p-4 rounded-xl"
                  style={{ backgroundColor: theme.colors.primary[50] }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index + 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: theme.colors.primary[100],
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    <IconComponent
                      size={32}
                      style={{ color: theme.colors.primary[500] }}
                      className="mx-auto mb-2"
                    />
                  </motion.div>
                  <h4
                    className="font-semibold"
                    style={{ color: theme.colors.gray[800] }}
                  >
                    {item.name}
                  </h4>
                  <p
                    className="text-lg font-bold"
                    style={{ color: theme.colors.primary[600] }}
                  >
                    {item.value}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Health Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
          style={{ border: `1px solid ${theme.colors.gray[200]}` }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: theme.colors.gray[900] }}
          >
            Health Benefits
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              'Supports muscle growth and repair',
              'Provides sustained energy release',
              'Promotes heart health',
              'Rich in essential vitamins and minerals',
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-3 p-3 rounded-xl"
                style={{ backgroundColor: theme.colors.primary[50] }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: theme.colors.primary[100],
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  <Zap size={20} style={{ color: theme.colors.primary[500] }} />
                </motion.div>
                <p style={{ color: theme.colors.gray[700] }}>{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NutritionalAnalysis
