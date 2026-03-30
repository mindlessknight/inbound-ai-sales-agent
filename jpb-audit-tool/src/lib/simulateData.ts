import { CompanyData } from '@/types';

export function simulateCompanyData(
  companyName: string,
  employeeCount: string,
  industry: string,
  state: string
): CompanyData {
  const industryMultipliers: Record<string, number> = {
    'Manufacturing': 1.15,
    'Food & Beverage': 1.05,
    'Hospitality': 0.95,
    'Professional Services': 1.20,
    'Technology': 1.25,
    'Healthcare': 1.30,
    'Other': 1.10,
  };

  const baseCostPerEmployee = 7800;
  const multiplier = industryMultipliers[industry] || 1.10;
  const employeeMidpoint: Record<string, number> = {
    '100-250': 175,
    '250-500': 375,
    '500-1000': 700,
    '1000+': 1200,
  };
  const empCount = employeeMidpoint[employeeCount] || 300;

  const currentYear = 2025;
  let currentPremium = baseCostPerEmployee * multiplier * empCount;

  const premiums = [currentPremium];
  for (let i = 1; i < 5; i++) {
    currentPremium = currentPremium / (1 + (0.08 + Math.random() * 0.14));
    premiums.unshift(currentPremium);
  }

  const premiumHistory = premiums.map((p, i) => ({
    year: currentYear - 4 + i,
    premium: Math.round(p),
    yoyChange: i > 0
      ? ((premiums[i] - premiums[i - 1]) / premiums[i - 1] * 100).toFixed(1)
      : null,
  }));

  const carriers = [
    'Blue Cross Blue Shield',
    'UnitedHealthcare',
    'Aetna',
    'Cigna',
    'Kaiser Permanente',
    'Anthem',
  ];
  const carrier = carriers[Math.floor(Math.random() * carriers.length)];

  const renewalMonths = [1, 1, 1, 1, 7, 10, 4];
  const renewalMonth = renewalMonths[Math.floor(Math.random() * renewalMonths.length)];
  const monthNames: Record<number, string> = {
    1: 'January',
    4: 'April',
    7: 'July',
    10: 'October',
  };
  const renewalDate = `${monthNames[renewalMonth]} 1, ${currentYear + 1}`;

  const today = new Date();
  const renewal = new Date(currentYear + 1, renewalMonth - 1, 1);
  const daysUntilRenewal = Math.max(
    Math.ceil((renewal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    45
  );

  const commissionRate = 0.04 + Math.random() * 0.02;
  const commissionHistory = premiums.map((p) => Math.round(p * commissionRate));

  const percentileRank = Math.floor(55 + Math.random() * 35);
  const costCompetitiveness =
    percentileRank > 75
      ? 'Below Average'
      : percentileRank > 60
        ? 'Average'
        : 'Above Average';
  const planDesignRatings = ['B-', 'C+', 'C', 'B', 'C-'];
  const planDesignRating =
    planDesignRatings[Math.floor(Math.random() * planDesignRatings.length)];

  const fiveYearTotal = premiums.reduce((sum, p) => sum + p, 0);
  const latestPremium = premiums[premiums.length - 1];
  const savingsRate = 0.15 + Math.random() * 0.10;
  const projectedAnnualSavings = Math.round(latestPremium * savingsRate);

  return {
    company_name: companyName,
    location: { state },
    industry,
    employee_count: empCount,
    plan_type: 'Fully Insured',
    primary_carrier: carrier,
    renewal_date: renewalDate,
    days_until_renewal: daysUntilRenewal,
    premium_history: premiumHistory,
    commission_history: commissionHistory,
    commission_trend: 'increasing',
    benchmark: {
      percentile_rank: percentileRank,
      cost_competitiveness: costCompetitiveness,
      plan_design_rating: planDesignRating,
    },
    five_year_total: Math.round(fiveYearTotal),
    projected_annual_savings: projectedAnnualSavings,
    projected_five_year_savings: projectedAnnualSavings * 5,
  };
}
