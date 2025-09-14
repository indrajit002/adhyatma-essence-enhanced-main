import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PaytmPaymentProps = {
  amount: number;
  onSuccess: () => void;
  onError: (message: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
};

export function PaytmPayment({
  amount,
  onSuccess,
  onError,
  isSubmitting,
  setIsSubmitting
}: PaytmPaymentProps) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!mobileNumber || mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // In a real implementation, you would integrate with Paytm API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success for demo
      onSuccess();
    } catch (error) {
      setError('Payment processing failed');
      onError('Payment processing failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="mobile-number">Paytm Mobile Number</Label>
        <Input
          id="mobile-number"
          type="tel"
          placeholder="Enter your Paytm mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className={error ? 'border-red-500' : ''}
          maxLength={10}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <div className="mt-2 text-sm text-muted-foreground">
        <p>You will receive a payment request on your Paytm app.</p>
      </div>
      
      <Button 
        type="button" 
        className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700" 
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Processing...' : `Pay ₹${(amount * 83).toFixed(2)} with Paytm`}
      </Button>
    </div>
  );
}