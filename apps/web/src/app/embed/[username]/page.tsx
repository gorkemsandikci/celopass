import PaymentWidget from '@/components/PaymentWidget';

interface PageProps {
  params: {
    username: string;
  };
}

export default function EmbedPage({ params }: PageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <PaymentWidget username={params.username} embedMode={true} />
      </div>
    </div>
  );
}

