import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Lock, Mail, Eye, EyeOff, LogIn, Factory, Brain } from "lucide-react";
import { users, type User } from "../lib/data";
import { toast } from "sonner@2.0.3";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password && u.status === "active");
      
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        onLogin(user);
      } else {
        toast.error("Invalid credentials", {
          description: "Please check your email and password",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (demoUser: User) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    toast.info("Demo credentials loaded", {
      description: "Click Login to continue",
    });
  };

  // Demo accounts for quick access
  const demoAccounts = [
    { name: "Admin", user: users[0], color: "primary" },
    { name: "Plant Manager", user: users[1], color: "accent" },
    { name: "Operator", user: users[2], color: "success" },
    { name: "Maintenance", user: users[3], color: "secondary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center"
      >
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center">
              <Factory className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl">Miraki MIP</h1>
              <p className="text-muted-foreground">Manufacturing Intelligence Platform</p>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-lg">AI-Powered Solutions</div>
                  <div className="text-sm text-muted-foreground">Real-time insights for manufacturing</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span>Predictive Maintenance & Quality Control</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span>Energy Optimization & Anomaly Detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span>Production Forecasting & Analytics</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">Quick Demo Access</div>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((demo, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin(demo.user)}
                  className="justify-start gap-2"
                >
                  <div className={`h-2 w-2 rounded-full bg-${demo.color}`} />
                  {demo.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your solutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@miraki.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground mb-3">Demo Credentials:</div>
              <div className="space-y-2 text-xs">
                {demoAccounts.map((demo, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleDemoLogin(demo.user)}
                    className="p-2 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`text-${demo.color}`}>{demo.name}</div>
                        <div className="text-muted-foreground">{demo.user.email}</div>
                      </div>
                      <div className="text-muted-foreground">{demo.user.password}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
