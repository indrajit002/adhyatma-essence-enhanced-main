# Frontend Integration Guide - Supabase Backend

## 📋 Overview
This guide covers the step-by-step process of integrating Supabase backend with your existing Adhyatma Crystal Store frontend.

## 🔧 Required Frontend Changes

### 1. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 2. Environment Variables
Create `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Create Supabase Client
Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 4. Update Auth Context
Replace `src/contexts/auth-context.tsx` with Supabase authentication:

```typescript
import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({ ...prev, session, user: session?.user ?? null, isLoading: false }))
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(prev => ({ ...prev, session, user: session?.user ?? null, isLoading: false }))
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, isLoading: false }))
      throw error
    }
  }

  const signUp = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const { error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName
          }
        }
      })
      if (error) throw error
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, isLoading: false }))
      throw error
    }
  }

  const signOut = async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    await supabase.auth.signOut()
  }

  const updateUser = async (userData: Partial<User>) => {
    // Implementation for updating user profile
  }

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }))
  }

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut, updateUser, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### 5. Create API Service
Create `src/services/api.ts`:
```typescript
import { supabase } from '@/lib/supabase'

export class ApiService {
  // Products
  static async getProducts(filters?: {
    category?: string
    featured?: boolean
    search?: string
    limit?: number
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        product_images(*),
        categories(*)
      `)
      .eq('is_active', true)

    if (filters?.category) {
      query = query.eq('category_id', filters.category)
    }

    if (filters?.featured) {
      query = query.eq('is_featured', true)
    }

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  }

  // Cart
  static async getCartItems() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*, product_images(*))
      `)
      .eq('user_id', user.id)

    if (error) throw error
    return data
  }

  static async addToCart(productId: string, quantity: number = 1) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: productId,
        quantity
      })

    if (error) throw error
    return data
  }

  // Add more methods as needed...
}
```

### 6. Update Cart Context
Update `src/contexts/cart-context.tsx` to use Supabase:

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react'
import { ApiService } from '@/services/api'
import { useAuth } from './auth-context'

type CartItem = {
  id: string
  product_id: string
  quantity: number
  products: {
    id: string
    name: string
    price: number
    product_images: Array<{ image_url: string }>
  }
}

type CartState = {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  isOpen: boolean
  isLoading: boolean
}

type CartContextType = {
  state: CartState
  addItem: (productId: string, quantity?: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  toggleCart: () => void
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [state, setState] = useState<CartState>({
    items: [],
    totalItems: 0,
    totalAmount: 0,
    isOpen: false,
    isLoading: false
  })

  const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)
    const totalAmount = items.reduce((total, item) => total + (item.products.price * item.quantity), 0)
    return { totalItems, totalAmount }
  }

  const refreshCart = async () => {
    if (!user) return

    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      const items = await ApiService.getCartItems()
      const { totalItems, totalAmount } = calculateTotals(items)
      
      setState(prev => ({
        ...prev,
        items,
        totalItems,
        totalAmount,
        isLoading: false
      }))
    } catch (error) {
      console.error('Failed to load cart:', error)
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  useEffect(() => {
    if (user) {
      refreshCart()
    } else {
      setState(prev => ({
        ...prev,
        items: [],
        totalItems: 0,
        totalAmount: 0
      }))
    }
  }, [user])

  const addItem = async (productId: string, quantity = 1) => {
    if (!user) throw new Error('User not authenticated')
    
    try {
      await ApiService.addToCart(productId, quantity)
      await refreshCart()
    } catch (error) {
      console.error('Failed to add item to cart:', error)
      throw error
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      await ApiService.removeFromCart(itemId)
      await refreshCart()
    } catch (error) {
      console.error('Failed to remove item from cart:', error)
      throw error
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await ApiService.updateCartItem(itemId, quantity)
      await refreshCart()
    } catch (error) {
      console.error('Failed to update cart item:', error)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      await ApiService.clearCart()
      await refreshCart()
    } catch (error) {
      console.error('Failed to clear cart:', error)
      throw error
    }
  }

  const toggleCart = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }))
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
```

### 7. Update Product Components
Update `src/pages/Shop.tsx` to use API:

```typescript
import { useState, useEffect } from 'react'
import { ApiService } from '@/services/api'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          ApiService.getProducts(),
          ApiService.getCategories()
        ])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Rest of component logic...
}
```

### 8. Update Checkout Process
Update `src/pages/Checkout.tsx` to use Supabase:

```typescript
import { ApiService } from '@/services/api'

const Checkout = () => {
  const handlePaymentSuccess = async () => {
    try {
      // Create order in Supabase
      const orderData = {
        order_number: `ORD-${Date.now()}`,
        total_amount: totalAmount,
        shipping_address: formData,
        payment_method: 'stripe',
        items: cart.map(item => ({
          product_id: item.product_id,
          product_name: item.products.name,
          product_price: item.products.price,
          quantity: item.quantity,
          total_price: item.products.price * item.quantity
        }))
      }

      await ApiService.createOrder(orderData)
      await clearCart()
      
      toast({
        title: 'Order Placed Successfully!',
        description: 'Thank you for your purchase.',
      })
      
      navigate('/')
    } catch (error) {
      console.error('Failed to create order:', error)
      toast({
        title: 'Order Failed',
        description: 'Failed to create order. Please try again.',
        variant: 'destructive'
      })
    }
  }

  // Rest of component...
}
```

## 🚀 Migration Steps

### Step 1: Setup Supabase
1. Follow the Supabase setup guide
2. Create all database tables
3. Set up authentication and RLS policies

### Step 2: Install Dependencies
```bash
npm install @supabase/supabase-js
```

### Step 3: Update Environment
Add Supabase credentials to `.env.local`

### Step 4: Replace Mock Data
1. Update auth context to use Supabase
2. Update cart context to use Supabase
3. Replace hardcoded product data with API calls
4. Update checkout process

### Step 5: Test Integration
1. Test authentication flow
2. Test cart functionality
3. Test product loading
4. Test checkout process

### Step 6: Add Sample Data
1. Upload product images to Supabase Storage
2. Insert sample products, categories, and collections
3. Test complete user flow

## 🔍 Key Changes Summary

1. **Authentication**: Replaced mock auth with Supabase Auth
2. **Data Storage**: Replaced localStorage with Supabase database
3. **API Calls**: Replaced hardcoded data with real API calls
4. **Real-time**: Added real-time cart updates
5. **Error Handling**: Added proper error handling for API calls
6. **Loading States**: Added loading states for better UX

## ⚠️ Important Notes

1. **User Experience**: Maintain the same UI/UX while switching to real data
2. **Error Handling**: Add proper error handling for all API calls
3. **Loading States**: Show loading indicators during API calls
4. **Offline Support**: Consider adding offline support for cart
5. **Performance**: Optimize API calls and add caching where needed

This integration maintains your existing design while adding real backend functionality!
