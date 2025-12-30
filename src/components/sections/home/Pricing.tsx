'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  badge: 'Pricing Plans',
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the perfect plan for your testing needs. All plans include core features with scalable options for growing teams.',
  plans: [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for individual developers and small projects',
      features: [
        'Up to 5 test environments',
        'Basic monitoring & alerts',
        'Email support',
        'Standard integrations',
        '10GB storage'
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=starter',
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Ideal for growing teams and advanced testing workflows',
      features: [
        'Up to 25 test environments',
        'Advanced monitoring & analytics',
        'Priority support',
        'All integrations',
        '100GB storage',
        'Custom workflows',
        'Team collaboration tools'
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=professional',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Unlimited test environments',
        'Enterprise-grade security',
        'Dedicated support manager',
        'Custom integrations',
        'Unlimited storage',
        'Advanced compliance',
        'SLA guarantees',
        'On-premise deployment'
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      popular: false
    }
  ]
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePlanClick = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground px-4 py-2 text-sm font-medium mb-6"
            >
              <span data-editable="badge">{config.badge}</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              <span data-editable="title">{config.title}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
          </div>

          {/* Pricing Cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {config.plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 ${
                  plan.popular
                    ? 'ring-2 ring-primary scale-105 shadow-lg'
                    : 'hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">
                      <span data-editable={`plans[${idx}].price`}>{plan.price}</span>
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-1">
                        <span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">
                          <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                            {feature}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanClick(plan.ctaHref)}
                    data-editable-href={`plans[${idx}].ctaHref`}
                    data-href={plan.ctaHref}
                    variant={plan.popular ? 'default' : 'outline'}
                    className={`w-full py-3 text-base font-medium transition-all duration-200 ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-border text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Note */}
          <div
            className={`text-center mt-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <p className="text-muted-foreground text-sm">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
