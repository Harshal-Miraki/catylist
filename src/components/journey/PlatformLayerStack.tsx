import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Network, 
  Database, 
  BarChart3, 
  Settings, 
  Boxes,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface LayerData {
  id: string;
  label: string;
  icon: any;
  color: string;
  description: string;
  feature: string;
  badge?: string;
  premium?: boolean;
}

const layers: LayerData[] = [
  {
    id: "connect",
    label: "CONNECT",
    icon: Network,
    color: "#0043CE",
    description: "Edge Gateway → PLC → Cloud",
    feature: "Fast onboarding with pre-configured IoT kits",
  },
  {
    id: "structure",
    label: "STRUCTURE",
    icon: Database,
    color: "#22C55E",
    description: "Tag Mapper & Templates",
    feature: "Auto-create digital twin using AI-suggested mapping",
  },
  {
    id: "analyze",
    label: "ANALYZE",
    icon: BarChart3,
    color: "#0043CE",
    description: "Analytics Workbench (MVP)",
    feature: "Visualize performance with natural language insights",
    badge: "Crawl",
  },
  {
    id: "solutions",
    label: "SOLUTIONS",
    icon: Sparkles,
    color: "#FFC107",
    description: "AI Expert Suite",
    feature: "Pre-built outcome-focused apps with one-click activation",
    badge: "Walk",
    premium: true,
  },
  {
    id: "operate",
    label: "OPERATE",
    icon: Settings,
    color: "#22C55E",
    description: "Action Delivery",
    feature: "Empower operators with contextual, real-time guidance",
  },
  {
    id: "build",
    label: "BUILD",
    icon: Boxes,
    color: "#3C3C3C",
    description: "Creator Studio",
    feature: "Enterprise users build custom dashboards and solutions",
    badge: "Run",
  },
];

export function PlatformLayerStack() {
  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="mb-2">Platform Architecture</h2>
        <p className="text-muted-foreground">
          6 Integrated Layers for Complete Manufacturing Intelligence
        </p>
      </div>

      <div className="space-y-3">
        {layers.map((layer, idx) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 10 }}
            className="cursor-pointer"
          >
            <Card className="border-2 hover:border-primary/50 transition-all relative overflow-hidden group">
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, ${layer.color}10 0%, transparent 100%)`,
                }}
              />

              <CardContent className="p-4 relative z-10">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 relative ${
                      layer.premium ? "bg-gradient-to-br from-accent/20 to-primary/20" : ""
                    }`}
                    style={{ backgroundColor: layer.premium ? undefined : `${layer.color}20` }}
                  >
                    <layer.icon className="h-6 w-6" style={{ color: layer.color }} />
                    {layer.premium && (
                      <motion.div
                        className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-accent to-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm">{layer.label}</h3>
                      {layer.badge && (
                        <Badge variant="outline" className="text-xs">
                          {layer.badge}
                        </Badge>
                      )}
                      {layer.premium && (
                        <Badge className="text-xs bg-gradient-to-r from-accent to-primary text-white border-0">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {layer.description}
                    </p>
                    <p className="text-xs">{layer.feature}</p>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="opacity-0 group-hover:opacity-100"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>

                {/* Data Flow Animation */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ width: "50%" }}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Connection Lines */}
      <div className="absolute left-[2.5rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-success/20 to-accent/20 -z-10" />
    </div>
  );
}
