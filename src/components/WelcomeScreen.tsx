import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BookOpen, Layers, ArrowRight, Sparkles } from "lucide-react";
import logo from "figma:asset/5f422d3b79bd0f7b20746e8d1ad711e2284c5bb9.png";

interface WelcomeScreenProps {
  onSelectMode: (mode: "platform" | "journey") => void;
}

export function WelcomeScreen({ onSelectMode }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <img src={logo} alt="Miraki Labs" className="h-16 w-auto mx-auto mb-6" />
          <h1 className="text-4xl mb-4">Manufacturing Intelligence Platform</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your factory operations from chaos to clarity with AI-powered insights 
            and real-time analytics
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-primary to-success text-white px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Connected Intelligence for Manufacturing
          </Badge>
        </motion.div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Platform View */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary hover:shadow-xl transition-all cursor-pointer h-full group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <Layers className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-2">Platform View</h2>
                    <p className="text-sm text-muted-foreground">
                      Explore the complete Miraki MIP platform with all 5 core layers
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>CONNECT - Machine connectivity & edge gateways</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>STRUCTURE - Data contextualization & digital twin</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>ANALYZE - Dashboards & advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>OPERATE - Real-time rules & operator guidance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>BUILD - AI-powered dashboard builder</span>
                  </div>
                </div>

                <Button
                  onClick={() => onSelectMode("platform")}
                  className="w-full bg-primary text-primary-foreground group-hover:bg-primary/90"
                >
                  Launch Platform
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Journey View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="border-2 border-accent/50 bg-gradient-to-br from-accent/5 to-accent/10 hover:border-accent hover:shadow-xl transition-all cursor-pointer h-full group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-accent/20 group-hover:bg-accent/30 transition-colors">
                    <BookOpen className="h-8 w-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-2">Customer Journey</h2>
                    <p className="text-sm text-muted-foreground">
                      Experience the complete transformation story across 6 phases
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Phase 1: Factory in Chaos - Problem discovery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Phase 2: Whiteboard Workshop - Scoping session</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Phase 3: Digital Connection - Implementation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Phase 4: Building Digital Twin - Modeling</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Phase 5: Guided Operations - Action & optimization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Phase 6: The New Reality - Measurable outcomes</span>
                  </div>
                </div>

                <Button
                  onClick={() => onSelectMode("journey")}
                  className="w-full bg-accent text-accent-foreground group-hover:bg-accent/90"
                >
                  Start Journey
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">70.5%</div>
                  <div className="text-sm text-muted-foreground">Defect Reduction</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">44.8%</div>
                  <div className="text-sm text-muted-foreground">Downtime Reduction</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">₹1.2 Cr</div>
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2025 Miraki Labs • Manufacturing Intelligence Platform v2.4.1</p>
        </div>
      </div>
    </div>
  );
}
