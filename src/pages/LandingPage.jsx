import React, { useState} from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChefHat, Search, Zap, BarChart3, Calculator, Star, Clock, Users, ArrowRight, Play, Sparkles, Heart, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Floating animation for background elements
  const floatingAnimation = {
    y: [0, -20, 0],
    x: [0, 10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const stats = [
    { number: "50K+", label: "Recipes", icon: ChefHat },
    { number: "25K+", label: "Happy Cooks", icon: Users },
    { number: "4.9★", label: "User Rating", icon: Star },
    { number: "95%", label: "Success Rate", icon: TrendingUp }
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Recipe Discovery",
      description: "Find perfect recipes with advanced filters for dietary restrictions, cuisine types, and cooking time.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "AI-Powered Suggestions",
      description: "Get personalized recommendations based on your ingredients, preferences, and cooking history.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: BarChart3,
      title: "Nutritional Analysis",
      description: "Detailed breakdown of calories, macronutrients, vitamins, and minerals for every recipe.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Calculator,
      title: "Recipe Scaling",
      description: "Automatically adjust ingredient quantities and cooking times for any number of servings.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const LoginModal = () => (
    <AnimatePresence>
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLogin(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ChefHat className="h-8 w-8 text-white" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900"
              >
                {isSignUp ? 'Join CulinaryAI' : 'Welcome Back!'}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mt-2"
              >
                {isSignUp ? 'Start your culinary journey today' : 'Sign in to continue cooking smart'}
              </motion.p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-lg"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-lg"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  // Simulate login success
                  alert('Login successful! Welcome to CulinaryAI!');
                  setShowLogin(false);
                }}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </motion.button>
            </motion.form>

            <div className="text-center mt-6">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <motion.button
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue with Google</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-10"
          animate={floatingAnimation}
        >
          🍳
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-20 text-4xl opacity-10"
          animate={{...floatingAnimation, transition: {...floatingAnimation.transition, delay: 1}}}
        >
          🥘
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 text-5xl opacity-10"
          animate={{...floatingAnimation, transition: {...floatingAnimation.transition, delay: 2}}}
        >
          🍕
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/3 text-3xl opacity-10"
          animate={{...floatingAnimation, transition: {...floatingAnimation.transition, delay: 3}}}
        >
          🥗
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 px-4 py-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CulinaryAI</h1>
              <p className="text-sm text-orange-600 font-medium">Cook Smart, Eat Better</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => { setIsSignUp(false); setShowLogin(true); }}
              className="px-6 py-3 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
            <motion.button
              onClick={() => { setIsSignUp(true); setShowLogin(true); }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="font-medium">AI-Powered Recipe Discovery</span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Cook
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 relative"
                animate={{
                  textShadow: [
                    "0 0 0px #ea580c",
                    "0 0 20px #ea580c",
                    "0 0 0px #ea580c"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Smart
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Eat Better
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Transform your culinary journey with AI-powered recipe discovery, intelligent meal planning, 
              and personalized nutrition analysis. From inspiration to plate.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                onClick={() => { setIsSignUp(true); setShowLogin(true); }}
                className="px-12 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all flex items-center space-x-3"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Cooking Smart</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>

              <motion.button
                className="px-12 py-5 bg-white text-gray-700 text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-3 border-2 border-gray-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-6 w-6" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="bg-gradient-to-r from-orange-100 to-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Choose
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"> CulinaryAI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of cooking with our intelligent platform designed for modern home chefs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                <motion.div
                  className="mt-6"
                  whileHover={{ x: 10 }}
                >
                  <span className="text-orange-600 font-semibold flex items-center cursor-pointer">
                    Learn more <ArrowRight className="h-4 w-4 ml-2" />
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Cook Smart?
            </h2>
            <p className="text-xl text-orange-100 mb-12 leading-relaxed">
              Join thousands of home chefs who've transformed their cooking experience with CulinaryAI
            </p>
            
            <motion.button
              onClick={() => { setIsSignUp(true); setShowLogin(true); }}
              className="px-12 py-5 bg-white text-orange-600 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Culinary Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">CulinaryAI</span>
          </div>
          <p className="text-gray-400 mb-8">
            Transforming home cooking with artificial intelligence
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a href="#" className="hover:text-orange-400 transition-colors">About</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Features</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Pricing</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              © 2024 CulinaryAI. All rights reserved. Made with ❤️ for passionate home cooks.
            </p>
          </div>
        </div>
      </footer>

      <LoginModal />
    </div>
  );
};

export default LandingPage;