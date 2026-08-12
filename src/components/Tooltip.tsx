'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tooltip({ children, content, side = 'top' }: { children: React.ReactNode, content: React.ReactNode, side?: 'top' | 'bottom' | 'left' | 'right' }) {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionStyles = (): React.CSSProperties => {
    switch (side) {
      case 'top': return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', paddingBottom: '8px' };
      case 'bottom': return { top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: '8px' };
      case 'left': return { right: '100%', top: '50%', transform: 'translateY(-50%)', paddingRight: '8px' };
      case 'right': return { left: '100%', top: '50%', transform: 'translateY(-50%)', paddingLeft: '8px' };
      default: return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', paddingBottom: '8px' };
    }
  };

  const getInitialOffset = () => {
    switch (side) {
      case 'top': return { y: 5, x: 0 };
      case 'bottom': return { y: -5, x: 0 };
      case 'left': return { y: 0, x: 5 };
      case 'right': return { y: 0, x: -5 };
    }
  };

  return (
    <div 
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <div style={{ position: 'absolute', ...getPositionStyles(), zIndex: 100, pointerEvents: 'none' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, ...getInitialOffset() }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{
                padding: '6px 10px',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px var(--border-color)'
              }}
            >
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
