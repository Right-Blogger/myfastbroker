export interface Broker {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  logoColor: string;
  rating: number; // out of 5
  ratingBreakdown: {
    fees: number;
    platform: number;
    safety: number;
    research: number;
    support: number;
  };
  reviewCount: number;
  featuredBadge?: string;
  isEditorsChoice?: boolean;
  categories: ('stocks' | 'forex' | 'crypto' | 'options' | 'etfs' | 'zero_commission' | 'high_leverage' | 'beginner_friendly')[];
  minDeposit: number;
  stockCommissionUS: string;
  stockCommissionEU: string;
  optionsFeePerContract: string;
  forexSpreadEurUsd: string;
  cryptoFee: string;
  marginRateEst: string;
  inactivityFee: string;
  withdrawalFee: string;
  regulations: string[];
  investorProtection: string;
  leverageMax: string;
  platforms: string[];
  depositMethods: string[];
  executionType: string;
  yearFounded: number;
  headquarters: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  accountTypes: string[];
  customerSupport: string;
  affiliateUrl: string;
  officialUrl?: string;
  detailedReview: string;
}

export const BROKER_OFFICIAL_URLS: Record<string, string> = {
  'ibkr': 'https://www.interactivebrokers.com',
  'charles-schwab': 'https://www.schwab.com',
  'fidelity': 'https://www.fidelity.com',
  'etoro': 'https://www.etoro.com',
  'saxo-bank': 'https://www.home.saxo',
  'robinhood': 'https://robinhood.com',
  'webull': 'https://www.webull.com',
  'ig-group': 'https://www.ig.com',
  'xtb': 'https://www.xtb.com',
  'vanguard': 'https://investor.vanguard.com',
};

export function getBrokerUrl(broker: { id: string; slug: string; officialUrl?: string }): string {
  return broker.officialUrl || BROKER_OFFICIAL_URLS[broker.id] || `https://www.${broker.slug.replace(/-/g, '')}.com`;
}

