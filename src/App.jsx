import React from 'react'
import SplineTest from './SplineTest';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Import your components
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'

// Dashboard Components
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardHome from './pages/DashboardHome'
import RecipeSearch from './pages/dashboard/RecipeSearch'
import AISuggestions from './pages/dashboard/AISuggestions'
import RecentRecipes from './pages/dashboard/RecentRecipes'
import SavedRecipes from './pages/dashboard/SavedRecipes'
import MealPlan from './pages/MealPlan'
import DailyPlanner from './pages/dashboard/DailyPlanner'
import GroceryList from './pages/dashboard/GroceryList'
import NutritionOverview from './pages/dashboard/NutritionOverview'
import RecipeScaling from './pages/dashboard/RecipeScaling'
import CookingHistory from './pages/dashboard/CookingHistory'
import Preferences from './pages/dashboard/Preferences'


// import Dashboard from './components/Dashboard'
// import SearchPage from './components/SearchPage'
// import AIAssistantPage from './components/AIAssistantPage'
// import NutritionPage from './components/NutritionPage'
// import CalculatorPage from './components/CalculatorPage'
import './index.css'

// Protected Route Component

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<RecipeSearch />} />
      
          <Route path="/spline-test" element={<SplineTest />} />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 

            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard Overview */}
            <Route index element={<DashboardHome />} />
            
            {/* Recipe Discovery */}
            <Route path="recipe-search" element={<RecipeSearch />} />
            <Route path="ai-suggestions" element={<AISuggestions />} />
            <Route path="recent-recipes" element={<RecentRecipes />} />
            <Route path="saved-recipes" element={<SavedRecipes />} />
            
            {/* Meal Planning */}
            <Route path="meal-plan" element={<MealPlan />} />
            <Route path="daily-planner" element={<DailyPlanner />} />
           
            
            {/* Smart Grocery */}
            <Route path="grocery-list" element={<GroceryList />} />
            
            {/* Analytics */}
            <Route path="nutrition" element={<NutritionOverview />} />
            <Route path="recipe-scaling" element={<RecipeScaling />} />
            <Route path="cooking-history" element={<CookingHistory />} />
            
            {/* Settings */}
            <Route path="preferences" element={<Preferences />} />
          </Route>

          {/* Catch all route */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
