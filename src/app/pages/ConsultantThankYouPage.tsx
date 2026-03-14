import { useNavigate } from 'react-router';
import { VintageLayout } from '../components/VintageLayout';
import { VintageButton } from '../components/VintageButton';
import { Mail, Clock } from 'lucide-react';

export function ConsultantThankYouPage() {
  const navigate = useNavigate();

  return (
    <VintageLayout>
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-amber-50/80 border-4 border-amber-800 p-6 sm:p-12 shadow-lg text-center">
          <div className="flex justify-center gap-4 mb-6">
            <Mail className="w-16 h-16 sm:w-20 sm:h-20 text-amber-700" strokeWidth={1.5} />
            <Clock className="w-16 h-16 sm:w-20 sm:h-20 text-amber-700" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-2xl sm:text-3xl text-amber-900 font-serif mb-6">
            Registration Submitted Successfully!
          </h2>

          <div className="space-y-6 mb-8">
            <div className="p-4 bg-amber-100/50 border-2 border-amber-300">
              <p className="text-amber-900 font-serif leading-relaxed text-sm sm:text-base">
                Thank you for registering as a Legal Consultant on Safahat.
              </p>
            </div>

            <div className="p-4 bg-yellow-100/50 border-2 border-yellow-600">
              <p className="text-amber-900 font-serif leading-relaxed text-sm sm:text-base font-semibold mb-2">
                ⏳ Verification Required
              </p>
              <p className="text-amber-800 font-serif leading-relaxed text-sm sm:text-base">
                Your account is currently pending verification by our admin team. This process ensures the quality and credibility of all consultants on our platform.
              </p>
            </div>

            <div className="p-4 bg-blue-100/50 border-2 border-blue-600">
              <p className="text-amber-900 font-serif leading-relaxed text-sm sm:text-base font-semibold mb-2">
                📧 Check Your Email
              </p>
              <p className="text-amber-800 font-serif leading-relaxed text-sm sm:text-base">
                If your account is approved, you will receive a verification email with instructions to activate your account and log in.
              </p>
            </div>

            <p className="text-amber-700 font-serif text-sm italic">
              Please allow 1-3 business days for the verification process.
            </p>
          </div>

          <VintageButton onClick={() => navigate('/')} className="w-full sm:w-auto">
            Return to Home
          </VintageButton>
        </div>
      </div>
    </VintageLayout>
  );
}
