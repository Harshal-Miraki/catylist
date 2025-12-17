import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Network,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Radio,
  Cable,
  Wifi,
  Router,
  Database,
  Cloud,
  FileText,
  Activity,
  User,
  MessageCircle,
} from "lucide-react";
import { edgeGateways, protocols, machines } from "../../lib/data";
import { consultant } from "../../lib/journey-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "sonner@2.0.3";

export function ConnectPage() {
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [showConsultant, setShowConsultant] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-success";
      case "syncing":
        return "text-accent";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-success text-success-foreground">Connected</Badge>;
      case "syncing":
        return <Badge className="bg-accent text-accent-foreground">Syncing</Badge>;
      default:
        return <Badge variant="secondary">Offline</Badge>;
    }
  };

  const iconMap: Record<string, any> = {
    Network, Radio, Cable, Wifi, Router, Database, Cloud, FileText
  };

  const handleConnectDevice = () => {
    toast.success("Edge Gateway Pune-001 successfully connected");
    setShowSetupWizard(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Consultant Helper */}
      {showConsultant && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 w-80"
        >
          <Card className="border-primary/50 bg-primary/5 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                  {consultant.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm">{consultant.name}</div>
                  <div className="text-xs text-muted-foreground">{consultant.role}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConsultant(false)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
              <div className="text-sm text-muted-foreground bg-card p-3 rounded-lg border border-border">
                <p className="mb-2">💡 <strong>Tip:</strong></p>
                <p className="text-xs">
                  For optimal performance, I recommend configuring edge buffering for machines with 
                  intermittent connectivity. This ensures zero data loss during network disruptions.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>CONNECT Layer</h1>
          <p className="text-muted-foreground mt-1">
            Machine Connectivity & Edge Gateway Management
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowConsultant(!showConsultant)}
            className="gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Consultant Help
          </Button>
          <Dialog open={showSetupWizard} onOpenChange={setShowSetupWizard}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground gap-2">
                <Plus className="h-4 w-4" />
                Add New Device
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Connect New Device</DialogTitle>
              <DialogDescription>
                Set up a new edge gateway or machine connection
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Factory Name</Label>
                <Input placeholder="e.g., Miraki Pune Plant" defaultValue="Miraki Pune Plant" />
              </div>
              <div className="space-y-2">
                <Label>Production Line</Label>
                <Input placeholder="e.g., Packaging Line 1" defaultValue="Packaging Line 1" />
              </div>
              <div className="space-y-2">
                <Label>Machine/Device</Label>
                <Input placeholder="e.g., Siemens S7-1500" defaultValue="Siemens S7-1500" />
              </div>
              <div className="space-y-2">
                <Label>IP Address</Label>
                <Input placeholder="192.168.1.101" defaultValue="192.168.1.101" />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleConnectDevice} className="flex-1 bg-primary">
                  Connect Device
                </Button>
                <Button variant="outline" onClick={() => setShowSetupWizard(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Edge Gateway Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {edgeGateways.map((gateway) => (
          <Card key={gateway.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Network className={`h-5 w-5 ${getStatusColor(gateway.status)}`} />
                  <CardTitle className="text-base">{gateway.name}</CardTitle>
                </div>
                {getStatusBadge(gateway.status)}
              </div>
              <CardDescription>{gateway.plant}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="text-muted-foreground">IP Address</div>
                <div className="font-mono">{gateway.ipAddress}</div>
                
                <div className="text-muted-foreground">Uptime</div>
                <div>{gateway.uptime}</div>
                
                <div className="text-muted-foreground">Last Sync</div>
                <div>{gateway.lastSync}</div>
                
                <div className="text-muted-foreground">Throughput</div>
                <div>{gateway.throughput}</div>
                
                <div className="text-muted-foreground">Machines</div>
                <div>{gateway.machinesConnected} connected</div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Restart
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Diagnostics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Protocol Library */}
      <Card>
        <CardHeader>
          <CardTitle>Protocol Library</CardTitle>
          <CardDescription>
            Supported industrial communication protocols and connectors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {protocols.map((protocol) => {
              const Icon = iconMap[protocol.icon] || Network;
              return (
                <div
                  key={protocol.id}
                  className={`p-4 rounded-lg border ${
                    protocol.enabled
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-muted/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${protocol.enabled ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="flex-1">
                      <div className="text-sm">{protocol.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {protocol.enabled ? "Active" : "Disabled"}
                      </div>
                    </div>
                    {protocol.enabled && <CheckCircle2 className="h-4 w-4 text-success" />}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Connected Machines */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Machines</CardTitle>
          <CardDescription>
            Real-time status of all connected industrial equipment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Machine Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Production Line</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Flow</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell>{machine.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{machine.type}</Badge>
                  </TableCell>
                  <TableCell>{machine.lineId}</TableCell>
                  <TableCell>{getStatusBadge(machine.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-success animate-pulse" />
                      <Progress value={75} className="w-20 h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
