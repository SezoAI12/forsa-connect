import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Camera, MessageSquare, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";

const SECTORS = ["Infrastructure", "Supply Chain", "Energy", "Waste", "Water"] as const;

interface FormData {
  sector: string;
  city: string;
  gpsLat: number | null;
  gpsLng: number | null;
  photoTaken: boolean;
  monthlyLossUSD: string;
  durationMonths: string;
  description: string;
}

export default function RadarPage() {
  const { t, lang } = useI18n();
  const [step, setStep] = useState(0);
  const [galleryError, setGalleryError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    sector: "",
    city: "",
    gpsLat: null,
    gpsLng: null,
    photoTaken: false,
    monthlyLossUSD: "",
    durationMonths: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { label: lang === "ar" ? "القطاع والموقع" : "Sector & Location", icon: MapPin },
    { label: lang === "ar" ? "إثبات الوجود الرقمي" : "Digital Proof of Life", icon: Camera },
    { label: lang === "ar" ? "استجواب الذكاء الاصطناعي" : "AI Interrogation", icon: MessageSquare },
    { label: lang === "ar" ? "المراجعة والإرسال" : "Review & Submit", icon: CheckCircle },
  ];

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            gpsLat: pos.coords.latitude,
            gpsLng: pos.coords.longitude,
          }));
        },
        () => {
          // Fallback mock
          setFormData((prev) => ({ ...prev, gpsLat: 30.5085, gpsLng: 47.7838 }));
        }
      );
    }
  };

  const handleCameraCapture = () => {
    // Simulate DPL verification
    setGalleryError(false);
    setFormData((prev) => ({ ...prev, photoTaken: true }));
  };

  const handleGalleryAttempt = () => {
    setGalleryError(true);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return formData.sector && formData.city && formData.gpsLat !== null;
      case 1: return formData.photoTaken;
      case 2: return formData.monthlyLossUSD && formData.durationMonths;
      case 3: return true;
      default: return false;
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto glow-green">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{t("verificationComplete")}</h2>
          <p className="font-mono text-primary text-lg">Trust Score: 88.333</p>
          <p className="font-mono text-sm text-muted-foreground">ASSET-777-{formData.sector.substring(0, 3).toUpperCase()}</p>
          <Button variant="tactical" onClick={() => { setSubmitted(false); setStep(0); setFormData({ sector: "", city: "", gpsLat: null, gpsLng: null, photoTaken: false, monthlyLossUSD: "", durationMonths: "", description: "" }); }}>
            {lang === "ar" ? "تقديم مشكلة جديدة" : "Submit New Problem"}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("opportunityRadar")}</h1>
        <p className="text-muted-foreground mt-1">{t("submitProblem")}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono transition-all ${
              i === step
                ? "bg-primary/20 text-primary border border-primary/40"
                : i < step
                ? "text-primary/60"
                : "text-muted-foreground"
            }`}>
              <s.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-2 ${i < step ? "bg-primary/40" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card border border-border rounded-lg p-8 space-y-6"
        >
          {step === 0 && (
            <>
              <h2 className="text-xl font-bold text-foreground">
                {lang === "ar" ? "اختر القطاع والموقع" : "Select Sector & Location"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SECTORS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFormData((prev) => ({ ...prev, sector: s }))}
                    className={`p-4 rounded-lg border text-sm font-medium transition-all touch-target ${
                      formData.sector === s
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">{t("city")}</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                  placeholder={lang === "ar" ? "مثال: البصرة" : "e.g. Basra"}
                  className="w-full bg-input border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none touch-target"
                />
              </div>
              <Button variant="outline" onClick={handleGetLocation} className="w-full touch-target gap-2">
                <MapPin className="w-5 h-5" />
                {formData.gpsLat
                  ? <span className="font-mono text-primary">{formData.gpsLat.toFixed(4)}, {formData.gpsLng?.toFixed(4)}</span>
                  : (lang === "ar" ? "تحديد الموقع GPS" : "Lock GPS Location")
                }
              </Button>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-xl font-bold text-foreground">
                {lang === "ar" ? "إثبات الوجود الرقمي (DPL)" : "Digital Proof of Life (DPL)"}
              </h2>
              <p className="text-muted-foreground text-sm">
                {lang === "ar"
                  ? "يجب التقاط صورة حية من الموقع. لا يُسمح برفع الصور من المعرض."
                  : "A live photo from the location is mandatory. Gallery uploads are prohibited."
                }
              </p>

              {galleryError && (
                <div className="flex items-start gap-3 p-4 rounded-lg border border-destructive/50 bg-destructive/10">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  <p className="text-sm text-destructive">{t("galleryBlocked")}</p>
                </div>
              )}

              <div className="space-y-4">
                <Button variant="tactical" onClick={handleCameraCapture} className="w-full gap-3">
                  <Camera className="w-6 h-6" />
                  {formData.photoTaken
                    ? (lang === "ar" ? "✓ تم التقاط الصورة — DPL مُتحقق" : "✓ Photo Captured — DPL Verified")
                    : t("capturePhoto")
                  }
                </Button>
                <Button variant="danger" onClick={handleGalleryAttempt} className="w-full gap-3" size="sm">
                  {lang === "ar" ? "رفع من المعرض (محظور)" : "Upload from Gallery (Prohibited)"}
                </Button>
              </div>

              {formData.photoTaken && (
                <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                  <p className="font-mono text-xs text-primary">
                    DPL.STATUS: VERIFIED | GPS_MATCH: TRUE | DELTA: 12m | TS: {new Date().toISOString()}
                  </p>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-bold text-foreground">
                {lang === "ar" ? "استجواب اقتصادي" : "Economic Interrogation"}
              </h2>
              <p className="text-sm text-muted-foreground font-mono">
                AI.MODE: FORENSIC_ECONOMIC_AUDITOR | COMPLIANCE: STRICT
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t("monthlyLoss")}</label>
                  <input
                    type="number"
                    value={formData.monthlyLossUSD}
                    onChange={(e) => setFormData((prev) => ({ ...prev, monthlyLossUSD: e.target.value }))}
                    placeholder="5000"
                    className="w-full bg-input border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono touch-target"
                  />
                  {formData.monthlyLossUSD && isNaN(Number(formData.monthlyLossUSD)) && (
                    <p className="text-xs text-destructive mt-1 font-mono">
                      INPUT REJECTED. Provide a specific estimated monthly loss. Example: 5000 USD/month.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t("durationMonths")}</label>
                  <input
                    type="number"
                    value={formData.durationMonths}
                    onChange={(e) => setFormData((prev) => ({ ...prev, durationMonths: e.target.value }))}
                    placeholder="24"
                    className="w-full bg-input border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono touch-target"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    {lang === "ar" ? "وصف المشكلة" : "Problem Description"}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full bg-input border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                    placeholder={lang === "ar" ? "اشرح المشكلة الاقتصادية..." : "Describe the economic problem..."}
                  />
                </div>
              </div>

              {/* Evidence status */}
              <div className="p-3 rounded border border-border bg-secondary/30">
                <p className="font-mono text-xs text-muted-foreground">
                  MAPS_API.EVIDENCE: No matching complaints found via Google Maps API for this location.
                </p>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  EVIDENCE_WEIGHT: 0 | FLOW: CONTINUE
                </p>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-bold text-foreground">
                {lang === "ar" ? "مراجعة البيانات" : "Data Review"}
              </h2>
              <div className="space-y-3">
                {[
                  [t("sector"), formData.sector],
                  [t("city"), formData.city],
                  ["GPS", formData.gpsLat ? `${formData.gpsLat.toFixed(4)}, ${formData.gpsLng?.toFixed(4)}` : "—"],
                  ["DPL", formData.photoTaken ? "VERIFIED ✓" : "PENDING"],
                  [t("monthlyLoss"), `$${formData.monthlyLossUSD}`],
                  [t("durationMonths"), `${formData.durationMonths} months`],
                ].map(([label, value]) => (
                  <div key={String(label)} className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-sm font-mono text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="gap-2 touch-target"
        >
          {lang === "ar" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {t("back")}
        </Button>
        {step < 3 ? (
          <Button
            variant="default"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed()}
            className="gap-2 touch-target"
          >
            {t("next")}
            {lang === "ar" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        ) : (
          <Button variant="tactical" onClick={() => setSubmitted(true)} className="gap-2">
            {t("submit")}
            <CheckCircle className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
