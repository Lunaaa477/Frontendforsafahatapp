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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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
      
      // Validate file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (fileExt !== 'pdf' && fileExt !== 'doc' && fileExt !== 'docx') {
        toast.error('Only .pdf and .doc/.docx files are supported');
        return;
      }

      setUploadedFile(file);
      setAnalyzing(true);

      // TODO: BACKEND/AI TEAM - Replace with actual AI API call
      // This is where your AI service should analyze the document and return suggested consultants
      // API Endpoint: POST /api/ai/suggest-consultants
      // Request body: FormData with 'document' field containing the file
      // Expected response: { consultants: Consultant[] }
      // Example implementation:
      /*
      const formData = new FormData();
      formData.append('document', file);
      
      fetch('/api/ai/suggest-consultants', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        setSuggestedConsultants(data.consultants);
        setAnalyzing(false);
        toast.success('AI suggestions generated based on your document');
      })
      .catch(error => {
        console.error('Error:', error);
        setAnalyzing(false);
        toast.error('Failed to analyze document');
      });
      */

      // Mock implementation (remove when integrating real API):
      setTimeout(() => {
        setSuggestedConsultants([mockConsultants[1], mockConsultants[0]]);
        setAnalyzing(false);
        toast.success('AI suggestions generated based on your document');
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
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => navigate('/client/home')}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-4 sm:p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl sm:text-3xl text-center mb-6 sm:mb-8 text-amber-900 font-serif tracking-wide">
            Professionals
          </h2>

          {!analyzing && !suggestedConsultants && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-amber-100/50 border-2 border-amber-300">
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-amber-700" strokeWidth={1.5} />
                <div className="text-center">
                  <p className="text-amber-900 font-serif mb-3 text-sm sm:text-base px-2">
                    Upload your document here and get legal consultants suggested based on your needs
                  </p>
                  <label className="cursor-pointer inline-block">
                    <div className="px-8 py-3 border-2 transition-all duration-200 font-serif tracking-wide bg-transparent text-amber-900 border-amber-800 hover:bg-amber-100">
                      Upload Document
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleUploadForSuggestion}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {analyzing && (
            <div className="text-center py-8 sm:py-12 mb-6 sm:mb-8">
              <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-amber-700 animate-spin mx-auto mb-4" />
              <p className="text-amber-900 font-serif text-base sm:text-lg">
                Analyzing document...
              </p>
            </div>
          )}

          {suggestedConsultants && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-100/50 border-2 border-green-700">
              <p className="text-green-900 font-serif text-center text-sm sm:text-base">
                ✓ AI Suggested Consultants Based on Your Document
              </p>
            </div>
          )}

          <div className="mb-4 sm:mb-6">
            <p className="text-amber-900 font-serif text-center mb-4 text-sm sm:text-base">
              {suggestedConsultants ? 'Or browse all consultants:' : 'Choose manually:'}
            </p>
            
            <div className="flex gap-2 sm:gap-4 mb-4">
              <VintageInput
                type="text"
                placeholder="Search by name or specialty"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm sm:text-base"
              />
              <VintageButton
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 sm:px-4"
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              </VintageButton>
            </div>

            {showFilters && (
              <div className="mb-4 p-3 sm:p-4 bg-amber-100/50 border-2 border-amber-300 space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm text-amber-900 mb-2 font-serif">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 bg-amber-50 border-2 border-amber-300 text-amber-900 text-sm sm:text-base font-serif"
                  >
                    <option value="rating">Rating</option>
                    <option value="experience">Years of Experience</option>
                    <option value="rate">Hourly Rate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-amber-900 mb-2 font-serif">
                    Minimum Experience: {filters.minExperience} years
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
                  <label className="block text-xs sm:text-sm text-amber-900 mb-2 font-serif">
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

            <p className="text-amber-800 font-serif text-xs sm:text-sm mb-3 sm:mb-4">
              {filteredConsultants.length} consultant{filteredConsultants.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 max-h-[500px] sm:max-h-96 overflow-y-auto">
            {filteredConsultants.map((consultant) => (
              <div
                key={consultant.id}
                className="bg-amber-100/50 border-2 border-amber-300 p-3 sm:p-4 cursor-pointer hover:border-amber-700 transition-colors"
                onClick={() => setSelectedConsultant(
                  selectedConsultant?.id === consultant.id ? null : consultant
                )}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900 flex-shrink-0">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-amber-50" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg text-amber-900 font-serif truncate">{consultant.name}</h3>
                        <p className="text-xs sm:text-sm text-amber-700 font-serif truncate">{consultant.speciality}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-600 text-amber-600" />
                        <span className="text-sm sm:text-base text-amber-900 font-serif">{consultant.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-amber-800 font-serif">
                      <span>{consultant.yearsOfExperience} yrs exp</span>
                      <span>${consultant.hourlyRate}/hr</span>
                    </div>

                    {selectedConsultant?.id === consultant.id && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-amber-300">
                        <p className="text-amber-900 font-serif text-xs sm:text-sm mb-2 leading-relaxed">
                          {consultant.description}
                        </p>
                        <p className="text-amber-700 font-serif text-xs sm:text-sm mb-3 sm:mb-4">
                          Country: {consultant.country}
                        </p>
                        <VintageButton
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/chat/${consultant.id}`);
                          }}
                          className="w-full sm:w-auto"
                        >
                          Contact Consultant
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