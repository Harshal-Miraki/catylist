import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  Zap, 
  CheckCircle2, 
  Clock,
  Sparkles,
  Network,
  Database,
  BarChart3
} from "lucide-react";
import { phase2Checklist, consultant } from "../../lib/journey-data";

export function Phase2OnboardPilot() {
  const [pilotStarted, setPilotStarted] = useState(false);
  const [checklist, setChecklist] = useState(phase2Checklist);
  const [currentWeek, setCurrentWeek] = useState(1);

  const handleStartPilot = () => {
    setPilotStarted(true);
    // Animate checklist items completing
    checklist.forEach((item, idx) => {
      setTimeout(() => {
        setChecklist((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, completed: true } : c))
        );
      }, (idx + 1) * 1200);
    });
  };

  useEffect(() => {
    if (pilotStarted && checklist.every(item => item.completed)) {
      // Simulate week progression
      const interval = setInterval(() => {
        setCurrentWeek(prev => Math.min(4, prev + 1));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [pilotStarted, checklist]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-success/5 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge className="mb-4 bg-primary text-primary-foreground px-4 py-2">
            Crawl Stage - Phase 2
          </Badge>
          <h1 className="text-5xl mb-4">Quick Start Solution</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The Miraki 4-Week OEE Pilot — Fixed scope, guaranteed outcomes, zero complexity
          </p>
        </motion.div>

        {/* Main Pitch Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-success/10">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Sales Pitch */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-20 w-20 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Zap className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl mb-1">4-Week OEE Pilot</h2>
                      <p className="text-muted-foreground">From Data Chaos to Clarity</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <div className="text-sm mb-1"><strong>Fixed Scope</strong></div>
                        <p className="text-sm text-muted-foreground">
                          2 machines connected, live OEE dashboard, downtime analysis
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <div className="text-sm mb-1"><strong>Rapid Deployment</strong></div>
                        <p className="text-sm text-muted-foreground">
                          Plug-and-play edge gateway, pre-configured templates
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <div className="text-sm mb-1"><strong>AI Consultant Assigned</strong></div>
                        <p className="text-sm text-muted-foreground">
                          {consultant.name} will guide data scoping & onboarding
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <div className="text-sm mb-1"><strong>Guaranteed Outcomes</strong></div>
                        <p className="text-sm text-muted-foreground">
                          +10% OEE improvement or your money back
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartPilot}
                    disabled={pilotStarted}
                    size="lg"
                    className="w-full bg-primary text-primary-foreground gap-2"
                  >
                    {pilotStarted ? (
                      <>
                        <Clock className="h-5 w-5 animate-spin" />
                        Pilot in Progress...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5" />
                        Start 4-Week Pilot
                      </>
                    )}
                  </Button>
                </div>

                {/* Right: Consultant Card */}
                <div>
                  <Card className="border-accent/50 bg-accent/5 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-xl">
                          {consultant.avatar}
                        </div>
                        <div>
                          <div className="text-lg">{consultant.name}</div>
                          <div className="text-sm text-muted-foreground">{consultant.role}</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-card border border-border mb-4">
                        <div className="flex items-start gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                          <p className="text-sm">
                            "I'll be your dedicated guide throughout this pilot. We'll work together to map your machines, 
                            set up your digital twin, and get you to actionable insights in 4 weeks."
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mb-3">Areas of Expertise:</div>
                      <div className="flex flex-wrap gap-2">
                        {consultant.expertise.map((exp, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pilot Progress */}
        {pilotStarted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="mb-1">Pilot Implementation Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Week {currentWeek} of 4 — On track for completion
                    </p>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    {Math.round((currentWeek / 4) * 100)}% Complete
                  </Badge>
                </div>

                <Progress value={(currentWeek / 4) * 100} className="h-2 mb-8" />

                {/* Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {checklist.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border"
                    >
                      {item.completed ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <CheckCircle2 className="h-6 w-6 text-success" />
                        </motion.div>
                      ) : (
                        <Clock className="h-6 w-6 text-muted-foreground animate-pulse" />
                      )}
                      <span className={`text-sm ${item.completed ? "text-success" : ""}`}>
                        {item.text}
                      </span>
                      {item.completed && (
                        <Badge className="ml-auto bg-success text-success-foreground text-xs">
                          ✓ Done
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Week Timeline */}
                <div className="mt-8 grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((week) => (
                    <div
                      key={week}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        week <= currentWeek
                          ? "border-success bg-success/5"
                          : "border-dashed border-border bg-muted/20"
                      }`}
                    >
                      <div className="text-sm mb-2">Week {week}</div>
                      <div className="text-xs text-muted-foreground">
                        {week === 1 && "Connect & Deploy"}
                        {week === 2 && "Map & Structure"}
                        {week === 3 && "Dashboard Setup"}
                        {week === 4 && "Training & Handoff"}
                      </div>
                      {week <= currentWeek && (
                        <CheckCircle2 className="h-4 w-4 text-success mx-auto mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2">CONNECT Layer</h4>
                <p className="text-sm text-muted-foreground">
                  Edge gateway auto-detects machines via OPC-UA, Modbus, MQTT
                </p>
              </CardContent>
            </Card>

            <Card className="border-success/30 bg-success/5">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center mx-auto mb-4">
                  <Database className="h-6 w-6 text-success" />
                </div>
                <h4 className="mb-2">STRUCTURE Layer</h4>
                <p className="text-sm text-muted-foreground">
                  Pre-built templates map raw tags to contextualized data in ~32 mins
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <h4 className="mb-2">ANALYZE Layer (MVP)</h4>
                <p className="text-sm text-muted-foreground">
                  Live OEE dashboard, downtime tracking, root cause analysis
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Stakeholder Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="p-4 rounded-lg bg-accent/10 border border-accent/30 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <strong>GTM Strategy:</strong> Fixed-scope pilot removes complexity and lowers barrier to entry. 
            Customers become data-literate and trust the platform—setting foundation for Walk stage upsell (Solutions).
          </p>
        </motion.div>
      </div>
    </div>
  );
}
