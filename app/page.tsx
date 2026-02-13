'use client';

import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState<'quiz' | 'result'>('quiz');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'revenue',
      question: 'Annual revenue is:',
      options: [
        { label: 'Under $500K', points: 1 },
        { label: '$500K - $1M', points: 2 },
        { label: '$1M - $3M', points: 3 },
        { label: '$3M+', points: 4 },
      ],
    },
    {
      id: 'profitability',
      question: 'Net profit margin is:',
      options: [
        { label: 'Breaking even or negative', points: 1 },
        { label: '5-15%', points: 2 },
        { label: '15-25%', points: 3 },
        { label: '25%+', points: 4 },
      ],
    },
    {
      id: 'documentation',
      question: 'Financial records are:',
      options: [
        { label: 'Inconsistent or incomplete', points: 1 },
        { label: 'Basic spreadsheets', points: 2 },
        { label: 'Solid bookkeeping, reviewed by CPA', points: 3 },
        { label: 'Audited financials, clean books', points: 4 },
      ],
    },
    {
      id: 'dependency',
      question: 'Business runs without you:',
      options: [
        { label: 'Not at all — you are the business', points: 1 },
        { label: 'Can take a week off with help', points: 2 },
        { label: 'Can take a month off', points: 3 },
        { label: 'Fully systematized, runs itself', points: 4 },
      ],
    },
    {
      id: 'customers',
      question: 'Customer concentration:',
      options: [
        { label: 'One customer is 50%+ of revenue', points: 1 },
        { label: 'Top 3 customers are 50%+', points: 2 },
        { label: 'Top 5 customers are 30-40%', points: 3 },
        { label: 'Diversified, no single customer over 10%', points: 4 },
      ],
    },
    {
      id: 'growth',
      question: 'Revenue trend (last 3 years):',
      options: [
        { label: 'Declining', points: 1 },
        { label: 'Flat', points: 2 },
        { label: 'Growing 5-15% annually', points: 3 },
        { label: 'Growing 15%+ annually', points: 4 },
      ],
    },
    {
      id: 'systems',
      question: 'Operations are:',
      options: [
        { label: 'Mostly in your head', points: 1 },
        { label: 'Some written processes', points: 2 },
        { label: 'Well documented SOPs', points: 3 },
        { label: 'Fully systematized, software-driven', points: 4 },
      ],
    },
  ];

  const handleAnswer = (questionId: string, points: number) => {
    setAnswers({ ...answers, [questionId]: points });
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const calculateScore = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const max = questions.length * 4;
    return Math.round((total / max) * 100);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 85) {
      return {
        title: 'Exit Ready',
        message:
          'Your business is highly attractive to buyers. Clean financials, solid systems, and strong fundamentals. You could likely close a deal within 6-12 months.',
        color: 'text-green-600',
        bg: 'bg-green-50',
      };
    }
    if (score >= 70) {
      return {
        title: 'Nearly Ready',
        message:
          "You're close. A few improvements to documentation, systems, or diversification would make your business significantly more sellable.",
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      };
    }
    if (score >= 50) {
      return {
        title: 'Work Required',
        message:
          'Your business has potential but needs foundational work. Focus on financial clarity, reducing owner dependency, and building repeatable systems.',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
      };
    }
    return {
      title: 'Not Yet Sellable',
      message:
        'Significant work needed before you can attract serious buyers. Start with clean financials, consistent profitability, and reducing key-person risk.',
      color: 'text-red-600',
      bg: 'bg-red-50',
    };
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    
    // TODO: Send to backend/API
    console.log({ businessName, email, score, answers });
    
    setSubmitted(true);
    setStep('result');
  };

  if (step === 'result') {
    const score = calculateScore();
    const scoreData = getScoreMessage(score);

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-2xl mx-auto pt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className={`inline-block px-6 py-3 rounded-full ${scoreData.bg} mb-4`}>
                <span className={`text-5xl font-bold ${scoreData.color}`}>{score}</span>
                <span className="text-slate-600 text-xl ml-2">/ 100</span>
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${scoreData.color}`}>{scoreData.title}</h2>
              <p className="text-slate-700 text-lg leading-relaxed">{scoreData.message}</p>
            </div>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mt-8">
                <p className="text-emerald-900 font-medium text-center">
                  ✓ Results sent to <span className="font-bold">{email}</span>
                </p>
                <p className="text-emerald-700 text-sm text-center mt-2">
                  We'll follow up with a detailed analysis and next steps.
                </p>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">What This Means:</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    <strong>85-100:</strong> Premium buyers will compete for your business
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    <strong>70-84:</strong> Attractive deal with minor improvements needed
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    <strong>50-69:</strong> 6-12 months of prep to become sellable
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    <strong>Below 50:</strong> 12-24 months of foundational work required
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setStep('quiz');
                setAnswers({});
                setEmail('');
                setBusinessName('');
                setSubmitted(false);
              }}
              className="w-full mt-8 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto pt-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Is Your Business Ready to Sell?
          </h1>
          <p className="text-xl text-slate-600">
            Answer 7 questions. Get your exit readiness score.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="mb-8 last:mb-0">
              <div className="flex items-start mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm mr-3 flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{q.question}</h3>
              </div>

              <div className="space-y-2 ml-11">
                {q.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswer(q.id, option.points)}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                      answers[q.id] === option.points
                        ? 'border-blue-500 bg-blue-50 text-blue-900 font-medium'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {allAnswered && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!email || !businessName}
                className="w-full mt-6 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-lg"
              >
                Get My Score
              </button>

              <p className="text-sm text-slate-500 text-center mt-4">
                We'll email you a detailed breakdown and next steps
              </p>
            </div>
          )}
        </div>

        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Built by <a href="https://github.com/maybenat" className="underline hover:text-slate-700">Natalie</a></p>
        </footer>
      </div>
    </main>
  );
}
