export const hullChaptersDetailed = [
  {
    id: 1,
    title: 'Introduction',
    summary: 'Overview of derivatives markets, including exchange-traded and over-the-counter markets. Introduces forward contracts, futures contracts, options, and the types of traders (hedgers, speculators, arbitrageurs).',
    sections: [
      {
        title: 'What is a Derivative?',
        content: 'A derivative is a financial instrument whose value depends on (or derives from) the values of other, more basic, underlying variables. Common underlying assets include stocks, currencies, interest rates, and commodities.',
        points: [
          'Derivatives are used for hedging (risk reduction), speculation (betting on market moves), and arbitrage (risk-free profit).',
          'Exchange-traded markets (e.g., CME, CBOE) have standardized contracts and central clearing.',
          'Over-the-counter (OTC) markets are larger, customizable, but carry counterparty risk (though reduced by collateral and central clearing post-2008).'
        ]
      },
      {
        title: 'Forward Contracts',
        content: 'A forward contract is an agreement to buy or sell an asset at a certain future time for a certain price. It is traded in the OTC market.',
        points: [
          'Long Position: The party agreeing to buy the asset.',
          'Short Position: The party agreeing to sell the asset.',
          'Payoff (Long): S_T - K',
          'Payoff (Short): K - S_T',
          'Where S_T is the spot price at maturity and K is the delivery price.'
        ]
      },
      {
        title: 'Options',
        content: 'Options give the holder the right, but not the obligation, to buy (Call) or sell (Put) an asset by a certain date for a certain price (Strike Price).',
        points: [
          'Call Option: Right to buy. Profit = max(S_T - K, 0) - Premium.',
          'Put Option: Right to sell. Profit = max(K - S_T, 0) - Premium.',
          'American Options: Can be exercised at any time up to maturity.',
          'European Options: Can be exercised only on the maturity date.'
        ]
      }
    ],
    diagrams: [
      {
        title: 'Option Payoff Diagrams',
        type: 'interactive',
        component: 'OptionPayoffDiagram',
        description: 'Visualizing the profit/loss profiles for Long Call, Short Call, Long Put, and Short Put positions.'
      }
    ]
  },
  {
    id: 2,
    title: 'Futures Markets and Central Counterparties',
    summary: 'Mechanics of futures markets: opening and closing positions, specification of contracts, convergence of futures price to spot price, daily settlement and margins.',
    sections: [
      {
        title: 'Futures Contracts',
        content: 'Like forwards, but standardized and traded on exchanges. Key features include daily settlement (marking to market) and the use of margin accounts.',
        points: [
          'Initial Margin: The amount that must be deposited when the contract is entered into.',
          'Maintenance Margin: The minimum balance required in the margin account.',
          'Margin Call: If balance falls below maintenance margin, trader must top up to the initial margin level (Variation Margin).'
        ]
      },
      {
        title: 'Convergence Property',
        content: 'As the delivery month of a futures contract is approached, the futures price converges to the spot price of the underlying asset.',
        points: [
          'If F > S, arbitrageurs sell futures and buy spot, driving F down.',
          'If F < S, arbitrageurs buy futures and sell spot, driving F up.'
        ]
      }
    ],
    keyPoints: [
      'Futures are standardized; Forwards are customizable.',
      'Futures have virtually no credit risk due to daily settlement and clearing houses.',
      'Most futures contracts are closed out before maturity; very few lead to physical delivery.'
    ]
  },
  {
    id: 3,
    title: 'Hedging Strategies Using Futures',
    summary: 'Principles of hedging: short hedges, long hedges, basis risk, cross hedging, and computing the optimal hedge ratio.',
    sections: [
      {
        title: 'Short vs. Long Hedges',
        content: 'A short hedge involves a short position in futures contracts. A long hedge involves a long position in futures contracts.',
        points: [
          'Short Hedge: Appropriate when the hedger already owns an asset and expects to sell it in the future (e.g., a farmer selling corn). Protects against price decreases.',
          'Long Hedge: Appropriate when a company knows it will have to purchase an asset in the future (e.g., a cereal company buying corn). Protects against price increases.'
        ]
      },
      {
        title: 'Basis Risk',
        content: 'Basis = Spot Price of Asset to be Hedged - Futures Price of Contract Used. Perfect hedging is rare because the asset may differ from the underlying, or the date may differ.',
        points: [
          'Basis Risk arises from uncertainty about the basis when the hedge is closed out.',
          'Effective Price = Initial Spot + Gain/Loss on Futures = Final Spot + (Initial Futures - Final Futures).'
        ]
      },
      {
        title: 'Optimal Hedge Ratio',
        content: 'The ratio of the size of the position taken in futures contracts to the size of the exposure. It minimizes the variance of the hedged position.',
        example: {
          language: 'python',
          code: `
import numpy as np

def optimal_hedge_ratio(spot_prices, futures_prices):
    """
    Calculates the minimum variance hedge ratio (h*).
    h* = rho * (sigma_S / sigma_F)
    """
    delta_S = np.diff(spot_prices)
    delta_F = np.diff(futures_prices)
    
    # Covariance between spot and futures price changes
    cov_SF = np.cov(delta_S, delta_F)[0, 1]
    
    # Variance of futures price changes
    var_F = np.var(delta_F, ddof=1)
    
    h_star = cov_SF / var_F
    return h_star

# Example Data
spot = [50, 51, 52, 51, 50]
futures = [52, 53, 54, 53, 51]

h = optimal_hedge_ratio(spot, futures)
print(f"Optimal Hedge Ratio: {h:.4f}")
`
        }
      }
    ]
  },
  {
    id: 5,
    title: 'Determination of Forward and Futures Prices',
    summary: 'Arbitrage arguments to determine forward prices for investment assets (stocks, currencies) and consumption assets (commodities). Cost of carry model.',
    sections: [
      {
        title: 'Investment Assets (No Income)',
        content: 'For an investment asset that provides no income (e.g., non-dividend paying stock), the forward price F0 is related to the spot price S0 by:',
        points: [
          'F0 = S0 * e^(rT)',
          'where r is the risk-free rate and T is time to maturity.',
          'If F0 > S0 * e^(rT), buy spot, borrow cash, short forward (Cash & Carry Arbitrage).',
          'If F0 < S0 * e^(rT), short spot, invest cash, long forward (Reverse Cash & Carry).'
        ]
      },
      {
        title: 'Known Income or Yield',
        content: 'If the asset provides a known income (I) or continuous yield (q):',
        points: [
          'Known Income (I): F0 = (S0 - I) * e^(rT)',
          'Known Yield (q): F0 = S0 * e^((r-q)T)',
          'This applies to stock indices (dividend yield) and currencies (foreign risk-free rate).'
        ]
      },
      {
        title: 'Cost of Carry',
        content: 'The relationship can be summarized as F0 = S0 * e^(cT), where c is the cost of carry.',
        points: [
          'Investment asset: c = r - q',
          'Consumption asset: c = r + u - y (where u is storage cost, y is convenience yield).'
        ]
      }
    ],
    diagrams: [
      {
        title: 'Cost of Carry Model',
        type: 'interactive',
        component: 'CostOfCarryDiagram',
        description: 'Interactive calculator showing how Interest Rate, Time, and Yield affect Forward Price.'
      }
    ]
  },
  {
    id: 9,
    title: 'Mechanics of Options Markets',
    summary: 'Types of options, positions, underlying assets, specification of stock options, trading, commissions, margins.',
    sections: [
      {
        title: 'Stock Options Specification',
        content: 'Standard exchange-traded options usually represent 100 shares. Strike prices are spaced at $2.50, $5, or $10 intervals.',
        points: [
          'Expiration usually occurs on the third Friday of the expiration month.',
          'Stock splits and dividends adjust the strike price and number of shares to maintain economic value.'
        ]
      },
      {
        title: 'Moneyness',
        content: 'Describes the relationship between spot price (S) and strike price (K).',
        points: [
          'In-the-money (ITM): Call (S > K), Put (S < K). Has intrinsic value.',
          'At-the-money (ATM): S ≈ K.',
          'Out-of-the-money (OTM): Call (S < K), Put (S > K). Intrinsic value is zero.'
        ]
      }
    ]
  },
  {
    id: 10,
    title: 'Properties of Stock Options',
    summary: 'Factors affecting option prices. Upper and lower bounds. Put-call parity.',
    sections: [
      {
        title: 'Factors Affecting Prices',
        content: 'Six key variables affect the price of a stock option:',
        points: [
          '1. Current Stock Price (S0): +Call, -Put',
          '2. Strike Price (K): -Call, +Put',
          '3. Time to Expiration (T): +Call, +Put (usually)',
          '4. Volatility (sigma): +Call, +Put',
          '5. Risk-free Rate (r): +Call, -Put',
          '6. Dividends (D): -Call, +Put'
        ]
      },
      {
        title: 'Put-Call Parity',
        content: 'A fundamental relationship between European call and put prices with the same strike and maturity.',
        points: [
          'c + K*e^(-rT) = p + S0',
          'Portfolio A: Call + Cash (PV of K)',
          'Portfolio B: Put + Share',
          'Both portfolios have the same payoff max(S_T, K) at maturity, so they must have the same value today.'
        ],
        example: {
          language: 'python',
          code: `
import math

def check_put_call_parity(c, p, S, K, r, T):
    """
    Verifies Put-Call Parity: c + Ke^(-rT) = p + S
    """
    lhs = c + K * math.exp(-r * T)
    rhs = p + S
    
    print(f"LHS (Call + Bond): {lhs:.2f}")
    print(f"RHS (Put + Stock): {rhs:.2f}")
    
    if abs(lhs - rhs) < 0.01:
        return "Parity Holds"
    else:
        return "Arbitrage Opportunity!"

# Example: c=3, p=2.25, S=31, K=30, r=10%, T=0.25
print(check_put_call_parity(3.00, 2.25, 31, 30, 0.10, 0.25))
`
        }
      }
    ]
  },
  {
    id: 11,
    title: 'Trading Strategies Involving Options',
    summary: 'Spreads and combinations to profit from specific market views (bullish, bearish, volatile, neutral).',
    sections: [
      {
        title: 'Spreads',
        content: 'Combining options of the same class (calls or puts) on the same stock.',
        points: [
          'Bull Spread: Buy Low Strike Call (K1), Sell High Strike Call (K2). Limits upside and downside.',
          'Bear Spread: Buy High Strike Put (K2), Sell Low Strike Put (K1).',
          'Butterfly Spread: Buy K1 Call, Sell 2 K2 Calls, Buy K3 Call. Profits if stock stays near K2.'
        ]
      },
      {
        title: 'Combinations',
        content: 'Combining calls and puts.',
        points: [
          'Straddle: Buy Call and Put with same K and T. Profits from high volatility (big move in either direction).',
          'Strangle: Buy Put (K1) and Call (K2) where K1 < K2. Cheaper than straddle, needs bigger move.'
        ]
      }
    ],
    diagrams: [
      {
        title: 'Strategy Visualizer',
        type: 'interactive',
        component: 'StrategyVisualizer',
        description: 'Interactive tool to plot payoff diagrams for Bull Spreads, Butterfly Spreads, and Straddles.'
      }
    ]
  },
  {
    id: 12,
    title: 'Binomial Trees',
    summary: 'A discrete-time model for valuing options. The underlying asset price follows a random walk.',
    sections: [
      {
        title: 'One-Step Binomial Model',
        content: 'Construct a risk-free portfolio consisting of the stock and the option (delta hedging).',
        points: [
          'Stock price S starts at S0, moves up to Su or down to Sd.',
          'Option price f moves to fu or fd.',
          'Delta (Δ) = (fu - fd) / (Su - Sd).',
          'Risk-neutral probability p = (e^(rT) - d) / (u - d).'
        ]
      },
      {
        title: 'Risk-Neutral Valuation',
        content: 'In a risk-neutral world, the expected return on all assets is the risk-free rate.',
        points: [
          'f = e^(-rT) * [p * fu + (1-p) * fd]',
          'This principle simplifies valuation significantly as we do not need to know the real-world drift of the stock.'
        ]
      }
    ],
    diagrams: [
      {
        title: 'Binomial Tree Explorer',
        type: 'interactive',
        component: 'BinomialTreeDiagram',
        description: 'Visualizing a multi-step binomial tree and option valuation at each node.'
      }
    ]
  },
  {
    id: 13,
    title: 'Wiener Processes and Ito\'s Lemma',
    summary: 'The mathematical foundation for continuous-time finance models.',
    sections: [
      {
        title: 'Brownian Motion (Wiener Process)',
        content: 'A variable z follows a Wiener process if:',
        points: [
          '1. The change Δz during a small time Δt is ε * sqrt(Δt), where ε ~ N(0,1).',
          '2. The values of Δz for any two different short intervals are independent.'
        ]
      },
      {
        title: 'Geometric Brownian Motion (GBM)',
        content: 'The standard model for stock prices: dS = μSdt + σSdz.',
        points: [
          'μ is the expected return (drift).',
          'σ is the volatility.',
          'The discrete version is: ΔS/S ~ N(μΔt, σ^2Δt).'
        ]
      },
      {
        title: 'Ito\'s Lemma',
        content: 'The "Chain Rule" of stochastic calculus. If x follows an Ito process, then a function G(x, t) follows:',
        points: [
          'dG = (∂G/∂x dx + ∂G/∂t dt + 0.5 * ∂2G/∂x2 (dx)^2)',
          'This is crucial for deriving the Black-Scholes equation.'
        ]
      }
    ]
  },
  {
    id: 14,
    title: 'The Black-Scholes-Merton Model',
    summary: 'The Nobel Prize-winning formula for pricing European options.',
    sections: [
      {
        title: 'The Formulas',
        content: 'Pricing European Call (c) and Put (p) options:',
        points: [
          'c = S0 * N(d1) - K * e^(-rT) * N(d2)',
          'p = K * e^(-rT) * N(-d2) - S0 * N(-d1)',
          'd1 = [ln(S0/K) + (r + sigma^2/2)T] / (sigma * sqrt(T))',
          'd2 = d1 - sigma * sqrt(T)'
        ]
      },
      {
        title: 'Interpretation',
        content: 'N(d2) is the probability that the option will be exercised in a risk-neutral world. N(d1) * S0 is the asset component.',
        example: {
          language: 'python',
          code: `
import math
from scipy.stats import norm

def black_scholes(S, K, T, r, sigma, type='call'):
    """
    Calculates Black-Scholes option price.
    """
    d1 = (math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    
    if type == 'call':
        price = S * norm.cdf(d1) - K * math.exp(-r * T) * norm.cdf(d2)
    else:
        price = K * math.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
        
    return price

# Example: S=42, K=40, T=0.5, r=10%, sigma=20%
call_price = black_scholes(42, 40, 0.5, 0.10, 0.20, 'call')
print(f"Call Price: \${call_price:.2f}")
`
        }
      }
    ]
  }
];
