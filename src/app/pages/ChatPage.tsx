import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { VintageLayout } from '../components/VintageLayout';
import { VintageButton } from '../components/VintageButton';
import { VintageInput } from '../components/VintageInput';
import { ArrowLeft, Send, Paperclip, Flag, DollarSign, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  sender: 'client' | 'consultant';
  content: string;
  timestamp: Date;
  type: 'text' | 'payment';
  amount?: number;
}

export function ChatPage() {
  const { consultantId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'consultant',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showPaymentRequest, setShowPaymentRequest] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [rating, setRating] = useState(0);
  const [conversationEnded, setConversationEnded] = useState(false);

  const consultantName = 'Mohammed Hassan';
  const isConsultant = user?.role === 'consultant';

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: isConsultant ? 'consultant' : 'client',
      content: inputMessage,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const handleSendPaymentRequest = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const paymentMessage: Message = {
      id: Date.now().toString(),
      sender: 'consultant',
      content: 'Payment request',
      timestamp: new Date(),
      type: 'payment',
      amount: parseFloat(paymentAmount),
    };

    setMessages([...messages, paymentMessage]);
    setShowPaymentRequest(false);
    setPaymentAmount('');
    toast.success('Payment request sent');
  };

  const handlePayment = (messageId: string) => {
    // TODO: Integrate with payment API
    toast.success('Payment processed successfully');
  };

  const handleEndConversation = () => {
    setConversationEnded(true);
    setShowEndConfirm(false);
    if (!isConsultant) {
      toast.info('Please rate your experience');
    }
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    // TODO: Submit rating to backend
    toast.success('Thank you for your rating!');
    setTimeout(() => navigate('/client/home'), 2000);
  };

  const handleReport = () => {
    if (!reportReason.trim()) {
      toast.error('Please provide a reason for reporting');
      return;
    }
    // TODO: Submit report to backend
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

          {/* Messages */}
          <div className="p-3 sm:p-4 md:p-6 h-[400px] sm:h-96 overflow-y-auto space-y-3 sm:space-y-4 bg-amber-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === (isConsultant ? 'consultant' : 'client') ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'payment' ? (
                  <div className="bg-green-100 border-2 border-green-700 p-4 max-w-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-700" />
                      <span className="font-serif text-green-900">Payment Request</span>
                    </div>
                    <p className="text-green-900 font-serif text-lg mb-3">
                      ${message.amount}
                    </p>
                    {!isConsultant && (
                      <VintageButton
                        onClick={() => handlePayment(message.id)}
                        className="text-sm py-2"
                      >
                        Pay Now
                      </VintageButton>
                    )}
                  </div>
                ) : (
                  <div
                    className={`px-4 py-3 max-w-sm ${
                      message.sender === (isConsultant ? 'consultant' : 'client')
                        ? 'bg-amber-700 text-amber-50'
                        : 'bg-amber-200 text-amber-900'
                    }`}
                  >
                    <p className="font-serif text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          {!conversationEnded && (
            <div className="p-4 bg-amber-100/50 border-t-2 border-amber-300">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-amber-50 border-2 border-amber-300 text-amber-900 focus:outline-none focus:border-amber-700"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-amber-700 text-amber-50 hover:bg-amber-800 border-2 border-amber-900"
                >
                  <Send className="w-5 h-5" />
                </button>
                <label className="px-4 py-2 bg-amber-700 text-amber-50 hover:bg-amber-800 border-2 border-amber-900 cursor-pointer">
                  <Paperclip className="w-5 h-5" />
                  <input type="file" className="hidden" />
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

          {conversationEnded && !isConsultant && (
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
              <VintageInput
                type="number"
                placeholder="Amount ($)"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="mb-4"
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