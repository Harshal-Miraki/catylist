// Dummy Indian Manufacturing Data for Miraki Labs MIP

export const plants = [
  { id: "pune-1", name: "Miraki Pune Plant", location: "Pune, Maharashtra", area: "45,000 sq ft", employees: 245 },
  { id: "surat-1", name: "Surat Plastics Facility", location: "Surat, Gujarat", area: "32,000 sq ft", employees: 180 },
  { id: "bengal-1", name: "Bengal Textiles Unit", location: "Kolkata, West Bengal", area: "28,000 sq ft", employees: 156 },
  { id: "chennai-1", name: "Chennai Auto Components", location: "Chennai, Tamil Nadu", area: "52,000 sq ft", employees: 320 },
];

export const productionLines = [
  { id: "line-1", name: "Packaging Line 1", plantId: "pune-1", status: "running", capacity: 1200, currentOutput: 1080 },
  { id: "line-2", name: "Packaging Line 2", plantId: "pune-1", status: "running", capacity: 1200, currentOutput: 1150 },
  { id: "line-3", name: "Assembly Line A", plantId: "pune-1", status: "idle", capacity: 800, currentOutput: 0 },
  { id: "line-4", name: "Molding Line 1", plantId: "surat-1", status: "running", capacity: 950, currentOutput: 920 },
  { id: "line-5", name: "Weaving Line 1", plantId: "bengal-1", status: "running", capacity: 1500, currentOutput: 1380 },
  { id: "line-6", name: "CNC Machining Line", plantId: "pune-1", status: "running", capacity: 600, currentOutput: 545 },
  { id: "line-7", name: "Quality Inspection Line", plantId: "pune-1", status: "running", capacity: 1500, currentOutput: 1450 },
  { id: "line-8", name: "Injection Molding Line 2", plantId: "surat-1", status: "maintenance", capacity: 1100, currentOutput: 0 },
];

export const machines = [
  { id: "m-001", name: "Siemens S7-1500 PLC", lineId: "line-1", type: "PLC", status: "connected", protocol: "OPC-UA", ipAddress: "192.168.1.51" },
  { id: "m-002", name: "Rockwell CompactLogix", lineId: "line-1", type: "PLC", status: "connected", protocol: "Ethernet/IP", ipAddress: "192.168.1.52" },
  { id: "m-003", name: "CNC Lathe 02", lineId: "line-2", type: "CNC", status: "connected", protocol: "Modbus TCP", ipAddress: "192.168.1.53" },
  { id: "m-004", name: "Oven Zone Controller", lineId: "line-1", type: "Sensor", status: "connected", protocol: "MQTT", ipAddress: "192.168.1.54" },
  { id: "m-005", name: "Conveyor Motor Drive", lineId: "line-1", type: "Drive", status: "syncing", protocol: "Modbus TCP", ipAddress: "192.168.1.55" },
  { id: "m-006", name: "Hydraulic Press 3", lineId: "line-4", type: "Press", status: "connected", protocol: "OPC-UA", ipAddress: "192.168.2.21" },
  { id: "m-007", name: "Vision Inspection Camera", lineId: "line-7", type: "Camera", status: "connected", protocol: "REST API", ipAddress: "192.168.1.70" },
  { id: "m-008", name: "Temperature Sensor Array", lineId: "line-1", type: "Sensor", status: "connected", protocol: "MQTT", ipAddress: "192.168.1.56" },
  { id: "m-009", name: "CNC Mill 03", lineId: "line-6", type: "CNC", status: "connected", protocol: "Modbus TCP", ipAddress: "192.168.1.60" },
  { id: "m-010", name: "Robot Arm ABB IRB-1200", lineId: "line-3", type: "Robot", status: "disconnected", protocol: "OPC-UA", ipAddress: "192.168.1.45" },
  { id: "m-011", name: "Extruder Machine 1", lineId: "line-4", type: "Extruder", status: "connected", protocol: "Modbus TCP", ipAddress: "192.168.2.22" },
  { id: "m-012", name: "Packaging Robot FANUC", lineId: "line-2", type: "Robot", status: "connected", protocol: "OPC-UA", ipAddress: "192.168.1.65" },
];

