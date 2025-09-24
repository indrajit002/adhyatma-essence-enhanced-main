import { supabase } from '@/lib/supabaseClient';
import { Order, CreateOrderRequest } from '@/types/order';

export class OrderService {
  /**
   * Create a new order
   */
  static async createOrder(orderData: CreateOrderRequest, userId: string): Promise<Order> {
    try {
      console.log('🛒 Creating order for user:', userId);
      
      // Generate a unique order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const order: Order = {
        id: orderId,
        userId,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        shippingAddress: orderData.shippingAddress,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Try to save to Supabase first
      try {
        const { data, error } = await supabase
          .from('orders')
          .insert([order])
          .select()
          .single();

        if (error) {
          console.warn('⚠️ Failed to save order to Supabase:', error);
          console.log('🔄 Order will be saved locally only');
        } else {
          console.log('✅ Order saved to Supabase:', data);
        }
      } catch (dbError) {
        console.warn('⚠️ Database error, saving locally:', dbError);
      }

      // Save to localStorage as backup
      const existingOrders = this.getLocalOrders();
      const updatedOrders = [...existingOrders, order];
      localStorage.setItem('crystal-orders', JSON.stringify(updatedOrders));
      
      console.log('✅ Order created successfully:', order);
      return order;
    } catch (error) {
      console.error('❌ Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  /**
   * Get orders for a specific user
   */
  static async getUserOrders(userId: string): Promise<Order[]> {
    try {
      // Try to get from Supabase first
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('userId', userId)
          .order('createdAt', { ascending: false });

        if (!error && data) {
          console.log('✅ Orders fetched from Supabase:', data);
          return data as Order[];
        }
      } catch (dbError) {
        console.warn('⚠️ Database error, fetching from local storage:', dbError);
      }

      // Fallback to localStorage
      const localOrders = this.getLocalOrders();
      const userOrders = localOrders.filter(order => order.userId === userId);
      console.log('📦 Orders fetched from localStorage:', userOrders);
      return userOrders;
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      return [];
    }
  }

  /**
   * Get a specific order by ID
   */
  static async getOrderById(orderId: string): Promise<Order | null> {
    try {
      // Try to get from Supabase first
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (!error && data) {
          return data as Order;
        }
      } catch (dbError) {
        console.warn('⚠️ Database error, fetching from local storage:', dbError);
      }

      // Fallback to localStorage
      const localOrders = this.getLocalOrders();
      const order = localOrders.find(order => order.id === orderId);
      return order || null;
    } catch (error) {
      console.error('❌ Error fetching order:', error);
      return null;
    }
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
    try {
      // Try to update in Supabase first
      try {
        const { error } = await supabase
          .from('orders')
          .update({ 
            status,
            updatedAt: new Date().toISOString()
          })
          .eq('id', orderId);

        if (error) {
          console.warn('⚠️ Failed to update order in Supabase:', error);
        } else {
          console.log('✅ Order status updated in Supabase');
        }
      } catch (dbError) {
        console.warn('⚠️ Database error, updating locally:', dbError);
      }

      // Update in localStorage
      const localOrders = this.getLocalOrders();
      const orderIndex = localOrders.findIndex(order => order.id === orderId);
      
      if (orderIndex !== -1) {
        localOrders[orderIndex].status = status;
        localOrders[orderIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('crystal-orders', JSON.stringify(localOrders));
        console.log('✅ Order status updated locally');
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      return false;
    }
  }

  /**
   * Get orders from localStorage
   */
  private static getLocalOrders(): Order[] {
    try {
      const orders = localStorage.getItem('crystal-orders');
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('❌ Error parsing local orders:', error);
      return [];
    }
  }
}
