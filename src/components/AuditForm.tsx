'use client';

import { useState } from 'react';
import { FormData } from '@/types';

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
];

interface AuditFormProps {
  onSubmit: (data: FormData) => void;
}

export default function AuditForm({ onSubmit }: AuditFormProps) {
  const [form, setForm] = useState<FormData>({
    companyName: '',
    role: '',
    employeeCount: '',
    email: '',
    industry: '',
    state: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const errs: Partial<FormData> = {};
    if (!form.companyName.trim()) errs.companyName = 'Required';
    if (!form.role) errs.role = 'Required';
    if (!form.employeeCount) errs.employeeCount = 'Required';
    if (!form.email.trim()) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Invalid email';
    if (!form.industry) errs.industry = 'Required';
    if (!form.state) errs.state = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 border rounded-md text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition ${
      errors[field] ? 'border-danger' : 'border-border'
    }`;

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight mb-4">
            How Does Your Benefits Program Compare?
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Get a free, instant analysis of your company&apos;s health insurance
            costs, peer ranking, and savings potential. No sales call required.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g., Acme Manufacturing"
              value={form.companyName}
              onChange={(e) => update('companyName', e.target.value)}
              className={inputClass('companyName')}
            />
            {errors.companyName && (
              <p className="text-danger text-xs mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Your Role
            </label>
            <select
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
              className={inputClass('role')}
            >
              <option value="">Select your role</option>
              <option value="CFO / Chief Financial Officer">
                CFO / Chief Financial Officer
              </option>
              <option value="HR Director / VP of HR">
                HR Director / VP of HR
              </option>
              <option value="CEO / President / Owner">
                CEO / President / Owner
              </option>
            </select>
            {errors.role && (
              <p className="text-danger text-xs mt-1">{errors.role}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Employee Count
              </label>
              <select
                value={form.employeeCount}
                onChange={(e) => update('employeeCount', e.target.value)}
                className={inputClass('employeeCount')}
              >
                <option value="">Select range</option>
                <option value="100-250">100-250</option>
                <option value="250-500">250-500</option>
                <option value="500-1000">500-1,000</option>
                <option value="1000+">1,000+</option>
              </select>
              {errors.employeeCount && (
                <p className="text-danger text-xs mt-1">
                  {errors.employeeCount}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Industry
              </label>
              <select
                value={form.industry}
                onChange={(e) => update('industry', e.target.value)}
                className={inputClass('industry')}
              >
                <option value="">Select industry</option>
                <option>Manufacturing</option>
                <option>Food &amp; Beverage</option>
                <option>Hospitality</option>
                <option>Professional Services</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Other</option>
              </select>
              {errors.industry && (
                <p className="text-danger text-xs mt-1">{errors.industry}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Work Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className={inputClass('email')}
              />
              {errors.email && (
                <p className="text-danger text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                State
              </label>
              <select
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
                className={inputClass('state')}
              >
                <option value="">Select state</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-danger text-xs mt-1">{errors.state}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-navy hover:bg-navy-light text-white font-semibold py-3.5 px-6 rounded-md transition-colors text-lg mt-2"
          >
            Run My Benefits Audit
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-text-secondary text-sm">
            Powered by Department of Labor Form 5500 public filings
          </p>
          <p className="text-text-secondary text-xs">
            Your data is not shared. This analysis uses publicly available
            federal filings.
          </p>
        </div>
      </div>
    </div>
  );
}
