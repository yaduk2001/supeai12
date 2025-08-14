'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import FuturisticBackground from '../components/FuturisticBackground';
import UserMenu from '../components/UserMenu';
import { useAuth } from '../contexts/AuthContext';
import StaticLogo from '../components/StaticLogo';

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

      {/* Enhanced Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent-blue rounded-full opacity-60 glow-effect"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent-blueMedium rounded-full opacity-40 glow-effect"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-accent-blueLight rounded-full opacity-50 glow-effect"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-accent-blue rounded-full opacity-30 glow-effect"
        />
      </div>

      {/* Enhanced Header Navigation */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 mirror-effect"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
                             <motion.div 
                 className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-accent-blue shadow-lg glow-effect"
                 whileHover={{ scale: 1.05, rotate: 5 }}
                 transition={{ duration: 0.3 }}
               >
                 <StaticLogo
                   className="w-full h-full"
                   width={40}
                   height={40}
                 />
               </motion.div>
              <div className="flex flex-col">
                                 <span className="text-white font-bold text-xl group-hover:text-[#146EE9] transition-colors">
                   Supe AI
                 </span>
                <span className="text-xs text-accent-blue mt-1 font-medium tracking-wide animate-pulse-slow">
                  Empowering Intelligence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
                         <nav className="hidden md:flex items-center space-x-8">
               <Link href="/about" className="text-white hover:text-[#146EE9] transition-colors">About</Link>
               <Link href="/services" className="text-white hover:text-[#146EE9] transition-colors">Services</Link>
               <Link href="/contact" className="text-white hover:text-[#146EE9] transition-colors">Contact</Link>
               <Link href="/chat" className="text-white hover:text-[#146EE9] transition-colors">Chat</Link>
             </nav>

            {/* Auth Buttons (right side) */}
            {/* Removed duplicate auth buttons. Only UserMenu is used for auth controls. */}
            {/* <div className="hidden md:flex items-center space-x-2"> ... </div> */}

            {/* Mobile Menu Button */}
                         <button
               className="md:hidden flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#146EE9]"
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
                             <Link href="/about" className="text-white text-lg font-semibold hover:text-[#146EE9] transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
               <Link href="/services" className="text-white text-lg font-semibold hover:text-[#146EE9] transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</Link>
               <Link href="/contact" className="text-white text-lg font-semibold hover:text-[#146EE9] transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
               <Link href="/chat" className="text-white text-lg font-semibold hover:text-[#146EE9] transition-colors" onClick={() => setMobileMenuOpen(false)}>Chat</Link>
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
                         {/* Enhanced Badge */}
             <motion.div
               variants={itemVariants}
               className="inline-flex items-center px-6 py-3 bg-accent-blue/20 border border-accent-blue/40 rounded-full text-white text-sm font-semibold mb-8 backdrop-blur-sm"
               whileHover={{ scale: 1.05, y: -2 }}
               transition={{ duration: 0.3 }}
             >
               <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
               AI-Powered Enterprise Solutions
             </motion.div>

                         {/* Main Heading */}
             <motion.h1
               variants={itemVariants}
               className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
             >
               <span className="block">Transforming</span>
               <span className="block">Enterprises</span>
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

                         {/* Enhanced CTA Buttons */}
             <motion.div
               variants={itemVariants}
               className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
             >
               <motion.div
                 whileHover={{ scale: 1.05, y: -5 }}
                 whileTap={{ scale: 0.95 }}
                 className="relative"
               >
                 <Link
                   href="/auth/signup"
                   className="btn-primary inline-block"
                 >
                   <span className="relative z-10">Get Started</span>
                 </Link>
               </motion.div>
               <motion.div
                 whileHover={{ scale: 1.05, y: -5 }}
                 whileTap={{ scale: 0.95 }}
                 className="relative"
               >
                 <Link
                   href="/chat"
                   className="btn-primary inline-block"
                 >
                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                   </svg>
                   Chat with AI
                 </Link>
               </motion.div>
               <motion.div
                 whileHover={{ scale: 1.05, y: -5 }}
                 whileTap={{ scale: 0.95 }}
                 className="relative"
               >
                 <Link
                   href="/contact"
                   className="btn-primary inline-block"
                 >
                   Contact Us
                 </Link>
               </motion.div>
             </motion.div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm"
            >
              <motion.div 
                className="flex items-center glow-effect"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse glow-effect"></span>
                Trusted by 500+ companies
              </motion.div>
              <motion.div 
                className="flex items-center glow-effect"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse glow-effect"></span>
                ISO 27001 Certified
              </motion.div>
              <motion.div 
                className="flex items-center glow-effect"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse glow-effect"></span>
                99.9% Uptime SLA
              </motion.div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/60 hover:text-white cursor-pointer glow-effect"
                whileHover={{ scale: 1.2, color: '#146EE9' }}
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
                         <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/20 rounded-3xl p-10 md:p-16 shadow-2xl border border-accent-blue/40 flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <div className="flex-1 text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Business Consultancy</h2>
                <p className="text-lg text-gray-300 mb-6 max-w-xl">Unlock growth, operational excellence, and global market access with Supe AI&apos;s expert business consultancy. From client acquisition to legal, marketing, and tech innovation, our team empowers your business to thrive in any market.</p>
                <Link href="/consultancy" className="btn-primary inline-block">Learn More</Link>
              </div>
                             <div className="flex-1 flex items-center justify-center">
                 <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-accent-blue to-accent-blueMedium flex items-center justify-center shadow-xl">
                   <svg className="w-16 h-16 md:w-24 md:h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                   </svg>
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
               Our Capabilities
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
                          <div className="w-2 h-2 bg-accent-blue rounded-full mr-3" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Hover effect line */}
                                         <motion.div
                       className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent-blue to-accent-blueMedium"
                       initial={{ width: 0 }}
                       whileHover={{ width: '100%' }}
                       transition={{ duration: 0.3 }}
                     />
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Business Consultancy Card (add to main offerings grid/section) */}
                         <div className="group relative bg-gradient-to-br from-blue-900/40 to-blue-700/10 rounded-2xl p-8 shadow-lg hover:scale-105 transition-transform duration-300 border border-accent-blue/30">
              <a href="/consultancy" className="absolute inset-0 z-10" tabIndex="-1" aria-label="Business Consultancy" />
              <div className="flex items-center mb-4">
                                 <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-accent-blue to-accent-blueMedium text-white shadow-lg mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                                 <h3 className="text-2xl font-bold text-white group-hover:text-accent-blue transition-colors duration-300">Business Consultancy</h3>
              </div>
              <p className="text-gray-300 mb-4">Expert guidance for client acquisition, operational excellence, marketing, legal, and technology innovation. Grow and safeguard your business with Supe AI&apos;s consultancy services.</p>
                             <span className="inline-block mt-2 text-accent-blue font-semibold">Learn More →</span>
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
               What Our Clients Say
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
               Ready to Transform Your Business?
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

      {/* Contact Details Section */}
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
               Get in Touch
             </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your business? Let&apos;s start a conversation about how we can help you achieve your goals.
            </p>
          </motion.div>

                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
             {/* Email */}
             <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               viewport={{ once: true }}
               className="card-glow p-6 text-center"
             >
               <div className="text-4xl mb-4">📧</div>
               <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                               <a href="mailto:contact@supeai.in" className="text-accent-blue hover:text-white transition-colors">
                 contact@supeai.in
               </a>
             </motion.div>

             {/* India Office */}
             <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true }}
               className="card-glow p-6 text-center"
             >
               <div className="text-4xl mb-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", "Noto Color Emoji"' }}>🇮🇳</div>
               <h3 className="text-xl font-bold text-white mb-2">India Office</h3>
               <div className="flex flex-col items-center">
                                   <a href="tel:+918075851517" className="text-accent-blue hover:text-white transition-colors">
                    +91 8075851517
                  </a>
                  <span className="text-xs text-accent-blue mt-1">Business Development Manager</span>
               </div>
             </motion.div>

             {/* UK Office */}
             <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               viewport={{ once: true }}
               className="card-glow p-6 text-center"
             >
               <div className="text-4xl mb-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", "Noto Color Emoji"' }}>🇬🇧</div>
               <h3 className="text-xl font-bold text-white mb-2">UK/London</h3>
                               <a href="tel:+447404465149" className="text-accent-blue hover:text-white transition-colors">
                 +44 7404 465149
               </a>
             </motion.div>

             {/* Australia Office */}
             <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               viewport={{ once: true }}
               className="card-glow p-6 text-center"
             >
               <div className="text-4xl mb-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", "Noto Color Emoji"' }}>🇦🇺</div>
               <h3 className="text-xl font-bold text-white mb-2">Australia</h3>
                               <a href="tel:+61468371679" className="text-accent-blue hover:text-white transition-colors">
                 +61 468 371 679
               </a>
             </motion.div>
           </div>

          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {/* Kochi Office */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="card-glow p-6 text-center"
            >
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-white mb-2">Kochi Office</h3>
              <p className="text-gray-300 text-sm">Edappally, Kochi, Kerala, India</p>
            </motion.div>

            {/* Sydney Office */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="card-glow p-6 text-center"
            >
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-white mb-2">Sydney Office</h3>
              <p className="text-gray-300 text-sm">1/8 Arthur St, Ryde NSW 2112</p>
            </motion.div>

            {/* London Office */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="card-glow p-6 text-center"
            >
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-white mb-2">London Office</h3>
              <p className="text-gray-300 text-sm">E16 3RU, London, UK</p>
            </motion.div>
          </motion.div>

                     {/* Social Links */}
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.9 }}
             viewport={{ once: true }}
             className="mt-12 text-center"
           >
             <div className="flex justify-center space-x-6">
               <a href="https://www.linkedin.com/company/supe-ai/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-accent-blue transition-colors">
                 <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                 </svg>
               </a>
               <a href="https://t.me/+UD-_HA-hjqYyYTc9" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-accent-blue transition-colors">
                 <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.264-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                 </svg>
               </a>
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
