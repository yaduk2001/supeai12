'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const industries = [
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Construction",
      description: "AI-powered project management and safety monitoring for construction sites. Optimize workflows and reduce risks with intelligent automation.",
      gradient: "from-orange-500 to-red-500",
      features: ["Safety Monitoring", "Project Management", "Resource Optimization"]
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: "Logistics",
      description: "Smart route optimization and real-time tracking solutions. Streamline supply chains and improve delivery efficiency with predictive analytics.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Route Optimization", "Real-time Tracking", "Supply Chain Analytics"]
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Education",
      description: "Personalized learning experiences and intelligent tutoring systems. Transform education with adaptive AI that enhances student engagement.",
      gradient: "from-purple-500 to-pink-500",
      features: ["Personalized Learning", "Intelligent Tutoring", "Student Analytics"]
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: "Retail",
      description: "Customer behavior analysis and inventory management automation. Boost sales and optimize operations with AI-driven retail insights.",
      gradient: "from-green-500 to-emerald-500",
      features: ["Customer Analytics", "Inventory Management", "Sales Optimization"]
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Finance",
      description: "Fraud detection and automated financial analysis tools. Secure transactions and make data-driven decisions with intelligent financial AI.",
      gradient: "from-yellow-500 to-orange-500",
      features: ["Fraud Detection", "Financial Analytics", "Risk Assessment"]
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Healthcare",
      description: "Medical diagnosis assistance and patient care optimization. Improve healthcare outcomes with AI-powered diagnostic and treatment support.",
      gradient: "from-red-500 to-pink-500",
      features: ["Medical Diagnosis", "Patient Care", "Treatment Support"]
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Marketing",
      description: "Customer segmentation and campaign optimization automation. Drive better ROI with AI-powered marketing analytics and personalization.",
      gradient: "from-indigo-500 to-purple-500",
      features: ["Customer Segmentation", "Campaign Optimization", "Marketing Analytics"]
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "Manufacturing",
      description: "Smart factory automation and predictive maintenance solutions. Enhance production efficiency and reduce downtime with AI-driven manufacturing insights.",
      gradient: "from-teal-500 to-emerald-500",
      features: ["Predictive Maintenance", "Quality Control", "Process Optimization"]
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Real Estate",
      description: "Intelligent property valuation and market analysis tools. Make data-driven real estate decisions with AI-powered insights and automated property management.",
      gradient: "from-rose-500 to-pink-500",
      features: ["Property Valuation", "Market Analysis", "Smart Property Management"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const handler = (e) => setSidebarOpen(e.detail);
    window.addEventListener('sidebar-toggle', handler);
    return () => window.removeEventListener('sidebar-toggle', handler);
  }, []);

  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-gradient-to-br from-[#0A0F1A] via-[#1A2332] via-[#0F2A1A] to-[#0A0F1A] relative overflow-hidden`}>
        
        {/* Enhanced Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-blue/30 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent-green/40 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent-blueMedium/20 rounded-full animate-float" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent-green/30 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent-blue/50 rounded-full animate-float" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
          <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-accent-green/25 rounded-full animate-float" style={{ animationDelay: '5s', animationDuration: '10s' }}></div>
          <div className="absolute top-1/4 right-1/2 w-3 h-3 bg-accent-blueLight/30 rounded-full animate-float" style={{ animationDelay: '2.5s', animationDuration: '8.5s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-accent-green/35 rounded-full animate-float" style={{ animationDelay: '1.5s', animationDuration: '7.5s' }}></div>
        </div>

        {/* Enhanced Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center bg-gradient-to-br from-[#0A0F1A]/50 via-[#1A2332]/30 via-[#0F2A1A]/40 to-[#0A0F1A]/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10 shadow-2xl">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 glow-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Our <span className="text-gradient-primary">Services</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Comprehensive AI solutions designed to transform your business and drive innovation across all industries.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button className="btn-primary neon-border px-8 py-4 text-lg font-semibold">
                  Try Our API
                </button>
                <button className="btn-outline mirror-effect px-8 py-4 text-lg font-semibold">
                  Get Custom Quote
                </button>
              </motion.div>
            </div>
          </div>
        </section>

      {/* Services Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#0A0F1A]/30 via-[#1A2332]/20 via-[#0F2A1A]/25 to-[#0A0F1A]/30 rounded-3xl p-8 border border-white/10">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.title}
                  className="card-glow p-8 mirror-effect group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 via-accent-green/20 to-accent-blueMedium/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{industry.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{industry.title}</h3>
                    <p className="text-gray-300 mb-6">{industry.description}</p>
                    <ul className="space-y-2">
                      {industry.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <span className="text-accent-blue mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-accent-green/5 to-accent-blueMedium/5 opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#1A2332]/20 via-[#0A0F1A]/30 via-[#0F2A1A]/20 to-[#1A2332]/20 rounded-3xl p-8 border border-white/10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Why Choose Supe AI?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our cutting-edge technology and expert team ensure you get the best AI solutions tailored to your needs.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.title}
                  className="card-glow p-6 mirror-effect text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{industry.title}</h3>
                  <p className="text-gray-300">{industry.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Let&#39;s discuss how our AI solutions can drive innovation and growth for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="btn-outline"
              >
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
    </>
  );
} 