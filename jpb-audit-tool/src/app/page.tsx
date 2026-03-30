'use client';

import { useState, useCallback } from 'react';
import AuditForm from '@/components/AuditForm';
import LoadingSequence from '@/components/LoadingSequence';
import AuditResults from '@/components/AuditResults';
import { simulateCompanyData } from '@/lib/simulateData';
import { FormData, CompanyData, AuditResult } from '@/types';

type AppState = 'form' | 'loading' | 'results' | 'error';

export default function Home() {
  const [state, setState] = useState<AppState>('form');
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [role, setRole] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(async (formData: FormData) => {
    setState('loading');
    setRole(formData.role);

    const simulated = simulateCompanyData(
      formData.companyName,
      formData.employeeCount,
      formData.industry,
      formData.state
    );
    setCompanyData(simulated);

    // Wait for loading animation minimum (8 seconds total)
    const loadingStart = Date.now();

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyData: simulated, role: formData.role }),
      });

      if (!response.ok) throw new Error('Failed to generate audit');

      const result: AuditResult = await response.json();

      // Ensure minimum loading time of 8 seconds
      const elapsed = Date.now() - loadingStart;
      const remaining = Math.max(0, 8000 - elapsed);
      await new Promise((r) => setTimeout(r, remaining));

      setAudit(result);
      setState('results');
    } catch (err) {
      console.error(err);
      const elapsed = Date.now() - loadingStart;
      const remaining = Math.max(0, 3000 - elapsed);
      await new Promise((r) => setTimeout(r, remaining));
      setErrorMsg(
        'We encountered an issue generating your analysis. Please try again.'
      );
      setState('error');
    }
  }, []);

  const handleReset = useCallback(() => {
    setState('form');
    setCompanyData(null);
    setAudit(null);
    setRole('');
    setErrorMsg('');
  }, []);

  if (state === 'loading') {
    return <LoadingSequence />;
  }

  if (state === 'results' && audit && companyData) {
    return (
      <AuditResults
        audit={audit}
        companyData={companyData}
        role={role}
        onReset={handleReset}
      />
    );
  }

  if (state === 'error') {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-danger"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-navy mb-2">
            Analysis Unavailable
          </h3>
          <p className="text-text-secondary mb-6">{errorMsg}</p>
          <button
            onClick={handleReset}
            className="bg-navy hover:bg-navy-light text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <AuditForm onSubmit={handleSubmit} />;
}
