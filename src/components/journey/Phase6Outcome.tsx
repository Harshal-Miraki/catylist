import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Sparkles,
  Trophy,
  BarChart3
} from "lucide-react";
import { phase6Metrics } from "../../lib/journey-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function Phase6Outcome() {
  const comparisonData = [
    { metric: "OEE", before: phase6Metrics.before.oee, after: phase6Metrics.after.oee },
    { metric: "Throughput", before: phase6Metrics.before.throughput / 100, after: phase6Metrics.after.throughput / 100 },
    { metric: "Energy Eff.", before: phase6Metrics.before.energyEfficiency, after: phase6Metrics.after.energyEfficiency },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/10 via-background to-primary/10 p-8 relative overflow-hidden">
      {/* Celebratory Background Effects */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-success rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
            }}
            animate={{
              y: [0, window.innerHeight + 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-success text-success-foreground">Phase 6</Badge>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl mb-2">The New Reality</h1>
            <p className="text-muted-foreground text-lg mb-6">
              Data-Driven Excellence Achieved
            </p>
            <div className="flex items-center justify-center gap-3">
              <Trophy className="h-8 w-8 text-accent" />
              <span className="text-xl">6 Months Post-Implementation</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Key Metrics Before/After */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-success/5">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="mb-2">Transformational Impact</h2>
                  <p className="text-muted-foreground">Miraki Pune Plant - Measurable Results</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* OEE */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="text-center"
                  >
                    <Card className="border-success/50 bg-success/5">
                      <CardContent className="p-6">
                        <BarChart3 className="h-8 w-8 text-success mx-auto mb-3" />
                        <div className="mb-4">
                          <div className="text-xs text-muted-foreground mb-1">OEE</div>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xl text-muted-foreground line-through">{phase6Metrics.before.oee}%</span>
                            <span className="text-3xl tabular-nums">{phase6Metrics.after.oee}%</span>
                          </div>
                        </div>
                        <Badge className="bg-success text-success-foreground gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +{phase6Metrics.improvement.oee}%
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Defect Rate */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="text-center"
                  >
                    <Card className="border-success/50 bg-success/5">
                      <CardContent className="p-6">
                        <TrendingDown className="h-8 w-8 text-success mx-auto mb-3" />
                        <div className="mb-4">
                          <div className="text-xs text-muted-foreground mb-1">Defect Rate</div>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xl text-muted-foreground line-through">{phase6Metrics.before.defectRate}%</span>
                            <span className="text-3xl tabular-nums">{phase6Metrics.after.defectRate}%</span>
                          </div>
                        </div>
                        <Badge className="bg-success text-success-foreground gap-1">
                          <TrendingDown className="h-3 w-3" />
                          -{phase6Metrics.improvement.defectRate}%
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Downtime */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="text-center"
                  >
                    <Card className="border-success/50 bg-success/5">
                      <CardContent className="p-6">
                        <TrendingDown className="h-8 w-8 text-success mx-auto mb-3" />
                        <div className="mb-4">
                          <div className="text-xs text-muted-foreground mb-1">Downtime (hrs/day)</div>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xl text-muted-foreground line-through">{phase6Metrics.before.downtime}</span>
                            <span className="text-3xl tabular-nums">{phase6Metrics.after.downtime}</span>
                          </div>
                        </div>
                        <Badge className="bg-success text-success-foreground gap-1">
                          <TrendingDown className="h-3 w-3" />
                          -{phase6Metrics.improvement.downtime}%
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Throughput */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="text-center"
                  >
                    <Card className="border-success/50 bg-success/5">
                      <CardContent className="p-6">
                        <TrendingUp className="h-8 w-8 text-success mx-auto mb-3" />
                        <div className="mb-4">
                          <div className="text-xs text-muted-foreground mb-1">Daily Throughput</div>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xl text-muted-foreground line-through">{phase6Metrics.before.throughput}</span>
                            <span className="text-3xl tabular-nums">{phase6Metrics.after.throughput}</span>
                          </div>
                        </div>
                        <Badge className="bg-success text-success-foreground gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +{phase6Metrics.improvement.throughput}%
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Visual Comparison Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-6">Before vs After Comparison</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="before" fill="hsl(var(--muted))" name="Before Miraki" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="after" fill="#22C55E" name="After Miraki" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Financial Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <Card className="border-accent/50 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="h-8 w-8 text-accent" />
                  <h2>Financial Impact</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-2">Annual Cost Savings</div>
                    <div className="text-2xl">{phase6Metrics.financialImpact.costSavings}</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-2">Productivity Gain</div>
                    <div className="text-2xl">{phase6Metrics.financialImpact.productivityGain}</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-2">Quality Improvement</div>
                    <div className="text-2xl">{phase6Metrics.financialImpact.qualityImprovement}</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-2">ROI</div>
                    <div className="text-2xl">{phase6Metrics.financialImpact.roi}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Dashboard Generation Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <div>
                    <h3>AI-Powered Dashboard Builder in Action</h3>
                    <p className="text-sm text-muted-foreground">
                      Anita creates custom analytics views in seconds
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm flex-shrink-0">
                        AS
                      </div>
                      <div className="flex-1">
                        <div className="text-sm mb-1">Anita Sharma (Process Engineer)</div>
                        <div className="text-xs text-muted-foreground italic">
                          "Create dashboard: Show OEE by Line for last 24 hours"
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="p-4 rounded-lg border-2 border-success bg-success/5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-success" />
                      <div className="text-sm">Dashboard Generated Instantly</div>
                      <Badge className="ml-auto bg-success text-success-foreground">Live</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded bg-card border border-border">
                        <div className="text-xs text-muted-foreground mb-1">Line 1 OEE</div>
                        <div className="text-xl tabular-nums">84.5%</div>
                      </div>
                      <div className="p-3 rounded bg-card border border-border">
                        <div className="text-xs text-muted-foreground mb-1">Line 2 OEE</div>
                        <div className="text-xl tabular-nums">79.3%</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            <Card className="border-border bg-gradient-to-br from-muted/30 to-background">
              <CardContent className="p-8 text-center">
                <div className="max-w-3xl mx-auto">
                  <div className="text-4xl mb-4">"</div>
                  <p className="text-lg mb-6">
                    Miraki transformed our factory operations from chaos to clarity. We now make data-driven 
                    decisions in real-time, our defect rates have dropped by 70%, and we've saved over ₹1.2 crore 
                    annually. The AI-powered guidance has empowered our operators and engineers alike.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      RK
                    </div>
                    <div className="text-left">
                      <div>Ravi Kumar</div>
                      <div className="text-sm text-muted-foreground">Plant Manager, Miraki Pune Plant</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, duration: 0.6 }}
            className="text-center"
          >
            <Card className="border-primary bg-primary/5">
              <CardContent className="p-8">
                <h3 className="mb-4">Ready to Transform Your Manufacturing?</h3>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-primary text-primary-foreground">
                    Schedule a Demo
                  </Button>
                  <Button variant="outline">
                    Explore Platform Modules
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
