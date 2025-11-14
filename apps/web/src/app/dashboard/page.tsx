import CreateLinkForm from '@/components/CreateLinkForm';
import { WalletConnectButton } from '@/components/connect-button';

export default function DashboardPage() {
  return (
    <div className="container px-4 mx-auto max-w-7xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Create and manage your payment links
        </p>
      </div>

      <div className="mb-6 flex justify-end">
        <WalletConnectButton />
      </div>

      <CreateLinkForm />
    </div>
  );
}

