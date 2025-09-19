import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Import your components
import LandingPage from './pages/LandingPage'
import DashboardHome from './pages/DashboardHome'
import RecipeSearch from './pages/SearchPage'
import MealPlan from './pages/MealPlan'
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

          {/* Protected Routes */}
          <Route path="/dashboard" element={<DashboardHome />} />

        <Route path="/mealplan" element={<MealPlan />} />

         


          {/* Catch all route - redirect to dashboard if authenticated, otherwise to landing */}
          {/* <Route
            path="*"
            element={
              <Navigate
                to={localStorage.getItem('user') ? '/dashboard' : '/'}
                replace
              />
            }
          /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
