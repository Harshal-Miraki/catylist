import { ReactNode, useState } from "react";
import { 
  Network, 
  Database, 
  BarChart3, 
  Settings, 
  Boxes,
  Sparkles,
  ChevronDown,
  User,
  Bell,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { plants } from "../lib/data";
import logo from "figma:asset/5f422d3b79bd0f7b20746e8d1ad711e2284c5bb9.png";

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState("pune-1");

  const menuItems = [
    { id: "overview", label: "OVERVIEW", icon: Boxes, badge: null },
    { id: "connect", label: "CONNECT", icon: Network, badge: "3" },
    { id: "structure", label: "STRUCTURE", icon: Database, badge: null },
    { id: "analyze", label: "ANALYZE", icon: BarChart3, badge: "2" },
    { id: "solutions", label: "SOLUTIONS", icon: Sparkles, badge: null, premium: true },
    { id: "operate", label: "OPERATE", icon: Settings, badge: null },
    { id: "build", label: "BUILD", icon: Boxes, badge: null },
    { id: "users", label: "USERS", icon: User, badge: null },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b border-sidebar-border">
          <img src={logo} alt="Miraki Labs" className="h-10 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                } ${item.premium ? "border border-accent/30" : ""}`}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1 text-left text-sm">{item.label}</span>
                {item.premium && (
                  <Badge className="bg-gradient-to-r from-accent to-primary text-white border-0 text-xs h-5 px-2">
                    Premium
                  </Badge>
                )}
                {item.badge && !item.premium && (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground h-5 min-w-5 px-1.5">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground">
            <div>Version 2.4.1</div>
            <div className="mt-1">© 2025 Miraki Labs</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={selectedPlant} onValueChange={setSelectedPlant}>
              <SelectTrigger className="w-64 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {plants.map((plant) => (
                  <SelectItem key={plant.id} value={plant.id}>
                    <div>
                      <div>{plant.name}</div>
                      <div className="text-xs text-muted-foreground">{plant.location}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Anita Sharma</div>
                    <div className="text-xs text-muted-foreground">Process Engineer</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Team Management</DropdownMenuItem>
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
