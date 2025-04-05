'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2Icon } from 'lucide-react';
import { useAuthContext } from '@/app/provider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const plans = [
  {
    name: 'Starter',
    credits: 10,
    price: 5,
    description: 'Best for trying things out.',
  },
  {
    name: 'Pro',
    credits: 50,
    price: 20,
    description: 'Ideal for regular content creators.',
  },
  {
    name: 'Enterprise',
    credits: 200,
    price: 75,
    description: 'Perfect for teams and businesses.',
  },
];

function BillingPage() {
  const { user, setUser } = useAuthContext();
  const updateUserCredits = useMutation(api.users.updateUserCredits)

  const onPaymentSuccess = async (price, credits) => {
    const result = await updateUserCredits({
      uid: user?._id,
      credits: Number(user?.credits) + Number(credits)
    });
    setUser(prev => ({
      ...prev,
      credits: Number(user?.credits) + Number(credits)
    }))
    toast('Credits Added!');
  }

  const handlePurchase = async (plan) => {
    if (!user) return toast('Please login first.');

    try {
      setLoadingPlan(plan.name);
      // Example: call your backend/payment API here
      const response = await axios.post('/api/add-credits', {
        uid: user._id,
        credits: plan.credits,
        amount: plan.price,
        planName: plan.name,
      });

      toast.success('Credits added successfully!');
    } catch (error) {
      toast.error('Something went wrong.');
      console.error(error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div>
      <h1 className="font-3xl mb-3">Billing & Credits</h1>
      <div className="mb-6 border p-5 rounded-lg">
        <h2 className="text-xl font-semibold">Your Current Credits:</h2>
        <p className="text-3xl font-bold text-green-500 mt-2">{user?.credits ?? 0} Credits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="border p-5 rounded-xl shadow hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
            <p className="text-2xl font-bold mb-4">₹{plan.price}</p>
            <p className="text-green-600 mb-4">+{plan.credits} Credits</p>
            <PayPalButtons style={{ layout: "horizontal" }}
              onApprove={() => onPaymentSuccess(plan?.price, plan?.credits)}
              onCancel={()=> toast("Payment Cancelled")}
              createOrder={(data, actions) => {
                return actions?.order?.create({
                  purchase_units: [
                    {
                      amount: {
                        value: plan.price,
                        currency_code: 'USD',
                      }
                    }
                  ]
                })
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillingPage;
