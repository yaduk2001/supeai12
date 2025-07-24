'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import FuturisticBackground from '../components/FuturisticBackground';
import UserMenu from '../components/UserMenu';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const { user, logout } = useAuth();

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect for hero subtitle
  const typingTexts = [
    "Supe AI delivers scalable, multilingual, real-time automation",
    "Transform your business with cutting-edge AI technology",
    "Intelligent solutions for the modern enterprise",
    "Empowering enterprises with next-generation AI"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % typingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [typingTexts.length]);

  // Animated counter hook
  const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const [ref, setRef] = useState(null);

    useEffect(() => {
      if (!ref) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            let start = 0;
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
          }
        },
        { threshold: 0.5 }
      );
      
      observer.observe(ref);
      return () => observer.disconnect();
    }, [ref, end, duration]);

    return [count, setRef];
  };

  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-4v-4m0 0V8m0 4h4m-4 0H8" />
        </svg>
      ),
      title: "Customer Insights AI",
      description: "Unlock actionable insights from your customer data with advanced AI analytics and segmentation.",
      gradient: "from-orange-500 to-pink-500",
      features: ["Customer Analytics", "Segmentation", "Predictive Insights"],
      color: "orange"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real-Time AI",
      description: "Get instant insights and responses with our real-time AI processing capabilities.",
      gradient: "from-cyan-500 to-blue-500",
      features: ["Instant Processing", "Live Analytics", "Real-time Insights"],
      color: "cyan"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      title: "Multilingual AI",
      description: "Break language barriers with our advanced multilingual AI that understands and responds in any language.",
      gradient: "from-green-500 to-emerald-500",
      features: ["50+ Languages", "Cultural Context", "Accurate Translation"],
      color: "green"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </svg>
      ),
      title: "AI-Powered Marketing",
      description: "Boost your brand and reach with AI-driven marketing automation, analytics, and personalization.",
      gradient: "from-pink-500 to-red-500",
      features: ["Campaign Automation", "Audience Insights", "Personalized Content"],
      color: "pink"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z" />
        </svg>
      ),
      title: "Data Security & Compliance",
      description: "Protect your business with advanced AI-driven security and compliance solutions.",
      gradient: "from-yellow-500 to-orange-500",
      features: ["AI Security", "Compliance Automation", "Risk Management"],
      color: "yellow"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechFlow Inc",
      content: "Supe AI transformed our customer service operations. Response times improved by 80% while maintaining quality.",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, Global Solutions",
      content: "The multilingual capabilities are incredible. We can now serve customers in 15 different languages seamlessly.",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI, InnovateCorp",
      content: "The real-time processing and automation features have revolutionized our workflow. Highly recommended!",
      avatar: "👩‍🔬",
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { number: 99.9, label: "Uptime", icon: "⚡", suffix: "%" },
    { number: 50, label: "Languages", icon: "🌐", suffix: "+" },
    { number: 24, label: "Support", icon: "🛡️", suffix: "/7" },
    { number: 10, label: "Faster", icon: "🚀", suffix: "x" }
  ];
  const countUp0 = useCountUp(stats[0].number);
  const countUp1 = useCountUp(stats[1].number);
  const countUp2 = useCountUp(stats[2].number);
  const countUp3 = useCountUp(stats[3].number);
  const countUpStates = [countUp0, countUp1, countUp2, countUp3];

  return (
    <div className="min-h-screen bg-gradient-primary overflow-hidden relative">
      {/* Reusable Futuristic Background */}
      <FuturisticBackground />

      {/* Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-cyan rounded-full opacity-60 hidden lg:block"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent-green rounded-full opacity-40 hidden lg:block"
      />

      {/* Header Navigation */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div 
                className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-accent-cyan shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="/images/20250709_145127_890.jpg" 
                  alt="Supe AI Logo" 
                  className="w-full h-full object-contain rounded-lg"
                  style={{ maxHeight: '2.5rem', background: 'white' }}
                img/>
              </motion.div>
              <span className="text-white font-bold text-xl group-hover:text-[#00FFC2] transition-colors">
                Supe AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-white hover:text-[#00FFC2] transition-colors">About</Link>
              <Link href="/services" className="text-white hover:text-[#00FFC2] transition-colors">Services</Link>
              <Link href="/core_services" className="text-white hover:text-[#00FFC2] transition-colors">Core Services</Link>
              <Link href="/contact" className="text-white hover:text-[#00FFC2] transition-colors">Contact</Link>
              <Link href="/chat" className="text-white hover:text-[#00FFC2] transition-colors">Chat</Link>
            </nav>

            {/* Auth Buttons (right side) */}
            {/* Removed duplicate auth buttons. Only UserMenu is used for auth controls. */}
            {/* <div className="hidden md:flex items-center space-x-2"> ... </div> */}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFC2]"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              {/* Three dots icon */}
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>

            {/* User Menu (unchanged) */}
            <UserMenu />
          </div>
        </div>
        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden absolute top-16 left-0 right-0 bg-black/90 border-b border-white/10 z-50 py-4 shadow-xl animate-fade-in">
            <div className="flex flex-col items-center space-y-4">
              <Link href="/about" className="text-white text-lg font-semibold hover:text-[#00FFC2] transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/services" className="text-white text-lg font-semibold hover:text-[#00FFC2] transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link href="/core_services" className="text-white text-lg font-semibold hover:text-[#00FFC2] transition-colors" onClick={() => setMobileMenuOpen(false)}>Core Services</Link>
              <Link href="/contact" className="text-white text-lg font-semibold hover:text-[#00FFC2] transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/chat" className="text-white text-lg font-semibold hover:text-[#00FFC2] transition-colors" onClick={() => setMobileMenuOpen(false)}>Chat</Link>
            </div>
          </div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Supe AI Logo */}
          {/* Remove the logo from the hero section (center of the page) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-6 py-3 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full text-accent-cyan text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-accent-cyan rounded-full mr-2 animate-pulse"></span>
              AI-Powered Enterprise Solutions
            </motion.div>

            {/* Main Heading with Gradient Animation */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
            >
              <motion.span 
                className="block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(90deg, #00FFC2, #005533, #00FFC2)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Transforming
              </motion.span>
              <span className="block text-gradient-primary drop-shadow-lg">Enterprises</span>
              <span className="block">with AI</span>
            </motion.h1>
            
            {/* Animated Subheading */}
            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto h-12 md:h-16 flex items-center justify-center"
            >
              <motion.p
                key={currentText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute"
              >
                {typingTexts[currentText]}
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href="/auth/signup"
                  className="btn-primary inline-block"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href="/chat"
                  className="btn-secondary inline-block"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat with AI
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href="/contact"
                  className="btn-outline inline-block"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm"
            >
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Trusted by 500+ companies
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                ISO 27001 Certified
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                99.9% Uptime SLA
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/60 hover:text-white cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            {/* Business Consultancy Panel */}
            <div className="bg-gradient-to-br from-cyan-900/60 to-cyan-700/20 rounded-3xl p-10 md:p-16 shadow-2xl border border-accent-cyan/40 flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <div className="flex-1 text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Business Consultancy</h2>
                <p className="text-lg text-gray-300 mb-6 max-w-xl">Unlock growth, operational excellence, and global market access with Supe AI&apos;s expert business consultancy. From client acquisition to legal, marketing, and tech innovation, our team empowers your business to thrive in any market.</p>
                <Link href="/consultancy" className="btn-primary inline-block">Learn More</Link>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl">
                  <span className="text-7xl md:text-9xl">🤝</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-gradient-primary">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how our AI solutions can transform your business operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                variants={cardHoverVariants}
                whileHover="hover"
                className="group relative"
              >
                <div className="card-glow p-8 h-full relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  <div className="relative z-10">
                    {/* Animated Icon */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6 text-white shadow-lg`}
                    >
                      {service.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <div className="w-2 h-2 bg-accent-cyan rounded-full mr-3" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Hover effect line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent-cyan to-accent-green"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Business Consultancy Card (add to main offerings grid/section) */}
            <div className="group relative bg-gradient-to-br from-cyan-900/40 to-cyan-700/10 rounded-2xl p-8 shadow-lg hover:scale-105 transition-transform duration-300 border border-accent-cyan/30">
              <a href="/consultancy" className="absolute inset-0 z-10" tabIndex="-1" aria-label="Business Consultancy" />
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-3xl shadow-lg mr-4">🤝</div>
                <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors duration-300">Business Consultancy</h3>
              </div>
              <p className="text-gray-300 mb-4">Expert guidance for client acquisition, operational excellence, marketing, legal, and technology innovation. Grow and safeguard your business with Supe AI&apos;s consultancy services.</p>
              <span className="inline-block mt-2 text-accent-cyan font-semibold">Learn More →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const [count, setRef] = countUpStates[index];
              return (
                <motion.div
                  key={index}
                  ref={setRef}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div 
                    className="text-4xl mb-2"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {count}{stat.suffix}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="text-gradient-primary">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by industry leaders worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                variants={cardHoverVariants}
                whileHover="hover"
                className="card-glow p-8 rounded-2xl"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-gradient-primary">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of companies already using Supe AI to revolutionize their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/test" className="btn-primary">
                Start Free Trial
              </Link>
              <Link href="/contact" className="btn-outline">
                Schedule Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Supe AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
