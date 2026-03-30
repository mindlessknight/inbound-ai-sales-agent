export interface CompanyData {
  company_name: string;
  location: { state: string };
  industry: string;
  employee_count: number;
  plan_type: string;
  primary_carrier: string;
  renewal_date: string;
  days_until_renewal: number;
  premium_history: PremiumYear[];
  commission_history: number[];
  commission_trend: string;
  benchmark: {
    percentile_rank: number;
    cost_competitiveness: string;
    plan_design_rating: string;
  };
  five_year_total: number;
  projected_annual_savings: number;
  projected_five_year_savings: number;
}

export interface PremiumYear {
  year: number;
  premium: number;
  yoyChange: string | null;
}

export interface AuditResult {
  headline: string;
  snapshot: string;
  cost_trend: string;
  peer_comparison: string;
  the_question: string;
  key_stat: string;
  renewal_urgency: 'high' | 'medium' | 'low';
  confidence_level: 'high' | 'medium' | 'low';
  cfo_insight: string;
  hr_insight: string;
  ceo_insight: string;
}

export interface FormData {
  companyName: string;
  role: string;
  employeeCount: string;
  email: string;
  industry: string;
  state: string;
}
