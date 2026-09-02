import { useState, useEffect, Fragment } from "react";

const COLORS = {
  bg: "#fafafa",
  bgCard: "#ffffff",
  bgInput: "#ffffff",
  bgRow: "#fafafa",
  bgRowAlt: "#fafafa",
  border: "#e4e4e7",
  primary: "#0f2a52",
  primaryHover: "#0b1f3d",
  navyMuted: "#b9c6dd",
  accent: "#2563eb",
  accentHover: "#1d4ed8",
  accentGold: "#d97706",
  accentGreen: "#059669",
  accentRed: "#dc2626",
  text: "#09090b",
  textMuted: "#71717a",
  textLabel: "#3f3f46",
};

const ACCOUNT_TYPES = ["Select...", "Individual", "Joint", "IRA", "Roth IRA", "SEP IRA", "SIMPLE IRA", "401(k)", "403(b)", "457(b)", "Pension", "Trust", "Corporate", "Custodial (UTMA)", "529 Plan", "HSA"];
const TRADE_TYPES = ["Select...", "Buy", "Sell", "Buy to Open", "Sell to Close", "Buy to Cover", "Sell Short", "Exchange", "Rebalance", "Rollover", "Transfer In", "Transfer Out", "Dividend Reinvestment"];
const ASSET_CLASSES = ["Select...", "Equity – Domestic", "Equity – International", "Equity – Emerging Markets", "Fixed Income – Treasury", "Fixed Income – Corporate", "Fixed Income – Municipal", "Fixed Income – High Yield", "Cash & Equivalents", "Real Estate (REIT)", "Commodities", "Alternative Investments", "Cryptocurrency", "Options", "ETF", "Mutual Fund", "Annuity – Variable", "Annuity – Fixed", "Annuity – Indexed"];
const ORDER_TYPES = ["Select...", "Market", "Limit", "Stop", "Stop-Limit", "Trailing Stop", "Market on Close", "Limit on Close", "Fill or Kill", "All or None", "Good Till Canceled (GTC)", "Day Order", "Immediate or Cancel (IOC)"];
const TIME_IN_FORCE = ["Select...", "Day", "Good Till Canceled (GTC)", "Good Till Date", "Immediate or Cancel (IOC)", "Fill or Kill (FOK)", "On Open", "On Close"];
const CUSTODIANS = ["Select...", "Schwab", "Fidelity", "TD Ameritrade", "Pershing", "LPL Financial", "Raymond James", "Ameriprise", "Edward Jones", "Vanguard", "BlackRock", "Merrill Lynch", "Morgan Stanley", "UBS", "Wells Fargo Advisors", "Other"];
const SETTLEMENT = ["Select...", "T+1", "T+2", "T+3", "Same Day", "Cash"];
const STATUS = ["Pending", "Submitted", "Filled", "Partially Filled", "Cancelled", "Rejected", "Expired", "On Hold"];
const RISK_LEVELS = ["Select...", "Conservative", "Moderately Conservative", "Moderate", "Moderately Aggressive", "Aggressive"];
const SOLICITED = ["Select...", "Solicited", "Unsolicited"];
const DISCRETION = ["Select...", "Discretionary", "Non-Discretionary"];
const TAX_LOT = ["Select...", "FIFO", "LIFO", "Specific Lot", "Average Cost", "Highest Cost", "Lowest Cost"];

const PRODUCT_TYPES = [
  "Select...",
  // Annuities
  "Fixed Annuity",
  "Fixed Indexed Annuity (FIA)",
  "Variable Annuity",
  "RILA – Registered Index-Linked Annuity",
  "Immediate Annuity (SPIA)",
  "Deferred Income Annuity (DIA)",
  "Multi-Year Guaranteed Annuity (MYGA)",
  // Insurance
  "Long-Term Care Insurance",
  "Life Insurance – Term",
  "Life Insurance – Whole Life",
  "Life Insurance – Universal Life",
  "Life Insurance – Indexed Universal Life (IUL)",
  "Life Insurance – Variable Universal Life (VUL)",
  "Disability Income Insurance",
  "Medicare Supplement",
  // Securities / Investments
  "Mutual Fund",
  "ETF (Exchange-Traded Fund)",
  "Individual Stock – Equity",
  "Individual Bond – Fixed Income",
  "Alternative Investment",
  "Real Estate Investment Trust (REIT)",
  "Oil & Gas – Direct Participation",
  "Oil & Gas – MLP",
  "Private Equity",
  "Hedge Fund",
  "Structured Product",
  "Certificate of Deposit (CD)",
  "Money Market",
  "529 College Savings Plan",
  "Other",
];

