import type {
  Opportunity,
  Review,
  Source,
  DashboardStats,
} from "./types";

export const mockOpportunities: Opportunity[] = [
  {
    id: "opp-001",
    title: "Manchester United Away Trip - Champions League",
    description:
      "Large group of supporters looking for organized travel to Barcelona for the Champions League quarterfinal. Active discussion with 250+ interested members.",
    type: "fan-travel",
    status: "new",
    complianceStatus: "verified",
    source: "reddit",
    sourceUrl: "https://reddit.com/r/reddevils/comments/xyz",
    sourcePost: {
      author: "RedDevilTraveler92",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RedDevil",
      content: "Hey fellow Reds! Who's up for organizing a proper away trip to Barcelona for the CL quarterfinal? We could charter buses from Manchester, book a block of hotel rooms, and make a proper weekend of it. Already have 50+ confirmed interested in my WhatsApp group. Let's make some noise at Camp Nou! Drop a comment if you're in and what your budget is looking like. Thinking £400-600 all-in for transport, 2 nights hotel, and match ticket.",
      engagement: {
        likes: 847,
        comments: 234,
        shares: 89
      },
      postedAt: "2026-03-08T14:30:00Z"
    },
    location: "Barcelona, Spain",
    eventDate: "2026-04-15",
    groupSize: 250,
    estimatedRevenue: 125000,
    confidence: 92,
    monetizationScore: 88,
    demandMetrics: {
      confirmedInterest: 187,
      potentialReach: 450,
      engagementRate: 34.5,
      growthTrend: "rising",
      sentimentScore: 92
    },
    revenueProjection: {
      lowEstimate: 95000,
      midEstimate: 125000,
      highEstimate: 165000,
      perPersonAverage: 500,
      marginPercent: 22
    },
    activities: [
      {
        id: "act-001-1",
        type: "created",
        description: "Opportunity discovered by AI Scanner",
        user: "AI Scanner",
        timestamp: "2026-03-10T08:30:00Z"
      },
      {
        id: "act-001-2",
        type: "ai_analysis",
        description: "AI confidence score calculated: 92% - High engagement, verified community",
        user: "AI Analyzer",
        timestamp: "2026-03-10T08:35:00Z"
      },
      {
        id: "act-001-3",
        type: "compliance_check",
        description: "Source verified - Established subreddit with 340k members",
        user: "Compliance Bot",
        timestamp: "2026-03-10T09:00:00Z"
      },
      {
        id: "act-001-4",
        type: "status_change",
        description: "Status changed from 'new' to 'under-review'",
        user: "System",
        timestamp: "2026-03-12T10:15:00Z"
      }
    ],
    reviewComments: [
      {
        id: "rc-001-1",
        reviewer: "Sarah Chen",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        comment: "Strong opportunity - the engagement numbers are excellent and the timing aligns well with our Barcelona partnerships.",
        sentiment: "positive",
        timestamp: "2026-03-12T11:30:00Z"
      }
    ],
    createdAt: "2026-03-10T08:30:00Z",
    updatedAt: "2026-03-14T10:15:00Z",
    tags: ["football", "champions-league", "europe"],
  },
  {
    id: "opp-002",
    title: "Taylor Swift Eras Tour - Vienna Demand Surge",
    description:
      "Massive demand detected for Taylor Swift Vienna dates. Multiple forum threads with 500+ potential travelers from UK seeking group packages.",
    type: "concert-demand",
    status: "under-review",
    complianceStatus: "pending",
    source: "twitter",
    sourceUrl: "https://twitter.com/swifties_uk/status/123",
    sourcePost: {
      author: "SwiftiesUKOfficial",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Swiftie",
      content: "SWIFTIES! 🎤 Vienna tickets just dropped and we're SOLD OUT in the UK allocation! But there's hope - we're organizing group travel packages to Vienna. Think Eurostar + hotel bundles, airport transfers, and pre-show meetups! Already have 500+ names on our interest list. RT to help spread the word! Reply with your city and we'll try to organize regional groups. #ErasTourVienna #SwiftiesTravel",
      engagement: {
        likes: 4523,
        comments: 1876,
        shares: 2341
      },
      postedAt: "2026-03-05T09:15:00Z"
    },
    location: "Vienna, Austria",
    eventDate: "2026-06-20",
    groupSize: 500,
    estimatedRevenue: 200000,
    confidence: 88,
    monetizationScore: 94,
    demandMetrics: {
      confirmedInterest: 523,
      potentialReach: 2500,
      engagementRate: 42.8,
      growthTrend: "rising",
      sentimentScore: 98
    },
    revenueProjection: {
      lowEstimate: 150000,
      midEstimate: 200000,
      highEstimate: 280000,
      perPersonAverage: 400,
      marginPercent: 18
    },
    activities: [
      {
        id: "act-002-1",
        type: "created",
        description: "Opportunity discovered by AI Scanner via Twitter API",
        user: "AI Scanner",
        timestamp: "2026-03-08T14:20:00Z"
      },
      {
        id: "act-002-2",
        type: "ai_analysis",
        description: "Viral potential detected - 2.3k retweets in first 24 hours",
        user: "AI Analyzer",
        timestamp: "2026-03-08T14:25:00Z"
      },
      {
        id: "act-002-3",
        type: "assigned",
        description: "Assigned to Sarah Chen for review",
        user: "Auto-Assignment",
        timestamp: "2026-03-09T09:00:00Z"
      },
      {
        id: "act-002-4",
        type: "status_change",
        description: "Status changed to 'under-review'",
        user: "Sarah Chen",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        timestamp: "2026-03-09T09:05:00Z"
      },
      {
        id: "act-002-5",
        type: "comment",
        description: "Added review comment",
        user: "Sarah Chen",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        timestamp: "2026-03-13T16:45:00Z"
      }
    ],
    reviewComments: [
      {
        id: "rc-002-1",
        reviewer: "Sarah Chen",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        comment: "Incredible viral reach but need to verify the account organizer's legitimacy. The engagement numbers are almost too good - requesting additional source verification.",
        sentiment: "neutral",
        timestamp: "2026-03-13T16:45:00Z"
      },
      {
        id: "rc-002-2",
        reviewer: "Mike Johnson",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        comment: "I've worked with SwiftiesUK before on the London dates - they're legit. Very organized community with good payment track record.",
        sentiment: "positive",
        timestamp: "2026-03-14T09:20:00Z"
      }
    ],
    createdAt: "2026-03-08T14:20:00Z",
    updatedAt: "2026-03-13T16:45:00Z",
    assignedTo: "Sarah Chen",
    tags: ["music", "pop", "europe"],
  },
  {
    id: "opp-003",
    title: "Liverpool FC Supporters Club - Madrid Final",
    description:
      "Official supporters club organizing charter flights and accommodation for potential Champions League final in Madrid.",
    type: "supporter-trip",
    status: "approved",
    complianceStatus: "verified",
    source: "facebook",
    sourceUrl: "https://facebook.com/groups/lfcsupporters",
    sourcePost: {
      author: "LFC Official Supporters",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LFC",
      content: "YNWA! 🔴 As we prepare for what could be another historic Champions League run, we're getting ahead on travel planning. Madrid final packages NOW AVAILABLE for booking. Includes: Return charter flight from Liverpool John Lennon, 3 nights 4-star hotel, match ticket (subject to allocation), airport transfers. Early bird price: £1,200pp. Deposit of £300 secures your spot. Limited to 180 spaces.",
      engagement: {
        likes: 2156,
        comments: 567,
        shares: 423
      },
      postedAt: "2026-03-01T10:00:00Z"
    },
    location: "Madrid, Spain",
    eventDate: "2026-05-28",
    groupSize: 180,
    estimatedRevenue: 90000,
    confidence: 95,
    monetizationScore: 91,
    demandMetrics: {
      confirmedInterest: 180,
      potentialReach: 320,
      engagementRate: 28.4,
      growthTrend: "stable",
      sentimentScore: 95
    },
    revenueProjection: {
      lowEstimate: 75000,
      midEstimate: 90000,
      highEstimate: 108000,
      perPersonAverage: 500,
      marginPercent: 24
    },
    activities: [
      {
        id: "act-003-1",
        type: "created",
        description: "Opportunity discovered by AI Scanner",
        user: "AI Scanner",
        timestamp: "2026-03-05T09:00:00Z"
      },
      {
        id: "act-003-2",
        type: "compliance_check",
        description: "Official supporters club verified - Partnership on file",
        user: "Compliance Bot",
        timestamp: "2026-03-05T09:30:00Z"
      },
      {
        id: "act-003-3",
        type: "assigned",
        description: "Assigned to Mike Johnson",
        user: "Auto-Assignment",
        timestamp: "2026-03-05T10:00:00Z"
      },
      {
        id: "act-003-4",
        type: "status_change",
        description: "Fast-tracked to approved - Existing partner relationship",
        user: "Mike Johnson",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        timestamp: "2026-03-06T14:00:00Z"
      }
    ],
    reviewComments: [
      {
        id: "rc-003-1",
        reviewer: "Mike Johnson",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        comment: "Fast-track approved. We have an existing partnership with LFC Official Supporters. They've successfully completed 8 trips with us in the past 2 seasons with zero issues.",
        sentiment: "positive",
        timestamp: "2026-03-06T14:00:00Z"
      }
    ],
    createdAt: "2026-03-05T09:00:00Z",
    updatedAt: "2026-03-12T11:30:00Z",
    assignedTo: "Mike Johnson",
    tags: ["football", "champions-league", "charter"],
  },
  {
    id: "opp-004",
    title: "Mentawai Islands Surf Camp Group",
    description:
      "Experienced surfers seeking group charter boat trip to Mentawai Islands. Discussion shows 40 confirmed interested surfers for 2-week expedition.",
    type: "surf-trip",
    status: "new",
    complianceStatus: "verified",
    source: "forum",
    sourceUrl: "https://magicseaweed.com/forum/thread/456",
    sourcePost: {
      author: "WaveHunter_Pro",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WaveHunter",
      content: "Alright wave riders, been planning this for months and finally ready to pull the trigger! Looking for experienced surfers (intermediate+) for a 14-day Mentawai boat charter this July. The boat fits 12 but we're booking 4 boats so 48 spots total. Price working out to around $3,500 USD all-in including domestic flights from Padang, full board, and unlimited surf sessions at HTs, Lances, Macaronis etc. Deposit is $1,000 to hold your spot. Who's keen? 🤙",
      engagement: {
        likes: 234,
        comments: 89,
        shares: 45
      },
      postedAt: "2026-03-09T06:30:00Z"
    },
    location: "Mentawai Islands, Indonesia",
    eventDate: "2026-07-10",
    groupSize: 40,
    estimatedRevenue: 80000,
    confidence: 85,
    monetizationScore: 82,
    demandMetrics: {
      confirmedInterest: 38,
      potentialReach: 120,
      engagementRate: 18.7,
      growthTrend: "stable",
      sentimentScore: 88
    },
    revenueProjection: {
      lowEstimate: 65000,
      midEstimate: 80000,
      highEstimate: 95000,
      perPersonAverage: 2000,
      marginPercent: 15
    },
    activities: [
      {
        id: "act-004-1",
        type: "created",
        description: "Opportunity discovered by AI Scanner on Magic Seaweed forums",
        user: "AI Scanner",
        timestamp: "2026-03-11T12:00:00Z"
      },
      {
        id: "act-004-2",
        type: "ai_analysis",
        description: "Niche but high-value segment - Premium adventure travel demographic",
        user: "AI Analyzer",
        timestamp: "2026-03-11T12:10:00Z"
      },
      {
        id: "act-004-3",
        type: "compliance_check",
        description: "Forum user verified - 8 year account history, 2k+ posts",
        user: "Compliance Bot",
        timestamp: "2026-03-11T12:30:00Z"
      }
    ],
    reviewComments: [],
    createdAt: "2026-03-11T12:00:00Z",
    updatedAt: "2026-03-14T08:00:00Z",
    tags: ["surfing", "adventure", "asia"],
  },
  {
    id: "opp-005",
    title: "British Expats Portugal Relocation Group",
    description:
      "Growing community of UK expats planning group viewing trips to Algarve region. Regular monthly trips with 30-50 participants.",
    type: "expat-travel",
    status: "under-review",
    complianceStatus: "pending",
    source: "facebook",
    sourceUrl: "https://facebook.com/groups/britsinportugal",
    sourcePost: {
      author: "AlgarveExpatsUK",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Algarve",
      content: "🇵🇹 APRIL PROPERTY VIEWING TRIP 🇵🇹 We're running another group viewing trip to Algarve! Perfect for those seriously considering the move. Package includes: 4 days/3 nights in Albufeira, guided tours of 6-8 properties in your budget range, meetings with local solicitors and banks, dinner with existing expats who've made the move. All for £450pp. Flying from Gatwick. Limited to 45 spaces. Over 200 members have used these trips to find their dream Portuguese home!",
      engagement: {
        likes: 312,
        comments: 156,
        shares: 78
      },
      postedAt: "2026-03-07T12:00:00Z"
    },
    location: "Algarve, Portugal",
    eventDate: "2026-04-01",
    groupSize: 45,
    estimatedRevenue: 22500,
    confidence: 78,
    monetizationScore: 71,
    demandMetrics: {
      confirmedInterest: 43,
      potentialReach: 85,
      engagementRate: 22.1,
      growthTrend: "rising",
      sentimentScore: 84
    },
    revenueProjection: {
      lowEstimate: 18000,
      midEstimate: 22500,
      highEstimate: 28000,
      perPersonAverage: 500,
      marginPercent: 20
    },
    activities: [
      {
        id: "act-005-1",
        type: "created",
        description: "Opportunity discovered by AI Scanner",
        user: "AI Scanner",
        timestamp: "2026-03-09T15:30:00Z"
      },
      {
        id: "act-005-2",
        type: "assigned",
        description: "Assigned to Emma Williams",
        user: "Auto-Assignment",
        timestamp: "2026-03-10T09:00:00Z"
      },
      {
        id: "act-005-3",
        type: "comment",
        description: "Emma Williams added a review comment",
        user: "Emma Williams",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        timestamp: "2026-03-13T09:20:00Z"
      }
    ],
    reviewComments: [
      {
        id: "rc-005-1",
        reviewer: "Emma Williams",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        comment: "Recurring opportunity with established organizer, but margins are tight. Suggest we focus on upselling airport transfers and travel insurance.",
        sentiment: "neutral",
        timestamp: "2026-03-13T09:20:00Z"
      }
    ],
    createdAt: "2026-03-09T15:30:00Z",
    updatedAt: "2026-03-13T09:20:00Z",
    assignedTo: "Emma Williams",
    tags: ["expat", "relocation", "europe"],
  },
  {
    id: "opp-006",
    title: "Corporate Golf Tournament Charter - Dubai",
    description:
      "Tech company seeking charter flight for 120 employees to Dubai for annual golf tournament and team building event.",
    type: "charter",
    status: "approved",
    complianceStatus: "verified",
    source: "discord",
    sourceUrl: "https://discord.gg/techgolf",
    sourcePost: {
      author: "TechCorpEvents",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp",
      content: "Hey team! Quick update on the annual Dubai golf trip. We've got budget approval for 120 people this year (up from 80 last year!). Looking for charter flight quotes ex-London. Dates: May 14-18. Need business class equivalent, in-flight catering, and flexible rebooking terms. Also need golf resort accommodation block and transfers. Budget is £1,500pp. DM me if you have contacts with charter companies or travel agencies that handle corporate groups.",
      engagement: {
        likes: 89,
        comments: 45,
        shares: 12
      },
      postedAt: "2026-03-04T16:00:00Z"
    },
    location: "Dubai, UAE",
    eventDate: "2026-05-15",
    groupSize: 120,
    estimatedRevenue: 180000,
    confidence: 97,
    monetizationScore: 96,
    demandMetrics: {
      confirmedInterest: 120,
      potentialReach: 120,
      engagementRate: 100,
      growthTrend: "stable",
      sentimentScore: 94
    },
    revenueProjection: {
      lowEstimate: 165000,
      midEstimate: 180000,
      highEstimate: 195000,
      perPersonAverage: 1500,
      marginPercent: 28
    },
    activities: [
      {
        id: "act-006-1",
        type: "created",
        description: "Opportunity discovered via Discord monitoring",
        user: "AI Scanner",
        timestamp: "2026-03-06T10:45:00Z"
      },
      {
        id: "act-006-2",
        type: "ai_analysis",
        description: "High-value corporate client detected - Premium charter segment",
        user: "AI Analyzer",
        timestamp: "2026-03-06T10:50:00Z"
      },
      {
        id: "act-006-3",
        type: "compliance_check",
        description: "Corporate entity verified - Tech company with 2000+ employees",
        user: "Compliance Bot",
        timestamp: "2026-03-06T11:00:00Z"
      },
      {
        id: "act-006-4",
        type: "assigned",
        description: "Priority assigned to David Brown (Corporate Accounts)",
        user: "Auto-Assignment",
        timestamp: "2026-03-06T11:30:00Z"
      },
      {
        id: "act-006-5",
        type: "status_change",
        description: "Approved - Contract signed and 50% deposit received",
        user: "David Brown",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        timestamp: "2026-03-11T14:00:00Z"
      }
    ],
    reviewComments: [
      {
        id: "rc-006-1",
        reviewer: "David Brown",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        comment: "Spoke with their events coordinator. They've done this trip 3 years running with different providers. We're offering 15% better pricing than their current quote. Contract signed, deposit received.",
        sentiment: "positive",
        timestamp: "2026-03-11T14:00:00Z"
      }
    ],
    createdAt: "2026-03-06T10:45:00Z",
    updatedAt: "2026-03-11T14:00:00Z",
    assignedTo: "David Brown",
    tags: ["corporate", "golf", "charter", "middle-east"],
  },
  {
    id: "opp-007",
    title: "Coldplay World Tour - Singapore Fanbase",
    description:
      "SEA Coldplay fans coordinating group travel to Singapore for upcoming tour dates. Multiple telegram groups with combined 800+ members.",
    type: "concert-demand",
    status: "new",
    complianceStatus: "flagged",
    source: "telegram",
    sourceUrl: "https://t.me/coldplayasia",
    sourcePost: {
      author: "ColdplayAsiaTours",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Coldplay",
      content: "📢 COLDPLAY SINGAPORE CONFIRMED! 📢 Dates: Aug 12-14. We're coordinating travel for fans across SEA. Current interest: Indonesia 🇮🇩 (350+), Malaysia 🇲🇾 (200+), Thailand 🇹🇭 (150+), Philippines 🇵🇭 (100+). Looking to partner with a travel agency for official fan packages. Need: Group flights, hotel blocks near National Stadium, match day transport, fan meetup venue. Contact @ColdplayAsiaMod if you're a travel company interested in partnering!",
      engagement: {
        likes: 1245,
        comments: 678,
        shares: 534
      },
      postedAt: "2026-03-11T04:00:00Z"
    },
    location: "Singapore",
    eventDate: "2026-08-12",
    groupSize: 800,
    estimatedRevenue: 320000,
    confidence: 72,
    monetizationScore: 78,
    demandMetrics: {
      confirmedInterest: 456,
      potentialReach: 1200,
      engagementRate: 38.0,
      growthTrend: "rising",
      sentimentScore: 91
    },
    revenueProjection: {
      lowEstimate: 240000,
      midEstimate: 320000,
      highEstimate: 420000,
      perPersonAverage: 400,
      marginPercent: 16
    },
    activities: [
      {
        id: "act-007-1",
        type: "created",
        description: "Opportunity discovered via Telegram monitoring",
        user: "AI Scanner",
        timestamp: "2026-03-12T07:15:00Z"
      },
      {
        id: "act-007-2",
        type: "ai_analysis",
        description: "Large scale opportunity - Multi-country coordination required",
        user: "AI Analyzer",
        timestamp: "2026-03-12T07:20:00Z"
      },
      {
        id: "act-007-3",
        type: "compliance_check",
        description: "⚠️ FLAGGED: Telegram group organizer identity unverified",
        user: "Compliance Bot",
        timestamp: "2026-03-12T07:30:00Z"
      }
    ],
    reviewComments: [
      {
        id: "rc-007-1",
        reviewer: "Sarah Chen",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        comment: "High potential but flagged for compliance. We need to verify the Telegram admin's identity before proceeding. The scale is attractive but risk is elevated for unverified organizers.",
        sentiment: "concern",
        timestamp: "2026-03-14T06:30:00Z"
      }
    ],
    createdAt: "2026-03-12T07:15:00Z",
    updatedAt: "2026-03-14T06:30:00Z",
    tags: ["music", "rock", "asia"],
  },
  {
    id: "opp-008",
    title: "Celtic FC Europa League Away Days",
    description:
      "Celtic supporters organizing multiple away trips for Europa League group stages. Established travel club with reliable booking history.",
    type: "supporter-trip",
    status: "approved",
    complianceStatus: "verified",
    source: "twitter",
    sourceUrl: "https://twitter.com/celtictravel",
    sourcePost: {
      author: "CelticTravelClub",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Celtic",
      content: "🍀 EUROPA LEAGUE AWAY PACKAGES 🍀 Confirmed group stage opponents draw means we're heading to: Dortmund 🇩🇪, Lyon 🇫🇷, and Salzburg 🇦🇹! Packages for all 3 trips now live. 200 spots per trip. Prices from £350 including flights, 1 night hotel, and away end ticket (subject to allocation). Booking link in bio. Members get 10% off. See you on the road! 💚",
      engagement: {
        likes: 1876,
        comments: 423,
        shares: 567
      },
      postedAt: "2026-02-28T18:00:00Z"
    },
    location: "Various European Cities",
    eventDate: "2026-09-01",
    groupSize: 200,
    estimatedRevenue: 100000,
    confidence: 91,
    monetizationScore: 87,
    demandMetrics: {
      confirmedInterest: 184,
      potentialReach: 450,
      engagementRate: 31.2,
      growthTrend: "stable",
      sentimentScore: 93
    },
    revenueProjection: {
      lowEstimate: 85000,
      midEstimate: 100000,
      highEstimate: 120000,
      perPersonAverage: 500,
      marginPercent: 22
    },
    activities: [
      {
        id: "act-008-1",
        type: "created",
        description: "Opportunity discovered by AI Scanner",
        user: "AI Scanner",
        timestamp: "2026-03-04T13:00:00Z"
      },
      {
        id: "act-008-2",
        type: "compliance_check",
        description: "Verified - Existing partner with 5+ year relationship",
        user: "Compliance Bot",
        timestamp: "2026-03-04T13:15:00Z"
      },
      {
        id: "act-008-3",
        type: "assigned",
        description: "Assigned to Sarah Chen",
        user: "Auto-Assignment",
        timestamp: "2026-03-04T14:00:00Z"
      },
      {
        id: "act-008-4",
        type: "status_change",
        description: "Approved - Renewal of existing partnership",
        user: "Sarah Chen",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        timestamp: "2026-03-05T10:00:00Z"
      }
    ],
    reviewComments: [
      {
        id: "rc-008-1",
        reviewer: "Sarah Chen",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        comment: "Long-standing partner with excellent track record. Auto-approved under existing partnership agreement. They've consistently delivered 95%+ booking completion rate.",
        sentiment: "positive",
        timestamp: "2026-03-05T10:00:00Z"
      }
    ],
    createdAt: "2026-03-04T13:00:00Z",
    updatedAt: "2026-03-10T17:45:00Z",
    assignedTo: "Sarah Chen",
    tags: ["football", "europa-league", "europe"],
  },
  {
    id: "opp-009",
    title: "Bali Surf Retreat - Intermediate Group",
    description:
      "Surf school organizing intermediate level group trip to Bali. 60 confirmed participants seeking accommodation and transport package.",
    type: "surf-trip",
    status: "rejected",
    complianceStatus: "unknown",
    source: "instagram",
    sourceUrl: "https://instagram.com/p/surfbali",
    sourcePost: {
      author: "SurfVibesCo",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SurfVibes",
      content: "🏄‍♂️ BALI SURF RETREAT 2026 🏄‍♀️ Taking bookings for our June intermediate surf camp! 7 days of perfect waves, yoga, and good vibes. Price: $899 includes accommodation, breakfast, 3 surf sessions per day with instruction, and airport transfers. 60 spots available. DM to book! 🌴🌊 #BaliSurf #SurfRetreat #IntermediateSurf",
      engagement: {
        likes: 456,
        comments: 87,
        shares: 34
      },
      postedAt: "2026-03-05T10:00:00Z"
    },
    location: "Bali, Indonesia",
    eventDate: "2026-06-05",
    groupSize: 60,
    estimatedRevenue: 45000,
    confidence: 65,
    monetizationScore: 58,
    demandMetrics: {
      confirmedInterest: 28,
      potentialReach: 90,
      engagementRate: 12.4,
      growthTrend: "declining",
      sentimentScore: 72
    },
    revenueProjection: {
      lowEstimate: 35000,
      midEstimate: 45000,
      highEstimate: 54000,
      perPersonAverage: 750,
      marginPercent: 12
    },
    activities: [
      {
        id: "act-009-1",
        type: "created",
        description: "Opportunity discovered by AI Scanner on Instagram",
        user: "AI Scanner",
        timestamp: "2026-03-07T16:20:00Z"
      },
      {
        id: "act-009-2",
        type: "ai_analysis",
        description: "Low confidence - Limited engagement, unverified organizer",
        user: "AI Analyzer",
        timestamp: "2026-03-07T16:25:00Z"
      },
      {
        id: "act-009-3",
        type: "assigned",
        description: "Assigned to Mike Johnson for review",
        user: "Auto-Assignment",
        timestamp: "2026-03-08T09:00:00Z"
      },
      {
        id: "act-009-4",
        type: "status_change",
        description: "Rejected - Below minimum group size threshold for charter",
        user: "Mike Johnson",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        timestamp: "2026-03-09T12:00:00Z"
      }
    ],
    reviewComments: [
      {
        id: "rc-009-1",
        reviewer: "Mike Johnson",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        comment: "Rejecting - group size is below our charter threshold and the organizer couldn't provide business documentation. Referred to our partner agency for standard bookings.",
        sentiment: "concern",
        timestamp: "2026-03-09T12:00:00Z"
      }
    ],
    createdAt: "2026-03-07T16:20:00Z",
    updatedAt: "2026-03-09T12:00:00Z",
    tags: ["surfing", "beginner", "asia"],
  },
  {
    id: "opp-010",
    title: "American Expats Spain - Costa del Sol",
    description:
      "US expat community in Spain organizing quarterly property viewing tours along Costa del Sol. Consistent demand with repeat customers.",
    type: "expat-travel",
    status: "under-review",
    complianceStatus: "verified",
    source: "facebook",
    sourceUrl: "https://facebook.com/groups/americansinspain",
    sourcePost: {
      author: "AmericansInSpainOfficial",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmericansSpain",
      content: "🇺🇸➡️🇪🇸 Q2 PROPERTY TOUR: COSTA DEL SOL 🌞 Our most popular viewing trip is back! 5 days exploring Marbella, Estepona, and Mijas. Includes: Direct flight from Miami, boutique hotel stay, 8-10 property viewings, meeting with tax advisors familiar with US expat issues, welcome dinner with long-term expats. $1,800 all-in. Max 35 guests for personalized experience. Q1 trip sold out in 48 hours - don't miss Q2!",
      engagement: {
        likes: 567,
        comments: 189,
        shares: 145
      },
      postedAt: "2026-03-08T14:00:00Z"
    },
    location: "Costa del Sol, Spain",
    eventDate: "2026-04-20",
    groupSize: 35,
    estimatedRevenue: 17500,
    confidence: 82,
    monetizationScore: 76,
    demandMetrics: {
      confirmedInterest: 32,
      potentialReach: 65,
      engagementRate: 24.8,
      growthTrend: "rising",
      sentimentScore: 89
    },
    revenueProjection: {
      lowEstimate: 14000,
      midEstimate: 17500,
      highEstimate: 21000,
      perPersonAverage: 500,
      marginPercent: 18
    },
    activities: [
      {
        id: "act-010-1",
        type: "created",
        description: "Opportunity discovered by AI Scanner",
        user: "AI Scanner",
        timestamp: "2026-03-10T11:00:00Z"
      },
      {
        id: "act-010-2",
        type: "compliance_check",
        description: "Verified - Established Facebook group with 15k+ members",
        user: "Compliance Bot",
        timestamp: "2026-03-10T11:30:00Z"
      },
      {
        id: "act-010-3",
        type: "comment",
        description: "Review comment added",
        user: "Emma Williams",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        timestamp: "2026-03-13T15:30:00Z"
      }
    ],
    reviewComments: [
      {
        id: "rc-010-1",
        reviewer: "Emma Williams",
        reviewerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        comment: "Solid recurring opportunity. They run these quarterly and have approached us for partnership. Revenue per trip is modest but recurring revenue is attractive. Recommend approving and offering multi-trip contract.",
        sentiment: "positive",
        timestamp: "2026-03-13T15:30:00Z"
      }
    ],
    createdAt: "2026-03-10T11:00:00Z",
    updatedAt: "2026-03-13T15:30:00Z",
    tags: ["expat", "relocation", "europe"],
  },
];

