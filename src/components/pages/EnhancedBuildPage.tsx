import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Boxes,
  Sparkles,
  Send,
  Plus,
  Save,
  Download,
  Trash2,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Activity,
  TrendingUp,
  Gauge as GaugeIcon,
  Table as TableIcon,
  Layout as LayoutIcon,
  Settings,
  Eye,
  Code,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Widget {
  id: string;
  type: "kpi" | "chart" | "table" | "gauge";
  title: string;
  chartType?: "line" | "bar" | "pie" | "area";
  data?: any;
  config?: any;
}

interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: Widget[];
  createdAt: Date;
}

const templates = [
  {
    id: "oee-dashboard",
    name: "OEE Performance Dashboard",
    description: "Track Overall Equipment Effectiveness metrics",
    icon: BarChart3,
    widgets: ["OEE Trend", "Availability", "Performance", "Quality"],
  },
  {
    id: "quality-dashboard",
    name: "Quality Analytics Dashboard",
    description: "Monitor defect rates and quality trends",
    icon: Activity,
    widgets: ["Defect Trend", "Pareto Chart", "First Pass Yield", "Rework Rate"],
  },
  {
    id: "energy-dashboard",
    name: "Energy Efficiency Dashboard",
    description: "Track energy consumption and optimization",
    icon: TrendingUp,
    widgets: ["Energy Consumption", "Cost Analysis", "Peak Usage", "Efficiency Score"],
  },
  {
    id: "maintenance-dashboard",
    name: "Predictive Maintenance Dashboard",
    description: "AI-powered failure prediction and alerts",
    icon: Settings,
    widgets: ["Failure Predictions", "Asset Health", "Maintenance Schedule", "MTBF/MTTR"],
  },
];

const sampleChartData = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 68 },
  { name: "Wed", value: 72 },
  { name: "Thu", value: 70 },
  { name: "Fri", value: 75 },
  { name: "Sat", value: 73 },
  { name: "Sun", value: 71 },
];

