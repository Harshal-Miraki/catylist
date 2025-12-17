// Customer Journey Phase Data

export const consultant = {
  name: "Aarav Sharma",
  role: "AI-Manufacturing Consultant",
  company: "Miraki Labs",
  expertise: ["OT/IT Integration", "Data Mapping", "Digital Twin Creation", "Process Optimization"],
  avatar: "AS",
};

export const personas = [
  {
    name: "Ravi Kumar",
    role: "Plant Manager",
    company: "Miraki Pune Plant",
    avatar: "RK",
    concerns: ["Downtime", "Production Targets", "Cost Optimization"],
  },
  {
    name: "Anita Sharma",
    role: "Process Engineer",
    company: "Miraki Pune Plant",
    avatar: "AS",
    concerns: ["Quality Control", "Equipment Performance", "Data Analysis"],
  },
  {
    name: "Karan Singh",
    role: "Line Operator",
    company: "Miraki Pune Plant",
    avatar: "KS",
    concerns: ["Machine Status", "Shift Handover", "Safety"],
  },
];

// New Crawl/Walk/Run Journey Structure
export const journeyPhases = [
  {
    id: 1,
    stage: "Crawl",
    name: "Problem Discovery",
    title: "Factory in Chaos",
    description: "The challenge — fragmented data, high downtime, and manual tracking",
    status: "completed",
  },
  {
    id: 2,
    stage: "Crawl",
    name: "Onboard Pilot",
    title: "Quick Start & Connect",
    description: "Fixed-scope 4-week pilot with edge gateway deployment",
    status: "completed",
  },
  {
    id: 3,
    stage: "Crawl",
    name: "Analyze Live",
    title: "Workbench in Action",
    description: "Live KPIs, dashboards, and data literacy foundation",
    status: "completed",
  },
  {
    id: 4,
    stage: "Walk",
    name: "Activate Solutions",
    title: "Enable Predictive Maintenance",
    description: "One-click activation of outcome-focused AI Expert Suite",
    status: "completed",
  },
  {
    id: 5,
    stage: "Walk",
    name: "Solution in Operation",
    title: "Recommendations & Actions",
    description: "AI-driven predictions feeding ANALYZE insights and OPERATE actions",
    status: "completed",
  },
  {
    id: 6,
    stage: "Run",
    name: "Scale & Build",
    title: "Creator Studio & Enterprise Scale",
    description: "Self-service analytics and custom solution building",
    status: "completed",
  },
];

export const phase1Dialogues = [
  {
    speaker: "Ravi Kumar",
    role: "Plant Manager",
    message: "We're losing ₹2.5 lakhs per day due to unplanned downtime. We can't pinpoint the root cause!",
    emotion: "frustrated",
    timestamp: "09:15 AM",
    metrics: { label: "OEE", value: "52%", trend: "down" },
  },
  {
    speaker: "Anita Sharma",
    role: "Process Engineer",
    message: "Our defect rate jumped to 9.5% last month. I'm tracking everything in Excel but can't correlate the variables.",
    emotion: "concerned",
    timestamp: "09:17 AM",
    metrics: { label: "Unplanned Downtime", value: "18 hrs/week", trend: "up" },
  },
  {
    speaker: "Ravi Kumar",
    role: "Plant Manager",
    message: "The management wants answers. We need visibility into what's happening on the shop floor in real-time.",
    emotion: "stressed",
    timestamp: "09:19 AM",
    metrics: { label: "Data Visibility", value: "0%", trend: "critical" },
  },
];

export const phase2Checklist = [
  { id: 1, text: "2 Machines Connected", completed: false },
  { id: 2, text: "Live OEE Dashboard", completed: false },
  { id: 3, text: "Downtime Analysis", completed: false },
  { id: 4, text: "AI Consultant Assigned", completed: false },
];

