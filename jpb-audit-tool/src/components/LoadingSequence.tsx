'use client';

import { useState, useEffect } from 'react';

const STEPS = [
  'Matching company records...',
  'Pulling Form 5500 filing data...',
  'Analyzing premium trends...',
  'Running peer benchmarking...',
  'Generating your custom analysis...',
];

const STEP_DURATIONS = [1500, 1500, 1500, 1500, 2000];

export default function LoadingSequence() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= STEPS.length) return;
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, STEP_DURATIONS[currentStep]);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-10">
        <h3 className="font-serif text-2xl text-navy mb-8 text-center">
          Analyzing Your Benefits Data
        </h3>

        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const isComplete = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {isComplete ? (
                    <svg
                      className="w-5 h-5 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : isActive ? (
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-border" />
                  )}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    isComplete
                      ? 'text-success font-medium'
                      : isActive
                        ? 'text-text-primary font-medium'
                        : 'text-text-secondary'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-accent h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
