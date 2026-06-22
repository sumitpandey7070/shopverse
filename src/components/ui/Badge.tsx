import React from 'react';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'amber' | 'info' | 'dark';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
  success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
  amber: 'bg-gradient-to-r from-amber-500 to-amber-400 text-white',
  info: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
  dark: 'bg-dark-card text-slate-400 border border-dark-border',
};

const sizeClasses = {
  xs: 'text-[10px] px-1.5 py-0.5',
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', size = 'sm', className = '' }) => (
  <span className={`inline-flex items-center font-semibold rounded-full whitespace-nowrap ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
    {children}
  </span>
);

export default Badge;
