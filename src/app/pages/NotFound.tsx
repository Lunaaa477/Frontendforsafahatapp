import { useNavigate } from 'react-router';
import { VintageLayout } from '../components/VintageLayout';
import { VintageButton } from '../components/VintageButton';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <VintageLayout>
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-amber-50/80 border-4 border-amber-800 p-12 shadow-lg">
          <h1 className="text-6xl text-amber-900 font-serif mb-4">404</h1>
          <p className="text-xl text-amber-800 font-serif mb-8">
            Page Not Found
          </p>
          <VintageButton onClick={() => navigate('/')}>
            Return Home
          </VintageButton>
        </div>
      </div>
    </VintageLayout>
  );
}
