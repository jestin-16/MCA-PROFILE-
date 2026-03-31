import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthProvider } from './AuthContext';
import App from './App.tsx';
import './index.css';

const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://placeholder.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConvexProvider>
  </StrictMode>,
);
