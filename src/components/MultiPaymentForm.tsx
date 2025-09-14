import { useState } from 'react';
import { PaymentForm } from './PaymentForm';
import { PaytmPayment } from './PaytmPayment';
import { PhonePePayment } from './PhonePePayment';
import { PaymentMethodSelector, PaymentMethod } from './PaymentMethodSelector';

type MultiPaymentFormProps = {
  amount: number;
  onSuccess: () => void;
  onError: (message: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
};

export function MultiPaymentForm({
  amount,
  onSuccess,
  onError,
  isSubmitting,
  setIsSubmitting
}: MultiPaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');

  return (
    <div className="space-y-6">
      <PaymentMethodSelector 
        selectedMethod={paymentMethod}
        onMethodChange={setPaymentMethod}
      />
      
      {paymentMethod === 'stripe' && (
        <PaymentForm
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      )}
      
      {paymentMethod === 'paytm' && (
        <PaytmPayment
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      )}
      
      {paymentMethod === 'phonepe' && (
        <PhonePePayment
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      )}
    </div>
  );
}