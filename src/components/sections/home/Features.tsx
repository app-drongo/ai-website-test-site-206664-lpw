'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Zap, Shield, Users, Globe, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

const DEFAULT_FEATURES = {
  badge: 'Features',
  title: 'Everything You Need to Succeed',
  subtitle: 'Comprehensive tools and capabilities designed to streamline your workflow and accelerate your development process.',
  features: [
    {
      icon: 'Code',
      title: 'Clean Code Architecture',
      description: 'Well-structured, maintainable codebase following industry best practices and modern development standards.'
    },
    {
      icon: 'Zap',
      title: 'Lightning Fast Performance',
      description: 'Optimized for speed with efficient algorithms and minimal resource usage for maximum productivity.'
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level security protocols with end-to-end encryption and comprehensive data protection measures.'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Built-in collaboration tools that enable seamless teamwork and real-time project coordination.'
    },
    {
      icon: 'Globe',
      title: 'Global Scalability',
      description: 'Designed to scale globally with multi-region support and automatic load balancing capabilities.'
    },
    {
      icon: 'Lock',
      title: 'Data Privacy',
      description: 'Complete control over your data with privacy-first design and GDPR compliance built-in.'
    }
  ]
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="h-6 w-6" />;
      case 'Zap':
        return <Zap className="h-6 w-6" />;
      case 'Shield':
        return <Shield className="h-6 w-6" />;
      case 'Users':
        return <Users className="h-6 w-6" />;
      case 'Globe':
        return <Globe className="h-6 w-6" />;
      case 'Lock':
        return <Lock className="h-6 w-6" />;
      default:
        return <Code className="h-6 w-6" />;
    }
  };

  return (
    <section id="features" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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

          {/* Features Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {config.features.map((feature, idx) => (
              <Card
                key={idx}
                className="bg-card text-card-foreground border-border hover:bg-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
                      {getIcon(feature.icon)}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`features[${idx}].description`}>
                      {feature.description}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}