// Admin Setup Utility
// Run this in your browser console to set up an admin user

import { supabase } from './supabaseClient';

export const setupAdmin = async (userEmail) => {
  try {
    console.log('🔧 Setting up admin for:', userEmail);
    
    // First, get the user ID from auth.users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('❌ Error fetching users:', authError);
      return;
    }
    
    const targetUser = authUsers.users.find(user => user.email === userEmail);
    
    if (!targetUser) {
      console.error('❌ User not found:', userEmail);
      return;
    }
    
    console.log('✅ Found user:', targetUser.id);
    
    // Update the profile to set is_admin = true
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', targetUser.id)
      .select();
    
    if (error) {
      console.error('❌ Error updating profile:', error);
      return;
    }
    
    console.log('✅ Admin setup complete!', data);
    console.log('🔄 Please refresh the page to see changes.');
    
  } catch (error) {
    console.error('❌ Setup error:', error);
  }
};

// Alternative method using direct SQL
export const setupAdminSQL = async (userEmail) => {
  try {
    console.log('🔧 Setting up admin via SQL for:', userEmail);
    
    const { data, error } = await supabase.rpc('set_user_admin', {
      user_email: userEmail
    });
    
    if (error) {
      console.error('❌ SQL Error:', error);
      return;
    }
    
    console.log('✅ Admin setup complete via SQL!', data);
    
  } catch (error) {
    console.error('❌ SQL Setup error:', error);
  }
};

// Make functions available globally for console use
if (typeof window !== 'undefined') {
  window.setupAdmin = setupAdmin;
  window.setupAdminSQL = setupAdminSQL;
  
  console.log('🛠️ Admin setup functions available:');
  console.log('- setupAdmin("your-email@example.com")');
  console.log('- setupAdminSQL("your-email@example.com")');
}
