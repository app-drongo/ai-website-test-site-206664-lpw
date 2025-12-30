'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CTA = {
  badge: 'Ready to Get Started?',
  title: 'Transform Your Testing Workflow Today',
  subtitle: 'Join thousands of developers who trust our platform for reliable, scalable testing solutions. Start your free trial and experience the difference.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'Schedule Demo',
  secondaryCtaHref: '/demo',
  features: [
    'No credit card required',
    '14-day free trial',
    'Full feature access',
    'Cancel anytime'
  ]
} as const;

type CallToActionProps = Partial<typeof DEFAULT_CTA>;

export default function CallToAction(props: CallToActionProps) {
  const config = { ...DEFAULT_CTA, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="cta" className="bg-primary text-primary-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Badge
              variant="secondary"
              className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 px-4 py-2 text-sm font-medium"
            >
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Content */}
          <div
            className={`mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
              <span data-editable="title">{config.title}</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3 text-lg font-medium group"
              >
                <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground px-8 py-3 text-lg font-medium"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
          </div>

          {/* Features List */}
          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  <span data-editable={`features[${idx}]`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
