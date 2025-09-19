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

// Original theme.js
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

// shadcn/ui compatible theme classes
export const shadcnTheme = {
  colors: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    muted: 'bg-muted text-muted-foreground hover:bg-muted/80',
  },
  gradients: {
    primary: 'bg-gradient-to-r from-primary to-secondary',
    background: 'bg-gradient-to-br from-orange-50 via-white to-orange-50',
    card: 'bg-gradient-to-r from-primary/10 to-secondary/10',
  },
  animations: theme.animations,
  icons: theme.icons,
}
