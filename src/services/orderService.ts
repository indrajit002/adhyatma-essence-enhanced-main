import { supabase } from '@/lib/supabaseClient';
import { Order, CreateOrderRequest } from '@/types/order';
import { EmailService } from './emailService';

export class OrderService {
  private static pendingRequests = new Map<string, Promise<any>>();

  /**
   * Create a new order
   */
  static async createOrder(orderData: CreateOrderRequest, userId: string): Promise<Order> {
    try {
      
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
        }

        // Update the order object with the database ID
        order.id = orderData.id;

        // Send confirmation email
        try {
          await this.sendOrderConfirmationEmail(orderData.id, userId, order);
        } catch (emailError) {
          console.error('⚠️ Failed to send confirmation email:', emailError);
          // Don't throw here, order is still created successfully
        }

      } catch (dbError) {
        console.error('❌ Database error:', dbError);
        
        // Save to localStorage as fallback
        const existingOrders = this.getLocalOrders();
        const updatedOrders = [...existingOrders, order];
        localStorage.setItem('crystal-orders', JSON.stringify(updatedOrders));
        
        return order;
      }

      // Save to localStorage as backup (when Supabase succeeds)
      const existingOrders = this.getLocalOrders();
      const updatedOrders = [...existingOrders, order];
      localStorage.setItem('crystal-orders', JSON.stringify(updatedOrders));
      
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
    const requestKey = `getUserOrders-${userId}`;
    
    // Check if there's already a pending request for this user
    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey)!;
    }
    
    const requestPromise = this.fetchUserOrders(userId);
    this.pendingRequests.set(requestKey, requestPromise);
    
    try {
      const result = await requestPromise;
      return result;
    } finally {
      this.pendingRequests.delete(requestKey);
    }
  }
  
  private static async fetchUserOrders(userId: string): Promise<Order[]> {
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

          return transformedOrders;
        }
      } catch (dbError) {
        console.warn('⚠️ Database error, fetching from local storage:', dbError);
      }

      // Fallback to localStorage
      const localOrders = this.getLocalOrders();
      const userOrders = localOrders.filter(order => order.userId === userId);
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
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      return false;
    }
  }

  /**
   * Send order confirmation email
   */
  private static async sendOrderConfirmationEmail(orderId: string, userId: string, order: Order): Promise<void> {
    try {
      // Get user profile for email
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name, email')
        .eq('id', userId)
        .single();

      if (profileError || !profile) {
        console.error('❌ Failed to fetch user profile for email:', profileError);
        return;
      }

      // Prepare email data
      const customerName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Valued Customer';
      
      const emailData = {
        orderId: order.id,
        customerName,
        customerEmail: profile.email,
        totalAmount: order.totalAmount,
        items: order.items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      // Send email using EmailService
      const emailSent = await EmailService.sendOrderConfirmation(emailData);
      
      if (emailSent) {
        // Email sent successfully
      } else {
        console.error('❌ Failed to send order confirmation email');
      }
      
    } catch (error) {
      console.error('❌ Error sending confirmation email:', error);
      throw error;
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
