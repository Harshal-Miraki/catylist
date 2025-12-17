import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  Network, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  Activity,
  Database,
  Cloud,
  Wifi
} from "lucide-react";
import { phase3ConnectionSteps, phase3Machines, streamingMetrics } from "../../lib/journey-data";

export function Phase3Implementation() {
  const [hoveredGateway, setHoveredGateway] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "buffering":
        return <Loader2 className="h-4 w-4 text-accent animate-spin" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/5 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Badge className="mb-4 bg-success text-success-foreground">Phase 3</Badge>
        <h1 className="text-4xl mb-2">Digital Connection in Motion</h1>
        <p className="text-muted-foreground text-lg">
          Edge Deployment & Machine Connectivity
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Implementation Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Implementation Timeline</h3>
                <Badge className="bg-success text-success-foreground">On Track</Badge>
              </div>
              
              <div className="space-y-4">
                {phase3ConnectionSteps.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        step.status === "completed" 
                          ? "bg-success/20 text-success" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {step.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <span className="text-sm">{step.step}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{step.title}</div>
                        <div className="text-xs text-muted-foreground">{step.duration}</div>
                      </div>
                      <Badge 
                        variant={step.status === "completed" ? "default" : "outline"}
                        className={step.status === "completed" ? "bg-success text-success-foreground" : ""}
                      >
                        {step.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Flow Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="mb-8 text-center">Real-Time Data Flow Architecture</h3>
              
              <div className="flex items-center justify-between gap-4">
                {/* Shop Floor */}
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="p-6 rounded-lg bg-secondary/10 border border-secondary/30">
                    <Database className="h-8 w-8 text-secondary mx-auto mb-3" />
                    <div className="text-center text-sm">Shop Floor Machines</div>
                    <div className="text-center text-xs text-muted-foreground mt-1">
                      PLCs, Sensors, Controllers
                    </div>
                  </div>
                </motion.div>

                {/* Arrow 1 */}
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="h-6 w-6 text-primary" />
                </motion.div>

                {/* Edge Gateway */}
                <motion.div 
                  className="flex-1 relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  onMouseEnter={() => setHoveredGateway("gateway")}
                  onMouseLeave={() => setHoveredGateway(null)}
                >
                  <div className="p-6 rounded-lg bg-primary/10 border-2 border-primary/50 relative cursor-pointer">
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-primary/20"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Network className="h-8 w-8 text-primary mx-auto mb-3 relative z-10" />
                    <div className="text-center text-sm relative z-10">Edge Gateway</div>
                    <div className="text-center text-xs text-muted-foreground mt-1 relative z-10">
                      Data Processing & Buffering
                    </div>
                    <motion.div
                      className="mt-3 flex justify-center gap-1 relative z-10"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-1.5 w-1.5 rounded-full bg-success" />
                      ))}
                    </motion.div>
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredGateway === "gateway" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
                    >
                      <div className="bg-card border-2 border-primary/50 rounded-lg p-4 shadow-2xl min-w-64">
                        <div className="flex items-center gap-2 mb-3">
                          <Wifi className="h-4 w-4 text-success" />
                          <span className="text-sm">Live Data Stream</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <div className="text-muted-foreground">Devices</div>
                            <div className="text-lg tabular-nums">2</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Tags/sec</div>
                            <div className="text-lg tabular-nums text-success">{streamingMetrics.machineTagsPerSec}</div>
                          </div>
                          <div className="col-span-2">
                            <Progress value={85} className="h-2" />
                            <div className="text-muted-foreground mt-1">Streaming Active</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Arrow 2 */}
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <ArrowRight className="h-6 w-6 text-primary" />
                </motion.div>

                {/* Cloud */}
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <div className="p-6 rounded-lg bg-success/10 border border-success/30">
                    <Cloud className="h-8 w-8 text-success mx-auto mb-3" />
                    <div className="text-center text-sm">Cloud Platform</div>
                    <div className="text-center text-xs text-muted-foreground mt-1">
                      Analytics & Storage
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Connected Machines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Connected Machines - Live Status</h3>
                <Badge className="bg-success text-success-foreground gap-2">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-white"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Streaming Data
                </Badge>
              </div>

              <div className="space-y-3">
                {phase3Machines.map((machine, idx) => (
                  <motion.div
                    key={machine.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7 + idx * 0.1, duration: 0.5 }}
                    className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(machine.status)}
                      </div>
                      
                      <div className="flex-1 grid grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm">{machine.name}</div>
                          <div className="text-xs text-muted-foreground">{machine.protocol}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Tags</div>
                          <div className="text-sm tabular-nums">{machine.tags}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Data Rate</div>
                          <div className="text-sm tabular-nums">{machine.dataRate}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Last Sync</div>
                          <div className="text-sm">{machine.lastSync}</div>
                        </div>
                      </div>

                      <div>
                        <Badge 
                          variant={machine.status === "connected" ? "default" : "secondary"}
                          className={machine.status === "connected" ? "bg-success text-success-foreground" : "bg-accent text-accent-foreground"}
                        >
                          {machine.status}
                        </Badge>
                      </div>
                    </div>

                    {machine.status === "connected" && (
                      <div className="mt-3">
                        <Progress value={85 + Math.random() * 15} className="h-1" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Card className="border-success/50 bg-success/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                <div>
                  <div className="text-sm">Edge Gateway Pune-001 Successfully Connected</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    4 machines connected • 566 tags streaming • Data pipeline validated
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
