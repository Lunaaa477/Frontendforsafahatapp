# Safahat Frontend - Customization Guide

This guide shows how to customize various aspects of the Safahat frontend.

## Changing the Aesthetic Theme

### 1. Update Color Scheme

To change from amber/vintage to another color scheme:

**File**: All component files

Current amber colors:
- `amber-50` → Very light background
- `amber-100` → Light background
- `amber-300` → Borders
- `amber-700` → Medium accents
- `amber-800` → Dark primary
- `amber-900` → Darkest text

Replace with your preferred Tailwind color:
```typescript
// Example: Change to blue theme
bg-amber-50 → bg-blue-50
border-amber-800 → border-blue-800
text-amber-900 → text-blue-900
```

### 2. Change Typography

To use a different font instead of serif:

**Option A**: Google Fonts

Add to `/src/styles/fonts.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap');
```

Update components:
```typescript
// Replace
className="font-serif"

// With
className="font-['Playfair_Display']"

// Or set as default in theme.css
body {
  font-family: 'Playfair Display', serif;
}
```

**Option B**: System Fonts

Replace `font-serif` with:
- `font-sans` - Sans-serif
- `font-mono` - Monospace

### 3. Modify Layout Background

**File**: `/src/app/components/VintageLayout.tsx`

Change the pattern:
```typescript
// Current pattern
backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60'...")`

// Remove pattern entirely
style={{ backgroundColor: '#f4f1e8' }}

// Or use a different pattern from https://heropatterns.com/
```

Change gradient:
```typescript
// Current
className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-[#f4f1e8] to-amber-100"

// Example: Linear gradient
className="bg-gradient-to-br from-blue-50 to-indigo-100"
```

---

## Customizing Components

### 1. Button Styles

**File**: `/src/app/components/VintageButton.tsx`

Add new variant:
```typescript
const variants = {
  primary: 'bg-amber-800 text-amber-50 border-amber-900 hover:bg-amber-900',
  secondary: 'bg-transparent text-amber-900 border-amber-800 hover:bg-amber-100',
  
  // Add new variant
  danger: 'bg-red-700 text-white border-red-900 hover:bg-red-800',
  success: 'bg-green-700 text-white border-green-900 hover:bg-green-800',
};

// Usage
<VintageButton variant="danger">Delete</VintageButton>
```

Add button sizes:
```typescript
interface VintageButtonProps {
  // ... existing props
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'px-4 py-1 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-12 py-4 text-lg',
};

// In component
className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
```

### 2. Input Styles

**File**: `/src/app/components/VintageInput.tsx`

Add error state:
```typescript
interface VintageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const VintageInput = forwardRef<HTMLInputElement, VintageInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-amber-900 mb-2 font-serif">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-amber-50 border-2 ${
            error ? 'border-red-500' : 'border-amber-300'
          } text-amber-900 placeholder:text-amber-500 focus:outline-none focus:border-amber-700 transition-colors ${className}`}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-700 mt-1 font-serif">{error}</p>
        )}
      </div>
    );
  }
);

// Usage
<VintageInput
  label="Email"
  error={errors.email}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## Adding New Features

### 1. Add Search Functionality

```typescript
import { useState, useMemo } from 'react';

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([/* your items */]);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  return (
    <div>
      <VintageInput
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### 2. Add Pagination

```typescript
import { useState } from 'react';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [items, setItems] = useState([/* your items */]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {currentItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      
      <div className="flex gap-2 mt-4">
        <VintageButton
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          variant="secondary"
        >
          Previous
        </VintageButton>
        
        <span className="px-4 py-2 text-amber-900 font-serif">
          Page {currentPage} of {totalPages}
        </span>
        
        <VintageButton
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          variant="secondary"
        >
          Next
        </VintageButton>
      </div>
    </div>
  );
}
```

### 3. Add Sorting

```typescript
import { useState } from 'react';

type SortField = 'name' | 'date' | 'rating';
type SortOrder = 'asc' | 'desc';

function MyComponent() {
  const [items, setItems] = useState([/* your items */]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedItems = [...items].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <VintageButton
          onClick={() => handleSort('name')}
          variant={sortField === 'name' ? 'primary' : 'secondary'}
        >
          Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </VintageButton>
        <VintageButton
          onClick={() => handleSort('date')}
          variant={sortField === 'date' ? 'primary' : 'secondary'}
        >
          Date {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </VintageButton>
      </div>
      {sortedItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### 4. Add Loading States

Create a loading component:

```typescript
// /src/app/components/LoadingSpinner.tsx
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-12 h-12 text-amber-700 animate-spin mb-4" />
      <p className="text-amber-900 font-serif">{message}</p>
    </div>
  );
}

