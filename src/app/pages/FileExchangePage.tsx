import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { VintageLayout } from '../components/VintageLayout';
import { VintageButton } from '../components/VintageButton';
import { ArrowLeft, Upload, Download, Flag, User, DollarSign, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

interface FileExchange {
  id: string;
  sender: 'client' | 'consultant';
  fileName: string;
  fileSize: string;
  timestamp: Date;
  type: 'document' | 'payment';
  amount?: number;
}

export function FileExchangePage() {
  const { consultantId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [files, setFiles] = useState<FileExchange[]>([]);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [showPaymentRequest, setShowPaymentRequest] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [rating, setRating] = useState(0);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentRedirect, setShowPaymentRedirect] = useState(false);

  const consultantName = 'Mohammed Hassan';
  const consultantRate = 20; // Rate per 1000 words
  const isConsultant = user?.role === 'consultant';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (fileExt !== 'pdf') {
        toast.error('Only .pdf files are supported');
        return;
      }

      setUploadingFile(file);

      // TODO: BACKEND TEAM - Upload file to server
      // API Endpoint: POST /api/file-exchange/:consultantId/upload
      // Request: FormData with 'file' field
      // Headers: { 'Authorization': `Bearer ${authToken}` }
      // Expected response: { fileId: string, fileName: string, fileSize: string, uploadedAt: Date }

      // Mock implementation:
      setTimeout(() => {
        const newFile: FileExchange = {
          id: Date.now().toString(),
          sender: isConsultant ? 'consultant' : 'client',
          fileName: file.name,
          fileSize: `${(file.size / 1024).toFixed(2)} KB`,
          timestamp: new Date(),
          type: 'document',
        };

        setFiles([...files, newFile]);
        setUploadingFile(null);
        toast.success('File uploaded successfully');
      }, 2000);
    }
  };

  const handleDownload = (fileId: string, fileName: string) => {
    // TODO: BACKEND TEAM - Download file from server
    // API Endpoint: GET /api/file-exchange/download/:fileId
    // Headers: { 'Authorization': `Bearer ${authToken}` }
    // Expected response: File blob

    toast.success(`Downloading ${fileName}...`);
  };

  const handleSendPaymentRequest = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    // TODO: BACKEND TEAM - Send payment request
    // API Endpoint: POST /api/payments/request
    // Request body: { consultantId, amount: parseFloat(paymentAmount) }
    // Headers: { 'Authorization': `Bearer ${authToken}` }

    const paymentFile: FileExchange = {
      id: Date.now().toString(),
      sender: 'consultant',
      fileName: 'Payment Request',
      fileSize: '',
      timestamp: new Date(),
      type: 'payment',
      amount: parseFloat(paymentAmount),
    };

    setFiles([...files, paymentFile]);
    setShowPaymentRequest(false);
    setPaymentAmount('');
    toast.success('Payment request sent');
  };

  const handlePayment = (fileId: string) => {
    // TODO: BACKEND TEAM - Process payment
    // API Endpoint: POST /api/payments/process/:fileId
    // Headers: { 'Authorization': `Bearer ${authToken}` }

    toast.success('Payment processed successfully');
  };

  const handleEndConversation = () => {
    // TODO: BACKEND TEAM - End conversation
    // API Endpoint: POST /api/conversations/:consultantId/end
    // Headers: { 'Authorization': `Bearer ${authToken}` }

    setConversationEnded(true);
    setShowEndConfirm(false);
    if (!isConsultant) {
      setShowPayment(true);
    }
  };

  const handlePayNow = () => {
    setShowPaymentRedirect(true);
    setTimeout(() => {
      setShowPaymentRedirect(false);
      setShowPayment(false);
      toast.info('Please rate your experience');
    }, 2000);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    // TODO: BACKEND TEAM - Submit rating
    // API Endpoint: POST /api/consultants/:consultantId/rate
    // Request body: { rating }
    // Headers: { 'Authorization': `Bearer ${authToken}` }

    toast.success('Thank you for your rating!');
    setTimeout(() => navigate('/client/home'), 2000);
  };

  const handleReport = () => {
    if (!reportReason.trim()) {
      toast.error('Please provide a reason for reporting');
      return;
    }

    // TODO: BACKEND TEAM - Submit report
    // API Endpoint: POST /api/reports
    // Request body: { consultantId, reason: reportReason }
    // Headers: { 'Authorization': `Bearer ${authToken}` }

    toast.success('Report submitted successfully');
    setShowReport(false);
    setReportReason('');
  };

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 shadow-lg">
          {/* Header */}
          <div className="bg-amber-700 text-amber-50 p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-serif text-base sm:text-lg truncate">{consultantName}</span>
            </div>
            <button
              onClick={() => setShowReport(true)}
              className="text-amber-100 hover:text-white flex items-center gap-1 sm:gap-2 flex-shrink-0"
            >
              <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-serif text-xs sm:text-sm hidden sm:inline">Report</span>
            </button>
          </div>

          {/* File Exchange Area */}
          <div className="p-3 sm:p-4 md:p-6 h-[400px] sm:h-96 overflow-y-auto space-y-3 sm:space-y-4 bg-amber-50/50">
            {files.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                <p className="text-amber-700 font-serif">No files exchanged yet</p>
                <p className="text-amber-600 font-serif text-sm mt-2">
                  {isConsultant ? 'Waiting for client to upload a document' : 'Upload a document to start'}
                </p>
              </div>
            )}

            {files.map((file) => (
              <div
                key={file.id}
                className={`flex ${file.sender === (isConsultant ? 'consultant' : 'client') ? 'justify-end' : 'justify-start'}`}
              >
                {file.type === 'payment' ? (
                  <div className="bg-green-100 border-2 border-green-700 p-4 max-w-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-700" />
                      <span className="font-serif text-green-900">Payment Request</span>
                    </div>
                    <p className="text-green-900 font-serif text-lg mb-3">
                      ${file.amount}
                    </p>
                    {!isConsultant && (
                      <VintageButton
                        onClick={() => handlePayment(file.id)}
                        className="text-sm py-2"
                      >
                        Pay Now
                      </VintageButton>
                    )}
                  </div>
                ) : (
                  <div
                    className={`p-4 max-w-sm border-2 ${
                      file.sender === (isConsultant ? 'consultant' : 'client')
                        ? 'bg-amber-700 text-amber-50 border-amber-900'
                        : 'bg-amber-200 text-amber-900 border-amber-400'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <FileText className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm truncate">{file.fileName}</p>
                        <p className="text-xs opacity-70 mt-1">{file.fileSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-70">
                        {file.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {file.sender !== (isConsultant ? 'consultant' : 'client') && (
                        <button
                          onClick={() => handleDownload(file.id, file.fileName)}
                          className="text-xs underline hover:opacity-80"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {uploadingFile && (
              <div className="flex justify-end">
                <div className="bg-amber-700 text-amber-50 border-2 border-amber-900 p-4 max-w-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 animate-pulse" />
                    <div>
                      <p className="font-serif text-sm">{uploadingFile.name}</p>
                      <p className="text-xs opacity-70">Uploading...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Upload Controls */}
          {!conversationEnded && (
            <div className="p-4 bg-amber-100/50 border-t-2 border-amber-300">
              <div className="mb-3">
                <label className="cursor-pointer block">
                  <div className="w-full px-4 py-3 bg-amber-700 text-amber-50 hover:bg-amber-800 border-2 border-amber-900 text-center flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    <span className="font-serif">Upload Document (.pdf only)</span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploadingFile !== null}
                  />
                </label>
              </div>

              <div className="flex gap-2">
                {isConsultant && (
                  <VintageButton
                    variant="secondary"
                    onClick={() => setShowPaymentRequest(true)}
                    className="text-sm py-2"
                  >
                    Send Payment Request
                  </VintageButton>
                )}
                <VintageButton
                  variant="secondary"
                  onClick={() => setShowEndConfirm(true)}
                  className="text-sm py-2"
                >
                  End Conversation
                </VintageButton>
              </div>
            </div>
          )}

          {conversationEnded && !isConsultant && !showPayment && (
            <div className="p-6 bg-amber-100/50 border-t-2 border-amber-300 text-center">
              <p className="text-amber-900 font-serif mb-4">Please rate your experience:</p>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <span
                      className={`text-4xl ${
                        star <= rating ? 'text-amber-600' : 'text-amber-300'
                      }`}
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
              <VintageButton onClick={handleSubmitRating}>
                Submit Rating
              </VintageButton>
            </div>
          )}
        </div>

        {/* Payment Request Modal */}
        {showPaymentRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-amber-50 border-4 border-amber-800 p-6 max-w-md w-full mx-4">
              <h3 className="text-xl text-amber-900 font-serif mb-4">Send Payment Request</h3>
              <input
                type="number"
                placeholder="Amount ($)"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 text-amber-900 mb-4"
              />
              <div className="flex gap-2">
                <VintageButton onClick={handleSendPaymentRequest} className="flex-1">
                  Send
                </VintageButton>
                <VintageButton
                  variant="secondary"
                  onClick={() => setShowPaymentRequest(false)}
                  className="flex-1"
                >
                  Cancel
                </VintageButton>
              </div>
            </div>
          </div>
        )}

        {/* End Conversation Modal */}
        {showEndConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-amber-50 border-4 border-amber-800 p-6 max-w-md w-full mx-4">
              <h3 className="text-xl text-amber-900 font-serif mb-4">End Conversation?</h3>
              <p className="text-amber-800 font-serif mb-6">
                Are you sure you want to end this conversation?
              </p>
              <div className="flex gap-2">
                <VintageButton onClick={handleEndConversation} className="flex-1">
                  Yes, End
                </VintageButton>
                <VintageButton
                  variant="secondary"
                  onClick={() => setShowEndConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </VintageButton>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-amber-50 border-4 border-amber-800 p-6 max-w-md w-full mx-4">
              <h3 className="text-xl text-amber-900 font-serif mb-4 text-center">
                Payment Required
              </h3>
              <div className="bg-amber-100/50 border-2 border-amber-300 p-4 mb-6 text-center">
                <p className="text-amber-800 font-serif text-sm mb-2">
                  Consultant Rate
                </p>
                <p className="text-amber-900 font-serif text-2xl">
                  ${consultantRate} per 1000 words
                </p>
              </div>
              <VintageButton onClick={handlePayNow} className="w-full">
                Pay Now
              </VintageButton>
            </div>
          </div>
        )}

        {/* Payment Redirect Modal */}
        {showPaymentRedirect && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-amber-50 border-4 border-amber-800 p-8 max-w-md w-full mx-4 text-center">
              <Loader2 className="w-16 h-16 text-amber-700 animate-spin mx-auto mb-4" />
              <p className="text-amber-900 font-serif text-lg">
                Redirecting you to payment terminal...
              </p>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {showReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-amber-50 border-4 border-amber-800 p-6 max-w-md w-full mx-4">
              <h3 className="text-xl text-amber-900 font-serif mb-4">Report User</h3>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Reason for reporting..."
                className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 text-amber-900 mb-4 min-h-32"
              />
              <div className="flex gap-2">
                <VintageButton onClick={handleReport} className="flex-1">
                  Submit Report
                </VintageButton>
                <VintageButton
                  variant="secondary"
                  onClick={() => setShowReport(false)}
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