const CARRIER_MAP = {
  "Fixed Annuity": [
    "Allianz Life", "American Equity", "American National", "Athene Annuity",
    "AIG / American General", "Fidelity & Guaranty Life (FGL)", "Global Atlantic",
    "Great Plains Energy", "Lincoln Financial", "Midland National", "Minnesota Life",
    "Mutual of Omaha", "National Western Life", "North American Company",
    "Pacific Life", "Principal Financial", "Protective Life", "Puritan Life",
    "Sagicor Life", "Sentinel Security Life", "Symetra", "Transamerica", "Other",
  ],
  "Fixed Indexed Annuity (FIA)": [
    "Allianz Life", "American Equity", "American National", "Athene Annuity",
    "AIG / American General", "Fidelity & Guaranty Life (FGL)", "Global Atlantic",
    "Jackson National Life", "Lincoln Financial", "Midland National",
    "Minnesota Life", "Mutual of Omaha", "National Western Life",
    "North American Company", "Pacific Life", "Principal Financial",
    "Protective Life", "Sammons Financial", "Symetra", "Transamerica", "Other",
  ],
  "Variable Annuity": [
    "AIG / American General", "Allianz Life", "Brighthouse Financial",
    "Equitable (AXA)", "Global Atlantic", "Jackson National Life",
    "John Hancock", "Lincoln Financial", "Minnesota Life",
    "Nationwide", "Pacific Life", "Principal Financial",
    "Protective Life", "Prudential", "Transamerica", "Other",
  ],
  "RILA – Registered Index-Linked Annuity": [
    "Allianz Life", "Brighthouse Financial", "Equitable (AXA)",
    "Global Atlantic", "Lincoln Financial", "Pacific Life",
    "Principal Financial", "Protective Life", "Prudential", "Transamerica", "Other",
  ],
  "Immediate Annuity (SPIA)": [
    "American General", "American National", "Athene Annuity",
    "Guardian Life", "Lincoln Financial", "MassMutual",
    "Mutual of Omaha", "New York Life", "Pacific Life",
    "Principal Financial", "Protective Life", "Transamerica", "Other",
  ],
  "Deferred Income Annuity (DIA)": [
    "American General", "Guardian Life", "Lincoln Financial",
    "MassMutual", "New York Life", "Pacific Life",
    "Principal Financial", "Protective Life", "Transamerica", "Other",
  ],
  "Multi-Year Guaranteed Annuity (MYGA)": [
    "Allianz Life", "American Equity", "American National", "Athene Annuity",
    "Fidelity & Guaranty Life (FGL)", "Global Atlantic", "Midland National",
    "Mutual of Omaha", "National Western Life", "North American Company",
    "Pacific Life", "Protective Life", "Sagicor Life", "Symetra", "Transamerica", "Other",
  ],
  "Long-Term Care Insurance": [
    "Brighthouse Financial", "Genworth Financial", "Global Atlantic",
    "John Hancock", "Lincoln Financial", "MassMutual",
    "Mutual of Omaha", "National Guardian Life", "New York Life",
    "Northwestern Mutual", "Pacific Life", "Principal Financial",
    "Protective Life", "Securian Financial", "Transamerica", "Other",
  ],
  "Life Insurance – Term": [
    "AIG / American General", "Banner Life", "Foresters Financial",
    "Guardian Life", "John Hancock", "Legal & General America",
    "Lincoln Financial", "MassMutual", "Minnesota Life",
    "Mutual of Omaha", "New York Life", "Northwestern Mutual",
    "Pacific Life", "Principal Financial", "Protective Life",
    "Prudential", "Sagicor Life", "Symetra", "Transamerica", "Other",
  ],
  "Life Insurance – Whole Life": [
    "Guardian Life", "MassMutual", "Mutual of Omaha",
    "New York Life", "Northwestern Mutual", "Ohio National",
    "Pacific Life", "Penn Mutual", "Principal Financial",
    "Securian Financial", "State Farm", "Other",
  ],
  "Life Insurance – Universal Life": [
    "AIG / American General", "Allianz Life", "Columbus Life",
    "Guardian Life", "John Hancock", "Lincoln Financial",
    "MassMutual", "Minnesota Life", "Mutual of Omaha",
    "National Western Life", "Pacific Life", "Penn Mutual",
    "Principal Financial", "Protective Life", "Prudential",
    "Securian Financial", "Symetra", "Transamerica", "Other",
  ],
  "Life Insurance – Indexed Universal Life (IUL)": [
    "AIG / American General", "Allianz Life", "American National",
    "Columbus Life", "Global Atlantic", "John Hancock",
    "Lincoln Financial", "Minnesota Life", "Mutual of Omaha",
    "National Western Life", "North American Company", "Pacific Life",
    "Penn Mutual", "Principal Financial", "Protective Life",
    "Sammons Financial", "Securian Financial", "Symetra", "Transamerica", "Other",
  ],
  "Life Insurance – Variable Universal Life (VUL)": [
    "AIG / American General", "Brighthouse Financial", "Equitable (AXA)",
    "John Hancock", "Lincoln Financial", "MassMutual",
    "Minnesota Life", "Pacific Life", "Principal Financial",
    "Protective Life", "Prudential", "Securian Financial",
    "Transamerica", "Other",
  ],
  "Disability Income Insurance": [
    "Guardian Life", "MassMutual", "Mutual of Omaha",
    "Northwestern Mutual", "Principal Financial", "Standard Insurance",
    "Sun Life", "Transamerica", "Unum", "Other",
  ],
  "Medicare Supplement": [
    "AARP / UnitedHealthcare", "Aetna", "Anthem Blue Cross",
    "Blue Cross Blue Shield", "Cigna", "Humana",
    "Mutual of Omaha", "State Farm", "Transamerica",
    "United American Insurance", "Other",
  ],
  "Mutual Fund": [
    "American Funds (Capital Group)", "BlackRock", "Columbia Threadneedle",
    "Dimensional Fund Advisors (DFA)", "Fidelity Investments",
    "Franklin Templeton", "Goldman Sachs Asset Mgmt", "Invesco",
    "JPMorgan Asset Management", "Lord Abbett", "MFS Investment Management",
    "Neuberger Berman", "Nuveen", "PIMCO", "Putnam Investments",
    "T. Rowe Price", "Vanguard", "Victory Capital", "Other",
  ],
  "ETF (Exchange-Traded Fund)": [
    "BlackRock (iShares)", "Fidelity Investments", "Invesco",
    "JPMorgan Asset Management", "PIMCO", "Schwab Asset Management",
    "State Street (SPDR)", "T. Rowe Price", "Vanguard",
    "WisdomTree", "Other",
  ],
  "Individual Stock – Equity": ["Direct / Brokerage", "Other"],
  "Individual Bond – Fixed Income": ["Direct / Brokerage", "Treasury Direct", "Other"],
  "Alternative Investment": [
    "Blackstone", "Blue Owl Capital", "Brookfield Asset Management",
    "Carlyle Group", "Griffin-American Healthcare", "KKR",
    "NexPoint", "Oaktree Capital", "Owl Rock", "PIMCO",
    "Starwood Capital", "Other",
  ],
  "Real Estate Investment Trust (REIT)": [
    "American Realty Capital", "Blackstone REIT", "Broadstone Net Lease",
    "CIM Real Estate", "Griffin-American Healthcare REIT",
    "Hines Real Estate", "KBS Real Estate", "NexPoint Real Estate",
    "Starwood Real Estate", "Other",
  ],
  "Oil & Gas – Direct Participation": [
    "Canaan Energy", "Concho Resources", "Devon Energy",
    "Pioneer Natural Resources", "Viper Energy", "Other",
  ],
  "Oil & Gas – MLP": [
    "Enterprise Products Partners", "Energy Transfer",
    "Magellan Midstream", "Plains All American", "Other",
  ],
  "Private Equity": [
    "Apollo Global Management", "Blackstone", "Carlyle Group",
    "Goldman Sachs Private Equity", "KKR", "TPG Capital", "Other",
  ],
  "Hedge Fund": ["Direct / Advisor Access", "Other"],
  "Structured Product": ["Direct / Brokerage", "Other"],
  "Certificate of Deposit (CD)": ["Bank / Credit Union", "Brokered CD", "Other"],
  "Money Market": [
    "Fidelity Investments", "Schwab Asset Management",
    "T. Rowe Price", "Vanguard", "Other",
  ],
  "529 College Savings Plan": [
    "American Funds (CollegeAmerica)", "Fidelity Investments",
    "ScholarShare (Fidelity)", "T. Rowe Price", "Utah Educational Savings Plan",
    "Vanguard", "Other",
  ],
  "Other": ["Other"],
};

