import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type PaymentFormProps = {
  amount: number;
  onSuccess: () => void;
  onError: (message: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
};

export function PaymentForm({ 
  amount, 
  onSuccess, 
  onError,
  isSubmitting,
  setIsSubmitting
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setIsSubmitting(true);
    setCardError(null);

    // Get a reference to the CardElement
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real implementation, you would create a payment intent on your server
      // and pass the client secret to the frontend
      
      // Simulate a server call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just simulate a successful payment
      // In a real app, you would use stripe.confirmCardPayment with the client secret
      
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: cardElement,
      //   },
      // });
      
      // if (error) {
      //   setCardError(error.message || 'An error occurred with your payment');
      //   onError(error.message || 'Payment failed');
      // } else if (paymentIntent.status === 'succeeded') {
      //   onSuccess();
      // }
      
      // Simulate success for demo
      onSuccess();
    } catch (error) {
      setCardError('An unexpected error occurred');
      onError('Payment processing failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="card-element">Card Details</Label>
        <div className="mt-1 p-3 border rounded-md bg-background">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        {cardError && <p className="text-red-500 text-sm mt-1">{cardError}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full py-6 text-lg" 
        disabled={!stripe || isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
      </Button>
    </div>
  );
}