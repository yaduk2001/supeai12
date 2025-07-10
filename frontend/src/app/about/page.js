'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const timeline = [
    {
      year: "2020",
      title: "Foundation",
      description: "Supe AI was founded with a vision to democratize artificial intelligence.",
      icon: "🚀"
    },
    {
      year: "2021",
      title: "First Product Launch",
      description: "Released our flagship AI automation platform to early adopters.",
      icon: "⚡"
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to serve clients across 25+ countries worldwide.",
      icon: "🌍"
    },
    {
      year: "2023",
      title: "AI Breakthrough",
      description: "Achieved breakthrough in real-time multilingual AI processing.",
      icon: "🧠"
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as a leading AI solutions provider for enterprises.",
      icon: "🏆"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Founder",
      avatar: "👩‍💼",
      description: "AI researcher with 15+ years in machine learning"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      avatar: "👨‍💻",
      description: "Former Google AI engineer, expert in neural networks"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Research",
      avatar: "👩‍🔬",
      description: "PhD in Computer Science, specialized in NLP"
    },
    {
      name: "Alex Thompson",
      role: "VP of Engineering",
      avatar: "👨‍🔧",
      description: "Scaled engineering teams at multiple tech companies"
    },
    {
      name: "Priya Patel",
      role: "Head of Product",
      avatar: "👩‍💼",
      description: "Product leader with focus on AI-driven solutions"
    },
    {
      name: "David Kim",
      role: "VP of Sales",
      avatar: "👨‍💼",
      description: "Enterprise sales expert in AI and automation"
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const quoteVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
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
      <div className={`min-h-screen bg-gradient-primary transition-all duration-300 ${sidebarOpen ? 'ml-56' : ''}`}>
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-8"
            >
              About{' '}
              <span className="text-gradient-primary">Supe AI</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            >
              Pioneering the future of artificial intelligence with innovative solutions 
              that empower businesses and individuals worldwide.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Our Mission
            </h2>
            <div className="card-glass p-12">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                To democratize artificial intelligence by providing accessible, powerful, and 
                ethical AI solutions that help businesses and individuals achieve their full 
                potential in an increasingly digital world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Our Vision
            </h2>
            
            {/* Glowing Divider */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-accent-cyan to-accent-green mx-auto mb-12 shadow-glow"
            />
            
            <div className="card-glass p-12">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">🔮</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Future-Focused</h3>
                  <p className="text-gray-300">Building tomorrow&#39;s AI solutions today</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Human-Centered</h3>
                  <p className="text-gray-300">AI that enhances human potential</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Global Impact</h3>
                  <p className="text-gray-300">Transforming industries worldwide</p>
                </motion.div>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                To be the leading force in AI innovation, creating a future where intelligent 
                technology seamlessly integrates into every aspect of business and daily life, 
                making the world more efficient, connected, and human-centered.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Quote */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            variants={quoteVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="card-glow p-12 relative overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-accent-cyan/20 to-accent-green/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-accent-mint/20 to-accent-cyan/20 rounded-full blur-3xl"
              />
              
              <div className="relative z-10">
                <div className="text-6xl mb-6">💡</div>
                <blockquote className="text-3xl md:text-4xl font-bold text-white mb-4">
                  &quot;Innovation is our DNA&quot;
                </blockquote>
                <p className="text-xl text-gray-300">
                  — Supe AI Team
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From startup to industry leader - the milestones that shaped our growth
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-cyan to-accent-green"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-accent-cyan rounded-full shadow-glow z-10"></div>
                  
                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className="card-glass p-6">
                      <div className="flex items-center mb-4">
                        <div className="text-2xl mr-4">{item.icon}</div>
                        <div>
                          <div className="text-accent-cyan font-bold text-lg">{item.year}</div>
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
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
              Ready to Join Our Mission?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Let&#39;s work together to transform your business with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/test"
                className="btn-primary"
              >
                Try Our API
              </Link>
              <Link
                href="/contact"
                className="btn-outline"
              >
                Get in Touch
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