const PRODUCT_TO_PREFERRED_KEY = {
  "Fixed Annuity": "preferredFixedAnnuities",
  "Fixed Indexed Annuity (FIA)": "preferredFIAs",
  "Variable Annuity": "preferredVariableAnnuities",
  "RILA – Registered Index-Linked Annuity": "preferredRILAs",
  "Immediate Annuity (SPIA)": "preferredFixedAnnuities",
  "Deferred Income Annuity (DIA)": "preferredFixedAnnuities",
  "Multi-Year Guaranteed Annuity (MYGA)": "preferredMYGAs",
  "Long-Term Care Insurance": "preferredLTC",
  "Life Insurance – Term": "preferredLifeInsurance",
  "Life Insurance – Whole Life": "preferredLifeInsurance",
  "Life Insurance – Universal Life": "preferredLifeInsurance",
  "Life Insurance – Indexed Universal Life (IUL)": "preferredLifeInsurance",
  "Life Insurance – Variable Universal Life (VUL)": "preferredLifeInsurance",
  "Disability Income Insurance": "preferredLifeInsurance",
  "Medicare Supplement": "preferredLTC",
  "Mutual Fund": "preferredMutualFunds",
  "ETF (Exchange-Traded Fund)": "preferredETFs",
  "Alternative Investment": "preferredAlts",
  "Real Estate Investment Trust (REIT)": "preferredAlts",
  "Oil & Gas – Direct Participation": "preferredAlts",
  "Oil & Gas – MLP": "preferredAlts",
  "Private Equity": "preferredAlts",
};

const getCarriers = (productType, settings) => {
  if (!productType || productType === "Select...") return ["Select..."];
  const all = CARRIER_MAP[productType] || ["Other"];
  if (!settings) return ["Select...", ...all];
  const prefKey = PRODUCT_TO_PREFERRED_KEY[productType];
  const preferred = prefKey ? (settings[prefKey] || []).filter(p => all.includes(p)) : [];
  if (preferred.length === 0) return ["Select...", ...all];
  const rest = all.filter(c => !preferred.includes(c));
  return ["Select...", "── Preferred ──", ...preferred, "── All Carriers ──", ...rest];
};

const STATUS_COLORS = {
  "Pending": COLORS.accentGold,
  "Submitted": COLORS.accent,
  "Filled": COLORS.accentGreen,
  "Partially Filled": "#7c3aed",
  "Cancelled": COLORS.accentRed,
  "Rejected": "#ea580c",
  "Expired": COLORS.textMuted,
  "On Hold": "#db2777",
};

const TRADE_COLORS = {
  "Buy": COLORS.accentGreen,
  "Sell": COLORS.accentRed,
  "Exchange": COLORS.accent,
  "Rebalance": "#7c3aed",
};

const initialForm = {
  tradeDate: new Date().toISOString().split("T")[0],
  settlementDate: "",
  accountNumber: "",
  clientName: "",
  lastName: "",
  firstName: "",
  middleName: "",
  accountType: "Select...",
  custodian: "Select...",
  tradeType: "Select...",
  assetClass: "Select...",
  ticker: "",
  securityName: "",
  quantity: "",
  price: "",
  totalAmount: "",
  orderType: "Select...",
  limitPrice: "",
  stopPrice: "",
  timeInForce: "Select...",
  settlement: "Select...",
  taxLot: "Select...",
  riskLevel: "Select...",
  productType: "Select...",
  carrier: "Select...",
  solicited: "Select...",
  discretion: "Select...",
  status: "Pending",
  advisor: "",
  notes: "",
};

let nextId = 1;

const SAMPLE_TRADES = [
  { id: nextId++, tradeDate: "2026-06-17", clientName: "Thompson, Robert & Linda", lastName: "Thompson", firstName: "Robert & Linda", middleName: "", accountNumber: "RWG-10042", accountType: "Joint", custodian: "Schwab", tradeType: "Buy", assetClass: "Equity – Domestic", ticker: "AAPL", securityName: "Apple Inc.", quantity: "100", price: "192.45", totalAmount: "19,245.00", orderType: "Market", timeInForce: "Day", settlement: "T+1", status: "Filled", advisor: "Rex Russell", riskLevel: "Moderate", solicited: "Solicited", discretion: "Discretionary", notes: "" },
  { id: nextId++, tradeDate: "2026-06-17", clientName: "Martinez, Carlos", lastName: "Martinez", firstName: "Carlos", middleName: "", accountNumber: "RWG-10087", accountType: "IRA", custodian: "Fidelity", tradeType: "Sell", assetClass: "Fixed Income – Corporate", ticker: "LQD", securityName: "iShares iBoxx $ Investment Grade Corp Bond ETF", quantity: "250", price: "107.22", totalAmount: "26,805.00", orderType: "Limit", limitPrice: "107.50", timeInForce: "GTC", settlement: "T+2", status: "Submitted", advisor: "Rex Russell", riskLevel: "Moderately Conservative", solicited: "Solicited", discretion: "Non-Discretionary", notes: "Client requested exit before rate announcement" },
  { id: nextId++, tradeDate: "2026-06-16", clientName: "Johnson, Patricia", lastName: "Johnson", firstName: "Patricia", middleName: "", accountNumber: "RWG-10031", accountType: "Roth IRA", custodian: "Schwab", tradeType: "Buy", assetClass: "ETF", ticker: "VTI", securityName: "Vanguard Total Stock Market ETF", quantity: "50", price: "234.10", totalAmount: "11,705.00", orderType: "Market", timeInForce: "Day", settlement: "T+1", status: "Filled", advisor: "Rex Russell", riskLevel: "Aggressive", solicited: "Unsolicited", discretion: "Discretionary", notes: "" },
  { id: nextId++, tradeDate: "2026-06-15", clientName: "Whitfield, Dorothy", lastName: "Whitfield", firstName: "Dorothy", middleName: "", accountNumber: "RWG-10112", accountType: "IRA", custodian: "Fidelity", tradeType: "Buy", assetClass: "Annuity – Indexed", ticker: "ALZ-222", securityName: "Allianz 222 Annuity", productType: "Fixed Indexed Annuity (FIA)", carrier: "Allianz Life", quantity: "1", price: "150000", totalAmount: "150,000.00", orderType: "Market", timeInForce: "Day", settlement: "Same Day", status: "Submitted", advisor: "Rex Russell", riskLevel: "Conservative", solicited: "Solicited", discretion: "Non-Discretionary", notes: "1035 exchange from existing VA" },
];

const INS_INSTITUTIONS = ["Vanguard", "Empower", "Fidelity", "Schwab", "TIAA", "T. Rowe Price", "Principal", "Prudential", "Transamerica", "Lincoln Financial", "John Hancock", "Nationwide", "MassMutual", "Voya", "American Funds", "Merrill Lynch", "Morgan Stanley", "Edward Jones", "Raymond James", "LPL Financial", "Pershing", "TD Ameritrade", "Bank", "Credit Union", "Other"];
const INS_ACCT_TYPES = ["401(k)", "Roth 401(k)", "403(b)", "457(b)", "IRA", "Roth IRA", "SEP IRA", "SIMPLE IRA", "Pension", "Individual", "Joint", "Trust", "Custodial (UTMA)", "529", "HSA", "Annuity", "Life Insurance", "Other"];
const INS_ASSET_CLASSES = ["Stocks", "Bonds", "Mutual Funds", "ETFs", "Annuities", "CDs", "Money Market", "Cash", "Real Estate", "Alternatives", "Life Insurance", "Other"];
const INS_FUNDING_METHODS = ["1035 Exchange", "ACH", "Wire", "Check", "Direct Rollover", "60-Day Rollover", "Trustee-to-Trustee Transfer", "In-Kind Transfer (ACAT)", "Journal", "Other"];
const INS_DOCS_STATUS = ["IGO", "NIGO", "In Process", "Needs Attention"];

