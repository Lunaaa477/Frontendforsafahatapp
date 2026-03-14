import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { VintageInput } from '../../components/VintageInput';
import { ArrowLeft, Upload, Star, Filter, Loader2, User } from 'lucide-react';
import { toast } from 'sonner';

interface Consultant {
  id: string;
  name: string;
  profilePhoto?: string;
  yearsOfExperience: number;
  hourlyRate: number;
  rating: number;
  speciality: string;
  description: string;
  country: string;
}

const mockConsultants: Consultant[] = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    yearsOfExperience: 15,
    hourlyRate: 150,
    rating: 4.8,
    speciality: 'Corporate Law',
    description: 'Experienced in mergers, acquisitions, and corporate governance.',
    country: 'Saudi Arabia'
  },
  {
    id: '2',
    name: 'Mohammed Hassan',
    yearsOfExperience: 10,
    hourlyRate: 120,
    rating: 4.9,
    speciality: 'Contract Law',
    description: 'Specialized in contract drafting and dispute resolution.',
    country: 'UAE'
  },
  {
    id: '3',
    name: 'Fatima Al-Mansour',
    yearsOfExperience: 8,
    hourlyRate: 100,
    rating: 4.7,
    speciality: 'Family Law',
    description: 'Expert in family law matters and inheritance cases.',
    country: 'Kuwait'
  },
];

export function ClientProfessionalsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestedConsultants, setSuggestedConsultants] = useState<Consultant[] | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'rating',
    minExperience: 0,
    maxRate: 1000,
  });

  const handleUploadForSuggestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAnalyzing(true);

      // TODO: Replace with actual AI API call
      setTimeout(() => {
        setSuggestedConsultants([mockConsultants[1], mockConsultants[0]]);
        setAnalyzing(false);
        toast.success('AI suggestions generated');
      }, 3000);
    }
  };

  const filteredConsultants = (suggestedConsultants || mockConsultants)
    .filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.speciality.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(c => c.yearsOfExperience >= filters.minExperience)
    .filter(c => c.hourlyRate <= filters.maxRate)
    .sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'experience') return b.yearsOfExperience - a.yearsOfExperience;
      if (filters.sortBy === 'rate') return a.hourlyRate - b.hourlyRate;
      return 0;
    });

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/client/home')}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-8 shadow-lg">
          <h2 className="text-3xl text-center mb-8 text-amber-900 font-serif tracking-wide">
            Professionals
          </h2>

          {!analyzing && !suggestedConsultants && (
            <div className="mb-8 p-6 bg-amber-100/50 border-2 border-amber-300">
              <label className="flex flex-col items-center gap-4 cursor-pointer">
                <Upload className="w-12 h-12 text-amber-700" strokeWidth={1.5} />
                <div className="text-center">
                  <p className="text-amber-900 font-serif mb-2">
                    Upload your document here and get a legal consultant suggested to you based on your needs
                  </p>
                  <VintageButton variant="secondary" type="button">
                    Upload Document
                  </VintageButton>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleUploadForSuggestion}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {analyzing && (
            <div className="text-center py-12 mb-8">
              <Loader2 className="w-16 h-16 text-amber-700 animate-spin mx-auto mb-4" />
              <p className="text-amber-900 font-serif text-lg">
                Analyzing document
              </p>
            </div>
          )}

          {suggestedConsultants && (
            <div className="mb-6 p-4 bg-green-100/50 border-2 border-green-700">
              <p className="text-green-900 font-serif text-center">
                AI Suggested Consultants Based on Your Document
              </p>
            </div>
          )}

          <div className="mb-6">
            <p className="text-amber-900 font-serif text-center mb-4">OR choose manually:</p>
            
            <div className="flex gap-4 mb-4">
              <VintageInput
                type="text"
                placeholder="Name or speciality"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <VintageButton
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5" />
              </VintageButton>
            </div>

            {showFilters && (
              <div className="mb-4 p-4 bg-amber-100/50 border-2 border-amber-300 space-y-4">
                <div>
                  <label className="block text-sm text-amber-900 mb-2 font-serif">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-4 py-2 bg-amber-50 border-2 border-amber-300 text-amber-900"
                  >
                    <option value="rating">Rating</option>
                    <option value="experience">Years of Experience</option>
                    <option value="rate">Hourly Rate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-amber-900 mb-2 font-serif">
                    Minimum Experience (years): {filters.minExperience}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={filters.minExperience}
                    onChange={(e) => setFilters({ ...filters, minExperience: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-amber-900 mb-2 font-serif">
                    Maximum Hourly Rate: ${filters.maxRate}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={filters.maxRate}
                    onChange={(e) => setFilters({ ...filters, maxRate: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            <p className="text-amber-800 font-serif text-sm mb-4">Top Rated</p>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredConsultants.map((consultant) => (
              <div
                key={consultant.id}
                className="bg-amber-100/50 border-2 border-amber-300 p-4 cursor-pointer hover:border-amber-700 transition-colors"
                onClick={() => setSelectedConsultant(
                  selectedConsultant?.id === consultant.id ? null : consultant
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900 flex-shrink-0">
                    <User className="w-8 h-8 text-amber-50" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg text-amber-900 font-serif">{consultant.name}</h3>
                        <p className="text-sm text-amber-700 font-serif">{consultant.speciality}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-600 text-amber-600" />
                        <span className="text-amber-900 font-serif">{consultant.rating}</span>
                      </div>
                    </div>

                    <div className="flex gap-4 text-sm text-amber-800 font-serif">
                      <span>{consultant.yearsOfExperience} years experience</span>
                      <span>${consultant.hourlyRate}/hr</span>
                    </div>

                    {selectedConsultant?.id === consultant.id && (
                      <div className="mt-4 pt-4 border-t-2 border-amber-300">
                        <p className="text-amber-900 font-serif text-sm mb-2">
                          {consultant.description}
                        </p>
                        <p className="text-amber-700 font-serif text-sm mb-4">
                          Country: {consultant.country}
                        </p>
                        <VintageButton
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/chat/${consultant.id}`);
                          }}
                        >
                          Contact
                        </VintageButton>
                      </div>
                    )}
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
