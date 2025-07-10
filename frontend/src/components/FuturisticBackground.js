'use client';

import BlobBackground from './BlobBackground';
import Particles from './Particles';
import TechIconsFloating from './TechIconsFloating';

const FuturisticBackground = ({ 
  showGrid = true,
  showBlobs = true,
  showParticles = true,
  showIcons = true,
  showOverlay = true,
  className = ""
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Decorative Grid Pattern */}
      {showGrid && (
        <div className="absolute inset-0 opacity-10 hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00FFC2" strokeWidth="0.1"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {/* Animated Background Blobs */}
      {showBlobs && (
        <>
          <BlobBackground 
            position="top-20 left-10" 
            size="w-72 h-72" 
            delay={0}
            className="hidden md:block"
          />
          <BlobBackground 
            position="top-40 right-10" 
            size="w-96 h-96" 
            delay={5}
            className="hidden md:block"
          />
          <BlobBackground 
            position="bottom-20 left-1/2" 
            size="w-80 h-80" 
            delay={10}
            className="hidden md:block"
          />
        </>
      )}

      {/* Glowing Gradient Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-radial from-[#00FFC2]/10 via-transparent to-transparent mix-blend-screen pointer-events-none" />
      )}

      {/* Particle Effects */}
      {showParticles && (
        <Particles 
          count={8}
          position="top-20 right-20"
          className="hidden lg:block"
        />
      )}

      {/* Floating AI Icons */}
      {showIcons && (
        <TechIconsFloating 
          className="hidden md:block"
        />
      )}
    </div>
  );
};

export default FuturisticBackground; 