# NSA STOCK SCANNER · SERENITY-Ω (P1 TIER-1)
### Autonomous 24/7 Market Microstructure Intelligence Fabric · Zero-API-Key Architecture

[![NSA Enclave](https://img.shields.io/badge/CLEARANCE-LEVEL%201-00e5ff?style=flat-square)](https://github.com/witternif2003-beep/nsa-stock-scanner)
[![Vercel Deployment](https://img.shields.io/badge/VERCEL-CONTINUOUS%20DEPLOY-00ff9d?style=flat-square&logo=vercel)](https://vercel.com)
[![Microstructure](https://img.shields.io/badge/MATHEMATICS-POST--DOCTORATE%20AUDIT-5b5bff?style=flat-square)](https://github.com/witternif2003-beep/nsa-stock-scanner)
[![Tape Integrity](https://img.shields.io/badge/TAPE%20PRICE-VERIFIED%20INTRADAY-38bdf8?style=flat-square)](https://github.com/witternif2003-beep/nsa-stock-scanner)

---

## 1. Executive Summary & Capabilities

**NSA SERENITY-Ω** is a cybernetic market microstructure radar designed for high-frequency scanning across 8,000+ US equity tickers without requiring any paid API keys or subscriptions. It delivers real-time detection of imminent +900% parabolic surges, institutional order book imbalances, supply exhaustion cascades, and self-exciting volatility bursts.

### Core Features
- **P1 Tier-1 Blue Neon Glowing Pulse Shelf**: High-visibility dynamic ticker bar with CSS-animated breathing glow (`p1-breathe`) and tick shockwave feedback (`tick-pulse`).
- **Post-Doctorate Econometric Formulations**: Integrated Garman-Klass volatility, Corwin-Schultz high-low bid-ask spread estimators, Kyle's Lambda price impact, Hawkes point process cascading jump intensities, and float turnover exhaustion ratios.
- **Mandatory Typed-Password Clearance Gate**: Zero pre-filled credentials. Enforces typed entry of the operator clearance key (`nsa-admin`), with session storage tokens and instant re-locking capability (`#btnLockTerminal`).
- **Autonomous Continuous Re-Ranking**: Real-time tape parsing continuously orders runners by true intraday percentage change and surge probability index.
- **Dual Surface Deployment**:
  1. Full React SPA dashboard with interactive card grid, deep telemetry modals, and audit logs.
  2. Standalone zero-dependency Cybernetic Widget (`public/serenity-widget.html`) with self-contained CSS glassmorphism, responsive iPhone desktop scaling, and WebSocket/REST synchronization.
- **Continuous Auto-Deployment**: Native Vercel-GitHub integration triggers automated production builds upon every `git push origin main`.

---

## 2. Post-Doctorate Market Microstructure Formulations

### A. Corwin & Schultz (2012) High-Low Effective Bid-Ask Spread Estimator
Derived from high and low price expectations over 2-day trading spans to isolate transaction costs from daily volatility:
$$\alpha = \frac{\sqrt{2\beta} - \sqrt{\beta}}{3 - 2\sqrt{2}} - \sqrt{\frac{\gamma}{3 - 2\sqrt{2}}}$$
where:
$$\beta = \sum_{j=0}^{1} \left[ \ln\left(\frac{H_{t-j}}{L_{t-j}}\right) \right]^2, \quad \gamma = \left[ \ln\left(\frac{\max(H_t, H_{t-1})}{\min(L_t, L_{t-1})}\right) \right]^2$$
The effective spread $S$ is expressed as:
$$S = \frac{2\left(e^\alpha - 1\right)}{1 + e^\alpha}$$

### B. Garman & Klass (1980) OHLC Volatility Estimator
An unbiased volatility estimator utilizing Open, High, Low, and Close prices with up to $8\times$ the statistical efficiency of classic close-to-close variance:
$$\sigma^2_{GK} = 0.5 \left[\ln\left(\frac{H}{L}\right)\right]^2 - (2\ln 2 - 1)\left[\ln\left(\frac{C}{O}\right)\right]^2$$

### C. Kyle (1985) Lambda Price Impact Parameter
Measures market illiquidity and adverse selection cost per unit of volume:
$$\lambda = \frac{|\Delta P|}{\text{Volume}} \times 10^6$$
A sharp escalation in $\lambda$ signals order book thinning prior to violent parabolic expansions.

### D. Multivariate Hawkes Point Process Jump Cascades
Models self-exciting volatility clustering where trades trigger clustered secondary liquidity cascades:
$$\lambda(t) = \mu + \sum_{t_i < t} \alpha \, e^{-\beta (t - t_i)}$$
Branching ratio $\eta = \frac{\alpha}{\beta} \to 1.0^-$ indicates sub-critical to critical cascade transition.

### E. Float Turnover Exhaustion Ratio
$$\text{Float Turnover} = \frac{\text{Cumulative Intraday Volume}}{\text{Free Float Shares}}$$
Values $> 1.0\times$ (such as IMCC running at $>1,100\times$) indicate complete float rotation and severe short squeeze supply traps.

---

## 3. Architecture & Project Layout

```
nsa-stock-scanner/
├── .github/
│   └── workflows/
│       └── vercel-deploy.yml   # CI/CD automated build and verification workflow
├── backend/
│   ├── server.py               # FastAPI server, JWT auth, TradingView scanner, tape polling
│   ├── microstructure.py       # Econometric & microstructure quantitative models
│   └── .env                    # Secret keys and enclave configurations
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js        # Strict password authentication (zero pre-fill)
│   │   │   ├── Terminal.js     # Runner management and signal filters
│   │   │   ├── CyberCardGrid.js# Neon glowing runner cards with surge badges
│   │   │   └── FullScreenTelemetry.js # Microstructure deep-telemetry modal
│   │   ├── App.js              # Application shell & telemetry router
│   │   └── App.css             # CRT scanlines, neon pulse styles, glowing borders
│   ├── vite.config.js          # Hardened reverse-proxy dev server (ports 3001 -> 8001)
│   └── package.json            # React 18, Vite 6, Axios
├── public/
│   ├── serenity-widget.html    # Standalone cybernetic widget with security clearance gate
│   └── index.html              # Built production distribution
├── api/
│   ├── index.py                # Vercel Serverless Function entrypoint
│   └── requirements.txt        # Serverless Python dependencies
├── requirements.txt            # Root dependencies for Vercel Python runtime
├── deploy-github.sh            # One-click deployment script to GitHub & Vercel
├── vercel.json                 # Vercel routing, build commands, and rewrites
└── README.md                   # System documentation
```

---

## 4. Operator Authentication & Clearance

- **Default Operator ID**: `admin`
- **Default Clearance Password**: `nsa-admin`
- **Authentication Enforcement**: Both the React App and standalone Serenity Widget require active keyboard input of the password. Pre-filled tokens and automated shortcut fills are explicitly disabled.
- **Session Revocation**: Clicking the **🔒 LOCK** button in the Serenity Widget header flushes session tokens and locks the interface immediately.

---

## 5. Deployment & Vercel Auto-Deploy Pipeline

### A. Auto-Deploy via GitHub Integration
1. Push this repository to GitHub:
   ```bash
   ./deploy-github.sh
   # Or using git:
   git remote add origin https://github.com/witternif2003-beep/nsa-stock-scanner.git
   git push -u origin main
   ```
2. In your [Vercel Dashboard](https://vercel.com):
   - Navigate to **Add New Project** $\rightarrow$ **Import Git Repository**.
   - Select `witternif2003-beep/nsa-stock-scanner`.
   - Vercel automatically detects `vercel.json`, builds the frontend Vite assets into `public/`, and provisions the Python 3.13 serverless runtime for `/api/(.*)`.
   - **Every push to `main` will automatically trigger an instant production deployment.**

### B. Claiming Temporary Deployments
If you generated a temporary sandbox deployment:
- Claim URL: `https://vercel.com/claim-deployment?code=3275d069-2f16-430a-98ae-ad21156ea50c`
- Visiting this link while logged into your Vercel account instantly adopts the deployment into your workspace and connects it to your repository.

---

## 6. Zero-API-Key Data Source Verification

This system operates 100% on public and unmetered exchange tape feeds:
- **TradingView US Equity Scanner API**: `https://scanner.tradingview.com/america/scan` (8,000+ tickers, real-time prices, volume, float turnover).
- **Exchange Tape / Yahoo Finance v8 Engine**: Direct regular-market tape price and intraday change percentage parsing with zero lookback regression errors.
- **No Third-Party Paid Tiers**: Zero reliance on Polygon, TwelveData, AlphaVantage, or Nasdaq subscriptions.

---

## 7. License & Compliance

MIT License. Designed strictly for quantitative market intelligence, educational research, and defensive computational modeling.
