import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

export function ClientHomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <VintageLayout showLogo={true}>
      <div className="absolute top-8 left-4 sm:left-6 flex items-center gap-2 sm:gap-3 z-10 max-w-[calc(100%-2rem)] sm:max-w-none">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900 flex-shrink-0">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-amber-50" />
        </div>
        <div className="min-w-0">
          <p className="text-amber-900 font-serif text-sm sm:text-base truncate">{user?.name || user?.email}</p>
          <button
            onClick={handleLogout}
            className="text-xs sm:text-sm text-amber-700 hover:text-amber-900 flex items-center gap-1"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-16 sm:mt-20 px-4">
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
        </div>
      </div>
    </VintageLayout>
  );
}