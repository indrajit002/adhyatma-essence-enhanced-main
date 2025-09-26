/**
 * Simple Email Service for order confirmation emails
 * Uses console logging for development, can be extended for real email services
 */

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}

export class EmailService {
  /**
   * Send order confirmation email
   */
  static async sendOrderConfirmation(data: OrderEmailData): Promise<boolean> {
    try {
      // Generate email content
      const emailContent = this.generateEmailContent(data);
      
      // In a real implementation, you would send the email here
      // For now, we'll simulate success
      return true;
    } catch (error) {
      console.error('❌ Error sending order confirmation email:', error);
      return false;
    }
  }

  /**
   * Generate email content
   */
  private static generateEmailContent(data: OrderEmailData): string {
    const itemsHtml = data.items.map(item => 
      `<tr>
        <td>Product ${item.productId}</td>
        <td>${item.quantity}</td>
        <td>₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    ).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f7; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden; }
          .header { background: linear-gradient(to right, #8A2BE2, #EC4899); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .content h2 { color: #333; }
          .content p { line-height: 1.6; color: #555; }
          .order-details { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .order-details th, .order-details td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
          .order-details th { background-color: #f9f9f9; color: #555; }
          .total { text-align: right; font-size: 1.2em; font-weight: bold; margin-top: 20px; }
          .footer { background-color: #f4f4f7; padding: 20px; text-align: center; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Order!</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.customerName},</h2>
            <p>Your order #${data.orderId.substring(0, 8).toUpperCase()} has been confirmed and will be shipped soon. Here are the details:</p>
            <table class="order-details">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            <div class="total">
              <p>Total: ₹${data.totalAmount.toFixed(2)}</p>
            </div>
            <p>We're so excited for you to receive your crystals and start your journey. Thank you for choosing Adhyatma.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Adhyatma. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
