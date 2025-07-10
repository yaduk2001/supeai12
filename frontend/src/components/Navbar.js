'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Communicate sidebar state to the rest of the app
  useEffect(() => {
    const event = new CustomEvent('sidebar-toggle', { detail: open });
    window.dispatchEvent(event);
  }, [open]);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/chat', label: 'Chat' },
  ];

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Hotspot to trigger sidebar */}
      <div
        className="fixed left-0 top-0 h-screen w-4 z-50 cursor-pointer"
        onMouseEnter={() => setOpen(true)}
      />
      {/* Sidebar Navbar */}
      <nav
        className={`fixed left-0 top-0 h-screen w-48 z-50 flex flex-col items-center py-10 px-2 rounded-r-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        style={{ willChange: 'transform' }}
      >
        {/* Softer glowing/gradient background for the Navbar only */}
        <div className="absolute inset-0 rounded-r-2xl pointer-events-none z-0 bg-gradient-to-br from-[#00FFC2]/30 via-[#005533]/20 to-black/70 shadow-xl">
          <div className="absolute inset-0 blur-md opacity-30 bg-accent-cyan/20" />
        </div>
        <div className="relative z-10 flex flex-col items-center w-full h-full">
          <Link 
            href="/" 
            className="flex flex-col items-center mb-10 select-none group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div 
              className="relative w-10 h-10 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm mb-2 shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-[90%] h-[90%]"
              >
                <motion.img 
                  src="/images/20250709_145127_890.jpg"
                  alt="Supe AI Logo"
                  className="w-full h-full object-contain transform transition-all duration-300"
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    rotate: isHovered ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {open && (
                <motion.div 
                  className="flex flex-col items-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.span 
                    variants={textVariants}
                    className="text-white font-extrabold text-lg tracking-wide"
                  >
                    Supe AI
                  </motion.span>
                  <motion.span 
                    variants={textVariants}
                    className="text-xs text-accent-cyan mt-1 font-medium tracking-wide"
                  >
                    Empowering Intelligence
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          <AnimatePresence>
            {open && (
              <motion.div 
                className="flex flex-col space-y-2 w-full mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  >
              <Link
                href={link.href}
                className={`relative flex items-center px-4 py-3 rounded-lg text-white/90 hover:bg-white/15 hover:text-accent-cyan transition-colors duration-200 w-full text-base font-semibold tracking-wide group ${
                  pathname === link.href ? 'bg-white/15 text-accent-cyan font-bold shadow-md' : ''
                }`}
              >
                {/* Left accent bar for active link */}
                <span className={`absolute left-0 top-2 bottom-2 w-1 rounded bg-accent-cyan transition-all duration-200 ${pathname === link.href ? 'opacity-100' : 'opacity-0'}`}></span>
                <span className="pl-2 transition-transform duration-200 group-hover:translate-x-1">{link.label}</span>
              </Link>
                  </motion.div>
            ))}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Optional: Company copyright */}
          <AnimatePresence>
            {open && (
              <motion.div 
                className="mt-auto mb-2 text-xs text-gray-400 text-center w-full opacity-80 select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
            © 2024 Supe AI
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}