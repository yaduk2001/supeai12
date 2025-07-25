'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import Particles from '../../components/Particles';
import { FaHandshake, FaChartLine, FaBullhorn, FaBalanceScale, FaLightbulb, FaLeaf, FaAward, FaGlobe, FaRocket } from 'react-icons/fa';

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
      icon: <FaHandshake className="text-4xl text-cyan-400 drop-shadow-lg" />,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Operational Excellence',
      description: [
        'Talent planning, hiring & onboarding support.',
        'Financial tracking, reporting & budgeting.',
        'Project management workflow advisory.'
      ],
      icon: <FaChartLine className="text-4xl text-green-400 drop-shadow-lg" />,
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
      icon: <FaBullhorn className="text-4xl text-pink-400 drop-shadow-lg" />,
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      title: 'Legal & Compliance Safeguards',
      description: [
        'Drafting of NDAs, MoUs, contracts, SLAs.',
        'Guidance on IP, copyright & licensing.',
        'International contract & tax implications.'
      ],
      icon: <FaBalanceScale className="text-4xl text-yellow-400 drop-shadow-lg" />,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Technology & Innovation Advisory',
      description: [
        'AI tool integration & optimization.',
        'Cost-effective software stack recommendations.',
        'Emerging tech landscape analysis.'
      ],
      icon: <FaLightbulb className="text-4xl text-indigo-400 drop-shadow-lg" />,
      gradient: 'from-indigo-500 to-cyan-500',
    },
    {
      title: 'Sustainability & ESG Advisory',
      description: [
        'Sustainable business model development.',
        'ESG (Environmental, Social, Governance) compliance guidance.',
        'Green innovation and reporting support.'
      ],
      icon: <FaLeaf className="text-4xl text-lime-400 drop-shadow-lg" />,
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
      <div className={`min-h-screen bg-gradient-to-br from-[#051A05] via-[#005533] to-[#D1FFE6] transition-all duration-300 ${sidebarOpen ? 'ml-56' : ''} relative overflow-hidden`}> 
        {/* Animated background particles for extra visual interest */}
        <Particles className="absolute inset-0 z-0 pointer-events-none" color="#22c55e" />
        {/* Animated green floating shapes and parallax waves */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute w-[600px] h-[600px] bg-green-400/20 rounded-full blur-3xl left-[-15%] top-[-10%] animate-pulse" />
          <div className="absolute w-96 h-96 bg-emerald-400/20 rounded-full blur-2xl right-[-10%] top-[30%] animate-pulse" />
          <div className="absolute w-80 h-80 bg-lime-400/20 rounded-full blur-2xl left-[40%] bottom-[-10%] animate-pulse" />
          {/* SVG wave for extra green flair */}
          <svg className="absolute bottom-0 left-0 w-full h-32 md:h-48 z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#16a34a" fillOpacity="0.18" d="M0,224L60,197.3C120,171,240,117,360,117.3C480,117,600,171,720,197.3C840,224,960,224,1080,197.3C1200,171,1320,117,1380,90.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
        </div>
        {/* Hero Section */}
        <section className="py-24 lg:py-36 bg-gradient-to-br from-[#051A05] via-[#005533] to-[#D1FFE6] relative z-10 shadow-lg rounded-b-3xl">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#00FFC2] mb-6 tracking-tight leading-tight drop-shadow-lg">Business Consultancy</h1>
            <p className="text-xl md:text-2xl text-[#D1FFE6] mb-8 max-w-2xl mx-auto">Empowering your business with expert guidance, operational excellence, and innovative solutions. Unlock growth, efficiency, and global reach with our premium consultancy services.</p>
            <a href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#00FFC2] to-[#005533] text-[#051A05] font-bold rounded-full shadow-lg hover:scale-105 hover:from-[#00FFC2] hover:to-[#00FFC2] transition-all duration-300 text-lg">Get Started</a>
          </div>
        </section>

        {/* Features/Services Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {sections.map((section, idx) => (
                <div
                  key={section.title}
                  className="group relative bg-[#051A05]/80 backdrop-blur-lg rounded-3xl p-10 h-full overflow-hidden shadow-xl border border-[#00FFC2]/30 hover:border-[#00FFC2] transition-all duration-300 flex flex-col items-center hover:scale-[1.03]"
                >
                  <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00FFC2] via-[#005533] to-[#D1FFE6] shadow-lg group-hover:from-[#00FFC2] group-hover:to-[#005533] transition-all duration-300">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#00FFC2] mb-4 text-center group-hover:text-[#D1FFE6] transition-colors duration-300">
                    {section.title}
                  </h3>
                  <ul className="text-[#D1FFE6] leading-relaxed mb-6 list-disc list-inside space-y-1 text-left text-base">
                    {section.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features/Badges Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3 bg-[#005533]/80 rounded-xl px-6 py-4 shadow border border-[#00FFC2]/30">
                <FaAward className="text-2xl text-[#00FFC2]" />
                <span className="font-semibold text-[#D1FFE6]">Award-Winning Expertise</span>
              </div>
              <div className="flex items-center gap-3 bg-[#005533]/80 rounded-xl px-6 py-4 shadow border border-[#00FFC2]/30">
                <FaGlobe className="text-2xl text-[#00FFC2]" />
                <span className="font-semibold text-[#D1FFE6]">Global Reach</span>
              </div>
              <div className="flex items-center gap-3 bg-[#005533]/80 rounded-xl px-6 py-4 shadow border border-[#00FFC2]/30">
                <FaRocket className="text-2xl text-[#00FFC2]" />
                <span className="font-semibold text-[#D1FFE6]">Proven Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-[#051A05] via-[#005533] to-[#D1FFE6]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00FFC2] mb-4">What Our Clients Say</h2>
              <p className="text-lg text-[#D1FFE6]">Trusted by global leaders for our expertise, innovation, and results-driven approach.</p>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <div className="bg-[#005533]/90 rounded-2xl p-8 text-center shadow-lg border border-[#00FFC2]/30 animate-fade-in">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold text-[#00FFC2] mb-2">&quot;Supe AI&apos;s consultancy team helped us scale globally and optimize our operations. Highly recommended!&quot;</h3>
                <p className="text-[#D1FFE6] text-sm mt-2">— Alex Morgan, COO, GlobalTech</p>
              </div>
            </div>
          </div>
        </section>

        {/* Floating CTA Button */}
        <a href="/contact" className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-300 text-black font-bold shadow-2xl border-2 border-green-300 hover:border-green-400 transition-all duration-300 text-lg py-4 px-10 rounded-full animate-pulse hover:scale-105">
          Contact Our Experts
        </a>

        {/* Trust/Testimonials Section */}
        <section className="py-16 lg:py-24 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-green-200 mb-4">Why Choose Us?</h2>
              <p className="text-lg text-green-100">Trusted by global leaders for our expertise, innovation, and results-driven approach.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-2xl p-8 text-center shadow-lg border border-green-400/30">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-green-100 mb-2">Global Reach</h3>
                <p className="text-green-100 text-sm">Supporting clients in Australia, UK, and worldwide.</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-8 text-center shadow-lg border border-green-400/30">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold text-green-100 mb-2">Expert Team</h3>
                <p className="text-green-100 text-sm">Seasoned consultants with deep industry knowledge.</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-8 text-center shadow-lg border border-green-400/30">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-green-100 mb-2">Proven Results</h3>
                <p className="text-green-100 text-sm">Delivering measurable growth and operational excellence.</p>
              </div>
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
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-lime-300 mb-6 animate-gradient-x">
                Ready to Elevate Your Business?
              </h2>
              <p className="text-lg text-green-100 mb-8">
                Let&apos;s discuss how our consultancy services can drive growth and innovation for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="btn-primary bg-gradient-to-r from-green-400 via-emerald-400 to-lime-300 text-black font-bold shadow-lg hover:from-green-500 hover:to-lime-400 border-2 border-green-300 hover:border-green-400 transition-all duration-300 text-lg py-4 px-10 rounded-full animate-pulse"
                >
                  Contact Us
                </a>
                <a
                  href="/services"
                  className="btn-outline border-green-300 text-green-200 hover:bg-green-400/10 hover:text-green-300 transition-all duration-300 text-lg py-4 px-10 rounded-full"
                >
                  Explore All Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-[#00FFC2]/30 bg-[#051A05]">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[#D1FFE6]">
              © 2024 Supe AI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
