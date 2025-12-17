import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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
  Download,
  Filter,
  RefreshCw,
  Calendar,
  Search,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";

const energyData = [
  { hour: "00:00", consumption: 245, production: 850 },
  { hour: "04:00", consumption: 280, production: 920 },
  { hour: "08:00", consumption: 420, production: 1150 },
  { hour: "12:00", consumption: 450, production: 1200 },
  { hour: "16:00", consumption: 410, production: 1100 },
  { hour: "20:00", consumption: 320, production: 980 },
];

const machineStatusData = [
  { name: "Running", value: 8, color: "#22C55E" },
  { name: "Idle", value: 3, color: "#FFC107" },
  { name: "Maintenance", value: 1, color: "#d4183d" },
];

const qualityTrendData = [
  { date: "Mon", target: 2, actual: 1.8, pareto: 15 },
  { date: "Tue", target: 2, actual: 2.2, pareto: 12 },
  { date: "Wed", target: 2, actual: 1.5, pareto: 18 },
  { date: "Thu", target: 2, actual: 2.8, pareto: 22 },
  { date: "Fri", target: 2, actual: 1.9, pareto: 14 },
  { date: "Sat", target: 2, actual: 2.1, pareto: 11 },
  { date: "Sun", target: 2, actual: 1.7, pareto: 16 },
];

const correlationData = [
  { speed: 1100, defects: 1.2, humidity: 55 },
  { speed: 1150, defects: 1.8, humidity: 58 },
  { speed: 1200, defects: 3.2, humidity: 61 },
  { speed: 1220, defects: 6.8, humidity: 63 },
  { speed: 1180, defects: 3.1, humidity: 61 },
  { speed: 1130, defects: 1.8, humidity: 57 },
  { speed: 1195, defects: 5.2, humidity: 64 },
];

interface EnhancedAnalyzePageProps {
  enabledSolutions: string[];
}

