import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  Boxes, 
  Sparkles,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Plus,
  BarChart3,
  Maximize2,
  Zap
} from "lucide-react";
import { phase6Metrics, streamingMetrics } from "../../lib/journey-data";

export function Phase6ScaleAndBuild() {
  const [nlQuery, setNlQuery] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [createdDashboard, setCreatedDashboard] = useState(false);

  const handleBuildDashboard = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setCreatedDashboard(true);
      setIsBuilding(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge className="mb-4 bg-gradient-to-r from-secondary to-primary text-white border-0 px-4 py-2">
            Run Stage - Phase 6
          </Badge>
          <h1 className="text-5xl mb-4">Scale & Build</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Creator Studio for enterprise teams + platform scaling to 50+ machines
          </p>
        </motion.div>

        {/* Success Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="border-2 border-success bg-gradient-to-r from-success/10 to-accent/10">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-xl bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <div>
                  <h2 className="mb-1">Journey Complete — Data-Driven Excellence Achieved</h2>
                  <p className="text-muted-foreground">
                    From factory chaos to measurable outcomes in 6 phases
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="p-4 rounded-lg bg-card text-center">
                  <div className="text-xs text-muted-foreground mb-1">OEE</div>
                  <div className="text-3xl tabular-nums mb-1">{phase6Metrics.after.oee}%</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-success">
                    <TrendingUp className="h-3 w-3" />
                    +{phase6Metrics.improvement.oee.toFixed(1)}%
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card text-center">
                  <div className="text-xs text-muted-foreground mb-1">Defect Rate</div>
                  <div className="text-3xl tabular-nums mb-1">{phase6Metrics.after.defectRate}%</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-success">
                    <TrendingDown className="h-3 w-3" />
                    -{phase6Metrics.improvement.defectRate.toFixed(1)}%
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card text-center">
                  <div className="text-xs text-muted-foreground mb-1">Downtime (hrs)</div>
                  <div className="text-3xl tabular-nums mb-1">{phase6Metrics.after.downtime}</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-success">
                    <TrendingDown className="h-3 w-3" />
                    -{phase6Metrics.improvement.downtime.toFixed(1)}%
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card text-center">
                  <div className="text-xs text-muted-foreground mb-1">Throughput</div>
                  <div className="text-3xl tabular-nums mb-1">{(phase6Metrics.after.throughput / 1000).toFixed(1)}K</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-success">
                    <TrendingUp className="h-3 w-3" />
                    +{phase6Metrics.improvement.throughput.toFixed(1)}%
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card text-center">
                  <div className="text-xs text-muted-foreground mb-1">ROI</div>
                  <div className="text-3xl tabular-nums mb-1">{phase6Metrics.financialImpact.roi}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {phase6Metrics.financialImpact.costSavings}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* BUILD Layer - Creator Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Boxes className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">BUILD Layer — Creator Studio</h3>
                    <p className="text-sm text-muted-foreground">
                      Self-service analytics and custom dashboard builder
                    </p>
                  </div>
                  <Badge className="bg-gradient-to-r from-secondary to-primary text-white border-0">
                    Enterprise
                  </Badge>
                </div>

                {/* NL Dashboard Builder */}
                <div className="space-y-4">
                  <div>
                    <div className="text-sm mb-3">Create Custom Dashboard with Natural Language:</div>
                    <div className="flex gap-2">
                      <Input
                        placeholder='e.g., "Create dashboard showing OEE vs Energy Consumption"'
                        value={nlQuery}
                        onChange={(e) => setNlQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleBuildDashboard}
                        disabled={isBuilding || !nlQuery}
                        className="bg-primary text-primary-foreground gap-2"
                      >
                        {isBuilding ? (
                          <>
                            <Sparkles className="h-4 w-4 animate-spin" />
                            Building...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4" />
                            Build
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {createdDashboard && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-lg border-2 border-success bg-success/5"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                        <span className="text-sm"><strong>Dashboard Created!</strong></span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Mock Widget 1 */}
                        <div className="p-4 rounded-lg bg-card border border-border">
                          <div className="text-xs text-muted-foreground mb-2">OEE Trend</div>
                          <div className="h-24 bg-gradient-to-br from-primary/10 to-success/10 rounded flex items-center justify-center text-xs text-muted-foreground">
                            Line Chart Widget
                          </div>
                        </div>

                        {/* Mock Widget 2 */}
                        <div className="p-4 rounded-lg bg-card border border-border">
                          <div className="text-xs text-muted-foreground mb-2">Energy Consumption</div>
                          <div className="h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded flex items-center justify-center text-xs text-muted-foreground">
                            Bar Chart Widget
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit Layout
                        </Button>
                        <Button size="sm" variant="outline">
                          Add Widget
                        </Button>
                        <Button size="sm" className="bg-success text-success-foreground ml-auto">
                          Deploy Dashboard
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Pre-built Templates */}
                  <div className="mt-6">
                    <div className="text-sm mb-3">Or start from a template:</div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left">
                        <div className="text-sm mb-1"><strong>Solution Dashboard</strong></div>
                        <div className="text-xs text-muted-foreground">
                          Pre-built widgets for Predictive Maintenance insights
                        </div>
                      </button>

                      <button className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left">
                        <div className="text-sm mb-1"><strong>Quality Dashboard</strong></div>
                        <div className="text-xs text-muted-foreground">
                          Defect tracking and root cause analysis
                        </div>
                      </button>

                      <button className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left">
                        <div className="text-sm mb-1"><strong>Energy Dashboard</strong></div>
                        <div className="text-xs text-muted-foreground">
                          Energy consumption vs production output
                        </div>
                      </button>

                      <button className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left">
                        <div className="text-sm mb-1"><strong>Custom Logic Builder</strong></div>
                        <div className="text-xs text-muted-foreground">
                          Export solution logic for customization
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Scale Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="border-success/50 bg-success/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Maximize2 className="h-5 w-5 text-success" />
                  <h3>Platform Scaling</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card">
                    <div className="text-xs text-muted-foreground mb-1">Current Machines</div>
                    <div className="text-4xl tabular-nums mb-1">{streamingMetrics.machinesPerFactory}</div>
                    <div className="text-xs text-success">Connected & Streaming</div>
                  </div>

                  <div className="p-4 rounded-lg bg-card">
                    <div className="text-xs text-muted-foreground mb-1">Scalable To</div>
                    <div className="text-4xl tabular-nums mb-1">{streamingMetrics.expandableTo}+</div>
                    <div className="text-xs text-muted-foreground">No re-implementation</div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-xs text-muted-foreground mb-2">Expansion Path</div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        <span>Pilot (2 machines) ✓</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        <span>Line expansion (12 machines) ✓</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-accent" />
                        <span>Factory-wide (50+ machines)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-accent" />
                        <span>Multi-site deployment</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-success text-success-foreground gap-2">
                    <Plus className="h-4 w-4" />
                    Add More Machines
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Commercial Pathway */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Card className="border-2 border-accent/50 bg-accent/5">
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Commercial Pathway Summary
              </h3>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                  <Badge className="mb-3 bg-primary text-primary-foreground">Crawl</Badge>
                  <div className="mb-2"><strong>ANALYZE Pilot (4 weeks)</strong></div>
                  <div className="text-muted-foreground mb-2">
                    Fixed scope: 2 machines, OEE dashboard, consultant
                  </div>
                  <div className="text-xs text-success">
                    ✓ Low barrier, fast ROI demo
                  </div>
                </div>

                <div>
                  <Badge className="mb-3 bg-gradient-to-r from-accent to-primary text-white border-0">Walk</Badge>
                  <div className="mb-2"><strong>SOLUTIONS Subscription</strong></div>
                  <div className="text-muted-foreground mb-2">
                    Outcome-based pricing: Predictive Maintenance, Quality, etc.
                  </div>
                  <div className="text-xs text-success">
                    ✓ Revenue expansion, proven value
                  </div>
                </div>

                <div>
                  <Badge className="mb-3 bg-secondary text-secondary-foreground">Run</Badge>
                  <div className="mb-2"><strong>BUILD Enterprise License</strong></div>
                  <div className="text-muted-foreground mb-2">
                    Self-service analytics, custom solutions, scale to 50+ machines
                  </div>
                  <div className="text-xs text-success">
                    ✓ Platform lock-in, highest ARPU
                  </div>
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
            <strong>GTM Success:</strong> Crawl → Walk → Run progression creates natural upsell path. 
            Pilot converts to ANALYZE subscription, then Solutions expansion, finally BUILD enterprise license. 
            Each stage delivers measurable value, minimizing churn and maximizing LTV.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
