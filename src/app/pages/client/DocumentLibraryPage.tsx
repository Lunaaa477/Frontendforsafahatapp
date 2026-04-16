import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { ArrowLeft, FileText, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface RiskItem {
  type: 'safe' | 'caution' | 'danger';
  description: string;
}

interface DocumentRecord {
  id: string;
  fileName: string;
  uploadDate: Date;
  safetyScore: number;
  risks: RiskItem[];
}

// Mock data - replace with actual API calls
const mockDocuments: DocumentRecord[] = [
  {
    id: '1',
    fileName: 'Employment_Contract_2024.pdf',
    uploadDate: new Date('2026-04-10'),
    safetyScore: 62,
    risks: [
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
    ]
  },
  {
    id: '2',
    fileName: 'Service_Agreement_March.pdf',
    uploadDate: new Date('2026-03-28'),
    safetyScore: 78,
    risks: [
      {
        type: 'safe',
        description: 'Clear termination clause with reasonable 30-day notice period for both parties.'
      },
      {
        type: 'safe',
        description: 'Payment terms are transparent with milestone-based payments and defined timelines.'
      },
      {
        type: 'safe',
        description: 'Intellectual property rights are properly allocated with fair compensation terms.'
      },
      {
        type: 'safe',
        description: 'The contract includes comprehensive insurance and indemnification clauses.'
      },
      {
        type: 'caution',
        description: 'Non-solicitation clause extends for 18 months which may be longer than standard practice.'
      },
      {
        type: 'caution',
        description: 'Force majeure clause is narrowly defined and may not cover all potential disruptions.'
      },
      {
        type: 'danger',
        description: 'Penalty clause for late delivery is disproportionately high at 5% per day, which could exceed the contract value.'
      }
    ]
  },
  {
    id: '3',
    fileName: 'Freelance_Agreement_Feb.pdf',
    uploadDate: new Date('2026-02-15'),
    safetyScore: 45,
    risks: [
      {
        type: 'safe',
        description: 'Payment schedule is clearly outlined with weekly payments.'
      },
      {
        type: 'safe',
        description: 'Scope of work is well-defined with clear deliverables.'
      },
      {
        type: 'caution',
        description: 'No formal change order process defined for scope modifications.'
      },
      {
        type: 'caution',
        description: 'Confidentiality obligations survive indefinitely without reasonable time limits.'
      },
      {
        type: 'caution',
        description: 'No clear dispute resolution mechanism specified.'
      },
      {
        type: 'danger',
        description: 'Contract allows unilateral termination by client without cause and without compensation for work in progress.'
      },
      {
        type: 'danger',
        description: 'All intellectual property rights transfer immediately upon creation, even before payment is received.'
      },
      {
        type: 'danger',
        description: 'Liability clause holds freelancer personally liable for all damages without any cap or limitation.'
      },
      {
        type: 'danger',
        description: 'Non-compete clause prohibits working in the entire industry for 24 months globally.'
      }
    ]
  }
];

export function DocumentLibraryPage() {
  const navigate = useNavigate();
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const toggleExpand = (docId: string) => {
    setExpandedDoc(expandedDoc === docId ? null : docId);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-700';
    if (score >= 50) return 'text-yellow-700';
    return 'text-red-700';
  };

  const getScoreStrokeColor = (score: number) => {
    if (score >= 70) return '#15803d';
    if (score >= 50) return '#a16207';
    return '#b91c1c';
  };

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/client/home')}
          className="mb-6 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-6 sm:p-8 shadow-lg">
          <h1 className="text-3xl text-amber-900 font-serif mb-6 text-center">
            My Document Library
          </h1>

          {mockDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <p className="text-amber-700 font-serif">No documents analyzed yet</p>
              <VintageButton
                onClick={() => navigate('/client/ai-assistant')}
                className="mt-6"
              >
                Upload Your First Document
              </VintageButton>
            </div>
          ) : (
            <div className="space-y-4">
              {mockDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-amber-100/50 border-2 border-amber-300"
                >
                  {/* Document Header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-amber-100 transition-colors"
                    onClick={() => toggleExpand(doc.id)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <FileText className="w-6 h-6 text-amber-700 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-amber-900 font-serif text-lg truncate">
                            {doc.fileName}
                          </h3>
                          <p className="text-amber-700 font-serif text-sm">
                            Uploaded: {doc.uploadDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        {/* Mini Safety Score */}
                        <div className="flex items-center gap-2">
                          <div className="relative w-12 h-12">
                            <svg className="w-12 h-12 transform -rotate-90">
                              <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke={getScoreStrokeColor(doc.safetyScore)}
                                strokeWidth="3"
                                fill="none"
                                opacity="0.2"
                              />
                              <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke={getScoreStrokeColor(doc.safetyScore)}
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 20}`}
                                strokeDashoffset={`${2 * Math.PI * 20 * (1 - doc.safetyScore / 100)}`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className={`text-sm font-serif font-bold ${getScoreColor(doc.safetyScore)}`}>
                                {doc.safetyScore}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {expandedDoc === doc.id ? (
                          <ChevronUp className="w-5 h-5 text-amber-700" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-amber-700" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Risk Analysis */}
                  {expandedDoc === doc.id && (
                    <div className="border-t-2 border-amber-300 p-4 sm:p-6 bg-amber-50">
                      <h4 className="text-xl text-amber-900 font-serif mb-4 text-center">
                        Risk Analysis Report
                      </h4>

                      {/* Large Safety Score */}
                      <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32">
                          <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke={getScoreStrokeColor(doc.safetyScore)}
                              strokeWidth="8"
                              fill="none"
                              opacity="0.2"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke={getScoreStrokeColor(doc.safetyScore)}
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 56}`}
                              strokeDashoffset={`${2 * Math.PI * 56 * (1 - doc.safetyScore / 100)}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-3xl font-serif font-bold ${getScoreColor(doc.safetyScore)}`}>
                              {doc.safetyScore}%
                            </span>
                            <span className="text-xs font-serif text-amber-700">Safety Score</span>
                          </div>
                        </div>
                      </div>

                      {/* Risk Categories */}
                      <div className="space-y-4">
                        {doc.risks.filter(item => item.type === 'safe').length > 0 && (
                          <div className="bg-green-50 border-2 border-green-700 p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle className="w-5 h-5 text-green-700" />
                              <h5 className="text-green-900 font-serif font-bold">Safe Clauses</h5>
                            </div>
                            <ul className="space-y-2">
                              {doc.risks.filter(item => item.type === 'safe').map((item, idx) => (
                                <li key={idx} className="text-green-900 font-serif text-sm leading-relaxed">
                                  • {item.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {doc.risks.filter(item => item.type === 'caution').length > 0 && (
                          <div className="bg-yellow-50 border-2 border-yellow-600 p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <AlertTriangle className="w-5 h-5 text-yellow-700" />
                              <h5 className="text-yellow-900 font-serif font-bold">Caution Areas</h5>
                            </div>
                            <ul className="space-y-2">
                              {doc.risks.filter(item => item.type === 'caution').map((item, idx) => (
                                <li key={idx} className="text-yellow-900 font-serif text-sm leading-relaxed">
                                  • {item.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {doc.risks.filter(item => item.type === 'danger').length > 0 && (
                          <div className="bg-red-50 border-2 border-red-700 p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <AlertCircle className="w-5 h-5 text-red-700" />
                              <h5 className="text-red-900 font-serif font-bold">Danger - High Risk</h5>
                            </div>
                            <ul className="space-y-2">
                              {doc.risks.filter(item => item.type === 'danger').map((item, idx) => (
                                <li key={idx} className="text-red-900 font-serif text-sm leading-relaxed">
                                  • {item.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="mt-6">
                        <VintageButton
                          onClick={() => navigate('/client/professionals')}
                          className="w-full"
                        >
                          Contact a Consultant
                        </VintageButton>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </VintageLayout>
  );
}
