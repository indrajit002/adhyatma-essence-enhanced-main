import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer";

console.log("Order confirmation function with Nodemailer initialized");

// The main function that will be executed when the webhook is triggered
serve(async (req) => {
  try {
    // 1. Extract the new order data from the request body
    const { record: newOrder } = await req.json();
    console.log("Received new order:", newOrder.id);

    // 2. Create a Supabase client with the required service_role key
    // This allows us to query our database from the edge function
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // 3. Fetch the customer's profile to get their email and name
    console.log(`Fetching profile for user ID: ${newOrder.user_id}`);
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("first_name, last_name, email")
      .eq("id", newOrder.user_id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      throw new Error(`Could not find profile for user ${newOrder.user_id}`);
    }

    const customerName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Valued Customer';
    console.log(`Found customer: ${customerName} (${profile.email})`);

    // 4. Fetch the items associated with this order
    console.log(`Fetching items for order ID: ${newOrder.id}`);
    const { data: orderItems, error: itemsError } = await supabaseClient
      .from("order_items")
      .select(`
        quantity,
        price_at_purchase,
        products ( name, image_url )
      `)
      .eq("order_id", newOrder.id);

    if (itemsError) {
      console.error("Error fetching order items:", itemsError);
      throw new Error(`Could not fetch items for order ${newOrder.id}`);
    }
    console.log(`Found ${orderItems.length} items for the order.`);


    // 5. Get the Resend API key from Supabase secrets
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = Deno.env.get("SMTP_PORT");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      throw new Error("Missing SMTP credentials in Supabase secrets.");
    }

    // 6. Create a Nodemailer transporter
    console.log("Creating Nodemailer transporter...");
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465, // true for port 465, false for others
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 7. Construct the HTML for the email
    const emailHtml = `
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
          .order-details img { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 15px; }
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
            <h2>Hi ${customerName},</h2>
            <p>Your order #${newOrder.id.substring(0, 8).toUpperCase()} has been confirmed and will be shipped soon. Here are the details:</p>
            <table class="order-details">
              <thead>
                <tr>
                  <th colspan="2">Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${orderItems.map(item => `
                  <tr>
                    <td><img src="${item.products.image_url}" alt="${item.products.name}"></td>
                    <td>${item.products.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${(item.price_at_purchase * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total">
              <p>Total: ₹${newOrder.total_amount.toFixed(2)}</p>
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

    // 8. Send the email using Nodemailer
    console.log("Sending email via Nodemailer...");
    await transporter.sendMail({
      from: `"Adhyatma Store" <${smtpUser}>`,
      to: profile.email,
      subject: `Your Adhyatma Order Confirmation (#${newOrder.id.substring(0,8).toUpperCase()})`,
      html: emailHtml,
    });

    console.log("Email sent successfully!");
    return new Response("ok");

  } catch (error) {
    console.error("An unhandled error occurred:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});