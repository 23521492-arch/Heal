import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Leaf, Brain, Activity, Lightning, Moon,
  CheckCircle, User, Chat, Star, Check, Sparkle, TrendUp, BookOpen,
  ShieldCheck, Heart, Crown
} from 'phosphor-react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const updatePosition = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", updatePosition, { passive: true });
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return scrollPosition;
};

const AuroraBackground = React.memo(() => (
    <div 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#5E8B7E]/10 blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-soft-light" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#D97757]/10 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-soft-light" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#A5B4FC]/10 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
));

// --- PREMIUM COMPONENTS ---
const FadeIn = React.memo(({ children, delay = 0, className = "", direction = "up" }) => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(true);
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const directions = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
  };

  return (
      <div
          ref={ref}
          style={{ transitionDelay: `${delay}ms` }}
          className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
              isVisible
                  ? 'opacity-100 translate-y-0 translate-x-0'
                  : `opacity-0 ${directions[direction]}`
          } ${className}`}
      >
        {children}
      </div>
  );
});

const PremiumCard = React.memo(({ children, className = "", hoverEffect = true }) => (
    <div className={`relative overflow-hidden rounded-3xl border border-stone-200/50 dark:border-white/5 bg-white/40 dark:bg-stone-900/40 backdrop-blur-md ${hoverEffect ? 'transition-all duration-500 hover:border-stone-300/80 dark:hover:border-white/20 hover:shadow-2xl hover:shadow-stone-900/5 hover:-translate-y-1' : ''} ${className}`}>
      {/* Specular Highlight */}
      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none" aria-hidden="true" />
      {/* Inner Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" aria-hidden="true" />
      {children}
    </div>
));

const Badge = React.memo(({ children, icon: Icon, color = "sage" }) => {
  const colors = {
    sage: "bg-[#5E8B7E]/10 text-[#5E8B7E] border-[#5E8B7E]/20",
    rose: "bg-[#D97757]/10 text-[#D97757] border-[#D97757]/20",
    indigo: "bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20",
  };

  return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wide uppercase ${colors[color]}`}>
        {Icon && <Icon size={12} weight="fill" aria-hidden="true" />}
        <span>{children}</span>
      </div>
  );
});

const BentoItem = React.memo(({ icon: Icon, title, description, className = "", delay = 0, accent = "sage" }) => (
    <FadeIn delay={delay} className={`h-full ${className}`}>
      <PremiumCard className="h-full p-8 flex flex-col justify-between group">
        <div className="mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
              accent === 'sage' ? 'bg-[#5E8B7E]/10 text-[#5E8B7E]' : 'bg-stone-100 dark:bg-white/10 text-stone-900 dark:text-white'
          }`} aria-hidden="true">
            <Icon size={24} weight="duotone" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-white tracking-tight mb-2">{title}</h3>
          <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm font-medium">{description}</p>
        </div>

        {/* Subtle background decoration */}
        <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
            accent === 'sage' ? 'bg-[#5E8B7E]/20' : 'bg-stone-500/10'
        }`} aria-hidden="true" />
      </PremiumCard>
    </FadeIn>
));

const CustomStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    :root {
      --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
    }
    
    body {
      font-family: var(--font-display);
      -webkit-font-smoothing: antialiased;
    }
    
    .animate-blob {
      animation: blob 20s infinite alternate;
    }
    
    @keyframes blob {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }

    /* Premium Text Selection */
    ::selection {
      background: rgba(94, 139, 126, 0.2);
      color: #5E8B7E;
    }
  `}</style>
);

// --- SECTIONS ---

const Navbar = React.memo(({ onSignup, onLogin }) => {
  const isScrolled = useScrollPosition() > 20;

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavClick = useCallback((e, item) => {
    e.preventDefault();
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const navItems = useMemo(() => ['Features', 'Pricing', 'Testimonials', 'About'], []);

  return (
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ${
            isScrolled ? 'bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-stone-200/50 dark:border-white/5 py-3' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#5E8B7E] focus:ring-offset-2 rounded-lg"
            aria-label="Heal - Go to homepage"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5E8B7E] to-[#4A7C6F] text-white shadow-lg shadow-[#5E8B7E]/20" aria-hidden="true">
              <Leaf size={20} weight="fill" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">Heal</span>
          </button>
        </div>

        <nav 
          className="hidden md:flex items-center gap-1 rounded-full border border-stone-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 p-1 backdrop-blur-md"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
              <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className="rounded-full px-5 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 transition-colors hover:bg-white dark:hover:bg-white/10 hover:text-[#5E8B7E] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5E8B7E] focus:ring-offset-2"
                  aria-label={`Navigate to ${item} section`}
              >
                {item}
              </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onLogin} 
            className="text-sm font-semibold text-stone-600 dark:text-stone-300 hover:text-[#5E8B7E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5E8B7E] focus:ring-offset-2 rounded-lg px-2"
            aria-label="Log in to your account"
          >
            Log in
          </button>
          <button
              onClick={onSignup}
              className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#5E8B7E] px-6 text-sm font-bold text-white shadow-lg shadow-[#5E8B7E]/20 transition-all hover:bg-[#4A7C6F] hover:shadow-[#5E8B7E]/40 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5E8B7E] focus:ring-offset-2"
              aria-label="Get started with Heal - Sign up for free"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
          </button>
        </div>
      </header>
  );
});

const HeroSection = React.memo(({ onSignup }) => {
  const handleExploreClick = useCallback(() => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section 
      className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden pt-32 pb-20"
      aria-labelledby="hero-heading"
    >
      <div className="layout-content-container relative z-10 flex flex-col items-center text-center max-w-[1200px] mx-auto px-4">
        <FadeIn delay={100} className="mt-8">
          <h1 
            id="hero-heading"
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-[-0.03em] leading-[0.9] text-stone-900 dark:text-white mb-8 max-w-5xl mx-auto drop-shadow-sm"
          >
            Master your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E8B7E] via-[#4A7C6F] to-[#D97757]">inner world.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            The most elegant way to track your mood, build habits, and journal.
            Designed for clarity, built for peace of mind.
          </p>
        </FadeIn>

        <FadeIn delay={300} className="flex flex-wrap items-center justify-center gap-4">
          <button
              onClick={onSignup}
              className="group relative h-14 px-8 rounded-full bg-[#5E8B7E] text-white text-lg font-bold shadow-xl shadow-[#5E8B7E]/25 transition-all hover:bg-[#4A7C6F] hover:shadow-[#5E8B7E]/40 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5E8B7E] focus:ring-offset-2"
              aria-label="Start your healing journey - Sign up for free"
          >
            Start Healing Free
          </button>
          <button
              onClick={handleExploreClick}
              className="h-14 px-8 rounded-full bg-white dark:bg-white/10 text-stone-900 dark:text-white text-lg font-bold ring-1 ring-stone-200 dark:ring-white/20 hover:bg-stone-50 dark:hover:bg-white/20 transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#5E8B7E] focus:ring-offset-2"
              aria-label="Explore Heal features"
          >
            Explore Features
          </button>
        </FadeIn>
      </div>
    </section>
  );
});

const FeaturesSection = React.memo(() => (
    <section 
      id="features" 
      className="py-32 px-4 relative"
      aria-labelledby="features-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        <FadeIn className="mb-20 text-center md:text-left">
          <Badge icon={Lightning} color="indigo">Powerful Tools</Badge>
          <h2 
            id="features-heading"
            className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-stone-900 dark:text-white max-w-xl"
          >
            Everything you need,<br/>nothing you don't.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]" role="list">
          <BentoItem
              icon={Activity}
              title="Mood Tracking"
              description="Visualize your emotional journey with our beautiful, interactive charts. Spot patterns you never knew existed."
              className="md:col-span-2"
              delay={0}
              accent="sage"
          />
          <BentoItem
              icon={Moon}
              title="Sleep Analysis"
              description="Understand how your rest affects your mental state. Syncs with your natural rhythm."
              className="md:col-span-1"
              delay={100}
              accent="indigo"
          />
          <BentoItem
              icon={CheckCircle}
              title="Habit Building"
              description="Form lasting habits with our streak system. Gentle reminders that actually help."
              className="md:col-span-1"
              delay={200}
              accent="sage"
          />
          <BentoItem
              icon={BookOpen}
              title="Reflective Journaling"
              description="A safe space for your thoughts. Daily prompts guided by therapists to help you dig deeper."
              className="md:col-span-2"
              delay={300}
              accent="rose"
          />
          <BentoItem
              icon={ShieldCheck}
              title="Private & Secure"
              description="Your data is encrypted and yours alone. We sell peace of mind, not data."
              className="md:col-span-1"
              delay={400}
              accent="sage"
          />
          <BentoItem
              icon={Brain}
              title="AI Insights"
              description="Personalized recommendations based on your unique behavioral patterns."
              className="md:col-span-1"
              delay={500}
              accent="indigo"
          />
          <BentoItem
              icon={User}
              title="Community"
              description="Connect with others on the same journey. Heal together."
              className="md:col-span-1"
              delay={600}
              accent="rose"
          />
        </div>
      </div>
    </section>
));

const PricingCard = React.memo(({ name, price, period, features, featured = false, onSignup, delay }) => {
  const handleSignup = useCallback(() => {
    onSignup();
  }, [onSignup]);

  return (
    <FadeIn delay={delay} className="h-full">
      <PremiumCard className={`h-full p-8 flex flex-col ${featured ? 'border-[#5E8B7E] dark:border-[#5E8B7E] bg-[#5E8B7E]/5' : ''}`}>
        {featured && (
            <div className="absolute top-0 left-0 right-0 py-1.5 bg-[#5E8B7E] text-white text-center text-xs font-bold uppercase tracking-wider" aria-label="Most Popular Plan">
              Most Popular
            </div>
        )}
        <div className={`flex-1 ${featured ? 'pt-6' : ''}`}>
          <h3 className="text-lg font-bold opacity-80 mb-2">{name}</h3>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-black tracking-tight">${price}</span>
            <span className="opacity-60 font-medium">/{period}</span>
          </div>
          <ul className="flex flex-col gap-4 mb-8" role="list">
            {features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-stone-600 dark:text-stone-300">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${featured ? 'bg-[#5E8B7E] text-white' : 'bg-stone-200 dark:bg-white/10 text-stone-500'}`} aria-hidden="true">
                    <Check size={10} weight="bold" />
                  </div>
                  <span>{feat}</span>
                </li>
            ))}
          </ul>
        </div>
        <button
            onClick={handleSignup}
            className={`w-full h-12 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#5E8B7E] focus:ring-offset-2 ${
                featured
                    ? 'bg-[#5E8B7E] text-white hover:bg-[#4A7C6F] shadow-lg shadow-[#5E8B7E]/20 hover:shadow-[#5E8B7E]/40 hover:-translate-y-0.5'
                    : 'bg-stone-100 dark:bg-white/10 text-stone-900 dark:text-white hover:bg-stone-200 dark:hover:bg-white/20'
            }`}
            aria-label={`Choose ${name} plan - ${price} per ${period}`}
        >
          Choose {name}
        </button>
      </PremiumCard>
    </FadeIn>
  );
});

