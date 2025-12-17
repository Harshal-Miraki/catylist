import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  Sparkles, 
  Wrench,
  Target,
  Package,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Zap,
  ChevronRight
} from "lucide-react";
import { solutionApps } from "../../lib/journey-data";
import { Dialog, DialogContent } from "../ui/dialog";

const iconMap: Record<string, any> = {
  Wrench,
  Target,
  Package,
  TrendingUp,
};

export function Phase4ActivateSolutions() {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [isEnabling, setIsEnabling] = useState(false);
  const [enabledSolution, setEnabledSolution] = useState<string | null>(null);

  const handleEnableSolution = (id: string) => {
    setSelectedSolution(id);
  };

  const handleConfirmEnable = () => {
    setIsEnabling(true);
    setTimeout(() => {
      setEnabledSolution(selectedSolution);
      setIsEnabling(false);
      setSelectedSolution(null);
    }, 2500);
  };

  const solution = solutionApps.find(s => s.id === selectedSolution);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge className="mb-4 bg-gradient-to-r from-accent to-primary text-white border-0 px-4 py-2">
            Walk Stage - Phase 4
          </Badge>
          <h1 className="text-5xl mb-4">Enable Predictive Maintenance</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One-click activation of AI-powered Solutions — from analytics to outcomes
          </p>
        </motion.div>

        {/* Readiness Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="border-2 border-success bg-gradient-to-r from-success/10 to-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">You're Ready for Solutions!</h3>
                  <p className="text-sm text-muted-foreground">
                    After 3-6 months in ANALYZE, you have sufficient data quality and team buy-in. 
                    Upgrade to outcome-focused AI apps with one-click activation.
                  </p>
                </div>
                <Badge className="bg-success text-success-foreground">
                  Data Quality: 85%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Solutions Suite Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="mb-6">
            <h2 className="mb-2">Solutions Suite - AI Expert Apps</h2>
            <p className="text-muted-foreground">
              Pre-built apps delivering specific business outcomes with predictable ROI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutionApps.map((app, idx) => {
              const Icon = iconMap[app.icon];
              const isEnabled = enabledSolution === app.id;
              const isReady = app.dataReadiness >= 60;
              
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                >
                  <Card className={`h-full border-2 transition-all ${
                    isEnabled 
                      ? "border-success bg-success/5 shadow-xl" 
                      : isReady
                      ? "border-border hover:border-primary/50 hover:shadow-lg cursor-pointer"
                      : "border-border opacity-60"
                  }`}
                    onClick={() => isReady && !isEnabled && handleEnableSolution(app.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`h-16 w-16 rounded-xl flex items-center justify-center ${
                          isEnabled ? "bg-success/20" : "bg-muted"
                        }`}>
                          <Icon className={`h-8 w-8 ${isEnabled ? "text-success" : "text-muted-foreground"}`} />
                        </div>
                        {isEnabled && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Badge className="bg-success text-success-foreground gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Active
                            </Badge>
                          </motion.div>
                        )}
                      </div>

                      <h3 className="mb-2">{app.name}</h3>
                      <Badge variant="outline" className="mb-3">
                        {app.category}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-4">
                        {app.description}
                      </p>

                      {/* ROI Highlight */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-success/10">
                          <div className="text-xs text-muted-foreground mb-1">Expected Impact</div>
                          <div className="text-sm text-success">{app.kpiUplift}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-accent/10">
                          <div className="text-xs text-muted-foreground mb-1">ROI Example</div>
                          <div className="text-sm">{app.roiExample}</div>
                        </div>
                      </div>

                      {/* Data Readiness */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2 text-xs">
                          <span className="text-muted-foreground">Data Readiness</span>
                          <span className={`tabular-nums ${isReady ? "text-success" : "text-destructive"}`}>
                            {app.dataReadiness}%
                          </span>
                        </div>
                        <Progress 
                          value={app.dataReadiness} 
                          className={`h-1.5 ${isReady ? "bg-success/20" : "bg-destructive/20"}`}
                        />
                      </div>

                      {/* CTA */}
                      {isEnabled ? (
                        <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-center">
                          <div className="text-sm text-success">✓ Solution is generating predictions</div>
                        </div>
                      ) : isReady ? (
                        <Button 
                          className="w-full bg-primary text-primary-foreground gap-2"
                          onClick={() => handleEnableSolution(app.id)}
                        >
                          <Zap className="h-4 w-4" />
                          Enable Solution
                        </Button>
                      ) : (
                        <Button disabled className="w-full">
                          Insufficient Data ({app.dataReadiness}%)
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Why Solutions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="mb-4">Why Upgrade to Solutions?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <strong>Outcome-Focused</strong>
                  </div>
                  <p className="text-muted-foreground">
                    Move beyond dashboards to AI apps that predict, prevent, and optimize specific outcomes
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <strong>Predictable ROI</strong>
                  </div>
                  <p className="text-muted-foreground">
                    Each solution comes with ROI calculator and expected business impact metrics
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-accent" />
                    <strong>One-Click Activation</strong>
                  </div>
                  <p className="text-muted-foreground">
                    No additional integration — solutions use existing CONNECT and STRUCTURE layers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stakeholder Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="p-4 rounded-lg bg-accent/10 border border-accent/30 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <strong>Commercial Upsell:</strong> Solutions Suite is the Walk stage product. Customer pays for ANALYZE (Crawl), 
            then subscribes to individual solutions (Predictive Maintenance, Quality, etc.). Revenue expansion without re-implementation.
          </p>
        </motion.div>
      </div>

      {/* Enablement Dialog */}
      <Dialog open={!!selectedSolution && !isEnabling} onOpenChange={() => setSelectedSolution(null)}>
        <DialogContent className="max-w-2xl">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3>Enable {solution?.name}?</h3>
                <p className="text-sm text-muted-foreground">Quick configuration — 3 simple steps</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>What will happen:</strong>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>✓ AI model will train on your historical data (~2 hours)</li>
                      <li>✓ Predictions will appear in ANALYZE dashboards</li>
                      <li>✓ Priority actions will route to OPERATE console</li>
                      <li>✓ ROI tracking dashboard auto-created</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-success/30 bg-success/5">
                <div className="text-sm mb-2"><strong>Expected Impact:</strong></div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">KPI Uplift</div>
                    <div className="text-success text-lg">{solution?.kpiUplift}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Annual ROI</div>
                    <div className="text-success text-lg">{solution?.roiExample}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedSolution(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmEnable}
                className="bg-success text-success-foreground gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Enable Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enabling Progress */}
      <Dialog open={isEnabling} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8 space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center"
            >
              <Sparkles className="h-10 w-10 text-accent" />
            </motion.div>
            <div>
              <h3 className="mb-2">Activating {solution?.name}...</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Training AI model on your data
              </p>
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