export const streamingMetrics = {
  machineTagsPerSec: 128,
  oeeImprovement: 22,
  scrapReduction: 35,
  timeToDeployBefore: "4 Weeks",
  timeToDeployAfter: "2 Days",
  machinesPerFactory: 12,
  expandableTo: 50,
};

// Solutions Suite - AI Expert Apps
export const solutionApps = [
  {
    id: "predictive-maintenance",
    name: "Predictive Maintenance",
    icon: "Wrench",
    description: "Predict equipment failures before they happen",
    kpiUplift: "+18% Uptime",
    roiExample: "₹8.4L/yr cost avoidance",
    requiredTags: ["vibration", "bearing_temp", "motor_current"],
    dataReadiness: 67,
    status: "available",
    enabled: false,
    category: "Reliability",
  },
  {
    id: "quality-management",
    name: "Quality Management",
    icon: "Target",
    description: "Real-time defect prediction and root cause analysis",
    kpiUplift: "-45% Defect Rate",
    roiExample: "₹6.2L/yr scrap reduction",
    requiredTags: ["temperature", "humidity", "speed", "pressure"],
    dataReadiness: 100,
    status: "available",
    enabled: false,
    category: "Quality",
  },
  {
    id: "inventory-optimization",
    name: "Inventory Optimization",
    icon: "Package",
    description: "Optimize stock levels based on production patterns",
    kpiUplift: "-30% Inventory Costs",
    roiExample: "₹5.8L/yr working capital savings",
    requiredTags: ["production_count", "cycle_time", "material_consumption"],
    dataReadiness: 83,
    status: "available",
    enabled: false,
    category: "Supply Chain",
  },
  {
    id: "demand-forecasting",
    name: "Demand Forecasting",
    icon: "TrendingUp",
    description: "AI-powered demand prediction for capacity planning",
    kpiUplift: "+25% Planning Accuracy",
    roiExample: "₹4.5L/yr capacity optimization",
    requiredTags: ["order_data", "production_output", "lead_time"],
    dataReadiness: 50,
    status: "available",
    enabled: false,
    category: "Planning",
  },
];

// Predictive Maintenance Example Prediction
export const samplePrediction = {
  asset: "Compressor_C3",
  prediction: "Bearing failure",
  probability: 78,
  horizon_hours: 72,
  estimated_avoidance: 420000,
  confidence: "High",
  recommendation: "Schedule maintenance within 48 hours",
  dataPoints: [
    { metric: "Vibration Level", current: 8.2, threshold: 6.5, unit: "mm/s" },
    { metric: "Bearing Temp", current: 82, threshold: 75, unit: "°C" },
    { metric: "Motor Current", current: 42, threshold: 38, unit: "A" },
  ],
};

// Phase 3 Pilot Success Metrics (after 4 weeks)
export const pilotMetrics = {
  oee: { before: 52, after: 64, improvement: 12 },
  downtime: { before: 18, after: 11.7, improvement: 35, unit: "hrs/week" },
  visibility: { before: 0, after: 100, unit: "%" },
  dataPoints: { collected: "2.4M", analyzed: "Real-time" },
};

export const phase2StickyNotes = [
  { id: 1, text: "High Defect Rate (9.5%)", category: "quality", priority: "high" },
  { id: 2, text: "Unplanned Downtime", category: "reliability", priority: "high" },
  { id: 3, text: "Manual Excel Tracking", category: "process", priority: "medium" },
  { id: 4, text: "No Real-time Visibility", category: "visibility", priority: "high" },
  { id: 5, text: "Supplier Variability", category: "supply", priority: "medium" },
  { id: 6, text: "CNC Lathe Issues", category: "equipment", priority: "high" },
  { id: 7, text: "Humidity Impact Unknown", category: "environment", priority: "medium" },
  { id: 8, text: "Shift-to-Shift Variation", category: "process", priority: "medium" },
];

