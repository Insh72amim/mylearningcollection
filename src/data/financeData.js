const sections = {
  "black-scholes": {
    id: "black-scholes",
    title: "Black-Scholes Model",
    description: "Option pricing using stochastic differential equations",
    icon: "Calculator",
    color: "green",
    topics: [
      {
        id: "bs-intro",
        title: "Introduction & Formula",
        content: `
# The Black-Scholes-Merton Model

The Black-Scholes model is a mathematical model for the dynamics of a financial market containing derivative investment instruments. It gives a theoretical estimate of the price of European-style options.

### The Formula

For a non-dividend-paying stock:

\`\`\`math
C(S, t) = N(d_1)S_t - N(d_2)Ke^{-r(T-t)}
\`\`\`

Where:
- **C(S, t)** is the call option price
- **S_t** is the current stock price
- **K** is the strike price
- **r** is the risk-free interest rate
- **T - t** is the time to maturity
- **N** is the cumulative distribution function of the standard normal distribution

And $d_1$ and $d_2$ are given by:

\`\`\`math
d_1 = \\frac{\\ln(S_t/K) + (r + \\sigma^2/2)(T-t)}{\\sigma\\sqrt{T-t}}
\`\`\`

\`\`\`math
d_2 = d_1 - \\sigma\\sqrt{T-t}
\`\`\`

### Key Assumptions
1. **Lognormal Distribution**: The stock price follows a geometric Brownian motion with constant drift and volatility.
2. **No Arbitrage**: There are no risk-free arbitrage opportunities.
3. **Constant Risk-Free Rate**: The risk-free interest rate is constant and known.
4. **No Dividends**: The underlying stock pays no dividends during the option's life.
5. **Frictionless Market**: No transaction costs or taxes.

### Python Implementation

\`\`\`python
import numpy as np
from scipy.stats import norm

def black_scholes(S, K, T, r, sigma, option_type='call'):
    """
    Calculate Black-Scholes option price.
    
    Parameters:
    S: Current stock price
    K: Strike price
    T: Time to maturity (in years)
    r: Risk-free interest rate
    sigma: Volatility of the underlying asset
    option_type: 'call' or 'put'
    """
    d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    
    if option_type == 'call':
        price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    else:
        price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
        
    return price

# Example: Call option
# Stock: $100, Strike: $100, Time: 1 year, Rate: 5%, Volatility: 20%
price = black_scholes(S=100, K=100, T=1, r=0.05, sigma=0.2)
print(f"Call Option Price: \${price:.2f}")
\`\`\`
        `,
      },
      {
        id: "bs-greeks",
        title: "The Greeks",
        content: `
# The Greeks

"The Greeks" are quantities representing the sensitivity of the price of derivatives to a change in underlying parameters. They are vital for risk management.

### Delta ($\\Delta$)
Measures the rate of change of the option value with respect to changes in the underlying asset's price.
- **Call Delta**: $N(d_1)$ (ranges from 0 to 1)
- **Put Delta**: $N(d_1) - 1$ (ranges from -1 to 0)

### Gamma ($\\Gamma$)
Measures the rate of change of Delta with respect to changes in the underlying price. It represents the curvature of the option's value.
- High Gamma means Delta changes rapidly (high risk).

### Theta ($\\Theta$)
Measures the sensitivity of the option price to the passage of time ("time decay").
- Usually negative for long option positions (options lose value as they approach expiration).

### Vega ($\\nu$)
Measures sensitivity to volatility ($\\sigma$).
- Higher volatility generally increases option prices.

### Rho ($\\rho$)
Measures sensitivity to the risk-free interest rate.

\`\`\`python
def calculate_greeks(S, K, T, r, sigma):
    d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
    
    delta = norm.cdf(d1)
    gamma = norm.pdf(d1) / (S * sigma * np.sqrt(T))
    theta = -(S * norm.pdf(d1) * sigma) / (2 * np.sqrt(T)) - r * K * np.exp(-r * T) * norm.cdf(d1 - sigma * np.sqrt(T))
    vega = S * norm.pdf(d1) * np.sqrt(T)
    rho = K * T * np.exp(-r * T) * norm.cdf(d1 - sigma * np.sqrt(T))
    
    return {
        "Delta": delta,
        "Gamma": gamma,
        "Theta": theta,
        "Vega": vega,
        "Rho": rho
    }
\`\`\`
        `,
      },
    ],
  },
  "monte-carlo-methods": {
    id: "monte-carlo-methods",
    title: "Monte Carlo Methods",
    description: "Simulating asset prices and derivative valuation",
    icon: "Activity",
    color: "blue",
    topics: [
      {
        id: "mc-intro",
        title: "Introduction to Monte Carlo",
        content: `
# Monte Carlo Simulations in Finance

Monte Carlo simulations are used to model the probability of different outcomes in a process that cannot easily be predicted due to the intervention of random variables. It is a technique used to understand the impact of risk and uncertainty.

### Why use it?
While Black-Scholes provides a closed-form solution for European options, many exotic options (Asian options, Barrier options, Lookback options) do not have simple analytical formulas. Monte Carlo allows us to price these by simulating thousands of possible price paths.

### Geometric Brownian Motion (GBM)
The standard model for stock price evolution is GBM:

\`\`\`math
dS_t = \\mu S_t dt + \\sigma S_t dW_t
\`\`\`

Where:
- $\\mu$ is the drift (expected return)
- $\\sigma$ is the volatility
- $dW_t$ is a Wiener process (Brownian motion)

In discrete time, this is simulated as:

\`\`\`math
S_{t+\\Delta t} = S_t \\exp\\left( (\\mu - \\frac{1}{2}\\sigma^2)\\Delta t + \\sigma\\sqrt{\\Delta t}Z \\right)
\`\`\`

Where $Z$ is a standard normal random variable ($Z \\sim N(0, 1)$).

### Python Simulation

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def simulate_gbm(S0, mu, sigma, T, dt, n_paths):
    """
    Simulate Geometric Brownian Motion paths
    """
    n_steps = int(T / dt)
    time = np.linspace(0, T, n_steps)
    paths = np.zeros((n_steps, n_paths))
    paths[0] = S0
    
    for t in range(1, n_steps):
        # Generate random shocks
        z = np.random.standard_normal(n_paths)
        # Apply GBM formula
        paths[t] = paths[t-1] * np.exp((mu - 0.5 * sigma**2) * dt + 
                                     sigma * np.sqrt(dt) * z)
    return time, paths

# Simulate 10 paths
time, paths = simulate_gbm(S0=100, mu=0.05, sigma=0.2, T=1.0, dt=0.01, n_paths=10)

# Plotting would happen here
\`\`\`
        `,
      },
      {
        id: "mc-pricing",
        title: "Pricing Derivatives",
        content: `
# Pricing Derivatives with Monte Carlo

The fundamental theorem of asset pricing states that the price of a derivative is the expected value of its discounted payoff under the risk-neutral measure.

### The Algorithm
1. **Simulate** $N$ paths of the underlying asset price from $t=0$ to $t=T$ under the risk-neutral measure (drift $\\mu = r$).
2. **Calculate** the payoff for each path at maturity $T$.
   - For a Call: $\\max(S_T - K, 0)$
   - For an Asian Call: $\\max(\\text{mean}(S) - K, 0)$
3. **Average** the payoffs over all $N$ paths.
4. **Discount** the average payoff back to the present using the risk-free rate $e^{-rT}$.

### Standard Error
The accuracy of the Monte Carlo estimate converges at a rate of $1/\\sqrt{N}$. To reduce the error by a factor of 10, you need 100 times more simulations.

\`\`\`python
def monte_carlo_call_price(S0, K, T, r, sigma, n_sims=10000):
    # Simulate end prices directly (no need for full paths for European options)
    z = np.random.standard_normal(n_sims)
    ST = S0 * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * z)
    
    # Calculate payoffs
    payoffs = np.maximum(ST - K, 0)
    
    # Discount average payoff
    price = np.exp(-r * T) * np.mean(payoffs)
    return price
\`\`\`
        `,
      },
    ],
  },
  "portfolio-optimization": {
    id: "portfolio-optimization",
    title: "Portfolio Optimization",
    description: "Mean-variance optimization, efficient frontier, Sharpe ratio",
    icon: "TrendingUp",
    color: "purple",
    topics: [
      {
        id: "mpt-intro",
        title: "Modern Portfolio Theory",
        content: `
# Modern Portfolio Theory (MPT)

Introduced by Harry Markowitz in 1952, MPT is a mathematical framework for assembling a portfolio of assets such that the expected return is maximized for a given level of risk.

### Key Concepts

1. **Expected Return**: The weighted average of the expected returns of the individual assets.
   $$ E(R_p) = \\sum w_i E(R_i) $$

2. **Portfolio Variance (Risk)**: Depends on the weights, variances, and **correlations** between assets.
   $$ \\sigma_p^2 = \\sum_i \\sum_j w_i w_j \\sigma_i \\sigma_j \\rho_{ij} $$

3. **Diversification**: By combining assets that are not perfectly correlated ($\\rho < 1$), the portfolio variance is less than the weighted average of individual variances.

### The Efficient Frontier
The set of optimal portfolios that offer the highest expected return for a defined level of risk or the lowest risk for a given level of expected return. Portfolios below the efficient frontier are sub-optimal.

### Sharpe Ratio
A measure of risk-adjusted return.
$$ S = \\frac{R_p - R_f}{\\sigma_p} $$
Where $R_f$ is the risk-free rate. MPT aims to maximize this ratio.
        `,
      },
    ],
  },
  "risk-measures": {
    id: "risk-measures",
    title: "Risk Measures",
    description: "Value at Risk (VaR), CVaR, Expected Shortfall",
    icon: "Shield",
    color: "red",
    topics: [
      {
        id: "var",
        title: "Value at Risk (VaR)",
        content: `
# Value at Risk (VaR)

VaR is a statistical technique used to measure and quantify the level of financial risk within a firm, portfolio, or position over a specific time frame.

### Definition
"We are $X\\%$ confident that we will not lose more than $V$ dollars in the next $N$ days."

Example: A 1-day 95% VaR of $1 million means there is a 95% chance the portfolio will not lose more than $1 million in a single day. Or, there is a 5% chance it *will* lose more than $1 million.

### Calculation Methods
1. **Historical Method**: Re-value the portfolio using actual past price changes.
2. **Variance-Covariance (Parametric)**: Assumes returns are normally distributed.
   $$ \\text{VaR} = \\mu - z_{\\alpha} \\sigma $$
3. **Monte Carlo**: Simulate thousands of possible future scenarios.

### Limitations
- **Not Sub-additive**: VaR of a combined portfolio can be greater than the sum of individual VaRs (violates diversification principle).
- **Ignores Tail Magnitude**: It tells you the threshold, but not *how bad* it gets if the threshold is breached.
        `,
      },
      {
        id: "cvar",
        title: "Expected Shortfall (CVaR)",
        content: `
# Expected Shortfall (CVaR)

Also known as Conditional Value at Risk (CVaR), Expected Shortfall answers the question: "If things go bad (i.e., we breach the VaR threshold), what is the expected loss?"

### Definition
It is the average of the losses in the tail of the distribution beyond the VaR cutoff.

$$ \\text{ES}_\\alpha = E[L | L > \\text{VaR}_\\alpha] $$

### Advantages over VaR
- **Coherent Risk Measure**: It satisfies sub-additivity (diversification always reduces risk).
- **Captures Tail Risk**: It accounts for the severity of extreme losses (black swan events).

Regulators (like Basel III) are increasingly moving towards Expected Shortfall for market risk capital requirements.
        `,
      },
    ],
  },
  "financial-products": {
    id: "financial-products",
    title: "Financial Products",
    description: "Overview of major asset classes and instruments",
    icon: "Briefcase",
    color: "orange",
    topics: [
      {
        id: "equities",
        title: "Equities (Stocks)",
        content: `
# Equities (Stocks)

Stocks represent ownership in a company. When you buy a stock, you become a shareholder, which entitles you to a portion of the company's assets and earnings.

### Common Stock vs. Preferred Stock
- **Common Stock**: Grants voting rights and potential dividends. Prices fluctuate based on market demand and company performance.
- **Preferred Stock**: Generally does not offer voting rights but has a higher claim on assets and earnings (dividends are paid before common stockholders).

### Key Metrics
- **Market Cap**: Total value of all outstanding shares ($Price 	imes Shares$).
- **P/E Ratio**: Price-to-Earnings ratio, used to value a company.
- **Dividend Yield**: Annual dividend payments divided by the stock price.
        `,
      },
      {
        id: "fixed-income",
        title: "Fixed Income (Bonds)",
        content: `
# Fixed Income (Bonds)

Bonds are debt securities. When you buy a bond, you are lending money to an entity (government or corporation) for a fixed period at a fixed interest rate.

### Key Terms
- **Principal (Face Value)**: The amount returned at maturity.
- **Coupon**: The interest payment made to the bondholder.
- **Maturity**: The date when the principal is repaid.
- **Yield**: The effective return on the bond based on its current price.

### Types of Bonds
1. **Government Bonds**: Issued by national governments (e.g., US Treasuries). Generally considered low risk.
2. **Corporate Bonds**: Issued by companies. Higher risk and higher yield than government bonds.
3. **Municipal Bonds**: Issued by local governments. Often tax-exempt.

### Bond Pricing
Bond prices are inversely related to interest rates. When rates rise, bond prices fall.
        `,
      },
      {
        id: "derivatives",
        title: "Derivatives",
        content: `
# Derivatives

Derivatives are financial contracts whose value is derived from an underlying asset (stocks, bonds, commodities, currencies).

### Common Types
1. **Options**: Give the buyer the right (but not the obligation) to buy (Call) or sell (Put) an asset at a specific price by a specific date.
2. **Futures**: Contracts to buy or sell an asset at a predetermined price at a specified future date. Unlike options, futures are **obligations**.
3. **Swaps**: Agreements to exchange cash flows (e.g., Interest Rate Swaps exchange fixed rate payments for floating rate payments).

### Uses
- **Hedging**: Reducing risk (e.g., an airline buying oil futures to lock in fuel prices).
- **Speculation**: Betting on price movements to generate profit.
        `,
      },
      {
        id: "funds",
        title: "Funds (ETFs & Mutual Funds)",
        content: `
# Investment Funds

Funds pool money from many investors to purchase a diversified portfolio of assets.

### Mutual Funds
- **Active Management**: Managed by professional fund managers who try to beat the market.
- **Pricing**: Priced once a day at the Net Asset Value (NAV) after markets close.
- **Fees**: Often have higher expense ratios due to active management.

### Exchange-Traded Funds (ETFs)
- **Passive Management**: Typically track an index (like the S&P 500).
- **Trading**: Trade like stocks on an exchange throughout the day.
- **Tax Efficiency**: Generally more tax-efficient than mutual funds.

### Index Funds
A type of mutual fund or ETF constructed to match or track the components of a financial market index. They offer broad market exposure, low operating expenses, and low portfolio turnover.
        `,
      },
      {
        id: "commodities",
        title: "Commodities",
        content: `
# Commodities

Basic goods used in commerce that are interchangeable with other goods of the same type.

### Categories
1. **Energy**: Oil, Natural Gas, Coal.
2. **Metals**: Gold, Silver (Precious); Copper, Aluminum (Industrial).
3. **Agriculture**: Wheat, Corn, Soybeans, Coffee, Sugar.
4. **Livestock**: Cattle, Hogs.

### Investing in Commodities
- **Physical Ownership**: Buying gold bars or coins.
- **Futures Contracts**: Agreements to buy/sell at a future date (most common for institutions).
- **ETFs**: Funds that track commodity prices (e.g., GLD for gold).
- **Stocks**: Buying shares of mining or energy companies.
        `,
      },
      {
        id: "forex",
        title: "Foreign Exchange (Forex)",
        content: `
# Foreign Exchange (Forex)

The market for trading currencies. It is the largest and most liquid financial market in the world.

### Key Concepts
- **Pairs**: Currencies are traded in pairs (e.g., EUR/USD). The first is the *base* currency, the second is the *quote* currency.
- **Pip**: "Percentage in Point". The smallest price move (usually 0.0001).
- **Leverage**: Forex trading often involves high leverage (borrowed money), increasing both potential profit and risk.
- **Spot Market**: Immediate exchange of currencies.
- **Forwards/Futures**: Agreements to exchange currencies at a future date.
        `,
      },
      {
        id: "reits",
        title: "Real Estate Investment Trusts (REITs)",
        content: `
# Real Estate Investment Trusts (REITs)

Companies that own, operate, or finance income-generating real estate. They allow individuals to invest in large-scale real estate portfolios.

### Types
1. **Equity REITs**: Own and operate properties (malls, apartments, offices). Revenue comes from rent.
2. **Mortgage REITs (mREITs)**: Provide financing for real estate by purchasing or originating mortgages. Revenue comes from interest.
3. **Hybrid REITs**: Combination of both.

### Benefits
- **Liquidity**: Traded on stock exchanges like regular stocks.
- **Dividends**: REITs are required to distribute at least 90% of their taxable income to shareholders as dividends.
- **Diversification**: Exposure to real estate without the hassle of managing property.
        `,
      },
      {
        id: "crypto",
        title: "Cryptocurrencies",
        content: `
# Cryptocurrencies

Digital or virtual currencies that use cryptography for security and operate on decentralized networks (blockchains).

### Major Assets
- **Bitcoin (BTC)**: The first and largest cryptocurrency. Often viewed as "digital gold" or a store of value.
- **Ethereum (ETH)**: A platform for decentralized applications (dApps) and smart contracts.
- **Stablecoins**: Pegged to a fiat currency (e.g., USDC, USDT) to minimize volatility.

### Key Concepts
- **Blockchain**: A distributed ledger recording all transactions.
- **DeFi (Decentralized Finance)**: Financial services (lending, trading) built on blockchains without intermediaries.
- **Wallets**: Tools for storing private keys to access crypto assets (Hot wallets vs. Cold storage).
        `,
      },
      {
        id: "abs",
        title: "Asset-Backed Securities (ABS)",
        content: `
# Asset-Backed Securities (ABS)

Financial securities backed by a pool of assets such as loans, leases, credit card debt, or receivables.

### How it Works (Securitization)
1. **Originator**: A bank issues loans (e.g., auto loans).
2. **Pooling**: Loans are grouped together into a pool.
3. **SPV**: The pool is sold to a Special Purpose Vehicle (SPV).
4. **Issuance**: The SPV issues securities backed by the cash flows from the loans.

### Mortgage-Backed Securities (MBS)
A specific type of ABS backed by a pool of mortgages.
- **RMBS**: Residential Mortgage-Backed Securities.
- **CMBS**: Commercial Mortgage-Backed Securities.

### Tranching
Pools are often divided into "tranches" with different risk/return profiles (Senior, Mezzanine, Equity).
        `,
      },
      {
        id: "annuities",
        title: "Annuities",
        content: `
# Annuities

An annuity is a contract between you and an insurance company that requires the insurer to make payments to you, either immediately or in the future. You buy an annuity by making either a single payment or a series of payments. Similarly, your payout may come either as one lump-sum payment or as a series of payments over time.

### Common Types
*   **Fixed Annuities:** The insurance company guarantees that you will earn a minimum rate of interest during the time that your account is growing. The insurance company also guarantees that the periodic payments will be a guaranteed amount per dollar in your account.
*   **Variable Annuities:** You can choose to invest your purchase payments from a range of different investment options, typically mutual funds. The rate of return on your purchase payments, and the amount of the periodic payments you eventually receive, will vary depending on the performance of the investment options you have selected.
*   **Indexed Annuities:** A type of annuity contract that pays an interest rate based on the performance of a specified market index, such as the S&P 500.

### Key Features
*   **Tax-Deferred Growth:** You pay no taxes on the income and investment gains from your annuity until you withdraw the money.
*   **Death Benefit:** If you die before you start receiving payments, your beneficiary receives a specific amount, typically at least the amount of your purchase payments.
`,
      },
      {
        id: "insuranceProducts",
        title: "Insurance Products",
        content: `
# Insurance Products

Life insurance is a contract that pledges payment of an amount to the person assured (or his or her nominee) on the happening of the event insured against. The contract is valid for payment of the insured amount during: The date of maturity, or specified dates at periodic intervals, or unfortunate death, if it occurs earlier.

### Major Categories
*   **Term Life Insurance:** Provides coverage at a fixed rate of payments for a limited period of time, the relevant term. After that period expires, coverage at the previous rate of premiums is no longer guaranteed and the client must either forgo coverage or potentially obtain further coverage with different payments or conditions.
*   **Whole Life Insurance:** A life insurance policy which is guaranteed to remain in force for the insured's entire lifetime, provided required premiums are paid, or to the maturity date.
*   **Universal Life Insurance:** A type of cash value life insurance, sold primarily in the United States. Under the terms of the policy, the excess of premium payments above the current cost of insurance is credited to the cash value of the policy.

### Key Features
*   **Risk Management:** Primary purpose is to transfer risk from an individual to a group.
*   **Cash Value:** Some policies (Whole, Universal) accumulate a cash value that can be borrowed against or withdrawn.
`,
      },
      {
        id: "structuredProducts",
        title: "Structured Products",
        content: `
# Structured Products

Structured products are pre-packaged investments that normally include assets linked to interest plus one or more derivatives. These products may take the form of a "principal-protected" note, where the principal is guaranteed (if held to maturity), or a "principal-at-risk" note, where the principal is not guaranteed.

### Examples
*   **Equity-Linked Notes (ELNs):** Debt instruments where the return is linked to the performance of a single equity, a basket of equities, or an equity index.
*   **Reverse Convertibles:** Short-term notes that pay a high coupon rate. Repayment of principal is linked to the performance of an underlying asset (usually a stock).

### Key Features
*   **Customization:** Can be tailored to meet specific risk-return objectives.
*   **Derivative Component:** The inclusion of derivatives (options, swaps) allows for modified payoff structures.
*   **Credit Risk:** Investors are exposed to the credit risk of the issuer.
`,
      },
      {
        id: "privateEquity",
        title: "Private Equity",
        content: `
# Private Equity

Private equity is an alternative investment class and consists of capital that is not listed on a public exchange. Private equity is composed of funds and investors that directly invest in private companies, or that engage in buyouts of public companies, resulting in the delisting of public equity.

### Strategies
*   **Leveraged Buyouts (LBO):** The acquisition of another company using a significant amount of borrowed money to meet the cost of acquisition. The assets of the company being acquired are often used as collateral for the loans, along with the assets of the acquiring company.
*   **Venture Capital:** Financing that investors provide to startup companies and small businesses that are believed to have long-term growth potential.
*   **Growth Capital:** Equity investments, most often minority investments, in relatively mature companies that are looking for capital to expand or restructure operations, enter new markets or finance a major acquisition without a change of control of the business.

### Key Features
*   **Illiquidity:** Investments are typically locked up for several years.
*   **Active Management:** PE firms often take an active role in the management and operations of the companies they invest in.
`,
      },
      {
        id: "hedgeFunds",
        title: "Hedge Funds",
        content: `
# Hedge Funds

A hedge fund is a pooled investment fund that trades in relatively liquid assets and is able to make extensive use of more complex trading, portfolio-construction and risk management techniques to improve performance, such as short selling, leverage, and derivatives.

### Common Strategies
*   **Long/Short Equity:** Taking long positions in stocks that are expected to appreciate and short positions in stocks that are expected to decline.
*   **Global Macro:** Making bets on major global economic trends, such as changes in interest rates, currencies, or commodity prices.
*   **Event-Driven:** Attempting to profit from specific corporate events, such as mergers, acquisitions, or bankruptcies.

### Key Features
*   **Accredited Investors:** Typically only open to institutional investors and high-net-worth individuals.
*   **Performance Fees:** Managers typically charge a management fee (e.g., 2%) and a performance fee (e.g., 20% of profits).
`,
      },
      {
        id: "moneyMarketInstruments",
        title: "Money Market Instruments",
        content: `
# Money Market Instruments

The money market is a component of the economy which provides short-term funds. The money market deals in short-term loans, generally for a period of less than or equal to 365 days.

### Common Instruments
*   **Treasury Bills (T-Bills):** Short-term government debt obligations backed by the Treasury Department with a maturity of one year or less.
*   **Certificates of Deposit (CDs):** Time deposits offered by banks with a specific maturity date and interest rate.
*   **Commercial Paper (CP):** Unsecured, short-term debt instrument issued by a corporation, typically for the financing of accounts payable and inventories and meeting short-term liabilities.
*   **Repurchase Agreements (Repos):** Short-term borrowing for dealers in government securities.

### Key Features
*   **Liquidity:** Highly liquid instruments.
*   **Safety:** Generally considered low-risk investments.
*   **Short Maturity:** Maturities range from overnight to one year.
`,
      },
      {
        id: "creditDerivatives",
        title: "Credit Derivatives",
        content: `
# Credit Derivatives

A credit derivative is a financial instrument that allows for the transfer of credit risk from one party to another without transferring the underlying asset.

### Types
*   **Credit Default Swaps (CDS):** A financial swap agreement that the seller of the CDS will compensate the buyer in the event of a debt default (by the debtor) or other credit event.
*   **Collateralized Debt Obligations (CDOs):** A structured financial product that pools together cash flow-generating assets and repackages this asset pool into discrete tranches that can be sold to investors.

### Key Features
*   **Risk Transfer:** Allows banks and other lenders to manage their exposure to credit risk.
*   **Speculation:** Investors can use credit derivatives to speculate on the creditworthiness of a company or country.
`,
      },
      {
        id: "exoticOptions",
        title: "Exotic Options",
        content: `
# Exotic Options

An exotic option is an option which differs from common American or European options in terms of the underlying asset or the calculation of how or when the investor receives a certain payoff.

### Examples
*   **Barrier Options:** Options that are either activated (knock-in) or extinguished (knock-out) if the underlying asset reaches a certain price level.
*   **Asian Options:** Options where the payoff depends on the average price of the underlying asset over a certain period of time.
*   **Binary (Digital) Options:** Options that pay a fixed amount if the underlying asset is above or below a certain level at expiration, and nothing otherwise.

### Key Features
*   **Customization:** Designed to meet specific hedging or speculative needs.
*   **Complexity:** Valuation often requires sophisticated mathematical models (e.g., Monte Carlo simulation).
`,
      },
      {
        id: "islamicFinance",
        title: "Islamic Finance",
        content: `
# Islamic Finance

Islamic finance is a way of managing money that keeps within the moral principles of Islam. It covers saving, investing, and borrowing.

### Key Concepts
*   **Sukuk (Islamic Bonds):** Financial certificates, similar to bonds, that comply with Sharia law. Unlike traditional bonds, which pay interest, Sukuk pays a share of the profits derived from the underlying asset.
*   **Prohibition of Riba (Interest):** Earning money from money (interest) is forbidden.
*   **Risk Sharing:** Lenders and borrowers share the risk of the investment.

### Key Features
*   **Asset-Backed:** Transactions must be backed by tangible assets.
*   **Ethical Investment:** Investments in businesses related to alcohol, gambling, pork, etc., are prohibited.
`,
      },
      {
        id: "greenFinance",
        title: "Green Finance",
        content: `
# Green Finance

Green finance is any structured financial activity that’s created to ensure a better environmental outcome. It includes an array of loans, debt mechanisms and investments that are used to encourage the development of green projects or minimize the impact on the climate of more regular projects.

### Instruments
*   **Green Bonds:** Bonds specifically earmarked to be used for climate and environmental projects.
*   **Sustainability-Linked Loans:** Loans where the interest rate is linked to the borrower's performance on certain sustainability metrics.

### Key Features
*   **Use of Proceeds:** Proceeds must be used for eligible green projects (e.g., renewable energy, energy efficiency).
*   **Reporting:** Issuers are typically required to report on the environmental impact of the projects funded.
`,
      },
      {
        id: "crowdfundingP2P",
        title: "Crowdfunding & P2P Lending",
        content: `
# Crowdfunding & P2P Lending

Alternative finance methods that use internet platforms to connect fundraisers directly with funders.

### Types
*   **Peer-to-Peer (P2P) Lending:** Individuals lending money to other individuals or businesses through online services that match lenders with borrowers.
*   **Equity Crowdfunding:** Investors receive a stake in the company in exchange for their investment.
*   **Rewards-Based Crowdfunding:** Backers receive a product or service in return for their contribution (e.g., Kickstarter).

### Key Features
*   **Disintermediation:** Bypasses traditional financial intermediaries like banks.
*   **Accessibility:** Allows smaller investors to participate in early-stage investing and borrowers to access capital more easily.
`,
      },
      {
        id: "collectibles",
        title: "Collectibles",
        content: `
# Collectibles

Collectibles are items that are worth far more than they appear to be because of their rarity and/or popularity. They are considered alternative investments.

### Examples
*   **Art:** Paintings, sculptures, and other visual arts.
*   **Wine:** Fine wines that improve with age.
*   **Coins & Stamps:** Rare currency and postage stamps.
*   **Classic Cars:** Vintage automobiles.

### Key Features
*   **Tangible Assets:** Physical items that can be held and displayed.
*   **Subjective Value:** Value is often determined by taste, trends, and condition.
*   **Illiquidity:** Can be difficult to sell quickly at a fair price.
*   **Storage & Insurance:** Requires proper care and protection.
`,
      },
      {
        id: "ventureCapital",
        title: "Venture Capital",
        content: `
# Venture Capital

Venture capital (VC) is a form of private equity and a type of financing that investors provide to startup companies and small businesses that are believed to have long-term growth potential. Venture capital generally comes from well-off investors, investment banks, and any other financial institutions.

### Stages
*   **Seed Capital:** Early-stage funding to prove a concept or develop a product.
*   **Early Stage:** Funding for companies that have a product and are starting to generate revenue.
*   **Expansion/Growth:** Funding for established companies looking to scale operations.

### Key Features
*   **High Risk, High Reward:** Many startups fail, but successful ones can generate massive returns.
*   **Equity Stake:** VCs receive ownership in the company.
*   **Mentorship:** VCs often provide guidance and networking opportunities.
`,
      },
      {
        id: "angelInvesting",
        title: "Angel Investing",
        content: `
# Angel Investing

An angel investor (also known as a private investor, seed investor or angel funder) is a high-net-worth individual who provides financial backing for small startups or entrepreneurs, typically in exchange for ownership equity in the company.

### Characteristics
*   **Individual Investors:** Unlike VCs, angels invest their own money.
*   **Early Stage:** Often invest at the very earliest stages of a company's life (pre-seed or seed).
*   **Flexible Terms:** Deal structures can be more flexible than institutional VC deals.

### Key Features
*   **Personal Involvement:** Angels may take a hands-on role in advising the entrepreneur.
*   **Portfolio Approach:** Angels often invest in multiple startups to diversify risk.
`,
      },
      {
        id: "pensionFunds",
        title: "Pension Funds",
        content: `
# Pension Funds

A pension fund is a fund established by an employer to facilitate and organize the investment of employees' retirement funds contributed by the employer and employees. The pension fund is a common asset pool meant to generate stable growth over the long term, and provide pensions for employees when they reach the end of their working years and commence retirement.

### Types
*   **Defined Benefit Plans:** The employer guarantees a specific retirement benefit amount for each employee.
*   **Defined Contribution Plans:** The employer and/or employee contribute to an individual account, and the benefit depends on the investment performance (e.g., 401(k)).

### Key Features
*   **Long-Term Horizon:** Investment strategy focuses on long-term growth and liability matching.
*   **Tax Advantages:** Contributions and investment earnings are often tax-deferred.
`,
      },
      {
        id: "sovereignWealthFunds",
        title: "Sovereign Wealth Funds",
        content: `
# Sovereign Wealth Funds

A sovereign wealth fund (SWF) is a state-owned investment fund that invests in real and financial assets such as stocks, bonds, real estate, precious metals, or in alternative investments such as private equity fund or hedge funds. Sovereign wealth funds invest globally.

### Sources of Funds
*   **Commodity Exports:** Revenues from oil, gas, or mineral exports (e.g., Norway's Government Pension Fund Global).
*   **Foreign Exchange Reserves:** Excess reserves held by central banks (e.g., China Investment Corporation).

### Key Features
*   **Stabilization:** Used to stabilize the economy against commodity price shocks.
*   **Intergenerational Savings:** Preserving wealth for future generations.
*   **Strategic Development:** Promoting domestic economic development.
`,
      },
      {
        id: "certificatesOfDeposit",
        title: "Certificates of Deposit (CDs)",
        content: `
# Certificates of Deposit (CDs)

A certificate of deposit (CD) is a product offered by banks and credit unions that provides an interest rate premium in exchange for the customer agreeing to leave a lump-sum deposit untouched for a predetermined period of time.

### Key Features
*   **Fixed Term:** Terms typically range from a few months to five years.
*   **Fixed Interest Rate:** The rate is locked in for the term of the CD.
*   **Early Withdrawal Penalty:** Withdrawing money before maturity usually incurs a penalty.
*   **FDIC Insurance:** In the US, CDs are insured up to $250,000 per depositor, per bank.
`,
      },
      {
        id: "tips",
        title: "Treasury Inflation-Protected Securities (TIPS)",
        content: `
# Treasury Inflation-Protected Securities (TIPS)

TIPS are a type of Treasury security issued by the U.S. government. TIPS are indexed to inflation in order to protect investors from the negative effects of rising prices.

### Mechanism
*   **Principal Adjustment:** The principal value of TIPS rises as inflation rises while the interest payment varies with the adjusted principal value of the bond.
*   **Index:** Linked to the Consumer Price Index (CPI).

### Key Features
*   **Inflation Protection:** Guarantees a real rate of return.
*   **Low Default Risk:** Backed by the full faith and credit of the U.S. government.
*   **Taxation:** Interest payments and principal adjustments are subject to federal tax.
`,
      },
      {
        id: "municipalBonds",
        title: "Municipal Bonds",
        content: `
# Municipal Bonds

Municipal bonds (munis) are debt securities issued by state and local governments to fund day-to-day obligations and to finance capital projects such as building schools, highways or sewer systems.

### Types
*   **General Obligation Bonds (GOs):** Backed by the "full faith and credit" (taxing power) of the issuer.
*   **Revenue Bonds:** Backed by the revenues generated by a specific project (e.g., tolls from a bridge).

### Key Features
*   **Tax Exemption:** Interest income is often exempt from federal income tax and, in some cases, state and local taxes.
*   **Credit Risk:** Varies depending on the financial health of the issuer.
`,
      },
      {
        id: "agencyBonds",
        title: "Agency Bonds",
        content: `
# Agency Bonds

Agency bonds are securities issued by a government-sponsored enterprise (GSE) or by a federal government department other than the U.S. Treasury.

### Issuers
*   **GSEs:** Fannie Mae, Freddie Mac, Federal Home Loan Banks. (Not fully backed by US Govt, but implied).
*   **Federal Agencies:** Ginnie Mae, Tennessee Valley Authority (TVA). (Fully backed by US Govt).

### Key Features
*   **Yield:** Typically offer higher yields than Treasury bonds but lower yields than corporate bonds.
*   **Liquidity:** Generally very liquid markets.
`,
      },
      {
        id: "preferredStock",
        title: "Preferred Stock",
        content: `
# Preferred Stock

Preferred stock is a class of ownership in a corporation that has a higher claim on its assets and earnings than common stock. Preferred shares generally have a dividend that must be paid out before dividends to common shareholders, and the shares usually do not carry voting rights.

### Key Features
*   **Fixed Dividend:** Pays a fixed dividend, similar to a bond coupon.
*   **Priority:** Senior to common stock in liquidation preference.
*   **No Voting Rights:** Usually does not confer voting rights.
*   **Cumulative vs. Non-Cumulative:** Cumulative preferred stock requires unpaid dividends to accumulate and be paid before common dividends.
`,
      },
      {
        id: "convertibleBonds",
        title: "Convertible Bonds",
        content: `
# Convertible Bonds

A convertible bond is a fixed-income corporate debt security that yields interest payments, but can be converted into a predetermined number of common stock or equity shares. The conversion from the bond to stock can be done at certain times during the bond's life and is usually at the discretion of the bondholder.

### Key Features
*   **Hybrid Nature:** Combines features of debt and equity.
*   **Upside Potential:** Allows investors to participate in stock price appreciation.
*   **Lower Coupon:** Typically offers a lower interest rate than non-convertible bonds due to the conversion option.
`,
      },
      {
        id: "warrants",
        title: "Warrants",
        content: `
# Warrants

A warrant is a derivative that confers the right, but not the obligation, to buy or sell a security – normally an equity – at a certain price before expiration. Warrants are issued by the company itself, not a third party.

### Key Features
*   **Dilution:** When a warrant is exercised, the company issues new shares, diluting existing shareholders.
*   **Longer Term:** Often have longer maturities than standard options (years vs. months).
*   **Attached to Bonds:** Often issued as a "sweetener" with bonds or preferred stock.
`,
      },
      {
        id: "rights",
        title: "Rights",
        content: `
# Rights

Rights are issued to existing shareholders of a company, giving them the privilege to buy new shares at a discount to the current market price.

### Key Features
*   **Short Term:** Typically expire within a few weeks.
*   **Transferable:** Can often be traded on the open market.
*   **Anti-Dilution:** Allows shareholders to maintain their percentage ownership in the company.
`,
      },
      {
        id: "swaptions",
        title: "Swaptions",
        content: `
# Swaptions

A swaption (swap option) is an option to enter into a swap agreement. In exchange for an option premium, the buyer gains the right but not the obligation to enter into a specified swap agreement with the issuer on a specified future date.

### Types
*   **Payer Swaption:** Gives the owner the right to enter into a swap where they pay the fixed rate and receive the floating rate.
*   **Receiver Swaption:** Gives the owner the right to enter into a swap where they receive the fixed rate and pay the floating rate.

### Key Features
*   **Hedging:** Used to hedge against interest rate risk or to speculate on future interest rate movements.
*   **Flexibility:** Provides the option to enter a swap only if it is favorable.
`,
      },
      {
        id: "repos",
        title: "Repos (Repurchase Agreements)",
        content: `
# Repos (Repurchase Agreements)

A repurchase agreement (repo) is a form of short-term borrowing for dealers in government securities. In the case of a repo, a dealer sells government securities to investors, usually on an overnight basis, and buys them back the following day at a slightly higher price.

### Mechanics
*   **Sale:** Borrower sells securities to lender for cash.
*   **Repurchase:** Borrower agrees to buy back securities at a future date for a higher price (implicit interest rate).

### Key Features
*   **Collateralized Loan:** Effectively a secured loan.
*   **Central Bank Tool:** Used by central banks to conduct open market operations and control the money supply.
*   **Reverse Repo:** The opposite side of the transaction (lending cash and receiving securities).
`,
      },
    ],
  },
};

export const financeData = {
  sections,
  getSection: (id) => sections[id],
  getAllSections: () => Object.values(sections),
};
