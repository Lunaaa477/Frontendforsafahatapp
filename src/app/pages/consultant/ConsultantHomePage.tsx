import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, AlertCircle } from 'lucide-react';

export function ConsultantHomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Mock data - replace with actual API calls
  const newRequestsCount = 3;
  const openedRequestsCount = 5;
  const finishedRequestsCount = 12;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <VintageLayout showLogo={true}>
      <button
        onClick={() => navigate('/consultant/profile')}
        className="absolute top-8 left-4 sm:left-6 flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity z-10 max-w-[calc(100%-2rem)] sm:max-w-none"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900 flex-shrink-0">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-amber-50" />
        </div>
        <div className="min-w-0">
          <p className="text-amber-900 font-serif text-sm sm:text-base truncate">{user?.name || user?.email}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className="text-xs sm:text-sm text-amber-700 hover:text-amber-900 flex items-center gap-1"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>
      </button>

      <div className="max-w-2xl mx-auto mt-16 sm:mt-20 px-4">
        <div className="bg-amber-50/80 border-4 border-amber-800 p-6 sm:p-8 md:p-12 shadow-lg space-y-4 sm:space-y-6">
          <div className="relative">
            <VintageButton
              onClick={() => navigate('/consultant/requests/new')}
              className="w-full text-lg py-4"
            >
              New Unopened Requests
            </VintageButton>
            {newRequestsCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-serif border-2 border-amber-900">
                {newRequestsCount}
              </div>
            )}
            {newRequestsCount > 0 && (
              <AlertCircle className="absolute -top-2 -left-2 w-6 h-6 text-red-600" />
            )}
          </div>

          <div className="relative">
            <VintageButton
              onClick={() => navigate('/consultant/requests/open')}
              className="w-full text-lg py-4"
            >
              Opened Requests
            </VintageButton>
            {openedRequestsCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-serif border-2 border-amber-900">
                {openedRequestsCount}
              </div>
            )}
          </div>

          <VintageButton
            onClick={() => navigate('/consultant/requests/finished')}
            className="w-full text-lg py-4"
            variant="secondary"
          >
            Finished Requests ({finishedRequestsCount})
          </VintageButton>
        </div>
      </div>
    </VintageLayout>
  );
}