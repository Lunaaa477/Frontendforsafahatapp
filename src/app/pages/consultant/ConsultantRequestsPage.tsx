import { useNavigate, useParams } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { ArrowLeft, User, FileText } from 'lucide-react';

interface Request {
  id: string;
  clientName: string;
  subject: string;
  date: Date;
  status: 'new' | 'open' | 'finished';
  lastMessage?: string;
}

const mockRequests: Request[] = [
  {
    id: '1',
    clientName: 'Ahmed Al-Sayed',
    subject: 'Contract Review',
    date: new Date('2026-03-13'),
    status: 'new',
    lastMessage: 'I need help reviewing a business contract',
  },
  {
    id: '2',
    clientName: 'Fatima Hassan',
    subject: 'Employment Agreement',
    date: new Date('2026-03-12'),
    status: 'new',
    lastMessage: 'Questions about employment terms',
  },
  {
    id: '3',
    clientName: 'Omar Abdullah',
    subject: 'Partnership Dispute',
    date: new Date('2026-03-10'),
    status: 'open',
    lastMessage: 'Thank you for the clarification',
  },
  {
    id: '4',
    clientName: 'Layla Mohamed',
    subject: 'Lease Agreement',
    date: new Date('2026-03-08'),
    status: 'open',
    lastMessage: 'I have reviewed the documents',
  },
  {
    id: '5',
    clientName: 'Khalid Ibrahim',
    subject: 'NDA Review',
    date: new Date('2026-03-01'),
    status: 'finished',
    lastMessage: 'Great, thanks for your help!',
  },
];

export function ConsultantRequestsPage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();

  const getTitle = () => {
    switch (type) {
      case 'new':
        return 'New Unopened Requests';
      case 'open':
        return 'Opened Requests';
      case 'finished':
        return 'Finished Requests';
      default:
        return 'Requests';
    }
  };

  const getStatus = (): Request['status'] => {
    switch (type) {
      case 'new':
        return 'new';
      case 'open':
        return 'open';
      case 'finished':
        return 'finished';
      default:
        return 'new';
    }
  };

  const filteredRequests = mockRequests.filter((req) => req.status === getStatus());

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/consultant/home')}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-8 shadow-lg">
          <h2 className="text-2xl text-center mb-8 text-amber-900 font-serif tracking-wide">
            {getTitle()}
          </h2>

          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-amber-700 font-serif text-lg">No requests found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-amber-100/50 border-2 border-amber-300 p-4 hover:border-amber-700 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center border-2 border-amber-900 flex-shrink-0">
                      <User className="w-6 h-6 text-amber-50" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg text-amber-900 font-serif">
                            {request.clientName}
                          </h3>
                          <p className="text-sm text-amber-700 font-serif">
                            {request.subject}
                          </p>
                        </div>
                        <span className="text-sm text-amber-700 font-serif">
                          {request.date.toLocaleDateString()}
                        </span>
                      </div>

                      {request.lastMessage && (
                        <p className="text-sm text-amber-800 font-serif mb-3 italic">
                          "{request.lastMessage}"
                        </p>
                      )}

                      <div className="flex gap-2">
                        <VintageButton
                          onClick={() => navigate(`/file-exchange/${request.id}`)}
                          className="text-sm py-2 px-4"
                        >
                          <FileText className="w-4 h-4 inline mr-2" />
                          {type === 'new' ? 'Open Request' : type === 'open' ? 'Continue' : 'View Files'}
                        </VintageButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </VintageLayout>
  );
}
