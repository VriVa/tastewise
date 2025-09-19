// theme.js
export const theme = {
  colors: {
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      500: '#f97316',
      600: '#ea580c',
    },
    secondary: {
      500: '#ef4444',
    },
    gray: {
      100: '#f3f4f6',
      200: '#e5e7eb',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      900: '#111827',
    },
    white: '#ffffff',
  },
  gradients: {
    primary: 'from-orange-500 to-red-500',
    background: 'from-orange-50 via-white to-orange-50',
  },
  animations: {
    floating: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  icons: {
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
  },
}

// Import all icons from lucide-react
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
