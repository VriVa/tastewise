import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Plus,
  Trash2,
  Check,
  Edit3,
  ArrowLeft,
  Download,
  Search,
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Utensils
} from 'lucide-react';

const GroceryList = () => {
  const [groceryList, setGroceryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', category: 'Other' });
  const [showCompleted, setShowCompleted] = useState(true);

  const categories = ['All', 'Produce', 'Protein', 'Dairy', 'Pantry', 'Other'];

  // Meal plan data
  const mealPlan = {
    date: 'Friday, Sep 19',
    meals: [
      {
        type: 'Breakfast',
        name: 'Avocado Toast with Eggs',
        calories: 420,
        time: 15
      },
      {
        type: 'Lunch',
        name: 'Quinoa Salad Bowl',
        calories: 520,
        time: 20
      },
      {
        type: 'Dinner',
        name: 'Salmon with Roasted Vegetables',
        calories: 650,
        time: 30
      }
    ]
  };

  // Initialize grocery list with items for the specific meal plan
  useEffect(() => {
    const defaultList = [
      // Avocado Toast with Eggs
      { name: 'Avocados', checked: false, category: 'Produce', meal: 'Breakfast' },
      { name: 'Whole Grain Bread', checked: false, category: 'Pantry', meal: 'Breakfast' },
      { name: 'Eggs', checked: false, category: 'Protein', meal: 'Breakfast' },
      { name: 'Butter', checked: false, category: 'Dairy', meal: 'Breakfast' },
      { name: 'Salt', checked: false, category: 'Pantry', meal: 'Breakfast' },
      { name: 'Black Pepper', checked: false, category: 'Pantry', meal: 'Breakfast' },

      // Quinoa Salad Bowl
      { name: 'Quinoa', checked: false, category: 'Pantry', meal: 'Lunch' },
      { name: 'Cucumber', checked: false, category: 'Produce', meal: 'Lunch' },
      { name: 'Cherry Tomatoes', checked: false, category: 'Produce', meal: 'Lunch' },
      { name: 'Red Onion', checked: false, category: 'Produce', meal: 'Lunch' },
      { name: 'Bell Peppers', checked: false, category: 'Produce', meal: 'Lunch' },
      { name: 'Feta Cheese', checked: false, category: 'Dairy', meal: 'Lunch' },
      { name: 'Olive Oil', checked: false, category: 'Pantry', meal: 'Lunch' },
      { name: 'Lemon', checked: false, category: 'Produce', meal: 'Lunch' },
      { name: 'Fresh Herbs (Parsley)', checked: false, category: 'Produce', meal: 'Lunch' },

      // Salmon with Roasted Vegetables
      { name: 'Salmon Fillets', checked: false, category: 'Protein', meal: 'Dinner' },
      { name: 'Broccoli', checked: false, category: 'Produce', meal: 'Dinner' },
      { name: 'Carrots', checked: false, category: 'Produce', meal: 'Dinner' },
      { name: 'Zucchini', checked: false, category: 'Produce', meal: 'Dinner' },
      { name: 'Brussels Sprouts', checked: false, category: 'Produce', meal: 'Dinner' },
      { name: 'Garlic', checked: false, category: 'Produce', meal: 'Dinner' },
      { name: 'Olive Oil', checked: false, category: 'Pantry', meal: 'Dinner' },
      { name: 'Rosemary', checked: false, category: 'Produce', meal: 'Dinner' },
      { name: 'Thyme', checked: false, category: 'Produce', meal: 'Dinner' }
    ];
    setGroceryList(defaultList);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = groceryList;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (!showCompleted) {
      filtered = filtered.filter(item => !item.checked);
    }

    setFilteredList(filtered);
  }, [groceryList, selectedCategory, searchTerm, showCompleted]);

  // Toggle item checked status
  const toggleItem = (index) => {
    const actualIndex = groceryList.findIndex(item =>
      item.name === filteredList[index].name
    );
    setGroceryList(prev =>
      prev.map((item, i) =>
        i === actualIndex ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Add new item
  const addItem = () => {
    if (newItem.name.trim()) {
      setGroceryList(prev => [...prev, { 
        ...newItem, 
        name: newItem.name.trim(),
        checked: false 
      }]);
      setNewItem({ name: '', category: 'Other' });
      setIsAddingItem(false);
    }
  };

  // Delete item
  const deleteItem = (index) => {
    const itemToDelete = filteredList[index];
    setGroceryList(prev => prev.filter(item => item.name !== itemToDelete.name));
  };

  // Edit item
  const editItem = (index, newName, newCategory) => {
    const itemToEdit = filteredList[index];
    const actualIndex = groceryList.findIndex(item => item.name === itemToEdit.name);
    setGroceryList(prev =>
      prev.map((item, i) =>
        i === actualIndex ? { ...item, name: newName.trim(), category: newCategory } : item
      )
    );
    setEditingItem(null);
  };

  // Clear completed items
  const clearCompleted = () => {
    setGroceryList(prev => prev.filter(item => !item.checked));
  };

  // Stats
  const totalItems = groceryList.length;
  const completedItems = groceryList.filter(item => item.checked).length;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  // Group by category
  const groupedItems = categories.reduce((acc, category) => {
    if (category === 'All') return acc;
    const categoryItems = filteredList.filter(item => item.category === category);
    if (categoryItems.length > 0) acc[category] = categoryItems;
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Meal Plan Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6" />
            <h2 className="text-2xl font-bold">{mealPlan.date}</h2>
          </div>
          <div className="text-right">
            <p className="text-orange-100">Today's Meals</p>
            <p className="text-sm text-orange-100">
              {mealPlan.meals.reduce((total, meal) => total + meal.calories, 0)} total calories
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mealPlan.meals.map((meal, index) => (
            <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Utensils className="h-4 w-4" />
                <h3 className="font-semibold">{meal.type}</h3>
              </div>
              <p className="text-sm mb-2">{meal.name}</p>
              <div className="flex items-center justify-between text-xs text-orange-100">
                <span>{meal.calories} cal</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{meal.time} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <button 
            onClick={() => window.location.href = '/meal-planner'}
            className="mr-4 p-2 text-gray-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grocery List</h1>
            <p className="text-gray-600 mt-1">
              {completedItems} of {totalItems} items completed
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsAddingItem(true)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg flex items-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Item</span>
          </button>
          
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">Shopping Progress</h3>
          <span className="text-sm text-gray-500">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
         <motion.div 
  className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
  initial={{ width: 0 }}
  animate={{ width: `${progressPercentage}%` }}
  transition={{ duration: 0.5 }}
/>

        </div>
        {completedItems > 0 && (
          <button 
            onClick={clearCompleted}
            className="mt-3 text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Clear completed items
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span>Show completed</span>
          </label>
        </div>
      </div>

      {/* Grocery List */}
      <div className="space-y-6">
        {selectedCategory === 'All' ? (
          // Grouped by category view
          Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">{category}</h3>
                <p className="text-sm text-gray-500">{items.length} items</p>
              </div>
              <div className="divide-y divide-gray-100">
                {items.map((item, index) => (
                 <GroceryItem
  key={`${category}-${index}`}
  item={item}
  index={filteredList.findIndex(filteredItem => filteredItem.name === item.name)}
  onToggle={toggleItem}
  onDelete={deleteItem}
  onEdit={editItem}
  editingItem={editingItem}
  setEditingItem={setEditingItem}
/>

                ))}
              </div>
            </div>
          ))
        ) : (
          // Single category or filtered view
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {selectedCategory !== 'All' && (
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">{selectedCategory}</h3>
                <p className="text-sm text-gray-500">{filteredList.length} items</p>
              </div>
            )}
            <div className="divide-y divide-gray-100">
              {filteredList.map((item, index) => (
                <GroceryItem
                  key={index}
                  item={item}
                  index={index}
                  onToggle={toggleItem}
                  onDelete={deleteItem}
                  onEdit={editItem}
                  editingItem={editingItem}
                  setEditingItem={setEditingItem}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredList.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedCategory !== 'All' ? 'Try adjusting your filters' : 'Add some items to get started'}
          </p>
          <button 
            onClick={() => setIsAddingItem(true)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg flex items-center space-x-2 mx-auto hover:from-orange-600 hover:to-red-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Item</span>
          </button>
        </div>
      )}

      {/* Add Item Modal */}
      <AnimatePresence>
        {isAddingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsAddingItem(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Item</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    placeholder="Enter item name..."
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                  >
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setIsAddingItem(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={addItem}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg flex items-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Item</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Individual grocery item component
const GroceryItem = ({ item, index, onToggle, onDelete, onEdit, editingItem, setEditingItem }) => {
  const [editName, setEditName] = useState(item.name);
  const [editCategory, setEditCategory] = useState(item.category);
  
  const categories = ['Produce', 'Protein', 'Dairy', 'Pantry', 'Other'];
  
  const handleEdit = () => {
    if (editName.trim()) {
      onEdit(index, editName, editCategory);
    }
  };

  const isEditing = editingItem === index;

  // Get meal badge color
  const getMealBadgeColor = (meal) => {
    switch(meal) {
      case 'Breakfast': return 'bg-yellow-100 text-yellow-800';
      case 'Lunch': return 'bg-green-100 text-green-800';
      case 'Dinner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      layout
      className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
        item.checked ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={() => onToggle(index)}
          className="flex-shrink-0 transition-colors"
        >
          {item.checked ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <Circle className="h-6 w-6 text-gray-400 hover:text-orange-500" />
          )}
        </button>
        
        {isEditing ? (
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm"
              autoFocus
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <p className={`font-medium ${item.checked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
  {item.name}
</p>

              {item.meal && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMealBadgeColor(item.meal)}`}>
  {item.meal}
</span>

              )}
            </div>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="p-1 text-green-500 hover:text-green-700 transition-colors"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={() => setEditingItem(null)}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ×
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditingItem(index)}
              className="p-1 text-gray-500 hover:text-orange-500 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(index)}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default GroceryList;