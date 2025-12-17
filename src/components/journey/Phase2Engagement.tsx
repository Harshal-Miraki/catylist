import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Lightbulb, Target, Users, CheckCircle2, Zap, Clock } from "lucide-react";
import { phase2StickyNotes, phase2Checklist, consultant } from "../../lib/journey-data";
import { useState, useEffect } from "react";

export function Phase2Engagement() {
  const [selectedNotes, setSelectedNotes] = useState<number[]>([]);
  const [pilotStarted, setPilotStarted] = useState(false);
  const [checklist, setChecklist] = useState(phase2Checklist);

  const toggleNote = (id: number) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter((n) => n !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  };

  const handleStartPilot = () => {
    setPilotStarted(true);
    // Animate checklist items completing
    checklist.forEach((item, idx) => {
      setTimeout(() => {
        setChecklist((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, completed: true } : c))
        );
      }, (idx + 1) * 1000);
    });
  };

  useEffect(() => {
    if (selectedNotes.length >= 3) {
      // Auto-suggest pilot when enough pain points selected
      setTimeout(() => setPilotStarted(false), 100);
    }
  }, [selectedNotes]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      quality: "bg-destructive/10 border-destructive/50 text-destructive",
      reliability: "bg-accent/10 border-accent/50 text-accent",
      process: "bg-primary/10 border-primary/50 text-primary",
      visibility: "bg-success/10 border-success/50 text-success",
      supply: "bg-secondary/10 border-secondary/50",
      equipment: "bg-destructive/10 border-destructive/50 text-destructive",
      environment: "bg-accent/10 border-accent/50 text-accent",
    };
    return colors[category] || "bg-muted border-border";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Badge className="mb-4 bg-primary text-primary-foreground">Phase 2</Badge>
        <h1 className="text-4xl mb-2">The Whiteboard Workshop</h1>
        <p className="text-muted-foreground text-lg">
          Discovery Session - Miraki Labs Engagement
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Consultant Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-8 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl">
                  {consultant.avatar}
                </div>
                <div>
                  <h3>{consultant.name}</h3>
                  <p className="text-sm text-muted-foreground">{consultant.role}</p>
                  <Badge variant="outline" className="mt-1 text-xs">{consultant.company}</Badge>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-sm text-muted-foreground">Expertise</div>
                <div className="space-y-2">
                  {consultant.expertise.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-start gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="mb-1">Consultant Notes</div>
                    <p className="text-muted-foreground text-xs">
                      "Based on the workshop, I recommend starting with Packaging Line 1 
                      as the pilot. Clear correlation between humidity and defects detected."
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 text-sm text-success">
                  <Target className="h-4 w-4" />
                  <span>{selectedNotes.length} pain points prioritized</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Workshop Board */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Start Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-success/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">Miraki 4-Week OEE Pilot</h3>
                    <p className="text-sm text-muted-foreground">
                      Quick-start solution with fixed scope and guaranteed outcomes
                    </p>
                  </div>
                  <Button
                    onClick={handleStartPilot}
                    disabled={pilotStarted}
                    className="bg-primary text-primary-foreground"
                  >
                    {pilotStarted ? "Starting..." : "Select Pilot"}
                  </Button>
                </div>

                {pilotStarted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3 pt-4 border-t border-border"
                  >
                    {checklist.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.3 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
                      >
                        {item.completed ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          </motion.div>
                        ) : (
                          <Clock className="h-5 w-5 text-muted-foreground animate-pulse" />
                        )}
                        <span className={`text-sm ${item.completed ? "text-success" : ""}`}>
                          {item.text}
                        </span>
                        {item.completed && (
                          <Badge className="ml-auto bg-success text-success-foreground">
                            ✓ Done
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Card className="bg-accent/10 border-accent/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-accent" />
                  <div className="flex-1">
                    <div className="text-sm">Interactive Workshop</div>
                    <div className="text-xs text-muted-foreground">
                      Click on sticky notes to prioritize pain points for the pilot project
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sticky Notes Board */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Card className="border-2 border-dashed border-border bg-muted/20">
              <CardContent className="p-8">
                <h3 className="mb-6 flex items-center gap-2">
                  <span>Pain Points Identified</span>
                  <Badge variant="outline">{phase2StickyNotes.length} items</Badge>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {phase2StickyNotes.map((note, idx) => {
                    const isSelected = selectedNotes.includes(note.id);
                    return (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          rotate: idx % 2 === 0 ? 2 : -2 
                        }}
                        transition={{ delay: 0.8 + idx * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.05, rotate: 0 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button
                          onClick={() => toggleNote(note.id)}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                            isSelected 
                              ? `${getCategoryColor(note.category)} shadow-lg` 
                              : "bg-amber-50 border-amber-200 hover:shadow-md"
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="text-sm">{note.text}</div>
                            <div className="flex items-center justify-between">
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                              >
                                {note.category}
                              </Badge>
                              {note.priority === "high" && (
                                <div className="h-2 w-2 rounded-full bg-destructive" />
                              )}
                              {isSelected && (
                                <CheckCircle2 className="h-4 w-4 text-current" />
                              )}
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Workshop Outcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <Card className="border-success/50 bg-success/5">
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Workshop Outcomes
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Pilot Line Selected</div>
                    <div>Packaging Line 1</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Timeline</div>
                    <div>2 weeks implementation</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Key Focus</div>
                    <div>Quality & Downtime</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Success Metric</div>
                    <div>50% defect reduction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