export const mockReviews: Review[] = [
  {
    id: "rev-001",
    opportunityId: "opp-002",
    opportunityTitle: "Taylor Swift Eras Tour - Vienna Demand Surge",
    reviewer: "Sarah Chen",
    status: "pending",
    notes: "Awaiting confirmation of venue capacity and date availability.",
    createdAt: "2026-03-13T10:00:00Z",
  },
  {
    id: "rev-002",
    opportunityId: "opp-003",
    opportunityTitle: "Liverpool FC Supporters Club - Madrid Final",
    reviewer: "Mike Johnson",
    status: "approved",
    notes: "Verified with official supporters club. Charter pricing confirmed.",
    createdAt: "2026-03-12T14:30:00Z",
  },
  {
    id: "rev-003",
    opportunityId: "opp-005",
    opportunityTitle: "British Expats Portugal Relocation Group",
    reviewer: "Emma Williams",
    status: "pending",
    notes: "Need to verify group organizer credentials and payment history.",
    createdAt: "2026-03-13T09:15:00Z",
  },
  {
    id: "rev-004",
    opportunityId: "opp-006",
    opportunityTitle: "Corporate Golf Tournament Charter - Dubai",
    reviewer: "David Brown",
    status: "approved",
    notes: "Corporate client verified. Contract signed and deposit received.",
    createdAt: "2026-03-11T16:00:00Z",
  },
  {
    id: "rev-005",
    opportunityId: "opp-009",
    opportunityTitle: "Bali Surf Retreat - Intermediate Group",
    reviewer: "Mike Johnson",
    status: "rejected",
    notes: "Group size too small for charter. Redirected to partner agency.",
    createdAt: "2026-03-09T11:45:00Z",
  },
];

