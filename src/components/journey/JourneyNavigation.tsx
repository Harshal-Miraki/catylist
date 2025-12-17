import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Circle, ChevronRight, ChevronLeft } from "lucide-react";
import { journeyPhases } from "../../lib/journey-data";
import { Button } from "../ui/button";

interface JourneyNavigationProps {
  currentPhase: number;
  onPhaseChange: (phase: number) => void;
}

export function JourneyNavigation({ currentPhase, onPhaseChange }: JourneyNavigationProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-6 z-50 bg-card border border-border rounded-xl p-4 shadow-lg w-80"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm">Customer Journey</h3>
                <p className="text-xs text-muted-foreground">Phase {currentPhase} of 6</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {journeyPhases.map((phase) => {
                const isActive = phase.id === currentPhase;
                const isCompleted = phase.id < currentPhase;
                
                return (
                  <button
                    key={phase.id}
                    onClick={() => onPhaseChange(phase.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-muted/30 border border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : isActive ? (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Circle className="h-5 w-5 text-primary fill-primary" />
                          </motion.div>
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">Phase {phase.id}</div>
                        <div className="text-sm">{phase.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{phase.title}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show button when hidden */}
      {!isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 right-6 z-50"
        >
          <Button
            onClick={() => setIsVisible(true)}
            className="bg-primary text-primary-foreground shadow-lg gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Journey
          </Button>
        </motion.div>
      )}
    </>
  );
}
