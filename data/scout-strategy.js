/* ALDAR ROBOTICS SCOUT: strategy parameters (weights, knock-outs, verdict rules, presets).
   Edit here to change how every provider is ranked; no new research is needed. */
window.SCOUT_STRATEGY = {
 "_readme": "Aldar Robotics Scout: preset strategy parameters. Pillar scores (0-5) come from research with evidence; the Fit Score, knock-outs, verdict and matrix are calculated in the browser from this file, so changing a weight re-ranks everything without new research. Draft weights: to be confirmed by the robotics team.",
 "version": "2026-10-31-draft",
 "strategy_summary": "Aldar deploys robotics across its communities, malls, offices, schools and construction sites in Abu Dhabi and the wider UAE, prioritising proven, safe technology that can be supported locally and operates in GCC heat and dust.",
 "asset_types": [
  "residential communities",
  "retail malls",
  "offices",
  "schools",
  "construction sites",
  "hospitality"
 ],
 "priority_use_cases": [
  {
   "category": "construction",
   "label": "Construction & site robotics",
   "examples": [
    "painting and plastering",
    "layout marking",
    "concrete levelling",
    "drywall and interior finishing",
    "site progress scanning"
   ]
  },
  {
   "category": "facade",
   "label": "Façade & building maintenance",
   "examples": [
    "high-rise façade and window cleaning",
    "solar panel cleaning"
   ]
  },
  {
   "category": "inspection",
   "label": "Inspection & drones",
   "examples": [
    "quadruped site inspection",
    "drone façade and roof inspection",
    "hidden cavity inspection",
    "thermal surveys"
   ]
  },
  {
   "category": "cleaning",
   "label": "Floor cleaning",
   "examples": [
    "mall and office scrubbers",
    "outdoor sweepers",
    "car park cleaning"
   ]
  },
  {
   "category": "security",
   "label": "Security & patrol",
   "examples": [
    "community patrol",
    "car park patrol",
    "perimeter drones"
   ]
  },
  {
   "category": "delivery",
   "label": "Delivery & autonomous mobility",
   "examples": [
    "last-mile delivery in communities",
    "autonomous shuttles",
    "in-building delivery"
   ]
  },
  {
   "category": "humanoids",
   "label": "Humanoids & guest engagement",
   "examples": [
    "concierge and wayfinding",
    "reception",
    "retail engagement"
   ]
  },
  {
   "category": "physical_ai",
   "label": "Physical AI & platforms",
   "examples": [
    "fleet management",
    "robot interoperability",
    "BMS/FM integration platforms"
   ]
  }
 ],
 "knockouts": [
  {
   "id": "sanctions",
   "label": "On a sanctions or restricted list (e.g. US entity list, UAE restrictions)"
  },
  {
   "id": "no_product",
   "label": "No working product: only renders or prototypes, no field use"
  },
  {
   "id": "uae_blocked",
   "label": "Cannot legally operate, import or be supported in the UAE"
  }
 ],
 "pillars": [
  {
   "id": "fit",
   "label": "Strategic fit",
   "weight": 25,
   "guide": "0 unrelated · 3 matches a priority use case · 5 matches a priority use case on our asset types with a clear Aldar site in mind"
  },
  {
   "id": "readiness",
   "label": "Technology readiness",
   "weight": 20,
   "guide": "0 concept · 1 prototype · 2 pilot · 3 early commercial · 4 commercial · 5 at scale with uptime data"
  },
  {
   "id": "deployments",
   "label": "Proven deployments",
   "weight": 20,
   "guide": "0 none · 1 one pilot · 3 several paid deployments · 5 many live deployments at comparable sites with named references"
  },
  {
   "id": "gcc",
   "label": "GCC readiness",
   "weight": 15,
   "guide": "0 no regional link · 2 distributor · 3 GCC customers · 4 local office/partner · 5 UAE deployments, heat/dust rated, approvals held"
  },
  {
   "id": "commercial",
   "label": "Commercial strength",
   "weight": 10,
   "guide": "funding, backers, revenue signals, headcount trend; 0 distressed · 5 well funded and growing"
  },
  {
   "id": "integration",
   "label": "Integration & safety",
   "weight": 10,
   "guide": "APIs/BMS/FM integration, safety certification (e.g. ISO 13482), cybersecurity, UAE data residency"
  }
 ],
 "verdict": {
  "shortlist": {
   "min_score": 70,
   "min_pillar": {
    "deployments": 3
   }
  },
  "watch": {
   "min_score": 50
  },
  "pass": {
   "below": 50
  }
 },
 "confidence": {
  "high": "3+ independent sources and at least one named customer",
  "medium": "2 independent sources",
  "low": "company's own claims only"
 },
 "limits": {
  "max_providers_per_search": 15,
  "deep_dive_top_n": 8,
  "max_web_searches_per_search": 30,
  "monthly_budget_usd": "TBC"
 },
 "maturity_stages": [
  {
   "n": 1,
   "label": "Emerging",
   "note": "Concept or prototype; no paying customers yet"
  },
  {
   "n": 2,
   "label": "Validating",
   "note": "Pilots and first paying customers"
  },
  {
   "n": 3,
   "label": "Deploying",
   "note": "Repeat commercial deployments"
  },
  {
   "n": 4,
   "label": "Scaling",
   "note": "Hundreds of units or many sites, several markets"
  },
  {
   "n": 5,
   "label": "Established",
   "note": "Market leader with large installed base"
  }
 ],
 "gcc_levels": [
  {
   "id": "none",
   "label": "No GCC link"
  },
  {
   "id": "distributor",
   "label": "Distributor only"
  },
  {
   "id": "gcc_customers",
   "label": "GCC customers"
  },
  {
   "id": "local_office",
   "label": "Local office or partner"
  },
  {
   "id": "uae_deployments",
   "label": "Deployed in the UAE"
  }
 ],
 "quadrants": {
  "split": {
   "fit": 70,
   "maturity": 3
  },
  "tr": {
   "id": "deploy",
   "label": "Deploy now",
   "note": "Strong fit and mature: ready for a trial or scale-up"
  },
  "tl": {
   "id": "fast",
   "label": "Fast mover",
   "note": "Strong fit, still maturing: pilot carefully, watch closely"
  },
  "br": {
   "id": "proven",
   "label": "Proven elsewhere",
   "note": "Mature but a weaker fit for Aldar today"
  },
  "bl": {
   "id": "early",
   "label": "Early bet",
   "note": "Early and weaker fit: track only"
  }
 },
 "presets": [
  {
   "id": "deploy",
   "label": "Deploy now",
   "filters": [
    {
     "field": "quadrant",
     "op": "any",
     "values": [
      "deploy"
     ]
    }
   ]
  },
  {
   "id": "gccready",
   "label": "GCC-ready",
   "filters": [
    {
     "field": "gcc",
     "op": "any",
     "values": [
      "local_office",
      "uae_deployments"
     ]
    }
   ]
  },
  {
   "id": "shortlist",
   "label": "Shortlist",
   "filters": [
    {
     "field": "verdict",
     "op": "any",
     "values": [
      "shortlist"
     ]
    }
   ]
  },
  {
   "id": "challengers",
   "label": "Challengers to our vendors",
   "filters": [
    {
     "field": "fleet",
     "op": "any",
     "values": [
      "no"
     ]
    },
    {
     "field": "category",
     "op": "any",
     "values": [
      "__fleet_categories__"
     ]
    }
   ]
  },
  {
   "id": "recent",
   "label": "Raised in the last 18 months",
   "filters": [
    {
     "field": "funding_recent",
     "op": "any",
     "values": [
      "yes"
     ]
    }
   ]
  },
  {
   "id": "ours",
   "label": "Already working with Aldar",
   "filters": [
    {
     "field": "fleet",
     "op": "any",
     "values": [
      "yes"
     ]
    }
   ]
  },
  {
   "id": "raas",
   "label": "Robot-as-a-service",
   "filters": [
    {
     "field": "model",
     "op": "any",
     "values": [
      "raas"
     ]
    }
   ]
  }
 ],
 "web_scout": {
  "_readme": "Scout the web (free): terms used to build Google News and Google searches for a typed need. 'match' is a pattern tried against the search text; the first match supplies English variants, context words that keep results on Aldar-relevant uses, and translations for Chinese, Japanese, Korean, German and Arabic searches. 'avoid' lists words that mark a headline as off-topic for Aldar (for example sports-field or car painting).",
  "filler": "solutions?|providers?|companies|company|vendors?|suppliers?|technology|technologies|systems?|tools?|options|for|the|and|of|in|best|top",
  "gcc_words": "UAE|Dubai|Abu Dhabi|Saudi|Riyadh|NEOM|Qatar|Doha|Kuwait|Bahrain|Oman|GCC|Gulf|Middle East|Sharjah",
  "terms": [
   {
    "id": "painting",
    "match": "paint|spray",
    "cat": "construction",
    "en": [
     "painting robot",
     "wall painting robot",
     "spray painting robot construction"
    ],
    "ctx": "construction OR building OR wall OR interior OR contractor",
    "zh": "喷涂机器人",
    "ja": "塗装ロボット",
    "ko": "도장 로봇",
    "de": "Malerroboter",
    "ar": "روبوت طلاء",
    "avoid": "fields?|football|soccer|sports?|athletic|stadium|art|artist|artwork|portrait|ink|canvas|car|cars|automotive|car-body|vehicle|collision|ship|hull|shipyard|road|roads|line marking|gundam|toy|trump|music|drinks|nail|tattoo|portrait|king charles|museum|gallery|auction|campaign|election|surgery|medical"
   },
   {
    "id": "plastering",
    "match": "plaster",
    "cat": "construction",
    "en": [
     "plastering robot",
     "wall plastering robot"
    ],
    "ctx": "construction OR building OR wall",
    "zh": "抹灰机器人",
    "de": "Verputzroboter",
    "avoid": "art|toy|surgery|cast"
   },
   {
    "id": "drywall",
    "match": "drywall|gypsum",
    "cat": "construction",
    "en": [
     "drywall robot",
     "drywall finishing robot"
    ],
    "ctx": "construction OR building OR interior"
   },
   {
    "id": "tiling",
    "match": "\\btil(e|es|ing)\\b",
    "cat": "construction",
    "en": [
     "tiling robot",
     "tile laying robot"
    ],
    "ctx": "construction OR building OR floor",
    "zh": "铺砖机器人"
   },
   {
    "id": "screed",
    "match": "screed|levell?ing|concrete",
    "cat": "construction",
    "en": [
     "concrete screeding robot",
     "concrete levelling robot"
    ],
    "ctx": "construction OR site OR floor",
    "zh": "地坪整平机器人"
   },
   {
    "id": "layout",
    "match": "layout|marking|setting.out",
    "cat": "construction",
    "en": [
     "construction layout robot",
     "layout marking robot"
    ],
    "ctx": "construction OR site OR jobsite",
    "zh": "放线机器人"
   },
   {
    "id": "brick",
    "match": "brick|masonry",
    "cat": "construction",
    "en": [
     "bricklaying robot"
    ],
    "ctx": "construction OR building OR site",
    "zh": "砌砖机器人",
    "de": "Maurerroboter"
   },
   {
    "id": "rebar",
    "match": "rebar",
    "cat": "construction",
    "en": [
     "rebar tying robot"
    ],
    "ctx": "construction OR site",
    "zh": "钢筋绑扎机器人"
   },
   {
    "id": "print3d",
    "match": "3d.?print",
    "cat": "construction",
    "en": [
     "construction 3D printing",
     "3D printed homes robot"
    ],
    "ctx": "construction OR building OR homes",
    "zh": "建筑3D打印"
   },
   {
    "id": "facade",
    "match": "fa[cç]ade|window|curtain.wall|high.?rise|glass",
    "cat": "facade",
    "en": [
     "facade cleaning robot",
     "window cleaning robot building",
     "facade cleaning drone"
    ],
    "ctx": "building OR tower OR high-rise OR skyscraper",
    "zh": "幕墙清洗机器人",
    "ja": "窓拭きロボット",
    "de": "Fassadenreinigung Roboter",
    "ar": "روبوت تنظيف الواجهات",
    "avoid": "home|household|deal|pool|car|aquarium|phone|winbot|hobot|hutt\\d*|window cleaner|ecovacs"
   },
   {
    "id": "solar",
    "match": "solar",
    "cat": "facade",
    "en": [
     "solar panel cleaning robot"
    ],
    "ctx": "solar OR rooftop OR PV",
    "zh": "光伏清扫机器人",
    "avoid": "space|satellite|mars"
   },
   {
    "id": "floor",
    "match": "floor|scrub|vacuum|clean|sweep|janitor",
    "cat": "cleaning",
    "en": [
     "commercial cleaning robot",
     "floor scrubber robot",
     "autonomous cleaning robot"
    ],
    "ctx": "commercial OR mall OR office OR airport OR facility",
    "zh": "商用清洁机器人",
    "ja": "清掃ロボット",
    "ko": "청소 로봇",
    "de": "Reinigungsroboter",
    "ar": "روبوت تنظيف",
    "avoid": "home|household|consumer|robot vacuums?|robovacs?|vacuums?|mops?|pool|pools|lawn|kitchen|dish|laundry|toilet|litter|roomba|roborock|dyson|deebot|eufy|shark|dreame|mova|narwal|irobot|underwater"
   },
   {
    "id": "security",
    "match": "secur|patrol|guard|surveillance",
    "cat": "security",
    "en": [
     "security robot",
     "patrol robot"
    ],
    "ctx": "security OR patrol OR mall OR community OR campus",
    "zh": "安防巡逻机器人",
    "ja": "警備ロボット",
    "ko": "순찰 로봇",
    "de": "Sicherheitsroboter",
    "ar": "روبوت أمني",
    "avoid": "toy|movie|film|game|cyber|software|password"
   },
   {
    "id": "delivery",
    "match": "deliver|last.?mile|parcel|courier",
    "cat": "delivery",
    "en": [
     "delivery robot",
     "autonomous delivery vehicle"
    ],
    "ctx": "delivery OR residential OR community OR last-mile",
    "zh": "无人配送车",
    "ja": "配送ロボット",
    "ko": "배송 로봇",
    "de": "Lieferroboter",
    "ar": "روبوت توصيل",
    "avoid": "food court|pizza toy|movie"
   },
   {
    "id": "pipe",
    "match": "pipe|cavity|duct|sewer",
    "cat": "inspection",
    "en": [
     "pipe inspection robot",
     "duct inspection robot"
    ],
    "ctx": "inspection OR building OR pipe",
    "zh": "管道检测机器人"
   },
   {
    "id": "quadruped",
    "match": "quadruped|robot.dog|legged",
    "cat": "inspection",
    "en": [
     "quadruped robot",
     "robot dog inspection"
    ],
    "ctx": "inspection OR security OR site OR industrial",
    "zh": "四足机器人",
    "ja": "四足歩行ロボット"
   },
   {
    "id": "drone",
    "match": "drone|uav",
    "cat": "inspection",
    "en": [
     "inspection drone",
     "drone building inspection"
    ],
    "ctx": "inspection OR building OR roof OR facade OR thermal",
    "zh": "无人机巡检",
    "ja": "点検ドローン",
    "ar": "طائرة بدون طيار فحص",
    "avoid": "military|strike|attack|war|missile|kamikaze|ukraine|russia|army"
   },
   {
    "id": "inspection",
    "match": "inspect|survey|thermal|snag",
    "cat": "inspection",
    "en": [
     "inspection robot",
     "building inspection robot"
    ],
    "ctx": "inspection OR building OR site OR facility",
    "zh": "巡检机器人",
    "ja": "点検ロボット",
    "ko": "점검 로봇",
    "de": "Inspektionsroboter",
    "ar": "روبوت فحص"
   },
   {
    "id": "humanoid",
    "match": "humanoid|concierge|reception|wayfinding|greet|guest",
    "cat": "humanoids",
    "en": [
     "humanoid robot",
     "service robot concierge",
     "reception robot"
    ],
    "ctx": "humanoid OR service OR hospitality OR retail OR mall",
    "zh": "人形机器人",
    "ja": "ヒューマノイド",
    "ko": "휴머노이드",
    "de": "humanoider Roboter",
    "ar": "روبوت بشري",
    "avoid": "movie|film|game|toy|anime"
   },
   {
    "id": "lift",
    "match": "lift|elevator|fleet|interop|orchestrat",
    "cat": "physical_ai",
    "en": [
     "robot elevator integration",
     "robot fleet management"
    ],
    "ctx": "robot OR building OR fleet",
    "zh": "机器人梯控"
   },
   {
    "id": "landscaping",
    "match": "lawn|landscap|garden|mow|irrigat",
    "cat": "cleaning",
    "en": [
     "robotic mower commercial",
     "landscaping robot"
    ],
    "ctx": "commercial OR landscaping OR golf OR park",
    "zh": "割草机器人",
    "ja": "芝刈りロボット",
    "de": "Mähroboter",
    "avoid": "home|household|deal|garden gnome"
   },
   {
    "id": "parking",
    "match": "parking|valet|charging",
    "cat": "delivery",
    "en": [
     "parking robot",
     "EV charging robot"
    ],
    "ctx": "parking OR garage OR EV",
    "zh": "停车机器人"
   }
  ]
 }
};
