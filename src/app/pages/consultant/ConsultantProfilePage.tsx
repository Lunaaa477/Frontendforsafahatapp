import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, User } from 'lucide-react';
import { toast } from 'sonner';

export function ConsultantProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock consultant data - replace with actual API call
  const consultantData = {
    fullName: 'Mohammed Hassan',
    email: user?.email || '',
    phone: '+966 50 123 4567',
    country: 'Saudi Arabia',
    licenseNumber: 'BAR-2014-12345',
    issuingAuthority: 'Saudi Bar Association',
    yearsOfExperience: 10,
    lawFirm: 'Hassan & Partners Law Firm',
    speciality: 'Contract Law',
    description: 'Specialized in contract drafting, review, and dispute resolution. Over 10 years of experience handling complex commercial agreements and business transactions.',
    rating: 4.9,
    totalCases: 156,
  };

  const handleRequestEdit = () => {
    // TODO: Implement edit request to admin
    toast.info('Edit request sent to admin for approval');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    toast.success('Account deletion request submitted');
    logout();
    navigate('/');
  };

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/consultant/home')}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-amber-700 rounded-full flex items-center justify-center border-4 border-amber-900 mx-auto mb-4">
              <User className="w-12 h-12 text-amber-50" />
            </div>
            <h2 className="text-2xl text-amber-900 font-serif">{consultantData.fullName}</h2>
            <p className="text-amber-700 font-serif">{consultantData.speciality}</p>
            <div className="flex items-center justify-center gap-4 mt-2 text-sm text-amber-800">
              <span className="font-serif">★ {consultantData.rating}/5</span>
              <span className="font-serif">|</span>
              <span className="font-serif">{consultantData.totalCases} cases completed</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-amber-100/50 border-2 border-amber-300 p-4">
              <h3 className="text-lg text-amber-900 font-serif mb-3 border-b-2 border-amber-300 pb-2">
                Contact Information
              </h3>
              <div className="space-y-2 text-amber-800 font-serif">
                <p><span className="text-amber-900">Email:</span> {consultantData.email}</p>
                <p><span className="text-amber-900">Phone:</span> {consultantData.phone}</p>
                <p><span className="text-amber-900">Country:</span> {consultantData.country}</p>
              </div>
            </div>

            <div className="bg-amber-100/50 border-2 border-amber-300 p-4">
              <h3 className="text-lg text-amber-900 font-serif mb-3 border-b-2 border-amber-300 pb-2">
                Professional Credentials
              </h3>
              <div className="space-y-2 text-amber-800 font-serif">
                <p><span className="text-amber-900">License Number:</span> {consultantData.licenseNumber}</p>
                <p><span className="text-amber-900">Issuing Authority:</span> {consultantData.issuingAuthority}</p>
                <p><span className="text-amber-900">Years of Experience:</span> {consultantData.yearsOfExperience}</p>
                <p><span className="text-amber-900">Law Firm:</span> {consultantData.lawFirm}</p>
              </div>
            </div>

            <div className="bg-amber-100/50 border-2 border-amber-300 p-4">
              <h3 className="text-lg text-amber-900 font-serif mb-3 border-b-2 border-amber-300 pb-2">
                Description
              </h3>
              <p className="text-amber-800 font-serif leading-relaxed">
                {consultantData.description}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <VintageButton onClick={handleRequestEdit} className="flex-1">
              Request Edit
            </VintageButton>
            <VintageButton
              variant="secondary"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex-1 !border-red-700 !text-red-800 hover:!bg-red-100"
            >
              Delete Account
            </VintageButton>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-amber-50 border-4 border-amber-800 p-6 max-w-md w-full mx-4">
              <h3 className="text-xl text-amber-900 font-serif mb-4">Delete Account?</h3>
              <p className="text-amber-800 font-serif mb-6">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <VintageButton
                  onClick={handleDeleteAccount}
                  className="flex-1 !bg-red-700 !border-red-900 hover:!bg-red-800"
                >
                  Yes, Delete
                </VintageButton>
                <VintageButton
                  variant="secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </VintageButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </VintageLayout>
  );
}
