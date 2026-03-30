import { AuditResult } from '@/types';

interface PersonaInsightsProps {
  audit: AuditResult;
  role: string;
}

export default function PersonaInsights({ audit, role }: PersonaInsightsProps) {
  let title: string;
  let content: string;
  let icon: string;

  if (role.includes('CFO') || role.includes('Financial')) {
    title = 'Impact on Your Bottom Line';
    content = audit.cfo_insight;
    icon = 'CFO';
  } else if (role.includes('HR')) {
    title = 'Impact on Your Employees';
    content = audit.hr_insight;
    icon = 'HR';
  } else {
    title = 'Impact on Your Growth';
    content = audit.ceo_insight;
    icon = 'CEO';
  }

  return (
    <div className="bg-navy/[0.03] border border-navy/10 rounded-lg p-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">
          {icon}
        </div>
        <h4 className="font-serif text-lg text-navy">{title}</h4>
      </div>
      <p className="text-text-secondary leading-relaxed">{content}</p>
    </div>
  );
}
