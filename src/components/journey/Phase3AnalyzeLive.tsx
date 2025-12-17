import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { pilotMetrics } from "../../lib/journey-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const downtimeData = [
  { cause: "Bearing Failure", hours: 4.2, percentage: 35 },
  { cause: "Material Shortage", hours: 2.8, percentage: 24 },
  { cause: "Tool Change", hours: 1.9, percentage: 16 },
  { cause: "Quality Issue", hours: 1.5, percentage: 13 },
  { cause: "Other", hours: 1.3, percentage: 12 },
];

const oeeTrendData = [
  { time: "Week 1", oee: 52 },
  { time: "Week 2", oee: 56 },
  { time: "Week 3", oee: 60 },
  { time: "Week 4", oee: 64 },
];

export function Phase3AnalyzeLive() {
  const [drillDown, setDrillDown] = useState<string | null>(null);
  const [nlQuery, setNlQuery] = useState("");

  const handleDrillDown = (cause: string) => {
    setDrillDown(cause);
  };

  const handleNLQuery = () => {
    setDrillDown("Bearing Failure");
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
          <Badge className="mb-4 bg-success text-success-foreground px-4 py-2">
            Crawl Stage - Phase 3
          </Badge>
          <h1 className="text-5xl mb-4">Workbench in Action</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Live analytics dashboards providing real-time visibility and data literacy
          </p>
        </motion.div>

        {/* Pilot Success Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="border-2 border-success bg-gradient-to-r from-success/10 to-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-xl bg-success/20 flex items-center justify-center">
                  <BarChart3 className="h-7 w-7 text-success" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-1">4-Week Pilot Completed Successfully!</h2>
                  <p className="text-sm text-muted-foreground">
                    Platform deployed, data flowing, team trained — ready for daily operations
                  </p>
                </div>
                <Badge className="bg-success text-success-foreground px-4 py-2">
                  ✓ Pilot Complete
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-card text-center">
                  <div className="text-xs text-muted-foreground mb-1">OEE Improvement</div>
                  <div className="text-3xl tabular-nums text-success">
                    +{pilotMetrics.oee.improvement}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {pilotMetrics.oee.before}% → {pilotMetrics.oee.after}%
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card text-center">
                  <div className="text-xs text-muted-foreground mb-1">Downtime Reduction</div>
                  <div className="text-3xl tabular-nums text-success">
                    -{pilotMetrics.downtime.improvement}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {pilotMetrics.downtime.before} → {pilotMetrics.downtime.after} {pilotMetrics.downtime.unit}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card text-center">
                  <div className="text-xs text-muted-foreground mb-1">Data Visibility</div>
                  <div className="text-3xl tabular-nums text-success">
                    {pilotMetrics.visibility.after}{pilotMetrics.visibility.unit}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    From {pilotMetrics.visibility.before}% baseline
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card text-center">
                  <div className="text-xs text-muted-foreground mb-1">Data Points</div>
                  <div className="text-3xl tabular-nums text-primary">
                    {pilotMetrics.dataPoints.collected}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {pilotMetrics.dataPoints.analyzed}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ANALYZE Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* OEE Trend */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="mb-1">OEE Trend - 4 Week Pilot</h3>
                    <p className="text-sm text-muted-foreground">
                      Overall Equipment Effectiveness improvement trajectory
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+23% increase</span>
                  </div>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={oeeTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="time" 
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        domain={[40, 70]}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="oee" 
                        stroke="#22C55E" 
                        strokeWidth={3}
                        dot={{ fill: '#22C55E', r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4">Live Metrics</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Current OEE</span>
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                    <div className="text-3xl tabular-nums text-success">64%</div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Availability</span>
                    </div>
                    <div className="text-2xl tabular-nums">88%</div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Performance</span>
                    </div>
                    <div className="text-2xl tabular-nums">82%</div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Quality</span>
                    </div>
                    <div className="text-2xl tabular-nums">89%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Downtime Analysis with Drill-Down */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="mb-1">Top Downtime Causes</h3>
                  <p className="text-sm text-muted-foreground">
                    Click any cause to drill down and identify root cause
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cause</TableHead>
                    <TableHead className="text-right">Hours Lost</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {downtimeData.map((row) => (
                    <TableRow 
                      key={row.cause}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleDrillDown(row.cause)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <AlertCircle className={`h-4 w-4 ${
                            row.percentage > 30 ? "text-destructive" : "text-accent"
                          }`} />
                          {row.cause}
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{row.hours}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        <Badge variant={row.percentage > 30 ? "destructive" : "outline"}>
                          {row.percentage}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-1">
                          Details
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {drillDown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/30"
                >
                  <h4 className="mb-3">Drill-Down: {drillDown}</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Most Affected Machine</div>
                      <div>CNC Lathe-02</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Peak Time</div>
                      <div>Evening Shift (2-10 PM)</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Pattern</div>
                      <div>Every 48-72 hours</div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 rounded bg-card">
                    <strong>Recommendation:</strong> Schedule predictive maintenance for bearing replacement. 
                    Consider enabling <strong>Predictive Maintenance Solution</strong> (Walk stage) to prevent future failures.
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Natural Language Query */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Ask Questions in Plain English
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder='e.g., "What caused the most downtime last week?"'
                  value={nlQuery}
                  onChange={(e) => setNlQuery(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleNLQuery} className="bg-primary text-primary-foreground">
                  <Search className="h-4 w-4 mr-2" />
                  Ask
                </Button>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Example queries: "Top 3 downtime causes", "OEE trend this month", "Which machine has lowest performance?"
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
            <strong>Outcome of Crawl Stage:</strong> Customer is now data-literate, trusts the platform, and actively using ANALYZE. 
            Foundation established for Walk stage upsell (Solutions Suite) after 3-6 months of usage.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
