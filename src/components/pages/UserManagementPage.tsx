import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Shield,
  Building,
  User,
  Wrench,
  Zap,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Lock,
  Mail,
  Calendar,
  Clock,
  Search,
  Filter,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";
import { users as initialUsers, userRoles, plants, solutionsMarketplace, type User } from "../../lib/data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

const roleIconMap: Record<string, any> = {
  Shield,
  Building,
  User,
  Wrench,
  Zap,
  CheckCircle,
};

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "operator",
    plantId: "pune-1",
    assignedSolutions: [] as string[],
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase();
    setNewUser({ ...newUser, password });
    toast.success("Password generated");
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill all required fields");
      return;
    }

    // Check if email already exists
    if (users.some(u => u.email === newUser.email)) {
      toast.error("Email already exists");
      return;
    }

    const user: User = {
      id: `user-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      plantId: newUser.plantId,
      assignedSolutions: newUser.assignedSolutions,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: "Never",
      status: "active",
    };

    setUsers([...users, user]);
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "operator",
      plantId: "pune-1",
      assignedSolutions: [],
    });
    setIsAddingUser(false);
    
    toast.success("User created successfully!", {
      description: `Login credentials: ${user.email} / ${user.password}`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user?.role === "admin" && users.filter(u => u.role === "admin").length === 1) {
      toast.error("Cannot delete the last admin user");
      return;
    }

    setUsers(users.filter(u => u.id !== userId));
    toast.success(`User "${user?.name}" deleted`);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId
        ? { ...u, status: u.status === "active" ? "inactive" : "active" }
        : u
    ));
    toast.success("User status updated");
  };

  const handleCopyCredentials = (user: User) => {
    navigator.clipboard.writeText(`Email: ${user.email}\nPassword: ${user.password}`);
    toast.success("Credentials copied to clipboard");
  };

  const toggleSolutionAssignment = (solution: string) => {
    setNewUser({
      ...newUser,
      assignedSolutions: newUser.assignedSolutions.includes(solution)
        ? newUser.assignedSolutions.filter(s => s !== solution)
        : [...newUser.assignedSolutions, solution],
    });
  };

  const getRoleIcon = (roleId: string) => {
    const role = userRoles.find(r => r.id === roleId);
    const Icon = roleIconMap[role?.icon || "User"] || User;
    return Icon;
  };

  const getRoleColor = (roleId: string) => {
    const role = userRoles.find(r => r.id === roleId);
    return role?.color || "muted";
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage users and assign solutions
          </p>
        </div>
        <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user and assign solutions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Rajesh Kumar"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rajesh@miraki.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <Button type="button" variant="outline" onClick={generatePassword}>
                    Generate
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {userRoles.map(role => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plant">Plant *</Label>
                  <Select value={newUser.plantId} onValueChange={(value) => setNewUser({ ...newUser, plantId: value })}>
                    <SelectTrigger>
                      <SelectValue />
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
              </div>

              <div className="space-y-2">
                <Label>Assign Solutions</Label>
                <div className="p-3 rounded-lg border border-border max-h-64 overflow-y-auto space-y-2">
                  {solutionsMarketplace.filter(s => s.isPurchased).map(solution => (
                    <div
                      key={solution.id}
                      onClick={() => toggleSolutionAssignment(solution.id)}
                      className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer"
                    >
                      <Checkbox checked={newUser.assignedSolutions.includes(solution.id)} />
                      <div className="flex-1">
                        <div className="text-sm">{solution.name}</div>
                        <div className="text-xs text-muted-foreground">{solution.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleAddUser} className="w-full">
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Users</div>
                <div className="text-xl md:text-2xl tabular-nums">{users.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Active Users</div>
                <div className="text-xl md:text-2xl tabular-nums">
                  {users.filter(u => u.status === "active").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Admins</div>
                <div className="text-xl md:text-2xl tabular-nums">
                  {users.filter(u => u.role === "admin").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Building className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Plants</div>
                <div className="text-xl md:text-2xl tabular-nums">{plants.length}</div>
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
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {userRoles.map(role => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.map((user) => {
          const role = userRoles.find(r => r.id === user.role);
          const plant = plants.find(p => p.id === user.plantId);
          const Icon = getRoleIcon(user.role);

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`h-12 w-12 rounded-full bg-${getRoleColor(user.role)}/10 flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 text-${getRoleColor(user.role)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{user.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {role?.name}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              user.status === "active"
                                ? "bg-success/10 border-success/30 text-success"
                                : "bg-muted"
                            }`}
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {plant?.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Last login: {user.lastLogin}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Solutions */}
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Assigned Solutions</div>
                      <div className="flex flex-wrap gap-1">
                        {user.assignedSolutions.length > 0 ? (
                          user.assignedSolutions.map((solId) => {
                            const solution = solutionsMarketplace.find(s => s.id === solId);
                            return (
                              <Badge key={solId} variant="outline" className="text-xs">
                                {solution?.name}
                              </Badge>
                            );
                          })
                        ) : (
                          <span className="text-xs text-muted-foreground">No solutions assigned</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyCredentials(user)}
                        className="gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        <span className="hidden lg:inline">Credentials</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.role === "admin" && users.filter(u => u.role === "admin").length === 1}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3>No users found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
