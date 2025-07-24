'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

export default function ConsultancyPage() {
  const [sidebarOpen, 
    setSidebarOpen] = useState(false);
  useEffect(() => {
    const handler = (e) => setSidebarOpen(e.detail);
    window.addEventListener('sidebar-toggle', handler);
    return () => window.removeEventListener('sidebar-toggle', handler);
  }, []);

  const sections = [
    {
      title: 'Client Acquisition & Growth',
      description: [
        'New client sourcing via extensive networks.',
        'Strategic B2B partnerships.',
        'Global market entry support (Australia, UK).',
        'Proposal, pitch, and quotation assistance.',
        'Targeted cold outreach campaigns.',
        'Direct project sourcing from existing clients.'
      ],
      icon: '🤝',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Operational Excellence',
      description: [
        'Talent planning, hiring & onboarding support.',
        'Financial tracking, reporting & budgeting.',
        'Project management workflow advisory.'
      ],
      icon: '📈',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Marketing & Brand Authority',
      description: [
        'Comprehensive brand strategy & virtual branding.',
        'Full-spectrum social media marketing management.',
        'Advanced SEO optimization & website enhancement.',
        'Integrated advertising campaigns (digital & IRL).',
        '2D & 3D creative content development.'
      ],
      icon: '🚀',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      title: 'Legal & Compliance Safeguards',
      description: [
        'Drafting of NDAs, MoUs, contracts, SLAs.',
        'Guidance on IP, copyright & licensing.',
        'International contract & tax implications.'
      ],
      icon: '⚖️',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Technology & Innovation Advisory (Optional)',
      description: [
        'AI tool integration & optimization.',
        'Cost-effective software stack recommendations.',
        'Emerging tech landscape analysis.'
      ],
      icon: '💡',
      gradient: 'from-indigo-500 to-cyan-500',
    },
    {
      title: 'Sustainability & ESG Advisory',
      description: [
        'Sustainable business model development.',
        'ESG (Environmental, Social, Governance) compliance guidance.',
        'Green innovation and reporting support.'
      ],
      icon: '🌱',
      gradient: 'from-green-400 to-lime-500',
    },
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
                variants={cardVariants}
                className="text-5xl md:text-7xl font-bold text-white mb-8"
              >
                Core Business Consultancy Services
              </motion.h1>
              <motion.p
                variants={cardVariants}
                className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12"
              >
                Empowering your business with expert guidance, operational excellence, and innovative solutions.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Business Consultancy Sections Grid */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {sections.map((section, idx) => (
                <motion.div
                  key={section.title}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  <div className="card-glow p-8 h-full relative overflow-hidden">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-cyan/20 to-accent-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Gradient overlay on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${section.gradient} mb-6 text-white text-4xl shadow-lg`}>
                        {section.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient-primary transition-colors duration-300">
                        {section.title}
                      </h3>
                      <ul className="text-gray-300 leading-relaxed mb-6 list-disc list-inside space-y-1 text-left">
                        {section.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
                Ready to Elevate Your Business?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Let&#39;s discuss how our business consultancy services can drive growth and innovation for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="btn-primary"
                >
                  Contact Us
                </a>
                <a
                  href="/services"
                  className="btn-outline"
                >
                  Explore All Services
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
    </>
  );
}
