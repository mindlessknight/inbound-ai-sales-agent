'use client';

import { AuditResult, CompanyData } from '@/types';
import TrendChart from './TrendChart';
import PersonaInsights from './PersonaInsights';

interface AuditResultsProps {
  audit: AuditResult;
  companyData: CompanyData;
  role: string;
  onReset: () => void;
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

function RenewalBadge({ days, urgency }: { days: number; urgency: string }) {
  const colors = {
    high: 'bg-red-50 text-danger border-red-200',
    medium: 'bg-yellow-50 text-warning border-yellow-200',
    low: 'bg-green-50 text-success border-green-200',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
        colors[urgency as keyof typeof colors] || colors.low
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          urgency === 'high'
            ? 'bg-danger'
            : urgency === 'medium'
              ? 'bg-warning'
              : 'bg-success'
        }`}
      />
      Renewal in {days} days
    </span>
  );
}

function ConfidenceBadge({ level }: { level: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gray-50 text-text-secondary border border-border">
      Confidence: {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}

export default function AuditResults({
  audit,
  companyData,
  role,
  onReset,
}: AuditResultsProps) {
  const sections = [
    { title: 'Company Snapshot', content: audit.snapshot },
    { title: 'Cost Trend', content: audit.cost_trend },
    { title: 'Peer Comparison', content: audit.peer_comparison },
  ];

  return (
    <div className="min-h-screen bg-surface py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-3xl text-navy mb-2">
                {companyData.company_name}
              </h2>
              <p className="text-text-secondary">
                {companyData.employee_count} employees &middot;{' '}
                {companyData.industry} &middot; {companyData.location.state}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <RenewalBadge
                days={companyData.days_until_renewal}
                urgency={audit.renewal_urgency}
              />
              <ConfidenceBadge level={audit.confidence_level} />
            </div>
          </div>

          {/* Key Stat */}
          <div className="bg-navy rounded-lg p-6 text-center">
            <p className="text-blue-200 text-sm uppercase tracking-wider mb-1">
              Key Finding
            </p>
            <p className="text-white font-serif text-2xl">{audit.key_stat}</p>
          </div>

          {/* Headline */}
          <p className="text-center text-text-primary font-serif text-xl mt-6 italic">
            &ldquo;{audit.headline}&rdquo;
          </p>
        </div>

        {/* Analysis Cards */}
        <div className="grid gap-4 mb-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-lg shadow-sm border border-border p-6"
            >
              <h3 className="font-serif text-lg text-navy mb-3">
                {section.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* The Question */}
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-navy p-6 mb-6">
          <h3 className="font-serif text-lg text-navy mb-3">The Question</h3>
          <p className="text-text-primary text-lg leading-relaxed font-medium">
            {audit.the_question}
          </p>
        </div>

        {/* Trend Chart */}
        <div className="mb-6">
          <TrendChart premiumHistory={companyData.premium_history} />
        </div>

        {/* Key Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-border p-4 text-center">
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">
              5-Year Total Spend
            </p>
            <p className="text-navy font-bold text-xl">
              {formatCurrency(companyData.five_year_total)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border p-4 text-center">
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">
              Projected Annual Savings
            </p>
            <p className="text-success font-bold text-xl">
              {formatCurrency(companyData.projected_annual_savings)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border p-4 text-center">
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">
              Peer Ranking
            </p>
            <p className="text-danger font-bold text-xl">
              {companyData.benchmark.percentile_rank}th
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border p-4 text-center">
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">
              Plan Design
            </p>
            <p className="text-warning font-bold text-xl">
              {companyData.benchmark.plan_design_rating}
            </p>
          </div>
        </div>

        {/* Persona Insight */}
        <PersonaInsights audit={audit} role={role} />

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
          <h3 className="font-serif text-2xl text-navy mb-3">
            Ready to See the Full Picture?
          </h3>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            This snapshot covers the highlights. A 15-minute conversation with
            our team will show you the complete analysis, including carrier
            alternatives, plan design options, and a detailed savings model.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-block bg-navy hover:bg-navy-light text-white font-semibold py-3.5 px-8 rounded-md transition-colors text-lg"
            >
              Book a 15-Minute Benefits Review
            </a>
            <button
              disabled
              className="inline-block bg-gray-100 text-text-secondary font-medium py-3.5 px-8 rounded-md cursor-not-allowed text-sm"
            >
              Download Full Report (Coming Soon)
            </button>
          </div>
          <button
            onClick={onReset}
            className="mt-6 text-accent hover:text-navy text-sm font-medium underline underline-offset-2 transition-colors"
          >
            Run Another Analysis
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-text-secondary leading-relaxed pb-10">
          <p>
            This analysis is based on publicly available Department of Labor
            Form 5500 filings and aggregated peer benchmarking data. Individual
            results may vary.
          </p>
          <p className="mt-1">
            James P. Bennett &amp; Company &middot; Est. 1932 &middot; Santa
            Monica, CA
          </p>
        </div>
      </div>
    </div>
  );
}
