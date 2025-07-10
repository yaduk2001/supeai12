'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function UserMenu() {
  const { user, signOut, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/auth/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-white hover:text-[#00FFC2] transition-colors duration-300"
          >
            Sign In
          </motion.button>
        </Link>
        <Link href="/auth/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/90 text-black font-semibold rounded-full hover:from-[#00FFC2]/90 hover:to-[#00FFC2] transition-all duration-300 shadow-lg"
          >
            Sign Up
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/80 rounded-full flex items-center justify-center">
          <span className="text-black font-semibold text-sm">
            {user?.user_metadata?.full_name 
              ? user.user_metadata.full_name.charAt(0).toUpperCase()
              : user?.email?.charAt(0).toUpperCase() || 'U'
            }
          </span>
        </div>
        <span className="text-white font-medium hidden sm:block">
          {user?.user_metadata?.full_name || user?.email || 'User'}
        </span>
        <motion.svg
          className="w-4 h-4 text-white"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50"
          >
            <div className="p-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/80 rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold">
                    {user?.user_metadata?.full_name 
                      ? user.user_metadata.full_name.charAt(0).toUpperCase()
                      : user?.email?.charAt(0).toUpperCase() || 'U'
                    }
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                    </svg>
                    <span>Dashboard</span>
                  </motion.button>
                </Link>

                <Link href="/profile">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </motion.button>
                </Link>

                <Link href="/settings">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </motion.button>
                </Link>
              </div>

              {/* Sign Out */}
              <div className="pt-2 border-t border-white/10">
                <motion.button
                  onClick={handleSignOut}
                  whileHover={{ x: 5 }}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 