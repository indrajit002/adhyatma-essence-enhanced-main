import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';

const ConfirmEmail = () => {
  const location = useLocation();
  // Get the email address passed from the sign-up page
  const email = location.state?.email || 'your email address';

  const handleResendEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) {
        console.error('Error resending email:', error);
        alert('Failed to resend email. Please try again.');
      } else {
        alert('A new confirmation email has been sent!');
      }
    } catch (error) {
      console.error('Error resending email:', error);
      alert('Failed to resend email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      
      <div className="pt-40 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MailCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-playfair text-gray-800">
                  Confirm Your Email
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 pt-2">
                  We've sent a confirmation link to your inbox.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-gray-700 mb-6">
                  Please check your email at{' '}
                  <strong className="text-purple-700">{email}</strong> and click the link to activate your account.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  If you don't see the email, please check your spam folder.
                </p>
                <div className="space-y-4">
                   <Button
                    onClick={handleResendEmail}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
                  >
                    Resend Confirmation Email
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/">Go to Homepage</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConfirmEmail;