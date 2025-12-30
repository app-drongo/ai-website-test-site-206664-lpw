'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAV = {
  brand: 'Test Site',
  links: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Get Started', href: '#cta' }
  ],
  ctaText: 'Sign Up',
  ctaHref: '/signup'
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAV>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAV, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleLinkClick('#hero')}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              <span data-editable="brand">{config.brand}</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {config.links.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.href)}
                  data-editable-href={`links[${index}].href`}
                  data-href={link.href}
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  <span data-editable={`links[${index}].label`}>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={handleCtaClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border">
              {config.links.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.href)}
                  data-editable-href={`links[${index}].href`}
                  data-href={link.href}
                  className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium w-full text-left transition-colors"
                >
                  <span data-editable={`links[${index}].label`}>{link.label}</span>
                </button>
              ))}
              <div className="pt-4">
                <Button
                  onClick={handleCtaClick}
                  data-editable-href="ctaHref"
                  data-href={config.ctaHref}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <span data-editable="ctaText">{config.ctaText}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
