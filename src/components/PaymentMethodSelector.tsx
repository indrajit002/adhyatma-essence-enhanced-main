import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type PaymentMethod = 'stripe' | 'paytm' | 'phonepe' | 'upi';

type PaymentMethodSelectorProps = {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
};

export function PaymentMethodSelector({ 
  selectedMethod, 
  onMethodChange 
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Payment Method</h3>
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={(value) => onMethodChange(value as PaymentMethod)}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
          <RadioGroupItem value="stripe" id="stripe" />
          <Label htmlFor="stripe" className="flex items-center cursor-pointer">
            <span className="ml-2 font-medium">Credit/Debit Card</span>
            <span className="ml-auto text-sm text-muted-foreground">Powered by Stripe</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
          <RadioGroupItem value="paytm" id="paytm" />
          <Label htmlFor="paytm" className="flex items-center cursor-pointer">
            <span className="ml-2 font-medium">Paytm</span>
            <span className="ml-auto text-sm text-muted-foreground">UPI & Wallet</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
          <RadioGroupItem value="phonepe" id="phonepe" />
          <Label htmlFor="phonepe" className="flex items-center cursor-pointer">
            <span className="ml-2 font-medium">PhonePe</span>
            <span className="ml-auto text-sm text-muted-foreground">UPI & Wallet</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 cursor-pointer bg-green-50">
          <RadioGroupItem value="upi" id="upi" />
          <Label htmlFor="upi" className="flex items-center cursor-pointer">
            <span className="ml-2 font-medium">Direct UPI</span>
            <span className="ml-auto text-sm text-muted-foreground">BHIM, Google Pay, etc.</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}