const fmtDateInput = (v) => {
  const d = String(v || "").replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return d.slice(0, 2) + "/" + d.slice(2);
  return d.slice(0, 2) + "/" + d.slice(2, 4) + "/" + d.slice(4);
};

const fmtDollarInput = (v) => {
  const d = String(v || "").replace(/[^0-9]/g, "");
  return d ? "$" + Number(d).toLocaleString("en-US") : "";
};

const trackingUrl = (raw) => {
  const t = String(raw || "").replace(/\s+/g, "");
  if (/^1Z/i.test(t)) return "https://www.ups.com/track?tracknum=" + encodeURIComponent(t);
  if (/^\d{20,22}$/.test(t)) return "https://tools.usps.com/go/TrackConfirmAction?tLabels=" + encodeURIComponent(t);
  if (/^\d{12}(\d{3})?$/.test(t)) return "https://www.fedex.com/fedextrack/?trknbr=" + encodeURIComponent(t);
  return "https://www.google.com/search?q=" + encodeURIComponent("track package " + t);
};

const INS_COLUMNS = [
  { key: "date", label: "Date", w: 95, type: "date" },
  { key: "amount", label: "Amount", w: 90, type: "money" },
  { key: "qualified", label: "Q/NQ", w: 70, options: ["Q", "NQ"] },
  { key: "lastName", label: "Last Name", w: 110 },
  { key: "middleInitial", label: "Middle Name", w: 90 },
  { key: "firstName", label: "First Name", w: 130 },
  { key: "fundsComingFrom", label: "Funds Coming From", w: 130, options: INS_INSTITUTIONS },
  { key: "currentAccountType", label: "Account Type", w: 110, options: INS_ACCT_TYPES },
  { key: "currentAssetClass", label: "Asset Class", w: 110, options: INS_ASSET_CLASSES },
  { key: "currentPolicyNumber", label: "Policy or Account #", w: 140 },
  { key: "ticker", label: "Ticker Symbol", w: 100 },
  { key: "receivingFirm", label: "Receiving Firm", w: 120, options: INS_INSTITUTIONS },
  { key: "newAccountType", label: "Account Type", w: 110, options: INS_ACCT_TYPES },
  { key: "newAssetClass", label: "Asset Class", w: 110, options: INS_ASSET_CLASSES },
  { key: "fundingMethod", label: "Funding Method", w: 110, options: INS_FUNDING_METHODS },
  { key: "checkNumber", label: "Check #", w: 90 },
  { key: "docsReceived", label: "Docs Rec'd", w: 100, options: INS_DOCS_STATUS },
  { key: "trackingNumber", label: "Overnight Tracking #", w: 140 },
  { key: "dateFunded", label: "Date Funded", w: 100, type: "date" },
  { key: "newPolicyNumber", label: "New Policy or Account #", w: 160 },
  { key: "bankDraft", label: "Bank Draft", w: 90, options: ["Yes", "No"] },
  { key: "draftStartDate", label: "Draft Start Date", w: 110, type: "date" },
  { key: "monthlyAmount", label: "Monthly Amount", w: 110, type: "money" },
  { key: "datePolicyDelivered", label: "Date Policy Delivered", w: 140, type: "date" },
  { key: "commissionPaidDate", label: "Commission Paid Date", w: 145, type: "date" },
  { key: "crmUpdated", label: "CRM Updated", w: 105, type: "date" },
  { key: "notes", label: "Notes", w: 220 },
];

let nextInsId = 1;

const SAMPLE_INSURANCE = [
  { id: nextInsId++, date: "07/06/2022", lastName: "Cozart", firstName: "Wendy", receivingFirm: "John Hancock", newAccountType: "529", newAssetClass: "Mutual Funds", fundingMethod: "ACH", dateFunded: "07/06/2022", newPolicyNumber: "20778089", bankDraft: "Yes", monthlyAmount: "$200" },
  { id: nextInsId++, date: "12/31/2023", lastName: "Jones", firstName: "Craig & Stephanie", fundingMethod: "Wire", docsReceived: "IGO", commissionPaidDate: "01/15/2024", notes: "e2c Bond – $200,000 opening" },
];

const INS_ROWS = [
  { cols: INS_COLUMNS.slice(0, 11), widths: { date: "7.2%", amount: "7%", qualified: "4.5%", lastName: "14.5%", middleInitial: "8.8%", firstName: "11.2%", fundsComingFrom: "11%", currentAccountType: "9%", currentAssetClass: "9.8%", currentPolicyNumber: "8.5%", ticker: "8.5%" } },
  { cols: INS_COLUMNS.slice(11, 20), widths: { receivingFirm: "12%", newAccountType: "10%", newAssetClass: "10%", fundingMethod: "16.5%", checkNumber: "6.5%", docsReceived: "13%", trackingNumber: "14%", dateFunded: "9%", newPolicyNumber: "9%" } },
  { cols: INS_COLUMNS.slice(20), widths: { bankDraft: "5.5%", draftStartDate: "10%", monthlyAmount: "10%", datePolicyDelivered: "10%", commissionPaidDate: "10%", crmUpdated: "10.5%", notes: "44%" } },
];

const STACKED_HEADERS = {
  receivingFirm: ["Receiving", "Firm"],
  ticker: ["Ticker", "Symbol"],
  bankDraft: ["Bank", "Draft"],
  datePolicyDelivered: ["Date Policy", "Delivered"],
  commissionPaidDate: ["Commission", "Paid Date"],
  newPolicyNumber: ["New Policy", "Account Number"],
  dateFunded: ["Date", "Funded"],
  newAccountType: ["Account", "Type"],
};

let nextBdId = 1;

const SAMPLE_BD = [
  { id: nextBdId++, date: "06/17/2026", lastName: "Thompson", firstName: "Robert & Linda", fundsComingFrom: "Schwab", currentAccountType: "Joint", currentAssetClass: "Stocks", receivingFirm: "Fidelity", ticker: "AAPL", newAccountType: "Joint", newAssetClass: "Stocks", fundingMethod: "In-Kind Transfer (ACAT)", docsReceived: "IGO", dateFunded: "06/17/2026", notes: "Apple Inc. — 100 shares @ $192.45" },
  { id: nextBdId++, date: "06/16/2026", lastName: "Johnson", firstName: "Patricia", fundsComingFrom: "Vanguard", currentAccountType: "Roth IRA", currentAssetClass: "Mutual Funds", receivingFirm: "Schwab", ticker: "VTI", newAccountType: "Roth IRA", newAssetClass: "ETFs", fundingMethod: "Direct Rollover", docsReceived: "In Process", notes: "Vanguard Total Stock Market ETF — 50 shares" },
];

