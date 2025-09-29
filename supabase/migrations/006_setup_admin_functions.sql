-- Create function to set user as admin
CREATE OR REPLACE FUNCTION set_user_admin(user_email TEXT)
RETURNS JSON AS $$
DECLARE
    user_id UUID;
    result JSON;
BEGIN
    -- Get user ID from auth.users
    SELECT id INTO user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF user_id IS NULL THEN
        RETURN json_build_object('success', false, 'message', 'User not found');
    END IF;
    
    -- Update or insert profile with admin privileges
    INSERT INTO public.profiles (id, email, is_admin, created_at, updated_at)
    VALUES (user_id, user_email, true, NOW(), NOW())
    ON CONFLICT (id) 
    DO UPDATE SET 
        is_admin = true,
        updated_at = NOW();
    
    RETURN json_build_object('success', true, 'message', 'User set as admin', 'user_id', user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = user_id AND is_admin = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION set_user_admin(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin(UUID) TO authenticated;

-- Example usage:
-- SELECT set_user_admin('your-email@example.com');
