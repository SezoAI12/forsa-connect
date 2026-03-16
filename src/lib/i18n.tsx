import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "en";

const translations = {
  ar: {
    appName: "فرصة IQ",
    dashboard: "لوحة التحكم",
    opportunityRadar: "رادار الفرص",
    marketplace: "السوق",
    submitProblem: "تقديم مشكلة",
    trustScore: "مؤشر الثقة",
    premiumAsset: "أصل ممتاز",
    sector: "القطاع",
    city: "المدينة",
    painMagnitude: "حجم الخسارة",
    viewDetails: "عرض التفاصيل",
    unlock: "فتح التقرير الكامل",
    step: "خطوة",
    next: "التالي",
    back: "رجوع",
    submit: "إرسال",
    cancel: "إلغاء",
    location: "الموقع",
    capturePhoto: "التقاط صورة",
    financialPain: "الخسارة المالية",
    problemAge: "عمر المشكلة",
    evidence: "الأدلة",
    monthlyLoss: "الخسارة الشهرية (دولار)",
    durationMonths: "المدة (أشهر)",
    verificationComplete: "اكتمل التحقق",
    galleryBlocked: "عذراً، رفع الصور من المعرض محظور تماماً. يجب استخدام الكاميرا الحية لإثبات الوجود الرقمي (DPL).",
    activeAssets: "الأصول النشطة",
    pendingValidation: "بانتظار التحقق",
    totalValue: "القيمة الإجمالية",
    recentSubmissions: "آخر التقديمات",
    infrastructure: "البنية التحتية",
    supplyChain: "سلسلة الإمداد",
    energy: "الطاقة",
    waste: "النفايات",
    water: "المياه",
    perMonth: "/شهر",
    score: "النتيجة",
    locked: "مقفل",
    unlocked: "مفتوح",
  },
  en: {
    appName: "Forsa IQ",
    dashboard: "Dashboard",
    opportunityRadar: "Opportunity Radar",
    marketplace: "Marketplace",
    submitProblem: "Submit Problem",
    trustScore: "Trust Score",
    premiumAsset: "Premium Asset",
    sector: "Sector",
    city: "City",
    painMagnitude: "Pain Magnitude",
    viewDetails: "View Details",
    unlock: "Unlock Full Report",
    step: "Step",
    next: "Next",
    back: "Back",
    submit: "Submit",
    cancel: "Cancel",
    location: "Location",
    capturePhoto: "Capture Photo",
    financialPain: "Financial Pain",
    problemAge: "Problem Age",
    evidence: "Evidence",
    monthlyLoss: "Monthly Loss (USD)",
    durationMonths: "Duration (Months)",
    verificationComplete: "Verification Complete",
    galleryBlocked: "Gallery uploads are prohibited. Please use the live camera for Digital Proof of Life (DPL).",
    activeAssets: "Active Assets",
    pendingValidation: "Pending Validation",
    totalValue: "Total Value",
    recentSubmissions: "Recent Submissions",
    infrastructure: "Infrastructure",
    supplyChain: "Supply Chain",
    energy: "Energy",
    waste: "Waste",
    water: "Water",
    perMonth: "/mo",
    score: "Score",
    locked: "Locked",
    unlocked: "Unlocked",
  },
};

type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: "rtl" | "ltr";
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ar");

  const t = (key: TranslationKey) => translations[lang][key] || key;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir} className={lang === "ar" ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
