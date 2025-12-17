import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  Wrench, 
  Target, 
  Package, 
  TrendingUp,
  Sparkles,
  Check,
  X,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { solutionApps } from "../../lib/journey-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const iconMap: Record<string, any> = {
  Wrench,
  Target,
  Package,
  TrendingUp,
};

interface SolutionsPageProps {
  enabledSolutions: string[];
  onToggleSolution: (id: string) => void;
}

export function SolutionsPage({ enabledSolutions, onToggleSolution }: SolutionsPageProps) {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [configStep, setConfigStep] = useState(1);
  const [isEnabling, setIsEnabling] = useState(false);

  const handleEnableSolution = (id: string) => {
    setSelectedSolution(id);
    setConfigStep(1);
  };

  const handleConfirmEnable = () => {
    setIsEnabling(true);
    setTimeout(() => {
      if (selectedSolution) {
        onToggleSolution(selectedSolution);
      }
      setIsEnabling(false);
      setSelectedSolution(null);
      setConfigStep(1);
    }, 2000);
  };

  const solution = solutionApps.find(s => s.id === selectedSolution);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-4xl">Solutions Suite</h1>
                <p className="text-muted-foreground">AI Expert Apps for Outcome-Driven Manufacturing</p>
              </div>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-accent to-primary text-white border-0 px-4 py-2">
            Walk Stage
          </Badge>
        </div>

        <Card className="bg-primary/5 border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm mb-2">
                  <strong>Ready to level up?</strong> After 3-6 months in ANALYZE (Crawl stage), 
                  activate Solutions for AI-powered predictions and recommendations.
                </p>
                <p className="text-xs text-muted-foreground">
                  Each solution requires specific data tags. Enable solutions when data readiness is above 60%.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {solutionApps.map((app, idx) => {
          const Icon = iconMap[app.icon];
          const isEnabled = enabledSolutions.includes(app.id);
          
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className={`h-full border-2 transition-all ${
                isEnabled 
                  ? "border-success bg-success/5" 
                  : "border-border hover:border-primary/50"
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${
                      isEnabled ? "bg-success/20" : "bg-muted"
                    }`}>
                      <Icon className={`h-7 w-7 ${isEnabled ? "text-success" : "text-muted-foreground"}`} />
                    </div>
                    {isEnabled && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Badge className="bg-success text-success-foreground gap-1">
                          <Check className="h-3 w-3" />
                          Active
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-2">{app.name}</h3>
                    <Badge variant="outline" className="mb-3">
                      {app.category}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-4">
                      {app.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* KPI Impact */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-xs text-muted-foreground mb-1">Expected Impact</div>
                      <div className="text-sm text-success">{app.kpiUplift}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-xs text-muted-foreground mb-1">ROI Example</div>
                      <div className="text-sm">{app.roiExample}</div>
                    </div>
                  </div>

                  {/* Data Readiness */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-xs">Data Readiness</Label>
                      <span className="text-xs tabular-nums">{app.dataReadiness}%</span>
                    </div>
                    <Progress 
                      value={app.dataReadiness} 
                      className={`h-2 ${
                        app.dataReadiness >= 60 ? "bg-success/20" : "bg-destructive/20"
                      }`}
                    />
                    <div className="mt-2 text-xs text-muted-foreground">
                      Required: {app.requiredTags.join(", ")}
                      {app.dataReadiness < 100 && (
                        <span className="text-destructive ml-1">
                          (Missing: {app.requiredTags.slice(Math.floor(app.requiredTags.length * app.dataReadiness / 100)).join(", ")})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {isEnabled ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => onToggleSolution(app.id)}
                        >
                          Disable
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Configure
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          className="flex-1 bg-primary text-primary-foreground"
                          onClick={() => handleEnableSolution(app.id)}
                          disabled={app.dataReadiness < 60}
                        >
                          {app.dataReadiness >= 60 ? "Enable" : "Insufficient Data"}
                        </Button>
                        <Button variant="outline">
                          Preview
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Enablement Wizard Dialog */}
      <Dialog open={!!selectedSolution && !isEnabling} onOpenChange={() => setSelectedSolution(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Enable {solution?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    step <= configStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {step < configStep ? <Check className="h-4 w-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`h-0.5 w-16 mx-2 ${
                      step < configStep ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {configStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <Label>Select Assets to Monitor</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Compressors (5 units)</SelectItem>
                        <SelectItem value="critical">Critical Assets Only (2 units)</SelectItem>
                        <SelectItem value="custom">Custom Selection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Prediction Time Window</Label>
                    <Select defaultValue="72">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24">24 hours ahead</SelectItem>
                        <SelectItem value="48">48 hours ahead</SelectItem>
                        <SelectItem value="72">72 hours ahead (Recommended)</SelectItem>
                        <SelectItem value="168">1 week ahead</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {configStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <Label>Alert Thresholds</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Failure Probability</Label>
                        <Select defaultValue="70">
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50">50% (More alerts)</SelectItem>
                            <SelectItem value="70">70% (Balanced)</SelectItem>
                            <SelectItem value="90">90% (Critical only)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Alert Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">Weekly Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {configStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm mb-2">
                        <strong>Initial Model Training</strong>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        The AI model will train on your historical data (est. 2 hours). 
                        You'll receive a notification when predictions are ready.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id="consultant" defaultChecked />
                    <Label htmlFor="consultant" className="text-sm cursor-pointer">
                      Assign Aarav Sharma (AI Consultant) for setup assistance
                    </Label>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-sm mb-2">Summary</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>✓ Monitoring: All Compressors (5 units)</li>
                      <li>✓ Prediction window: 72 hours ahead</li>
                      <li>✓ Alert threshold: 70% failure probability</li>
                      <li>✓ Frequency: Daily digest</li>
                      <li>✓ Consultant assigned: Yes</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setConfigStep(Math.max(1, configStep - 1))}
                disabled={configStep === 1}
              >
                Back
              </Button>
              {configStep < 3 ? (
                <Button
                  onClick={() => setConfigStep(configStep + 1)}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleConfirmEnable}
                  className="bg-success text-success-foreground gap-2"
                >
                  <Check className="h-4 w-4" />
                  Enable Solution
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enabling Progress Dialog */}
      <Dialog open={isEnabling} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8 space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center"
            >
              <Sparkles className="h-8 w-8 text-accent" />
            </motion.div>
            <div>
              <h3 className="mb-2">Activating {solution?.name}...</h3>
              <p className="text-sm text-muted-foreground">
                Setting up AI model and configuring alerts
              </p>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
