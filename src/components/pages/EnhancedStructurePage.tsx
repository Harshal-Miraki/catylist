import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Factory,
  Plus,
  ChevronRight,
  ChevronDown,
  Settings,
  Trash2,
  Tag,
  ArrowRight,
  Link2,
  Box,
  Database,
  FileJson,
  CheckCircle2,
  AlertCircle,
  Layers,
  Network,
  Activity,
  Gauge,
  Zap,
} from "lucide-react";
import { plants, productionLines, machines, rawTags, mappedSignals, unmappedTags } from "../../lib/data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";
import { ScrollArea } from "../ui/scroll-area";

interface AssetNode {
  id: string;
  name: string;
  type: "plant" | "line" | "machine";
  children?: AssetNode[];
  expanded?: boolean;
  metadata?: any;
}

interface TagMapping {
  tagId: string;
  mappedName: string;
  category: string;
}

export function EnhancedStructurePage() {
  const [assetHierarchy, setAssetHierarchy] = useState<AssetNode[]>(
    plants.map(plant => ({
      id: plant.id,
      name: plant.name,
      type: "plant" as const,
      expanded: true,
      metadata: plant,
      children: productionLines
        .filter(line => line.plantId === plant.id)
        .map(line => ({
          id: line.id,
          name: line.name,
          type: "line" as const,
          expanded: false,
          metadata: line,
          children: machines
            .filter(machine => machine.lineId === line.id)
            .map(machine => ({
              id: machine.id,
              name: machine.name,
              type: "machine" as const,
              metadata: machine,
            })),
        })),
    }))
  );

  const [tagMappings, setTagMappings] = useState<TagMapping[]>(
    mappedSignals.filter(s => s.mapped).map(s => ({
      tagId: s.tagId,
      mappedName: s.mappedName,
      category: s.category,
    }))
  );

  const [unmapped, setUnmapped] = useState(
    [...rawTags.filter(tag => !mappedSignals.find(s => s.tagId === tag.id && s.mapped)), ...unmappedTags]
  );

  const [draggedTag, setDraggedTag] = useState<any>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [isAddingLine, setIsAddingLine] = useState(false);
  const [isAddingMachine, setIsAddingMachine] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState("");
  const [selectedLineId, setSelectedLineId] = useState("");

  const [newLine, setNewLine] = useState({
    name: "",
    capacity: "",
  });

  const [newMachine, setNewMachine] = useState({
    name: "",
    type: "PLC",
    protocol: "OPC-UA",
    ipAddress: "",
  });

  const toggleNode = (nodeId: string, nodes: AssetNode[]): AssetNode[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      if (node.children) {
        return { ...node, children: toggleNode(nodeId, node.children) };
      }
      return node;
    });
  };

  const handleToggleExpand = (nodeId: string) => {
    setAssetHierarchy(toggleNode(nodeId, assetHierarchy));
  };

  const handleDragStart = (tag: any) => {
    setDraggedTag(tag);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDropTarget(targetId);
  };

  const handleDrop = (e: React.DragEvent, targetCategory: string) => {
    e.preventDefault();
    
    if (!draggedTag) return;

    const newMapping: TagMapping = {
      tagId: draggedTag.id,
      mappedName: draggedTag.description || draggedTag.rawName,
      category: targetCategory,
    };

    setTagMappings([...tagMappings, newMapping]);
    setUnmapped(unmapped.filter(t => t.id !== draggedTag.id));
    setDraggedTag(null);
    setDropTarget(null);
    toast.success(`Tag "${draggedTag.rawName}" mapped to ${targetCategory}`);
  };

  const handleUnmap = (tagId: string) => {
    const mapping = tagMappings.find(m => m.tagId === tagId);
    const tag = rawTags.find(t => t.id === tagId);
    
    if (tag) {
      setUnmapped([...unmapped, tag]);
    }
    
    setTagMappings(tagMappings.filter(m => m.tagId !== tagId));
    toast.info(`Tag unmapped`);
  };

  const handleAddLine = () => {
    if (!newLine.name || !newLine.capacity || !selectedPlantId) {
      toast.error("Please fill all required fields");
      return;
    }

    const lineId = `line-${Date.now()}`;
    const newLineNode: AssetNode = {
      id: lineId,
      name: newLine.name,
      type: "line",
      expanded: false,
      metadata: {
        id: lineId,
        name: newLine.name,
        plantId: selectedPlantId,
        status: "idle",
        capacity: parseInt(newLine.capacity),
        currentOutput: 0,
      },
      children: [],
    };

    setAssetHierarchy(assetHierarchy.map(plant => {
      if (plant.id === selectedPlantId) {
        return {
          ...plant,
          children: [...(plant.children || []), newLineNode],
        };
      }
      return plant;
    }));

    setNewLine({ name: "", capacity: "" });
    setIsAddingLine(false);
    toast.success(`Production line "${newLine.name}" added successfully!`);
  };

  const handleAddMachine = () => {
    if (!newMachine.name || !newMachine.ipAddress || !selectedLineId) {
      toast.error("Please fill all required fields");
      return;
    }

    const machineId = `m-${Date.now()}`;
    const newMachineNode: AssetNode = {
      id: machineId,
      name: newMachine.name,
      type: "machine",
      metadata: {
        id: machineId,
        name: newMachine.name,
        lineId: selectedLineId,
        type: newMachine.type,
        protocol: newMachine.protocol,
        ipAddress: newMachine.ipAddress,
        status: "connected",
      },
    };

    setAssetHierarchy(assetHierarchy.map(plant => ({
      ...plant,
      children: plant.children?.map(line => {
        if (line.id === selectedLineId) {
          return {
            ...line,
            children: [...(line.children || []), newMachineNode],
          };
        }
        return line;
      }),
    })));

    setNewMachine({ name: "", type: "PLC", protocol: "OPC-UA", ipAddress: "" });
    setIsAddingMachine(false);
    toast.success(`Machine "${newMachine.name}" added successfully!`);
  };

  const renderAssetNode = (node: AssetNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const Icon = node.type === "plant" ? Factory : node.type === "line" ? Layers : Box;

    return (
      <div key={node.id} className="space-y-1">
        <div
          className={`flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors ${
            level > 0 ? "ml-6" : ""
          }`}
        >
          {hasChildren && (
            <button
              onClick={() => handleToggleExpand(node.id)}
              className="p-1 hover:bg-muted rounded"
            >
              {node.expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-6" />}
          <Icon className={`h-4 w-4 ${
            node.type === "plant" ? "text-primary" : 
            node.type === "line" ? "text-accent" : 
            "text-muted-foreground"
          }`} />
          <span className="flex-1 text-sm">{node.name}</span>
          <Badge variant="outline" className="text-xs">
            {node.type}
          </Badge>
          {node.type === "machine" && node.metadata?.status === "connected" && (
            <CheckCircle2 className="h-3 w-3 text-success" />
          )}
        </div>
        {node.expanded && node.children && (
          <div className="space-y-1">
            {node.children.map(child => renderAssetNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const categories = [
    { id: "speed", name: "Speed", icon: Network, color: "text-primary" },
    { id: "temperature", name: "Temperature", icon: Activity, color: "text-destructive" },
    { id: "pressure", name: "Pressure", icon: Gauge, color: "text-accent" },
    { id: "quality", name: "Quality", icon: CheckCircle2, color: "text-success" },
    { id: "energy", name: "Energy", icon: Zap, color: "text-secondary" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>STRUCTURE Layer</h1>
          <p className="text-muted-foreground mt-1">
            Asset hierarchy & digital twin configuration
          </p>
        </div>
        <Button variant="outline" className="gap-2 w-full sm:w-auto">
          <FileJson className="h-4 w-4" />
          Export Model
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Factory className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Plants</div>
                <div className="text-xl md:text-2xl tabular-nums">{plants.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Layers className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Production Lines</div>
                <div className="text-xl md:text-2xl tabular-nums">
                  {assetHierarchy.reduce((acc, plant) => acc + (plant.children?.length || 0), 0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Box className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Machines</div>
                <div className="text-xl md:text-2xl tabular-nums">{machines.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Tag className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Mapped Tags</div>
                <div className="text-xl md:text-2xl tabular-nums">{tagMappings.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hierarchy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hierarchy">Asset Hierarchy</TabsTrigger>
          <TabsTrigger value="mapping">Tag Mapping</TabsTrigger>
        </TabsList>

        {/* Asset Hierarchy Tab */}
        <TabsContent value="hierarchy" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Asset Tree */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Digital Twin Hierarchy</CardTitle>
                  <div className="flex gap-2">
                    <Dialog open={isAddingLine} onOpenChange={setIsAddingLine}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Plus className="h-3 w-3" />
                          <span className="hidden md:inline">Add Line</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add Production Line</DialogTitle>
                          <DialogDescription>
                            Create a new production line in your asset hierarchy
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="plant-select">Select Plant *</Label>
                            <Select value={selectedPlantId} onValueChange={setSelectedPlantId}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a plant" />
                              </SelectTrigger>
                              <SelectContent>
                                {plants.map(plant => (
                                  <SelectItem key={plant.id} value={plant.id}>
                                    {plant.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="line-name">Line Name *</Label>
                            <Input
                              id="line-name"
                              placeholder="Assembly Line B"
                              value={newLine.name}
                              onChange={(e) => setNewLine({ ...newLine, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="capacity">Capacity (units/hr) *</Label>
                            <Input
                              id="capacity"
                              type="number"
                              placeholder="1200"
                              value={newLine.capacity}
                              onChange={(e) => setNewLine({ ...newLine, capacity: e.target.value })}
                            />
                          </div>
                          <Button onClick={handleAddLine} className="w-full">
                            Add Production Line
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isAddingMachine} onOpenChange={setIsAddingMachine}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Plus className="h-3 w-3" />
                          <span className="hidden md:inline">Add Machine</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add Machine</DialogTitle>
                          <DialogDescription>
                            Add a new machine to a production line
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="line-select">Select Production Line *</Label>
                            <Select value={selectedLineId} onValueChange={setSelectedLineId}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a line" />
                              </SelectTrigger>
                              <SelectContent>
                                {assetHierarchy.flatMap(plant =>
                                  plant.children?.map(line => (
                                    <SelectItem key={line.id} value={line.id}>
                                      {line.name} ({plant.name})
                                    </SelectItem>
                                  )) || []
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="machine-name">Machine Name *</Label>
                            <Input
                              id="machine-name"
                              placeholder="CNC Lathe 06"
                              value={newMachine.name}
                              onChange={(e) => setNewMachine({ ...newMachine, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="machine-type">Machine Type *</Label>
                            <Select value={newMachine.type} onValueChange={(value) => setNewMachine({ ...newMachine, type: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PLC">PLC</SelectItem>
                                <SelectItem value="CNC">CNC Machine</SelectItem>
                                <SelectItem value="Robot">Robot</SelectItem>
                                <SelectItem value="Sensor">Sensor</SelectItem>
                                <SelectItem value="Press">Hydraulic Press</SelectItem>
                                <SelectItem value="Extruder">Extruder</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="machine-protocol">Protocol *</Label>
                            <Select value={newMachine.protocol} onValueChange={(value) => setNewMachine({ ...newMachine, protocol: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="OPC-UA">OPC-UA</SelectItem>
                                <SelectItem value="Modbus TCP">Modbus TCP/IP</SelectItem>
                                <SelectItem value="MQTT">MQTT</SelectItem>
                                <SelectItem value="Ethernet/IP">Ethernet/IP</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="machine-ip">IP Address *</Label>
                            <Input
                              id="machine-ip"
                              placeholder="192.168.1.80"
                              value={newMachine.ipAddress}
                              onChange={(e) => setNewMachine({ ...newMachine, ipAddress: e.target.value })}
                            />
                          </div>
                          <Button onClick={handleAddMachine} className="w-full">
                            Add Machine
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <CardDescription>
                  Plant → Production Line → Machine hierarchy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-1">
                    {assetHierarchy.map(node => renderAssetNode(node))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Info Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hierarchy Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-sm mb-2">Digital Twin Benefits</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Virtualize physical assets</li>
                    <li>• Real-time monitoring</li>
                    <li>• Predictive analytics</li>
                    <li>• Process optimization</li>
                  </ul>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Assets:</span>
                    <span className="tabular-nums">
                      {plants.length + 
                       assetHierarchy.reduce((acc, p) => acc + (p.children?.length || 0), 0) + 
                       machines.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connected:</span>
                    <span className="tabular-nums text-success">
                      {machines.filter(m => m.status === "connected").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Points:</span>
                    <span className="tabular-nums">{rawTags.length + unmappedTags.length}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2" size="sm">
                  <Settings className="h-3 w-3" />
                  Configure Hierarchy
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tag Mapping Tab */}
        <TabsContent value="mapping" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Unmapped Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Unmapped Tags</CardTitle>
                <CardDescription>
                  Drag tags to map them to categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {unmapped.length === 0 ? (
                      <div className="text-center py-8 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        All tags mapped!
                      </div>
                    ) : (
                      unmapped.map(tag => (
                        <motion.div
                          key={tag.id}
                          draggable
                          onDragStart={() => handleDragStart(tag)}
                          className="p-3 rounded-lg border border-border bg-card hover:border-primary/50 cursor-move transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm truncate">{tag.rawName}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {tag.description}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2 text-xs">
                            <Badge variant="outline">{tag.dataType}</Badge>
                            <Badge variant="outline">{tag.sampleRate}</Badge>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Drop Zones */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Category Mapping</CardTitle>
                <CardDescription>
                  Drop tags into categories to create structured data model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map(category => {
                    const categoryTags = tagMappings.filter(
                      m => m.category.toLowerCase() === category.id
                    );
                    const Icon = category.icon;

                    return (
                      <div
                        key={category.id}
                        onDragOver={(e) => handleDragOver(e, category.id)}
                        onDrop={(e) => handleDrop(e, category.name)}
                        className={`p-4 rounded-lg border-2 border-dashed transition-all ${
                          dropTarget === category.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className={`h-4 w-4 ${category.color}`} />
                          <span className="text-sm">{category.name}</span>
                          <Badge variant="outline" className="ml-auto">
                            {categoryTags.length} tags
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          {categoryTags.map(mapping => {
                            const tag = rawTags.find(t => t.id === mapping.tagId);
                            return (
                              <div
                                key={mapping.tagId}
                                className="flex items-center gap-2 p-2 rounded bg-muted/50"
                              >
                                <Tag className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs flex-1">{mapping.mappedName}</span>
                                <button
                                  onClick={() => handleUnmap(mapping.tagId)}
                                  className="p-1 hover:bg-destructive/10 rounded"
                                >
                                  <Trash2 className="h-3 w-3 text-destructive" />
                                </button>
                              </div>
                            );
                          })}
                          {categoryTags.length === 0 && (
                            <div className="text-xs text-center text-muted-foreground py-2">
                              Drop tags here
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mapping Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mapping Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-2xl tabular-nums">{tagMappings.length}</div>
                  <div className="text-xs text-muted-foreground">Tags Mapped</div>
                </div>
                <div>
                  <div className="text-2xl tabular-nums">{unmapped.length}</div>
                  <div className="text-xs text-muted-foreground">Unmapped</div>
                </div>
                <div>
                  <div className="text-2xl tabular-nums">{categories.length}</div>
                  <div className="text-xs text-muted-foreground">Categories</div>
                </div>
                <div className="ml-auto">
                  <Button className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Save Mapping
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
