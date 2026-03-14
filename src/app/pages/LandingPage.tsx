import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../components/VintageLayout';
import { VintageButton } from '../components/VintageButton';
import { VintageInput } from '../components/VintageInput';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      
      // Redirect based on user type
      if (email.includes('admin')) {
        navigate('/admin/home');
      } else if (email.includes('consultant')) {
        navigate('/consultant/home');
      } else {
        navigate('/client/home');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <VintageLayout>
      <div className="max-w-md mx-auto px-4">
        <div className="bg-amber-50/80 border-4 border-amber-800 p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl text-center mb-6 text-amber-900 font-serif tracking-wide">
            Log In
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <VintageInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <VintageInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <VintageButton type="submit" className="w-full">
              Continue
            </VintageButton>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-amber-800 font-serif text-sm mb-3">
              Don't have an account?
            </p>
            <VintageButton
              variant="secondary"
              onClick={() => navigate('/register')}
              className="w-full"
            >
              Register
            </VintageButton>
          </div>
        </div>
      </div>
    </VintageLayout>
  );
}