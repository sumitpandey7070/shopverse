import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-5xl',
  full: 'max-w-7xl',
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md', className = '' }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${sizes[size]} dark:bg-dark-surface bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${className}`}
          >
            {title && (
              <div className="flex items-center justify-between p-5 border-b dark:border-dark-border border-slate-200">
                <h3 className="text-lg font-bold dark:text-white text-slate-800">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 transition-colors"
                >
                  <FiX className="w-5 h-5 dark:text-slate-400 text-slate-500" />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl dark:bg-dark-card bg-white/80 dark:hover:bg-dark-muted hover:bg-slate-100 transition-colors shadow-lg"
              >
                <FiX className="w-5 h-5 dark:text-slate-300 text-slate-600" />
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
