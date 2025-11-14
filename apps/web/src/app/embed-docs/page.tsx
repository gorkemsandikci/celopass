import { Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function EmbedDocsPage() {
  const codeExample1 = `<script src="https://celopass.me/embed.js"></script>
<div data-celopass="your-username"></div>`;

  const codeExample2 = `<iframe 
  src="https://celopass.me/embed/your-username"
  width="100%"
  height="500"
  frameborder="0"
  style="border-radius: 8px;">
</iframe>`;

  return (
    <div className="container px-4 mx-auto max-w-4xl py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Embed Celopass on Your Website</h1>
        <p className="text-lg text-muted-foreground">
          Add payment buttons to your website in two simple ways
        </p>
      </div>

      {/* Method 1: Script Tag */}
      <Card className="p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Method 1: Script Tag (Recommended)</h2>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Add our embed script and a simple div tag. The widget will automatically load.
        </p>

        <div className="bg-muted p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>{codeExample1}</code>
          </pre>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Replace <code className="bg-blue-100 px-1 rounded">your-username</code> with your actual payment link username.
          </p>
        </div>
      </Card>

      {/* Method 2: Iframe */}
      <Card className="p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Method 2: Direct Iframe</h2>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Embed directly using an iframe. More control over styling and dimensions.
        </p>

        <div className="bg-muted p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>{codeExample2}</code>
          </pre>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong>Mobile Responsive</strong>
              <p className="text-sm text-muted-foreground">Works perfectly on all devices</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong>No Backend Required</strong>
              <p className="text-sm text-muted-foreground">Everything runs client-side</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong>Secure</strong>
              <p className="text-sm text-muted-foreground">Direct connection to Celo blockchain</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong>Customizable</strong>
              <p className="text-sm text-muted-foreground">Style the container to match your site</p>
            </div>
          </li>
        </ul>
      </Card>

      {/* Example */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4">Live Example</h2>
        <p className="text-muted-foreground mb-6">
          See how it looks on your site (replace with your username after creating a link):
        </p>
        <div className="bg-muted p-8 rounded-lg">
          <div data-celopass="demo" className="max-w-md mx-auto">
            <p className="text-center text-muted-foreground text-sm">
              Widget will appear here after you create a payment link
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

