import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { ArrowLeft, User, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface ReportedUser {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'consultant';
  reportedBy: string;
  reason: string;
  reportDate: Date;
  status: 'active' | 'suspended';
}

const mockReportedUsers: ReportedUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'client',
    reportedBy: 'Sarah Ahmed',
    reason: 'Inappropriate behavior and unprofessional communication during consultation.',
    reportDate: new Date('2026-03-13'),
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'consultant',
    reportedBy: 'Omar Abdullah',
    reason: 'Provided incorrect legal advice and was unresponsive to follow-up questions.',
    reportDate: new Date('2026-03-11'),
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'client',
    reportedBy: 'Fatima Al-Mansour',
    reason: 'Failed to make agreed payments after receiving legal services.',
    reportDate: new Date('2026-03-09'),
    status: 'suspended',
  },
];

export function AdminManageUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockReportedUsers);
  const [selectedUser, setSelectedUser] = useState<ReportedUser | null>(null);

  const handleSuspend = (id: string) => {
    // TODO: API call to suspend user
    // Example: await fetch('/api/admin/suspend-user', { method: 'POST', body: JSON.stringify({ id }) });
    
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: 'suspended' as const } : user
      )
    );
    toast.success('User account suspended');
  };

  const handleReinstate = (id: string) => {
    // TODO: API call to reinstate user
    // Example: await fetch('/api/admin/reinstate-user', { method: 'POST', body: JSON.stringify({ id }) });
    
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: 'active' as const } : user
      )
    );
    toast.success('User account reinstated');
  };

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/admin/home')}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-8 shadow-lg">
          <h2 className="text-2xl text-center mb-8 text-amber-900 font-serif tracking-wide">
            Manage Users
          </h2>

          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-amber-700 font-serif text-lg">No reported users</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`border-2 p-4 ${
                    user.status === 'suspended'
                      ? 'bg-red-100/50 border-red-300'
                      : 'bg-amber-100/50 border-amber-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                        user.status === 'suspended'
                          ? 'bg-red-700 border-red-900'
                          : 'bg-amber-700 border-amber-900'
                      }`}
                    >
                      {user.status === 'suspended' ? (
                        <AlertTriangle className="w-6 h-6 text-red-50" />
                      ) : (
                        <User className="w-6 h-6 text-amber-50" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg text-amber-900 font-serif">{user.name}</h3>
                            <span
                              className={`text-xs px-2 py-1 border ${
                                user.status === 'suspended'
                                  ? 'bg-red-200 border-red-700 text-red-900'
                                  : 'bg-green-200 border-green-700 text-green-900'
                              }`}
                            >
                              {user.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-amber-700 font-serif capitalize">
                            {user.role}
                          </p>
                          <p className="text-sm text-amber-600 font-serif">{user.email}</p>
                        </div>
                        <span className="text-sm text-amber-700 font-serif">
                          {user.reportDate.toLocaleDateString()}
                        </span>
                      </div>

                      <VintageButton
                        variant="secondary"
                        onClick={() =>
                          setSelectedUser(selectedUser?.id === user.id ? null : user)
                        }
                        className="text-sm py-2 px-4"
                      >
                        {selectedUser?.id === user.id ? 'Hide Details' : 'View Details'}
                      </VintageButton>

                      {selectedUser?.id === user.id && (
                        <div className="mt-4 pt-4 border-t-2 border-amber-300 space-y-3">
                          <div>
                            <p className="text-sm text-amber-900 font-serif mb-1">Reported By</p>
                            <p className="text-sm text-amber-800 font-serif">
                              {user.reportedBy}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-amber-900 font-serif mb-1">Reason</p>
                            <p className="text-sm text-amber-800 font-serif leading-relaxed">
                              {user.reason}
                            </p>
                          </div>

                          <div className="pt-4">
                            {user.status === 'active' ? (
                              <VintageButton
                                onClick={() => handleSuspend(user.id)}
                                className="!bg-red-700 !border-red-900 hover:!bg-red-800"
                              >
                                Suspend Account
                              </VintageButton>
                            ) : (
                              <VintageButton
                                onClick={() => handleReinstate(user.id)}
                                className="!bg-green-700 !border-green-900 hover:!bg-green-800"
                              >
                                Reinstate Account
                              </VintageButton>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </VintageLayout>
  );
}
