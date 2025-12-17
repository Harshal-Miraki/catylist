import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Network,
  Plus,
  Settings,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Wifi,
  Server,
  Activity,
  AlertCircle,
  Cable,
  Radio,
  Cloud,
  Database,
  FileText,
  Router,
  Trash2,
  Edit,
  Play,
  Pause,
} from "lucide-react";
import { edgeGateways, protocols, machines } from "../../lib/data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";
import { Switch } from "../ui/switch";

interface Gateway {
  id: string;
  name: string;
  plant: string;
  ipAddress: string;
  status: string;
  uptime: string;
  lastSync: string;
  throughput: string;
  machinesConnected: number;
}

interface Device {
  id: string;
  name: string;
  type: string;
  protocol: string;
  ipAddress: string;
  status: string;
  lineId?: string;
}

const protocolIcons: Record<string, any> = {
  "OPC-UA": Network,
  MQTT: Radio,
  "Modbus TCP/IP": Cable,
  "Ethernet/IP": Wifi,
  PROFINET: Router,
  "SQL Database": Database,
  "REST API": Cloud,
  "CSV Import": FileText,
};

export function EnhancedConnectPage() {
  const [gateways, setGateways] = useState<Gateway[]>(edgeGateways);
  const [devices, setDevices] = useState<Device[]>(machines);
  const [enabledProtocols, setEnabledProtocols] = useState<string[]>(
    protocols.filter(p => p.enabled).map(p => p.id)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);
  const [isAddingGateway, setIsAddingGateway] = useState(false);
  const [isAddingDevice, setIsAddingDevice] = useState(false);

  // Form states
  const [newGateway, setNewGateway] = useState({
    name: "",
    plant: "",
    ipAddress: "",
  });

  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "PLC",
    protocol: "OPC-UA",
    ipAddress: "",
    lineId: "",
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Connection status refreshed");
    }, 1500);
  };

  const handleAddGateway = () => {
    if (!newGateway.name || !newGateway.plant || !newGateway.ipAddress) {
      toast.error("Please fill all required fields");
      return;
    }

    const gateway: Gateway = {
      id: `edge-${Date.now()}`,
      name: newGateway.name,
      plant: newGateway.plant,
      ipAddress: newGateway.ipAddress,
      status: "connected",
      uptime: "0.0%",
      lastSync: "Just now",
      throughput: "0 MB/s",
      machinesConnected: 0,
    };

    setGateways([...gateways, gateway]);
    setNewGateway({ name: "", plant: "", ipAddress: "" });
    setIsAddingGateway(false);
    toast.success(`Gateway "${gateway.name}" added successfully!`);
  };

  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.ipAddress) {
      toast.error("Please fill all required fields");
      return;
    }

    const device: Device = {
      id: `m-${Date.now()}`,
      name: newDevice.name,
      type: newDevice.type,
      protocol: newDevice.protocol,
      ipAddress: newDevice.ipAddress,
      status: "connected",
      lineId: newDevice.lineId || undefined,
    };

    setDevices([...devices, device]);
    setNewDevice({ name: "", type: "PLC", protocol: "OPC-UA", ipAddress: "", lineId: "" });
    setIsAddingDevice(false);
    toast.success(`Device "${device.name}" added successfully!`);
  };

  const handleConfigureGateway = (gateway: Gateway) => {
    setSelectedGateway(gateway);
    toast.info(`Opening configuration for ${gateway.name}`);
  };

  const handleToggleProtocol = (protocolId: string) => {
    setEnabledProtocols(prev =>
      prev.includes(protocolId)
        ? prev.filter(p => p !== protocolId)
        : [...prev, protocolId]
    );
    toast.success(`Protocol ${protocolId} ${enabledProtocols.includes(protocolId) ? 'disabled' : 'enabled'}`);
  };

  const handleDeleteDevice = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    setDevices(devices.filter(d => d.id !== deviceId));
    toast.success(`Device "${device?.name}" removed`);
  };

  const handleToggleDevice = (deviceId: string) => {
    setDevices(devices.map(d =>
      d.id === deviceId
        ? { ...d, status: d.status === "connected" ? "disconnected" : "connected" }
        : d
    ));
    const device = devices.find(d => d.id === deviceId);
    toast.success(`Device "${device?.name}" ${device?.status === "connected" ? "disconnected" : "connected"}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "syncing":
        return <RefreshCw className="h-5 w-5 text-accent animate-spin" />;
      case "disconnected":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-success text-success-foreground">Connected</Badge>;
      case "syncing":
        return <Badge className="bg-accent text-accent-foreground">Syncing</Badge>;
      case "disconnected":
        return <Badge variant="outline" className="border-destructive text-destructive">Disconnected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>CONNECT Layer</h1>
          <p className="text-muted-foreground mt-1">
            Edge gateways, devices & protocol configuration
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Gateways</div>
                <div className="text-xl md:text-2xl tabular-nums">{gateways.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Connected Devices</div>
                <div className="text-xl md:text-2xl tabular-nums">
                  {devices.filter(d => d.status === "connected").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Network className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Active Protocols</div>
                <div className="text-xl md:text-2xl tabular-nums">{enabledProtocols.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Database className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Data Points</div>
                <div className="text-xl md:text-2xl tabular-nums">2.4k</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gateways" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gateways">Edge Gateways</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="protocols">Protocols</TabsTrigger>
        </TabsList>

        {/* Gateways Tab */}
        <TabsContent value="gateways" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3>Edge Gateway Management</h3>
            <Dialog open={isAddingGateway} onOpenChange={setIsAddingGateway}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Gateway</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Edge Gateway</DialogTitle>
                  <DialogDescription>
                    Configure a new edge gateway for data collection
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gateway-name">Gateway Name *</Label>
                    <Input
                      id="gateway-name"
                      placeholder="Edge Gateway Mumbai-001"
                      value={newGateway.name}
                      onChange={(e) => setNewGateway({ ...newGateway, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plant-name">Plant *</Label>
                    <Input
                      id="plant-name"
                      placeholder="Mumbai Manufacturing Plant"
                      value={newGateway.plant}
                      onChange={(e) => setNewGateway({ ...newGateway, plant: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ip-address">IP Address *</Label>
                    <Input
                      id="ip-address"
                      placeholder="192.168.1.100"
                      value={newGateway.ipAddress}
                      onChange={(e) => setNewGateway({ ...newGateway, ipAddress: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddGateway} className="w-full">
                    Add Gateway
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {gateways.map((gateway) => (
              <motion.div
                key={gateway.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(gateway.status)}
                        <div>
                          <CardTitle className="text-base">{gateway.name}</CardTitle>
                          <CardDescription className="text-xs">{gateway.plant}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(gateway.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">IP Address</div>
                        <div className="tabular-nums">{gateway.ipAddress}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Uptime</div>
                        <div className="tabular-nums">{gateway.uptime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Throughput</div>
                        <div className="tabular-nums">{gateway.throughput}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Devices</div>
                        <div className="tabular-nums">{gateway.machinesConnected}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={() => handleConfigureGateway(gateway)}
                      >
                        <Settings className="h-3 w-3" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 gap-2">
                        <Activity className="h-3 w-3" />
                        Monitor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3>Connected Devices</h3>
            <Dialog open={isAddingDevice} onOpenChange={setIsAddingDevice}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Device</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Device</DialogTitle>
                  <DialogDescription>
                    Connect a new device to the platform
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="device-name">Device Name *</Label>
                    <Input
                      id="device-name"
                      placeholder="CNC Lathe 05"
                      value={newDevice.name}
                      onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="device-type">Device Type *</Label>
                    <Select value={newDevice.type} onValueChange={(value) => setNewDevice({ ...newDevice, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PLC">PLC</SelectItem>
                        <SelectItem value="CNC">CNC Machine</SelectItem>
                        <SelectItem value="Robot">Robot</SelectItem>
                        <SelectItem value="Sensor">Sensor</SelectItem>
                        <SelectItem value="Drive">Motor Drive</SelectItem>
                        <SelectItem value="Camera">Vision Camera</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="protocol">Protocol *</Label>
                    <Select value={newDevice.protocol} onValueChange={(value) => setNewDevice({ ...newDevice, protocol: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPC-UA">OPC-UA</SelectItem>
                        <SelectItem value="Modbus TCP">Modbus TCP/IP</SelectItem>
                        <SelectItem value="MQTT">MQTT</SelectItem>
                        <SelectItem value="Ethernet/IP">Ethernet/IP</SelectItem>
                        <SelectItem value="REST API">REST API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="device-ip">IP Address *</Label>
                    <Input
                      id="device-ip"
                      placeholder="192.168.1.75"
                      value={newDevice.ipAddress}
                      onChange={(e) => setNewDevice({ ...newDevice, ipAddress: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddDevice} className="w-full">
                    Add Device
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {devices.map((device) => (
              <Card key={device.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(device.status)}
                      <div>
                        <div className="text-sm">{device.name}</div>
                        <div className="text-xs text-muted-foreground">{device.type}</div>
                      </div>
                    </div>
                    {getStatusBadge(device.status)}
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protocol:</span>
                      <span>{device.protocol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IP:</span>
                      <span className="tabular-nums">{device.ipAddress}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8"
                      onClick={() => handleToggleDevice(device.id)}
                    >
                      {device.status === "connected" ? (
                        <Pause className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-8">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8"
                      onClick={() => handleDeleteDevice(device.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Protocols Tab */}
        <TabsContent value="protocols" className="space-y-4">
          <h3>Supported Protocols</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {protocols.map((protocol) => {
              const Icon = protocolIcons[protocol.name] || Network;
              const isEnabled = enabledProtocols.includes(protocol.id);
              
              return (
                <Card key={protocol.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg ${isEnabled ? 'bg-primary/10' : 'bg-muted'} flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${isEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <div className="text-sm">{protocol.name}</div>
                        </div>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={() => handleToggleProtocol(protocol.id)}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {isEnabled ? `${devices.filter(d => d.protocol === protocol.name).length} devices connected` : 'Disabled'}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