const PricingSection = React.memo(({ onSignup }) => (
    <section 
      id="pricing" 
      className="py-32 px-4 relative"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <Badge icon={Crown} color="sage">Premium Value</Badge>
          <h2 
            id="pricing-heading"
            className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-stone-900 dark:text-white mb-6"
          >
            Invest in your mind.
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400">
            Transparent pricing. Cancel anytime. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" role="list">
          <PricingCard
              name="Free"
              price="0"
              period="forever"
              features={['Mood tracking', '3 Habits', 'Basic Journal', 'Community Access']}
              onSignup={onSignup}
              delay={0}
          />
          <PricingCard
              name="Pro Monthly"
              price="9.99"
              period="month"
              featured={true}
              features={['Unlimited Habits', 'Advanced Analytics', 'AI Insights', 'Priority Support', 'Custom Themes', 'Export Data']}
              onSignup={onSignup}
              delay={100}
          />
          <PricingCard
              name="Pro Yearly"
              price="79.99"
              period="year"
              features={['All Pro features', '2 Months Free', 'Lifetime Data Export', '1-on-1 Coaching Session']}
              onSignup={onSignup}
              delay={200}
          />
        </div>
      </div>
    </section>
));

const TestimonialsSection = React.memo(() => {
  const testimonials = useMemo(() => [
    {
      name: "Sarah J.",
      role: "Pro Member",
      quote: "Heal isn't just an app, it's my daily anchor. The interface is so beautiful it actually makes me want to journal.",
      avatar: "S",
      gradient: "from-[#5E8B7E] to-[#4A7C6F]"
    },
    {
      name: "Michael R.",
      role: "Pro Member",
      quote: "I've tried every mood tracker out there. This is the only one that feels like a premium tool for my mind, not a spreadsheet.",
      avatar: "M",
      gradient: "from-[#D97757] to-[#d95757]"
    }
  ], []);

  return (
    <section 
      id="testimonials" 
      className="py-32 px-4 relative bg-stone-50/50 dark:bg-white/5"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        <FadeIn className="text-center mb-20">
          <h2 
            id="testimonials-heading"
            className="text-4xl font-black tracking-tight mb-6"
          >
            Real Stories
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list">
          {testimonials.map((testimonial, index) => (
            <PremiumCard key={index} className="p-8" role="listitem">
              <div className="flex gap-1 text-[#5E8B7E] mb-4" aria-label="5 out of 5 stars" role="img">
                {[...Array(5)].map((_,i) => (
                  <Star key={i} weight="fill" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-lg italic text-stone-700 dark:text-stone-300 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div 
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} text-white flex items-center justify-center font-bold`}
                  aria-hidden="true"
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-stone-500">{testimonial.role}</div>
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
});

const Footer = React.memo(() => {
  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const footerLinks = useMemo(() => ({
    Product: ['Features', 'Pricing', 'Updates'],
    Company: ['About', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms']
  }), []);

  return (
    <footer 
      className="py-20 px-4 border-t border-stone-200 dark:border-white/10 bg-white dark:bg-[#0F172A]"
      role="contentinfo"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 text-[#5E8B7E] focus:outline-none focus:ring-2 focus:ring-[#5E8B7E] focus:ring-offset-2 rounded-lg"
            aria-label="Heal - Go to homepage"
          >
            <Leaf size={24} weight="fill" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">Heal</span>
          </button>
          <p className="text-stone-500 text-sm max-w-xs">
            Built with care for your mental well-being. <br/>
            © 2025 Heal Inc. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-16 flex-wrap" aria-label="Footer navigation">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="font-bold text-stone-900 dark:text-white">{category}</h4>
              {links.map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-stone-500 hover:text-[#5E8B7E] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#5E8B7E] focus:ring-offset-2 rounded"
                  aria-label={`${link} - ${category}`}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
});

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSignup = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
      <>
        {/* Skip to main content for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#5E8B7E] focus:text-white focus:rounded-lg focus:shadow-lg"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        
        <div 
          className="min-h-screen selection:bg-[#5E8B7E] selection:text-white relative bg-[#FAFAF9] dark:bg-[#0F172A]" 
          data-theme="light"
        >
          <CustomStyles />
          <AuroraBackground />
          <Navbar onLogin={handleLogin} onSignup={handleSignup} />
          <main id="main-content" className="relative z-10">
            <HeroSection onSignup={handleSignup} />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection onSignup={handleSignup} />
          </main>
          <Footer />
        </div>
      </>
  );
}
