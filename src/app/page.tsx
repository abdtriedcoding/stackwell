import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Palette, Zap, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--primary)/5%,transparent)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Building in public
          </div>

          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
            Scale your team,
            <br />
            <span className="text-primary">not your bill.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Zero seat tax. Full white-labeling. One unified platform for agencies that want to scale
            without the software overhead.
          </p>

          <div className="mt-12 flex justify-center gap-4">
            <Button size="lg">
              Start building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Book demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Users className="h-6 w-6 text-primary" />}
              title="Zero Seat Tax"
              description="Unlimited team members. Hire 2 or 20—your software bill never changes."
            />
            <FeatureCard
              icon={<Palette className="h-6 w-6 text-primary" />}
              title="No Vanity Tax"
              description="White-labeling included. Your clients see your brand, never ours."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-primary" />}
              title="Unified Context"
              description="Projects, files, invoices—everything in one place. No more tool hopping."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-muted/50 py-32">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold">Get started in minutes</h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <StepCard
              number="01"
              title="Sign up"
              description="Create your workspace. Invite your team—for free."
            />
            <StepCard
              number="02"
              title="White-label"
              description="Upload your logo. Set your colors. Your portal, styled."
            />
            <StepCard
              number="03"
              title="Launch"
              description="Add clients. Create projects. Run your agency."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-4xl font-bold">Ready to scale without limits?</h2>
          <p className="mt-4 text-muted-foreground">
            14-day free trial. No credit card required. Cancel anytime.
          </p>
          <Button size="lg" className="mt-10">
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Stackwell</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="text-5xl font-bold text-primary/20 font-mono">{number}</span>
      <p className="mt-4 text-lg font-medium">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