const money = (s) => {
  const n = parseFloat(String(s || "").replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? 0 : n;
};

function SelectField({ label, value, onChange, options, required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: COLORS.textLabel, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}{required && <span style={{ color: COLORS.accentRed, marginLeft: 2 }}>*</span>}
      </label>
      <select
        value={value}
        onChange={e => { if (!e.target.value.startsWith("──")) onChange(e.target.value); }}
        style={{
          background: COLORS.bgInput, border: `1px solid ${COLORS.border}`, borderRadius: 6,
          color: value === "Select..." ? COLORS.textMuted : COLORS.text,
          padding: "8px 10px", fontSize: 13, outline: "none", width: "100%", appearance: "none",
          cursor: "pointer",
        }}
      >
        {options.map(o => <option key={o} value={o} disabled={o.startsWith("──")}
          style={{ color: o.startsWith("──") ? "#d97706" : "#09090b", fontWeight: o.startsWith("──") ? 700 : 400, background: "#ffffff" }}
        >{o}</option>)}
      </select>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: COLORS.textLabel, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}{required && <span style={{ color: COLORS.accentRed, marginLeft: 2 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: COLORS.bgInput, border: `1px solid ${COLORS.border}`, borderRadius: 6,
          color: COLORS.text, padding: "8px 10px", fontSize: 13, outline: "none", width: "100%",
          boxSizing: "border-box", textAlign: "left",
        }}
      />
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, background: color + "22", color, border: `1px solid ${color}44`,
      letterSpacing: "0.04em"
    }}>
      {label}
    </span>
  );
}

const STORAGE_KEY = "rwg_tradeblotter";

const loadStore = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null; } catch { return null; }
};
const STORED = loadStore();