export const BROKERS_DATA: Broker[] = [
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    slug: 'interactive-brokers',
    tagline: 'Lowest industry margin rates & institutional-grade global market access',
    logoColor: 'from-red-600 to-rose-700',
    rating: 4.9,
    ratingBreakdown: {
      fees: 4.9,
      platform: 4.8,
      safety: 5.0,
      research: 4.9,
      support: 4.5,
    },
    reviewCount: 4280,
    featuredBadge: "Best Overall for Active Traders",
    isEditorsChoice: true,
    categories: ['stocks', 'forex', 'options', 'etfs', 'zero_commission'],
    minDeposit: 0,
    stockCommissionUS: '$0 (IBKR Lite) / $0.005/share (Pro)',
    stockCommissionEU: '0.05% of trade value (min €1.25)',
    optionsFeePerContract: '$0.15 - $0.65',
    forexSpreadEurUsd: '0.1 - 0.3 pips (plus $2 per lot fee)',
    cryptoFee: '0.12% - 0.18%',
    marginRateEst: '5.83% - 6.83% (Lowest in US)',
    inactivityFee: '$0 / None',
    withdrawalFee: '1 free per month (then $10 wire)',
    regulations: ['SEC', 'FINRA', 'CFTC', 'FCA', 'ASIC', 'MAS', 'SFC'],
    investorProtection: 'SIPC protection up to $500,000 ($250k cash) + Lloyd’s policy up to $30M',
    leverageMax: '1:30 (Retail UK/EU), 1:50 (US Forex), 1:4 (Day trading margin)',
    platforms: ['Trader Workstation (TWS)', 'IBKR Desktop', 'Client Portal', 'IBKR Mobile', 'API / Python'],
    depositMethods: ['Bank Wire', 'ACH / Direct Deposit', 'Bill Pay', 'Wise Integration'],
    executionType: 'Direct Market Access (DMA) / SmartRouting',
    yearFounded: 1978,
    headquarters: 'Greenwich, Connecticut, USA',
    pros: [
      'Industry-leading low margin interest rates',
      'Access to 150+ markets across 33 countries with 27 currencies',
      'IBKR Lite offers zero-commission trading on US stocks & ETFs',
      'Ultra-fast SmartRouting execution algorithm that optimizes price improvement',
      'Tier-1 multi-jurisdiction regulation across US, UK, Australia, and Asia'
    ],
    cons: [
      'Trader Workstation (TWS) steep learning curve for absolute beginners',
      'Tiered fee pricing requires careful selection based on trade volume'
    ],
    bestFor: 'Active day traders, international investors, and margin borrowers',
    accountTypes: ['Individual', 'Joint', 'IRA / Roth IRA', 'Trust & Corporate', 'Institutional'],
    customerSupport: '24/5 phone, multilingual live chat, secure message center',
    affiliateUrl: '#ibkr-signup',
    detailedReview: 'Interactive Brokers (IBKR) continues to set the gold standard in the online brokerage industry at MyFastBroker. With rock-bottom margin rates, DMA access to 150+ international exchanges, and unparalleled execution speed via SmartRouting, it outperforms retail peers for serious traders. Whether utilizing the streamlined IBKR Desktop or the institutional TWS terminal, capital safety is fortified by extensive multi-tier regulation.'
  },
  {
    id: 'charles-schwab',
    name: 'Charles Schwab',
    slug: 'charles-schwab',
    tagline: 'Premier full-service brokerage with thinkorswim & stellar research',
    logoColor: 'from-blue-600 to-cyan-700',
    rating: 4.8,
    ratingBreakdown: {
      fees: 4.7,
      platform: 5.0,
      safety: 5.0,
      research: 5.0,
      support: 4.8,
    },
    reviewCount: 5120,
    featuredBadge: "Best for Research & thinkorswim",
    isEditorsChoice: true,
    categories: ['stocks', 'options', 'etfs', 'zero_commission', 'beginner_friendly'],
    minDeposit: 0,
    stockCommissionUS: '$0 (Commission-free online)',
    stockCommissionEU: 'N/A (US exchange focused)',
    optionsFeePerContract: '$0.65 per contract',
    forexSpreadEurUsd: '1.0 - 1.2 pips (Schwab Forex)',
    cryptoFee: 'Spot crypto via crypto ETFs only',
    marginRateEst: '11.825% - 13.575%',
    inactivityFee: '$0 / None',
    withdrawalFee: '$0 (ACH / check), $15-$25 wire',
    regulations: ['SEC', 'FINRA', 'CFTC', 'SIPC'],
    investorProtection: 'SIPC up to $500,000 + supplementary private Lloyd’s insurance',
    leverageMax: '1:2 (Reg T margin), 1:4 (Day trading)',
    platforms: ['thinkorswim (Desktop, Web, Mobile)', 'Schwab.com Web', 'Schwab Mobile App'],
    depositMethods: ['ACH Transfer', 'Check Deposit (Mobile)', 'Wire Transfer', 'Account Transfer (ACATS)'],
    executionType: 'Smart Order Routing (High price improvement rate)',
    yearFounded: 1971,
    headquarters: 'Westlake, Texas, USA',
    pros: [
      'Legendary thinkorswim charting and technical analysis suite',
      'Zero account minimums and $0 commission on US listed stocks and ETFs',
      'Industry-leading equity research from Schwab, Morningstar, and CFRA',
      'Round-the-clock 24/7 dedicated customer service and nationwide branch network',
      'Extensive mutual fund supermarket with thousands of No-Transaction-Fee (NTF) funds'
    ],
    cons: [
      'High base margin loan rates compared to Interactive Brokers',
      'Does not offer direct spot cryptocurrency holding'
    ],
    bestFor: 'Long-term investors, technical chartists using thinkorswim, and retirement accounts',
    accountTypes: ['Standard Brokerage', 'Traditional/Roth/Rollover IRA', '529 College Savings', 'Trust/Estate'],
    customerSupport: '24/7 Phone support, live chat, dedicated financial consultants at 300+ physical branches',
    affiliateUrl: '#schwab-signup',
    detailedReview: 'Charles Schwab combines elite research with thinkorswim—the premier multi-asset charting platform acquired from TD Ameritrade. Our testing at MyFastBroker confirmed superior price improvement on US equities and outstanding client service. While margin loan rates are higher than IBKR, its $0 commission model and educational depth make it an elite choice for modern investors.'
  },
  {
    id: 'fidelity',
    name: 'Fidelity Investments',
    slug: 'fidelity-investments',
    tagline: 'Zero expense ratio index funds, cash management & no hidden fees',
    logoColor: 'from-emerald-600 to-green-700',
    rating: 4.8,
    ratingBreakdown: {
      fees: 4.8,
      platform: 4.6,
      safety: 5.0,
      research: 4.9,
      support: 4.9,
    },
    reviewCount: 6340,
    featuredBadge: "Best for Beginners & Cash Management",
    isEditorsChoice: false,
    categories: ['stocks', 'etfs', 'options', 'zero_commission', 'beginner_friendly'],
    minDeposit: 0,
    stockCommissionUS: '$0 on stocks, fractional shares & ETFs',
    stockCommissionEU: '$0 US / Foreign market fees vary',
    optionsFeePerContract: '$0.65 per contract',
    forexSpreadEurUsd: 'N/A (Standard retail FX disabled)',
    cryptoFee: '1% spread on Fidelity Crypto',
    marginRateEst: '8.50% - 12.825%',
    inactivityFee: '$0 / None',
    withdrawalFee: '$0 on both ACH and domestic wire transfers',
    regulations: ['SEC', 'FINRA', 'SIPC'],
    investorProtection: 'SIPC up to $500,000 ($250k cash) + excess insurance via Lloyd’s',
    leverageMax: '1:2 (Reg T margin), 1:4 (Pattern day trader)',
    platforms: ['Active Trader Pro', 'Fidelity.com Web', 'Fidelity Mobile App'],
    depositMethods: ['EFT (Electronic Funds Transfer)', 'Direct Deposit', 'Wire Transfer', 'Check by Mail/Mobile'],
    executionType: 'Non-PFOF internal routing for equity order flow',
    yearFounded: 1946,
    headquarters: 'Boston, Massachusetts, USA',
    pros: [
      'Does not accept Payment for Order Flow (PFOF) on stock and ETF trades',
      'Pioneering Fidelity ZERO index funds with 0.00% expense ratios',
      'Uninvested cash automatically sweeps into high-yielding money market funds (~4.5-5.0%)',
      'Completely free domestic bank wires (zero incoming or outgoing wire fee)',
      'Fractional shares starting from just $1 on thousands of equities'
    ],
    cons: [
      'Active Trader Pro desktop software looks slightly dated compared to thinkorswim',
      'International trading carries currency exchange conversion costs'
    ],
    bestFor: 'Everyday buy-and-hold investors, passive index fund savers, and retirement portfolios',
    accountTypes: ['Cash & Margin Brokerage', 'Roth, Traditional & SEP IRA', 'HSA (Health Savings)', 'Cash Management'],
    customerSupport: '24/7 toll-free phone, live chat, extensive community knowledge base',
    affiliateUrl: '#fidelity-signup',
    detailedReview: 'Fidelity is widely revered on myfastbroker.news for ethical execution: they do not monetize retail stock order flow via PFOF, consistently generating superior net execution prices. With automatic cash yield sweep, zero expense ratio mutual funds, and zero fee wire transfers, Fidelity provides tremendous consumer value for wealth builders.'
  },
  {
    id: 'etoro',
    name: 'eToro',
    slug: 'etoro',
    tagline: 'World leader in social copy trading, multi-asset crypto & zero commission',
    logoColor: 'from-emerald-500 to-teal-600',
    rating: 4.6,
    ratingBreakdown: {
      fees: 4.4,
      platform: 4.8,
      safety: 4.6,
      research: 4.3,
      support: 4.4,
    },
    reviewCount: 8900,
    featuredBadge: "Best for Social & Copy Trading",
    isEditorsChoice: false,
    categories: ['stocks', 'crypto', 'forex', 'zero_commission', 'beginner_friendly'],
    minDeposit: 10,
    stockCommissionUS: '$0 on real stocks (Zero commission)',
    stockCommissionEU: '$0 commission on European & UK stocks',
    optionsFeePerContract: '$0 (options available in US app)',
    forexSpreadEurUsd: '1.0 pip minimum',
    cryptoFee: '1.0% transparent flat fee',
    marginRateEst: 'Variable CFD overnight rates',
    inactivityFee: '$10/month after 12 months without login',
    withdrawalFee: '$5 flat fee (free in some regions)',
    regulations: ['FCA (UK)', 'CySEC (EU)', 'ASIC (Australia)', 'FinCEN (US)', 'FSRA (ADGM)'],
    investorProtection: 'FSCS up to £85,000 (UK) / ICF up to €20,000 (CySEC)',
    leverageMax: '1:30 (Retail EU/UK), 1:400 (Professional / Offshore)',
    platforms: ['eToro Web Platform', 'eToro Mobile (iOS & Android)', 'eToro Money Wallet'],
    depositMethods: ['Credit/Debit Card', 'PayPal', 'Neteller', 'Skrill', 'Bank Transfer', 'Sofort', 'iDEAL'],
    executionType: 'Market Maker (STP hybrid for equities)',
    yearFounded: 2007,
    headquarters: 'Tel Aviv, Israel & London, United Kingdom',
    pros: [
      'Innovative CopyTrader™ lets you replicate verified top-performing investors automatically',
      'Over 3,000+ tradable instruments across stocks, ETFs, crypto, forex, and commodities',
      'Zero commission on real underlying shares (non-leveraged long positions)',
      'Clean, intuitive social feed with sentiment indicators and investor discussions',
      'Low minimum deposit ($10 - $50 depending on jurisdiction)'
    ],
    cons: [
      'Non-trading fee: $5 withdrawal fee and $10 monthly inactivity fee after 1 year',
      'Accounts are denominated in USD, so non-USD deposits incur FX conversion fees'
    ],
    bestFor: 'Beginners wanting to mirror expert portfolios and crypto-stock hybrid traders',
    accountTypes: ['Retail Individual', 'Professional Account', 'Islamic (Swap-Free) Account', 'Corporate Club'],
    customerSupport: '24/5 live chat for registered users, dedicated account manager for Club tiers',
    affiliateUrl: '#etoro-signup',
    detailedReview: 'eToro revolutionized modern retail investing by popularizing social investing. With its patented CopyTrader system, novice traders can allocate capital to top vetted traders with verifiable historical drawdowns. In our tests on myfastbroker.com, order placement was instantaneous and the clean interface made it effortless to buy fractional shares.'
  },
  {
    id: 'saxo-bank',
    name: 'Saxo Bank',
    slug: 'saxo-bank',
    tagline: 'Elite global VIP multi-asset broker with 70,000+ instruments',
    logoColor: 'from-slate-800 to-indigo-950',
    rating: 4.7,
    ratingBreakdown: {
      fees: 4.3,
      platform: 4.9,
      safety: 5.0,
      research: 4.9,
      support: 4.7,
    },
    reviewCount: 2950,
    featuredBadge: "Best for Global Multi-Asset Coverage",
    isEditorsChoice: false,
    categories: ['stocks', 'forex', 'options', 'etfs', 'high_leverage'],
    minDeposit: 0,
    stockCommissionUS: '$0.03 per share (Classic, min $1) / $0.01 (VIP)',
    stockCommissionEU: '0.05% - 0.08% (min €3)',
    optionsFeePerContract: '$1.25 - $2.00 per contract',
    forexSpreadEurUsd: '0.6 - 0.9 pips (all-inclusive)',
    cryptoFee: 'Crypto ETNs / FX pairs available',
    marginRateEst: '6.5% - 8.2% based on tier',
    inactivityFee: '$0 (Removed in 2024 price drop)',
    withdrawalFee: '$0 / Free bank transfer',
    regulations: ['FSA (Denmark)', 'FCA (UK)', 'FINMA (Swiss Bank)', 'ASIC', 'MAS (Singapore)', 'SFC'],
    investorProtection: 'Danish Guarantee Fund up to €100,000 cash + securities protection',
    leverageMax: '1:30 (Retail), 1:100 (Pro tiers)',
    platforms: ['SaxoTraderGO (Web & Mobile)', 'SaxoTraderPRO (Advanced Multi-Screen Desktop)', 'OpenAPI'],
    depositMethods: ['Bank Wire', 'Credit/Debit Card', 'Open Banking Pay by Bank'],
    executionType: 'Direct Market Access (DMA) & Agency Model',
    yearFounded: 1992,
    headquarters: 'Copenhagen, Denmark',
    pros: [
      'Huge product catalog: 70,000+ financial instruments across global exchanges',
      'Holds a full European banking license under strict Danish FSA oversight',
      'SaxoTraderPRO is one of the most powerful institutional desktop platforms available',
      'Substantially reduced commissions in recent pricing overhauls and removed inactivity fee',
      'Superb in-depth macro research and quarterly market outlooks by Saxo Strats team'
    ],
    cons: [
      'Higher minimum trading commissions on smaller odd-lot equity trades',
      'VIP tier benefits require significant capital balances (€100k - €1M)'
    ],
    bestFor: 'Sophisticated international investors wanting full bank security and global asset access',
    accountTypes: ['Classic', 'Platinum', 'VIP', 'Corporate', 'Joint'],
    customerSupport: '24/5 dedicated phone support in local languages, dedicated relationship managers for VIPs',
    affiliateUrl: '#saxo-signup',
    detailedReview: 'Saxo Bank holds a legitimate European banking license, elevating counterparty safety to sovereign standards. After eliminating its historical inactivity fee and slashing transaction fees, Saxo represents a formidable choice for traders demanding global market reach across equities, sovereign bonds, FX, and structured options.'
  },
  {
    id: 'robinhood',
    name: 'Robinhood',
    slug: 'robinhood',
    tagline: 'Frictionless commission-free trading, 3% IRA match & gold benefits',
    logoColor: 'from-emerald-500 to-lime-600',
    rating: 4.5,
    ratingBreakdown: {
      fees: 4.8,
      platform: 4.7,
      safety: 4.3,
      research: 3.9,
      support: 4.0,
    },
    reviewCount: 11200,
    featuredBadge: "Best for Mobile & IRA Retirement Match",
    isEditorsChoice: false,
    categories: ['stocks', 'crypto', 'options', 'etfs', 'zero_commission', 'beginner_friendly'],
    minDeposit: 0,
    stockCommissionUS: '$0 (Commission-free)',
    stockCommissionEU: '$0 (US stocks available in UK/EU)',
    optionsFeePerContract: '$0 per contract ($0.03 regulatory fee only)',
    forexSpreadEurUsd: 'N/A (No retail spot forex)',
    cryptoFee: '0% commission (Embedded spread markup ~0.35%-0.55%)',
    marginRateEst: '5.70% (Gold) / 9.70% (Non-Gold)',
    inactivityFee: '$0 / None',
    withdrawalFee: '$0 standard ACH / $100 ACATS outgoing transfer',
    regulations: ['SEC', 'FINRA', 'SIPC'],
    investorProtection: 'SIPC up to $500,000 ($250k cash)',
    leverageMax: '1:2 (Reg T Margin)',
    platforms: ['Robinhood Mobile App', 'Robinhood Legend (New Active Desktop Suite)', 'Robinhood Web'],
    depositMethods: ['Instant Bank Transfer (ACH)', 'Debit Card', 'Direct Deposit'],
    executionType: 'Payment for Order Flow (PFOF) with wholesale market makers',
    yearFounded: 2013,
    headquarters: 'Menlo Park, California, USA',
    pros: [
      'Unrivaled 1% - 3% retirement IRA contribution matching program',
      'True $0 fee options trading with zero per-contract charges',
      'Competitive 5.70% margin loan rate for Robinhood Gold subscribers',
      'Robinhood Legend desktop charting provides modern technical indicators',
      'Cleanest, fastest mobile user onboarding experience in the fintech sector'
    ],
    cons: [
      'Monetizes retail order flow via PFOF which can affect price improvement on large market orders',
      'Customer support is primarily in-app callback or automated assistant'
    ],
    bestFor: 'Mobile-first retail traders, options enthusiasts seeking zero contract fees, and IRA matchers',
    accountTypes: ['Individual Brokerage (Cash/Margin)', 'Traditional IRA', 'Roth IRA'],
    customerSupport: '24/7 in-app callback phone support and live chat',
    affiliateUrl: '#robinhood-signup',
    detailedReview: 'Robinhood changed the brokerage landscape forever. In 2025/2026, the company expanded far beyond its original mobile simplicity, introducing Robinhood Legend for active desktop charting and an unprecedented 3% IRA contribution match for Gold members. For options traders wanting zero per-contract fees, it is virtually unbeatable on headline costs.'
  },
  {
    id: 'webull',
    name: 'Webull',
    slug: 'webull',
    tagline: 'Zero-commission technical trading with extended hours & advanced charting',
    logoColor: 'from-blue-500 to-indigo-600',
    rating: 4.6,
    ratingBreakdown: {
      fees: 4.8,
      platform: 4.8,
      safety: 4.4,
      research: 4.4,
      support: 4.2,
    },
    reviewCount: 7800,
    featuredBadge: "Best for Extended Hours & Tech Analysis",
    isEditorsChoice: false,
    categories: ['stocks', 'options', 'crypto', 'etfs', 'zero_commission'],
    minDeposit: 0,
    stockCommissionUS: '$0 (Zero commission)',
    stockCommissionEU: 'N/A',
    optionsFeePerContract: '$0 per contract ($0.055 regulatory fee)',
    forexSpreadEurUsd: 'N/A',
    cryptoFee: '1% markup spread',
    marginRateEst: '5.24% - 9.24%',
    inactivityFee: '$0 / None',
    withdrawalFee: '$0 ACH / $8 domestic wire / $25 international',
    regulations: ['SEC', 'FINRA', 'SIPC', 'FCA (UK)', 'MAS (Singapore)'],
    investorProtection: 'SIPC up to $500,000 ($250k cash)',
    leverageMax: '1:4 (Day trading margin), 1:2 (Overnight)',
    platforms: ['Webull Desktop 8.0', 'Webull Mobile App', 'Webull Web Trader'],
    depositMethods: ['ACH Transfer', 'Wire Transfer'],
    executionType: 'Payment for Order Flow (PFOF) with smart routing',
    yearFounded: 2017,
    headquarters: 'St. Petersburg, Florida, USA',
    pros: [
      'Full extended trading hours: 4:00 AM to 8:00 PM EST (Pre-market & After-hours)',
      'Exceptional desktop charting with 60+ indicators and customizable grid panels',
      'Free Level 2 Market Data (Nasdaq TotalView) promotional trials',
      'Paper trading simulator with real-time streaming data for risk-free practice',
      'Zero per-contract options trading fees'
    ],
    cons: [
      'Relies on PFOF revenue model for US retail equity orders',
      'No mutual funds or sovereign bond offerings'
    ],
    bestFor: 'Technical momentum traders, day traders wanting 4:00 AM pre-market access, and options traders',
    accountTypes: ['Individual Cash', 'Individual Margin', 'Traditional / Roth / Rollover IRA'],
    customerSupport: '24/7 phone hotline, in-app support ticketing',
    affiliateUrl: '#webull-signup',
    detailedReview: 'Webull has emerged as the weapon of choice for technical retail day traders. Offering full pre-market trading from 4:00 AM EST and an impeccably designed multi-monitor desktop application, it rivals paid charting suites without charging software licensing fees.'
  },
  {
    id: 'ig-group',
    name: 'IG Group',
    slug: 'ig-group',
    tagline: 'World’s No. 1 CFD & Forex provider with tight spreads & 50-year heritage',
    logoColor: 'from-red-700 to-rose-900',
    rating: 4.8,
    ratingBreakdown: {
      fees: 4.6,
      platform: 4.9,
      safety: 5.0,
      research: 4.8,
      support: 4.8,
    },
    reviewCount: 6100,
    featuredBadge: "Best for Forex & Global CFDs",
    isEditorsChoice: true,
    categories: ['forex', 'stocks', 'high_leverage'],
    minDeposit: 250,
    stockCommissionUS: '$0.02/share (min $10) or CFD spreads',
    stockCommissionEU: '0.10% (min £10 / €10)',
    optionsFeePerContract: 'Variable spread / barriers',
    forexSpreadEurUsd: '0.6 pips (EUR/USD average standard)',
    cryptoFee: 'Crypto CFDs (regulated regions only)',
    marginRateEst: 'Variable interbank benchmark + 2.5%-3.0%',
    inactivityFee: '$12/month after 2 years of inactivity',
    withdrawalFee: '$0 / Free card and bank wire withdrawals',
    regulations: ['FCA (UK)', 'ASIC (Australia)', 'CFTC / NFA (US)', 'BaFin (Germany)', 'FINMA (Swiss)', 'MAS', 'FSCA'],
    investorProtection: 'FSCS up to £85,000 (UK) / BaFin €20k / Segregated client accounts',
    leverageMax: '1:30 (Retail UK/EU), 1:50 (US FX), 1:200 - 1:500 (Pro)',
    platforms: ['IG Web Trading Platform', 'L2 Dealer (DMA Execution)', 'MetaTrader 4 (MT4)', 'ProRealTime', 'IG Mobile'],
    depositMethods: ['Credit/Debit Card', 'Bank Wire', 'PayPal', 'BACS / Faster Payments'],
    executionType: 'Direct Market Access (DMA) & Market Maker (STP)',
    yearFounded: 1974,
    headquarters: 'London, United Kingdom (FTSE 250 listed)',
    pros: [
      'Over 17,000 tradable markets across forex pairs, indices, shares, and commodities',
      'Publicly listed company on the London Stock Exchange (LON: IGG) with audited balance sheets',
      'Ultra-tight EUR/USD spreads averaging 0.6 pips during London/NY trading sessions',
      'Advanced platform ecosystem supporting MetaTrader 4, ProRealTime, and IG Web',
      'Guaranteed Stop-Loss Orders (GSLOs) to completely protect against overnight market gaps'
    ],
    cons: [
      'Share dealing commissions in Europe are higher than low-cost discount neo-brokers',
      'Minimum deposit is $250 / £250 on credit card deposits'
    ],
    bestFor: 'Serious Forex traders, CFD index scalpers, and algorithmic traders using MT4',
    accountTypes: ['CFD Account', 'Forex Trading Account (US)', 'Spread Betting (UK tax-free)', 'Share Dealing', 'Professional'],
    customerSupport: '24/5 dedicated phone lines, UK-based specialist desk, rapid email turnaround',
    affiliateUrl: '#ig-signup',
    detailedReview: 'Founded in 1974, IG is an undeniable titan in foreign exchange and contracts for difference. Listed on the FTSE 250, IG offers transparent execution statistics, Guaranteed Stop Losses that eliminate negative balance risk, and premier integrations with ProRealTime and MT4.'
  },
  {
    id: 'xtb',
    name: 'XTB Online Trading',
    slug: 'xtb',
    tagline: '0% commission on real stocks & ETFs with proprietary xStation 5',
    logoColor: 'from-amber-600 to-orange-700',
    rating: 4.7,
    ratingBreakdown: {
      fees: 4.8,
      platform: 4.9,
      safety: 4.8,
      research: 4.6,
      support: 4.7,
    },
    reviewCount: 4400,
    featuredBadge: "Best European 0% Commission Platform",
    isEditorsChoice: false,
    categories: ['stocks', 'forex', 'etfs', 'zero_commission', 'high_leverage'],
    minDeposit: 0,
    stockCommissionUS: '0% commission (up to €100k monthly volume, then 0.2%)',
    stockCommissionEU: '0% commission (up to €100k monthly volume, then 0.2%)',
    optionsFeePerContract: 'N/A',
    forexSpreadEurUsd: '0.8 pips (standard spread)',
    cryptoFee: 'Crypto CFDs with 0.22% - 0.35% spread',
    marginRateEst: 'Benchmark + 3.0%',
    inactivityFee: '€10/month after 365 days of inactivity and no open trades',
    withdrawalFee: 'Free for withdrawals over €100 / $50',
    regulations: ['KNF (Poland)', 'FCA (UK)', 'CySEC (EU)', 'DFSA (Dubai)', 'FSC (Belize)'],
    investorProtection: 'KNF Compensation Scheme up to €22,000 / FSCS £85,000',
    leverageMax: '1:30 (Retail EU/UK), 1:500 (Non-EU / Pro)',
    platforms: ['xStation 5 (Web & Desktop)', 'xStation Mobile'],
    depositMethods: ['Bank Transfer', 'Visa/Mastercard', 'PayPal', 'PayU', 'Skrill'],
    executionType: 'STP / ECN / Market Maker',
    yearFounded: 2002,
    headquarters: 'Warsaw, Poland (Warsaw Stock Exchange listed)',
    pros: [
      '0% commission on real stocks and ETFs for monthly volume up to €100,000',
      'Proprietary xStation 5 is one of the fastest, most ergonomic web platforms tested',
      'Earns interest on uninvested cash balances (up to 4.2% EUR / 5.0% USD)',
      'Publicly traded company on the Warsaw Stock Exchange (WSE: XTB)',
      'Zero minimum account deposit requirement'
    ],
    cons: [
      '0.2% commission surcharge applies if monthly stock turnover exceeds €100k',
      '0.5% currency conversion fee on trades in currencies different from account base'
    ],
    bestFor: 'European investors seeking 0% commission on real equities and forex traders wanting xStation 5',
    accountTypes: ['Standard', 'Swap-Free Islamic', 'Corporate'],
    customerSupport: '24/5 local phone assistance in 12+ European languages, live chat, personal broker',
    affiliateUrl: '#xtb-signup',
    detailedReview: 'XTB has rapidly captured the European retail market by offering genuine 0% commission on physical shares and ETFs combined with high uninvested interest yield. Its proprietary xStation 5 software boasts sub-second execution speeds, market sentiment indicators, and an intuitive economic calendar.'
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    slug: 'vanguard',
    tagline: 'Client-owned index fund pioneer for low-cost, set-and-forget wealth building',
    logoColor: 'from-red-900 to-stone-900',
    rating: 4.6,
    ratingBreakdown: {
      fees: 4.9,
      platform: 3.9,
      safety: 5.0,
      research: 4.5,
      support: 4.4,
    },
    reviewCount: 5800,
    featuredBadge: "Best for Long-Term Buy & Hold",
    isEditorsChoice: false,
    categories: ['stocks', 'etfs', 'zero_commission', 'beginner_friendly'],
    minDeposit: 0,
    stockCommissionUS: '$0 online commission on stocks & ETFs',
    stockCommissionEU: 'Low index fund ongoing charges (0.07%-0.15%)',
    optionsFeePerContract: '$1.00 per contract (Standard accounts)',
    forexSpreadEurUsd: 'N/A (No forex trading)',
    cryptoFee: 'Crypto prohibited (Vanguard philosophy)',
    marginRateEst: '10.5% - 13.0%',
    inactivityFee: '$0 / None',
    withdrawalFee: '$0 for ACH / $10 wire for non-flagship',
    regulations: ['SEC', 'FINRA', 'SIPC'],
    investorProtection: 'SIPC up to $500,000 ($250k cash)',
    leverageMax: '1:2 (Reg T margin only)',
    platforms: ['Vanguard.com Web', 'Vanguard Mobile App'],
    depositMethods: ['Electronic Bank Transfer (ACH)', 'Direct Deposit', 'Wire Transfer', 'Check'],
    executionType: 'Agency order routing prioritizing long-term price quality',
    yearFounded: 1975,
    headquarters: 'Malvern, Pennsylvania, USA',
    pros: [
      'Unique mutual ownership structure: company is owned by its funds, which are owned by fund investors',
      'Ultra-low average expense ratio of 0.08% across index funds and ETFs',
      'Complete absence of speculative gimmicks, meme stock gamification, or high-risk margin traps',
      'Rock-solid financial stability with over $9 Trillion in global assets under management',
      'Ideal for automated recurring dollar-cost averaging into broad market index funds'
    ],
    cons: [
      'Not designed for day trading, swing trading, or rapid technical charting',
      'Deliberately restricts access to volatile speculative assets like spot cryptocurrency'
    ],
    bestFor: 'Bogleheads, index fund retirement planners, and passive multi-decade compounders',
    accountTypes: ['Individual & Joint Brokerage', 'Traditional, Roth, SEP & Simple IRA', '401(k) Rollovers', 'Trusts'],
    customerSupport: 'Monday through Friday phone desk and secure online messaging',
    affiliateUrl: '#vanguard-signup',
    detailedReview: 'Vanguard embodies John Bogle’s legendary philosophy: keep costs razor thin and let compound interest do the heavy lifting. While day traders will find the interface utilitarian, no brokerage has done more to lower fees for ordinary investors. For buy-and-hold retirement accounts, it remains a gold standard.'
  }
];

export const BROKER_CATEGORIES = [
  { id: 'all', label: 'All Brokers', count: BROKERS_DATA.length },
  { id: 'stocks', label: 'Stocks & ETFs', count: BROKERS_DATA.filter(b => b.categories.includes('stocks')).length },
  { id: 'zero_commission', label: '0% Commission', count: BROKERS_DATA.filter(b => b.categories.includes('zero_commission')).length },
  { id: 'forex', label: 'Forex & Currencies', count: BROKERS_DATA.filter(b => b.categories.includes('forex')).length },
  { id: 'options', label: 'Options & Derivatives', count: BROKERS_DATA.filter(b => b.categories.includes('options')).length },
  { id: 'crypto', label: 'Crypto Trading', count: BROKERS_DATA.filter(b => b.categories.includes('crypto')).length },
  { id: 'beginner_friendly', label: 'Beginner Friendly', count: BROKERS_DATA.filter(b => b.categories.includes('beginner_friendly')).length },
  { id: 'high_leverage', label: 'High Leverage / Pro', count: BROKERS_DATA.filter(b => b.categories.includes('high_leverage')).length },
];
