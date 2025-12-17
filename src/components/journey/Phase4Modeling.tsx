import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { phase4MappingExample, consultant } from "../../lib/journey-data";
import { useState } from "react";

export function Phase4Modeling() {
  const [mappingStep, setMappingStep] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Badge className="mb-4 bg-primary text-primary-foreground">Phase 4</Badge>
        <h1 className="text-4xl mb-2">Building the Digital Twin</h1>
        <p className="text-muted-foreground text-lg">
          Data Contextualization & Signal Mapping
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Consultant Guidance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-8 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {consultant.avatar}
                </div>
                <div>
                  <div className="text-sm">{consultant.name}</div>
                  <div className="text-xs text-muted-foreground">{consultant.role}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="mb-2">AI-Assisted Mapping</div>
                      <p className="text-xs text-muted-foreground">
                        "I've analyzed the data patterns. Tag_305 shows velocity characteristics - 
                        mapping to Conveyor Speed (m/s) with 0.1x conversion factor."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                  <div className="text-xs text-muted-foreground mb-2">Detected Humidity Tag</div>
                  <div className="text-sm mb-2">Tag_402 → Ambient Humidity (%)</div>
                  <Button size="sm" className="w-full bg-success text-success-foreground">
                    Accept AI Suggestion
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-xs text-muted-foreground mb-3">Asset Hierarchy</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Pune Plant</span>
                    </div>
                    <div className="flex items-center gap-2 ml-6">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Packaging Line 1</span>
                    </div>
                    <div className="flex items-center gap-2 ml-12">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Machine 02 (PLC_B1)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span>Validating mappings in real-time</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mapping Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3>Mapping Progress</h3>
                  <Badge variant="outline">Step {mappingStep + 1} of 3</Badge>
                </div>
                
                <div className="flex items-center gap-4">
                  {["Raw Data", "AI Analysis", "Validated Mapping"].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 flex-1">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                        idx <= mappingStep 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {idx < mappingStep ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                      </div>
                      <div className="text-sm">{step}</div>
                      {idx < 2 && <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />}
                    </div>
                  ))}
                </div>

                {mappingStep < 2 && (
                  <Button 
                    onClick={() => setMappingStep(Math.min(2, mappingStep + 1))}
                    className="mt-4 w-full bg-primary"
                  >
                    Next Step
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Raw Data Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Card className="border-secondary/50 bg-secondary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3>Raw Input Stream</h3>
                  <Badge variant="outline" className="font-mono text-xs">
                    Device: {phase4MappingExample.raw.device_id}
                  </Badge>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30 font-mono text-sm overflow-x-auto">
                  <pre>{JSON.stringify(phase4MappingExample.raw, null, 2)}</pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transformation Animation */}
          {mappingStep >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="flex items-center gap-4 px-6 py-3 rounded-lg bg-primary/10 border-2 border-primary/50">
                <Sparkles className="h-5 w-5 text-primary" />
                <motion.div
                  className="text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Applying AI-assisted contextualization...
                </motion.div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </motion.div>
          )}

          {/* Enriched Output */}
          {mappingStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-success/50 bg-success/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3>Enriched Output</h3>
                    <Badge className="bg-success text-success-foreground">Validated</Badge>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-success/10 border border-success/30 font-mono text-sm overflow-x-auto">
                    <pre>{JSON.stringify(phase4MappingExample.enriched, null, 2)}</pre>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {phase4MappingExample.enriched.signals.map((signal, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-card border border-border">
                        <div className="text-xs text-muted-foreground mb-1">{signal.name}</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg tabular-nums">{signal.value}</span>
                          <span className="text-xs text-muted-foreground">{signal.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Mapping Summary */}
          {mappingStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Digital Twin Created Successfully
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-card border border-border">
                      <div className="text-2xl tabular-nums mb-1">566</div>
                      <div className="text-xs text-muted-foreground">Tags Mapped</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card border border-border">
                      <div className="text-2xl tabular-nums mb-1">4</div>
                      <div className="text-xs text-muted-foreground">Machines Modeled</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card border border-border">
                      <div className="text-2xl tabular-nums mb-1">98%</div>
                      <div className="text-xs text-muted-foreground">AI Accuracy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
