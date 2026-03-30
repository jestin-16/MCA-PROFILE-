import React from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hover = true }) => {
  return (
    <div className={cn(
      "glass rounded-2xl p-6",
      hover && "glass-hover",
      className
    )}>
      {children}
    </div>
  );
};
