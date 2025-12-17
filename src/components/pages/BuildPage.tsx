import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Sparkles,
  Send,
  BarChart3,
  TrendingUp,
  Clock,
  Grid3x3,
  LineChart as LineChartIcon,
  PieChart,
} from "lucide-react";
import { componentWidgets, kpiData } from "../../lib/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = Array.from({ length: 12 }, (_, i) => ({
  hour: `${i * 2}:00`,
  oee: 75 + Math.random() * 20,
}));

export function BuildPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Mira, your AI assistant. I can help you build custom dashboards and analytics views. Try asking me to create visualizations!",
    },
  ]);
  const [input, setInput] = useState("");
  const [generatedDashboard, setGeneratedDashboard] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      if (input.toLowerCase().includes("oee") || input.toLowerCase().includes("line")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I've created a dashboard comparing OEE for Line 1 and Line 2 over the last 24 hours. Check the preview below!",
          },
        ]);
        setGeneratedDashboard(true);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I can help you create dashboards with various widgets. Try asking: 'Show me OEE for Line 1 and Line 2 for the last 24 hours'",
          },
        ]);
      }
    }, 1000);

    setInput("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>BUILD Layer</h1>
          <p className="text-muted-foreground mt-1">
            AI-Powered Dashboard Builder & Component Library
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-primary to-accent text-white gap-2 px-4 py-2">
          <Sparkles className="h-4 w-4" />
          Powered by LLM
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>Mira - AI Dashboard Assistant</CardTitle>
              </div>
              <CardDescription>
                Describe what you want to visualize and I'll build it for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto space-y-3 p-4 bg-muted/20 rounded-lg">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="e.g., Show me OEE for Line 1 and Line 2 for the last 24 hours"
                  className="flex-1"
                />
                <Button onClick={handleSend} className="bg-primary">
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setInput("Show me OEE for Line 1 and Line 2 for the last 24 hours")
                  }
                >
                  Compare Lines OEE
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setInput("Create energy consumption dashboard")
                  }
                >
                  Energy Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setInput("Show defect rate trends")
                  }
                >
                  Defect Trends
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generated Dashboard Preview */}
          {generatedDashboard && (
            <Card className="border-success/50 bg-success/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-success" />
                    <CardTitle>Generated Dashboard Preview</CardTitle>
                  </div>
                  <Button className="bg-success text-success-foreground">
                    Save Dashboard
                  </Button>
                </div>
                <CardDescription>OEE Comparison - Line 1 vs Line 2</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Line 1 - OEE</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl tabular-nums">{kpiData.oee}%</div>
                      <div className="flex items-center gap-1 text-sm text-success mt-1">
                        <TrendingUp className="h-3 w-3" />
                        +12.2%
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Line 2 - OEE</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl tabular-nums">79.3%</div>
                      <div className="flex items-center gap-1 text-sm text-success mt-1">
                        <TrendingUp className="h-3 w-3" />
                        +8.5%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Chart */}
                <div className="h-64 p-4 bg-card rounded-lg border border-border">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="oee"
                        stroke="#0043CE"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Component Library */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Library</CardTitle>
              <CardDescription>
                Available widgets for dashboard creation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {componentWidgets.map((widget) => {
                const icons: Record<string, any> = {
                  "line-chart": LineChartIcon,
                  "gauge": Clock,
                  "kpi-tile": BarChart3,
                  "table": Grid3x3,
                  "heatmap": PieChart,
                  "bar-chart": BarChart3,
                };
                const Icon = icons[widget.id] || BarChart3;

                return (
                  <div
                    key={widget.id}
                    className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm">{widget.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {widget.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Dashboards</CardTitle>
              <CardDescription>Your saved analytics views</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">Production Overview</div>
                    <div className="text-xs text-muted-foreground">Updated 2h ago</div>
                  </div>
                  <Badge variant="outline">Shared</Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">Quality Metrics</div>
                    <div className="text-xs text-muted-foreground">Updated 1d ago</div>
                  </div>
                  <Badge variant="outline">Private</Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">Energy Analysis</div>
                    <div className="text-xs text-muted-foreground">Updated 3d ago</div>
                  </div>
                  <Badge variant="outline">Shared</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
