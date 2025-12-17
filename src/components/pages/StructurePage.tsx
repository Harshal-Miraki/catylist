import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  ArrowRight,
  Database,
  Layers,
  GitBranch,
  CheckCircle2,
  Settings2,
  Sparkles,
  User,
} from "lucide-react";
import { rawTags, mappedSignals } from "../../lib/data";
import { consultant } from "../../lib/journey-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "sonner@2.0.3";

export function StructurePage() {
  const [mappingProgress, setMappingProgress] = useState(0);

  const handleApplyMapping = () => {
    toast.success("Data mapping applied successfully");
    setMappingProgress(100);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Consultant Collaboration Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-primary/50 bg-gradient-to-r from-primary/5 to-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                {consultant.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{consultant.name} is assisting with mapping</span>
                  <Badge variant="outline" className="text-xs">Live Session</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  "I've validated 245 tags and suggested optimized unit conversions. Review the AI recommendations below."
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-xs text-muted-foreground">AI-Assisted</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>STRUCTURE Layer</h1>
          <p className="text-muted-foreground mt-1">
            Data Contextualization & Digital Twin Mapping
          </p>
        </div>
        <Button onClick={handleApplyMapping} className="bg-primary text-primary-foreground gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Apply All Mappings
        </Button>
      </div>

      {/* Asset Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Hierarchy Builder</CardTitle>
          <CardDescription>
            Organize your factory structure and map devices to production lines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Plant Level */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <Layers className="h-5 w-5 text-primary" />
              <span>Miraki Pune Plant</span>
              <Badge variant="outline" className="ml-auto">Plant</Badge>
            </div>

            {/* Line Level */}
            <div className="ml-8 flex items-center gap-2 p-3 rounded-lg bg-muted">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <span>Packaging Line 1</span>
              <Badge variant="outline" className="ml-auto">Line</Badge>
            </div>

            {/* Machine Level */}
            <div className="ml-16 space-y-2">
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span>Siemens S7-1500 PLC</span>
                <Badge variant="outline" className="ml-auto">Machine</Badge>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span>Oven Zone Controller</span>
                <Badge variant="outline" className="ml-auto">Machine</Badge>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span>Conveyor Motor Drive</span>
                <Badge variant="outline" className="ml-auto">Machine</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Mapping Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Signal Mapping Dashboard</CardTitle>
          <CardDescription>
            Map raw sensor tags to human-readable signal names with unit conversions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Raw Tags */}
            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <span>Raw Tags</span>
                <Badge variant="secondary">{rawTags.length} signals</Badge>
              </h3>
              <div className="space-y-2">
                {rawTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {tag.rawName}
                      </code>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {tag.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mapped Signals */}
            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <span>Mapped Signals</span>
                <Badge className="bg-success text-success-foreground">
                  {mappedSignals.length} configured
                </Badge>
              </h3>
              <div className="space-y-2">
                {mappedSignals.map((signal) => {
                  const tag = rawTags.find(t => t.id === signal.tagId);
                  return (
                    <div
                      key={signal.tagId}
                      className="p-3 rounded-lg border border-success/30 bg-success/5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            <span>{signal.mappedName}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Unit: {signal.unit} • {tag?.rawName}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 text-xs bg-muted/50 p-2 rounded font-mono">
                        {signal.conversion}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stream Processing */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Data Transformation</CardTitle>
          <CardDescription>
            Live stream processing and data enrichment pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Input Stream */}
            <div>
              <Label className="text-muted-foreground mb-2 block">Raw Input Stream</Label>
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30 font-mono text-sm overflow-x-auto">
                <pre>{`{
  "device_id": "PLC_A1",
  "Tag_205": 302,
  "timestamp": "2025-10-10T14:23:45Z"
}`}</pre>
              </div>
            </div>

            {/* Transformation Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <Database className="h-5 w-5 text-primary" />
                <span className="text-sm">Applying Mapping: Oven Zone 2 Temperature</span>
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>

            {/* Output Stream */}
            <div>
              <Label className="text-muted-foreground mb-2 block">Transformed Output</Label>
              <div className="p-4 rounded-lg bg-success/10 border border-success/30 font-mono text-sm overflow-x-auto">
                <pre>{`{
  "plant": "Pune Plant",
  "line": "Packaging 1",
  "signal": "Oven Zone 2 Temperature",
  "value": 151,
  "unit": "°C",
  "timestamp": "2025-10-10T14:23:45Z"
}`}</pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Suggestion Engine */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Mapping Suggestions</CardTitle>
          <CardDescription>
            Intelligent recommendations for unmapped signals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Raw Tag</TableHead>
                <TableHead>Suggested Name</TableHead>
                <TableHead>Suggested Unit</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <code className="text-sm bg-muted px-2 py-1 rounded">Tag_505</code>
                </TableCell>
                <TableCell>Compressor Pressure</TableCell>
                <TableCell>PSI</TableCell>
                <TableCell>
                  <Badge className="bg-success text-success-foreground">95%</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">Accept</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code className="text-sm bg-muted px-2 py-1 rounded">Tag_612</code>
                </TableCell>
                <TableCell>Flow Rate Sensor</TableCell>
                <TableCell>L/min</TableCell>
                <TableCell>
                  <Badge variant="secondary">88%</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">Accept</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
