import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../components/VintageLayout';
import { VintageButton } from '../components/VintageButton';
import { VintageInput } from '../components/VintageInput';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, Upload } from 'lucide-react';

type RegistrationStep = 'type' | 'credentials' | 'professional' | 'terms';
type UserType = 'client' | 'consultant';

export function RegisterPage() {
  const [step, setStep] = useState<RegistrationStep>('type');
  const [userType, setUserType] = useState<UserType>('client');
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    phone: '',
    country: '',
    licenseNumber: '',
    issuingAuthority: '',
    yearsOfExperience: '',
    lawFirm: '',
    description: '',
    profilePhoto: null as File | null,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleTypeSelection = () => {
    if (!formData.email) {
      toast.error('Please enter your email');
      return;
    }
    setStep('credentials');
  };

  const handleCredentials = () => {
    if (!formData.fullName || !formData.password || !formData.phone) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (userType === 'consultant') {
      setStep('professional');
    } else {
      setStep('terms');
    }
  };

  const handleProfessional = () => {
    if (!formData.country || !formData.licenseNumber || !formData.issuingAuthority || !formData.yearsOfExperience) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('terms');
  };

  const handleFinish = async () => {
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    try {
      await register({ ...formData, userType });
      navigate('/thank-you', { state: { userType } });
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profilePhoto: e.target.files[0] });
    }
  };

  return (
    <VintageLayout>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-8 shadow-lg">
          <p className="text-center text-amber-900 font-serif mb-6 italic">
            Please enter all information correctly
          </p>

          {step === 'type' && (
            <div className="space-y-6">
              <div>
                <p className="text-amber-900 font-serif mb-3">You are a:</p>
                <div className="flex gap-4">
                  <VintageButton
                    variant={userType === 'client' ? 'primary' : 'secondary'}
                    onClick={() => setUserType('client')}
                    className="flex-1"
                  >
                    Client
                  </VintageButton>
                  <VintageButton
                    variant={userType === 'consultant' ? 'primary' : 'secondary'}
                    onClick={() => setUserType('consultant')}
                    className="flex-1"
                  >
                    Legal Consultant
                  </VintageButton>
                </div>
              </div>

              <VintageInput
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <VintageButton onClick={handleTypeSelection} className="w-full">
                Continue
              </VintageButton>
            </div>
          )}

          {step === 'credentials' && (
            <div className="space-y-4">
              <VintageInput
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />

              <VintageInput
                type="password"
                placeholder="Set Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <VintageInput
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />

              <VintageButton onClick={handleCredentials} className="w-full">
                Continue
              </VintageButton>
            </div>
          )}

          {step === 'professional' && (
            <div className="space-y-4">
              <h3 className="text-xl text-amber-900 font-serif mb-4">Professional Identity</h3>

              <VintageInput
                type="text"
                placeholder="Country of Practice"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />

              <VintageInput
                type="text"
                placeholder="License Number or Bar Registration Number"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                required
              />

              <VintageInput
                type="text"
                placeholder="Issuing Authority"
                value={formData.issuingAuthority}
                onChange={(e) => setFormData({ ...formData, issuingAuthority: e.target.value })}
                required
              />

              <VintageInput
                type="number"
                placeholder="Years of Experience"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                required
              />

              <VintageInput
                type="text"
                placeholder="Law Firm (if applicable)"
                value={formData.lawFirm}
                onChange={(e) => setFormData({ ...formData, lawFirm: e.target.value })}
              />

              <div>
                <label className="block text-sm text-amber-900 mb-2 font-serif">
                  Description of Experience
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 text-amber-900 placeholder:text-amber-500 focus:outline-none focus:border-amber-700 transition-colors min-h-32"
                  placeholder="Describe your experience..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm text-amber-900 mb-2 font-serif">
                  Upload Profile Photo
                </label>
                <label className="flex items-center gap-2 px-4 py-3 bg-amber-50 border-2 border-amber-300 cursor-pointer hover:border-amber-700 transition-colors">
                  <Upload className="w-5 h-5 text-amber-700" />
                  <span className="text-amber-700 font-serif">
                    {formData.profilePhoto ? formData.profilePhoto.name : 'Choose file'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <VintageButton onClick={handleProfessional} className="w-full">
                Continue
              </VintageButton>
            </div>
          )}

          {step === 'terms' && (
            <div className="space-y-6">
              <div className="bg-amber-100/50 border-2 border-amber-300 p-6 max-h-64 overflow-y-auto">
                <h3 className="text-lg font-serif text-amber-900 mb-4">Terms and Conditions</h3>
                <div className="text-sm text-amber-800 space-y-2 font-serif">
                  <p>1. You agree to provide accurate information.</p>
                  <p>2. You understand that your data will be protected.</p>
                  <p>3. You agree to use the platform responsibly.</p>
                  <p>4. You understand the platform's policies and procedures.</p>
                  {userType === 'consultant' && (
                    <>
                      <p>5. You confirm that all professional credentials are valid.</p>
                      <p>6. You understand that your account requires verification.</p>
                    </>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-5 h-5 border-2 border-amber-700 text-amber-800 focus:ring-amber-500"
                />
                <span className="text-amber-900 font-serif">
                  I agree to the terms and conditions
                </span>
              </label>

              <VintageButton onClick={handleFinish} className="w-full">
                Finish Setting Up Your Account
              </VintageButton>
            </div>
          )}
        </div>
      </div>
    </VintageLayout>
  );
}
