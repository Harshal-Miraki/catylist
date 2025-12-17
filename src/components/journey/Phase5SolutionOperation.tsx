import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  Sparkles, 
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  BarChart3,
  Settings,
  ArrowRight,
  Wrench
} from "lucide-react";
import { samplePrediction } from "../../lib/journey-data";

export function Phase5SolutionOperation() {
  const [actionTaken, setActionTaken] = useState(false);
  const [showImpact, setShowImpact] = useState(false);

  const handleAction = (action: string) => {
    setActionTaken(true);
    setTimeout(() => {
      setShowImpact(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-success/5 to-accent/5 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge className="mb-4 bg-gradient-to-r from-accent to-success text-white border-0 px-4 py-2">
            Walk Stage - Phase 5
          </Badge>
          <h1 className="text-5xl mb-4">Recommendations & Actions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-driven predictions flowing from SOLUTIONS to ANALYZE insights and OPERATE actions
          </p>
        </motion.div>

        {/* Integration Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-success/5">
            <CardContent className="p-8">
              <h3 className="text-center mb-8">Solution Data Flow</h3>
              <div className="flex items-center justify-center gap-8">
                {/* SOLUTIONS */}
                <div className="flex-1">
                  <div className="p-6 rounded-xl border-2 border-accent bg-gradient-to-br from-accent/10 to-primary/10 text-center">
                    <div className="h-14 w-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="h-7 w-7 text-accent" />
                    </div>
                    <div className="text-sm mb-1">SOLUTIONS Layer</div>
                    <div className="text-xs text-muted-foreground">AI Prediction Engine</div>
                    <motion.div
                      className="mt-3 flex justify-center gap-1"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-1.5 w-1.5 rounded-full bg-accent" />
                      ))}
                    </motion.div>
                  </div>
                </div>

                <ArrowRight className="h-8 w-8 text-accent" />

                {/* ANALYZE */}
                <div className="flex-1">
                  <div className="p-6 rounded-xl border-2 border-primary bg-primary/10 text-center">
                    <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-sm mb-1">ANALYZE Layer</div>
                    <div className="text-xs text-muted-foreground">Insights Dashboard</div>
                    <div className="mt-3 text-xs text-success">
                      ✓ Recommendations visible
                    </div>
                  </div>
                </div>

                <ArrowRight className="h-8 w-8 text-primary" />

                {/* OPERATE */}
                <div className="flex-1">
                  <div className="p-6 rounded-xl border-2 border-success bg-success/10 text-center">
                    <div className="h-14 w-14 rounded-xl bg-success/20 flex items-center justify-center mx-auto mb-3">
                      <Settings className="h-7 w-7 text-success" />
                    </div>
                    <div className="text-sm mb-1">OPERATE Layer</div>
                    <div className="text-xs text-muted-foreground">Action Console</div>
                    <div className="mt-3 text-xs text-success">
                      ✓ Priority actions ready
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ANALYZE View with Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3>ANALYZE Dashboard</h3>
                  <Badge className="ml-auto bg-primary text-primary-foreground">
                    Live
                  </Badge>
                </div>

                <div className="space-y-3">
                  {/* AI Recommendation Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="p-4 rounded-lg border-2 border-destructive/50 bg-destructive/5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">
                            <strong>AI Prediction</strong>
                          </span>
                          <Badge className="bg-gradient-to-r from-accent to-primary text-white border-0 text-xs">
                            From: Predictive Maintenance
                          </Badge>
                        </div>
                        <div className="text-sm mb-3">
                          <strong>{samplePrediction.asset}:</strong> {samplePrediction.prediction} predicted
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                          <div className="p-2 rounded bg-card">
                            <div className="text-muted-foreground">Probability</div>
                            <div className="text-destructive tabular-nums text-lg">
                              {samplePrediction.probability}%
                            </div>
                          </div>
                          <div className="p-2 rounded bg-card">
                            <div className="text-muted-foreground">Time Window</div>
                            <div className="tabular-nums text-lg">
                              {samplePrediction.horizon_hours}h
                            </div>
                          </div>
                          <div className="p-2 rounded bg-card">
                            <div className="text-muted-foreground">Cost Avoidance</div>
                            <div className="text-success tabular-nums text-lg">
                              ₹{(samplePrediction.estimated_avoidance / 100000).toFixed(1)}L
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ℹ️ This recommendation is auto-prioritized in OPERATE
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Standard Analytics */}
                  <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                    <div className="mb-2">Standard Analytics (Always-On):</div>
                    <div className="space-y-1 text-xs">
                      <div>✓ OEE: 64% (↑ +2.3% vs last week)</div>
                      <div>✓ Downtime Analysis: Bearing failures trending up</div>
                      <div>✓ Quality: 2.8% defect rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* OPERATE View with Action */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="border-2 border-success/50 bg-gradient-to-br from-success/5 to-accent/5 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-success" />
                  <h3>OPERATE Console</h3>
                  <Badge className="ml-auto bg-success text-success-foreground gap-1">
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    Live
                  </Badge>
                </div>

                <div className="space-y-3">
                  {/* Priority Action from Solution */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="p-4 rounded-lg border-2 border-destructive/50 bg-destructive/5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                        <Wrench className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-destructive text-destructive-foreground">
                            Priority Action
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Solutions
                          </Badge>
                        </div>
                        <div className="text-sm mb-3">
                          <strong>Recommended Action:</strong><br />
                          {samplePrediction.recommendation}
                        </div>

                        {!actionTaken ? (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAction("Create Work Order")}
                              size="sm"
                              className="bg-destructive text-destructive-foreground"
                            >
                              Create Work Order
                            </Button>
                            <Button
                              onClick={() => handleAction("Alert Maintenance")}
                              size="sm"
                              variant="outline"
                            >
                              Alert Maintenance
                            </Button>
                            <Button size="sm" variant="ghost">
                              Snooze
                            </Button>
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-3 rounded-lg bg-success/10 border border-success/30"
                          >
                            <div className="flex items-center gap-2 text-sm text-success">
                              <CheckCircle2 className="h-4 w-4" />
                              Work Order #WO-2847 created and assigned to maintenance team
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Standard Operator Guidance */}
                  <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                    <div className="mb-2">Standard Operator Guidance (Always-On):</div>
                    <div className="space-y-1 text-xs">
                      <div>✓ Machine parameters within normal range</div>
                      <div>✓ No active alerts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Impact Tracking */}
        {showImpact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-2 border-success bg-success/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="mb-1">Preventive Action Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time tracking of solution-driven outcomes
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-card text-center">
                    <div className="text-xs text-muted-foreground mb-1">Failures Prevented</div>
                    <div className="text-3xl tabular-nums text-success">1</div>
                    <div className="text-xs text-muted-foreground mt-1">This month</div>
                  </div>

                  <div className="p-4 rounded-lg bg-card text-center">
                    <div className="text-xs text-muted-foreground mb-1">Cost Avoidance</div>
                    <div className="text-3xl tabular-nums text-success">
                      ₹{(samplePrediction.estimated_avoidance / 100000).toFixed(1)}L
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Estimated</div>
                  </div>

                  <div className="p-4 rounded-lg bg-card text-center">
                    <div className="text-xs text-muted-foreground mb-1">Uptime Gain</div>
                    <div className="text-3xl tabular-nums text-success">+18%</div>
                    <div className="text-xs text-muted-foreground mt-1">vs baseline</div>
                  </div>

                  <div className="p-4 rounded-lg bg-card text-center">
                    <div className="text-xs text-muted-foreground mb-1">Prediction Accuracy</div>
                    <div className="text-3xl tabular-nums text-primary">87%</div>
                    <div className="text-xs text-muted-foreground mt-1">Improving</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Reasoning Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                How Solutions Integrate with the Platform
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="mb-2"><strong>1. Solutions Generate</strong></div>
                  <p className="text-muted-foreground">
                    AI models analyze data from CONNECT & STRUCTURE, produce predictions and recommendations
                  </p>
                </div>
                <div>
                  <div className="mb-2"><strong>2. ANALYZE Displays</strong></div>
                  <p className="text-muted-foreground">
                    Recommendations appear as high-priority cards in dashboards alongside standard analytics
                  </p>
                </div>
                <div>
                  <div className="mb-2"><strong>3. OPERATE Executes</strong></div>
                  <p className="text-muted-foreground">
                    Actions auto-route to operator console with context, recommended steps, and ROI tracking
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
          className="p-4 rounded-lg bg-success/10 border border-success/30 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <strong>Business Value:</strong> Solutions layer enables outcome-based pricing and creates revenue expansion. 
            Customers see tangible ROI (cost avoidance, uptime gains) and remain sticky through proven value delivery.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
