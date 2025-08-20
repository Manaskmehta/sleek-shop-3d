import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'
import { CartProvider } from '@/hooks/useCart'

// Get the publishable key from environment variables
const PUBLISHABLE_KEY = "pk_test_Y2hhcm1pbmctY2FuYXJ5LTUyLmNsZXJrLmFjY291bnRzLmRldiQ"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <CartProvider>
      <App />
    </CartProvider>
  </ClerkProvider>
);
