import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Zap,
  AlertCircle,
  Info,
  ZoomIn,
} from "lucide-react";
import { kpiData, downtimeReasons, alerts, trendData } from "../../lib/data";
import { shiftData, samplePrediction } from "../../lib/journey-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface AnalyzePageProps {
  enabledSolutions: string[];
}

export function AnalyzePage({ enabledSolutions }: AnalyzePageProps) {
  const [drillDown, setDrillDown] = useState(false);
  const hasPredictiveMaintenance = enabledSolutions.includes("predictive-maintenance");
  const hasQualityManagement = enabledSolutions.includes("quality-management");

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-accent" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>;
      case "warning":
        return <Badge className="bg-accent text-accent-foreground">Warning</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>ANALYZE Layer</h1>
          <p className="text-muted-foreground mt-1">
            Performance Analytics & Real-Time Insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="24h">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Solutions Active Banner */}
      {enabledSolutions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-success bg-success/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <strong>{enabledSolutions.length} Solution{enabledSolutions.length > 1 ? 's' : ''} Active</strong>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI-powered recommendations will appear in the Alerts section below
                  </p>
                </div>
                <Badge className="bg-success text-success-foreground">
                  Walk Stage
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Overall Equipment Effectiveness</CardDescription>
              <Activity className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl tabular-nums">{kpiData.oee}%</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success">+12.2% vs last week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Downtime (hours/day)</CardDescription>
              <AlertTriangle className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl tabular-nums">{kpiData.downtime}</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-success">-44.8% reduction</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Defect Rate</CardDescription>
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl tabular-nums">{kpiData.defectRate}%</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-success">-70.5% improvement</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Energy Consumption (kWh)</CardDescription>
              <Zap className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl tabular-nums">{kpiData.energyConsumption}</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+3.2% vs baseline</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Performance Trend Analysis</CardTitle>
              <CardDescription>
                Machine speed vs defect rate correlation over time
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDrillDown(!drillDown)}
              className="gap-2"
            >
              <ZoomIn className="h-4 w-4" />
              {drillDown ? "Hide" : "Show"} Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'Speed (RPM)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'Defect Rate (%)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="speed" 
                  stroke="#0043CE" 
                  strokeWidth={2}
                  name="Machine Speed"
                  dot={false}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="defectRate" 
                  stroke="#d4183d" 
                  strokeWidth={2}
                  name="Defect Rate"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Drill-down Details */}
          {drillDown && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-border"
            >
              <h4 className="mb-4">Shift-Level Analysis</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2">Shift</th>
                      <th className="text-left p-2">Line</th>
                      <th className="text-right p-2">Speed (RPM)</th>
                      <th className="text-right p-2">Humidity (%)</th>
                      <th className="text-right p-2">Defect Rate (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shiftData.map((row, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/50">
                        <td className="p-2">{row.shift}</td>
                        <td className="p-2">{row.line}</td>
                        <td className="text-right p-2 tabular-nums">{row.speed}</td>
                        <td className="text-right p-2 tabular-nums">{row.humidity}</td>
                        <td className="text-right p-2 tabular-nums">
                          <span className={row.defectRate > 5 ? "text-destructive" : "text-success"}>
                            {row.defectRate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/30">
                <p className="text-sm">
                  <strong>Key Insight:</strong> Evening shift consistently shows higher defect rates. 
                  Correlation analysis reveals humidity &gt; 60% combined with speed &gt; 1200 RPM 
                  results in 6.8% defect rate vs. 1.2% baseline.
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Downtime Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Downtime Root Cause Analysis</CardTitle>
            <CardDescription>
              Top reasons for production interruptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={downtimeReasons} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    dataKey="reason" 
                    type="category" 
                    width={120}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="percentage" fill="#0043CE" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {downtimeReasons.slice(0, 3).map((reason, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{reason.reason}</span>
                  <span className="tabular-nums">{reason.hours} hrs ({reason.percentage}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations (from Solutions) */}
        {enabledSolutions.length > 0 && (
          <Card className="border-2 border-success/50 bg-gradient-to-br from-success/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-success/20 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1">
                  <CardTitle>AI-Powered Recommendations</CardTitle>
                  <CardDescription>
                    Insights from enabled Solutions Suite
                  </CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-accent to-primary text-white border-0">
                  Solutions Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hasPredictiveMaintenance && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-lg border-2 border-destructive/50 bg-destructive/5"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            <strong>{samplePrediction.asset}: {samplePrediction.prediction} predicted</strong>
                          </span>
                          <Badge className="bg-destructive text-destructive-foreground">
                            {samplePrediction.probability}% Probability
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Failure expected within {samplePrediction.horizon_hours} hours. {samplePrediction.recommendation}
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {samplePrediction.dataPoints.map((dp, idx) => (
                            <div key={idx} className="p-2 rounded bg-card">
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
                        <div className="flex items-center gap-2 pt-2">
                          <Button size="sm" className="bg-destructive text-destructive-foreground">
                            Create Work Order
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <div className="ml-auto text-xs text-muted-foreground">
                            Cost Avoidance: ₹{(samplePrediction.estimated_avoidance / 100000).toFixed(1)}L
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {hasQualityManagement && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-lg border border-accent/50 bg-accent/5"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">
                            <strong>Quality Alert: Oven Line 2</strong>
                          </span>
                          <Badge className="bg-accent text-accent-foreground">
                            Quality Management
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Humidity-Speed pattern detected: Humidity &gt; 60% + Speed &gt; 1200 RPM → +Defects (6.8%)
                        </p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            Adjust Parameters
                          </Button>
                          <Button size="sm" variant="outline">
                            Send to Operator
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts & Notifications</CardTitle>
            <CardDescription>
              Real-time alerts from rule engine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.severity === "critical"
                      ? "border-destructive/30 bg-destructive/5"
                      : alert.severity === "warning"
                      ? "border-accent/30 bg-accent/5"
                      : "border-border bg-card"
                  } ${alert.acknowledged ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{alert.title}</span>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{alert.machine}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                    {!alert.acknowledged && (
                      <Button size="sm" variant="outline">
                        Acknowledge
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Workspace */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Workspace</CardTitle>
          <CardDescription>
            Custom query builder for advanced data analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30 font-mono text-sm">
              <div className="text-muted-foreground mb-2">SQL Query:</div>
              <pre className="text-sm">
{`SELECT 
  humidity, 
  speed, 
  defect_rate 
FROM clean_data 
WHERE line = 'Packaging 1' 
  AND timestamp > NOW() - INTERVAL '24 hours'
ORDER BY timestamp DESC`}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button className="bg-primary">Run Query</Button>
              <Button variant="outline">Save as View</Button>
              <Button variant="outline">Export CSV</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