export const edgeGateways = [
  {
    id: "edge-pune-001",
    name: "Edge Gateway Pune-001",
    plant: "Miraki Pune Plant",
    ipAddress: "192.168.1.101",
    status: "connected",
    uptime: "99.8%",
    lastSync: "2 min ago",
    throughput: "2.4 MB/s",
    machinesConnected: 12,
  },
  {
    id: "edge-pune-002",
    name: "Edge Gateway Pune-002",
    plant: "Miraki Pune Plant",
    ipAddress: "192.168.1.102",
    status: "connected",
    uptime: "98.5%",
    lastSync: "5 min ago",
    throughput: "1.8 MB/s",
    machinesConnected: 8,
  },
  {
    id: "edge-surat-001",
    name: "Edge Gateway Surat-001",
    plant: "Surat Plastics Facility",
    ipAddress: "192.168.2.101",
    status: "syncing",
    uptime: "95.2%",
    lastSync: "15 min ago",
    throughput: "1.2 MB/s",
    machinesConnected: 6,
  },
];

export const protocols = [
  { id: "opc-ua", name: "OPC-UA", enabled: true, icon: "Network" },
  { id: "mqtt", name: "MQTT", enabled: true, icon: "Radio" },
  { id: "modbus", name: "Modbus TCP/IP", enabled: true, icon: "Cable" },
  { id: "ethernet-ip", name: "Ethernet/IP", enabled: true, icon: "Wifi" },
  { id: "profinet", name: "PROFINET", enabled: false, icon: "Router" },
  { id: "sql", name: "SQL Database", enabled: true, icon: "Database" },
  { id: "rest", name: "REST API", enabled: true, icon: "Cloud" },
  { id: "csv", name: "CSV Import", enabled: true, icon: "FileText" },
];

export const rawTags = [
  { id: "tag-101", rawName: "Tag_101", machineId: "m-005", description: "Speed sensor raw", dataType: "REAL", unit: "", sampleRate: "100ms" },
  { id: "tag-102", rawName: "Tag_102", machineId: "m-005", description: "Temperature raw", dataType: "INT", unit: "", sampleRate: "1s" },
  { id: "tag-205", rawName: "Tag_205", machineId: "m-004", description: "Oven temp raw", dataType: "REAL", unit: "", sampleRate: "500ms" },
  { id: "tag-301", rawName: "Tag_301", machineId: "m-006", description: "Pressure sensor", dataType: "REAL", unit: "", sampleRate: "100ms" },
  { id: "tag-402", rawName: "Tag_402", machineId: "m-008", description: "Humidity raw", dataType: "INT", unit: "", sampleRate: "5s" },
  { id: "tag-501", rawName: "Tag_501", machineId: "m-003", description: "Spindle RPM", dataType: "INT", unit: "", sampleRate: "100ms" },
  { id: "tag-502", rawName: "Tag_502", machineId: "m-003", description: "Tool wear", dataType: "REAL", unit: "", sampleRate: "10s" },
  { id: "tag-601", rawName: "Tag_601", machineId: "m-007", description: "Defect count", dataType: "INT", unit: "", sampleRate: "1s" },
  { id: "tag-602", rawName: "Tag_602", machineId: "m-007", description: "Pass/Fail", dataType: "BOOL", unit: "", sampleRate: "1s" },
  { id: "tag-701", rawName: "Tag_701", machineId: "m-009", description: "Vibration X-axis", dataType: "REAL", unit: "", sampleRate: "50ms" },
  { id: "tag-702", rawName: "Tag_702", machineId: "m-009", description: "Power consumption", dataType: "REAL", unit: "", sampleRate: "1s" },
  { id: "tag-801", rawName: "Tag_801", machineId: "m-011", description: "Extrusion rate", dataType: "REAL", unit: "", sampleRate: "500ms" },
  { id: "tag-802", rawName: "Tag_802", machineId: "m-011", description: "Material pressure", dataType: "REAL", unit: "", sampleRate: "500ms" },
];

