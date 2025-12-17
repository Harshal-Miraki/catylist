import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import {
  ShoppingCart,
  Wrench,
  CheckCircle,
  Zap,
  AlertTriangle,
  TrendingUp,
  Clock,
  Truck,
  Users,
  Play,
  Pause,
  Settings,
  DollarSign,
  Star,
  Database,
  Brain,
  UserPlus,
  Shield,
  Building,
  User,
  RefreshCw,
  Check,
  X,
  Info,
  Search,
  Filter,
} from "lucide-react";
import { solutionsMarketplace, users, userRoles, type SolutionMarketplace, type User } from "../../lib/data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

const iconMap: Record<string, any> = {
  Wrench,
  CheckCircle,
  Zap,
  AlertTriangle,
  TrendingUp,
  Clock,
  Truck,
  Users,
  Shield,
  Building,
  User,
};

interface EnhancedSolutionsPageProps {
  enabledSolutions: string[];
  onToggleSolution: (id: string) => void;
}

export function EnhancedSolutionsPage({ enabledSolutions, onToggleSolution }: EnhancedSolutionsPageProps) {
  const [solutions, setSolutions] = useState<SolutionMarketplace[]>(solutionsMarketplace);
  const [allUsers, setAllUsers] = useState<User[]>(users);
  const [selectedSolution, setSelectedSolution] = useState<SolutionMarketplace | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTraining, setIsTraining] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignmentSolutionId, setAssignmentSolutionId] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const categories = ["all", "Maintenance", "Quality", "Energy", "Operations", "Planning", "Logistics", "HR"];

  const filteredSolutions = solutions.filter(sol => {
    const matchesCategory = selectedCategory === "all" || sol.category === selectedCategory;
    const matchesSearch = sol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sol.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePurchase = (solutionId: string) => {
    setSolutions(solutions.map(sol =>
      sol.id === solutionId ? { ...sol, isPurchased: true } : sol
    ));
    toast.success("Solution purchased successfully!", {
      description: "You can now train and activate this solution.",
    });
  };

  const handleStartTraining = (solutionId: string) => {
    const solution = solutions.find(s => s.id === solutionId);
    if (!solution) return;

    if (solution.trainingData.dataPoints < 10000) {
      toast.error("Insufficient data for training", {
        description: `Need at least 10,000 data points. Current: ${solution.trainingData.dataPoints}`,
      });
      return;
    }

    setIsTraining(solutionId);
    toast.info("Training started", {
      description: "AI model training in progress using historical plant data...",
    });

    // Simulate training progress
    let progress = solution.trainingData.trainingProgress;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsTraining(null);
        
        setSolutions(solutions.map(sol =>
          sol.id === solutionId
            ? {
                ...sol,
                trainingData: {
                  ...sol.trainingData,
                  trainingProgress: 100,
                  accuracy: 85 + Math.random() * 10,
                  lastTrained: new Date().toLocaleString(),
                  status: "ready",
                },
              }
            : sol
        ));
        
        toast.success("Training completed!", {
          description: `Model achieved ${(85 + Math.random() * 10).toFixed(1)}% accuracy`,
        });
      } else {
        setSolutions(solutions.map(sol =>
          sol.id === solutionId
            ? {
                ...sol,
                trainingData: {
                  ...sol.trainingData,
                  trainingProgress: progress,
                  status: "training",
                },
              }
            : sol
        ));
      }
    }, 800);
  };

  const handleToggleActive = (solutionId: string) => {
    const solution = solutions.find(s => s.id === solutionId);
    if (!solution) return;

    if (!solution.isPurchased) {
      toast.error("Solution not purchased", {
        description: "Please purchase the solution first",
      });
      return;
    }

    if (solution.trainingData.status !== "ready") {
      toast.error("Model not ready", {
        description: "Please complete training before activating",
      });
      return;
    }

    setSolutions(solutions.map(sol =>
      sol.id === solutionId ? { ...sol, isActive: !sol.isActive } : sol
    ));

    onToggleSolution(solutionId);

    const newStatus = !solution.isActive;
    toast.success(newStatus ? "Solution activated" : "Solution deactivated", {
      description: newStatus ? "Now generating insights for assigned users" : "Insights paused",
    });
  };

  const handleOpenAssignment = (solutionId: string) => {
    setAssignmentSolutionId(solutionId);
    const solution = solutions.find(s => s.id === solutionId);
    if (solution) {
      // Pre-select users who already have this solution
      const usersWithSolution = allUsers
        .filter(u => u.assignedSolutions.includes(solutionId))
        .map(u => u.id);
      setSelectedUsers(usersWithSolution);
    }
    setIsAssigning(true);
  };

  const handleAssignUsers = () => {
    if (selectedUsers.length === 0) {
      toast.error("No users selected");
      return;
    }

    // Update users with new solution assignments
    setAllUsers(allUsers.map(user => {
      if (selectedUsers.includes(user.id)) {
        if (!user.assignedSolutions.includes(assignmentSolutionId)) {
          return {
            ...user,
            assignedSolutions: [...user.assignedSolutions, assignmentSolutionId],
          };
        }
      } else {
        return {
          ...user,
          assignedSolutions: user.assignedSolutions.filter(s => s !== assignmentSolutionId),
        };
      }
      return user;
    }));

    const solution = solutions.find(s => s.id === assignmentSolutionId);
    toast.success("Users updated", {
      description: `${selectedUsers.length} users assigned to ${solution?.name}`,
    });
    setIsAssigning(false);
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(u => u !== userId) : [...prev, userId]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-success text-success-foreground">Ready</Badge>;
      case "training":
        return <Badge className="bg-accent text-accent-foreground">Training...</Badge>;
      case "needs-data":
        return <Badge variant="outline" className="border-destructive text-destructive">Needs Data</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRoleIcon = (roleId: string) => {
    const role = userRoles.find(r => r.id === roleId);
    const Icon = iconMap[role?.icon || "User"] || User;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>AI Solutions Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Enterprise AI solutions trained on your plant data
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-2">
            <ShoppingCart className="h-3 w-3" />
            {solutions.filter(s => s.isPurchased).length} Purchased
          </Badge>
          <Badge variant="outline" className="gap-2">
            <Brain className="h-3 w-3" />
            {solutions.filter(s => s.isActive).length} Active
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Available Solutions</div>
                <div className="text-xl md:text-2xl tabular-nums">{solutions.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Brain className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Active Models</div>
                <div className="text-xl md:text-2xl tabular-nums">
                  {solutions.filter(s => s.isActive).length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Database className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Training Data</div>
                <div className="text-xl md:text-2xl tabular-nums">
                  {(solutions.reduce((acc, s) => acc + s.trainingData.dataPoints, 0) / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Assigned Users</div>
                <div className="text-xl md:text-2xl tabular-nums">
                  {allUsers.filter(u => u.assignedSolutions.length > 0).length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search solutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredSolutions.map((solution) => {
          const Icon = iconMap[solution.icon] || Brain;
          const isCurrentlyTraining = isTraining === solution.id;

          return (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              layout
            >
              <Card className="relative overflow-hidden">
                {solution.isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-primary to-accent" />
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{solution.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{solution.category}</Badge>
                          {solution.isPurchased && (
                            <Badge variant="outline" className="text-xs bg-primary/5">
                              <Check className="h-3 w-3 mr-1" />
                              Owned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-xs line-clamp-2">
                    {solution.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Training Status */}
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs">AI Model Status</div>
                      {getStatusBadge(solution.trainingData.status)}
                    </div>
                    {solution.trainingData.status !== "needs-data" && (
                      <>
                        <Progress value={solution.trainingData.trainingProgress} className="h-2 mb-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{solution.trainingData.trainingProgress.toFixed(0)}% trained</span>
                          {solution.trainingData.status === "ready" && (
                            <span>{solution.trainingData.accuracy.toFixed(1)}% accuracy</span>
                          )}
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Database className="h-3 w-3" />
                      <span>{solution.trainingData.dataPoints.toLocaleString()} data points</span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span>{solution.roi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{solution.implementationTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-accent fill-accent" />
                      <span>{solution.rating} ({solution.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{allUsers.filter(u => u.assignedSolutions.includes(solution.id)).length} assigned</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-border">
                    {!solution.isPurchased ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Purchase - ₹{solution.price.toLocaleString()}/{solution.priceType.slice(0, 2)}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Purchase {solution.name}</DialogTitle>
                            <DialogDescription>
                              Review solution details and confirm purchase
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground mb-1">Price</div>
                                <div className="text-2xl">₹{solution.price.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">{solution.priceType}</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground mb-1">Expected ROI</div>
                                <div className="text-2xl text-success">{solution.roi}</div>
                                <div className="text-xs text-muted-foreground">Return on Investment</div>
                              </div>
                            </div>

                            <div>
                              <div className="text-sm mb-2">Features</div>
                              <div className="space-y-1">
                                {solution.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    <Check className="h-3 w-3 text-success" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className="text-sm mb-2">Data Sources Required</div>
                              <div className="flex flex-wrap gap-2">
                                {solution.dataSources.map((source, idx) => (
                                  <Badge key={idx} variant="outline">{source}</Badge>
                                ))}
                              </div>
                            </div>

                            <Button onClick={() => {
                              handlePurchase(solution.id);
                            }} className="w-full">
                              Confirm Purchase
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartTraining(solution.id)}
                            disabled={isCurrentlyTraining || solution.trainingData.status === "training"}
                            className="gap-2"
                          >
                            {isCurrentlyTraining || solution.trainingData.status === "training" ? (
                              <>
                                <RefreshCw className="h-3 w-3 animate-spin" />
                                Training...
                              </>
                            ) : (
                              <>
                                <Brain className="h-3 w-3" />
                                Train
                              </>
                            )}
                          </Button>

                          <Button
                            size="sm"
                            variant={solution.isActive ? "default" : "outline"}
                            onClick={() => handleToggleActive(solution.id)}
                            disabled={solution.trainingData.status !== "ready"}
                            className="gap-2"
                          >
                            {solution.isActive ? (
                              <>
                                <Pause className="h-3 w-3" />
                                Active
                              </>
                            ) : (
                              <>
                                <Play className="h-3 w-3" />
                                Activate
                              </>
                            )}
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenAssignment(solution.id)}
                          className="w-full gap-2"
                        >
                          <UserPlus className="h-3 w-3" />
                          Assign Users ({allUsers.filter(u => u.assignedSolutions.includes(solution.id)).length})
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* User Assignment Dialog */}
      <Dialog open={isAssigning} onOpenChange={setIsAssigning}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Solution to Users</DialogTitle>
            <DialogDescription>
              Select users who will have access to this solution
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col max-h-[70vh]">
            {/* Header Info - Fixed */}
            <div className="p-3 rounded-lg bg-muted/50 mb-4">
              <div className="text-sm mb-2">
                {solutions.find(s => s.id === assignmentSolutionId)?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                Recommended for: {solutions.find(s => s.id === assignmentSolutionId)?.targetRoles.map(r => userRoles.find(ur => ur.id === r)?.name).join(", ")}
              </div>
            </div>

            {/* Scrollable User List */}
            <div className="flex-1 overflow-y-auto min-h-0 mb-4">
              <div className="space-y-2 pr-2">
                {allUsers.map((user) => {
                  const role = userRoles.find(r => r.id === user.role);
                  const isSelected = selectedUsers.includes(user.id);
                  
                  return (
                    <div
                      key={user.id}
                      onClick={() => toggleUserSelection(user.id)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <Checkbox checked={isSelected} className="self-start sm:self-auto" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm">{user.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {role?.name}
                            </Badge>
                            {user.status === "active" && (
                              <Badge variant="outline" className="text-xs bg-success/10 border-success/30">
                                Active
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{user.email}</div>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {user.assignedSolutions.length} solutions
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Actions - Fixed */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                {selectedUsers.length} users selected
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAssigning(false)} className="flex-1 sm:flex-initial">
                  Cancel
                </Button>
                <Button onClick={handleAssignUsers} className="flex-1 sm:flex-initial">
                  Assign Solution
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {filteredSolutions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3>No solutions found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
