'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { PAYMENT_ROUTER_ABI, PAYMENT_ROUTER_ADDRESS } from '@/lib/contracts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';

export default function CreateLinkForm() {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    const amountWei = isFixed && amount ? parseEther(amount) : 0n;
    
    writeContract({
      address: PAYMENT_ROUTER_ADDRESS,
      abi: PAYMENT_ROUTER_ABI,
      functionName: 'createLink',
      args: [username.trim(), amountWei],
    });
  };

  if (isSuccess && !createdLink) {
    const link = `${window.location.origin}/pay/${username.trim()}`;
    setCreatedLink(link);
  }

  const copyToClipboard = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink);
      alert('Link copied to clipboard!');
    }
  };

  if (createdLink) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">🎉 Link Created!</h3>
          <p className="text-muted-foreground mb-6">
            Your payment link is ready to share
          </p>
          
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="text-sm text-muted-foreground mb-2">Your payment link:</p>
            <p className="text-lg font-mono break-all">{createdLink}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={copyToClipboard} className="gap-2">
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setCreatedLink(null);
                setUsername('');
                setAmount('');
                setIsFixed(false);
              }}
            >
              Create Another
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Payment Link</h2>
      
      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            Please connect your wallet to create a payment link
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username *
          </label>
          <input
            id="username"
            type="text"
            placeholder="your-username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={isPending || isLoading}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Only lowercase letters, numbers, and hyphens
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="fixed"
            checked={isFixed}
            onChange={(e) => setIsFixed(e.target.checked)}
            className="w-4 h-4"
            disabled={isPending || isLoading}
          />
          <label htmlFor="fixed" className="text-sm font-medium">
            Fixed amount payment
          </label>
        </div>

        {isFixed && (
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Amount (cUSD) *
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
              required={isFixed}
              disabled={isPending || isLoading}
            />
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isPending || isLoading || !isConnected}
          className="w-full"
          size="lg"
        >
          {isPending || isLoading ? 'Creating...' : 'Create Payment Link'}
        </Button>
      </form>
    </Card>
  );
}

