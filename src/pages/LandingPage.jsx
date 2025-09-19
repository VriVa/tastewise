import React from 'react'
import { Link } from 'react-router-dom'

// src/components/LandingPage.jsx
import  { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import {
  ChefHat,
  Search,
  Zap,
  BarChart3,
  Calculator,
  Star,
  Clock,
  Users,
  ArrowRight,
  Play,
  Sparkles,
  Heart,
  TrendingUp,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/** ErrorBoundary to avoid full app crash when Spline runtime throws */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('Spline ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          <div className="text-center p-4 bg-white/60 rounded-lg">
            <div className="text-sm text-red-500 mb-2">3D preview failed to load</div>
            <div className="text-xs text-gray-500">Try re-publishing the Spline scene or check console/network.</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/** Custom Spline component that prevents watermark */
const CustomSpline = ({ scene, className, style, onLoad, rotation }) => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  
  // Function to remove Spline watermark
  const removeWatermark = () => {
    // Remove any elements with "Spline" in class name (watermark)
    const splineElements = document.querySelectorAll('[class*="spline"]');
    splineElements.forEach(el => {
      if (el.innerText && el.innerText.includes('Spline')) {
        el.style.display = 'none';
      }
    });
    
    // Alternative approach: look for the watermark by its content
    setTimeout(() => {
      const watermarks = document.querySelectorAll('div');
      watermarks.forEach(div => {
        if (div.textContent && div.textContent.includes('Made with Spline')) {
          div.style.display = 'none';
        }
      });
    }, 1000);
  };

  const handleLoad = (spline) => {
    setSplineLoaded(true);
    removeWatermark();
    if (onLoad) onLoad(spline);
    
    // Continue checking for watermark in case it appears later
    const checkInterval = setInterval(removeWatermark, 2000);
    setTimeout(() => clearInterval(checkInterval), 10000);
  };

  return (
    <motion.div 
      className={className} 
      style={style}
      animate={rotation}
      transition={{ duration: 0.5 }}
    >
      <Spline 
        scene={scene} 
        onLoad={handleLoad}
        style={{ background: 'transparent', width: '100%', height: '100%' }} 
      />
      {!splineLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100/30 to-transparent">
          <div className="text-sm text-gray-500">Loading 3D model...</div>
        </div>
      )}
    </motion.div>
  );
};

/** SplineGuard ensures we only attempt to mount Spline when the file is available */
const SplineGuard = ({ scene, className, style, onLoad, rotation }) => {
  if (!scene) {
    return (
      <div className={className + ' bg-gradient-to-br from-orange-100/30 to-transparent flex items-center justify-center rounded-2xl overflow-hidden'} style={style}>
        <div className="text-sm text-gray-500">3D model will appear here when scene is available</div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <CustomSpline
        scene={scene}
        className={className}
        style={style}
        onLoad={onLoad}
        rotation={rotation}
      />
    </ErrorBoundary>
  );
};

const LandingPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 50]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y4 = useTransform(scrollY, [0, 1000], [0, 100]);
  const y5 = useTransform(scrollY, [0, 1000], [0, -80]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (event) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    x: [0, 10, 0],
    rotate: [0, 5, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  };

  // Mouse-follow rotation for Spline objects
  const splineRotation = {
    rotateX: useTransform(mouseY, [0, window.innerHeight], [-5, 5]),
    rotateY: useTransform(mouseX, [0, window.innerWidth], [-5, 5]),
  };

  const navigate = useNavigate()

  const stats = [
    { number: '50K+', label: 'Recipes', icon: ChefHat },
    { number: '25K+', label: 'Happy Cooks', icon: Users },
    { number: '4.9★', label: 'User Rating', icon: Star },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
  ];

  const features = [
    { icon: Search, title: 'Smart Recipe Discovery', description: 'Find perfect recipes with advanced filters for dietary restrictions, cuisine types, and cooking time.', color: 'from-orange-500 to-red-500' },
    { icon: Zap, title: 'AI-Powered Suggestions', description: 'Get personalized recommendations based on your ingredients, preferences, and cooking history.', color: 'from-purple-500 to-indigo-500' },
    { icon: BarChart3, title: 'Nutritional Analysis', description: 'Detailed breakdown of calories, macronutrients, vitamins, and minerals for every recipe.', color: 'from-blue-500 to-cyan-500' },
    { icon: Calculator, title: 'Recipe Scaling', description: 'Automatically adjust ingredient quantities and cooking times for any number of servings.', color: 'from-green-500 to-emerald-500' },
  ];

  // Use local spline files - you'll need to place these in your public folder
  const SCENES = {
    burger: '/spline/burger.spline',
    calcifer: '/spline/calcifer.spline',
    ramen: '/spline/tonkotsu (1).spline',
    waffles: '/spline/waffles.spline',
  };

  // Disable right-click on the Spline component to prevent interaction
  useEffect(() => {
    const disableInteractions = (e) => {
      if (e.target.closest('canvas')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableInteractions);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('contextmenu', disableInteractions);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Fixed background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div className="absolute top-20 left-10 text-6xl opacity-10" animate={floatingAnimation}>🍳</motion.div>
        <motion.div className="absolute top-1/3 right-20 text-4xl opacity-10" animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}>🥘</motion.div>
        <motion.div className="absolute bottom-1/4 left-1/4 text-5xl opacity-10" animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}>🍕</motion.div>
        <motion.div className="absolute top-1/2 left-1/3 text-3xl opacity-10" animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 3 } }}>🥗</motion.div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }} 
        className="relative z-20 px-4 py-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
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
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all" 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
            >
              Explore Recipes
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with scattered 3D models */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Centered Title */}
        <div className="relative z-20 text-center mb-12">
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full mb-8" 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="font-medium">AI-Powered Recipe Discovery</span>
          </motion.div>

          <motion.h1 
            className="text-8xl md:text-9xl font-bold text-gray-900 mb-6 leading-tight" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Culinary</span>
            <span className="text-gray-900">AI</span>
          </motion.h1>

          <div className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed h-12">
            <Typewriter
              options={{
                strings: [
                  'Transform your culinary journey with AI-powered recipe discovery',
                  'Discover recipes tailored to your taste and dietary needs',
                  'Cook with confidence using our intelligent kitchen assistant'
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 70,
              }}
            />
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="px-12 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all flex items-center space-x-3" 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Recipes</span>
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
        </div>

        {/* Scattered 3D Models - More organic placement */}
        {/* Burger - Top Left */}
        <motion.div 
          className="absolute top-32 left-5 w-64 h-64 z-10"
          style={{ y: y1 }}
        >
          <SplineGuard
            scene={SCENES.burger}
            className="w-full h-full rounded-2xl overflow-hidden"
            rotation={splineRotation}
          />
          <div className="absolute inset-0 pointer-events-auto" 
               style={{ cursor: 'default' }}
               onClick={(e) => e.preventDefault()}
               onContextMenu={(e) => e.preventDefault()}>
          </div>
        </motion.div>

        {/* Calcifer - Top Right */}
        <motion.div 
          className="absolute top-40 right-8 w-60 h-60 z-10"
          style={{ y: y2 }}
        >
          <SplineGuard
            scene={SCENES.calcifer}
            className="w-full h-full rounded-2xl overflow-hidden"
            rotation={splineRotation}
          />
          <div className="absolute inset-0 pointer-events-auto" 
               style={{ cursor: 'default' }}
               onClick={(e) => e.preventDefault()}
               onContextMenu={(e) => e.preventDefault()}>
          </div>
        </motion.div>

        {/* Ramen - Bottom Left */}
        <motion.div 
          className="absolute bottom-28 left-24 w-72 h-72 z-10"
          style={{ y: y3 }}
        >
          <SplineGuard
            scene={SCENES.ramen}
            className="w-full h-full rounded-2xl overflow-hidden"
            rotation={splineRotation}
          />
          <div className="absolute inset-0 pointer-events-auto" 
               style={{ cursor: 'default' }}
               onClick={(e) => e.preventDefault()}
               onContextMenu={(e) => e.preventDefault()}>
          </div>
        </motion.div>

        {/* Waffles - Bottom Right */}
        <motion.div 
          className="absolute bottom-32 right-20 w-56 h-56 z-10"
          style={{ y: y4 }}
        >
          <SplineGuard
            scene={SCENES.waffles}
            className="w-full h-full rounded-2xl overflow-hidden"
            rotation={splineRotation}
          />
          <div className="absolute inset-0 pointer-events-auto" 
               style={{ cursor: 'default' }}
               onClick={(e) => e.preventDefault()}
               onContextMenu={(e) => e.preventDefault()}>
          </div>
        </motion.div>

        {/* Additional Food Item - Middle */}
        <motion.div 
          className="absolute top-1/2 right-1/3 w-52 h-52 z-10"
          style={{ y: y5 }}
        >
          <SplineGuard
            scene={SCENES.burger}
            className="w-full h-full rounded-2xl overflow-hidden"
            rotation={splineRotation}
          />
          <div className="absolute inset-0 pointer-events-auto" 
               style={{ cursor: 'default' }}
               onClick={(e) => e.preventDefault()}
               onContextMenu={(e) => e.preventDefault()}>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8" 
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
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16" 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"> CulinaryAI</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Experience the future of cooking with our intelligent platform designed for modern home chefs</p>
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

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>

                <motion.div className="mt-6" whileHover={{ x: 10 }}>
                  <span className="text-orange-600 font-semibold flex items-center cursor-pointer">Learn more <ArrowRight className="h-4 w-4 ml-2" /></span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-orange-500 to-red-500 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Ready to Cook Smart?</h2>
            <p className="text-xl text-orange-100 mb-12 leading-relaxed">Explore thousands of recipes and transform your cooking experience with CulinaryAI</p>

            <motion.button 
              className="px-12 py-5 bg-white text-orange-600 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all" 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/dashboard">
                Explore Recipes Now
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl"><ChefHat className="h-6 w-6 text-white" /></div>
            <span className="text-2xl font-bold">CulinaryAI</span>
          </div>
          <p className="text-gray-400 mb-8">Transforming home cooking with artificial intelligence</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a href="#" className="hover:text-orange-400 transition-colors">About</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Features</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Recipes</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-500 text-sm">© 2024 CulinaryAI. All rights reserved. Made with ❤️ for passionate home cooks.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;