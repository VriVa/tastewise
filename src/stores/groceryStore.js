import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGroceryStore = create(
  persist(
    (set, get) => ({
      // Grocery List State
      groceryLists: [
        {
          id: 'current',
          name: 'Current Shopping List',
          items: [
            { id: '1', name: 'Chicken Breast', category: 'Meat & Seafood', quantity: '2 lbs', checked: false, price: 12.99, fromRecipe: 'Butter Chicken' },
            { id: '2', name: 'Basmati Rice', category: 'Pantry', quantity: '1 bag', checked: true, price: 4.99, fromRecipe: 'Butter Chicken' },
            { id: '3', name: 'Heavy Cream', category: 'Dairy', quantity: '1 cup', checked: false, price: 3.49, fromRecipe: 'Butter Chicken' },
            { id: '4', name: 'Tomatoes', category: 'Produce', quantity: '4 large', checked: false, price: 2.99, fromRecipe: null },
            { id: '5', name: 'Garam Masala', category: 'Spices', quantity: '1 jar', checked: false, price: 5.99, fromRecipe: 'Butter Chicken' }
          ],
          createdAt: '2024-12-15',
          totalEstimatedCost: 30.45,
          isActive: true
        }
      ],
      
      activeListId: 'current',
      
      // Categories for organization
      categories: [
        { id: 'produce', name: 'Produce', icon: '🥬', color: 'green' },
        { id: 'meat', name: 'Meat & Seafood', icon: '🥩', color: 'red' },
        { id: 'dairy', name: 'Dairy', icon: '🥛', color: 'blue' },
        { id: 'pantry', name: 'Pantry', icon: '🥫', color: 'orange' },
        { id: 'spices', name: 'Spices', icon: '🧂', color: 'purple' },
        { id: 'frozen', name: 'Frozen', icon: '🧊', color: 'cyan' },
        { id: 'bakery', name: 'Bakery', icon: '🍞', color: 'yellow' },
        { id: 'beverages', name: 'Beverages', icon: '🥤', color: 'indigo' },
        { id: 'snacks', name: 'Snacks', icon: '🍿', color: 'pink' },
        { id: 'household', name: 'Household', icon: '🧴', color: 'gray' }
      ],
      
      // Shopping History & Analytics
      shoppingHistory: [
        {
          id: 'history-1',
          date: '2024-12-10',
          totalCost: 67.84,
          itemCount: 23,
          store: 'Fresh Market',
          wasteTracked: { items: 2, cost: 4.50, percentage: 6.6 }
        },
        {
          id: 'history-2',
          date: '2024-12-03',
          totalCost: 52.31,
          itemCount: 18,
          store: 'SuperMart',
          wasteTracked: { items: 1, cost: 2.99, percentage: 5.7 }
        }
      ],
      
      // Waste Tracking
      wasteLog: [
        { id: '1', item: 'Lettuce', category: 'Produce', date: '2024-12-12', reason: 'spoiled', cost: 2.99 },
        { id: '2', item: 'Bread', category: 'Bakery', date: '2024-12-11', reason: 'expired', cost: 3.49 }
      ],
      
      // Smart Suggestions
      smartSuggestions: [
        { item: 'Olive Oil', reason: 'Used in 3 upcoming recipes', category: 'Pantry' },
        { item: 'Onions', reason: 'Frequently used ingredient', category: 'Produce' },
        { item: 'Garlic', reason: 'Running low based on usage', category: 'Produce' }
      ],
      
      // Actions
      createNewList: (name) => {
        const newList = {
          id: Date.now().toString(),
          name,
          items: [],
          createdAt: new Date().toISOString().split('T')[0],
          totalEstimatedCost: 0,
          isActive: false
        };
        
        set((state) => ({
          groceryLists: [...state.groceryLists, newList]
        }));
        
        return newList.id;
      },
      
      setActiveList: (listId) => {
        set({ activeListId: listId });
      },
      
      deleteList: (listId) => {
        set((state) => ({
          groceryLists: state.groceryLists.filter(list => list.id !== listId),
          activeListId: state.activeListId === listId ? 'current' : state.activeListId
        }));
      },
      
      // Item Management
      addItem: (item, listId = null) => {
        const targetListId = listId || get().activeListId;
        
        const newItem = {
          id: Date.now().toString(),
          name: item.name,
          category: item.category || 'Pantry',
          quantity: item.quantity || '1',
          checked: false,
          price: item.price || 0,
          fromRecipe: item.fromRecipe || null,
          notes: item.notes || ''
        };
        
        set((state) => ({
          groceryLists: state.groceryLists.map(list =>
            list.id === targetListId
              ? {
                  ...list,
                  items: [...list.items, newItem],
                  totalEstimatedCost: list.totalEstimatedCost + newItem.price
                }
              : list
          )
        }));
      },
      
      removeItem: (itemId, listId = null) => {
        const targetListId = listId || get().activeListId;
        
        set((state) => ({
          groceryLists: state.groceryLists.map(list =>
            list.id === targetListId
              ? {
                  ...list,
                  items: list.items.filter(item => item.id !== itemId),
                  totalEstimatedCost: list.totalEstimatedCost - (list.items.find(item => item.id === itemId)?.price || 0)
                }
              : list
          )
        }));
      },
      
      updateItem: (itemId, updates, listId = null) => {
        const targetListId = listId || get().activeListId;
        
        set((state) => ({
          groceryLists: state.groceryLists.map(list =>
            list.id === targetListId
              ? {
                  ...list,
                  items: list.items.map(item =>
                    item.id === itemId ? { ...item, ...updates } : item
                  )
                }
              : list
          )
        }));
      },
      
      toggleItemChecked: (itemId, listId = null) => {
        const targetListId = listId || get().activeListId;
        
        set((state) => ({
          groceryLists: state.groceryLists.map(list =>
            list.id === targetListId
              ? {
                  ...list,
                  items: list.items.map(item =>
                    item.id === itemId ? { ...item, checked: !item.checked } : item
                  )
                }
              : list
          )
        }));
      },
      
      clearCheckedItems: (listId = null) => {
        const targetListId = listId || get().activeListId;
        
        set((state) => ({
          groceryLists: state.groceryLists.map(list =>
            list.id === targetListId
              ? {
                  ...list,
                  items: list.items.filter(item => !item.checked),
                  totalEstimatedCost: list.items
                    .filter(item => !item.checked)
                    .reduce((total, item) => total + item.price, 0)
                }
              : list
          )
        }));
      },
      
      // Generate from Meal Plan
      generateFromMealPlan: (mealPlan) => {
        // Extract ingredients from meal plan and add to grocery list
        const ingredients = new Map();
        
        Object.values(mealPlan).forEach(dayPlan => {
          ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            const meal = dayPlan[mealType];
            if (meal && meal.ingredients) {
              meal.ingredients.forEach(ingredient => {
                if (ingredients.has(ingredient)) {
                  ingredients.set(ingredient, ingredients.get(ingredient) + 1);
                } else {
                  ingredients.set(ingredient, 1);
                }
              });
            }
          });
        });
        
        // Convert to grocery items
        const newItems = Array.from(ingredients.entries()).map(([ingredient, count]) => ({
          name: ingredient,
          category: get().categorizeIngredient(ingredient),
          quantity: count > 1 ? `${count} units` : '1 unit',
          checked: false,
          price: 0,
          fromRecipe: 'Meal Plan'
        }));
        
        newItems.forEach(item => get().addItem(item));
      },
      
      // Waste Tracking
      addToWasteLog: (wasteItem) => {
        const newWasteItem = {
          id: Date.now().toString(),
          ...wasteItem,
          date: new Date().toISOString().split('T')[0]
        };
        
        set((state) => ({
          wasteLog: [...state.wasteLog, newWasteItem]
        }));
      },
      
      // Utility Functions
      getActiveList: () => {
        const { groceryLists, activeListId } = get();
        return groceryLists.find(list => list.id === activeListId);
      },
      
      getItemsByCategory: (listId = null) => {
        const targetListId = listId || get().activeListId;
        const list = get().groceryLists.find(l => l.id === targetListId);
        
        if (!list) return {};
        
        return list.items.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {});
      },
      
      getTotalCost: (listId = null) => {
        const targetListId = listId || get().activeListId;
        const list = get().groceryLists.find(l => l.id === targetListId);
        
        return list?.items.reduce((total, item) => total + item.price, 0) || 0;
      },
      
      getCheckedItemsCost: (listId = null) => {
        const targetListId = listId || get().activeListId;
        const list = get().groceryLists.find(l => l.id === targetListId);
        
        return list?.items
          .filter(item => item.checked)
          .reduce((total, item) => total + item.price, 0) || 0;
      },
      
      getWasteStats: (days = 30) => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        const recentWaste = get().wasteLog.filter(waste => 
          new Date(waste.date) >= cutoffDate
        );
        
        return {
          totalItems: recentWaste.length,
          totalCost: recentWaste.reduce((total, waste) => total + waste.cost, 0),
          byCategory: recentWaste.reduce((acc, waste) => {
            acc[waste.category] = (acc[waste.category] || 0) + 1;
            return acc;
          }, {}),
          byReason: recentWaste.reduce((acc, waste) => {
            acc[waste.reason] = (acc[waste.reason] || 0) + 1;
            return acc;
          }, {})
        };
      },
      
      categorizeIngredient: (ingredient) => {
        const ing = ingredient.toLowerCase();
        
        if (['chicken', 'beef', 'pork', 'fish', 'salmon', 'cod', 'shrimp'].some(meat => ing.includes(meat))) {
          return 'Meat & Seafood';
        }
        if (['milk', 'cheese', 'yogurt', 'cream', 'butter', 'mozzarella', 'cheddar', 'feta'].some(dairy => ing.includes(dairy))) {
          return 'Dairy';
        }
        if (['tomato', 'onion', 'garlic', 'cucumber', 'avocado', 'lettuce', 'carrot', 'broccoli'].some(produce => ing.includes(produce))) {
          return 'Produce';
        }
        if (['rice', 'pasta', 'bread', 'flour', 'oil', 'salt', 'pepper', 'sauce'].some(pantry => ing.includes(pantry))) {
          return 'Pantry';
        }
        if (['garam masala', 'curry', 'cumin', 'paprika', 'oregano', 'basil'].some(spice => ing.includes(spice))) {
          return 'Spices';
        }
        
        return 'Pantry'; // Default category
      }
    }),
    {
      name: 'grocery-store',
      partialize: (state) => ({
        groceryLists: state.groceryLists,
        activeListId: state.activeListId,
        shoppingHistory: state.shoppingHistory,
        wasteLog: state.wasteLog
      })
    }
  )
);