export function EnhancedBuildPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Mira, your AI dashboard builder. Tell me what dashboard you'd like to create, and I'll build it for you. Try: 'Create a dashboard showing OEE trend and top downtime causes'",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState<Dashboard | null>(null);
  const [savedDashboards, setSavedDashboards] = useState<Dashboard[]>([]);
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      let aiResponse = "";
      let newDashboard: Dashboard | null = null;

      // Parse user intent
      const lowerInput = inputMessage.toLowerCase();

      if (lowerInput.includes("oee") || lowerInput.includes("equipment effectiveness")) {
        aiResponse = "I've created an OEE Performance Dashboard with the following widgets: OEE Trend Chart, Availability Gauge, Performance Bar Chart, and Quality Score Card.";
        newDashboard = {
          id: `dashboard-${Date.now()}`,
          name: "OEE Performance Dashboard",
          description: "Tracking Overall Equipment Effectiveness",
          widgets: [
            { id: "w1", type: "chart", title: "OEE Trend", chartType: "line", data: sampleChartData },
            { id: "w2", type: "gauge", title: "Availability", config: { value: 88, max: 100 } },
            { id: "w3", type: "chart", title: "Performance", chartType: "bar", data: sampleChartData },
            { id: "w4", type: "kpi", title: "Quality Score", data: { value: "94.5%", trend: "+2.3%" } },
          ],
          createdAt: new Date(),
        };
      } else if (lowerInput.includes("downtime") || lowerInput.includes("failure")) {
        aiResponse = "I've created a Downtime Analysis Dashboard showing root causes, machine-wise breakdown, and time-based trends.";
        newDashboard = {
          id: `dashboard-${Date.now()}`,
          name: "Downtime Analysis Dashboard",
          description: "Root cause analysis and trends",
          widgets: [
            { id: "w1", type: "chart", title: "Downtime by Cause", chartType: "bar", data: sampleChartData },
            { id: "w2", type: "chart", title: "Time Trend", chartType: "line", data: sampleChartData },
            { id: "w3", type: "kpi", title: "Total Downtime", data: { value: "4.2 hrs", trend: "-15%" } },
            { id: "w4", type: "table", title: "Machine Breakdown", data: [] },
          ],
          createdAt: new Date(),
        };
      } else if (lowerInput.includes("energy") || lowerInput.includes("consumption")) {
        aiResponse = "I've created an Energy Efficiency Dashboard with consumption trends, cost analysis, and peak usage indicators.";
        newDashboard = {
          id: `dashboard-${Date.now()}`,
          name: "Energy Efficiency Dashboard",
          description: "Energy consumption and optimization",
          widgets: [
            { id: "w1", type: "chart", title: "Energy Consumption", chartType: "area", data: sampleChartData },
            { id: "w2", type: "chart", title: "Cost Analysis", chartType: "bar", data: sampleChartData },
            { id: "w3", type: "kpi", title: "Total Consumption", data: { value: "1,245 kWh", trend: "+3.2%" } },
            { id: "w4", type: "gauge", title: "Efficiency Score", config: { value: 78, max: 100 } },
          ],
          createdAt: new Date(),
        };
      } else if (lowerInput.includes("quality") || lowerInput.includes("defect")) {
        aiResponse = "I've created a Quality Dashboard with defect tracking, Pareto analysis, and quality trends.";
        newDashboard = {
          id: `dashboard-${Date.now()}`,
          name: "Quality Analytics Dashboard",
          description: "Quality metrics and defect analysis",
          widgets: [
            { id: "w1", type: "chart", title: "Defect Trend", chartType: "line", data: sampleChartData },
            { id: "w2", type: "chart", title: "Defect Pareto", chartType: "bar", data: sampleChartData },
            { id: "w3", type: "kpi", title: "Defect Rate", data: { value: "2.8%", trend: "-35%" } },
            { id: "w4", type: "kpi", title: "First Pass Yield", data: { value: "97.2%", trend: "+1.8%" } },
          ],
          createdAt: new Date(),
        };
      } else {
        aiResponse = `I understand you want to create a dashboard. Could you be more specific? For example:
- "Create an OEE dashboard"
- "Show me downtime analysis"
- "Build an energy consumption dashboard"
- "Track quality metrics"

Or choose from the templates on the right!`;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (newDashboard) {
        setCurrentDashboard(newDashboard);
        toast.success("Dashboard created successfully!");
      }

      setIsProcessing(false);
    }, 2000);
  };

  const handleSaveDashboard = () => {
    if (!currentDashboard) return;

    setSavedDashboards((prev) => [...prev, currentDashboard]);
    toast.success(`Dashboard "${currentDashboard.name}" saved successfully!`);
  };

  const handleLoadTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setInputMessage(`Create a dashboard based on the ${templates.find(t => t.id === templateId)?.name}`);
  };

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case "kpi":
        return (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="text-4xl tabular-nums mb-2">{widget.data?.value}</div>
            <div className="text-sm text-muted-foreground mb-2">{widget.title}</div>
            {widget.data?.trend && (
              <div className="text-sm text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {widget.data.trend}
              </div>
            )}
          </div>
        );

      case "gauge":
        return (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#22C55E"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(widget.config?.value || 0) * 3.51} 351.86`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl tabular-nums">{widget.config?.value}</div>
                <div className="text-xs text-muted-foreground">%</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{widget.title}</div>
          </div>
        );

      case "chart":
        return (
          <div className="h-full p-4">
            <div className="text-sm mb-4">{widget.title}</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                {widget.chartType === "bar" ? (
                  <BarChart data={widget.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0043CE" radius={[8, 8, 0, 0]} />
                  </BarChart>
                ) : widget.chartType === "pie" ? (
                  <PieChart>
                    <Pie
                      data={widget.data}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#0043CE"
                      dataKey="value"
                      label
                    >
                      {widget.data?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : (
                  <LineChart data={widget.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#0043CE" strokeWidth={2} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        );

      case "table":
        return (
          <div className="h-full p-4">
            <div className="text-sm mb-4">{widget.title}</div>
            <div className="text-xs text-muted-foreground text-center py-8">
              Table widget - Data will be populated based on your query
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>BUILD Layer - Creator Studio</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered dashboard builder with natural language
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-secondary to-primary text-white border-0">
            Enterprise
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chat Interface & Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Builder
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-4">
              <Card className="border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Chat with Mira
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto space-y-4 p-4 bg-muted/20 rounded-lg">
                    {messages.map((message, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-card border border-border"
                          }`}
                        >
                          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-card border border-border rounded-lg p-3">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex gap-1">
                              <motion.div
                                className="h-2 w-2 rounded-full bg-primary"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                              />
                              <motion.div
                                className="h-2 w-2 rounded-full bg-primary"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.div
                                className="h-2 w-2 rounded-full bg-primary"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                              />
                            </div>
                            <span>Mira is thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Describe the dashboard you want to create..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !isProcessing && handleSendMessage()}
                      disabled={isProcessing}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isProcessing || !inputMessage.trim()}
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>

                  {/* Quick Suggestions */}
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => setInputMessage("Create an OEE performance dashboard")}
                    >
                      OEE Dashboard
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => setInputMessage("Show downtime analysis with root causes")}
                    >
                      Downtime Analysis
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => setInputMessage("Build energy efficiency dashboard")}
                    >
                      Energy Dashboard
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => setInputMessage("Track quality metrics and defects")}
                    >
                      Quality Dashboard
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{currentDashboard?.name || "No Dashboard Created"}</CardTitle>
                      {currentDashboard && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {currentDashboard.description}
                        </p>
                      )}
                    </div>
                    {currentDashboard && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleSaveDashboard}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toast.success("Dashboard exported!")}>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {currentDashboard ? (
                    <div className="grid grid-cols-2 gap-4">
                      {currentDashboard.widgets.map((widget) => (
                        <motion.div
                          key={widget.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="border-2 border-border rounded-lg bg-card hover:border-primary/50 transition-all"
                        >
                          {renderWidget(widget)}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-96 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Boxes className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No dashboard created yet</p>
                        <p className="text-sm">Chat with Mira to build your first dashboard</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Templates & Saved Dashboards */}
        <div className="space-y-6">
          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutIcon className="h-5 w-5" />
                Quick Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => handleLoadTemplate(template.id)}
                    className="w-full p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm mb-1">{template.name}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {template.description}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {template.widgets.slice(0, 2).map((widget, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {widget}
                            </Badge>
                          ))}
                          {template.widgets.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.widgets.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Saved Dashboards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Saved Dashboards
              </CardTitle>
            </CardHeader>
            <CardContent>
              {savedDashboards.length > 0 ? (
                <div className="space-y-2">
                  {savedDashboards.map((dashboard) => (
                    <div
                      key={dashboard.id}
                      className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm">{dashboard.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {dashboard.widgets.length} widgets
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentDashboard(dashboard)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No saved dashboards yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
