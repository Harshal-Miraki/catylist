import { useState } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Layout } from "./components/Layout";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LoginPage } from "./components/LoginPage";
import { FloatingAIAssistant } from "./components/FloatingAIAssistant";
import { PlatformOverview } from "./components/pages/PlatformOverview";
import { EnhancedConnectPage } from "./components/pages/EnhancedConnectPage";
import { EnhancedStructurePage } from "./components/pages/EnhancedStructurePage";
import { EnhancedAnalyzePage } from "./components/pages/EnhancedAnalyzePage";
import { EnhancedSolutionsPage } from "./components/pages/EnhancedSolutionsPage";
import { OperatePage } from "./components/pages/OperatePage";
import { EnhancedBuildPage } from "./components/pages/EnhancedBuildPage";
import { UserManagementPage } from "./components/pages/UserManagementPage";
import { JourneyNavigation } from "./components/journey/JourneyNavigation";
import { Phase1ProblemDiscovery } from "./components/journey/Phase1ProblemDiscovery";
import { Phase2OnboardPilot } from "./components/journey/Phase2OnboardPilot";
import { Phase3AnalyzeLive } from "./components/journey/Phase3AnalyzeLive";
import { Phase4ActivateSolutions } from "./components/journey/Phase4ActivateSolutions";
import { Phase5SolutionOperation } from "./components/journey/Phase5SolutionOperation";
import { Phase6ScaleAndBuild } from "./components/journey/Phase6ScaleAndBuild";
import { Toaster } from "./components/ui/sonner";
import { BookOpen, Layers, Home, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { type User } from "./lib/data";

export default function App() {
  const [mode, setMode] = useState<"welcome" | "login" | "platform" | "journey">("welcome");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("overview");
  const [currentPhase, setCurrentPhase] = useState(1);
  const [enabledSolutions, setEnabledSolutions] = useState<string[]>([]);

  const toggleSolution = (id: string) => {
    setEnabledSolutions(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setMode("platform");
    // Load user's assigned solutions
    setEnabledSolutions(user.assignedSolutions);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMode("welcome");
    setEnabledSolutions([]);
  };

  const renderPlatformPage = () => {
    switch (currentPage) {
      case "overview":
        return <PlatformOverview />;
      case "connect":
        return <EnhancedConnectPage />;
      case "structure":
        return <EnhancedStructurePage />;
      case "analyze":
        return <EnhancedAnalyzePage enabledSolutions={enabledSolutions} />;
      case "solutions":
        return <EnhancedSolutionsPage enabledSolutions={enabledSolutions} onToggleSolution={toggleSolution} />;
      case "operate":
        return <OperatePage enabledSolutions={enabledSolutions} />;
      case "build":
        return <EnhancedBuildPage />;
      case "users":
        return currentUser?.role === "admin" ? <UserManagementPage /> : <PlatformOverview />;
      default:
        return <PlatformOverview />;
    }
  };

  const renderJourneyPhase = () => {
    switch (currentPhase) {
      case 1:
        return <Phase1ProblemDiscovery />;
      case 2:
        return <Phase2OnboardPilot />;
      case 3:
        return <Phase3AnalyzeLive />;
      case 4:
        return <Phase4ActivateSolutions />;
      case 5:
        return <Phase5SolutionOperation />;
      case 6:
        return <Phase6ScaleAndBuild />;
      default:
        return <Phase1ProblemDiscovery />;
    }
  };

  return (
    <>
      {mode === "welcome" ? (
        <WelcomeScreen 
          onSelectMode={(selectedMode) => {
            if (selectedMode === "platform") {
              setMode("login");
            } else {
              setMode(selectedMode);
            }
          }} 
        />
      ) : mode === "login" ? (
        <LoginPage onLogin={handleLogin} />
      ) : mode === "platform" ? (
        <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
          {/* Mode Toggle */}
          <div className="fixed top-20 right-6 z-50 flex gap-2">
            {currentUser && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card shadow-lg border border-border">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs text-primary">{currentUser.name.charAt(0)}</span>
                </div>
                <div className="text-sm">
                  <div>{currentUser.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.role}</div>
                </div>
              </div>
            )}
            <Button
              onClick={() => setMode("welcome")}
              variant="outline"
              className="gap-2 shadow-lg bg-card"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button
              onClick={() => setMode("journey")}
              className="bg-accent text-accent-foreground gap-2 shadow-lg"
            >
              <BookOpen className="h-4 w-4" />
              View Customer Journey
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2 shadow-lg bg-card"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          
          {renderPlatformPage()}
        </Layout>
      ) : (
        <div className="relative">
          {/* Mode Toggle */}
          <div className="fixed top-6 left-6 z-50 flex gap-2">
            <Button
              onClick={() => setMode("welcome")}
              variant="outline"
              className="gap-2 shadow-lg bg-card"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button
              onClick={() => setMode("platform")}
              variant="outline"
              className="gap-2 shadow-lg bg-card"
            >
              <Layers className="h-4 w-4" />
              Platform View
            </Button>
          </div>

          {/* Journey Navigation */}
          <JourneyNavigation currentPhase={currentPhase} onPhaseChange={setCurrentPhase} />

          {/* Phase Navigation Controls */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-3">
            <Button
              onClick={() => setCurrentPhase(Math.max(1, currentPhase - 1))}
              disabled={currentPhase === 1}
              variant="outline"
              className="bg-card shadow-lg"
            >
              Previous Phase
            </Button>
            <Badge variant="outline" className="px-4 py-2 bg-card">
              Phase {currentPhase} of 6
            </Badge>
            <Button
              onClick={() => setCurrentPhase(Math.min(6, currentPhase + 1))}
              disabled={currentPhase === 6}
              className="bg-primary text-primary-foreground shadow-lg"
            >
              Next Phase
            </Button>
          </div>

          {/* Journey Content with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {renderJourneyPhase()}
            </motion.div>
          </AnimatePresence>

          {/* Floating AI Assistant */}
          <FloatingAIAssistant phase={currentPhase} />
        </div>
      )}
      <Toaster position="top-right" />
    </>
  );
}
