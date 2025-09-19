import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Import your components
import LandingPage from './pages/LandingPage'
import ShadcnTest from './components/ShadcnTest'
import ThemedShadcnTest from './components/ThemedShadcnTest'
import RecipeSearch from './pages/SearchPage'
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
          <Route path="/test-shadcn" element={<ShadcnTest />} />
          <Route path="/themed-test" element={<ThemedShadcnTest />} />
          <Route path="/search" element={<RecipeSearch />} />

          {/* Protected Routes */}
          {/* <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/search" element={<SearchPage />} />

          <Route path="/ai-assistant" element={<AIAssistantPage />} />

          <Route path="/nutrition" element={<NutritionPage />} />

          <Route path="/calculator" element={<CalculatorPage />} /> */}

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
