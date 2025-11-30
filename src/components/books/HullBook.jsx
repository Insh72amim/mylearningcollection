import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';

const HullBook = ({ onBack }) => {
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
      title: 'Introduction',
      summary: 'Overview of derivatives markets, including exchange-traded and over-the-counter markets. Introduces forward contracts, futures contracts, options, and the types of traders (hedgers, speculators, arbitrageurs).',
    },
    {
      id: 2,
      title: 'Futures Markets and Central Counterparties',
      summary: 'Mechanics of futures markets: opening and closing positions, specification of contracts, convergence of futures price to spot price, daily settlement and margins, and the role of central counterparties (CCPs).',
    },
    {
      id: 3,
      title: 'Hedging Strategies Using Futures',
      summary: 'Principles of hedging: short hedges, long hedges, basis risk, cross hedging, and computing the optimal hedge ratio. Discusses rolling the hedge forward.',
    },
    {
      id: 4,
      title: 'Interest Rates',
      summary: 'Types of interest rates (Treasury, LIBOR/SOFR, Repo). Continuous compounding, zero rates, bond pricing, bond yield, par yield, and forward rates. Duration and convexity.',
    },
    {
      id: 5,
      title: 'Determination of Forward and Futures Prices',
      summary: 'Arbitrage arguments to determine forward prices for investment assets (stocks, currencies) and consumption assets (commodities). Cost of carry model.',
    },
    {
      id: 6,
      title: 'Interest Rate Futures',
      summary: 'Day count conventions, quotation of Treasury bond and Eurodollar futures. Duration-based hedging strategies using interest rate futures.',
    },
    {
      id: 7,
      title: 'Swaps',
      summary: 'Mechanics of interest rate swaps and currency swaps. Comparative advantage argument. Valuation of swaps using bonds or forward rate agreements (FRAs).',
    },
    {
      id: 8,
      title: 'Securitization and the Credit Crisis of 2007',
      summary: 'The process of securitization, ABS, MBS, and CDOs. The role of the U.S. housing market and subprime lending in the 2007 crisis.',
    },
    {
      id: 9,
      title: 'Mechanics of Options Markets',
      summary: 'Types of options (calls, puts), positions, underlying assets, specification of stock options, trading, commissions, margins, and the Options Clearing Corporation.',
    },
    {
      id: 10,
      title: 'Properties of Stock Options',
      summary: 'Factors affecting option prices. Upper and lower bounds for option prices. Put-call parity relationship for European options. Early exercise of American options.',
    },
    {
      id: 11,
      title: 'Trading Strategies Involving Options',
      summary: 'Strategies such as covered calls, protective puts, spreads (bull, bear, box, butterfly, calendar, diagonal), and combinations (straddles, strips, straps, strangles).',
    },
    {
      id: 12,
      title: 'Binomial Trees',
      summary: 'Introduction to the one-step and two-step binomial model. Risk-neutral valuation principle. Delta hedging in a binomial context. Matching volatility with u and d parameters.',
    },
    {
      id: 13,
      title: 'Wiener Processes and Ito\'s Lemma',
      summary: 'Stochastic processes, Markov property, Brownian motion (Wiener process). Generalized Wiener process. Ito process. Derivation and application of Ito\'s Lemma.',
    },
    {
      id: 14,
      title: 'The Black-Scholes-Merton Model',
      summary: 'Lognormal property of stock prices. The Black-Scholes-Merton differential equation and pricing formulas for European calls and puts. Implied volatility.',
    },
    {
      id: 15,
      title: 'Employee Stock Options',
      summary: 'Nature of ESOs, vesting periods, and dilution. Accounting standards (FAS 123, IFRS 2). Valuation challenges and backdating scandals.',
    },
    {
      id: 16,
      title: 'Options on Stock Indices and Currencies',
      summary: 'Modifying BSM for assets paying a continuous dividend yield. Pricing index options and currency options (Garman-Kohlhagen).',
    },
    {
      id: 17,
      title: 'Options on Futures',
      summary: 'Black\'s model for valuing options on futures. American futures options vs. American spot options.',
    },
    {
      id: 18,
      title: 'The Greek Letters',
      summary: 'Delta, Gamma, Theta, Vega, and Rho. Hedging portfolios using Greeks. Scenario analysis and stress testing.',
    },
    {
      id: 19,
      title: 'Volatility Smiles',
      summary: 'Put-call parity and implied volatility. Volatility smiles for currencies vs. equities (skew). Term structure of volatility.',
    },
    {
      id: 20,
      title: 'Basic Numerical Procedures',
      summary: 'Finite difference methods (implicit, explicit, Crank-Nicolson) for solving differential equations. Monte Carlo simulation basics.',
    }
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Finance
        </button>
        
        <div className="flex items-start gap-6">
          <div className="w-24 h-32 bg-gradient-to-br from-green-700 to-emerald-900 rounded-lg shadow-xl flex items-center justify-center shrink-0 border border-green-600">
            <BookOpen size={40} className="text-green-100" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Options, Futures, and Other Derivatives</h1>
            <p className="text-xl text-gray-400 mb-4">John C. Hull • 10th Edition</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-green-900/50 text-green-300 text-sm border border-green-700">
                Derivatives
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm border border-blue-700">
                Risk Management
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-sm border border-purple-700">
                Financial Engineering
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
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-900/50 text-green-400 font-bold text-sm border border-green-800">
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
                <h4 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">Summary</h4>
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

export default HullBook;
