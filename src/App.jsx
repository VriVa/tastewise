import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SearchPage from './components/SearchPage';
import AIAssistantPage from './components/AIAssistantPage';
import NutritionPage from './components/NutritionPage';
import CalculatorPage from './components/CalculatorPage';
import './index.css';

// Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Check if user is logged in on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/search" element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-assistant" element={
              <ProtectedRoute>
                <AIAssistantPage />
              </ProtectedRoute>
            } />
            
            <Route path="/nutrition" element={
              <ProtectedRoute>
                <NutritionPage />
              </ProtectedRoute>
            } />
            
            <Route path="/calculator" element={
              <ProtectedRoute>
                <CalculatorPage />
              </ProtectedRoute>
            } />
            
            {/* Catch all route - redirect to dashboard if authenticated, otherwise to landing */}
            <Route path="*" element={
              <Navigate to={localStorage.getItem('user') ? "/dashboard" : "/"} replace />
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;