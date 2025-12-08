import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';

const SecurityAnalysisBook = ({ onBack }) => {
  const [expandedChapters, setExpandedChapters] = useState({});

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const chapters = [
    {
      id: 1,
      title: 'Part I: Survey and Approach - Introduction',
      summary: 'Distinction between investment and speculation. The concept of "margin of safety". The intrinsic value vs. market price. The role of analysis in investment.',
    },
    {
      id: 2,
      title: 'The Problem of Selection and the Human Element',
      summary: 'The difficulty of predicting the future. The importance of qualitative vs. quantitative factors. The psychology of the investor and the market.',
    },
    {
      id: 3,
      title: 'Part II: Fixed-Value Investments - The Selection of Fixed-Value Investments',
      summary: 'Criteria for selecting bonds and preferred stocks. Safety of principal and stability of income. The importance of earnings coverage.',
    },
    {
      id: 4,
      title: 'Bond Investment and the "Safety First" Principle',
      summary: 'The primary objective of bond investment is to avoid loss. The concept of a "fixed" claim. The relationship between yield and risk.',
    },
    {
      id: 5,
      title: 'Specific Standards for Bond Investment',
      summary: 'Quantitative tests for bond safety: size of enterprise, stock/equity ratio, property value, and earnings record. Minimum coverage requirements.',
    },
    {
      id: 6,
      title: 'Part III: Senior Securities with Speculative Features - Privileged Issues',
      summary: 'Analysis of convertible bonds and preferred stocks. The value of the conversion privilege. The risk/reward trade-off in hybrid securities.',
    },
    {
      id: 7,
      title: 'Technical Characteristics of Convertible Issues',
      summary: 'Conversion ratios, conversion periods, and anti-dilution clauses. How to value the option component of a convertible security.',
    },
    {
      id: 8,
      title: 'Part IV: Theory of Common-Stock Investment - The Dividend Factor',
      summary: 'The importance of dividends in common stock valuation. Dividend policy and its impact on shareholder value. The "bird in the hand" theory.',
    },
    {
      id: 9,
      title: 'The Earning Power Factor',
      summary: 'Earnings as the primary determinant of stock value. Adjusting reported earnings for non-recurring items. The concept of "normalized" earnings.',
    },
    {
      id: 10,
      title: 'Capitalization Structure',
      summary: 'The impact of leverage on equity value. Optimal capital structure. The risks of high debt levels.',
    },
    {
      id: 11,
      title: 'Part V: Analysis of the Income Account - The Income Account',
      summary: 'Detailed analysis of the income statement. Revenue recognition, expense classification, and depreciation policies. Detecting earnings manipulation.',
    },
    {
      id: 12,
      title: 'Depreciation and Amortization',
      summary: 'The importance of adequate depreciation charges. Different methods of depreciation and their impact on reported earnings.',
    },
    {
      id: 13,
      title: 'Part VI: Balance-Sheet Analysis - The Balance Sheet',
      summary: 'Analysis of assets and liabilities. The significance of book value. Working capital analysis and the current ratio.',
    },
    {
      id: 14,
      title: 'Inventories and Receivables',
      summary: 'Valuation of inventory (LIFO vs. FIFO). Analysis of accounts receivable and bad debt reserves. Signs of deteriorating asset quality.',
    },
    {
      id: 15,
      title: 'Part VII: Additional Aspects of Security Analysis - Discrepancies Between Price and Value',
      summary: 'Identifying undervalued and overvalued securities. The concept of "net-net" stocks (trading below net current asset value).',
    },
    {
      id: 16,
      title: 'Market Analysis and Technical Analysis',
      summary: 'Graham\'s skepticism of technical analysis. The distinction between fundamental analysis and market timing.',
    },
    {
      id: 17,
      title: 'Challenges to the Analyst',
      summary: 'The changing economic environment. The need for continuous learning and adaptation. The ethical responsibilities of the analyst.',
    },
    {
      id: 18,
      title: 'Margin of Safety as the Central Concept of Investment',
      summary: 'The unifying theme of the book. Margin of safety allows for error in judgment or bad luck. It is the secret of sound investment.',
    },
    {
      id: 19,
      title: 'Investment in Distressed Securities',
      summary: 'Opportunities in bankruptcies and reorganizations. The specialized knowledge required for this type of investing.',
    },
    {
      id: 20,
      title: 'Global Investing and Currency Risk',
      summary: 'Considerations for investing in foreign securities. The impact of exchange rate fluctuations on investment returns.',
    }
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">

        
        <div className="flex items-start gap-6">
          <div className="w-24 h-32 bg-gradient-to-br from-yellow-700 to-orange-900 rounded-lg shadow-xl flex items-center justify-center shrink-0 border border-yellow-600">
            <BookOpen size={40} className="text-yellow-100" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Security Analysis</h1>
            <p className="text-xl text-gray-400 mb-4">Benjamin Graham & David Dodd • 6th Edition</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-yellow-900/50 text-yellow-300 text-sm border border-yellow-700">
                Value Investing
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm border border-blue-700">
                Fundamental Analysis
              </span>
              <span className="px-3 py-1 rounded-full bg-red-900/50 text-red-300 text-sm border border-red-700">
                Classic
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Chapters</h2>
        {chapters.map((chapter) => (
          <div 
            key={chapter.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600"
          >
            <button 
              onClick={() => toggleChapter(chapter.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-900/50 text-yellow-400 font-bold text-sm border border-yellow-800">
                  {chapter.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{chapter.title}</h3>
                </div>
              </div>
              {expandedChapters[chapter.id] ? <ChevronDown className="text-gray-400" /> : <ChevronRight className="text-gray-400" />}
            </button>

            {expandedChapters[chapter.id] && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-700 bg-gray-800/50">
                <h4 className="text-sm font-semibold text-yellow-400 mb-2 uppercase tracking-wider">Summary</h4>
                <p className="text-gray-300 leading-relaxed">
                  {chapter.summary}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityAnalysisBook;
