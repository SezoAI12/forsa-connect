import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Opportunity } from "@/data/opportunities";

interface PurchaseModalProps {
  opportunity: Opportunity;
  onClose: () => void;
  onPurchase: () => Promise<void>;
  purchasing: boolean;
}

export default function PurchaseModal({ opportunity: opp, onClose, onPurchase, purchasing }: PurchaseModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md p-8 rounded-xl border border-border bg-card z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">Unlock Execution Blueprint</h2>
            <p className="text-sm text-muted-foreground">{opp.title}</p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-secondary/20 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Execution Blueprint</span>
              <span className="text-foreground font-mono font-bold">$29.00</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
              <span className="text-sm font-bold text-foreground">Total</span>
              <span className="text-primary font-mono font-bold text-lg">$29.00</span>
            </div>
          </div>

          {/* Payment buttons (mock) */}
          <div className="space-y-3 mb-6">
            <Button
              variant="tactical"
              className="w-full"
              onClick={onPurchase}
              disabled={purchasing}
            >
              {purchasing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay with Card — $29
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={onPurchase}
              disabled={purchasing}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
              </svg>
              Pay with PayPal
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure payment · Instant access · 30-day refund policy</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
