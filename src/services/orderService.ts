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
        console.log('💾 Saving order to Supabase...');
        
        // Create the order in the orders table
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert([{
            user_id: order.userId,
            total_amount: order.totalAmount,
            status: 'Processing',
            shipping_address: order.shippingAddress,
            created_at: order.createdAt
          }])
          .select()
          .single();

        if (orderError) {
          console.error('❌ Failed to create order:', orderError);
          throw new Error(`Order creation failed: ${orderError.message}`);
        }

        console.log('✅ Order created in Supabase:', orderData);

        // Create order items
        const orderItems = order.items.map(item => ({
          order_id: orderData.id,
          product_id: item.id, // Assuming product_id matches item.id
          quantity: item.quantity,
          price_at_purchase: item.price
        }));

        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems)
          .select();

        if (itemsError) {
          console.error('❌ Failed to create order items:', itemsError);
          // Don't throw here, order is already created
        } else {
          console.log('✅ Order items created:', itemsData);
        }

        // Update the order object with the database ID
        order.id = orderData.id;

      } catch (dbError) {
        console.error('❌ Database error:', dbError);
        console.log('🔄 Saving order locally as backup');
        
        // Save to localStorage as fallback
        const existingOrders = this.getLocalOrders();
        const updatedOrders = [...existingOrders, order];
        localStorage.setItem('crystal-orders', JSON.stringify(updatedOrders));
        
        console.log('✅ Order saved locally:', order);
        return order;
      }

      // Save to localStorage as backup (when Supabase succeeds)
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
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              id,
              product_id,
              quantity,
              price_at_purchase
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (ordersError) {
          console.error('❌ Failed to fetch orders:', ordersError);
          throw ordersError;
        }

        if (ordersData) {
          // Transform the data to match our Order interface
          const transformedOrders: Order[] = ordersData.map(order => ({
            id: order.id,
            userId: order.user_id,
            items: order.order_items.map((item: any) => ({
              id: item.product_id,
              name: `Product ${item.product_id}`, // You might want to join with products table
              price: item.price_at_purchase,
              quantity: item.quantity,
              image: '' // You might want to join with products table for image
            })),
            totalAmount: order.total_amount,
            shippingAddress: order.shipping_address,
            status: order.status.toLowerCase(),
            createdAt: order.created_at,
            updatedAt: order.created_at
          }));

          console.log('✅ Orders fetched from Supabase:', transformedOrders);
          return transformedOrders;
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
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              id,
              product_id,
              quantity,
              price_at_purchase
            )
          `)
          .eq('id', orderId)
          .single();

        if (orderError) {
          console.error('❌ Failed to fetch order:', orderError);
          throw orderError;
        }

        if (orderData) {
          // Transform the data to match our Order interface
          const transformedOrder: Order = {
            id: orderData.id,
            userId: orderData.user_id,
            items: orderData.order_items.map((item: any) => ({
              id: item.product_id,
              name: `Product ${item.product_id}`,
              price: item.price_at_purchase,
              quantity: item.quantity,
              image: ''
            })),
            totalAmount: orderData.total_amount,
            shippingAddress: orderData.shipping_address,
            status: orderData.status.toLowerCase(),
            createdAt: orderData.created_at,
            updatedAt: orderData.created_at
          };

          return transformedOrder;
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
            status: status.charAt(0).toUpperCase() + status.slice(1), // Convert to proper case
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId);

        if (error) {
          console.error('❌ Failed to update order in Supabase:', error);
          throw error;
        } else {
          console.log('✅ Order status updated in Supabase');
          return true;
        }
      } catch (dbError) {
        console.warn('⚠️ Database error, updating locally:', dbError);
      }

      // Update in localStorage as fallback
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
