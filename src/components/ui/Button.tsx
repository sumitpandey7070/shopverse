import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'amber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-white shadow-glow-primary hover:shadow-lg',
  secondary: 'dark:bg-dark-card bg-white dark:text-white text-slate-800 dark:border-dark-border border-slate-200 border hover:dark:bg-dark-muted hover:bg-slate-100',
  ghost: 'bg-transparent dark:text-white text-slate-700 hover:dark:bg-dark-card hover:bg-slate-100',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  amber: 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white shadow-glow-amber',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-2xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary', size = 'md', loading = false,
  leftIcon, rightIcon, fullWidth = false, children, className = '', disabled, ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </motion.button>
  );
};

export default Button;
