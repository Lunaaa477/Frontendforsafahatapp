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
      <div className="absolute top-4 left-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900">
          <User className="w-6 h-6 text-amber-50" />
        </div>
        <div>
          <p className="text-amber-900 font-serif">{user?.name || user?.email}</p>
          <button
            onClick={handleLogout}
            className="text-sm text-amber-700 hover:text-amber-900 flex items-center gap-1"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-20">
        <div className="bg-amber-50/80 border-4 border-amber-800 p-12 shadow-lg space-y-6">
          <VintageButton
            onClick={() => navigate('/client/ai-assistant')}
            className="w-full text-lg py-4"
          >
            Upload Document to AI Assistant
          </VintageButton>

          <VintageButton
            onClick={() => navigate('/client/professionals')}
            className="w-full text-lg py-4"
          >
            Contact a Professional Legal Consultant
          </VintageButton>
        </div>
      </div>
    </VintageLayout>
  );
}
