import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { consultant } from "../lib/journey-data";

interface FloatingAIAssistantProps {
  phase: number;
}

const phaseMessages: Record<number, string> = {
  1: "I can see you're experiencing production challenges. Let's identify the root causes together.",
  2: "Our 4-week pilot program can get you started quickly. No complex implementation needed!",
  3: "Watch how our edge gateway automatically detects your machines. Plug-and-play simplicity.",
  4: "I'll help you map your machine tags using our pre-built templates. This usually takes just 32 minutes!",
  5: "Notice how operators receive real-time guidance? This reduces defects and improves safety.",
  6: "You can now ask questions in plain English and get instant insights. Try asking about downtime!",
};

export function FloatingAIAssistant({ phase }: FloatingAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setHasInteracted(true);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                onClick={handleOpen}
                className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-2xl relative"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
                
                {!hasInteracted && (
                  <motion.div
                    className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </Button>
              
              {!hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 }}
                  className="absolute right-16 top-3 bg-card border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
                >
                  <div className="text-xs">Need help? Meet {consultant.name}</div>
                  <div className="absolute right-0 top-4 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-border translate-x-full" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40 w-96"
          >
            <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5 shadow-2xl">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm">{consultant.name}</div>
                        <div className="text-xs text-muted-foreground">{consultant.role}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Message */}
                <div className="p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-start gap-2">
                      <MessageCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm">{phaseMessages[phase]}</p>
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground mb-2">Quick Actions:</div>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      View Platform Features
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      Schedule a Demo
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      Learn More About Phase {phase}
                    </Button>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-border bg-muted/30">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    <span>Available 24/7 to assist you</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
