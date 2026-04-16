import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { ArrowLeft, Upload, Loader2, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface RiskItem {
  type: 'safe' | 'caution' | 'danger';
  description: string;
}

export function ClientAIPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<RiskItem[] | null>(null);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();

      if (fileExt !== 'pdf') {
        toast.error('Only .pdf files are supported');
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    if (!agreedToPolicy) {
      toast.error('Please agree to the AI Limitations & Data Privacy Policy');
      return;
    }

    setAnalyzing(true);

    // TODO: Replace with actual AI API call
    // Example: const response = await fetch('/api/ai/analyze', { method: 'POST', body: formData });
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysis([
        {
          type: 'safe',
          description: 'Payment terms are clearly defined with a 30-day net payment period and include penalty clauses for late payment.'
        },
        {
          type: 'safe',
          description: 'Both parties\' obligations are well-defined and balanced, ensuring fair treatment on both sides.'
        },
        {
          type: 'safe',
          description: 'The contract includes a mutual confidentiality clause protecting sensitive business information.'
        },
        {
          type: 'caution',
          description: 'The termination clause allows either party to terminate with only 14 days notice, which may be too short for business continuity planning.'
        },
        {
          type: 'caution',
          description: 'The liability limitation clause caps damages at the contract value. Consider if this is adequate for your risk exposure.'
        },
        {
          type: 'caution',
          description: 'Dispute resolution is limited to arbitration in a specific jurisdiction that may not be convenient for all parties.'
        },
        {
          type: 'danger',
          description: 'A non-compete clause restricts business activities for 12 months post-termination with NO geographic limitations, which could severely impact future opportunities.'
        },
        {
          type: 'danger',
          description: 'Intellectual property rights clause grants the other party FULL ownership of all work products, including derivative works, with no compensation.'
        },
        {
          type: 'danger',
          description: 'The contract contains an automatic renewal clause that could bind you indefinitely unless canceled 90 days before each renewal date.'
        }
      ]);
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate('/client/home')}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-8 sm:p-12 shadow-lg">
          <h2 className="text-3xl text-center mb-8 text-amber-900 font-serif tracking-widest">
            SAFAHAT AI
          </h2>

          {!analyzing && !analysis && (
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-amber-700 p-12 text-center">
                <label className="cursor-pointer flex flex-col items-center gap-3">
                  <Upload className="w-12 h-12 text-amber-700" strokeWidth={1.5} />
                  <span className="text-amber-800 font-serif text-lg">
                    {file ? file.name : 'Upload Document'}
                  </span>
                  <span className="text-sm text-amber-700 font-serif italic">
                    (Support .pdf only)
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Warning Note */}
              <div className="bg-amber-200/60 border-l-4 border-amber-700 p-4">
                <p className="text-amber-900 font-serif text-sm leading-relaxed">
                  <span className="font-bold">Please Note:</span> Safahat AI is designed to assist with contract review, but AI can make mistakes or misinterpret complex legal nuances. This tool does not constitute formal legal counsel.
                </p>
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="policy-agreement"
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  className="mt-1 w-4 h-4 border-2 border-amber-700 text-amber-800 focus:ring-amber-500"
                />
                <label htmlFor="policy-agreement" className="text-amber-900 font-serif text-sm cursor-pointer">
                  I have read and agree to the{' '}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/client/ai-policy');
                    }}
                    className="underline hover:text-amber-700"
                  >
                    AI Limitations & Data Privacy Policy
                  </button>
                  .
                </label>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleUpload}
                disabled={!file || !agreedToPolicy}
                className="w-full px-8 py-4 bg-amber-300 text-amber-900 font-serif tracking-wide hover:bg-amber-400 disabled:bg-amber-200 disabled:cursor-not-allowed disabled:text-amber-600 transition-colors"
              >
                Analyze Document
              </button>
            </div>
          )}

          {analyzing && (
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 text-amber-700 animate-spin mx-auto mb-4" />
              <p className="text-amber-900 font-serif text-lg">
                Analyzing document
              </p>
              <p className="text-amber-700 font-serif text-sm mt-2 italic">
                (this may take a few seconds)
              </p>
            </div>
          )}

          {analysis && (
            <div className="space-y-6">
              <h3 className="text-xl text-amber-900 font-serif mb-4 text-center">
                Risk Analysis Results
              </h3>

              {/* Safety Score Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#d97706"
                      strokeWidth="8"
                      fill="none"
                      opacity="0.2"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#d97706"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.62)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-serif font-bold text-amber-900">62%</span>
                    <span className="text-xs font-serif text-amber-700">Safety Score</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {analysis.filter(item => item.type === 'safe').length > 0 && (
                  <div className="bg-green-50 border-2 border-green-700 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-700" />
                      <h4 className="text-green-900 font-serif font-bold">Safe Clauses</h4>
                    </div>
                    <ul className="space-y-2">
                      {analysis.filter(item => item.type === 'safe').map((item, idx) => (
                        <li key={idx} className="text-green-900 font-serif text-sm leading-relaxed">
                          • {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.filter(item => item.type === 'caution').length > 0 && (
                  <div className="bg-yellow-50 border-2 border-yellow-600 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-700" />
                      <h4 className="text-yellow-900 font-serif font-bold">Caution Areas</h4>
                    </div>
                    <ul className="space-y-2">
                      {analysis.filter(item => item.type === 'caution').map((item, idx) => (
                        <li key={idx} className="text-yellow-900 font-serif text-sm leading-relaxed">
                          • {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.filter(item => item.type === 'danger').length > 0 && (
                  <div className="bg-red-50 border-2 border-red-700 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-red-700" />
                      <h4 className="text-red-900 font-serif font-bold">Danger - High Risk</h4>
                    </div>
                    <ul className="space-y-2">
                      {analysis.filter(item => item.type === 'danger').map((item, idx) => (
                        <li key={idx} className="text-red-900 font-serif text-sm leading-relaxed">
                          • {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <VintageButton
                  variant="secondary"
                  onClick={() => {
                    setFile(null);
                    setAnalysis(null);
                  }}
                  className="flex-1"
                >
                  Analyze Another
                </VintageButton>
                <VintageButton
                  onClick={() => navigate('/client/professionals')}
                  className="flex-1"
                >
                  Contact Consultant
                </VintageButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </VintageLayout>
  );
}
