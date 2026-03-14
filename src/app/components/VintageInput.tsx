import { InputHTMLAttributes, forwardRef } from 'react';

interface VintageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const VintageInput = forwardRef<HTMLInputElement, VintageInputProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-amber-900 mb-2 font-serif">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 text-amber-900 placeholder:text-amber-500 focus:outline-none focus:border-amber-700 transition-colors ${className}`}
          {...props}
        />
      </div>
    );
  }
);

VintageInput.displayName = 'VintageInput';