export const mockSources: Source[] = [
  {
    id: "src-001",
    name: "Reddit Sports Travel",
    type: "reddit",
    status: "active",
    lastSync: "2026-03-14T09:00:00Z",
    opportunitiesFound: 156,
    url: "https://reddit.com/r/sportstravel",
  },
  {
    id: "src-002",
    name: "Twitter Fan Groups",
    type: "twitter",
    status: "active",
    lastSync: "2026-03-14T09:15:00Z",
    opportunitiesFound: 89,
    url: "https://twitter.com/search",
  },
  {
    id: "src-003",
    name: "Facebook Travel Groups",
    type: "facebook",
    status: "active",
    lastSync: "2026-03-14T08:45:00Z",
    opportunitiesFound: 234,
    url: "https://facebook.com/groups",
  },
  {
    id: "src-004",
    name: "Instagram Travel Tags",
    type: "instagram",
    status: "paused",
    lastSync: "2026-03-12T14:00:00Z",
    opportunitiesFound: 45,
    url: "https://instagram.com/explore/tags",
  },
  {
    id: "src-005",
    name: "Magic Seaweed Forums",
    type: "forum",
    status: "active",
    lastSync: "2026-03-14T07:30:00Z",
    opportunitiesFound: 67,
    url: "https://magicseaweed.com/forum",
  },
  {
    id: "src-006",
    name: "Discord Travel Servers",
    type: "discord",
    status: "active",
    lastSync: "2026-03-14T09:30:00Z",
    opportunitiesFound: 112,
    url: "https://discord.com/servers",
  },
  {
    id: "src-007",
    name: "Telegram Groups Monitor",
    type: "telegram",
    status: "error",
    lastSync: "2026-03-13T22:00:00Z",
    opportunitiesFound: 78,
    url: "https://telegram.org",
  },
];

export const mockDashboardStats: DashboardStats = {
  totalOpportunities: 847,
  newThisWeek: 124,
  pendingReview: 38,
  approvedThisMonth: 67,
  estimatedRevenue: 2850000,
  avgConfidence: 84,
};
