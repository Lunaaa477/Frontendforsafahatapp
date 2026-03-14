import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function ClientAIPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (fileExt !== 'pdf' && fileExt !== 'doc' && fileExt !== 'docx') {
        toast.error('Only .pdf and .doc/.docx files are supported');
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

    setAnalyzing(true);

    // TODO: Replace with actual AI API call
    // Example: const response = await fetch('/api/ai/analyze', { method: 'POST', body: formData });
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysis(
        `Analysis of "${file.name}":\n\n` +
        `This document appears to be a legal contract. Here are the key findings:\n\n` +
        `1. The contract is between two parties for services rendered.\n` +
        `2. Payment terms are clearly defined with a 30-day net payment period.\n` +
        `3. There is a termination clause allowing either party to terminate with 14 days notice.\n` +
        `4. The liability limitation clause caps damages at the contract value.\n` +
        `5. A non-compete clause is present for 12 months post-termination.\n\n` +
        `Recommendations:\n` +
        `- Consider reviewing the liability limitation with legal counsel\n` +
        `- The non-compete clause may need geographic limitations\n` +
        `- Ensure all parties understand payment terms clearly`
      );
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/client/home')}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-8 shadow-lg">
          <h2 className="text-3xl text-center mb-8 text-amber-900 font-serif tracking-wide">
            SAFAHAT AI
          </h2>

          {!analyzing && !analysis && (
            <div className="space-y-6">
              <div className="text-center">
                <label className="inline-flex flex-col items-center gap-4 px-12 py-8 bg-amber-100/50 border-2 border-dashed border-amber-700 cursor-pointer hover:border-amber-900 hover:bg-amber-100 transition-all">
                  <Upload className="w-16 h-16 text-amber-700" strokeWidth={1.5} />
                  <span className="text-amber-900 font-serif text-lg">
                    {file ? file.name : 'Upload Document'}
                  </span>
                  <span className="text-sm text-amber-700 font-serif">
                    (Support .pdf and .doc only)
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {file && (
                <VintageButton onClick={handleUpload} className="w-full">
                  Analyze Document
                </VintageButton>
              )}
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
              <div className="bg-amber-100/50 border-2 border-amber-300 p-6 max-h-96 overflow-y-auto">
                <pre className="text-amber-900 font-serif whitespace-pre-wrap text-sm leading-relaxed">
                  {analysis}
                </pre>
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