export const phase3ConnectionSteps = [
  { step: 1, title: "Deploy Edge Gateway", status: "completed", duration: "Day 1-2" },
  { step: 2, title: "Configure Protocols", status: "completed", duration: "Day 2-3" },
  { step: 3, title: "Connect Machines", status: "completed", duration: "Day 3-5" },
  { step: 4, title: "Validate Data Flow", status: "completed", duration: "Day 5-6" },
  { step: 5, title: "Cloud Integration", status: "completed", duration: "Day 6-7" },
];

export const phase3Machines = [
  {
    name: "Siemens S7-1500 PLC",
    status: "connected",
    tags: 245,
    dataRate: "1.2 MB/s",
    protocol: "OPC-UA",
    lastSync: "2 sec ago",
  },
  {
    name: "Rockwell CompactLogix",
    status: "buffering",
    tags: 180,
    dataRate: "0.9 MB/s",
    protocol: "Ethernet/IP",
    lastSync: "5 sec ago",
  },
  {
    name: "CNC Lathe-02",
    status: "connected",
    tags: 52,
    dataRate: "0.3 MB/s",
    protocol: "Modbus TCP",
    lastSync: "1 sec ago",
  },
  {
    name: "Oven Controller",
    status: "connected",
    tags: 89,
    dataRate: "0.6 MB/s",
    protocol: "MQTT",
    lastSync: "3 sec ago",
  },
];

export const phase4MappingExample = {
  raw: {
    device_id: "PLC_B1",
    Tag_305: 75.3,
    Tag_205: 302,
    Tag_402: 63,
    timestamp: "2025-10-10T14:23:45Z",
  },
  enriched: {
    plant: "Pune Plant",
    line: "Packaging Line 1",
    signals: [
      { name: "Conveyor Speed", value: 75.3, unit: "m/s" },
      { name: "Oven Zone 2 Temperature", value: 151, unit: "°C" },
      { name: "Ambient Humidity", value: 63, unit: "%" },
    ],
    timestamp: "2025-10-10T14:23:45Z",
  },
};

export const phase5OperatorLog = [
  {
    timestamp: "10:32:14",
    event: "Rule#OPR-32 Triggered",
    severity: "warning",
    details: "Speed > 1200 RPM AND Humidity > 60%",
  },
  {
    timestamp: "10:32:15",
    event: "Operator Alert Sent",
    severity: "info",
    details: "Alert sent to Karan Singh (Line 1 Operator)",
  },
  {
    timestamp: "10:32:18",
    event: "Operator Response Received",
    severity: "success",
    details: "Action: 'Speed Reduced to 95%'",
  },
  {
    timestamp: "10:32:45",
    event: "Parameter Stabilized",
    severity: "success",
    details: "Defect risk mitigated",
  },
];

export const phase6Metrics = {
  before: {
    oee: 72.3,
    defectRate: 9.5,
    downtime: 5.8,
    throughput: 10200,
    energyEfficiency: 68,
  },
  after: {
    oee: 84.5,
    defectRate: 2.8,
    downtime: 3.2,
    throughput: 12450,
    energyEfficiency: 79,
  },
  improvement: {
    oee: 16.9,
    defectRate: 70.5,
    downtime: 44.8,
    throughput: 22.1,
    energyEfficiency: 16.2,
  },
  financialImpact: {
    costSavings: "₹1.2 Cr/year",
    productivityGain: "22.1%",
    qualityImprovement: "70.5%",
    roi: "240%",
  },
};

export const shiftData = [
  { shift: "Morning", line: "Line 1", speed: 1150, humidity: 58, defectRate: 1.2 },
  { shift: "Evening", line: "Line 1", speed: 1220, humidity: 63, defectRate: 6.8 },
  { shift: "Night", line: "Line 2", speed: 1100, humidity: 59, defectRate: 2.3 },
  { shift: "Morning", line: "Line 2", speed: 1180, humidity: 61, defectRate: 3.1 },
  { shift: "Evening", line: "Line 2", speed: 1195, humidity: 64, defectRate: 5.2 },
  { shift: "Night", line: "Line 1", speed: 1130, humidity: 57, defectRate: 1.8 },
];
