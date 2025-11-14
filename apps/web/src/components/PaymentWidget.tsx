'use client';

import { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { PAYMENT_ROUTER_ABI, PAYMENT_ROUTER_ADDRESS } from '@/lib/contracts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, Check } from 'lucide-react';

interface PaymentWidgetProps {
  username: string;
  embedMode?: boolean;
}

export default function PaymentWidget({ username, embedMode = false }: PaymentWidgetProps) {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read link details
  const { data: linkData, isLoading: isLoadingLink } = useReadContract({
    address: PAYMENT_ROUTER_ADDRESS,
    abi: PAYMENT_ROUTER_ABI,
    functionName: 'getLinkDetails',
    args: [username],
  });

  useEffect(() => {
    if (isSuccess) {
      setIsProcessing(false);
      // Show success message
      alert('Payment successful!');
    }
  }, [isSuccess]);

  const handlePayment = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!linkData) {
      alert('Link not found');
      return;
    }

    const [recipient, fixedAmount, isActive] = linkData;

    if (!isActive) {
      alert('This payment link is inactive');
      return;
    }

    setIsProcessing(true);

    const paymentAmount = fixedAmount > 0n 
      ? fixedAmount 
      : parseEther(amount || '0');

    if (paymentAmount === 0n) {
      alert('Please enter an amount');
      setIsProcessing(false);
      return;
    }

    try {
      writeContract({
        address: PAYMENT_ROUTER_ADDRESS,
        abi: PAYMENT_ROUTER_ABI,
        functionName: 'pay',
        args: [username],
        value: paymentAmount,
      });
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
    }
  };

  if (isLoadingLink) {
    return (
      <Card className={`p-6 ${embedMode ? 'border-0 shadow-lg' : ''}`}>
        <p className="text-center text-muted-foreground">Loading...</p>
      </Card>
    );
  }

  if (!linkData) {
    return (
      <Card className={`p-6 ${embedMode ? 'border-0 shadow-lg' : ''}`}>
        <p className="text-center text-red-600">Payment link not found</p>
      </Card>
    );
  }

  const [recipient, fixedAmount, isActive, totalReceived, transactionCount] = linkData;
  const isFixedAmount = fixedAmount > 0n;
  const displayAmount = isFixedAmount ? formatEther(fixedAmount) : '';

  if (!isActive) {
    return (
      <Card className={`p-6 ${embedMode ? 'border-0 shadow-lg' : ''}`}>
        <p className="text-center text-red-600">This payment link is inactive</p>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${embedMode ? 'border-0 shadow-lg' : ''}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Pay {username}</h2>
        {isFixedAmount && (
          <p className="text-3xl font-bold text-primary">{displayAmount} cUSD</p>
        )}
      </div>

      {!isFixedAmount && (
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount (cUSD)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="10.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isProcessing || isLoading}
          />
        </div>
      )}

      {!isConnected ? (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800 text-center">
              Connect your wallet to make a payment
            </p>
          </div>
          <Button className="w-full" size="lg" disabled>
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      ) : (
        <Button
          onClick={handlePayment}
          disabled={isProcessing || isLoading || (!isFixedAmount && !amount)}
          className="w-full"
          size="lg"
        >
          {isProcessing || isLoading ? (
            'Processing...'
          ) : isSuccess ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Payment Successful!
            </>
          ) : (
            `Pay ${isFixedAmount ? displayAmount + ' cUSD' : amount + ' cUSD'}`
          )}
        </Button>
      )}

      <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
        <p>Powered by Celopass</p>
        <p className="mt-1">
          {transactionCount.toString()} payments • {formatEther(totalReceived)} cUSD total
        </p>
      </div>
    </Card>
  );
}

