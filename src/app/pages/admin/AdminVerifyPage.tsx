import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { ArrowLeft, User, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface ConsultantApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  licenseNumber: string;
  issuingAuthority: string;
  yearsOfExperience: number;
  lawFirm: string;
  speciality: string;
  description: string;
  applicationDate: Date;
}

const mockApplications: ConsultantApplication[] = [
  {
    id: '1',
    fullName: 'Dr. Aisha Al-Rashid',
    email: 'aisha.alrashid@example.com',
    phone: '+966 55 987 6543',
    country: 'Saudi Arabia',
    licenseNumber: 'BAR-2015-67890',
    issuingAuthority: 'Saudi Bar Association',
    yearsOfExperience: 9,
    lawFirm: 'Al-Rashid Legal Consultancy',
    speciality: 'Corporate Law',
    description: 'Extensive experience in corporate law with focus on mergers and acquisitions, corporate governance, and regulatory compliance.',
    applicationDate: new Date('2026-03-12'),
  },
  {
    id: '2',
    fullName: 'Youssef Mansour',
    email: 'youssef.mansour@example.com',
    phone: '+971 50 123 4567',
    country: 'UAE',
    licenseNumber: 'BAR-UAE-2016-12345',
    issuingAuthority: 'UAE Ministry of Justice',
    yearsOfExperience: 8,
    lawFirm: 'Mansour & Associates',
    speciality: 'Real Estate Law',
    description: 'Specialized in real estate transactions, property law, and construction contracts.',
    applicationDate: new Date('2026-03-13'),
  },
];

export function AdminVerifyPage() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<ConsultantApplication | null>(null);

  const handleVerify = (id: string) => {
    // TODO: API call to verify consultant
    // Example: await fetch('/api/admin/verify-consultant', { method: 'POST', body: JSON.stringify({ id, action: 'verify' }) });
    
    setApplications(applications.filter((app) => app.id !== id));
    setSelectedApplication(null);
    toast.success('Consultant verified! Verification email sent.');
  };

  const handleReject = (id: string) => {
    // TODO: API call to reject consultant
    // Example: await fetch('/api/admin/verify-consultant', { method: 'POST', body: JSON.stringify({ id, action: 'reject' }) });
    
    setApplications(applications.filter((app) => app.id !== id));
    setSelectedApplication(null);
    toast.success('Application rejected. Rejection email sent.');
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
            Verify Consultants
          </h2>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-amber-700 font-serif text-lg">
                No pending verification requests
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-amber-100/50 border-2 border-amber-300 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900 flex-shrink-0">
                      <User className="w-6 h-6 text-amber-50" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg text-amber-900 font-serif">
                            {application.fullName}
                          </h3>
                          <p className="text-sm text-amber-700 font-serif">
                            {application.speciality}
                          </p>
                        </div>
                        <span className="text-sm text-amber-700 font-serif">
                          {application.applicationDate.toLocaleDateString()}
                        </span>
                      </div>

                      <VintageButton
                        variant="secondary"
                        onClick={() =>
                          setSelectedApplication(
                            selectedApplication?.id === application.id ? null : application
                          )
                        }
                        className="text-sm py-2 px-4"
                      >
                        {selectedApplication?.id === application.id ? 'Hide Details' : 'View Details'}
                      </VintageButton>

                      {selectedApplication?.id === application.id && (
                        <div className="mt-4 pt-4 border-t-2 border-amber-300 space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-amber-900 font-serif mb-1">Email</p>
                              <p className="text-sm text-amber-800 font-serif">
                                {application.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-amber-900 font-serif mb-1">Phone</p>
                              <p className="text-sm text-amber-800 font-serif">
                                {application.phone}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-amber-900 font-serif mb-1">Country</p>
                              <p className="text-sm text-amber-800 font-serif">
                                {application.country}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-amber-900 font-serif mb-1">License Number</p>
                              <p className="text-sm text-amber-800 font-serif">
                                {application.licenseNumber}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-amber-900 font-serif mb-1">
                                Issuing Authority
                              </p>
                              <p className="text-sm text-amber-800 font-serif">
                                {application.issuingAuthority}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-amber-900 font-serif mb-1">
                                Years of Experience
                              </p>
                              <p className="text-sm text-amber-800 font-serif">
                                {application.yearsOfExperience}
                              </p>
                            </div>
                            {application.lawFirm && (
                              <div className="col-span-2">
                                <p className="text-sm text-amber-900 font-serif mb-1">Law Firm</p>
                                <p className="text-sm text-amber-800 font-serif">
                                  {application.lawFirm}
                                </p>
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="text-sm text-amber-900 font-serif mb-1">
                              Description of Experience
                            </p>
                            <p className="text-sm text-amber-800 font-serif leading-relaxed">
                              {application.description}
                            </p>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <VintageButton
                              onClick={() => handleVerify(application.id)}
                              className="flex-1 flex items-center justify-center gap-2 !bg-green-700 !border-green-900 hover:!bg-green-800"
                            >
                              <Check className="w-5 h-5" />
                              Verify
                            </VintageButton>
                            <VintageButton
                              onClick={() => handleReject(application.id)}
                              className="flex-1 flex items-center justify-center gap-2 !bg-red-700 !border-red-900 hover:!bg-red-800"
                            >
                              <X className="w-5 h-5" />
                              Reject
                            </VintageButton>
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
