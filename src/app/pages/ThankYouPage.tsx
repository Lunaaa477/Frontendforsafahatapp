import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../components/VintageLayout';
import { VintageButton } from '../components/VintageButton';
import { CheckCircle } from 'lucide-react';

export function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <VintageLayout>
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-amber-50/80 border-4 border-amber-800 p-6 sm:p-12 shadow-lg text-center">
          <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-700 mx-auto mb-6" strokeWidth={1.5} />
          
          <h2 className="text-2xl sm:text-3xl text-amber-900 font-serif mb-4">
            Thank You!
          </h2>

          <div className="space-y-4">
            <p className="text-amber-800 font-serif leading-relaxed text-sm sm:text-base">
              Your account has been created successfully!
            </p>
            <p className="text-amber-700 font-serif text-sm italic">
              Redirecting you to login...
            </p>
          </div>
        </div>
      </div>
    </VintageLayout>
  );
}