import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type UpiPaymentProps = {
  amount: number;
  onSuccess: () => void;
  onError: (message: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
};

export function UpiPayment({
  amount,
  onSuccess,
  onError,
  isSubmitting,
  setIsSubmitting
}: UpiPaymentProps) {
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!upiId || !upiId.includes('@')) {
      setError('Please enter a valid UPI ID (e.g. name@upi)');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // In a real implementation, you would integrate with UPI API
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
        <Label htmlFor="upi-id">UPI ID</Label>
        <Input
          id="upi-id"
          type="text"
          placeholder="yourname@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <div className="mt-2 text-sm text-muted-foreground">
        <p>Enter your UPI ID to make a direct payment.</p>
      </div>
      
      <Button 
        type="button" 
        className="w-full py-6 text-lg bg-green-600 hover:bg-green-700" 
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Processing...' : `Pay ₹${(amount * 83).toFixed(2)} with UPI`}
      </Button>
    </div>
  );
}