import PaymentWidget from '@/components/PaymentWidget';

interface PageProps {
  params: {
    username: string;
  };
}

export default function PaymentPage({ params }: PageProps) {
  return (
    <div className="container px-4 mx-auto max-w-2xl py-12">
      <PaymentWidget username={params.username} />
    </div>
  );
}

