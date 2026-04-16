import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { ArrowLeft, User, Star, FileText } from 'lucide-react';

interface ContactedConsultant {
  id: string;
  name: string;
  speciality: string;
  rating: number;
  lastContact: Date;
  status: 'active' | 'finished';
}

// Mock data - replace with actual API call
const mockContactedConsultants: ContactedConsultant[] = [
  {
    id: '1',
    name: 'Mohammed Hassan',
    speciality: 'Contract Law',
    rating: 4.9,
    lastContact: new Date('2026-03-30'),
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    speciality: 'Corporate Law',
    rating: 4.8,
    lastContact: new Date('2026-03-28'),
    status: 'active',
  },
  {
    id: '3',
    name: 'Fatima Al-Mansour',
    speciality: 'Family Law',
    rating: 4.7,
    lastContact: new Date('2026-03-25'),
    status: 'finished',
  },
];

export function ContactedAssistantsPage() {
  const navigate = useNavigate();
  const contactedConsultants = mockContactedConsultants;

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/client/home')}
          className="mb-6 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-6 sm:p-8 shadow-lg">
          <h1 className="text-3xl text-amber-900 font-serif mb-6 text-center">
            Contacted Legal Assistants
          </h1>

          <div className="space-y-3 sm:space-y-4">
            {contactedConsultants.map((consultant) => (
              <div
                key={consultant.id}
                className="bg-amber-100/50 border-2 border-amber-300 p-3 sm:p-4 hover:border-amber-700 transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900 flex-shrink-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-amber-50" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg text-amber-900 font-serif truncate">
                          {consultant.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-amber-700 font-serif truncate">
                          {consultant.speciality}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-600 text-amber-600" />
                        <span className="text-sm text-amber-900 font-serif">{consultant.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <p className="text-xs text-amber-700 font-serif">
                        Last contact: {consultant.lastContact.toLocaleDateString()}
                      </p>
                      <span
                        className={`text-xs font-serif px-2 py-1 ${
                          consultant.status === 'active'
                            ? 'bg-green-100 text-green-800 border border-green-700'
                            : 'bg-gray-100 text-gray-700 border border-gray-400'
                        }`}
                      >
                        {consultant.status === 'active' ? 'Active' : 'Finished'}
                      </span>
                    </div>

                    <VintageButton
                      onClick={() => navigate(`/file-exchange/${consultant.id}`)}
                      className="w-full sm:w-auto text-sm py-2"
                    >
                      <FileText className="w-4 h-4 inline mr-2" />
                      View Files
                    </VintageButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VintageLayout>
  );
}
