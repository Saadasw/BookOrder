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
  const res = await fetch("http://localhost:10000/orders/", {
  method: "POST",
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
      phone_number: phone,
      address: address,
      payment: payment,
      book_list: selectedBooks
  }),
});

/*
  const res = await fetch('/api/send-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, address, payment, selectedBooks }),
  });
*/
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


/*

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String
#rom sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, declarative_base
import os
from dotenv import load_dotenv
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only. Replace with frontend origin in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_UR")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, nullable=False)
    address = Column(String, nullable=False)
    payment = Column(String, nullable=False)
    book_list = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)


# models.py or in your main file



class OrderRequest(BaseModel):
    phone_number: str
    address: str
    payment: str
    book_list: List[str]



# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()





"""
@app.post("/orders/")
async def create_order(order: OrderRequest):
    print(order)
    return {"message": "Order received"}
"""
@app.post("/orders/")
def create_order(order: OrderRequest, db: Session = Depends(get_db)):
    print(order.phone_number)
    db_order = Order(
        phone_number=order.phone_number,
        address=order.address,
        payment = order.payment,
        book_list=",".join(order.book_list)
        
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@app.get("/orders/")
def read_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

@app.put("/orders/{order_id}")
def update_order(order_id: int, order: OrderRequest, db: Session = Depends(get_db)):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db_order.phone_number = order.phone_number
    db_order.address = order.address
    db_order.book_list = ",".join(order.book_list)
    db.commit()
    return db_order

@app.delete("/orders/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(db_order)
    db.commit()
    return {"message": "Order deleted"}

  
*/