export default function TradeBlotter() {
  const [view, setView] = useState("blotter"); // blotter | insurance | settings
  const [toast, setToast] = useState(null);
  const [confirmDlg, setConfirmDlg] = useState(null);

  const [bdRecords, setBdRecords] = useState(() => {
    const r = STORED?.bdRecords || SAMPLE_BD;
    nextBdId = r.reduce((m, x) => Math.max(m, x.id), 0) + 1;
    return r;
  });
  const [bdSearch, setBdSearch] = useState("");

  const updateBd = (id, key, val) => setBdRecords(rs => rs.map(r => r.id === id ? { ...r, [key]: val } : r));
  const addBd = () => setBdRecords(rs => [{ id: nextBdId++, date: new Date().toLocaleDateString("en-US"), createdAt: Date.now() }, ...rs]);
  const removeBd = (id) => {
    setConfirmDlg({
      message: "Are you sure you're ready to delete this record?",
      action: () => {
        setBdRecords(rs => rs.filter(r => r.id !== id));
        showToast("Record removed.", COLORS.accentRed);
      },
    });
  };

  const [insRecords, setInsRecords] = useState(() => {
    const r = STORED?.insRecords || SAMPLE_INSURANCE;
    nextInsId = r.reduce((m, x) => Math.max(m, x.id), 0) + 1;
    return r;
  });
  const [insSearch, setInsSearch] = useState("");

  const updateIns = (id, key, val) => setInsRecords(rs => rs.map(r => r.id === id ? { ...r, [key]: val } : r));
  const addIns = () => setInsRecords(rs => [{ id: nextInsId++, date: new Date().toLocaleDateString("en-US"), createdAt: Date.now() }, ...rs]);
  const removeIns = (id) => {
    setConfirmDlg({
      message: "Are you sure you're ready to delete this record?",
      action: () => {
        setInsRecords(rs => rs.filter(r => r.id !== id));
        showToast("Record removed.", COLORS.accentRed);
      },
    });
  };

  const [settings, setSettings] = useState(STORED?.settings || {
    firmName: "Russell Wealth Group",
    firmCRD: "", firmAddress: "", firmCity: "", firmState: "", firmZip: "",
    firmPhone: "", firmEmail: "", firmWebsite: "",
    bdName: "", bdCRD: "", bdOSJAddress: "", bdComplianceContact: "",
    bdCompliancePhone: "", bdComplianceEmail: "", bdClearingFirm: "",
    advisors: [{ name: "Rex Russell", crd: "", email: "", phone: "", title: "Financial Advisor" }],
    supportStaff: [{ name: "", title: "", email: "", phone: "" }],
    preferredMutualFunds: ["American Funds (Capital Group)", "Franklin Templeton", "Lord Abbett"],
    preferredVariableAnnuities: ["Jackson National Life", "Lincoln Financial"],
    preferredFixedAnnuities: ["Athene Annuity", "North American Company"],
    preferredFIAs: ["Allianz Life", "American Equity", "Midland National"],
    preferredRILAs: ["Allianz Life", "Brighthouse Financial"],
    preferredMYGAs: ["Athene Annuity", "Fidelity & Guaranty Life (FGL)"],
    preferredLifeInsurance: ["Lincoln Financial", "Pacific Life", "North American Company"],
    preferredLTC: ["Mutual of Omaha", "Nationwide"],
    preferredETFs: ["BlackRock (iShares)", "Vanguard", "State Street (SPDR)"],
    preferredAlts: [],
    preferredCustodians: ["Schwab", "Fidelity"],
    complianceNotes: "", generalNotes: "",
  });

  const setSetting = (k) => (v) => setSettings(s => ({ ...s, [k]: v }));

  const [savedAt, setSavedAt] = useState(null);
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ bdRecords, insRecords, settings }));
        setSavedAt(new Date());
      } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [bdRecords, insRecords, settings]);

  const updateAdvisor = (i, field, val) => setSettings(s => {
    const advisors = [...s.advisors];
    advisors[i] = { ...advisors[i], [field]: val };
    return { ...s, advisors };
  });
  const addAdvisor = () => setSettings(s => ({ ...s, advisors: [...s.advisors, { name: "", crd: "", email: "", phone: "", title: "" }] }));
  const removeAdvisor = (i) => setConfirmDlg({
    message: "Are you sure you're ready to delete this advisor?",
    action: () => setSettings(s => ({ ...s, advisors: s.advisors.filter((_, idx) => idx !== i) })),
  });

  const updateStaff = (i, field, val) => setSettings(s => {
    const supportStaff = [...s.supportStaff];
    supportStaff[i] = { ...supportStaff[i], [field]: val };
    return { ...s, supportStaff };
  });
  const addStaff = () => setSettings(s => ({ ...s, supportStaff: [...s.supportStaff, { name: "", title: "", email: "", phone: "" }] }));
  const removeStaff = (i) => setConfirmDlg({
    message: "Are you sure you're ready to delete this staff member?",
    action: () => setSettings(s => ({ ...s, supportStaff: s.supportStaff.filter((_, idx) => idx !== i) })),
  });

  const togglePreferred = (key, item) => setSettings(s => {
    const list = s[key] || [];
    return { ...s, [key]: list.includes(item) ? list.filter(x => x !== item) : [...list, item] };
  });

  const showToast = (msg, color = COLORS.accentGreen) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', 'Segoe UI', sans-serif", fontSize: 14 }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 999,
          background: toast.color, color: "#fff", padding: "12px 22px",
          borderRadius: 8, fontWeight: 600, fontSize: 13,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)", animation: "fadeIn 0.2s ease"
        }}>
          {toast.msg}
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDlg && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, maxWidth: 420, width: "100%", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Confirm Delete</div>
            <div style={{ fontSize: 13, color: COLORS.textLabel, marginBottom: 20 }}>{confirmDlg.message}</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setConfirmDlg(null)}
                style={{ padding: "8px 20px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer", background: "transparent", color: COLORS.textLabel, border: `1px solid ${COLORS.border}` }}>
                Cancel
              </button>
              <button onClick={() => { confirmDlg.action(); setConfirmDlg(null); }}
                style={{ padding: "8px 20px", borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: "pointer", background: COLORS.accentRed, color: "#fff", border: "none" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: COLORS.primary, borderBottom: `1px solid ${COLORS.primaryHover}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#fff", color: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>
              RW
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.01em", color: "#fff" }}>Russell Wealth Group</div>
              <div style={{ fontSize: 11, color: COLORS.navyMuted, letterSpacing: "0.06em" }}>TRADE BLOTTER</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div title="Everything you enter is saved automatically in this browser" style={{ padding: "6px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "#7ee2a8", border: "1px solid rgba(126,226,168,0.4)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
              {savedAt ? "✓ DATA SAVED · " + savedAt.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "AUTOSAVE ON"}
            </div>
            <button
              onClick={() => setView("blotter")}
              style={{
                padding: "8px 18px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer",
                background: view === "blotter" ? "#fff" : "transparent",
                color: view === "blotter" ? COLORS.primary : COLORS.navyMuted,
                border: `1px solid ${view === "blotter" ? "#fff" : "rgba(255,255,255,0.35)"}`
              }}
            >📋 BD Blotter</button>
            <button
              onClick={() => setView("insurance")}
              style={{
                padding: "8px 18px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer",
                background: view === "insurance" ? "#fff" : "transparent",
                color: view === "insurance" ? COLORS.primary : COLORS.navyMuted,
                border: `1px solid ${view === "insurance" ? "#fff" : "rgba(255,255,255,0.35)"}`
              }}
            >🛡️ Insurance Blotter</button>
            <button
              onClick={() => setView("settings")}
              style={{
                padding: "8px 18px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer",
                background: view === "settings" ? "#fff" : "transparent",
                color: view === "settings" ? COLORS.primary : COLORS.navyMuted,
                border: `1px solid ${view === "settings" ? "#fff" : "rgba(255,255,255,0.35)"}`
              }}
            >⚙️ Settings</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 24px" }}>

        {view === "blotter" && (
          <RecordSheet records={bdRecords} search={bdSearch} setSearch={setBdSearch} onAdd={addBd} onUpdate={updateBd} onRemove={removeBd} />
        )}

        {view === "insurance" && (
          <RecordSheet records={insRecords} search={insSearch} setSearch={setInsSearch} onAdd={addIns} onUpdate={updateIns} onRemove={removeIns} />
        )}

        {/* SETTINGS VIEW */}
        {view === "settings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Firm Info */}
            <SettingsCard title="Firm Information" icon="🏢">
              <SGrid>
                <SInput label="Firm Name" value={settings.firmName} onChange={setSetting("firmName")} />
                <SInput label="Firm CRD #" value={settings.firmCRD} onChange={setSetting("firmCRD")} />
                <SInput label="Address" value={settings.firmAddress} onChange={setSetting("firmAddress")} />
                <SInput label="City" value={settings.firmCity} onChange={setSetting("firmCity")} />
                <SInput label="State" value={settings.firmState} onChange={setSetting("firmState")} />
                <SInput label="ZIP" value={settings.firmZip} onChange={setSetting("firmZip")} />
                <SInput label="Phone" value={settings.firmPhone} onChange={setSetting("firmPhone")} />
                <SInput label="Email" value={settings.firmEmail} onChange={setSetting("firmEmail")} />
                <SInput label="Website" value={settings.firmWebsite} onChange={setSetting("firmWebsite")} />
              </SGrid>
            </SettingsCard>

            {/* Broker-Dealer */}
            <SettingsCard title="Broker-Dealer Details" icon="🏦">
              <SGrid>
                <SInput label="Broker-Dealer Name" value={settings.bdName} onChange={setSetting("bdName")} />
                <SInput label="BD CRD #" value={settings.bdCRD} onChange={setSetting("bdCRD")} />
                <SInput label="Clearing Firm" value={settings.bdClearingFirm} onChange={setSetting("bdClearingFirm")} />
                <SInput label="OSJ / Branch Address" value={settings.bdOSJAddress} onChange={setSetting("bdOSJAddress")} />
                <SInput label="Compliance Contact" value={settings.bdComplianceContact} onChange={setSetting("bdComplianceContact")} />
                <SInput label="Compliance Phone" value={settings.bdCompliancePhone} onChange={setSetting("bdCompliancePhone")} />
                <SInput label="Compliance Email" value={settings.bdComplianceEmail} onChange={setSetting("bdComplianceEmail")} />
              </SGrid>
            </SettingsCard>

            {/* Advisors */}
            <SettingsCard title="Registered Advisors" icon="👔">
              {settings.advisors.map((a, i) => (
                <div key={i} style={{ background: COLORS.bgRow, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent }}>Advisor {i + 1}</span>
                    {settings.advisors.length > 1 && (
                      <button onClick={() => removeAdvisor(i)} style={{ background: COLORS.accentRed + "22", border: `1px solid ${COLORS.accentRed}44`, borderRadius: 5, color: COLORS.accentRed, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Remove</button>
                    )}
                  </div>
                  <SGrid>
                    <SInput label="Full Name" value={a.name} onChange={v => updateAdvisor(i, "name", v)} />
                    <SInput label="Title" value={a.title} onChange={v => updateAdvisor(i, "title", v)} />
                    <SInput label="CRD #" value={a.crd} onChange={v => updateAdvisor(i, "crd", v)} />
                    <SInput label="Phone" value={a.phone} onChange={v => updateAdvisor(i, "phone", v)} />
                    <SInput label="Email" value={a.email} onChange={v => updateAdvisor(i, "email", v)} />
                  </SGrid>
                </div>
              ))}
              <button onClick={addAdvisor} style={{ background: COLORS.accent + "22", border: `1px solid ${COLORS.accent}44`, borderRadius: 6, color: COLORS.accent, padding: "8px 18px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>+ Add Advisor</button>
            </SettingsCard>

            {/* Support Staff */}
            <SettingsCard title="Support Staff" icon="🧑‍💼">
              {settings.supportStaff.map((s, i) => (
                <div key={i} style={{ background: COLORS.bgRow, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accentGold }}>Staff Member {i + 1}</span>
                    <button onClick={() => removeStaff(i)} style={{ background: COLORS.accentRed + "22", border: `1px solid ${COLORS.accentRed}44`, borderRadius: 5, color: COLORS.accentRed, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Remove</button>
                  </div>
                  <SGrid>
                    <SInput label="Full Name" value={s.name} onChange={v => updateStaff(i, "name", v)} />
                    <SInput label="Title / Role" value={s.title} onChange={v => updateStaff(i, "title", v)} />
                    <SInput label="Phone" value={s.phone} onChange={v => updateStaff(i, "phone", v)} />
                    <SInput label="Email" value={s.email} onChange={v => updateStaff(i, "email", v)} />
                  </SGrid>
                </div>
              ))}
              <button onClick={addStaff} style={{ background: COLORS.accentGold + "22", border: `1px solid ${COLORS.accentGold}44`, borderRadius: 6, color: COLORS.accentGold, padding: "8px 18px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>+ Add Staff Member</button>
            </SettingsCard>

            {/* Preferred Products */}
            <SettingsCard title="Preferred Products & Carriers" icon="⭐">
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { key: "preferredMutualFunds", label: "Mutual Funds", options: CARRIER_MAP["Mutual Fund"] },
                  { key: "preferredFIAs", label: "Fixed Indexed Annuities (FIA)", options: CARRIER_MAP["Fixed Indexed Annuity (FIA)"] },
                  { key: "preferredFixedAnnuities", label: "Fixed Annuities", options: CARRIER_MAP["Fixed Annuity"] },
                  { key: "preferredVariableAnnuities", label: "Variable Annuities", options: CARRIER_MAP["Variable Annuity"] },
                  { key: "preferredRILAs", label: "RILAs / Registered Index-Linked", options: CARRIER_MAP["RILA – Registered Index-Linked Annuity"] },
                  { key: "preferredMYGAs", label: "MYGAs / Multi-Year Guaranteed", options: CARRIER_MAP["Multi-Year Guaranteed Annuity (MYGA)"] },
                  { key: "preferredLifeInsurance", label: "Life Insurance (IUL / UL / Term)", options: CARRIER_MAP["Life Insurance – Indexed Universal Life (IUL)"] },
                  { key: "preferredLTC", label: "Long-Term Care Insurance", options: CARRIER_MAP["Long-Term Care Insurance"] },
                  { key: "preferredETFs", label: "ETFs", options: CARRIER_MAP["ETF (Exchange-Traded Fund)"] },
                  { key: "preferredAlts", label: "Alternative Investments", options: CARRIER_MAP["Alternative Investment"] },
                  { key: "preferredCustodians", label: "Custodians", options: CUSTODIANS.slice(1) },
                ].map(({ key, label, options }) => (
                  <div key={key}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textLabel, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {options.filter(o => o !== "Other").map(opt => {
                        const selected = (settings[key] || []).includes(opt);
                        return (
                          <button key={opt} onClick={() => togglePreferred(key, opt)}
                            style={{
                              padding: "5px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontWeight: 600,
                              background: selected ? COLORS.primary : COLORS.bgInput,
                              color: selected ? "#fff" : COLORS.textMuted,
                              border: `1px solid ${selected ? COLORS.primary : COLORS.border}`,
                              transition: "all 0.15s"
                            }}>
                            {selected ? "✓ " : ""}{opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </SettingsCard>

            {/* Notes */}
            <SettingsCard title="Notes & Compliance Reminders" icon="📝">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textLabel, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Compliance Notes</div>
                  <textarea value={settings.complianceNotes} onChange={e => setSetting("complianceNotes")(e.target.value)}
                    rows={3} placeholder="Compliance reminders, regulatory notes, supervision requirements..."
                    style={{ background: COLORS.bgInput, border: `1px solid ${COLORS.border}`, borderRadius: 6, color: COLORS.text, padding: "10px 12px", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit", width: "100%", boxSizing: "border-box" }} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textLabel, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>General Notes</div>
                  <textarea value={settings.generalNotes} onChange={e => setSetting("generalNotes")(e.target.value)}
                    rows={3} placeholder="Practice notes, workflow reminders, team instructions..."
                    style={{ background: COLORS.bgInput, border: `1px solid ${COLORS.border}`, borderRadius: 6, color: COLORS.text, padding: "10px 12px", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit", width: "100%", boxSizing: "border-box" }} />
                </div>
              </div>
            </SettingsCard>

            {/* Save Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: 24 }}>
              <button onClick={() => showToast("Settings saved successfully.")}
                style={{ padding: "12px 32px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", background: COLORS.primary, color: "#fff", border: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                💾 Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        * { box-sizing: border-box; }
        input[type=date] { text-align: left !important; direction: ltr; }
        input[type=date]::-webkit-date-and-time-value { text-align: left; }
        input[type=date]::-webkit-inner-spin-button { display: none; }
        input::placeholder, textarea::placeholder { color: #a1a1aa !important; }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { color: #a1a1aa !important; }
        input::-moz-placeholder, textarea::-moz-placeholder { color: #a1a1aa !important; }
        input:-ms-input-placeholder, textarea:-ms-input-placeholder { color: #a1a1aa !important; }
        select option { background: #ffffff; color: #09090b; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        tr { transition: background 0.1s; }
        button:hover { opacity: 0.88; }
      `}</style>
    </div>
  );
}

