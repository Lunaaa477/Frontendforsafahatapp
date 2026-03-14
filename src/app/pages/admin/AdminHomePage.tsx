import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, CheckCircle, Users, BookOpen, LogOut } from 'lucide-react';

export function AdminHomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data
  const pendingVerifications = 5;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: 'Profile',
      action: () => {},
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      label: 'Verify Consultants',
      badge: pendingVerifications,
      action: () => navigate('/admin/verify'),
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Manage Users',
      action: () => navigate('/admin/manage-users'),
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Update AI Dictionary',
      action: () => navigate('/admin/ai-dictionary'),
    },
  ];

  return (
    <VintageLayout showLogo={true}>
      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 w-12 h-12 bg-amber-700 border-2 border-amber-900 flex items-center justify-center hover:bg-amber-800 transition-colors"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-amber-50" />
        ) : (
          <Menu className="w-6 h-6 text-amber-50" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-amber-900 border-r-4 border-amber-950 shadow-lg transform transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20">
          <div className="mb-8 pb-4 border-b-2 border-amber-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-600">
                <User className="w-6 h-6 text-amber-50" />
              </div>
              <div>
                <p className="text-amber-50 font-serif text-sm">Admin</p>
                <p className="text-amber-300 font-serif text-xs">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-amber-300 hover:text-amber-100 flex items-center gap-2 mt-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-serif">Logout</span>
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-amber-50 hover:bg-amber-800 transition-colors border-2 border-transparent hover:border-amber-700"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-serif">{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <div className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-serif">
                    {item.badge}
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto mt-20">
        <div className="bg-amber-50/80 border-4 border-amber-800 p-12 shadow-lg text-center">
          <VintageButton
            onClick={() => navigate('/admin/verify')}
            className="text-lg py-4 relative"
          >
            View New Accounts That Need Verification
            {pendingVerifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-amber-900">
                {pendingVerifications}
              </span>
            )}
          </VintageButton>
        </div>
      </div>
    </VintageLayout>
  );
}
