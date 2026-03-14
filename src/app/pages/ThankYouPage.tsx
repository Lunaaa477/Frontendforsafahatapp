import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { VintageLayout } from '../components/VintageLayout';
import { VintageButton } from '../components/VintageButton';
import { CheckCircle } from 'lucide-react';

export function ThankYouPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'client';

  useEffect(() => {
    if (userType === 'client') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userType, navigate]);

  return (
    <VintageLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-amber-50/80 border-4 border-amber-800 p-12 shadow-lg text-center">
          <CheckCircle className="w-24 h-24 text-green-700 mx-auto mb-6" strokeWidth={1.5} />
          
          <h2 className="text-3xl text-amber-900 font-serif mb-4">
            Thank You!
          </h2>

          {userType === 'consultant' ? (
            <div className="space-y-4">
              <p className="text-amber-800 font-serif leading-relaxed">
                Your account has been created successfully. Please wait until your account is verified.
              </p>
              <p className="text-amber-800 font-serif leading-relaxed">
                You will receive an email with verification status.
              </p>
              <VintageButton onClick={() => navigate('/')} className="mt-6">
                Return to Home
              </VintageButton>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-amber-800 font-serif leading-relaxed">
                Your account has been created successfully!
              </p>
              <p className="text-amber-700 font-serif text-sm italic">
                Redirecting you to login...
              </p>
            </div>
          )}
        </div>
      </div>
    </VintageLayout>
  );
}
