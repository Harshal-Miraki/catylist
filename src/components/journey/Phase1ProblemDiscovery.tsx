import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { AlertTriangle, TrendingDown, FileSpreadsheet, Clock } from "lucide-react";
import { phase1Dialogues } from "../../lib/journey-data";
import { useState, useEffect } from "react";

export function Phase1ProblemDiscovery() {
  const [visibleDialogues, setVisibleDialogues] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleDialogues((prev) => {
        if (prev < phase1Dialogues.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-secondary/20 via-background to-destructive/10">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-destructive/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-destructive text-destructive-foreground">Phase 1</Badge>
          <h1 className="text-4xl mb-2">Factory in Chaos</h1>
          <p className="text-muted-foreground text-lg">
            October 2024 - Miraki Pune Plant
          </p>
        </motion.div>

        {/* Problem Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto"
        >
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6 text-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
              </motion.div>
              <div className="text-2xl tabular-nums mb-1">9.5%</div>
              <div className="text-sm text-muted-foreground">Defect Rate</div>
            </CardContent>
          </Card>

          <Card className="border-accent/50 bg-accent/5">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl tabular-nums mb-1">5.8 hrs</div>
              <div className="text-sm text-muted-foreground">Daily Downtime</div>
            </CardContent>
          </Card>

          <Card className="border-border bg-muted/30">
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl tabular-nums mb-1">72.3%</div>
              <div className="text-sm text-muted-foreground">OEE</div>
            </CardContent>
          </Card>

          <Card className="border-border bg-muted/30">
            <CardContent className="p-6 text-center">
              <FileSpreadsheet className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm mb-1">Manual</div>
              <div className="text-sm text-muted-foreground">Excel Tracking</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Meeting Room Scene */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="h-3 w-3 rounded-full bg-destructive animate-pulse" />
              <div className="text-sm text-muted-foreground">Emergency Meeting in Progress</div>
            </div>

            <div className="space-y-4">
              {phase1Dialogues.slice(0, visibleDialogues).map((dialogue, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm">
                        {dialogue.speaker.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{dialogue.speaker}</span>
                      <Badge variant="outline" className="text-xs">{dialogue.role}</Badge>
                      <span className="text-xs text-muted-foreground ml-auto">{dialogue.timestamp}</span>
                    </div>
                    <div className={`p-4 rounded-lg cursor-pointer transition-all ${
                      dialogue.emotion === "frustrated" ? "bg-destructive/10 border border-destructive/30 hover:bg-destructive/20" :
                      dialogue.emotion === "concerned" ? "bg-accent/10 border border-accent/30 hover:bg-accent/20" :
                      "bg-muted hover:bg-muted/70"
                    }`}>
                      <p className="text-sm">{dialogue.message}</p>
                    </div>
                    
                    {/* Hover Metric Tooltip */}
                    {dialogue.metrics && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      >
                        <div className="bg-card border-2 border-destructive rounded-lg p-3 shadow-xl min-w-32">
                          <div className="text-xs text-muted-foreground mb-1">{dialogue.metrics.label}</div>
                          <div className="text-2xl tabular-nums text-destructive mb-1">
                            {dialogue.metrics.value}
                          </div>
                          <Badge 
                            variant="outline" 
                            className="text-xs bg-destructive/10 text-destructive border-destructive/30"
                          >
                            {dialogue.metrics.trend === "down" ? "↓ Declining" : 
                             dialogue.metrics.trend === "up" ? "↑ Increasing" : 
                             "⚠ Critical"}
                          </Badge>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pain Points Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="bg-secondary/5 border-secondary/30">
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                Critical Challenges Identified
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2" />
                  <div>
                    <div>No real-time visibility into production</div>
                    <div className="text-xs text-muted-foreground">All data tracked manually in Excel</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2" />
                  <div>
                    <div>Unable to identify root causes</div>
                    <div className="text-xs text-muted-foreground">Multiple variables untracked</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2" />
                  <div>
                    <div>High operational costs</div>
                    <div className="text-xs text-muted-foreground">₹2.5 lakhs/day in downtime losses</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2" />
                  <div>
                    <div>Quality issues escalating</div>
                    <div className="text-xs text-muted-foreground">Customer complaints increasing</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
