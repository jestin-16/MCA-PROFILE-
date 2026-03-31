import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthProvider } from './AuthContext';
import App from './App.tsx';
import './index.css';

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h1 style={{ color: '#ef4444' }}>Missing Convex Configuration</h1>
        <p>Please set the <code>VITE_CONVEX_URL</code> environment variable to connect to your Convex backend.</p>
      </div>
    </StrictMode>
  );
} else {
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
}
