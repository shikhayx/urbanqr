export const assetTypes = [
  {
    id: 'streetlights',
    name: 'Streetlights & Poles',
    category: 'Electrical & Power',
    iconName: 'Zap',
    codePrefix: 'SL-8842',
    color: 'amber',
    badge: 'High Priority Grid',
    description: 'Smart LED poles, sodium vapor lamps, high-mast illumination, and solar streetlights.',
    commonIssues: ['Bulb Outage / Flickering', 'Exposed Wiring', 'Physical Pole Damage', 'Timing Failure'],
    stats: '14,200+ Tagged',
    resolvedRate: '98.6%',
    sampleAsset: {
      id: 'SL-8842',
      location: '5th Avenue & Central Crossing, Sector 9',
      department: 'Municipal Electrical Div.',
      status: 'Operational'
    }
  },
  {
    id: 'garbage-bins',
    name: 'Garbage & Waste Bins',
    category: 'Sanitation',
    iconName: 'Trash2',
    codePrefix: 'WB-3109',
    color: 'emerald',
    badge: 'Sanitation Route 12',
    description: 'Civic compactor bins, segregated dry/wet recycling containers, and underground smart bins.',
    commonIssues: ['Overflowing Bin', 'Damaged Lid / Wheels', 'Illegal Dumping Nearby', 'Foul Odor'],
    stats: '8,450+ Tagged',
    resolvedRate: '99.1%',
    sampleAsset: {
      id: 'WB-3109',
      location: 'Civic Market Plaza, Bay #3',
      department: 'Solid Waste Management',
      status: 'Needs Clearing'
    }
  },
  {
    id: 'bus-stops',
    name: 'Bus Stops & Shelters',
    category: 'Public Transit',
    iconName: 'Bus',
    codePrefix: 'BS-1044',
    color: 'blue',
    badge: 'Transit Corridors',
    description: 'Passenger transit shelters, digital timetable displays, glass panels, and public seating.',
    commonIssues: ['Broken Glass / Shelter', 'Damaged Seating', 'Graffiti / Vandalism', 'Display Malfunction'],
    stats: '3,120+ Tagged',
    resolvedRate: '97.4%',
    sampleAsset: {
      id: 'BS-1044',
      location: 'Metro Station Gate 2, Ring Road',
      department: 'Urban Transport Authority',
      status: 'Operational'
    }
  },
  {
    id: 'public-toilets',
    name: 'Public Sanitation Units',
    category: 'Public Health',
    iconName: 'Sparkles',
    codePrefix: 'PT-0518',
    color: 'teal',
    badge: 'Swachh Civic Grid',
    description: 'Public restrooms, accessible disabled facilities, automated pay-to-use units, and wash stations.',
    commonIssues: ['No Water Supply', 'Hygiene / Cleaning Required', 'Broken Lock / Door', 'Plumbing Leak'],
    stats: '1,890+ Tagged',
    resolvedRate: '99.3%',
    sampleAsset: {
      id: 'PT-0518',
      location: 'Heritage Park North Promenade',
      department: 'Public Health Department',
      status: 'Cleaned 1h ago'
    }
  },
  {
    id: 'parks',
    name: 'Parks & Recreation',
    category: 'Urban Greenery',
    iconName: 'Trees',
    codePrefix: 'PK-4421',
    color: 'emerald',
    badge: 'Horticulture Dept',
    description: 'Children playground gear, open gyms, park benches, sprinkler systems, and pedestrian tracks.',
    commonIssues: ['Broken Swing / Gym Eq.', 'Fallen Tree Branch', 'Damaged Sprinklers', 'Litter on Lawn'],
    stats: '640+ Tagged',
    resolvedRate: '96.8%',
    sampleAsset: {
      id: 'PK-4421',
      location: 'Botanical Garden, Children Zone B',
      department: 'Horticulture & Parks Div.',
      status: 'Operational'
    }
  },
  {
    id: 'water-points',
    name: 'Water Points & Hydrants',
    category: 'Water & Utilities',
    iconName: 'Droplets',
    codePrefix: 'WP-7712',
    color: 'cyan',
    badge: 'Water Supply Board',
    description: 'Drinking water ATMs, emergency fire hydrants, municipal pipeline valve stations, and fountains.',
    commonIssues: ['Continuous Pipeline Leak', 'No Water Flow', 'Contaminated / Murky Water', 'Damaged Tap'],
    stats: '5,300+ Tagged',
    resolvedRate: '99.5%',
    sampleAsset: {
      id: 'WP-7712',
      location: 'Commercial Hub Junction, Sector 14',
      department: 'Water Supply & Sewerage Board',
      status: 'Operational'
    }
  }
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Scan QR Code',
    subtitle: 'Zero App Installation Needed',
    description: 'Citizens simply point their smartphone camera at the durable QR plate mounted directly onto the urban asset.',
    icon: 'QrCode',
    badge: '1-Sec Instant Scan',
    detail: 'Automated GPS extraction verifies caller location within 5 meters of the physical asset.'
  },
  {
    step: '02',
    title: 'View Asset Info',
    subtitle: 'Instant Metadata Verification',
    description: 'Instantly view verified asset specs, maintenance division, ward number, and current live status without typing anything.',
    icon: 'CheckCircle2',
    badge: 'Pre-Filled Context',
    detail: 'Eliminates mistaken locations or wrong department routing forever.'
  },
  {
    step: '03',
    title: 'Report Issue or Confirm',
    subtitle: '20-Second Swift Submission',
    description: 'Select issue category from 1-tap options, upload photo evidence, or simply confirm an already active issue in 1 click.',
    icon: 'FileSpreadsheet',
    badge: 'Smart AI Deduplication',
    detail: 'Duplicate shield prevents 20 citizens from creating 20 redundant tickets.'
  },
  {
    step: '04',
    title: 'Track Resolution',
    subtitle: 'Transparent Civic Accountability',
    description: 'Watch real-time resolution progress with live SLA timers, field officer dispatch, and final photo verification of the fix.',
    icon: 'Activity',
    badge: 'Real-time SMS / Web SLA',
    detail: 'Citizen receives SMS & web confirmation when municipal crew closes the ticket.'
  }
];