export const mappedSignals = [
  { tagId: "tag-101", mappedName: "Conveyor Speed", unit: "m/s", conversion: "raw * 0.1", category: "Speed", mapped: true },
  { tagId: "tag-102", mappedName: "Motor Temperature", unit: "°C", conversion: "(raw - 32) * 5/9", category: "Temperature", mapped: true },
  { tagId: "tag-205", mappedName: "Oven Zone 2 Temperature", unit: "°C", conversion: "(raw - 32) * 5/9", category: "Temperature", mapped: true },
  { tagId: "tag-301", mappedName: "Hydraulic Pressure", unit: "Bar", conversion: "raw * 0.0689", category: "Pressure", mapped: true },
  { tagId: "tag-402", mappedName: "Ambient Humidity", unit: "%", conversion: "raw", category: "Environmental", mapped: true },
  { tagId: "tag-501", mappedName: "CNC Spindle Speed", unit: "RPM", conversion: "raw", category: "Speed", mapped: true },
  { tagId: "tag-502", mappedName: "Tool Wear Percentage", unit: "%", conversion: "raw * 100", category: "Quality", mapped: true },
  { tagId: "tag-601", mappedName: "Vision Defect Count", unit: "count", conversion: "raw", category: "Quality", mapped: true },
  { tagId: "tag-602", mappedName: "Quality Pass/Fail Status", unit: "bool", conversion: "raw", category: "Quality", mapped: true },
  { tagId: "tag-701", mappedName: "Machine Vibration", unit: "mm/s", conversion: "raw", category: "Condition", mapped: false },
  { tagId: "tag-702", mappedName: "Power Draw", unit: "kW", conversion: "raw * 0.001", category: "Energy", mapped: false },
  { tagId: "tag-801", mappedName: "Extrusion Speed", unit: "kg/hr", conversion: "raw", category: "Speed", mapped: false },
  { tagId: "tag-802", mappedName: "Material Feed Pressure", unit: "Bar", conversion: "raw * 0.0689", category: "Pressure", mapped: false },
];

export const unmappedTags = [
  { id: "tag-901", rawName: "Tag_901", machineId: "m-012", description: "Robot position X", dataType: "REAL", unit: "", sampleRate: "100ms" },
  { id: "tag-902", rawName: "Tag_902", machineId: "m-012", description: "Robot position Y", dataType: "REAL", unit: "", sampleRate: "100ms" },
  { id: "tag-903", rawName: "Tag_903", machineId: "m-012", description: "Robot position Z", dataType: "REAL", unit: "", sampleRate: "100ms" },
  { id: "tag-904", rawName: "Tag_904", machineId: "m-001", description: "Cycle time", dataType: "INT", unit: "", sampleRate: "1s" },
  { id: "tag-905", rawName: "Tag_905", machineId: "m-001", description: "Part count", dataType: "INT", unit: "", sampleRate: "1s" },
];

export const kpiData = {
  oee: 84.5,
  downtime: 3.2,
  defectRate: 2.8,
  energyConsumption: 1245,
  production: 12450,
  quality: 97.2,
};

export const downtimeReasons = [
  { reason: "Material Jam", percentage: 30, hours: 0.96 },
  { reason: "Equipment Failure", percentage: 25, hours: 0.8 },
  { reason: "Changeover", percentage: 20, hours: 0.64 },
  { reason: "Quality Issue", percentage: 15, hours: 0.48 },
  { reason: "Other", percentage: 10, hours: 0.32 },
];

export const alerts = [
  {
    id: "alert-1",
    severity: "critical",
    title: "Defect Spike on Oven Line 2",
    message: "High Material Humidity Detected - 68% (Threshold: 60%)",
    timestamp: "5 min ago",
    machine: "Oven Zone Controller",
    acknowledged: false,
  },
  {
    id: "alert-2",
    severity: "warning",
    title: "Motor Temperature Rising",
    message: "Conveyor motor temperature at 85°C approaching limit of 90°C",
    timestamp: "12 min ago",
    machine: "Conveyor Motor Drive",
    acknowledged: false,
  },
  {
    id: "alert-3",
    severity: "info",
    title: "Scheduled Maintenance Due",
    message: "CNC Lathe 02 maintenance scheduled for tomorrow 10:00 AM",
    timestamp: "1 hour ago",
    machine: "CNC Lathe 02",
    acknowledged: true,
  },
  {
    id: "alert-4",
    severity: "warning",
    title: "Low Raw Material Stock",
    message: "SKU ABC-123 inventory at 15% - reorder recommended",
    timestamp: "2 hours ago",
    machine: "Inventory System",
    acknowledged: false,
  },
];

export const trendData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  speed: 1100 + Math.random() * 200,
  defectRate: 1.5 + Math.random() * 3,
  temperature: 145 + Math.random() * 15,
  humidity: 45 + Math.random() * 20,
}));

