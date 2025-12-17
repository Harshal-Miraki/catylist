import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  Bell,
  User
} from "lucide-react";
import { phase5OperatorLog } from "../../lib/journey-data";
import { useState } from "react";

function CircularGauge({ value, max, name, unit, status }: any) {
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
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke={getColor()}
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl tabular-nums">{value}</div>
          <div className="text-xs text-muted-foreground">{unit}</div>
        </div>
      </div>
      <div className="text-xs mt-2 text-center">{name}</div>
    </div>
  );
}

export function Phase5Action() {
  const [actionTaken, setActionTaken] = useState(false);
  const [logVisible, setLogVisible] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setLogVisible((prev) => Math.min(prev + 1, phase5OperatorLog.length));
    }, 800);

    return () => clearInterval(interval);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-success/5 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Badge className="mb-4 bg-accent text-accent-foreground">Phase 5</Badge>
        <h1 className="text-4xl mb-2">Guided Operations</h1>
        <p className="text-muted-foreground text-lg">
          Real-Time Alerts & AI-Powered Operator Guidance
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Operator Console */}
        <div className="lg:col-span-2 space-y-6">
          {/* Machine Parameters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3>Real-Time Machine Parameters</h3>
                  <Badge className="bg-success text-success-foreground gap-2">
                    <motion.div
                      className="h-2 w-2 rounded-full bg-white"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Live
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <CircularGauge value={1220} max={1500} name="Line Speed" unit="RPM" status="warning" />
                  <CircularGauge value={63} max={100} name="Humidity" unit="%" status="warning" />
                  <CircularGauge value={82} max={100} name="Temperature" unit="°C" status="normal" />
                  <CircularGauge value={245} max={400} name="Power Draw" unit="kW" status="normal" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Guidance Alert */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="border-2 border-accent bg-accent/5">
              <CardContent className="p-6">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-lg bg-accent/20">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertCircle className="h-6 w-6 text-accent" />
                    </motion.div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <h3>AI-Powered Operator Guidance</h3>
                      <Badge className="bg-accent text-accent-foreground">High Priority</Badge>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                      <p className="text-sm mb-3">
                        ⚠️ <strong>Recommendation:</strong> Reduce machine speed to 95% for current batch (SKU ABC-123)
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-xs text-muted-foreground">Reason</div>
                          <div>High humidity detected - risk of defects at current speed</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Expected Impact</div>
                          <div className="flex items-center gap-1 text-success">
                            <TrendingUp className="h-3 w-3" />
                            Defect rate reduction: 40-50%
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">AI Confidence:</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-success"
                            initial={{ width: 0 }}
                            animate={{ width: "92%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                        <span className="text-xs tabular-nums">92%</span>
                      </div>
                    </div>

                    {!actionTaken ? (
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => setActionTaken(true)}
                          className="flex-1 bg-success text-success-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Action Taken ✓
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Skip Guidance
                        </Button>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-success/10 border border-success/30 text-success text-sm flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Action confirmed by Karan Singh at {new Date().toLocaleTimeString()}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rule Execution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3>Active Rule: High Defect Risk Detection</h3>
                  <Badge className="bg-primary text-primary-foreground">Enabled</Badge>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/30 mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">IF</span>
                    <span className="px-3 py-1 rounded bg-card border border-border">
                      Speed &gt; 1200 RPM
                    </span>
                    <span className="text-muted-foreground">AND</span>
                    <span className="px-3 py-1 rounded bg-card border border-border">
                      Humidity &gt; 60%
                    </span>
                    <span className="text-muted-foreground">THEN</span>
                    <span className="px-3 py-1 rounded bg-accent/20 border border-accent">
                      Alert Operator
                    </span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground mb-2">Execution Log</div>
                <div className="space-y-2">
                  {phase5OperatorLog.slice(0, logVisible).map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-3 rounded-lg border text-sm ${
                        log.severity === "success" ? "bg-success/5 border-success/30" :
                        log.severity === "warning" ? "bg-accent/5 border-accent/30" :
                        "bg-card border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <code className="text-xs text-muted-foreground font-mono">{log.timestamp}</code>
                        <div className="flex-1">{log.event}</div>
                        {log.severity === "success" && <CheckCircle2 className="h-4 w-4 text-success" />}
                        {log.severity === "warning" && <AlertCircle className="h-4 w-4 text-accent" />}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 ml-16">{log.details}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Operator Profile & Context */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="sticky top-8 border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm">Karan Singh</div>
                    <div className="text-xs text-muted-foreground">Line Operator - Line 1</div>
                    <Badge variant="outline" className="mt-1 text-xs">Morning Shift</Badge>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Current Batch</div>
                    <div className="text-sm">SKU ABC-123</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Shift Start</div>
                    <div className="text-sm">06:00 AM</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Units Produced</div>
                    <div className="text-sm tabular-nums">1,247</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="h-4 w-4 text-success" />
                    <div className="text-xs">Today's Alerts</div>
                  </div>
                  <div className="text-2xl tabular-nums mb-1">3</div>
                  <div className="text-xs text-muted-foreground">All actions completed</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
