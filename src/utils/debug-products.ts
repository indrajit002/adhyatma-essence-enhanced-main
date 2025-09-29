// Debug utility to check product data from database
import { supabase } from '@/lib/supabaseClient';

export const debugProducts = async () => {
  try {
    console.log('🔍 Debugging products from database...');
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(5);

    if (error) {
      console.error('❌ Database error:', error);
      return;
    }

    console.log('📊 Raw database data:', data);
    
    data?.forEach((product, index) => {
      console.log(`\n📦 Product ${index + 1}:`);
      console.log(`  - ID: ${product.id}`);
      console.log(`  - Name: ${product.name}`);
      console.log(`  - in_stock: ${product.in_stock} (type: ${typeof product.in_stock})`);
      console.log(`  - is_featured: ${product.is_featured} (type: ${typeof product.is_featured})`);
      console.log(`  - created_at: ${product.created_at}`);
    });

  } catch (err) {
    console.error('❌ Debug error:', err);
  }
};

// Call this function in browser console: debugProducts()
(window as any).debugProducts = debugProducts;