export const municipalityBenefits = [
  {
    title: 'Lightning-Fast Reporting',
    stat: '20 Sec',
    statLabel: 'Average citizen submission time vs 8 mins on legacy portals',
    description: 'No manual address typing or selecting complicated municipal departments. The QR code automatically attaches asset ID, exact ward, and GPS coordinate.',
    icon: 'Zap',
    highlightColor: 'from-blue-500/10 to-indigo-500/10',
    borderColor: 'border-blue-200'
  },
  {
    title: 'Zero Duplicate Complaint Spam',
    stat: '74% Less',
    statLabel: 'Reduction in redundant clerical tickets',
    description: 'When multiple citizens scan the same faulty streetlight, UrbanQR prompts them to upvote/confirm the open ticket instead of creating duplicates.',
    icon: 'ShieldCheck',
    highlightColor: 'from-emerald-500/10 to-teal-500/10',
    borderColor: 'border-emerald-200'
  },
  {
    title: 'Smart Urgency Prioritization',
    stat: '3.4x',
    statLabel: 'Faster triage for high-impact urban hazards',
    description: 'Tickets with multiple citizen confirmations, critical asset tags, or school/hospital zone proximity automatically elevate to priority dispatch.',
    icon: 'TrendingUp',
    highlightColor: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-200'
  },
  {
    title: 'Transparent End-to-End SLA',
    stat: '98.8%',
    statLabel: 'SLA compliance across verified field closures',
    description: 'Field technicians upload mandatory resolution photos with geo-stamps before a ticket can be closed, ensuring total public trust.',
    icon: 'CheckSquare',
    highlightColor: 'from-indigo-500/10 to-purple-500/10',
    borderColor: 'border-indigo-200'
  }
];

export const duplicateCaseStudy = {
  legacy: {
    title: 'Traditional 311 / Call Center Portal',
    points: [
      '30 citizens call or submit separate complaints for the same broken streetlight.',
      '30 distinct tickets created in municipal CRM requiring manual review.',
      'Dispatchers waste 4+ hours sorting through duplicate entries and phone logs.',
      'Citizens get frustrated with lack of live visibility and log more duplicate tickets.'
    ]
  },
  urbanQr: {
    title: 'UrbanQR Smart Deduplication Shield',
    points: [
      '1st citizen logs "Light flickering & dark corner" via QR scan.',
      'Next 29 citizens scan the same QR and see "Issue already reported 15 mins ago (In Triage)".',
      'Citizens tap "Confirm This Issue (+1)" in 1 second with optional notification.',
      'Single consolidated ticket auto-elevates in priority; all 30 citizens get notified on resolution.'
    ]
  }
};