export const machineGauges = [
  {
    id: "gauge-1",
    name: "Motor Temperature",
    value: 82,
    max: 100,
    unit: "°C",
    status: "warning",
    threshold: 90,
  },
  {
    id: "gauge-2",
    name: "Line Speed",
    value: 1180,
    max: 1500,
    unit: "RPM",
    status: "normal",
    threshold: 1400,
  },
  {
    id: "gauge-3",
    name: "Power Draw",
    value: 245,
    max: 400,
    unit: "kW",
    status: "normal",
    threshold: 350,
  },
  {
    id: "gauge-4",
    name: "Vibration Level",
    value: 3.2,
    max: 10,
    unit: "mm/s",
    status: "normal",
    threshold: 7,
  },
];

export const operatorGuidance = {
  currentBatch: "SKU ABC-123",
  recommendation: "Reduce machine speed to 95% for this batch",
  reason: "High humidity detected - risk of defects at current speed",
  confidence: 92,
  expectedImprovement: "Defect rate reduction: 40-50%",
};

export const productionMetrics = {
  current: {
    oee: 84.5,
    defectRate: 2.8,
    downtime: 3.2,
    throughput: 12450,
  },
  baseline: {
    oee: 72.3,
    defectRate: 9.5,
    downtime: 5.8,
    throughput: 10200,
  },
  improvement: {
    oee: 16.9,
    defectRate: 70.5,
    downtime: 44.8,
    throughput: 22.1,
  },
};

export const energyData = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  lineA: 1200 + Math.random() * 300,
  lineB: 1100 + Math.random() * 350,
}));

// User Management System
export const userRoles = [
  { id: "admin", name: "Administrator", description: "Full system access", icon: "Shield", color: "primary" },
  { id: "plant-manager", name: "Plant Manager", description: "Plant-wide oversight", icon: "Building", color: "accent" },
  { id: "operator", name: "Operator", description: "Production line operations", icon: "User", color: "success" },
  { id: "maintenance", name: "Maintenance Engineer", description: "Equipment maintenance", icon: "Wrench", color: "secondary" },
  { id: "electrical", name: "Electrical Engineer", description: "Electrical systems", icon: "Zap", color: "destructive" },
  { id: "quality", name: "Quality Inspector", description: "Quality control", icon: "CheckCircle", color: "muted" },
];

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  plantId: string;
  assignedSolutions: string[];
  createdAt: string;
  lastLogin: string;
  status: "active" | "inactive";
  avatar?: string;
}

export const users: User[] = [
  {
    id: "user-001",
    name: "Ravi Kumar",
    email: "ravi.kumar@miraki.com",
    password: "admin123",
    role: "admin",
    plantId: "pune-1",
    assignedSolutions: ["pred-maint", "quality-ai", "energy-opt", "anomaly-det"],
    createdAt: "2024-01-15",
    lastLogin: "2025-10-13 09:30",
    status: "active",
  },
  {
    id: "user-002",
    name: "Anita Desai",
    email: "anita.desai@miraki.com",
    password: "plant123",
    role: "plant-manager",
    plantId: "pune-1",
    assignedSolutions: ["pred-maint", "energy-opt", "downtime-reduce"],
    createdAt: "2024-02-10",
    lastLogin: "2025-10-13 08:15",
    status: "active",
  },
  {
    id: "user-003",
    name: "Karan Patel",
    email: "karan.patel@miraki.com",
    password: "operator123",
    role: "operator",
    plantId: "pune-1",
    assignedSolutions: ["quality-ai", "prod-forecast"],
    createdAt: "2024-03-05",
    lastLogin: "2025-10-13 07:00",
    status: "active",
  },
  {
    id: "user-004",
    name: "Suresh Naik",
    email: "suresh.naik@miraki.com",
    password: "maint123",
    role: "maintenance",
    plantId: "pune-1",
    assignedSolutions: ["pred-maint", "anomaly-det"],
    createdAt: "2024-03-20",
    lastLogin: "2025-10-12 16:45",
    status: "active",
  },
  {
    id: "user-005",
    name: "Priya Sharma",
    email: "priya.sharma@miraki.com",
    password: "elec123",
    role: "electrical",
    plantId: "pune-1",
    assignedSolutions: ["energy-opt", "anomaly-det"],
    createdAt: "2024-04-12",
    lastLogin: "2025-10-13 08:00",
    status: "active",
  },
  {
    id: "user-006",
    name: "Aarav Singh",
    email: "aarav.singh@miraki.com",
    password: "quality123",
    role: "quality",
    plantId: "pune-1",
    assignedSolutions: ["quality-ai"],
    createdAt: "2024-05-08",
    lastLogin: "2025-10-13 09:00",
    status: "active",
  },
];