export function EnhancedAnalyzePage({ enabledSolutions }: EnhancedAnalyzePageProps) {
  const [drillDown, setDrillDown] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [selectedMachine, setSelectedMachine] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const hasPredictiveMaintenance = enabledSolutions.includes("predictive-maintenance");
  const hasQualityManagement = enabledSolutions.includes("quality-management");

  const handleExport = (type: string) => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success(`Exported ${type} report successfully!`);
    }, 1500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Data refreshed successfully!");
    }, 1000);
  };

  const handleSearch = () => {
    if (searchQuery) {
      toast.info(`Searching for: "${searchQuery}"...`);
      setTimeout(() => {
        setDrillDown(true);
      }, 500);
    }
  };

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
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedMachine} onValueChange={setSelectedMachine}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Machines</SelectItem>
              <SelectItem value="cnc-01">CNC Lathe-01</SelectItem>
              <SelectItem value="cnc-02">CNC Lathe-02</SelectItem>
              <SelectItem value="oven">Oven Line-01</SelectItem>
              <SelectItem value="packaging">Packaging Line-01</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button 
            variant="outline"
            onClick={() => handleExport("PDF")}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
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
                    AI-powered recommendations will appear in the Insights section below
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

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder='Ask in natural language: "Show top downtime causes for CNC machines this week"'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

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
              <CardDescription>Production Output</CardDescription>
              <Zap className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl tabular-nums">{kpiData.production.toLocaleString()}</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success">+8.5% vs target</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Defect Rate</CardDescription>
              <AlertTriangle className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl tabular-nums">{kpiData.defectRate}%</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-success">-2.8% improvement</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Energy Efficiency</CardDescription>
              <Activity className="h-5 w-5 text-muted-foreground" />
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

      {/* Main Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="quality">Quality Analysis</TabsTrigger>
          <TabsTrigger value="energy">Energy & Efficiency</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Machine Status Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Machine Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={machineStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {machineStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {machineStatusData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="tabular-nums">{item.value} machines</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5" />
                  OEE Trend Analysis
                </CardTitle>
                <CardDescription>
                  Overall Equipment Effectiveness over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorOEE" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0043CE" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0043CE" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="time" 
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="speed" 
                        stroke="#0043CE" 
                        fillOpacity={1}
                        fill="url(#colorOEE)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Downtime Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Downtime Root Cause Analysis</CardTitle>
                  <CardDescription>
                    Top reasons for production interruptions
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleExport("Downtime Analysis")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
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
                      width={150}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="hours" fill="#d4183d" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Speed vs Defect Rate Correlation</CardTitle>
                <CardDescription>Identifying optimal operating parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="speed" 
                        name="Speed (RPM)" 
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        dataKey="defects" 
                        name="Defects (%)" 
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Scatter 
                        data={correlationData} 
                        fill="#0043CE"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shift Performance Comparison</CardTitle>
                <CardDescription>Performance metrics by shift</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Shift</TableHead>
                        <TableHead className="text-right">Speed</TableHead>
                        <TableHead className="text-right">Humidity</TableHead>
                        <TableHead className="text-right">Defects</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shiftData.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{row.shift}</TableCell>
                          <TableCell className="text-right tabular-nums">{row.speed}</TableCell>
                          <TableCell className="text-right tabular-nums">{row.humidity}%</TableCell>
                          <TableCell className="text-right tabular-nums">
                            <span className={row.defectRate > 5 ? "text-destructive" : "text-success"}>
                              {row.defectRate}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Quality Tab */}
        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quality Trend & Pareto Analysis</CardTitle>
              <CardDescription>Defect rate tracking with cumulative impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={qualityTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: 'Defect Rate (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: 'Cumulative (%)', angle: 90, position: 'insideRight' }}
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
                      dataKey="target" 
                      stroke="#9ca3af" 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      name="Target"
                      dot={false}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#0043CE" 
                      strokeWidth={3}
                      name="Actual Defect Rate"
                      dot={{ fill: '#0043CE', r: 4 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="pareto" 
                      stroke="#FFC107" 
                      strokeWidth={2}
                      name="Cumulative Impact"
                      dot={{ fill: '#FFC107', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Energy Tab */}
        <TabsContent value="energy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption vs Production Output</CardTitle>
              <CardDescription>Optimizing energy efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={energyData}>
                    <defs>
                      <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFC107" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FFC107" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="hour" 
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: 'Production (units)', angle: 90, position: 'insideRight' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="#FFC107" 
                      fillOpacity={1}
                      fill="url(#colorEnergy)"
                      strokeWidth={2}
                      name="Energy Consumption"
                    />
                    <Area 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="production" 
                      stroke="#22C55E" 
                      fillOpacity={1}
                      fill="url(#colorProduction)"
                      strokeWidth={2}
                      name="Production Output"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          {/* AI Recommendations */}
          {hasPredictiveMaintenance && (
            <Card className="border-2 border-destructive/50 bg-destructive/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <CardTitle>Predictive Maintenance Alert</CardTitle>
                  <Badge className="ml-auto bg-gradient-to-r from-accent to-primary text-white border-0">
                    Solutions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border border-destructive/30 bg-card">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm mb-2">
                        <strong>{samplePrediction.asset}: {samplePrediction.prediction} predicted</strong>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Failure expected within {samplePrediction.horizon_hours} hours. {samplePrediction.recommendation}
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs mb-3">
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
                </div>
              </CardContent>
            </Card>
          )}

          {hasQualityManagement && (
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  <CardTitle>Quality Management Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg border border-accent/30 bg-card">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm mb-2">
                        <strong>Pattern Detected: Oven Line 2</strong>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Humidity-Speed pattern: Humidity &gt; 60% + Speed &gt; 1200 RPM → +Defects (6.8%)
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
                </div>
              </CardContent>
            </Card>
          )}

          {/* Standard Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts & Notifications</CardTitle>
              <CardDescription>Real-time alerts from rule engine</CardDescription>
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
                        <Button size="sm" variant="outline" onClick={() => toast.success("Alert acknowledged")}>
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
