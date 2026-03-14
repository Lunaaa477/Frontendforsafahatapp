import { ReactNode } from 'react';
import { Feather } from 'lucide-react';

interface VintageLayoutProps {
  children: ReactNode;
  showLogo?: boolean;
}

export function VintageLayout({ children, showLogo = true }: VintageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f4f1e8] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-[#f4f1e8] to-amber-100">
      <div className="min-h-screen" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c5a9' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>
        {showLogo && (
          <div className="flex flex-col items-center pt-12 pb-8">
            <h1 className="text-6xl tracking-[0.3em] text-amber-900" style={{ fontFamily: 'serif' }}>
              SAFAHAT
            </h1>
            <Feather className="w-16 h-16 text-amber-700 mt-4" strokeWidth={1} />
          </div>
        )}
        <div className="container mx-auto px-4 pb-12">
          {children}
        </div>
      </div>
    </div>
  );
}