// AI Solutions Marketplace
export interface AIModelTraining {
  dataPoints: number;
  trainingProgress: number;
  accuracy: number;
  lastTrained: string;
  status: "training" | "ready" | "needs-data" | "error";
}

export interface SolutionMarketplace {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  priceType: "monthly" | "annual" | "one-time";
  icon: string;
  features: string[];
  targetRoles: string[];
  dataSources: string[];
  trainingData: AIModelTraining;
  isPurchased: boolean;
  isActive: boolean;
  roi: string;
  implementationTime: string;
  rating: number;
  reviews: number;
  vendor: string;
}

export const solutionsMarketplace: SolutionMarketplace[] = [
  {
    id: "pred-maint",
    name: "Predictive Maintenance AI",
    description: "ML-powered predictive analytics to forecast equipment failures 3-7 days in advance",
    category: "Maintenance",
    price: 2499,
    priceType: "monthly",
    icon: "Wrench",
    features: [
      "Vibration & temperature anomaly detection",
      "Failure prediction with 92% accuracy",
      "Automated work order generation",
      "Historical failure pattern analysis",
      "Integration with CMMS systems"
    ],
    targetRoles: ["maintenance", "plant-manager", "admin"],
    dataSources: ["vibration", "temperature", "runtime", "maintenance-logs"],
    trainingData: {
      dataPoints: 245680,
      trainingProgress: 100,
      accuracy: 92.4,
      lastTrained: "2025-10-12 22:00",
      status: "ready",
    },
    isPurchased: true,
    isActive: true,
    roi: "240% in 6 months",
    implementationTime: "2-3 weeks",
    rating: 4.8,
    reviews: 127,
    vendor: "Miraki Labs",
  },
  {
    id: "quality-ai",
    name: "Quality Prediction Suite",
    description: "Real-time quality forecasting and defect root cause analysis using computer vision & ML",
    category: "Quality",
    price: 1999,
    priceType: "monthly",
    icon: "CheckCircle",
    features: [
      "Real-time defect prediction",
      "Computer vision inspection",
      "Root cause analysis",
      "Process parameter optimization",
      "SPC chart automation"
    ],
    targetRoles: ["quality", "operator", "plant-manager", "admin"],
    dataSources: ["camera", "process-parameters", "quality-logs"],
    trainingData: {
      dataPoints: 189230,
      trainingProgress: 100,
      accuracy: 94.7,
      lastTrained: "2025-10-13 01:30",
      status: "ready",
    },
    isPurchased: true,
    isActive: true,
    roi: "180% in 4 months",
    implementationTime: "3-4 weeks",
    rating: 4.9,
    reviews: 215,
    vendor: "Miraki Labs",
  },
  {
    id: "energy-opt",
    name: "Energy Optimization AI",
    description: "AI-driven energy consumption optimization and cost reduction recommendations",
    category: "Energy",
    price: 1799,
    priceType: "monthly",
    icon: "Zap",
    features: [
      "Real-time energy monitoring",
      "Peak demand prediction",
      "Equipment scheduling optimization",
      "Carbon footprint tracking",
      "Cost-saving recommendations"
    ],
    targetRoles: ["electrical", "plant-manager", "admin"],
    dataSources: ["power-meters", "production-schedule", "weather"],
    trainingData: {
      dataPoints: 156890,
      trainingProgress: 100,
      accuracy: 89.3,
      lastTrained: "2025-10-11 18:00",
      status: "ready",
    },
    isPurchased: true,
    isActive: false,
    roi: "160% in 8 months",
    implementationTime: "2 weeks",
    rating: 4.6,
    reviews: 94,
    vendor: "Miraki Labs",
  },
  {
    id: "anomaly-det",
    name: "Anomaly Detection Engine",
    description: "Unsupervised ML to detect unusual patterns in production processes",
    category: "Operations",
    price: 1499,
    priceType: "monthly",
    icon: "AlertTriangle",
    features: [
      "Multi-sensor anomaly detection",
      "Pattern learning without labels",
      "Real-time alert generation",
      "Trend deviation analysis",
      "Root cause suggestions"
    ],
    targetRoles: ["operator", "maintenance", "electrical", "admin"],
    dataSources: ["all-sensors", "process-data"],
    trainingData: {
      dataPoints: 324560,
      trainingProgress: 85,
      accuracy: 87.1,
      lastTrained: "2025-10-13 06:00",
      status: "training",
    },
    isPurchased: true,
    isActive: true,
    roi: "140% in 6 months",
    implementationTime: "1-2 weeks",
    rating: 4.5,
    reviews: 156,
    vendor: "Miraki Labs",
  },
  {
    id: "prod-forecast",
    name: "Production Forecasting",
    description: "Demand-based production planning with ML-powered forecasting",
    category: "Planning",
    price: 1299,
    priceType: "monthly",
    icon: "TrendingUp",
    features: [
      "Demand forecasting",
      "Production capacity planning",
      "Inventory optimization",
      "Seasonal trend analysis",
      "Supply chain integration"
    ],
    targetRoles: ["plant-manager", "operator", "admin"],
    dataSources: ["historical-production", "orders", "inventory"],
    trainingData: {
      dataPoints: 98450,
      trainingProgress: 100,
      accuracy: 91.2,
      lastTrained: "2025-10-10 14:00",
      status: "ready",
    },
    isPurchased: false,
    isActive: false,
    roi: "200% in 5 months",
    implementationTime: "2 weeks",
    rating: 4.7,
    reviews: 183,
    vendor: "Miraki Labs",
  },
  {
    id: "downtime-reduce",
    name: "Downtime Reduction AI",
    description: "Minimize unplanned downtime through predictive analytics and smart scheduling",
    category: "Operations",
    price: 1899,
    priceType: "monthly",
    icon: "Clock",
    features: [
      "Downtime pattern analysis",
      "Bottleneck identification",
      "Maintenance scheduling optimization",
      "Changeover time reduction",
      "OEE improvement tracking"
    ],
    targetRoles: ["plant-manager", "maintenance", "operator", "admin"],
    dataSources: ["downtime-logs", "maintenance", "production"],
    trainingData: {
      dataPoints: 67340,
      trainingProgress: 45,
      accuracy: 0,
      lastTrained: "Never",
      status: "needs-data",
    },
    isPurchased: false,
    isActive: false,
    roi: "175% in 7 months",
    implementationTime: "3 weeks",
    rating: 4.6,
    reviews: 109,
    vendor: "Miraki Labs",
  },
  {
    id: "supply-opt",
    name: "Supply Chain Optimizer",
    description: "End-to-end supply chain visibility and optimization using AI",
    category: "Logistics",
    price: 2299,
    priceType: "monthly",
    icon: "Truck",
    features: [
      "Supplier performance tracking",
      "Lead time prediction",
      "Inventory optimization",
      "Transportation route optimization",
      "Risk assessment"
    ],
    targetRoles: ["plant-manager", "admin"],
    dataSources: ["supplier-data", "logistics", "inventory"],
    trainingData: {
      dataPoints: 0,
      trainingProgress: 0,
      accuracy: 0,
      lastTrained: "Never",
      status: "needs-data",
    },
    isPurchased: false,
    isActive: false,
    roi: "190% in 9 months",
    implementationTime: "4-5 weeks",
    rating: 4.4,
    reviews: 76,
    vendor: "Third-party",
  },
  {
    id: "workforce-ai",
    name: "Workforce Analytics",
    description: "Optimize shift planning and workforce productivity using AI insights",
    category: "HR",
    price: 999,
    priceType: "monthly",
    icon: "Users",
    features: [
      "Skill-based shift optimization",
      "Productivity analytics",
      "Fatigue detection",
      "Training recommendations",
      "Compliance tracking"
    ],
    targetRoles: ["plant-manager", "admin"],
    dataSources: ["attendance", "productivity", "training-records"],
    trainingData: {
      dataPoints: 0,
      trainingProgress: 0,
      accuracy: 0,
      lastTrained: "Never",
      status: "needs-data",
    },
    isPurchased: false,
    isActive: false,
    roi: "150% in 10 months",
    implementationTime: "2-3 weeks",
    rating: 4.3,
    reviews: 52,
    vendor: "Third-party",
  },
];

export const componentWidgets = [
  { id: "line-chart", name: "Line Chart", description: "Time series visualization" },
  { id: "gauge", name: "Gauge", description: "Real-time metric display" },
  { id: "kpi-tile", name: "KPI Tile", description: "Key metric summary" },
  { id: "table", name: "Data Table", description: "Tabular data view" },
  { id: "heatmap", name: "Heatmap", description: "Density visualization" },
  { id: "bar-chart", name: "Bar Chart", description: "Comparison chart" },
];