// Usage
{loading ? <LoadingSpinner /> : <YourContent />}
```

---

## Modifying User Flows

### 1. Add Extra Registration Step

**File**: `/src/app/pages/RegisterPage.tsx`

```typescript
// Add new step to type
type RegistrationStep = 'type' | 'credentials' | 'professional' | 'verification' | 'terms';

// Add new state for verification code
const [verificationCode, setVerificationCode] = useState('');

// Add verification step before terms
{step === 'verification' && (
  <div className="space-y-4">
    <p className="text-amber-900 font-serif text-center mb-4">
      We've sent a verification code to your email
    </p>
    <VintageInput
      type="text"
      placeholder="Enter verification code"
      value={verificationCode}
      onChange={(e) => setVerificationCode(e.target.value)}
    />
    <VintageButton
      onClick={handleVerifyCode}
      className="w-full"
    >
      Verify
    </VintageButton>
  </div>
)}
```

### 2. Add Password Requirements

```typescript
function PasswordValidator() {
  const [password, setPassword] = useState('');
  
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /\d/.test(password) },
    { label: 'Contains special character', met: /[!@#$%^&*]/.test(password) },
  ];
  
  return (
    <div>
      <VintageInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="mt-2 space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className={req.met ? 'text-green-700' : 'text-amber-600'}>
              {req.met ? '✓' : '○'}
            </span>
            <span className="font-serif text-amber-800">{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Adding Animations

### 1. Fade In Animation

```typescript
import { motion } from 'motion/react';

export function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      Content here
    </motion.div>
  );
}
```

### 2. Slide In Animation

```typescript
import { motion } from 'motion/react';

export function MyComponent() {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      Content here
    </motion.div>
  );
}
```

### 3. Stagger Children

```typescript
import { motion } from 'motion/react';

export function MyList({ items }: { items: any[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {item.name}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## Improving Mobile Experience

### 1. Responsive Layout

```typescript
// Stack on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">Left content</div>
  <div className="flex-1">Right content</div>
</div>

// Different padding on mobile vs desktop
<div className="p-4 md:p-8 lg:p-12">
  Content
</div>

// Hide on mobile, show on desktop
<div className="hidden md:block">
  Desktop only
</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">
  Mobile only
</div>
```

### 2. Mobile Menu

```typescript
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-amber-900"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="bg-amber-50 w-64 h-full p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="mb-4"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Menu items */}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Adding Form Validation with react-hook-form

Already installed! Here's how to use it:

```typescript
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <VintageInput
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        placeholder="Email"
        error={errors.email?.message}
      />

      <VintageInput
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        type="password"
        placeholder="Password"
        error={errors.password?.message}
      />

      <VintageButton type="submit">Login</VintageButton>
    </form>
  );
}
```

---

## Performance Optimization

### 1. Lazy Load Routes

```typescript
// routes.tsx
import { lazy } from 'react';

const ClientHomePage = lazy(() => import('./pages/client/ClientHomePage'));
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));

// In App.tsx, wrap with Suspense
import { Suspense } from 'react';
import { LoadingSpinner } from './components/LoadingSpinner';

<Suspense fallback={<LoadingSpinner />}>
  <RouterProvider router={router} />
</Suspense>
```

### 2. Memoize Expensive Calculations

```typescript
import { useMemo } from 'react';

function MyComponent({ items }: { items: Item[] }) {
  const sortedAndFilteredItems = useMemo(() => {
    return items
      .filter(item => item.active)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return <div>{/* render items */}</div>;
}
```

### 3. Debounce Search Input

```typescript
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Make API call
      fetchResults(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <VintageInput
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

## Common Patterns

### 1. Modal Dialog

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-amber-50 border-4 border-amber-800 p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl text-amber-900 font-serif">{title}</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-amber-700" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Usage
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
  <p>Are you sure?</p>
  <VintageButton onClick={handleConfirm}>Yes</VintageButton>
</Modal>
```

### 2. Confirmation Dialog

```typescript
function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = (): Promise<boolean> => {
    setIsOpen(true);
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    resolver?.(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resolver?.(false);
    setIsOpen(false);
  };

  const ConfirmDialog = () => (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Confirm Action">
      <p className="mb-4 text-amber-800 font-serif">Are you sure?</p>
      <div className="flex gap-2">
        <VintageButton onClick={handleConfirm}>Yes</VintageButton>
        <VintageButton variant="secondary" onClick={handleCancel}>No</VintageButton>
      </div>
    </Modal>
  );

  return { confirm, ConfirmDialog };
}

// Usage
function MyComponent() {
  const { confirm, ConfirmDialog } = useConfirm();

  const handleDelete = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      // Do delete
    }
  };

  return (
    <>
      <VintageButton onClick={handleDelete}>Delete</VintageButton>
      <ConfirmDialog />
    </>
  );
}
```

---

These customization examples should cover most common scenarios. Apply these patterns throughout the application as needed!
