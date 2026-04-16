import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Plan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isCurrent?: boolean;
  isPopular?: boolean;
}

export function SubscriptionPage() {
  const navigate = useNavigate();
  const [showPaymentRedirect, setShowPaymentRedirect] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Mock current plan - replace with actual user data
  const currentPlan = 'FREE';

  const plans: Plan[] = [
    {
      name: 'FREE',
      price: 0,
      period: 'AED/mo',
      description: 'For casual freelancers.',
      features: [
        '3 AI Scans/per day',
        'Basic Risk Highlighting',
        'Standard PR Redaction',
        'Consultant Directory Access',
      ],
      buttonText: 'Current Plan',
      isCurrent: currentPlan === 'FREE',
    },
    {
      name: 'PRO',
      price: 49,
      period: 'AED/mo',
      description: 'For active professionals.',
      features: [
        '25 AI Scans/per day',
        'Advanced Trap Detection',
        'Priority Legal Matching',
        'Full Contract History',
      ],
      buttonText: 'Upgrade to Pro',
      isPopular: true,
    },
    {
      name: 'ENTERPRISE',
      price: 199,
      period: 'AED/mo',
      description: 'For growing agencies.',
      features: [
        'Unlimited AI Scans',
        'Bulk Document Upload',
        'Dedicated Account Support',
        'Custom API Integration',
      ],
      buttonText: 'Go Enterprise',
    },
  ];

  const handleUpgrade = (planName: string) => {
    if (planName === currentPlan) {
      toast.info('You are already on this plan');
      return;
    }

    setSelectedPlan(planName);
    setShowPaymentRedirect(true);

    setTimeout(() => {
      setShowPaymentRedirect(false);
      toast.success(`Successfully upgraded to ${planName}!`);
      navigate('/client/home');
    }, 2000);
  };

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/client/home')}
          className="mb-6 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl text-amber-900 font-serif mb-3 tracking-wide">
            Safahat Subscription Plans
          </h1>
          <p className="text-amber-700 font-serif text-sm sm:text-base">
            Choose the right level of AI legal protection for your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-amber-50/80 border-4 p-6 sm:p-8 shadow-lg relative ${
                plan.isPopular
                  ? 'border-amber-800 bg-amber-100/80'
                  : 'border-amber-700'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-800 text-amber-50 px-4 py-1 text-xs font-serif tracking-wider">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl text-amber-900 font-serif mb-2 tracking-wider">
                  {plan.name}
                </h2>
                <div className="mb-3">
                  <span className="text-4xl sm:text-5xl text-amber-900 font-serif font-bold">
                    {plan.price}
                  </span>
                  <span className="text-amber-700 font-serif ml-2">
                    {plan.period}
                  </span>
                </div>
                <p className="text-amber-700 font-serif text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-900 font-serif text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <VintageButton
                onClick={() => handleUpgrade(plan.name)}
                variant={plan.isCurrent ? 'secondary' : 'primary'}
                disabled={plan.isCurrent}
                className="w-full"
              >
                {plan.buttonText}
              </VintageButton>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Redirect Modal */}
      {showPaymentRedirect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-amber-50 border-4 border-amber-800 p-8 max-w-md w-full mx-4 text-center">
            <Loader2 className="w-16 h-16 text-amber-700 animate-spin mx-auto mb-4" />
            <p className="text-amber-900 font-serif text-lg">
              Redirecting to payment terminal...
            </p>
          </div>
        </div>
      )}
    </VintageLayout>
  );
}