function recCreatedAt(r) {
  if (r.createdAt) return r.createdAt;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec((r.date || "").trim());
  if (m) return new Date(+m[3], +m[1] - 1, +m[2]).getTime();
  return null;
}

function elapsedParts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function RecordTimer({ r, onUpdate }) {
  const [now, setNow] = useState(Date.now());
  const funded = (r.dateFunded || "").trim() !== "";
  const done = !!r.completedAt || funded;
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [done]);
  const start = recCreatedAt(r);
  const parts = start ? elapsedParts((done ? (r.completedAt || now) : now) - start) : null;
  const boxBg = done ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.12)";
  const boxBorder = done ? "1px solid #22c55e" : "1px solid rgba(255,255,255,0.35)";
  const numColor = done ? "#86efac" : "#fff";
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      {parts && [["Days", parts.d], ["Hrs", parts.h], ["Min", parts.m], ["Sec", parts.s]].map(([lbl, val]) => (
        <span key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 34, padding: "2px 6px", borderRadius: 5, background: boxBg, border: boxBorder }}>
          <span style={{ fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 13, fontWeight: 900, lineHeight: "15px", color: numColor }}>{String(val).padStart(2, "0")}</span>
          <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.navyMuted }}>{lbl}</span>
        </span>
      ))}
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 800, color: "#fff", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
          <input
            type="checkbox"
            checked={!!r.docsReceivedChecked}
            onChange={e => onUpdate(r.id, "docsReceivedChecked", e.target.checked)}
            style={{ width: 13, height: 13, accentColor: "#22c55e", cursor: "pointer" }}
          />
          Docs Received
        </label>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.08em", paddingLeft: 18 }}>IGO</span>
      </span>
      <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        <input
          type="checkbox"
          checked={funded}
          onChange={e => {
            if (e.target.checked) {
              onUpdate(r.id, "dateFunded", new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }));
              onUpdate(r.id, "completedAt", Date.now());
            } else {
              onUpdate(r.id, "dateFunded", "");
              onUpdate(r.id, "completedAt", null);
            }
          }}
          style={{ width: 15, height: 15, accentColor: "#22c55e", cursor: "pointer" }}
        />
        Date Funded
      </label>
    </span>
  );
}

