import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const categories = [
  "all", "ai_services", "freelance_services", "automation_services", "digital_arbitrage", "micro_saas",
] as const;

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(cat)}
          className="rounded-full"
        >
          {t(`categories.${cat}`)}
        </Button>
      ))}
    </div>
  );
}
