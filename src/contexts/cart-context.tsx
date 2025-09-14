import React, { createContext, useContext, useReducer, useEffect } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isOpen: boolean;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isOpen: false,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return { totalItems, totalAmount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
        
        const { totalItems, totalAmount } = calculateTotals(updatedItems);
        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalAmount,
        };
      } else {
        // Add new item
        const updatedItems = [...state.items, action.payload];
        const { totalItems, totalAmount } = calculateTotals(updatedItems);
        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalAmount,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter((item) => item.id !== action.payload.id);
      const { totalItems, totalAmount } = calculateTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalAmount,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
      }
      
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const { totalItems, totalAmount } = calculateTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalAmount,
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalAmount: 0,
      };
      
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
      
    default:
      return state;
  }
};

type CartContextType = {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load cart from localStorage if available
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart) as CartState;
          return parsedCart;
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
        }
      }
    }
    return initialState;
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);
  
  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  
  const removeItem = (id: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id },
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity },
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  
  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};