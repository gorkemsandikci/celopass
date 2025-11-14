import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Wallet, Globe, Code } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/15 transition-colors">
              <Zap className="h-4 w-4" />
              Built on Celo
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Accept payments in{" "}
              <span className="text-primary">cUSD</span> in 2 minutes
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Create payment links, embed on your website, or use celopass.me. 
              No code. No bank account. Just your Celo wallet.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/dashboard">
                <Button size="lg" className="px-8 py-3 text-base font-medium">
                  Create Payment Link
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="px-8 py-3 text-base font-medium">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Two Ways to Use Celopass
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose what works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standalone */}
            <div className="p-8 bg-background rounded-lg border shadow-sm hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">Standalone</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Use celopass.me to create and manage your payment links. 
                Perfect for freelancers and small businesses.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Create payment links instantly
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Share links via social media
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Track all transactions
                </li>
              </ul>
            </div>

            {/* Embed Widget */}
            <div className="p-8 bg-background rounded-lg border shadow-sm hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Code className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">Embed Widget</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Add a payment button to your website with one line of code. 
                Works on any site, no backend needed.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  One-line integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Customizable styling
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Mobile responsive
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Connect Wallet</h3>
              <p className="text-muted-foreground">
                Connect your Celo wallet (MetaMask, MiniPay, or any WalletConnect wallet)
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Create Link</h3>
              <p className="text-muted-foreground">
                Choose a username and set amount (or leave variable). Get your link in seconds.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Paid</h3>
              <p className="text-muted-foreground">
                Share your link or embed on your site. Receive payments instantly in cUSD.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
