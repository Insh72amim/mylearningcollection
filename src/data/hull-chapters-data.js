export const hullChaptersDetailed = [
  {
    id: 1,
    title: 'Introduction to Derivatives',
    summary: 'A derivative is a financial instrument whose value depends on the values of other, more basic, underlying variables. This chapter introduces the core concepts of forward contracts, futures, options, and swaps.',
    sections: [
      {
        title: 'Definition and Types',
        content: 'Derivatives are securities with prices derived from one or more assets. They are primarily used for three purposes: hedging (risk reduction), speculation (betting on market direction), and arbitrage (locking in risk-free profit).',
        definitions: [
          {
             term: "Forward Contract",
             def: "An agreement to buy or sell an asset at a certain future time for a certain price. Traded OTC."
          },
          {
             term: "Spot Price ($S_t$)",
             def: "The price of an asset for immediate delivery."
          },
             {
             term: "Delivery Price ($K$)",
             def: "The price agreed upon in a forward contract."
          }
        ],
        points: [
          '**Exchange-traded markets** (e.g., CME, CBOE) standardize contracts to ensure liquidity and eliminate counterparty risk via a central clearinghouse.',
          '**Over-the-counter (OTC) markets** involve direct trades between two parties (usually financial institutions). They are much larger than exchange-traded markets but carry higher credit risk.',
        ]
      },
      {
        title: 'Forward Contracts Payoffs',
        content: 'The payoff from a forward contract depends on the spot price of the asset at maturity ($S_T$) relative to the delivery price ($K$).',
        equations: [
          { label: "Payoff for Long Position", match: "S_T - K" },
          { label: "Payoff for Short Position", match: "K - S_T" }
        ],
        points: [
          'A **long position** benefits when the asset price rises ($S_T > K$).',
          'A **short position** benefits when the asset price falls ($S_T < K$).',
          'Since it is a binding contract, there is no option to walk away; the payoff can be negative.'
        ]
      },
      {
        title: 'Options vs Forwards',
        content: 'Unlike forwards, options provide the **right but not the obligation** to trade.',
        points: [
          '**Call Option**: Right to buy an asset at strike price $K$.',
          '**Put Option**: Right to sell an asset at strike price $K$.',
          '**Premium**: The upfront cost to buy the option.'
        ]
      }
    ],
    deepDive: {
      title: "The 2008 Financial Crisis & OTC Derivatives",
      content: "The 2008 crisis highlighted the systemic risk in OTC derivatives, particularly Credit Default Swaps (CDS). AIG collapsed because it had sold massive amounts of protection (CDS) on mortgage-backed securities without posting sufficient collateral. When the housing market crashed, AIG couldn't pay its counterparties, leading to a government bailout. This led to post-crisis regulations (Dodd-Frank, EMIR) requiring standardized OTC derivatives to be cleared through Central Counterparties (CCPs)."
    }
  },
  {
    id: 2,
    title: 'Futures Markets and Central Counterparties',
    summary: 'Futures contracts are standardized forward contracts traded on exchanges. This chapter details how margins, daily settlement, and clearinghouses mitigate risk.',
    sections: [
      {
         title: "The Mechanics of Trading",
         content: "Futures contracts specify the asset, contract size, delivery arrangements, and delivery month. Prices are quoted on exchanges.",
         points: [
            "**Limit Orders**: Order to buy/sell at a specific price or better.",
            "**Market Orders**: Order to buy/sell immediately at the best available price.",
            "**Open Interest**: The total number of contracts outstanding (equal to number of long positions or number of short positions)."
         ]
      },
      {
        title: 'Margins and Daily Settlement',
        content: 'To eliminate credit risk, exchanges use a system of margins. At the end of each trading day, the margin account is adjusted to reflect the investor\'s gain or loss (Marking to Market).',
        definitions: [
           { term: "Initial Margin", def: "The amount deposited when the contract is opened." },
           { term: "Maintenance Margin", def: "The minimum balance required to keep the position open." },
           { term: "Variation Margin", def: "Funds an investor must add if the balance usually falls below the maintenance margin to bring it back to the initial margin." }
        ],
         equations: [
            { label: "Margin Balance Change", match: "\\text{New Balance} = \\text{Old Balance} + (F_t - F_{t-1}) \\times \\text{Contract Size} \\times N" }
         ]
      },
      {
        title: 'Convergence of Futures to Spot',
        content: 'As the delivery month approaches, the futures price ($F_t$) must converge to the spot price ($S_t$).',
        chart: {
            type: 'line',
            title: 'Convergence of Futures Price to Spot Price',
            xKey: 'time',
            lines: [
                { key: 'futures', name: 'Futures Price', color: '#8884d8' },
                { key: 'spot', name: 'Spot Price', color: '#82ca9d' }
            ],
            data: [
                { time: 'T-6', futures: 105, spot: 100 },
                { time: 'T-5', futures: 104, spot: 101 },
                { time: 'T-4', futures: 103.5, spot: 101.5 },
                { time: 'T-3', futures: 103, spot: 102 },
                { time: 'T-2', futures: 102.5, spot: 102.2 },
                { time: 'T-1', futures: 102, spot: 101.9 },
                { time: 'Maturity', futures: 102, spot: 102 }
            ]
        },
        points: [
          'If $F_T > S_T$, arbitrageurs sell futures, buy spot, and make risk-free profit.',
          'If $F_T < S_T$, arbitrageurs buy futures, sell spot, and make risk-free profit.',
          'Therefore, at maturity, $F_T \\approx S_T$.'
        ]
      }
    ],
    keyPoints: [
      'Futures are standardized; Forwards are customizable.',
      'Clearinghouses act as the buyer to every seller and seller to every buyer, removing bilaterial credit risk.',
      'Most contracts are closed out before maturity (offsetting trade) rather than settled physically.'
    ]
  },
  {
    id: 3,
    title: 'Hedging Strategies Using Futures',
    summary: 'Hedging involves taking a futures position that is opposite to a position in the spot market to reduce price risk.',
    sections: [
      {
        title: 'Basic Hedging Principles',
        content: 'Companies use futures to lock in prices for assets they produce or need to buy.',
        points: [
          '**Short Hedge**: Use if you own the asset and want to sell it later (fear price drop). Sell Futures.',
          '**Long Hedge**: Use if you need to buy the asset later (fear price rise). Buy Futures.'
        ]
      },
      {
        title: 'Basis Risk',
        content: 'Perfect hedges are rare. Basis risk arises when the asset being hedged is not identical to the asset underlying the futures contract, or the timing doesn\'t match.',
        equations: [
            { label: "Basis", match: "\\text{Basis} = S_t - F_t" },
            { label: "Effective Price", match: "S_{Final} + (F_{Initial} - F_{Final})" }
        ]
      },
      {
        title: 'Optimal Hedge Ratio',
        content: 'When there is no futures contract on the exact asset being hedged (cross-hedging), we need calculating the Minimum Variance Hedge Ratio ($h^*$).',
        match: "h^* = \\rho \\frac{\\sigma_S}{\\sigma_F}"
      }
    ],
    deepDive: {
        title: "Metallgesellschaft's Hedging Debacle (1993)",
        content: "Metallgesellschaft (MG) sold long-term oil supply contracts to customers and hedged by rolling over short-term futures contracts (stack-and-roll hedge). In theory, this was sound. However, when oil prices fell, MG faced massive margin calls on their futures long positions. Even though their long-term customer contracts were gaining value, those gains were unrealized, while the margin calls required immediate cash. The liquidity crisis forced MG to liquidate the hedge at a huge loss ($1.3 billion)."
    }
  },
    {
    id: 5,
    title: 'Determination of Forward and Futures Prices',
    summary: 'Theoretical pricing of forwards based on the no-arbitrage principle. The specific formula depends on whether the asset provides income or has storage costs.',
    sections: [
      {
        title: 'Investment Assets',
        content: 'For assets like non-dividend paying stocks or gold held for investment.',
        equations: [
            { label: "No Income", match: "F_0 = S_0 e^{rT}" },
            { label: "Known Income (I)", match: "F_0 = (S_0 - I) e^{rT}" },
            { label: "Known Yield (q)", match: "F_0 = S_0 e^{(r-q)T}" }
        ]
      },
      {
        title: 'Consumption Assets',
        content: 'For commodities that are consumed (e.g., oil, corn), there is a storage cost ($u$) and a convenience yield ($y$) for holding physical inventory.',
        equations: [
           { label: "Cost of Carry Model", match: "F_0 = S_0 e^{(r+u-y)T}" }
        ],
        points: [
           "If the convenience yield ($y$) is high (scarcity), $F_0 < S_0 e^{(r+u)T}$ (Backwardation).",
           "If supply is plentiful, $F_0 > S_0$ (Contango)."
        ]
      }
    ]
  },
  {
    id: 10,
    title: 'Properties of Stock Options',
    summary: 'The relationship between option prices and market variables. Introduction of boundary conditions and Put-Call Parity.',
    sections: [
       {
          title: "Put-Call Parity",
          content: "A fundamental no-arbitrage relationship between European call and put prices with the same strike and expiration.",
          match: "c + K e^{-rT} = p + S_0",
          points: [
             "Portfolio A: Buy Call + Cash ($Ke^{-rT}$). Payoff at T: $\\max(S_T, K)$.",
             "Portfolio B: Buy Put + Share ($S_0$). Payoff at T: $\\max(S_T, K)$.",
             "Since payoffs are identical, present values must be equal."
          ]
       },
       {
          title: "Bounds for Option Prices",
          content: "Option prices cannot violate these bounds without creating arbitrage opportunities.",
          mathBlock: true,
          match: `
\\text{Lower Bound (Call)}: S_0 - K e^{-rT} \\le c
\\\\
\\text{Lower Bound (Put)}: K e^{-rT} - S_0 \\le p
\\\\
\\text{Upper Bound}: c \\le S_0, \\quad p \\le K e^{-rT}
          `
       }
    ]
  },
  {
    id: 11,
    title: 'Trading Strategies Involving Options',
    summary: 'Combining options to create payoffs tailored to specific market views (bullish, bearish, high volatility, low volatility).',
    sections: [
      {
        title: 'Bull Spread',
        content: 'Buy a call with a low strike ($K_1$) and sell a call with a high strike ($K_2$). Used when expecting a moderate price increase.',
        chart: {
            type: 'area', // Use area chart to show P/L zones
            title: 'Bull Call Spread Payoff (Long 100 Call, Short 120 Call)',
            xKey: 'price',
            lines: [
                { key: 'profit', name: 'Profit', color: '#22c55e', gradientId: 'colorProfit' },
            ],
            data: [
                { price: 80, profit: -5 },
                { price: 100, profit: -5 },
                { price: 120, profit: 15 },
                { price: 140, profit: 15 }
            ]
        },
        points: [
           "Limits both upside potential and downside risk.",
           "Cost = Price of $K_1$ Call - Price of $K_2$ Call."
        ]
      },
      {
        title: 'Straddle',
        content: 'Buy a call and a put with the same strike ($K$) and expiration. Used when expecting high volatility but uncertain direction.',
        chart: {
             type: 'area',
             title: 'Long Straddle Payoff (Strike 100)',
             xKey: 'price',
             lines: [
                 { key: 'pl', name: 'P/L', color: '#8884d8', gradientId: 'colorProfit' } // Simplified for now
             ],
             data: [
                 { price: 70, pl: 20 },
                 { price: 80, pl: 10 },
                 { price: 90, pl: 0 },
                 { price: 100, pl: -10 }, // Max loss at strike
                 { price: 110, pl: 0 },
                 { price: 120, pl: 10 },
                 { price: 130, pl: 20 }
             ]
        },
        points: [
           "Profit if stock moves significantly in EITHER direction.",
           "expensive strategy because you pay two premiums."
        ]
      }
    ]
  },
  {
      id: 12,
      title: "Binomial Trees",
      summary: "A popular numerical method for valuing options. It models the asset price as a discrete-time process moving up or down at each step.",
      sections: [
          {
              title: "One-Step Binomial Model",
              content: "The stock price starts at $S_0$ and moves to either $S_0 u$ (up) or $S_0 d$ (down) with probabilities $p$ and $1-p$.",
              match: "p = \\frac{e^{r\\Delta t} - d}{u - d}, \\quad u = e^{\\sigma \\sqrt{\\Delta t}}, \\quad d = 1/u",
              interactive: {
                  title: "1-Step Binomial Tree",
                  initialNodes: [
                      { id: '1', position: { x: 100, y: 100 }, data: { label: 'S0 = 100' }, type: 'default' },
                      { id: '2', position: { x: 300, y: 50 }, data: { label: 'Su = 110' }, type: 'default' },
                      { id: '3', position: { x: 300, y: 150 }, data: { label: 'Sd = 90' }, type: 'default' },
                  ],
                  initialEdges: [
                       { id: 'e1-2', source: '1', target: '2', label: 'p', animated: true },
                       { id: 'e1-3', source: '1', target: '3', label: '1-p' }
                  ]
              },
              points: [
                  "We construct a risk-free portfolio to calculate the option price.",
                  "This method guarantees no arbitrage."
              ]
          }
      ]
  },
  {
    id: 13,
    title: 'Wiener Processes and Ito\'s Lemma',
    summary: 'The mathematical machinery of continuous-time finance. Modeling asset price movements as stochastic processes.',
    sections: [
        {
           title: "Brownian Motion",
           content: "A variable $z$ follows a Wiener process if changes $\\Delta z$ over small time $\\Delta t$ satisfy:",
           match: "\\Delta z = \\epsilon \\sqrt{\\Delta t}, \\quad \\epsilon \\sim N(0,1)"
        },
        {
           title: "Geometric Brownian Motion (GBM)",
           content: "The standard model for stock prices ($S$), encompassing drift (expected return) and diffusion (volatility).",
           match: "dS = \\mu S dt + \\sigma S dz",
           points: [
              "$\\mu$ is expected return.",
              "$\\sigma$ is volatility.",
              "This implies stock prices are **log-normally distributed**."
           ]
        },
        {
            title: "Asset Price Monte Carlo Simulation",
            content: "Visualizing the random path of asset prices generated by the geometric Brownian motion equation over time. Notice how the spread (uncertainty) increases with time.",
            chart: {
                type: 'line',
                title: '5 Random Price Paths (Monte Carlo)',
                xKey: 't',
                lines: [
                    { key: 'path1', name: 'Path 1', color: '#60a5fa' },
                    { key: 'path2', name: 'Path 2', color: '#f87171' },
                    { key: 'path3', name: 'Path 3', color: '#34d399' },
                    { key: 'path4', name: 'Path 4', color: '#fbbf24' },
                    { key: 'path5', name: 'Path 5', color: '#a78bfa' }
                ],
                data: [
                    { t: 0, path1: 100, path2: 100, path3: 100, path4: 100, path5: 100 },
                    { t: 1, path1: 102, path2: 98, path3: 101, path4: 99, path5: 100.5 },
                    { t: 2, path1: 105, path2: 97, path3: 103, path4: 98, path5: 101 },
                    { t: 3, path1: 104, path2: 95, path3: 104, path4: 99, path5: 102 },
                    { t: 4, path1: 108, path2: 94, path3: 106, path4: 97, path5: 103 },
                    { t: 5, path1: 110, path2: 93, path3: 105, path4: 98, path5: 104 },
                    { t: 6, path1: 115, path2: 91, path3: 108, path4: 96, path5: 105 },
                    { t: 7, path1: 114, path2: 90, path3: 110, path4: 97, path5: 106 },
                    { t: 8, path1: 120, path2: 88, path3: 109, path4: 95, path5: 107 },
                    { t: 9, path1: 125, path2: 86, path3: 112, path4: 94, path5: 108 },
                    { t: 10, path1: 130, path2: 85, path3: 115, path4: 93, path5: 110 }
                ]
            }
        },
        {
           title: "Ito's Lemma",
           content: "The fundamental theorem of stochastic calculus. For a function $G(S, t)$ of a stochastic variable $S$, the differential $dG$ is given by:",
           mathBlock: true,
           match: "dG = \\left( \\frac{\\partial G}{\\partial S} \\mu S + \\frac{\\partial G}{\\partial t} + \\frac{1}{2} \\frac{\\partial^2 G}{\\partial S^2} \\sigma^2 S^2 \\right) dt + \\frac{\\partial G}{\\partial S} \\sigma S dz"
        }
    ]
  },
  {
    id: 14,
    title: 'The Black-Scholes-Merton Model',
    summary: 'The most famous formula in finance for pricing European options, derived by constructing a risk-free portfolio.',
    sections: [
       {
          title: "The Black-Scholes Formulas",
          content: "The price of a European call option $c$ and put option $p$:",
          definitions: [
             { term: "$N(x)$", def: "Cumulative distribution function of standard normal distribution." }
          ],
          mathBlock: true,
          match: `
c = S_0 N(d_1) - K e^{-rT} N(d_2)
\\\\
p = K e^{-rT} N(-d_2) - S_0 N(-d_1)
          `
       },
       {
          title: "Numerical Example",
          content: "Let's calculate the price of a call option with the following parameters:",
          points: [
             "$S_0 = 100$ (Stock Price)",
             "$K = 100$ (Strike Price)",
             "$r = 0.05$ (Risk-free rate: 5%)",
             "$\\sigma = 0.2$ (Volatility: 20%)",
             "$T = 1.0$ (Time to maturity: 1 year)"
          ],
          mathBlock: true,
          match: `
\\begin{aligned}
d_1 &= \\frac{\\ln(100/100) + (0.05 + 0.2^2/2) \\times 1}{0.2 \\sqrt{1}} \\\\
    &= \\frac{0 + 0.07}{0.2} = 0.35 \\\\
\\\\
d_2 &= 0.35 - 0.2 = 0.15 \\\\
\\\\
N(d_1) &= N(0.35) = 0.6368 \\\\
N(d_2) &= N(0.15) = 0.5596 \\\\
\\\\
c &= 100 \\times 0.6368 - 100 \\times e^{-0.05} \\times 0.5596 \\\\
  &= 63.68 - 100 \\times 0.9512 \\times 0.5596 \\\\
  &= 63.68 - 53.23 = 10.45
\\end{aligned}
          `
       }
    ],
    deepDive: {
       title: "Black Monday (1987) & The Volatility Smile",
       content: "Before the 1987 crash, implied volatility was relatively flat across strike prices (consistent with Black-Scholes). After the crash, where the market fell 22% in a day, traders realized extreme downside moves were more frequent than a normal distribution predicted. This led to the 'Volatility Smile' or 'Skew', where OTM puts trade at much higher implied volatilities than ATM calls, reflecting the market's fear of another crash."
    }
  },
  {
      id: 19,
      title: "The Greek Letters",
      summary: "The 'Greeks' measure the sensitivity of an option's price to various factors (price, time, volatility). They are essential for risk management.",
      sections: [
          {
              title: "Delta ($\\Delta$)",
              content: "Rate of change of option price with respect to stock price ($S$).",
              match: "\\Delta = \\frac{\\partial c}{\\partial S} = N(d_1)",
              points: [
                  "Long Call: $\\Delta > 0$ (approx 0.5 for ATM)",
                  "Long Put: $\\Delta < 0$",
                  "**Delta Hedging**: Creating a risk-neutral portfolio by eliminating directional risk."
              ]
          },
          {
              title: "Gamma ($\\Gamma$)",
              content: "Rate of change of Delta with respect to stock price (curvature). High Gamma indicates high risk of large delta shifts.",
              match: "\\Gamma = \\frac{\\partial^2 c}{\\partial S^2} = \\frac{N'(d_1)}{S \\sigma \\sqrt{T}}",
              chart: {
                type: 'line',
                title: 'Gamma vs Stock Price (Strike=100)',
                xKey: 'price',
                lines: [{ key: 'gamma', name: 'Gamma', color: '#f472b6' }],
                data: [
                    { price: 80, gamma: 0.01 },
                    { price: 90, gamma: 0.03 },
                    { price: 95, gamma: 0.06 },
                    { price: 100, gamma: 0.08 }, // Peak at ATM
                    { price: 105, gamma: 0.06 },
                    { price: 110, gamma: 0.03 },
                    { price: 120, gamma: 0.01 }
                ]
              },
              points: [
                  "Highest for ATM options.",
                  "High Gamma means Delta changes rapidly, making hedging difficult."
              ]
          },
          {
              title: "Theta ($\\Theta$)",
              content: "Time decay. Sensitivity to the passage of time.",
              match: "\\Theta = \\frac{\\partial c}{\\partial t}",
              chart: {
                  type: "line",
                  title: "Theta Decay (Time Value Erosion)",
                  xKey: "time",
                  lines: [{ key: "value", name: "Option Value", color: "#f87171" }],
                  data: [
                      { time: "90 Days", value: 5.0 },
                      { time: "60 Days", value: 4.2 },
                      { time: "30 Days", value: 3.1 },
                      { time: "15 Days", value: 2.2 },
                      { time: "7 Days", value: 1.5 },
                      { time: "0 Days", value: 0 }
                  ]
              },
              points: [
                  "Theta is usually negative for long positions (value erodes as expiration approaches).",
                  "Decay accelerates in the final month."
              ]
          },
          {
              title: "Vega ($\\nu$)",
              content: "Sensitivity to volatility ($\\sigma$).",
              match: "\\nu = \\frac{\\partial c}{\\partial \\sigma}",
              points: [
                  "Long options have positive Vega (benefit from rising volatility).",
                  "Crucial for trading volatility events (earnings, FOMC)."
              ]
          }
      ],
      keyPoints: [
          "Greeks are dynamic and change as market conditions change.",
          "Traders manage 'Greek limits' to control portfolio risk exposure.",
          "Gamma squeeze is a phenomenon driven by market makers hedging negative Gamma."
      ]
  },
  {
      id: 20,
      title: "Volatility Smiles",
      summary: "The Black-Scholes model assumes constant volatility, but real markets show that implied volatility varies with strike price.",
      sections: [
          {
              title: "Equity Skew",
              content: "For equities, low strike puts have higher implied volatility than high strike calls. This reflects the 'crashophobia' or fear of large downside moves.",
              chart: {
                  type: "line",
                  title: "Equity Volatility Skew",
                  xKey: "strike",
                  lines: [{ key: "iv", name: "Implied Volatility (%)", color: "#60a5fa" }],
                  data: [
                      { strike: "80% (OTM Put)", iv: 35 },
                      { strike: "90% (OTM Put)", iv: 28 },
                      { strike: "100% (ATM)", iv: 20 },
                      { strike: "110% (OTM Call)", iv: 18 },
                      { strike: "120% (OTM Call)", iv: 17 }
                  ]
              }
          },
          {
              title: "FX Smile",
              content: "For foreign exchange, the volatility curve often looks like a smile, with OTM calls and puts both having higher IV than ATM options. This implies the market expects extreme moves in either direction (fat tails).",
               chart: {
                  type: "line",
                  title: "FX Volatility Smile",
                  xKey: "strike",
                  lines: [{ key: "iv", name: "Implied Volatility (%)", color: "#c084fc" }],
                  data: [
                      { strike: "Delta 25 Put", iv: 12 },
                      { strike: "ATM", iv: 8 },
                      { strike: "Delta 25 Call", iv: 12 }
                  ]
              }
          }
      ]
  },
  {
    id: 22,
    title: "Value at Risk (VaR)",
    summary: "VaR is a statistical technique used to measure and quantify the level of financial risk within a firm or investment portfolio over a specific time frame.",
    sections: [
        {
            title: "Definition",
            content: "We are $X$ percent certain that we will not lose more than $V$ dollars in time $T$.",
            match: "\\text{VaR} = \\sigma N^{-1}(X) \\sqrt{T}",
            chart: {
                type: 'area',
                title: 'VaR 95% Confidence Interval (Normal Dist)',
                xKey: 'x',
                lines: [
                    { key: 'prob', name: 'Probability', color: '#8884d8', gradientId: 'colorProfit' }, // Standard area
                    { key: 'tail', name: '5% Tail Loss', color: '#ef4444', gradientId: 'colorLoss' }
                ],
                data: [
                    { x: -3.0, tail: 0.004, prob: 0 },
                    { x: -2.5, tail: 0.017, prob: 0 },
                    { x: -2.0, tail: 0.054, prob: 0 },
                    { x: -1.65, tail: 0.1, prob: 0.1 }, // Cutoff 95%
                    { x: -1.0, tail: 0, prob: 0.24 },
                    { x: 0.0, tail: 0, prob: 0.4 },
                    { x: 1.0, tail: 0, prob: 0.24 },
                    { x: 2.0, tail: 0, prob: 0.054 },
                    { x: 3.0, tail: 0, prob: 0.004 }
                ]
            },
            points: [
                "**1-day 99% VaR**: The max loss expected in 1 day with 99% confidence.",
                "Regulatory capital usage (Basel III) often depends on VaR."
            ]
        }
    ]
  }
];
