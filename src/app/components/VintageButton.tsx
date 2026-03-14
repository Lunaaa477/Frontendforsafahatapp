import { ButtonHTMLAttributes, ReactNode } from 'react';

interface VintageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function VintageButton({ children, variant = 'primary', className = '', ...props }: VintageButtonProps) {
  const baseStyles = 'px-8 py-3 border-2 transition-all duration-200 font-serif tracking-wide';
  const variants = {
    primary: 'bg-amber-800 text-amber-50 border-amber-900 hover:bg-amber-900 disabled:bg-amber-600 disabled:cursor-not-allowed',
    secondary: 'bg-transparent text-amber-900 border-amber-800 hover:bg-amber-100',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
