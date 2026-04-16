import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, X } from 'lucide-react';
import { useState } from 'react';

export function ClientHomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showAccountSidebar, setShowAccountSidebar] = useState(false);

  // Mock subscription data - replace with actual API
  const currentPlan = 'FREE'; // 'FREE', 'PRO', or 'ENTERPRISE'
  const aiScansUsedToday = 2;
  const maxScansPerDay = currentPlan === 'FREE' ? 3 : currentPlan === 'PRO' ? 25 : Infinity;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for count - replace with actual API
  const contactedConsultantsCount = 3;

  return (
    <VintageLayout showLogo={true}>
      <button
        onClick={() => setShowAccountSidebar(true)}
        className="absolute top-8 left-4 sm:left-6 flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity z-10 max-w-[calc(100%-2rem)] sm:max-w-none"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900 flex-shrink-0">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-amber-50" />
        </div>
        <div className="min-w-0">
          <p className="text-amber-900 font-serif text-sm sm:text-base truncate">{user?.name || user?.email}</p>
        </div>
      </button>

      <div className="max-w-4xl mx-auto mt-16 sm:mt-20 px-4 space-y-6">
        {/* Current Plan Display */}
        <div className="bg-amber-100/80 border-2 border-amber-700 p-4 sm:p-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-amber-900 font-serif text-base sm:text-lg">
                Current Plan: <span className="font-bold">{currentPlan}</span>
              </p>
              <p className="text-amber-800 font-serif text-sm">
                AI Scans Used Today: {aiScansUsedToday}{maxScansPerDay !== Infinity ? `/${maxScansPerDay}` : ' (Unlimited)'}
              </p>
            </div>
            {currentPlan === 'FREE' && (
              <VintageButton
                onClick={() => navigate('/client/subscription')}
                className="text-sm py-2 px-6 whitespace-nowrap"
              >
                Upgrade Plan
              </VintageButton>
            )}
          </div>
        </div>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-6 sm:p-8 md:p-12 shadow-lg space-y-4 sm:space-y-6">
          <VintageButton
            onClick={() => navigate('/client/ai-assistant')}
            className="w-full text-base sm:text-lg py-3 sm:py-4"
          >
            Upload Document to AI Assistant
          </VintageButton>

          <VintageButton
            onClick={() => navigate('/client/professionals')}
            className="w-full text-base sm:text-lg py-3 sm:py-4"
          >
            Contact a Professional Legal Consultant
          </VintageButton>

          {contactedConsultantsCount > 0 && (
            <VintageButton
              onClick={() => navigate('/client/contacted-assistants')}
              className="w-full text-base sm:text-lg py-3 sm:py-4"
            >
              Contacted Legal Assistants ({contactedConsultantsCount})
            </VintageButton>
          )}

          <VintageButton
            onClick={() => navigate('/client/document-library')}
            className="w-full text-base sm:text-lg py-3 sm:py-4"
          >
            My Document Library
          </VintageButton>
        </div>
      </div>

      {/* Account Sidebar */}
      {showAccountSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowAccountSidebar(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-amber-50 border-r-4 border-amber-800 shadow-2xl z-50 overflow-y-auto">
            <div className="p-6">
              <button
                onClick={() => setShowAccountSidebar(false)}
                className="absolute top-4 right-4 text-amber-900 hover:text-amber-700"
              >
                <X className="w-6 h-6" />
              </button>

              {/* User Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-amber-300">
                <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900">
                  <User className="w-8 h-8 text-amber-50" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-amber-900 font-serif text-lg truncate">
                    {user?.name || user?.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-amber-700 hover:text-amber-900 flex items-center gap-1 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-serif">Logout</span>
                  </button>
                </div>
              </div>

              {/* Subscription Button */}
              <VintageButton
                onClick={() => {
                  setShowAccountSidebar(false);
                  navigate('/client/subscription');
                }}
                className="w-full text-base py-3"
              >
                Safahat Subscription
              </VintageButton>
            </div>
          </div>
        </>
      )}

    </VintageLayout>
  );
}