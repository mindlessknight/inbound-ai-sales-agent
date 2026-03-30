import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { SYSTEM_PROMPT, buildUserMessage } from '@/lib/generateAudit';
import { CompanyData, AuditResult } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { companyData, role } = (await request.json()) as {
      companyData: CompanyData;
      role: string;
    };

    const userMessage = buildUserMessage(companyData, role);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || '';

    // Strip markdown code blocks if present
    let jsonStr = content.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
    }

    const result: AuditResult = JSON.parse(jsonStr);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Audit generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate audit' },
      { status: 500 }
    );
  }
}
