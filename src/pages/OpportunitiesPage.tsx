import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { OPPORTUNITIES, CATEGORIES, type Category } from "@/data/opportunities";
import OpportunityCard from "@/components/opportunity/OpportunityCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const INCOME_RANGES = [
  { label: "Any", min: 0, max: Infinity },
  { label: "$500–$1k", min: 500, max: 1000 },
  { label: "$1k–$2k", min: 1000, max: 2000 },
  { label: "$2k–$5k", min: 2000, max: 5000 },
  { label: "$5k+", min: 5000, max: Infinity },
];

const STARTUP_COSTS = ["Any", "$0", "Under $50", "Under $100"];

export default function OpportunitiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    (searchParams.get("category") as Category) || "All"
  );
  const [selectedIncome, setSelectedIncome] = useState(0);
  const [selectedCost, setSelectedCost] = useState("Any");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat as Category);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const incomeRange = INCOME_RANGES[selectedIncome];
    return OPPORTUNITIES.filter((opp) => {
      const matchesSearch =
        !search ||
        opp.title.toLowerCase().includes(search.toLowerCase()) ||
        opp.category.toLowerCase().includes(search.toLowerCase()) ||
        opp.targetClients.toLowerCase().includes(search.toLowerCase());
      const matchesCat = selectedCategory === "All" || opp.category === selectedCategory;
      const matchesIncome = opp.incomeMin >= incomeRange.min && opp.incomeMax <= incomeRange.max;
      const matchesCost =
        selectedCost === "Any" ||
        (selectedCost === "$0" && opp.startupCost === "$0") ||
        (selectedCost === "Under $50" && (opp.startupCost === "$0" || opp.startupCost === "$29")) ||
        (selectedCost === "Under $100" && true);
      return matchesSearch && matchesCat && matchesIncome && matchesCost;
    });
  }, [search, selectedCategory, selectedIncome, selectedCost]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedIncome(0);
    setSelectedCost("Any");
    setSearchParams({});
  };

  const hasActiveFilters = search || selectedCategory !== "All" || selectedIncome !== 0 || selectedCost !== "Any";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Opportunity Library</h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">
          {OPPORTUNITIES.length} VALIDATED OPPORTUNITIES · UPDATED WEEKLY
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search opportunities, categories, or clients..."
            className="w-full bg-card border border-border rounded-md ps-10 pe-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "border-primary text-primary" : ""}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-primary" />
          )}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-5 rounded-lg border border-border bg-card space-y-5"
        >
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Category</p>
            <div className="flex flex-wrap gap-2">
              {(["All", ...CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (cat !== "All") setSearchParams({ category: cat });
                    else setSearchParams({});
                  }}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-all ${
                    selectedCategory === cat
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Monthly Income Potential</p>
            <div className="flex flex-wrap gap-2">
              {INCOME_RANGES.map((range, i) => (
                <button
                  key={range.label}
                  onClick={() => setSelectedIncome(i)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-all ${
                    selectedIncome === i
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Startup Cost</p>
            <div className="flex flex-wrap gap-2">
              {STARTUP_COSTS.map((cost) => (
                <button
                  key={cost}
                  onClick={() => setSelectedCost(cost)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-all ${
                    selectedCost === cost
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {cost}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Category pills (always visible) */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(["All", ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-mono">
          {filtered.length} OPPORTUNITIES FOUND
        </p>
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "All" && (
              <Badge variant="outline" className="text-primary border-primary/40 font-mono text-xs gap-1">
                {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Opportunities Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((opp, i) => (
            <OpportunityCard key={opp.id} opportunity={opp} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg mb-4">No opportunities match your filters</p>
          <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
        </div>
      )}
    </div>
  );
}
