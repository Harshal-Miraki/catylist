import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { PlatformLayerStack } from "../journey/PlatformLayerStack";
import { streamingMetrics } from "../../lib/journey-data";
import { Zap, TrendingUp, Clock, Maximize2 } from "lucide-react";

export function PlatformOverview() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Badge className="mb-4 bg-gradient-to-r from-primary to-success text-white px-4 py-2">
          Platform Architecture
        </Badge>
        <h1 className="text-4xl mb-4">Manufacturing Intelligence Platform</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          5 integrated layers working together to transform your factory operations
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl tabular-nums mb-1">
                {streamingMetrics.machineTagsPerSec}
              </div>
              <div className="text-xs text-muted-foreground">Tags/Second</div>
            </CardContent>
          </Card>

          <Card className="border-success/50 bg-success/5">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-2xl tabular-nums mb-1">
                +{streamingMetrics.oeeImprovement}%
              </div>
              <div className="text-xs text-muted-foreground">OEE Improvement</div>
            </CardContent>
          </Card>

          <Card className="border-accent/50 bg-accent/5">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-2xl tabular-nums mb-1">
                -{streamingMetrics.scrapReduction}%
              </div>
              <div className="text-xs text-muted-foreground">Scrap Reduction</div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl mb-1">
                {streamingMetrics.timeToDeployAfter}
              </div>
              <div className="text-xs text-muted-foreground">Time to Deploy</div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <Maximize2 className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl tabular-nums mb-1">
                {streamingMetrics.machinesPerFactory}→{streamingMetrics.expandableTo}
              </div>
              <div className="text-xs text-muted-foreground">Machines/Factory</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Layer Stack */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <PlatformLayerStack />
        </motion.div>

        {/* Platform Benefits */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h2 className="mb-4">Why Choose Miraki?</h2>
            <div className="space-y-4">
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <h4 className="mb-2">🚀 Rapid Deployment</h4>
                  <p className="text-sm text-muted-foreground">
                    From <strong className="text-foreground">{streamingMetrics.timeToDeployBefore}</strong> to{" "}
                    <strong className="text-primary">{streamingMetrics.timeToDeployAfter}</strong> with 
                    pre-configured templates and plug-and-play edge gateways
                  </p>
                </CardContent>
              </Card>

              <Card className="border-success/30 bg-success/5">
                <CardContent className="p-4">
                  <h4 className="mb-2">🎯 Fixed-Scope Pilot</h4>
                  <p className="text-sm text-muted-foreground">
                    Start with a 4-week OEE pilot. 2 machines, live dashboard, and guaranteed outcomes. 
                    No complexity, no surprises.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-4">
                  <h4 className="mb-2">🤖 AI-Assisted Every Step</h4>
                  <p className="text-sm text-muted-foreground">
                    Your dedicated AI Manufacturing Consultant guides data mapping, identifies patterns, 
                    and accelerates time-to-insight.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <h4 className="mb-2">📈 Scalable & Flexible</h4>
                  <p className="text-sm text-muted-foreground">
                    Start with {streamingMetrics.machinesPerFactory} machines, scale to{" "}
                    {streamingMetrics.expandableTo}+. Pay only for what you use.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <h4 className="mb-2">💬 Natural Language Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Ask questions in plain English: "Show me top downtime causes last week" - 
                    instant insights without SQL or coding.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Customer Journey Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Card className="border-2 border-accent bg-gradient-to-r from-accent/5 to-success/5">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">See the Transformation Journey</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience how Miraki takes manufacturers from chaos to clarity in 6 phases. 
              From problem discovery to measurable outcomes.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="outline" className="text-xs">Factory in Chaos</Badge>
              <span className="text-muted-foreground">→</span>
              <Badge variant="outline" className="text-xs">Quick Start</Badge>
              <span className="text-muted-foreground">→</span>
              <Badge variant="outline" className="text-xs">Implementation</Badge>
              <span className="text-muted-foreground">→</span>
              <Badge variant="outline" className="text-xs">Modeling</Badge>
              <span className="text-muted-foreground">→</span>
              <Badge variant="outline" className="text-xs">Action</Badge>
              <span className="text-muted-foreground">→</span>
              <Badge className="bg-success text-success-foreground text-xs">Outcome</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
