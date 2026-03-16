// Trust Algorithm Engine
// Score = (Pain * 0.35) + (Demand * 0.25) + (Feasibility * 0.20) + (Evidence * 0.10) + (Age * 0.10) - (GovComplexity * 0.15)

export interface TrustInput {
  monthlyLossUSD: number;
  localGDPPerCapita: number; // for normalization
  demandScore: number; // 0-100
  feasibilityScore: number; // 0-100
  hasEvidence: boolean;
  problemDurationMonths: number;
  govComplexityScore: number; // 0-100
}

export interface TrustResult {
  score: number;
  isPremium: boolean;
  label: string;
  breakdown: {
    pain: number;
    demand: number;
    feasibility: number;
    evidence: number;
    age: number;
    govComplexity: number;
  };
}

function normalizePain(monthlyLoss: number, gdpPerCapita: number): number {
  const ratio = (monthlyLoss * 12) / gdpPerCapita;
  return Math.min(100, ratio * 100);
}

function normalizeAge(months: number): number {
  if (months >= 24) return 100;
  if (months <= 3) return 20;
  return 20 + ((months - 3) / 21) * 80;
}

export function calculateTrustScore(input: TrustInput): TrustResult {
  const pain = normalizePain(input.monthlyLossUSD, input.localGDPPerCapita);
  const demand = Math.min(100, Math.max(0, input.demandScore));
  const feasibility = Math.min(100, Math.max(0, input.feasibilityScore));
  const evidence = input.hasEvidence ? 100 : 0;
  const age = normalizeAge(input.problemDurationMonths);
  const govComplexity = Math.min(100, Math.max(0, input.govComplexityScore));

  const raw =
    pain * 0.35 +
    demand * 0.25 +
    feasibility * 0.20 +
    evidence * 0.10 +
    age * 0.10 -
    govComplexity * 0.15;

  const score = Math.max(0, Math.min(100, Math.round(raw * 1000) / 1000));
  const isPremium = score > 85;

  return {
    score,
    isPremium,
    label: isPremium ? "أصل ممتاز" : "أصل قياسي",
    breakdown: { pain, demand, feasibility, evidence, age, govComplexity },
  };
}

// Generate angel number IDs
export function generateAssetId(sector: string): string {
  const sectorCodes: Record<string, string> = {
    Infrastructure: "INF",
    "Supply Chain": "SCH",
    Energy: "NRG",
    Waste: "WST",
    Water: "WTR",
  };
  const code = sectorCodes[sector] || "GEN";
  const angels = [111, 333, 555, 777, 999];
  const angel = angels[Math.floor(Math.random() * angels.length)];
  return `ASSET-${angel}-${code}`;
}

export function generateTxnId(): string {
  const angels = [111, 333, 777];
  const angel = angels[Math.floor(Math.random() * angels.length)];
  const suffix = Math.floor(Math.random() * 99) + 1;
  return `TXN-${angel}-${suffix.toString().padStart(2, "0")}`;
}