function RecordSheet({ records, search, setSearch, onAdd, onUpdate, onRemove }) {
  const filtered = records.filter(r =>
    !search || Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Records", value: filtered.length, color: COLORS.accent },
                { label: "Monthly Amounts", value: "$" + filtered.reduce((s, r) => s + money(r.monthlyAmount), 0).toLocaleString("en-US"), color: "#7c3aed" },
                { label: "Funded", value: filtered.filter(r => (r.dateFunded || "").trim() !== "").length, color: COLORS.accentGreen },
                { label: "Needs Attention", value: filtered.filter(r => (r.docsReceived || "").startsWith("Needs")).length, color: COLORS.accentRed },
              ].map(c => (
                <div key={c.label} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{c.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: c.color }}>{c.value}</div>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <input
                placeholder="🔍  Search name, product, policy #..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  background: COLORS.bgInput, border: `1px solid ${COLORS.border}`, borderRadius: 6,
                  color: COLORS.text, padding: "8px 12px", fontSize: 13, outline: "none", width: 280
                }}
              />
              <button onClick={onAdd}
                style={{ padding: "8px 18px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer", background: COLORS.primary, color: "#fff", border: `1px solid ${COLORS.primary}` }}>
                + Add Record
              </button>
              <div style={{ marginLeft: "auto", fontSize: 12, color: COLORS.textMuted }}>
                {filtered.length} record{filtered.length !== 1 ? "s" : ""} · click any cell to edit
              </div>
            </div>

            {/* Records — one card per trade, two sleeves each */}
            {filtered.length === 0 ? (
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 40, textAlign: "center", color: COLORS.textMuted }}>
                No records. Click <strong style={{ color: COLORS.accent }}>+ Add Record</strong> to start one.
              </div>
            ) : filtered.map((r, idx) => (
              <Fragment key={r.id}>
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 0 }}>
                {/* Record header bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 16px", background: COLORS.primary, borderBottom: `1px solid ${COLORS.primaryHover}` }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#fff", whiteSpace: "nowrap" }}>
                    {(r.lastName || r.firstName) ? `${r.lastName || ""}${r.lastName && r.firstName ? ", " : ""}${r.firstName || ""}` : "New Record"}
                    {r.date ? <span style={{ fontWeight: 400, color: COLORS.navyMuted }}> · {r.date}</span> : null}
                  </span>
                  <RecordTimer r={r} onUpdate={onUpdate} />
                  <button onClick={() => onRemove(r.id)} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 5, color: "#fff", padding: "4px 12px", fontSize: 11, cursor: "pointer", fontWeight: 600, marginLeft: "auto" }}>✕ Delete</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  {INS_ROWS.map((row, bank) => (
                    <table key={bank} style={{ width: "100%", minWidth: 1000, borderCollapse: "collapse", tableLayout: "fixed", marginTop: bank > 0 ? 6 : 0 }}>
                      <tbody>
                        <tr style={{ background: "#2a5794" }}>
                          {row.cols.map(c => (
                            <th key={c.key} style={{ width: row.widths[c.key], padding: "9px 10px", textAlign: "left", fontSize: 11, fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: `1px solid ${COLORS.border}`, borderRight: "1px solid rgba(255,255,255,0.85)", whiteSpace: "normal", verticalAlign: "top" }}>{STACKED_HEADERS[c.key] ? <>{STACKED_HEADERS[c.key][0]}<br />{STACKED_HEADERS[c.key][1]}</> : c.label}</th>
                          ))}
                          {row.filler && <th style={{ borderBottom: `1px solid ${COLORS.border}` }} />}
                        </tr>
                        <tr>
                          {row.cols.map(c => (
                            <td key={c.key} style={{ padding: 0, borderBottom: `1px solid ${COLORS.border}`, borderRight: "1px solid #2a5794" }}>
                                {c.options ? (
                                  <select
                                    value={r[c.key] ?? ""}
                                    onChange={e => onUpdate(r.id, c.key, e.target.value)}
                                    style={{ width: "100%", boxSizing: "border-box", border: "none", background: "transparent", padding: "10px 6px", fontSize: 13, fontWeight: 700, color: "#000", outline: "none", cursor: "pointer" }}
                                  >
                                    <option value=""></option>
                                    {c.options.map(o => <option key={o} value={o}>{o}</option>)}
                                  </select>
                                ) : c.key === "trackingNumber" ? (
                                  <div style={{ display: "flex", alignItems: "center" }}>
                                    <input
                                      value={r[c.key] ?? ""}
                                      onChange={e => onUpdate(r.id, c.key, e.target.value)}
                                      style={{ flex: 1, minWidth: 0, boxSizing: "border-box", border: "none", background: "transparent", padding: "11px 6px 11px 10px", fontSize: 13, fontWeight: 700, color: "#000", outline: "none" }}
                                    />
                                    {(r.trackingNumber || "").trim() !== "" && (
                                      <a href={trackingUrl(r.trackingNumber)} target="_blank" rel="noopener noreferrer" title="Track this shipment"
                                        style={{ padding: "0 8px", fontSize: 14, fontWeight: 700, color: COLORS.accent, textDecoration: "none" }}>↗</a>
                                    )}
                                  </div>
                                ) : (
                                  <input
                                    value={r[c.key] ?? ""}
                                    placeholder={c.type === "date" ? "MM/DD/YYYY" : undefined}
                                    onChange={e => onUpdate(r.id, c.key, c.type === "date" ? fmtDateInput(e.target.value) : c.type === "money" ? fmtDollarInput(e.target.value) : e.target.value)}
                                    style={{ width: "100%", boxSizing: "border-box", border: "none", background: "transparent", padding: "11px 10px", fontSize: 13, fontWeight: 700, color: "#000", outline: "none" }}
                                  />
                                )}
                              </td>
                          ))}
                          {row.filler && <td style={{ borderBottom: `1px solid ${COLORS.border}` }} />}
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </div>
              </div>
              </Fragment>
            ))}
    </>
  );
}

function Section({ title, icon, children }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}` }}>
        <span style={{ fontSize: 15 }}>{icon}</span>
        <span style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.text }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Grid({ cols = 3, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 14 }}>
      {children}
    </div>
  );
}
function SettingsCard({ title, icon, children }) {
  return (
    <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: COLORS.primary, padding: "12px 20px", borderBottom: `1px solid ${COLORS.primaryHover}`, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff" }}>{title}</span>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function SGrid({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
      {children}
    </div>
  );
}

function SInput({ label, value, onChange, placeholder }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: COLORS.textLabel, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || ""}
        style={{
          background: COLORS.bgInput, border: `1px solid ${COLORS.border}`, borderRadius: 6,
          color: COLORS.text, padding: "8px 10px", fontSize: 13, outline: "none",
          width: "100%", boxSizing: "border-box",
        }}
      />
    </div>
  );
}
