import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBooks: string[];
}

const OrderDialog: React.FC<OrderDialogProps> = ({ open, onOpenChange, selectedBooks }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('cod');
  const { toast } = useToast();

////////////

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!phone || !address) {
    toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
    return;
  }

  const res = await fetch('/api/send-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, address, payment, selectedBooks }),
  });

  const data = await res.json();

  if (res.ok) {
    toast({ 
      title: "Order Confirmed!", 
      description: data.message,
      className: "bg-gray-900 border-cyan-500 text-cyan-400"
    });

    onOpenChange(false);
    setPhone('');
    setAddress('');
    setPayment('cod');
  } else {
    toast({ title: "Error", description: data.message, variant: "destructive" });
  }
};


///////////

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-cyan-500 border-2 text-gray-100 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-cyan-400 text-xl font-bold">
            Complete Your Order
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-cyan-300">Phone Number</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="bg-gray-800 border-cyan-500 text-gray-100 focus:border-cyan-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-cyan-300">Home Address</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="bg-gray-800 border-cyan-500 text-gray-100 focus:border-cyan-400"
            />
          </div>
          
          <div className="space-y-3">
            <Label className="text-cyan-300">Payment Method</Label>
            <RadioGroup value={payment} onValueChange={setPayment}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" className="border-cyan-400 text-cyan-400" />
                <Label htmlFor="cod" className="text-gray-300">Cash on Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bkash" id="bkash" className="border-cyan-400 text-cyan-400" />
                <Label htmlFor="bkash" className="text-gray-300">Bkash</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold">
            Submit Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;