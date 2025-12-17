import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Gauge as GaugeIcon,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  CircuitBoard,
} from "lucide-react";
import { machineGauges, operatorGuidance } from "../../lib/data";
import { samplePrediction } from "../../lib/journey-data";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";

function CircularGauge({ value, max, name, unit, status, threshold }: any) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (status === "critical") return "#d4183d";
    if (status === "warning") return "#FFC107";
    return "#22C55E";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke={getColor()}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl tabular-nums">{value}</div>
          <div className="text-xs text-muted-foreground">{unit}</div>
        </div>
      </div>
      <div className="text-sm mt-2 text-center">{name}</div>
      <Badge 
        className="mt-1" 
        variant={status === "normal" ? "outline" : status === "warning" ? "secondary" : "destructive"}
      >
        {status === "normal" ? "Normal" : status === "warning" ? "Caution" : "Critical"}
      </Badge>
    </div>
  );
}

interface OperatePageProps {
  enabledSolutions: string[];
}

export function OperatePage({ enabledSolutions }: OperatePageProps) {
  const [actionTaken, setActionTaken] = useState(false);
  const [solutionActionTaken, setSolutionActionTaken] = useState(false);
  const hasPredictiveMaintenance = enabledSolutions.includes("predictive-maintenance");

  const handleActionTaken = () => {
    setActionTaken(true);
    toast.success("Operator action recorded successfully");
  };

  const handleSkipAction = () => {
    toast.info("Guidance skipped - logged for review");
  };

  const handleSolutionAction = (action: string) => {
    setSolutionActionTaken(true);
    toast.success(`${action} created successfully`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>OPERATE Layer</h1>
          <p className="text-muted-foreground mt-1">
            Real-Time Monitoring & Operator Guidance System
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-success text-success-foreground gap-1">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
            Live Monitoring
          </Badge>
        </div>
      </div>

      {/* Priority Actions from Solutions */}
      {hasPredictiveMaintenance && !solutionActionTaken && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2 border-destructive bg-destructive/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-destructive">Priority Action Required</CardTitle>
                  <CardDescription>
                    From: Predictive Maintenance Solution
                  </CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-accent to-primary text-white border-0">
                  Solutions
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border border-destructive/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="mb-2">{samplePrediction.asset}: {samplePrediction.prediction}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        <strong>Failure Probability:</strong> {samplePrediction.probability}% within {samplePrediction.horizon_hours} hours
                      </p>
                      <div className="mb-3 p-3 rounded-lg bg-muted/50">
                        <div className="text-sm mb-2"><strong>Recommended Action:</strong></div>
                        <p className="text-sm">{samplePrediction.recommendation}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                        {samplePrediction.dataPoints.map((dp, idx) => (
                          <div key={idx} className="p-2 rounded bg-muted">
                            <div className="text-muted-foreground">{dp.metric}</div>
                            <div className="text-destructive tabular-nums">
                              {dp.current} {dp.unit}
                            </div>
                            <div className="text-muted-foreground">
                              Threshold: {dp.threshold}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleSolutionAction("Work Order")}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Create Work Order
                        </Button>
                        <Button
                          onClick={() => handleSolutionAction("Alert to Maintenance")}
                          variant="outline"
                        >
                          Send to Maintenance Team
                        </Button>
                        <Button variant="ghost">Snooze</Button>
                        <div className="ml-auto text-sm text-muted-foreground">
                          Est. Cost Avoidance: <strong className="text-success">
                            ₹{(samplePrediction.estimated_avoidance / 100000).toFixed(1)}L
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Real-Time Machine Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Machine Parameters</CardTitle>
          <CardDescription>
            Live monitoring of critical machine health indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {machineGauges.map((gauge) => (
              <CircularGauge key={gauge.id} {...gauge} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operator Guidance Console */}
      <Card className="border-accent bg-accent/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <CardTitle>AI-Powered Operator Guidance</CardTitle>
          </div>
          <CardDescription>
            Smart recommendations based on real-time analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border-2 border-accent bg-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-accent/20">
                <AlertCircle className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3>Current Batch: {operatorGuidance.currentBatch}</h3>
                  <Badge className="bg-primary text-primary-foreground">Active</Badge>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-sm">
                    ⚠️ {operatorGuidance.recommendation}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Reason</div>
                    <div>{operatorGuidance.reason}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Expected Impact</div>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      {operatorGuidance.expectedImprovement}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">AI Confidence:</span>
                  <Progress value={operatorGuidance.confidence} className="flex-1 h-2" />
                  <span className="text-sm tabular-nums">{operatorGuidance.confidence}%</span>
                </div>
              </div>
            </div>
          </div>

          {!actionTaken ? (
            <div className="flex gap-3">
              <Button onClick={handleActionTaken} className="flex-1 bg-success text-success-foreground">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Action Taken ✓
              </Button>
              <Button onClick={handleSkipAction} variant="outline" className="flex-1">
                Skip Guidance
              </Button>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-success text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Action confirmed and logged at {new Date().toLocaleTimeString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rule Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Production Rule Engine</CardTitle>
          <CardDescription>
            No-code rule configuration for automated alerts and actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-center gap-2 mb-4">
              <CircuitBoard className="h-5 w-5 text-primary" />
              <h4>Active Rule Example</h4>
              <Badge className="bg-success text-success-foreground ml-auto">Enabled</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">IF Condition</Label>
                  <div className="mt-1 p-2 rounded bg-background border border-border text-sm">
                    Machine Speed &gt; 1200 RPM
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">AND Condition</Label>
                  <div className="mt-1 p-2 rounded bg-background border border-border text-sm">
                    Humidity &gt; 60%
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">THEN Action</Label>
                  <div className="mt-1 p-2 rounded bg-accent/20 border border-accent text-sm">
                    Alert: High Defect Risk
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-muted-foreground">
                  Triggered 12 times today
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit Rule</Button>
                  <Button size="sm" variant="outline">View Logs</Button>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-primary" variant="outline">
            + Create New Rule
          </Button>

          {/* Additional Rules */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Switch defaultChecked />
                <div>
                  <div className="text-sm">Temperature Threshold Alert</div>
                  <div className="text-xs text-muted-foreground">
                    Trigger when motor temp exceeds 90°C
                  </div>
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Switch defaultChecked />
                <div>
                  <div className="text-sm">Production Rate Optimization</div>
                  <div className="text-xs text-muted-foreground">
                    Auto-adjust speed based on quality metrics
                  </div>
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border opacity-50">
              <div className="flex items-center gap-3">
                <Switch />
                <div>
                  <div className="text-sm">Predictive Maintenance Alert</div>
                  <div className="text-xs text-muted-foreground">
                    Notify 48hrs before scheduled maintenance
                  </div>
                </div>
              </div>
              <Badge variant="secondary">Disabled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
