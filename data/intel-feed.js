/* ROBOTICS MARKET PULSE. Written by intel/market_intel.py every Monday; do not edit by hand.
   Same content as data/intel-feed.json, wrapped so intel.html also works when opened as a file. */
window.INTEL_FEED = {
 "meta": {
  "title": "Robotics Market Pulse",
  "categories": [
   {
    "id": "construction",
    "label": "Construction & site robotics",
    "color": "#4FA3A5",
    "ink": "#2C6E70"
   },
   {
    "id": "facade",
    "label": "Façade & building maintenance",
    "color": "#A9BC6E",
    "ink": "#5E6E32"
   },
   {
    "id": "inspection",
    "label": "Inspection & drones",
    "color": "#C9A27A",
    "ink": "#8A6236"
   },
   {
    "id": "cleaning",
    "label": "Floor cleaning",
    "color": "#769CD2",
    "ink": "#3F6FAE"
   },
   {
    "id": "security",
    "label": "Security & patrol",
    "color": "#E0703C",
    "ink": "#B0501E"
   },
   {
    "id": "delivery",
    "label": "Delivery & autonomous mobility",
    "color": "#D9A441",
    "ink": "#94681A"
   },
   {
    "id": "humanoids",
    "label": "Humanoids & guest engagement",
    "color": "#A99BE0",
    "ink": "#5B4A9E"
   },
   {
    "id": "physical_ai",
    "label": "Physical AI & platforms",
    "color": "#D684A8",
    "ink": "#A04C74"
   }
  ],
  "updated_at": "2026-11-16T11:49+04:00"
 },
 "editions": [
  {
   "id": "2026-W47",
   "label": "Week 47 · 16 Nov 2026",
   "published_at": "2026-11-16T11:49+04:00",
   "period": {
    "from": "2026-11-09",
    "to": "2026-11-16"
   },
   "stories_scanned": 711,
   "distinct_events": 348,
   "signals": {
    "volume": {
     "construction": 33,
     "facade": 6,
     "inspection": 83,
     "cleaning": 14,
     "security": 15,
     "delivery": 42,
     "humanoids": 72,
     "physical_ai": 83
    },
    "deals": {
     "construction": 3,
     "facade": 0,
     "inspection": 1,
     "cleaning": 0,
     "security": 0,
     "delivery": 2,
     "humanoids": 1,
     "physical_ai": 10
    }
   },
   "momentum": [
    {
     "category": "construction",
     "volume": 33,
     "deals": 3,
     "avg_prev": 36.0,
     "change_pct": -8
    },
    {
     "category": "facade",
     "volume": 6,
     "deals": 0,
     "avg_prev": 7.7,
     "change_pct": -22
    },
    {
     "category": "inspection",
     "volume": 83,
     "deals": 1,
     "avg_prev": 82.3,
     "change_pct": 1
    },
    {
     "category": "cleaning",
     "volume": 14,
     "deals": 0,
     "avg_prev": 16.7,
     "change_pct": -16
    },
    {
     "category": "security",
     "volume": 15,
     "deals": 0,
     "avg_prev": 22.3,
     "change_pct": -33
    },
    {
     "category": "delivery",
     "volume": 42,
     "deals": 2,
     "avg_prev": 52.3,
     "change_pct": -20
    },
    {
     "category": "humanoids",
     "volume": 72,
     "deals": 1,
     "avg_prev": 76.7,
     "change_pct": -6
    },
    {
     "category": "physical_ai",
     "volume": 83,
     "deals": 10,
     "avg_prev": 119.7,
     "change_pct": -31
    }
   ],
   "generated_by": "claude",
   "headline": "FCC bars Pudu humanoid and quadruped from US as robot hardware curbs widen",
   "takeaways": [
    "Trade risk now reaches Aldar's own vendors: the FCC barred Pudu's humanoid and quadruped from US markets, Germany is retiring DJI drones, and NVIDIA replaced its CEO amid China scrutiny, the third straight week of tightening.",
    "Humanoids drew big bets, including SoftBank backing Agile Robots' $500M push and GXO targeting up to 1,000 Apptronik units, but Morgan Stanley reports a one-year delay and a startup missed payroll, tempering last week's momentum.",
    "Physical AI cooled again to 10 funding deals from 14 and 25 in prior weeks, and OpenAI disbanded its robotics team, while robots moved into homes and apartments via Amazon Ring and Hoban Group."
   ],
   "trend_watch": [
    {
     "trend": "US–China restrictions on robot and drone hardware",
     "status": "rising",
     "evidence": "FCC bans Pudu humanoid and quadruped in US; German military retires DJI drones; NVIDIA CEO replaced amid China trade scrutiny."
    },
    {
     "trend": "Physical AI foundation-model funding boom",
     "status": "cooling",
     "evidence": "10 Physical AI funding deals versus 14 and 25 earlier; category volume down 31%; OpenAI disbands stand-alone robotics team."
    },
    {
     "trend": "Humanoids moving into paid commercial service",
     "status": "steady",
     "evidence": "GXO–Apptronik target up to 1,000 humanoids, offset by Morgan Stanley's one-year delay and Foundation missing payroll."
    },
    {
     "trend": "Public safety and privacy scrutiny of street robots",
     "status": "steady",
     "evidence": "Miami-Dade weighs delivery-robot rules and Salt Lake City debates bots in bike lanes, while Avride passes one million deliveries."
    },
    {
     "trend": "Security robots entering homes and residential communities",
     "status": "new",
     "evidence": "Amazon Ring launches a security robot and indoor drone (83 outlets); Korea's Hoban Group pilots security robots at apartments."
    }
   ],
   "posts": [
    {
     "id": "puduroboticsputsoneaimodelinthreerobotst",
     "category": "humanoids",
     "type": "trend",
     "region": "North America",
     "company": "Pudu Robotics",
     "amount_usd_m": null,
     "headline": "FCC bans Pudu's humanoid and quadruped from US markets",
     "summary": "Pudu is running one AI model across three robots, but the US FCC has barred its humanoid and quadruped from the US market.",
     "why_it_matters": "US curbs on Chinese robots may affect vendor finances, parts and software support, though UAE deployments are not directly restricted.",
     "source": "Tech Times",
     "url": "https://www.techtimes.com/articles/330290/20261109/pudu-robotics-puts-one-ai-model-three-robots-fcc-has-banned-its-humanoid-quadruped-us-markets.htm",
     "published": "2026-11-09",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Pudu",
       "via": "vendor",
       "oem": "",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Floor Scrubbing and Sweeping",
       "model": "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
       "site": "International Tower",
       "site_count": 25
      }
     ],
     "portfolio_note": "No direct effect on Aldar's launched CC1 Pro and MT1 Max fleets, but watch support continuity before the large pending rollout across communities and schools.",
     "image": "https://d.techtimes.com/en/full/477931/pudu-tomo.png"
    },
    {
     "id": "amazonsringlaunchesflyingcameraautonomou",
     "category": "security",
     "type": "product",
     "region": "North America",
     "company": "Amazon Ring",
     "amount_usd_m": null,
     "headline": "Amazon's Ring launches flying camera and autonomous security robot",
     "summary": "Ring unveiled a robotics division with an indoor flying camera and an autonomous home security robot, the week's most widely covered story.",
     "why_it_matters": "Consumer security robots will reach Aldar homes, raising resident expectations and privacy questions for community and building security policies.",
     "source": "Reuters",
     "url": "https://www.reuters.com/technology/amazons-ring-launches-flying-camera-autonomous-security-robot-2026-11-10/",
     "published": "2026-11-10",
     "coverage": 83,
     "also_covered_by": [
      "TechCrunch",
      "CNBC",
      "Axios"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "softbankbacksagilerobotsin500millionhuma",
     "category": "humanoids",
     "type": "investment",
     "region": "Europe",
     "company": "Agile Robots",
     "amount_usd_m": 500,
     "headline": "SoftBank backs Agile Robots in $500 million humanoid push",
     "summary": "SoftBank is backing Agile Robots in a $500 million push into humanoid robots, adding to its run of large robotics bets.",
     "why_it_matters": "Deep-pocketed humanoid makers will court operators like Aldar for pilots; capital strength should weigh in vendor selection.",
     "source": "Bloomberg.com",
     "url": "https://www.bloomberg.com/news/articles/2026-11-12/softbank-backs-agile-robots-in-500-million-humanoid-push",
     "published": "2026-11-12",
     "coverage": 27,
     "also_covered_by": [
      "SiliconANGLE",
      "Forbes",
      "Tech Times"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "nvidiareplacesceoamidchinaaiandroboticsc",
     "category": "physical_ai",
     "type": "trend",
     "region": "North America",
     "company": "NVIDIA",
     "amount_usd_m": null,
     "headline": "NVIDIA replaces Jensen Huang as CEO amid China AI and robotics scrutiny",
     "summary": "NVIDIA named Collette Kress CEO and Harvey C. Jones board chair, replacing co-founder Jensen Huang as it faces trade scrutiny over China.",
     "why_it_matters": "Most robot brains run on NVIDIA chips; trade pressure on the supplier could ripple into robot pricing and availability.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/nvidia-replaces-ceo-amid-china-ai-and-robotics-concerns/",
     "published": "2026-11-10",
     "coverage": 5,
     "also_covered_by": [
      "BigGo Finance",
      "TVC News",
      "T3"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/11/voyager-exterior-sign-2_1829ac3c-85ac-4929-8c67-5994c15c70c9-prv.jpg"
    },
    {
     "id": "nvidialaunchesgr00t2andisaaclab30atcorl",
     "category": "physical_ai",
     "type": "product",
     "region": "Global",
     "company": "NVIDIA",
     "amount_usd_m": null,
     "headline": "NVIDIA launches GR00T 2 and Isaac Lab 3.0 robot AI tools",
     "summary": "At CoRL, NVIDIA released GR00T 2 and Isaac Lab 3.0, showing partners such as Skild AI and FieldAI using them.",
     "why_it_matters": "Shared robot foundation models should shorten how quickly vendors adapt robots to new buildings and tasks.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/nvidia-launches-gr00t-2-isaac-lab-3-0-corl/",
     "published": "2026-11-09",
     "coverage": 9,
     "also_covered_by": [
      "The Decoder",
      "BigGo Finance",
      "NVIDIA Blog"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/11/NVIDIA-corl-featured.jpg"
    },
    {
     "id": "deeproboticsrobotdogtakesonlighthouseins",
     "category": "inspection",
     "type": "deployment",
     "region": "China",
     "company": "DEEP Robotics",
     "amount_usd_m": null,
     "headline": "DEEP Robotics robot dog handles lighthouse inspection and island logistics",
     "summary": "A DEEP Robotics quadruped is being used for lighthouse inspection and logistics on an island, a harsh outdoor setting.",
     "why_it_matters": "Proven outdoor quadruped work supports using robot dogs for coastal and waterfront asset patrols and inspections.",
     "source": "lincolnjournal.com",
     "url": "https://www.lincolnjournal.com/online_features/press_releases/deep-robotics-robot-dog-takes-on-lighthouse-inspection-and-island-logistics/article_7deae2a3-e0e7-5f95-a683-051dd3b2c71c.html",
     "published": "2026-11-09",
     "coverage": 5,
     "also_covered_by": [
      "Menafn",
      "SBS 뉴스",
      "Future Transport-News"
     ],
     "portfolio": [
      {
       "vendor": "Deep Robotics",
       "via": "vendor",
       "oem": "",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Security Patrolling",
       "model": "X30",
       "site": "ADGM Square",
       "site_count": 1
      }
     ],
     "portfolio_note": "Strengthens the case for extending the X30 security patrol trial at ADGM Square to outdoor and waterfront inspection routes.",
     "image": "https://bloximages.newyork1.vip.townnews.com/lincolnjournal.com/content/tncms/assets/v3/editorial/5/96/5962c580-43e7-583e-9845-78efe8000a8b/6af944d12d1bf.image.png?crop=868%2C456%2C0%2C17"
    },
    {
     "id": "germanmilitaryretireschinesedronesafterc",
     "category": "inspection",
     "type": "trend",
     "region": "Europe",
     "company": "DJI",
     "amount_usd_m": null,
     "headline": "German military retires Chinese drones, including 500 DJI units",
     "summary": "Germany's military is retiring Chinese-made drones on security grounds after contracting 500 DJI units despite a 2023 ban.",
     "why_it_matters": "Western bans on DJI raise long-term supply, software and insurance risk for operators relying on DJI inspection drones.",
     "source": "Tech Times",
     "url": "https://www.techtimes.com/articles/330445/20261111/german-military-retires-chinese-drones-after-contracting-500-dji-units-despite-2023-ban.htm",
     "published": "2026-11-11",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "Adds to DJI supply risk for AirTech's M300 and Matrice 4E inspections at Saadiyat Lagoons; consider a non-DJI fallback before scaling.",
     "image": "https://d.techtimes.com/en/full/478112/germany-defence-quantum-systems-equipment.jpg"
    },
    {
     "id": "djislatestdronecombinesthermalcamerasaia",
     "category": "inspection",
     "type": "product",
     "region": "Global",
     "company": "DJI",
     "amount_usd_m": null,
     "headline": "DJI unveils drone combining thermal cameras, AI and advanced sensors",
     "summary": "DJI's latest drone pairs thermal imaging with AI and advanced sensors for professional capture.",
     "why_it_matters": "Better thermal and AI sensing improves façade, roof and leak inspections across large residential portfolios.",
     "source": "TechRadar",
     "url": "https://www.techradar.com/pro/djis-new-drone-could-be-a-literal-lifesaver-matrice-5t-features-enhanced-night-vision-and-1k-thermal-imaging-making-it-perfect-for-search-and-rescue",
     "published": "2026-11-11",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "Could upgrade AirTech's thermal exterior inspections at Saadiyat Lagoons beyond the M300 H20T currently trialled.",
     "image": "https://cdn.mos.cms.futurecdn.net/v87gPLbDCUFCYsy49mMbD8-1920-80.png"
    },
    {
     "id": "pathroboticsquadruplesvaluationto25billi",
     "category": "physical_ai",
     "type": "investment",
     "region": "North America",
     "company": "Path Robotics",
     "amount_usd_m": null,
     "headline": "Path Robotics quadruples valuation to $2.5 billion in new round",
     "summary": "AI welding robot maker Path Robotics raised a new round that quadrupled its valuation to $2.5 billion.",
     "why_it_matters": "Investors are backing autonomous welding, a direct route to robotics in steel fabrication for construction projects.",
     "source": "Bloomberg",
     "url": "https://www.bloomberg.com/news/articles/2026-11-10/path-robotics-quadruples-valuation-to-2-5-billion-in-latest-funding-round",
     "published": "2026-11-10",
     "coverage": 9,
     "also_covered_by": [
      "Wowtale",
      "Ohio Tech News",
      "Business Wire"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "exclusiveopenaidisbandsitsstandalonerobo",
     "category": "physical_ai",
     "type": "trend",
     "region": "North America",
     "company": "OpenAI",
     "amount_usd_m": null,
     "headline": "OpenAI disbands stand-alone robotics team as general models run robots",
     "summary": "OpenAI folded its robotics team into core groups, saying its general-purpose models are starting to run robots directly.",
     "why_it_matters": "Robot intelligence is shifting to general AI models, so vendor choice may matter less than the model behind it.",
     "source": "Fortune",
     "url": "https://fortune.com/2026/11/13/openai-disbands-robotics-team-as-its-general-models-start-running-robots/",
     "published": "2026-11-13",
     "coverage": 2,
     "also_covered_by": [
      "MLQ.ai"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://fortune.com/img-assets/wp-content/uploads/2026/11/GettyImages-2304572308-e1794587995495.jpg?resize=1200,600"
    },
    {
     "id": "gxoandapptroniktargetdeploymentofupto100",
     "category": "humanoids",
     "type": "deployment",
     "region": "Global",
     "company": "GXO / Apptronik",
     "amount_usd_m": null,
     "headline": "GXO and Apptronik target deployment of up to 1,000 humanoid robots",
     "summary": "Logistics firm GXO expanded its partnership with Apptronik, targeting up to 1,000 humanoid robots in its operations.",
     "why_it_matters": "A four-figure humanoid order signals fleet-scale pricing and support models that property operators can benchmark against.",
     "source": "Container News",
     "url": "https://container-news.com/gxo-and-apptronik-target-deployment-of-up-to-1000-humanoid-robots/",
     "published": "2026-11-15",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://container-news.com/wp-content/uploads/2026/11/gabriele-malaspina-CjWsslYVnPI-unsplash.jpg"
    },
    {
     "id": "morganstanleysurveyhumanoidrobotcommerci",
     "category": "humanoids",
     "type": "trend",
     "region": "Global",
     "company": "Morgan Stanley",
     "amount_usd_m": null,
     "headline": "Morgan Stanley: humanoid commercialisation pushed back a year",
     "summary": "A Morgan Stanley survey finds humanoid commercialisation delayed by a year, with only 18% of companies testing them satisfied.",
     "why_it_matters": "Keep humanoid guest-engagement pilots small and measurable; broad operational use remains further off than marketing suggests.",
     "source": "BigGo Finance",
     "url": "https://finance.biggo.com/news/b4813596-c965-4136-b616-2af11e16d780",
     "published": "2026-11-10",
     "coverage": 2,
     "also_covered_by": [
      "Assembly Magazine"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://img.biggo.com/13YvLzwXODxdoGdkIMMb9A4PTjmN08BEtdnKEzuJwRc/fit/1200/0/sm/0/aHR0cHM6Ly9pbWcuYmdvLm9uZS9uZXdzLWltYWdlL2FpX2dlbmVyYXRlZC8yMDI2LTExL2I0ODEzNTk2LWM5NjUtNDEzNi1iNjE2LTJhZjExZTE2ZDc4MF8xNzk0MzIxMTQ3X2RlZmF1bHQuanBn.jpg"
    },
    {
     "id": "humanoidroboticsstartupfoundationfuturei",
     "category": "humanoids",
     "type": "trend",
     "region": "North America",
     "company": "Foundation Future Industries",
     "amount_usd_m": null,
     "headline": "Humanoid startup Foundation Future Industries misses payroll in cash crisis",
     "summary": "Humanoid robotics startup Foundation Future Industries missed payroll amid a cash crisis.",
     "why_it_matters": "Humanoid vendor failures are a real risk; contracts should cover service continuity and data if a supplier collapses.",
     "source": "The American Bazaar",
     "url": "https://americanbazaaronline.com/2026/11/15/foundation-future-industries-misses-payroll-sankaet-pathak-loan-492327/",
     "published": "2026-11-15",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://americanbazaaronline.com/wp-content/uploads/2026/11/Foundation-Future-Industries.jpg"
    },
    {
     "id": "bostondynamicsaddswheelstoatlashumanoidt",
     "category": "humanoids",
     "type": "product",
     "region": "North America",
     "company": "Boston Dynamics",
     "amount_usd_m": null,
     "headline": "Boston Dynamics adds wheels to Atlas humanoid to test whole-body control",
     "summary": "Boston Dynamics fitted its Atlas humanoid with wheels to test whole-body control.",
     "why_it_matters": "Wheeled humanoids suit flat malls and offices better than legs, hinting at more practical service-robot designs.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/boston-dynamics-adds-wheels-to-atlas-humanoid-to-test-whole-body-control/",
     "published": "2026-11-09",
     "coverage": 18,
     "also_covered_by": [
      "Forbes",
      "Technetbook",
      "AIM Media House"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/11/wheeled-atlas-humanoid.jpg"
    },
    {
     "id": "lgelectronicstargetshumanoidsafetycertif",
     "category": "humanoids",
     "type": "trend",
     "region": "Asia-Pacific",
     "company": "LG Electronics",
     "amount_usd_m": null,
     "headline": "LG and KIRIA sign pact on humanoid robot safety certification",
     "summary": "LG Electronics signed an MOU with Korea's KIRIA to pursue humanoid robot safety and quality certification.",
     "why_it_matters": "Safety certification gives operators a benchmark for approving humanoids in public malls and offices.",
     "source": "Unite.AI",
     "url": "https://www.unite.ai/lg-electronics-targets-humanoid-safety-certification-with-kiria/",
     "published": "2026-11-09",
     "coverage": 8,
     "also_covered_by": [
      "BigGo Finance",
      "Seoul Economic Daily",
      "아시아경제"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.unite.ai/wp-content/uploads/2026/11/lg-electronics-targets-humanoid-safety-certification-with-kiria.jpg"
    },
    {
     "id": "grittandmastecbringboltonconstructionrob",
     "category": "construction",
     "type": "deployment",
     "region": "North America",
     "company": "Gritt / MasTec",
     "amount_usd_m": null,
     "headline": "Gritt and MasTec bring bolt-on construction robots to solar sites",
     "summary": "Gritt and contractor MasTec are deploying bolt-on robots that retrofit existing equipment on solar construction sites.",
     "why_it_matters": "Bolt-on autonomy on existing machines is a low-capex route to site robotics for Aldar's contractors.",
     "source": "The Next Web",
     "url": "https://thenextweb.com/news/gritt-mastec-solar-construction-robots-partnership",
     "published": "2026-11-10",
     "coverage": 14,
     "also_covered_by": [
      "AI Insider",
      "Robotics & Automation News",
      "Unite.AI"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://media.thenextweb.com/2026/11/solar-panels-blue-sky-close-up.jpg"
    },
    {
     "id": "153yearoldbuildertaiseisetsupfundtoinves",
     "category": "construction",
     "type": "investment",
     "region": "Asia-Pacific",
     "company": "Taisei",
     "amount_usd_m": null,
     "headline": "153-year-old builder Taisei sets up fund to invest in AI and robotics",
     "summary": "Japanese contractor Taisei launched a fund to invest in AI and robotics startups.",
     "why_it_matters": "Major builders investing directly in robotics is a model Aldar could use to access construction technology early.",
     "source": "Bloomberg.com",
     "url": "https://www.bloomberg.com/news/articles/2026-11-15/taisei-launches-150-million-ai-robotics-fund-with-pegasus-tech-ventures",
     "published": "2026-11-12",
     "coverage": 6,
     "also_covered_by": [
      "The Japan Times",
      "The New York Times",
      "Tech Xplore"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "weibuildraises15mtoscaleembodiedaiconstr",
     "category": "construction",
     "type": "investment",
     "region": "Global",
     "company": "WEIBUILD",
     "amount_usd_m": 15,
     "headline": "WEIBUILD raises $15M to scale embodied-AI construction robots",
     "summary": "WEIBUILD raised $15 million to scale its embodied-AI construction robots.",
     "why_it_matters": "Funding for AI-driven site robots widens the pool of vendors for trials on Aldar construction sites.",
     "source": "Dealroom",
     "url": "https://app.dealroom.co/news/note/weibuild-raises-15m-to-scale-embodied-ai-construction-robots",
     "published": "2026-11-15",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "hobangrouppilotsdeliveryandsecurityrobot",
     "category": "security",
     "type": "deployment",
     "region": "Asia-Pacific",
     "company": "Hoban Group",
     "amount_usd_m": null,
     "headline": "Korean developer Hoban Group pilots delivery and security robots at apartments",
     "summary": "Hoban Group is piloting delivery and security robots at its apartment complexes and headquarters.",
     "why_it_matters": "A peer developer running the same mix of robots offers a direct benchmark for Aldar's community pilots.",
     "source": "Chosunbiz",
     "url": "https://biz.chosun.com/en/en-realestate/2026/11/16/4RQZVNNXENHLPJTBI5UB2MATDE/",
     "published": "2026-11-11",
     "coverage": 3,
     "also_covered_by": [
      "Seoul Economic Daily",
      "EasternEye"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://biz.chosun.com/resizer/v2/MGEQACUAZVCMZFZ46JUY2CWJKA.jpg?auth=7636d3fd14783c5438ba1c52151eecf81dd72f7ba100a554accaf111eaa2c80d&width=1200&height=630&smart=true"
    },
    {
     "id": "serveroboticsopensrobotdeliverynetworkfo",
     "category": "delivery",
     "type": "product",
     "region": "North America",
     "company": "Serve Robotics",
     "amount_usd_m": null,
     "headline": "Serve Robotics opens its robot delivery network to other companies",
     "summary": "Serve Robotics is opening its sidewalk delivery network as a platform others can build on.",
     "why_it_matters": "Shared delivery platforms could let communities host one robot network serving many retailers.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/serve-robotics-opens-robot-delivery-network-for-others-to-build-on/",
     "published": "2026-11-09",
     "coverage": 10,
     "also_covered_by": [
      "Robotics & Automation News",
      "GlobeNewswire",
      "The Tech Buzz"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/11/serve-map-copy.jpg"
    },
    {
     "id": "avridereachesonemillionrobotdeliveriesas",
     "category": "delivery",
     "type": "deployment",
     "region": "North America",
     "company": "Avride",
     "amount_usd_m": null,
     "headline": "Avride reaches one million robot deliveries as US network expands",
     "summary": "Avride passed one million robot deliveries as it expands its network across the US.",
     "why_it_matters": "Million-delivery volumes show sidewalk robots are operationally mature enough for planned residential communities.",
     "source": "Robotics & Automation News",
     "url": "https://roboticsandautomationnews.com/2026/11/15/avride-reaches-one-million-robot-deliveries-as-network-expands-across-us/107179/",
     "published": "2026-11-15",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://roboticsandautomationnews.com/wp-content/uploads/2026/11/avride-delivery-robots-1.jpeg"
    },
    {
     "id": "newregulationscouldbecomingfordeliveryro",
     "category": "delivery",
     "type": "trend",
     "region": "North America",
     "company": "Miami-Dade County",
     "amount_usd_m": null,
     "headline": "Miami-Dade County weighs new regulations for delivery robots",
     "summary": "Miami-Dade County may introduce new rules for sidewalk delivery robots.",
     "why_it_matters": "Local rules on robot sidewalks preview what UAE municipalities may require of community delivery operations.",
     "source": "WLRN",
     "url": "https://www.wlrn.org/business/2026-11-12/delivery-robots-restrictions-miami-dade-county",
     "published": "2026-11-11",
     "coverage": 4,
     "also_covered_by": [
      "Florida Politics",
      "Secret Miami",
      "Hoodline"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://npr.brightspotcdn.com/dims4/default/65d11c7/2147483647/strip/true/crop/2000x1050+0+142/resize/1200x630!/quality/90/?url=https%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F28%2F08%2Fed77ffe64ce1814bf7cdaf0947b6%2Fap26293513860906.jpg"
    },
    {
     "id": "teslaexpandsrobotaxiservicetosanantonio",
     "category": "delivery",
     "type": "deployment",
     "region": "North America",
     "company": "Tesla",
     "amount_usd_m": null,
     "headline": "Tesla expands robotaxi service to San Antonio",
     "summary": "Tesla extended its robotaxi service to San Antonio.",
     "why_it_matters": "Robotaxi growth will change parking demand and drop-off design in malls and communities.",
     "source": "TechCrunch",
     "url": "https://techcrunch.com/2026/11/09/tesla-expands-robotaxi-service-to-san-antonio/",
     "published": "2026-11-09",
     "coverage": 12,
     "also_covered_by": [
      "Axios",
      "KSAT",
      "kens5.com"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://techcrunch.com/wp-content/uploads/2025/06/GettyImages-2220872848.jpg?resize=1200,801"
    },
    {
     "id": "gitexglobal2026putshumanoidrobotsandembo",
     "category": "humanoids",
     "type": "trend",
     "region": "GCC",
     "company": "GITEX GLOBAL",
     "amount_usd_m": null,
     "headline": "GITEX GLOBAL 2026 puts humanoid robots and embodied AI in spotlight",
     "summary": "Humanoid robots and embodied AI were a centrepiece of GITEX GLOBAL 2026.",
     "why_it_matters": "Regional humanoid showcases bring vendors to Aldar's doorstep for guest-engagement pilots in malls and offices.",
     "source": "Daryo",
     "url": "https://daryo.uz/en/2026/11/12/gitex-global-2026-puts-humanoid-robots-and-embodied-ai-in-spotlight/",
     "published": "2026-11-10",
     "coverage": 6,
     "also_covered_by": [
      "www.wam.ae",
      "Chosunbiz",
      "MyJoyOnline"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "byddemonstrates1000kwroboticevchargingar",
     "category": "physical_ai",
     "type": "product",
     "region": "GCC",
     "company": "BYD",
     "amount_usd_m": null,
     "headline": "BYD demonstrates 1,000 kW robotic EV charging arm in the UAE",
     "summary": "BYD showed a robotic arm that plugs itself in and delivers 1,000 kW charging in the UAE.",
     "why_it_matters": "Robotic fast charging could reshape EV parking design and services in malls and residential car parks.",
     "source": "Retail News Asia",
     "url": "https://retailnews.asia/byd-demonstrates-1000-kw-robotic-ev-charging-arm-in-the-uae",
     "published": "2026-11-10",
     "coverage": 2,
     "also_covered_by": [
      "Mezha"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://i0.wp.com/crm.retailnews.asia/wp-content/uploads/2025/05/byd-sealion-7-1280x720.jpg?w=1600&quality=72&strip=all&ssl=1"
    },
    {
     "id": "yangogrouplaunchesaiandroboticseducation",
     "category": "physical_ai",
     "type": "trend",
     "region": "GCC",
     "company": "Yango Group",
     "amount_usd_m": null,
     "headline": "Yango Group launches AI and robotics education initiative for UAE schools",
     "summary": "Yango Group launched an AI and robotics education programme for schools across the UAE.",
     "why_it_matters": "Relevant to Aldar's schools, which could partner on robotics curricula alongside planned cleaning-robot rollouts.",
     "source": "Gulf Today",
     "url": "https://www.gulftoday.ae/lifestyle/2026/11/13/yango-group-launches-ai-and-robotics-education-initiative-for-schools-across-the-uae",
     "published": "2026-11-12",
     "coverage": 2,
     "also_covered_by": [
      "TradeArabia"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.gulftoday.ae/gulftoday/uploads/images/2026/11/13/1126512.webp"
    },
    {
     "id": "pmupartnerswithhongkongcenterforconstruc",
     "category": "construction",
     "type": "deployment",
     "region": "GCC",
     "company": "PMU / Hong Kong Center for Construction Robotics",
     "amount_usd_m": null,
     "headline": "Saudi PMU partners Hong Kong construction robotics centre on smart building",
     "summary": "Prince Mohammad bin Fahd University partnered with Hong Kong's Center for Construction Robotics to develop smart construction technologies.",
     "why_it_matters": "Gulf construction robotics research is building local talent and partners for future site automation.",
     "source": "وكالة الأنباء السعودية",
     "url": "https://www.spa.gov.sa/en/N2723491",
     "published": "2026-11-10",
     "coverage": 2,
     "also_covered_by": [
      "PravdaReport"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://portalcdn.spa.gov.sa/backend/original/202611/M11204484.jpeg"
    },
    {
     "id": "11roboticsolutionsshowcasepotentialtosup",
     "category": "physical_ai",
     "type": "trend",
     "region": "GCC",
     "company": "Hajj Conference",
     "amount_usd_m": null,
     "headline": "11 robotic solutions showcased for pilgrim services at Saudi Hajj conference",
     "summary": "Eleven robotic solutions were presented at a Hajj conference to support pilgrim services.",
     "why_it_matters": "Robots for very large crowds offer lessons for guest services at busy malls and event venues.",
     "source": "وكالة الأنباء السعودية",
     "url": "https://www.spa.gov.sa/en/N2724482",
     "published": "2026-11-10",
     "coverage": 3,
     "also_covered_by": [
      "TechJuice",
      "The Sunday Guardian"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://portalcdn.spa.gov.sa/backend/original/202611/M11214255.jpeg"
    },
    {
     "id": "saudiarabiajoinsacceleratingtierinphysic",
     "category": "physical_ai",
     "type": "trend",
     "region": "GCC",
     "company": "AWS",
     "amount_usd_m": null,
     "headline": "AWS report places Saudi Arabia in 'accelerating' tier for physical AI",
     "summary": "An AWS report ranked Saudi Arabia among countries accelerating physical AI adoption.",
     "why_it_matters": "Regional competition for physical AI leadership may bring more vendors and incentives to the Gulf.",
     "source": "Arab News PK",
     "url": "https://www.arabnews.pk/saudi-arabia/saudi-arabia-joins-accelerating-tier-in-physical-ai-aws-report-finds-3006826",
     "published": "2026-11-12",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://assets.maestronewsroom.com/media/30f6532d-717b-4366-9158-9c455299fcd9/proxies/7cd05a57-9222-472f-84e9-8506b4f7998a.webp"
    }
   ],
   "vendor_watch": [
    {
     "vendor": "Pudu",
     "oem": "",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Concierge Service",
      "Customer Management Delivery Bot",
      "Floor Scrubbing and Sweeping"
     ],
     "models": [
      "1× CC1 Pro, 1× MT1 Max",
      "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
      "1× CC1 Pro, 3× MT1 Max",
      "2× CC1 Pro",
      "2× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
      "33× CC1 Pro",
      "3× CC1 Pro",
      "3× CC1 Pro, 1× MT1 Max",
      "4× CC1 Pro, 1× MT1 Max",
      "4× CC1 Pro, 2× MT1 Max, 2× BG1 Pro",
      "6× CC1 Pro",
      "6× CC1 Pro, 3× MT1 Max, 2× BG1 Pro",
      "Bellabot Pro"
     ],
     "sites": [
      "International Tower",
      "ADGM Square",
      "Aldar HQ",
      "Al Maryah Tower",
      "Yas Place",
      "Aldar Square",
      "Aldar Estates Office · Yas Mall",
      "Masdar City",
      "Al Rayanna",
      "The Bridges",
      "Mamsha Al Saadiyat",
      "Gate & Arc Towers",
      "Al Zeina",
      "Sun & Sky Tower",
      "Saadiyat Grove",
      "Saadiyat Beach Residences",
      "Al Muneera",
      "Waters Edge",
      "Yas Golf Collection",
      "West Yas Plaza",
      "Noya Plaza",
      "Shams Boutik",
      "Eastern Mangroves",
      "Muneera Retail (Al Muneera Beach Plaza)",
      "Gardens Plaza"
     ],
     "mentions": 1,
     "post_ids": [
      "puduroboticsputsoneaimodelinthreerobotst"
     ],
     "signal": "risk",
     "note": "FCC ban on Pudu's humanoid and quadruped in the US adds financial and support uncertainty ahead of Aldar's large pending rollout.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "AirTech",
     "oem": "DJI",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Drone Inspections for Unit Exterior"
     ],
     "models": [
      "Thermal: M300 H20T · General capture: Matrice 4E"
     ],
     "sites": [
      "Saadiyat Lagoons"
     ],
     "mentions": 5,
     "post_ids": [
      "germanmilitaryretireschinesedronesafterc",
      "djislatestdronecombinesthermalcamerasaia"
     ],
     "signal": "mixed",
     "note": "Maker DJI launched a new thermal AI drone, but Germany retiring DJI units widens Western restrictions on the supply base.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Deep Robotics",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Security Patrolling"
     ],
     "models": [
      "X30"
     ],
     "sites": [
      "ADGM Square"
     ],
     "mentions": 2,
     "post_ids": [
      "deeproboticsrobotdogtakesonlighthouseins"
     ],
     "signal": "positive",
     "note": "Lighthouse inspection and island logistics show the quadruped working in harsh outdoor settings, supporting expanded patrol use.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "BarqAir",
     "oem": "",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Drone Façade Cleaning"
     ],
     "models": [
      "Cleaning Drone"
     ],
     "sites": [
      "Yas Place"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Cargo X / Noon",
     "oem": "Neolix",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Autonomous Delivery Vans",
      "Autonomous Delivery Vans (Al Merief expansion)",
      "Autonomous Delivery Vans (Golf Gardens expansion)"
     ],
     "models": [
      "Neolix X3"
     ],
     "sites": [
      "Al Raha Gardens",
      "Golf Gardens",
      "Al Merief"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Analog",
     "oem": "Boston Dynamics",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Quadruped Dog Interior Inspections"
     ],
     "models": [
      "Boston Dynamics Spot"
     ],
     "sites": [
      "Yas Park Gate"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "SINDAN",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Floor Scrubbing and Sweeping",
      "Humanoid Guest Engagement",
      "Security Patrolling (2)"
     ],
     "models": [
      "D1 Max",
      "MK-02 Humanoid",
      "NOVA-02 and NOVA-05"
     ],
     "sites": [
      "Yas Mall",
      "ADGM Square",
      "Livex · ADNEC"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Thub Technologies",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Crawler Façade Cleaning (2)",
      "Façade Cleaning"
     ],
     "models": [
      "TowerCraft"
     ],
     "sites": [
      "Yas Place",
      "World Trade Center Abu Dhabi"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "X-Human",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Crawler Façade Cleaning"
     ],
     "models": [
      "Lingkong K3"
     ],
     "sites": [
      "Yas Place"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "AD Robotics",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Community Delivery Bot",
      "Security Patrolling"
     ],
     "models": [
      "ADR Delivery Bot",
      "ADR Quadruped"
     ],
     "sites": [
      "Noya Luma",
      "Ansam"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Falcon Tech Robotics",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Interactive Visitor Engagement"
     ],
     "models": [
      "KODY"
     ],
     "sites": [
      "The Galleria"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Pudu + other",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Floor Scrubbing and Sweeping"
     ],
     "models": [
      "2× CC1 Pro, 1× MT1 Max, 1× External Sweeper",
      "3× CC1 Pro, 1× MT1 Max, 1× External Sweeper",
      "3× MT1 Max, 1× BG1 Pro, 1× External Sweeper"
     ],
     "sites": [
      "Pearl British Academy",
      "Muna British Academy",
      "Bateen World Academy",
      "Al Ain British Academy",
      "Yasmina British Academy",
      "Mamoura British Academy",
      "Cranleigh Abu Dhabi",
      "Noya British School",
      "Yasmina American School",
      "Eastern Mangroves"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Solinas",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Hidden Cavity Inspection"
     ],
     "models": [
      "Endobot 90 and Endobot 250"
     ],
     "sites": [
      "Saadiyat Grove"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Subdivo",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Façade Cleaning"
     ],
     "models": [],
     "sites": [
      "International Tower"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    }
   ],
   "viral": [
    {
     "platform": "X",
     "date": "2026-11-12",
     "title": "Robot dogs mounted with rifles deployed in anti-gang stadium operation in Haiti (Fox News headline)",
     "category": "security",
     "views_reported": "Not verified",
     "views_source": "No dated view count found in coverage",
     "what_shows": "Four-legged robots carrying rifles move with Salvadoran troops retaking Sylvio Cator Stadium in Port-au-Prince, through a hallway, up stairs and a narrow passage. One appears to carry a mounted machine gun.",
     "what_behind": "Government-produced footage. Manufacturer, weapon specs and control method undisclosed. No firing or combat shown. Unit was presented in September as drug-detection equipment. Bukele did not explain how the robots helped.",
     "checks": {
      "real": "yes",
      "autonomous": "unknown",
      "corroborated": "no",
      "deployed": "unknown",
      "gcc": "no"
     },
     "verdict": "hype",
     "fit": "Low",
     "portfolio_match": "Deep Robotics X30 security patrol (ADGM Square trial); AD Robotics ADR Quadruped (pending, Noya Luma); Analog / Boston Dynamics Spot",
     "action": "Watch",
     "leadership_line": "That's a military use with almost no public detail; the robot dogs we trial are unarmed camera platforms.",
     "assessed_from": "News coverage (Newsweek, Fox News); video not watched",
     "video_url": "",
     "corroboration": [
      {
       "label": "Newsweek via Yahoo, 13 Nov",
       "url": "https://www.yahoo.com/news/world/articles/machine-gun-armed-robot-dogs-181913101.html"
      },
      {
       "label": "Fox News, 14 Nov",
       "url": "https://www.foxnews.com/world/robot-dogs-mounted-rifles-deployed-anti-gang-stadium-operation-haiti"
      }
     ]
    },
    {
     "platform": "Instagram; reposted on X by KTLA",
     "date": "2026-11-08",
     "title": "Robotic dog takes real-life pooch for a walk (KTLA headline)",
     "category": "physical_ai",
     "views_reported": "Not verified",
     "views_source": "No dated view count found in coverage",
     "what_shows": "In San Francisco's Mission Bay, a four-legged robot leads a small dog on a leash while a person follows closely.",
     "what_behind": "No maker, model or owner named. Unclear whether it was autonomous or steered by someone nearby. Gadget Review sees no commercial dog-walking service and suggests it may be a staged demo.",
     "checks": {
      "real": "yes",
      "autonomous": "unknown",
      "corroborated": "no",
      "deployed": "unknown",
      "gcc": "unknown"
     },
     "verdict": "hype",
     "fit": "Low",
     "portfolio_match": "AD Robotics ADR Quadruped (pending)",
     "action": "Ignore",
     "leadership_line": "It's a curiosity; nobody knows whose robot it was or whether anyone was steering it.",
     "assessed_from": "News coverage (Gadget Review, Korea Daily); video not watched",
     "video_url": "",
     "corroboration": [
      {
       "label": "Gadget Review, 13 Nov",
       "url": "https://www.gadgetreview.com/a-robot-dog-walked-a-real-dog-in-san-francisco-nobody-knows-why"
      },
      {
       "label": "Korea Daily citing KTLA, 12 Nov",
       "url": "https://en.koreadaily.com/san-francisco-robot-dog-walking/"
      },
      {
       "label": "KTLA, 12 Nov (not opened)",
       "url": "https://ktla.com/news/california/san-francisco-robot-dog-walker/"
      }
     ]
    }
   ],
   "challengers": [
    {
     "name": "Peppermint Robotics",
     "category": "cleaning",
     "what": "Heavy-duty autonomous floor scrubbers sold via facility-management firms; raised about $10.5M pre-Series B on 6 Nov.",
     "scores": {
      "funding": 2,
      "deployments": 1,
      "scale": 1,
      "partners": 1,
      "gcc": 0
     },
     "why": "Possible second supplier for large-floor sites, reducing dependence on Pudu; no named customers or GCC presence found.",
     "source": {
      "label": "Evertiq, 6 Nov 2026",
      "url": "https://evertiq.com/news/2026-11-06-autonomous-cleaning-robots-firm-peppermint-raises-10-million"
     },
     "total": 5,
     "verdict": "ignore"
    },
    {
     "name": "Gagamba",
     "category": "facade",
     "what": "UNLV student startup working toward a prototype AI drone for cleaning high-rise windows.",
     "scores": {
      "funding": 0,
      "deployments": 0,
      "scale": 0,
      "partners": 1,
      "gcc": 0
     },
     "why": "Pre-prototype; signals new entrants in drone façade cleaning, not a real BarqAir alternative yet.",
     "source": {
      "label": "FOX5 Vegas, 11 Nov 2026",
      "url": "https://www.fox5vegas.com/2026/11/11/unlv-students-develop-ai-powered-drone-clean-high-rise-windows/"
     },
     "total": 1,
     "verdict": "ignore"
    }
   ],
   "matrix": [
    {
     "category": "construction",
     "readiness": 35,
     "relevance": 70,
     "hype": 55,
     "substance": 45,
     "reason": "Big funding, narrow deployments; no Aldar construction robots yet."
    },
    {
     "category": "facade",
     "readiness": 30,
     "relevance": 85,
     "hype": 30,
     "substance": 35,
     "reason": "Our most active area; only market signal was pre-prototype."
    },
    {
     "category": "inspection",
     "readiness": 70,
     "relevance": 70,
     "hype": 45,
     "substance": 70,
     "reason": "Mature drones; Germany's DJI retirement flags policy risk."
    },
    {
     "category": "cleaning",
     "readiness": 80,
     "relevance": 95,
     "hype": 25,
     "substance": 75,
     "reason": "Largest, most proven deployment; watch Pudu supplier concentration."
    },
    {
     "category": "security",
     "readiness": 45,
     "relevance": 70,
     "hype": 65,
     "substance": 45,
     "reason": "Attention rising; evidence still mostly pilots."
    },
    {
     "category": "delivery",
     "readiness": 70,
     "relevance": 80,
     "hype": 45,
     "substance": 75,
     "reason": "Clear scale evidence; rules still forming; Neolix vans live."
    },
    {
     "category": "humanoids",
     "readiness": 15,
     "relevance": 45,
     "hype": 90,
     "substance": 30,
     "reason": "Timelines slipping; our use is guest engagement only."
    },
    {
     "category": "physical_ai",
     "readiness": 35,
     "relevance": 40,
     "hype": 80,
     "substance": 50,
     "reason": "Real tools shipping, mixed signals; matters via vendor roadmaps."
    }
   ],
   "research_meta": {
    "searches": 15,
    "sources": 131
   }
  },
  {
   "id": "2026-W46",
   "label": "Week 46 · 9 Nov 2026",
   "published_at": "2026-11-09T10:57+04:00",
   "period": {
    "from": "2026-11-02",
    "to": "2026-11-09"
   },
   "stories_scanned": 657,
   "distinct_events": 368,
   "signals": {
    "volume": {
     "construction": 33,
     "facade": 11,
     "inspection": 73,
     "cleaning": 13,
     "security": 14,
     "delivery": 37,
     "humanoids": 84,
     "physical_ai": 103
    },
    "deals": {
     "construction": 3,
     "facade": 0,
     "inspection": 1,
     "cleaning": 2,
     "security": 1,
     "delivery": 1,
     "humanoids": 0,
     "physical_ai": 14
    }
   },
   "momentum": [
    {
     "category": "construction",
     "volume": 33,
     "deals": 3,
     "avg_prev": 37.5,
     "change_pct": -12
    },
    {
     "category": "facade",
     "volume": 11,
     "deals": 0,
     "avg_prev": 6.0,
     "change_pct": 83
    },
    {
     "category": "inspection",
     "volume": 73,
     "deals": 1,
     "avg_prev": 87.0,
     "change_pct": -16
    },
    {
     "category": "cleaning",
     "volume": 13,
     "deals": 2,
     "avg_prev": 18.5,
     "change_pct": -30
    },
    {
     "category": "security",
     "volume": 14,
     "deals": 1,
     "avg_prev": 26.5,
     "change_pct": -47
    },
    {
     "category": "delivery",
     "volume": 37,
     "deals": 1,
     "avg_prev": 60.0,
     "change_pct": -38
    },
    {
     "category": "humanoids",
     "volume": 84,
     "deals": 0,
     "avg_prev": 73.0,
     "change_pct": 15
    },
    {
     "category": "physical_ai",
     "volume": 103,
     "deals": 14,
     "avg_prev": 128.0,
     "change_pct": -20
    }
   ],
   "generated_by": "claude",
   "headline": "China blocks SoftBank's $5.4B ABB robotics deal as trade risk runs both ways",
   "takeaways": [
    "Robot trade risk now runs both ways: China blocked SoftBank's $5.4B ABB robotics takeover while the US weighs a DJI ban, escalating the US-led pressure of the past two weeks.",
    "Humanoids moved further into commercial service, with Agility listing on Nasdaq, AGIBOT's 24-hour store trial, Pudu's humanoid pivot and the UAE's first humanoid showroom; humanoid stories rose 15% while most categories fell.",
    "Physical AI funding cooled to 14 deals from 25 last week and 22 the week before, and China robot funding is slowing, though drones drew big money (Axon–Skydio $1.2B, Zipline $21.5B valuation)."
   ],
   "trend_watch": [
    {
     "trend": "Physical AI foundation-model funding boom",
     "status": "cooling",
     "evidence": "14 Physical AI funding deals versus 25 last week; Bloomberg reports China robot funding slowing to $1.6B amid shakeout fears."
    },
    {
     "trend": "US–China restrictions on robot and drone hardware",
     "status": "rising",
     "evidence": "China blocked SoftBank's $5.4B ABB robotics deal (49 outlets); reports say DJI drones could be banned from the US."
    },
    {
     "trend": "GCC regulation of autonomous vehicles and delivery",
     "status": "steady",
     "evidence": "Saudi Transport Authority approved executive regulations for autonomous passenger transport, following Abu Dhabi plates and Ras Al Khaimah testing rules."
    },
    {
     "trend": "Public safety and privacy scrutiny of street robots",
     "status": "steady",
     "evidence": "Delivery robot blamed for a bus incident, another ran a red light, and a woman was arrested for blocking one."
    },
    {
     "trend": "Humanoids moving into paid commercial service",
     "status": "rising",
     "evidence": "Agility began trading on Nasdaq, AGIBOT ran a 24-hour store trial, Xiaomi ran 8-hour factory shifts, and Dubai opened a humanoid showroom."
    }
   ],
   "posts": [
    {
     "id": "chinablockssoftbanks54billiontakeoverofa",
     "category": "physical_ai",
     "type": "trend",
     "region": "China",
     "company": "SoftBank / ABB",
     "amount_usd_m": null,
     "headline": "China blocks SoftBank's $5.4 billion takeover of ABB's robotics division",
     "summary": "Chinese regulators blocked SoftBank's planned $5.4 billion purchase of ABB's robotics division, the week's most widely covered story at 49 outlets.",
     "why_it_matters": "Robot supply chains now face approval risk from Beijing as well as Washington, so multi-sourcing and contract exit clauses matter more.",
     "source": "Reuters",
     "url": "https://www.reuters.com/business/media-telecom/china-blocks-softbanks-54-billion-takeover-abbs-robotics-division-ft-reports-2026-11-05/",
     "published": "2026-11-04",
     "coverage": 49,
     "also_covered_by": [
      "Bloomberg.com",
      "Financial Times",
      "The Robot Report"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "djidronescouldbebannedfromtheusduetoalle",
     "category": "inspection",
     "type": "trend",
     "region": "North America",
     "company": "DJI",
     "amount_usd_m": null,
     "headline": "DJI drones could be banned from the US on national security grounds",
     "summary": "Reports say DJI drones face a possible US ban over alleged national security risks, continuing the US pressure on Chinese drone hardware.",
     "why_it_matters": "UAE operations are not directly affected, but US moves can squeeze DJI parts, software updates and insurer or tenant acceptance.",
     "source": "Yahoo",
     "url": "https://www.yahoo.com/news/politics/articles/dji-drones-could-banned-us-142027608.html",
     "published": "2026-11-06",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "AirTech's Saadiyat Lagoons exterior inspection trial uses DJI M300 and Matrice 4E; a non-DJI fallback should be checked before any scale-up.",
     "image": "https://s.yimg.com/lo/mysterio/api/b07dc7db5b2f637400e612d0eb2e790a4405b1a2f7581f2438f7232489318074/lightyear_networkapi/resizefill_w1200%3Bquality_80%3Bformat_jpg/https%3A%2F%2Fmedia.zenfs.com%2Fen%2Fdigital_camera_world_590%2Fa8ec1b4aad1288a5be0a62e46417efdc.jpg"
    },
    {
     "id": "djimatrice5tenterprisedronefeaturesnight",
     "category": "inspection",
     "type": "product",
     "region": "Global",
     "company": "DJI",
     "amount_usd_m": null,
     "headline": "DJI launches Matrice 5T enterprise drone with thermal and night imaging",
     "summary": "DJI's Matrice 5T enterprise drone adds thermal imaging and night vision in a folding airframe. DroneXL notes US buyers cannot purchase it.",
     "why_it_matters": "Higher-resolution thermal in a compact drone improves façade, roof and MEP leak detection across large residential portfolios.",
     "source": "Mashable",
     "url": "https://mashable.com/tech/dji-matrice-5t-drone-launch",
     "published": "2026-11-02",
     "coverage": 4,
     "also_covered_by": [
      "Mezha.net",
      "Notebookcheck",
      "PTTL.gr"
     ],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "AirTech could test the Matrice 5T as a newer thermal option for Saadiyat Lagoons unit-exterior inspections, replacing the older M300 H20T setup.",
     "image": "https://helios-i.mashable.com/imagery/articles/06vh2bQeEoSRFKbnlOsXUzK/hero-image.fill.size_1200x675.v1793948612.png"
    },
    {
     "id": "djidock4landsintatramountainsautonomousr",
     "category": "inspection",
     "type": "deployment",
     "region": "Europe",
     "company": "DJI",
     "amount_usd_m": null,
     "headline": "DJI Dock 4 runs autonomous rescue flights in Tatra Mountains without a handler",
     "summary": "Mountain rescuers in the Tatras use DJI Dock 4 for automated drone launches without an on-site pilot, saving response time.",
     "why_it_matters": "Docked, pilot-free drones point to scheduled roof and perimeter inspections at communities without daily crew call-outs.",
     "source": "Tech Times",
     "url": "https://www.techtimes.com/articles/330000/20261103/dji-dock-4-lands-tatra-mountains-autonomous-rescue-no-handler-required.htm",
     "published": "2026-11-04",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "AirTech could propose a docked DJI setup to turn the Saadiyat Lagoons trial into recurring automated inspections, subject to UAE drone rules.",
     "image": "https://d.techtimes.com/en/full/477659/dji-dock-4.png"
    },
    {
     "id": "blacklinesafetyintegratesgasdetectiontec",
     "category": "inspection",
     "type": "product",
     "region": "North America",
     "company": "Blackline Safety / Boston Dynamics",
     "amount_usd_m": null,
     "headline": "Blackline Safety adds gas detection to Boston Dynamics Spot",
     "summary": "Blackline Safety integrated its gas detection technology with Boston Dynamics' Spot quadruped for hazardous-area monitoring.",
     "why_it_matters": "Gas sensing lets one robot check plant rooms, basements and car parks for leaks during routine patrols.",
     "source": "BIC Magazine",
     "url": "https://www.bicmagazine.com/resources/products-services/blackline-safety-integrates-gas-detection-technology-with-bo/",
     "published": "2026-11-02",
     "coverage": 2,
     "also_covered_by": [
      "매일경제"
     ],
     "portfolio": [
      {
       "vendor": "Analog",
       "via": "oem",
       "oem": "Boston Dynamics",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Quadruped Dog Interior Inspections",
       "model": "Boston Dynamics Spot",
       "site": "Yas Park Gate",
       "site_count": 1
      }
     ],
     "portfolio_note": "Analog could add gas sensing to Spot interior inspections like the Yas Park Gate trial, extending them into plant rooms and basements.",
     "image": "https://www.bicmagazine.com/downloads/41138/download/Blackline%20Image.jpg?cb=d43ceeecc7308fc686bcce636b835fc9&w=1200"
    },
    {
     "id": "puduroboticsunveilsonebrainmultipleembod",
     "category": "physical_ai",
     "type": "product",
     "region": "Europe",
     "company": "Pudu Robotics",
     "amount_usd_m": null,
     "headline": "Pudu unveils 'One Brain, Multiple Embodiments' strategy at European showcase",
     "summary": "Pudu showed its full portfolio in Europe for the first time and set out a strategy that runs six robot categories on one shared AI brain.",
     "why_it_matters": "A shared software layer across cleaning, delivery and concierge robots could simplify fleet management across mixed-use estates.",
     "source": "Robotics & Automation News",
     "url": "https://roboticsandautomationnews.com/2026/11/05/pudu-robotics-unveils-one-brain-multiple-embodiments-strategy-and-showcases-full-portfolio-in-european-first/106725/",
     "published": "2026-11-05",
     "coverage": 3,
     "also_covered_by": [
      "KuCoin",
      "TechStory"
     ],
     "portfolio": [
      {
       "vendor": "Pudu",
       "via": "vendor",
       "oem": "",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Floor Scrubbing and Sweeping",
       "model": "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
       "site": "International Tower",
       "site_count": 25
      }
     ],
     "portfolio_note": "A common Pudu brain could ease management of CC1 Pro, MT1 Max and BellaBot units across Aldar HQ, ADGM Square and the 19 pending cleaning sites.",
     "image": "https://roboticsandautomationnews.com/wp-content/uploads/2026/11/Pudu-opens-European-HQ-in-Germany.png"
    },
    {
     "id": "servicerobotleaderpudupivotstohumanoidst",
     "category": "humanoids",
     "type": "trend",
     "region": "China",
     "company": "Pudu Robotics",
     "amount_usd_m": null,
     "headline": "Service robot leader Pudu pivots to humanoids to fuel global growth",
     "summary": "SCMP reports Pudu is shifting toward humanoid robots to support its international expansion beyond service robots.",
     "why_it_matters": "Aldar's largest robot supplier may soon offer humanoids for concierge and guest roles alongside cleaning.",
     "source": "South China Morning Post",
     "url": "https://www.scmp.com/tech/tech-trends/article/3373641/chinas-pudu-robotics-which-makes-80-its-sales-abroad-takes-tesla-humanoids",
     "published": "2026-11-08",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Pudu",
       "via": "vendor",
       "oem": "",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Floor Scrubbing and Sweeping",
       "model": "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
       "site": "International Tower",
       "site_count": 25
      }
     ],
     "portfolio_note": "Confirm Pudu's support commitments for the large CC1 Pro rollout at pending sites; its humanoids may later suit Yas Mall concierge.",
     "image": "https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_generic/public/d8/images/canvas/2026/11/07/72b2d711-aefc-4900-900d-c775d4409ea9_7be83cd5.jpg?itok=NcW4scxh&v=1794036142"
    },
    {
     "id": "puduroboticslaunchesautonomousgtseriesmo",
     "category": "cleaning",
     "type": "product",
     "region": "Global",
     "company": "Pudu Robotics",
     "amount_usd_m": null,
     "headline": "Pudu launches autonomous GT Series robot mower lineup",
     "summary": "Pudu introduced the GT Series of autonomous mowers and separately unveiled TOMO S models that extend lawn care to blade sharpening.",
     "why_it_matters": "Robot mowing could cut landscaping labour in master communities, parks and school grounds.",
     "source": "Thomasnet",
     "url": "https://www.thomasnet.com/insights/pudu-robotics-gt-series-mower-lineup/",
     "published": "2026-11-06",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Pudu",
       "via": "vendor",
       "oem": "",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Floor Scrubbing and Sweeping",
       "model": "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
       "site": "International Tower",
       "site_count": 25
      }
     ],
     "portfolio_note": "Pudu mowers could be piloted at landscaped communities or academies in the Pudu + other school rollout, alongside existing external sweepers."
    },
    {
     "id": "deeproboticslaunchesx50quadrupedwithacla",
     "category": "inspection",
     "type": "product",
     "region": "China",
     "company": "DEEP Robotics",
     "amount_usd_m": null,
     "headline": "DEEP Robotics launches X50 quadruped with claimed 50 kg working payload",
     "summary": "DEEP Robotics' new X50 quadruped claims a 50-kilogram working payload, aimed at heavier industrial inspection and patrol kits.",
     "why_it_matters": "Higher payload lets one quadruped carry more sensors for combined security and plant inspection patrols.",
     "source": "Pandaily",
     "url": "https://pandaily.com/deep-robotics-x50-heavy-duty-quadruped-50kg-payload-inspection-firefighting",
     "published": "2026-11-07",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Deep Robotics",
       "via": "vendor",
       "oem": "",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Security Patrolling",
       "model": "X30",
       "site": "ADGM Square",
       "site_count": 1
      }
     ],
     "portfolio_note": "The X50 is a possible upgrade path from the X30 trialled for security patrols at ADGM Square if heavier sensor kits are needed.",
     "image": "https://cms-image.pandaily.com/1/robot_058ae551da.png"
    },
    {
     "id": "deeproboticshumanoidrobotssupporttraffic",
     "category": "humanoids",
     "type": "deployment",
     "region": "China",
     "company": "DEEP Robotics",
     "amount_usd_m": null,
     "headline": "DEEP Robotics humanoids help manage traffic at 2026 Hangzhou Marathon",
     "summary": "DEEP Robotics deployed humanoid robots to support traffic management at the Hangzhou Marathon.",
     "why_it_matters": "Public-event crowd and traffic roles hint at humanoid use for mall events and community race days.",
     "source": "Digital Journal",
     "url": "https://www.digitaljournal.com/pr/news/access-newswire/deep-robotics-humanoid-robots-support-1148380314.html",
     "published": "2026-11-08",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Deep Robotics",
       "via": "vendor",
       "oem": "",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Security Patrolling",
       "model": "X30",
       "site": "ADGM Square",
       "site_count": 1
      }
     ],
     "portfolio_note": "Shows DEEP Robotics moving beyond quadrupeds; useful context if the ADGM Square X30 security trial expands to event support."
    },
    {
     "id": "agilityroboticsbeginstradingonnasdaq",
     "category": "humanoids",
     "type": "investment",
     "region": "North America",
     "company": "Agility Robotics",
     "amount_usd_m": null,
     "headline": "Agility Robotics begins trading on Nasdaq, first US humanoid maker listed",
     "summary": "Agility Robotics became the first US-based legged humanoid company to go public, after shareholders approved its SPAC merger.",
     "why_it_matters": "Public listing brings disclosed humanoid economics, giving buyers firmer data on cost, uptime and vendor durability.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/agility-robotics-begins-trading-on-nasdaq/",
     "published": "2026-11-03",
     "coverage": 15,
     "also_covered_by": [
      "Forbes",
      "Business Insider",
      "OregonLive.com"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/09/Agility_Digit5_06-featured.jpg"
    },
    {
     "id": "sixagibotg2robotscomplete1730tasksin24ho",
     "category": "humanoids",
     "type": "deployment",
     "region": "China",
     "company": "AGIBOT",
     "amount_usd_m": null,
     "headline": "Six AGIBOT G2 humanoids complete 1,730 tasks in 24-hour store trial",
     "summary": "Six AGIBOT G2 robots ran a 24-hour Shanghai convenience store trial and completed 1,730 tasks; other reports say two failed the assessment.",
     "why_it_matters": "Round-the-clock retail tests give realistic failure rates for mall and convenience-retail humanoid pilots.",
     "source": "The Manila Times",
     "url": "https://www.manilatimes.net/2026/11/09/tmt-newswire/globenewswire/six-agibot-g2-robots-complete-1730-tasks-in-24-hour-shanghai-convenience-store-trial/2464777",
     "published": "2026-11-04",
     "coverage": 5,
     "also_covered_by": [
      "FourWeekMBA",
      "AI Insider",
      "AI Magazine"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://manilatimes.net/manilatimes/uploads/images/2026/11/09/1297636.png"
    },
    {
     "id": "xiaomishumanoidrobotsworkafull8hourshift",
     "category": "humanoids",
     "type": "deployment",
     "region": "China",
     "company": "Xiaomi",
     "amount_usd_m": null,
     "headline": "Xiaomi humanoid robots work a full 8-hour shift in its EV factory",
     "summary": "Xiaomi ran humanoid robots through a full 8-hour production shift at its electric-vehicle factory.",
     "why_it_matters": "Full-shift endurance is the benchmark to demand before humanoids staff lobbies or back-of-house roles.",
     "source": "Electrek",
     "url": "https://electrek.co/2026/11/04/xiaomi-humanoid-robot-8-hour-shift-ev-factory/",
     "published": "2026-11-04",
     "coverage": 8,
     "also_covered_by": [
      "Martin Cid Magazine",
      "The Gadgeteer",
      "TechEBlog -"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://electrek.co/wp-content/uploads/sites/3/2026/11/Xiaomi-humanoid-robot.jpeg?quality=82&strip=all&resize=1200,628"
    },
    {
     "id": "axoninvests12billioninskydiosecuresexclu",
     "category": "inspection",
     "type": "investment",
     "region": "North America",
     "company": "Axon / Skydio",
     "amount_usd_m": 1200,
     "headline": "Axon invests $1.2 billion in Skydio for exclusive public-safety drone rights",
     "summary": "Axon invested $1.2 billion in US drone maker Skydio and secured exclusive distribution rights for public-safety drones.",
     "why_it_matters": "A well-funded non-Chinese drone ecosystem is emerging as an alternative for security and inspection fleets.",
     "source": "Dronelife",
     "url": "https://dronelife.com/2026/11/06/axon-skydio-investment-exclusive-drone-distribution/",
     "published": "2026-11-02",
     "coverage": 7,
     "also_covered_by": [
      "Yahoo Finance",
      "People.com",
      "Fashion Times UK"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://dronelife.com/wp-content/uploads/2025/09/Skydio-family-scaled.jpeg"
    },
    {
     "id": "ziplinehits215bvaluationaswalmartexpands",
     "category": "delivery",
     "type": "investment",
     "region": "North America",
     "company": "Zipline",
     "amount_usd_m": null,
     "headline": "Zipline reaches $21.5 billion valuation as Walmart expands drone delivery",
     "summary": "Drone delivery firm Zipline hit a $21.5 billion valuation as Walmart widens its drone delivery programme.",
     "why_it_matters": "Scaled drone delivery means planning landing points and airspace consent in new communities.",
     "source": "TechCrunch",
     "url": "https://techcrunch.com/2026/11/05/zipline-hits-21-5b-valuation-as-walmart-expands-bet-on-drone-delivery/",
     "published": "2026-11-04",
     "coverage": 12,
     "also_covered_by": [
      "DroneLife",
      "Securities.io",
      "Wowtale"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://techcrunch.com/wp-content/uploads/2026/11/Precision-Zip-Delivering-3QTR.jpg?resize=1200,800"
    },
    {
     "id": "autonomouscleaningrobotsfirmpeppermintra",
     "category": "cleaning",
     "type": "investment",
     "region": "Global",
     "company": "Peppermint",
     "amount_usd_m": 10,
     "headline": "Autonomous cleaning robot firm Peppermint raises $10 million",
     "summary": "Peppermint, which builds autonomous cleaning robots, raised $10 million.",
     "why_it_matters": "More funded cleaning vendors increase price competition for future floor-cleaning tenders beyond Pudu.",
     "source": "Evertiq",
     "url": "https://evertiq.com/news/2026-11-06-autonomous-cleaning-robots-firm-peppermint-raises-10-million",
     "published": "2026-11-04",
     "coverage": 9,
     "also_covered_by": [
      "ET Entrepreneur",
      "Indian Startup News",
      "Urban Acres"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://evertiq.com/nimg/robotics/Peppermint_Robotics.jpg"
    },
    {
     "id": "tutorintelligenceraisesseriesbtoscalemod",
     "category": "physical_ai",
     "type": "investment",
     "region": "Global",
     "company": "Tutor Intelligence",
     "amount_usd_m": null,
     "headline": "Tutor Intelligence raises Series B to scale model training and deployments",
     "summary": "Tutor Intelligence closed a Series B to expand robot model training and field deployments.",
     "why_it_matters": "Funding is shifting toward deployed, trainable robots, which favours vendors that improve on site.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/tutor-intelligence-raises-series-b-to-scale-model-training-robot-deployments/",
     "published": "2026-11-02",
     "coverage": 10,
     "also_covered_by": [
      "Forbes",
      "Business Wire",
      "Wisconsin State Farmer"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/11/Tutor_Sonny.jpg"
    },
    {
     "id": "physiclraises10mtomakethedigitalworldrea",
     "category": "physical_ai",
     "type": "investment",
     "region": "Global",
     "company": "Physicl",
     "amount_usd_m": 10,
     "headline": "Physicl raises $10M for realistic simulation to train robots",
     "summary": "Physicl raised $10 million to build simulated environments realistic enough to train robots.",
     "why_it_matters": "Better simulation could shorten robot commissioning time in new malls and towers.",
     "source": "TechCrunch",
     "url": "https://techcrunch.com/2026/11/06/physicl-raises-10m-to-make-the-digital-world-real-enough-for-robots/",
     "published": "2026-11-06",
     "coverage": 5,
     "also_covered_by": [
      "The Tech Buzz",
      "TOKENPOST",
      "Dealroom"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://techcrunch.com/wp-content/uploads/2026/11/physicl-studio-hero-kitchen-16x9-1.jpg?resize=1200,675"
    },
    {
     "id": "serveroboticslaunchesphysicalaiservicesf",
     "category": "physical_ai",
     "type": "product",
     "region": "North America",
     "company": "Serve Robotics",
     "amount_usd_m": null,
     "headline": "Serve Robotics opens fleet connectivity and training services to other firms",
     "summary": "Serve Robotics launched a business offering its fleet software, connectivity and data to other physical AI companies, pitched as an 'AWS for robots'.",
     "why_it_matters": "Third-party fleet platforms could let operators run mixed-vendor robots without each vendor's separate stack.",
     "source": "AI Insider",
     "url": "https://theaiinsider.tech/2026/11/06/serve-robotics-launches-physical-ai-services-for-robot-fleet-connectivity-and-training/",
     "published": "2026-11-02",
     "coverage": 7,
     "also_covered_by": [
      "GlobeNewswire",
      "Mezha.net",
      "TOKENPOST"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "newisointeroperabilitystandardcoverscoll",
     "category": "physical_ai",
     "type": "trend",
     "region": "Global",
     "company": "ISO",
     "amount_usd_m": null,
     "headline": "New ISO 21423:2026 standard lets mobile robots from multiple vendors coordinate",
     "summary": "ISO 21423:2026 sets an interoperability standard so mobile robots from different vendors can communicate and coordinate.",
     "why_it_matters": "Aldar can require ISO 21423 compliance in tenders so cleaning, delivery and security robots share lifts and corridors.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/new-iso-interoperability-standard-covers-collaboration-among-mobile-robots-from-multiple-vendors/",
     "published": "2026-11-03",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/11/AdobeStock_2225516731-copy.jpg"
    },
    {
     "id": "chinarobotfundingslowsto16billionasshake",
     "category": "physical_ai",
     "type": "trend",
     "region": "China",
     "company": "Chinese robotics sector",
     "amount_usd_m": null,
     "headline": "China robot funding slows to $1.6 billion as shakeout fears grow",
     "summary": "Bloomberg reports funding for Chinese robot companies slowed to $1.6 billion amid fears of a sector shakeout.",
     "why_it_matters": "A shakeout could leave smaller Chinese suppliers unable to support deployed fleets; check vendor finances.",
     "source": "Bloomberg.com",
     "url": "https://www.bloomberg.com/news/articles/2026-11-04/china-robot-funding-slows-to-1-6-billion-as-shakeout-fears-grow",
     "published": "2026-11-04",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "bluelightbringsautonomytoasphaltrollersw",
     "category": "construction",
     "type": "product",
     "region": "Global",
     "company": "Bluelight",
     "amount_usd_m": null,
     "headline": "Bluelight offers autonomy kit for asphalt rollers under $50K",
     "summary": "Bluelight launched a retrofit kit that makes existing asphalt rollers autonomous for under $50,000.",
     "why_it_matters": "Low-cost retrofits allow trials of site autonomy on road and infrastructure packages without new fleets.",
     "source": "Equipment World",
     "url": "https://www.equipmentworld.com/equipment-controls/autonomous/article/16423002/bluelight-launches-autopilot-asphalt-roller-autonomy-kit",
     "published": "2026-11-03",
     "coverage": 3,
     "also_covered_by": [
      "PhoneWorld",
      "TechEBlog -"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "busincidentinvolvingdeliveryrobotthrowsp",
     "category": "delivery",
     "type": "trend",
     "region": "Global",
     "company": "Delivery robot developer (unnamed)",
     "amount_usd_m": null,
     "headline": "Delivery robot bus incident blamed on bright billboard and faulty sensor",
     "summary": "A bus braked for a delivery robot and threw passengers from seats; the developer blamed a bright billboard and a faulty sensor. Another robot reportedly ran a red light.",
     "why_it_matters": "Community delivery robots need sensor-failure protocols, incident reporting and liability terms before expansion.",
     "source": "Yahoo",
     "url": "https://www.yahoo.com/news/world/articles/bus-incident-involving-delivery-robot-222500122.html",
     "published": "2026-11-02",
     "coverage": 3,
     "also_covered_by": [
      "The Cool Down",
      "ShiftDelete.Net"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://s.yimg.com/lo/mysterio/api/8ae75fd7711b92c92e8a30af88610f2def2869e556088f7ea2b7f42eae27e253/lightyear_networkapi/resizefill_w1200%3Bquality_80%3Bformat_jpg/https%3A%2F%2Fmedia.zenfs.com%2Fen%2Fthe_cool_down_737%2Ff48478d21d6124ebfd3370e08debb8ea.jpg"
    },
    {
     "id": "uaeopensitsfirsthumanoidroboticsshowroom",
     "category": "humanoids",
     "type": "trend",
     "region": "GCC",
     "company": "Dubai humanoid showroom",
     "amount_usd_m": null,
     "headline": "UAE opens first humanoid robotics showroom as Dubai targets 200,000 robots",
     "summary": "The UAE's first humanoid robotics showroom opened in Dubai, supporting the emirate's push toward 200,000 robots.",
     "why_it_matters": "Local showrooms make it easier to evaluate humanoids for malls and concierge roles before procurement.",
     "source": "The National",
     "url": "https://www.thenationalnews.com/news/uae/2026/11/06/uae-opens-its-first-humanoid-robotics-showroom-as-dubai-races-to-200000-robots/",
     "published": "2026-11-06",
     "coverage": 3,
     "also_covered_by": [
      "Gulf Today",
      "UA.NEWS"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.thenationalnews.com/resizer/v2/OQ3E23A6E5ES5MLJWLFRAYEPHQ.jpg?auth=88afe0a93af70843e38753919d71836564714933ea0ec6b13df1abb4df90c054&focal=2224%2C2667&width=1200&height=630"
    },
    {
     "id": "sauditransportauthorityapprovesexecutive",
     "category": "delivery",
     "type": "trend",
     "region": "GCC",
     "company": "Saudi Transport General Authority",
     "amount_usd_m": null,
     "headline": "Saudi Arabia approves executive regulations for autonomous passenger transport",
     "summary": "Saudi Arabia's Transport Authority approved executive regulations governing autonomous-vehicle passenger transport.",
     "why_it_matters": "GCC rules for autonomous mobility are maturing, which supports planning shuttle and delivery services in communities.",
     "source": "صحيفة سبق الإلكترونية",
     "url": "https://sabq.org/en/article/1a71k95",
     "published": "2026-11-06",
     "coverage": 2,
     "also_covered_by": [
      "jawlah.co"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://media.sabq.org/news/2026/11/f9542fe8-f8a0-4034-9ad1-6c84b22e8fa4/w1600.webp"
    },
    {
     "id": "adnocexpandsaiacrossenergyoperationswith",
     "category": "physical_ai",
     "type": "deployment",
     "region": "GCC",
     "company": "ADNOC",
     "amount_usd_m": null,
     "headline": "ADNOC expands AI across operations with 70 robotic use cases",
     "summary": "ADNOC is expanding AI across its energy operations and has identified 70 robotic use cases.",
     "why_it_matters": "ADNOC's scale builds an Abu Dhabi base of inspection and maintenance robot suppliers Aldar can use.",
     "source": "Khaleej Times",
     "url": "https://www.khaleejtimes.com/uae/adnoc-expansion-ai-robotics-energy-operations",
     "published": "2026-11-03",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://imgengine.khaleejtimes.com/khaleejtimes-english/2026-11-02/haz8znzs/http___doc_afp_com_D64V4CP.jpeg?width=1200&height=630&q=60&format=auto&ogImage=true&mode=crop&rect=0,0,8256,5504"
    },
    {
     "id": "uaeistheplacetobeforroboticsandaisaysgec",
     "category": "physical_ai",
     "type": "trend",
     "region": "GCC",
     "company": "Gecko Robotics",
     "amount_usd_m": null,
     "headline": "Gecko Robotics CEO calls UAE the 'place to be for robotics and AI'",
     "summary": "Gecko Robotics' CEO told CNBC the UAE is the place to be for robotics and AI.",
     "why_it_matters": "Global robotics firms looking to the UAE give Aldar more local pilot partners and negotiating options.",
     "source": "CNBC",
     "url": "https://www.cnbc.com/video/2026/11/03/uae-is-the-place-to-be-for-robotics-and-ai-says-gecko-robotics-ceo.html",
     "published": "2026-11-03",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://image.cnbcfm.com/api/v1/image/108509168-17936958021793695799-49405593351-1080pnbcnews.jpg?v=1793695801&w=1920&h=1080"
    },
    {
     "id": "howwallclimbingrobotscouldhelpgulfenergy",
     "category": "inspection",
     "type": "trend",
     "region": "GCC",
     "company": "Wall-climbing robot makers",
     "amount_usd_m": null,
     "headline": "Wall-climbing robots pitched to help Gulf energy producers recover from attacks",
     "summary": "The National examines how wall-climbing inspection robots could speed damage assessment and repair at Gulf energy facilities.",
     "why_it_matters": "Wall-climbing inspection proven on industrial assets could transfer to tower façades and structural checks.",
     "source": "The National",
     "url": "https://www.thenationalnews.com/future/technology/2026/11/04/how-wall-climbing-robots-could-help-gulf-energy-producers-recover-from-attacks/",
     "published": "2026-11-04",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.thenationalnews.com/resizer/v2/V33QJM3PU5HCPLSHWWT2UFXB4I.jpg?auth=84bd930e6bfc0aaac016d04ffeb72370f4d866ffb1eed3637a821f719b504720&smart=true&width=1200&height=630"
    },
    {
     "id": "ubtechroboticsnewsroomavatarsgulfpilotde",
     "category": "humanoids",
     "type": "deployment",
     "region": "GCC",
     "company": "UBTech Robotics",
     "amount_usd_m": null,
     "headline": "UBTech reports Gulf pilot deals alongside newsroom avatar work",
     "summary": "A report on UBTech Robotics cites Gulf pilot deals, newsroom avatars and a share incentive plan.",
     "why_it_matters": "Another Chinese humanoid maker piloting in the Gulf widens options for guest-engagement trials.",
     "source": "ad-hoc-news.de",
     "url": "https://www.ad-hoc-news.de/boerse/news/unternehmensnachrichten/ubtech-robotics-newsroom-avatars-gulf-pilot-deals-and-a-2-million-share-incentive-bill/70477806",
     "published": "2026-11-08",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://mdb.ad-hoc-news.de/bild/bild-2844824_1920_1080.webp"
    },
    {
     "id": "jashanmalbringsglobalhomeroboticsinnovat",
     "category": "cleaning",
     "type": "deployment",
     "region": "GCC",
     "company": "Jashanmal / ECOVACS",
     "amount_usd_m": null,
     "headline": "Jashanmal brings home robotics maker ECOVACS to the UAE",
     "summary": "Retailer Jashanmal is introducing ECOVACS home robots, including cleaning robots, to the UAE market.",
     "why_it_matters": "Wider consumer robot retail raises resident expectations for robot cleaning in homes and shared spaces.",
     "source": "Gulf News",
     "url": "https://gulfnews.com/friday/lifetstyle/jashanmal-brings-global-home-robotics-innovator-ecovacs-to-the-uae-1.500738684",
     "published": "2026-11-06",
     "coverage": 3,
     "also_covered_by": [
      "Khaleej Times",
      "Mashable"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://media.assettype.com/gulfnews%2F2026-11-06%2F88mcbioc%2FDCC219AE-9835-4E87-881F-82F676582D6A.jpeg?rect=0%2C194%2C1170%2C614&w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100"
    },
    {
     "id": "tiiandnavalgrouppartnertodevelopautonomo",
     "category": "security",
     "type": "deployment",
     "region": "GCC",
     "company": "TII / Naval Group",
     "amount_usd_m": null,
     "headline": "Abu Dhabi's TII partners Naval Group to develop autonomous underwater vehicles",
     "summary": "Abu Dhabi's Technology Innovation Institute and France's Naval Group will jointly develop autonomous underwater vehicles.",
     "why_it_matters": "Local underwater autonomy could later serve marina, quay wall and waterfront inspection at coastal developments.",
     "source": "Israel Defense",
     "url": "https://www.israeldefense.co.il/en/node/72556",
     "published": "2026-11-04",
     "coverage": 3,
     "also_covered_by": [
      "36氪",
      "DC Velocity"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.israeldefense.co.il/sites/default/files/2026-11/4370d3fb7989cd078d42daf7b5e810b4281c01104f1d723329f313e94dd4.jpg"
    },
    {
     "id": "adipec2026trendsresilienceaiandrobotsand",
     "category": "physical_ai",
     "type": "trend",
     "region": "GCC",
     "company": "ADIPEC 2026",
     "amount_usd_m": null,
     "headline": "ADIPEC 2026 highlights gap between robot demos and plant-floor reality",
     "summary": "Coverage of ADIPEC in Abu Dhabi notes strong focus on AI and robots but a gap between stage demos and actual plant use.",
     "why_it_matters": "A reminder to judge vendors on field uptime and support in Abu Dhabi, not exhibition demos.",
     "source": "Oil & Gas Middle East",
     "url": "https://www.oilandgasmiddleeast.com/news/adipec-2026-trends",
     "published": "2026-11-03",
     "coverage": 2,
     "also_covered_by": [
      "Process and Control Today"
     ],
     "portfolio": [],
     "portfolio_note": ""
    }
   ],
   "vendor_watch": [
    {
     "vendor": "AirTech",
     "oem": "DJI",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Drone Inspections for Unit Exterior"
     ],
     "models": [
      "Thermal: M300 H20T · General capture: Matrice 4E"
     ],
     "sites": [
      "Saadiyat Lagoons"
     ],
     "mentions": 8,
     "post_ids": [
      "djidronescouldbebannedfromtheusduetoalle",
      "djimatrice5tenterprisedronefeaturesnight",
      "djidock4landsintatramountainsautonomousr"
     ],
     "signal": "mixed",
     "note": "DJI's Matrice 5T and Dock 4 offer upgrades, but a possible US ban on DJI adds supply and support risk.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Pudu",
     "oem": "",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Concierge Service",
      "Customer Management Delivery Bot",
      "Floor Scrubbing and Sweeping"
     ],
     "models": [
      "1× CC1 Pro, 1× MT1 Max",
      "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
      "1× CC1 Pro, 3× MT1 Max",
      "2× CC1 Pro",
      "2× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
      "33× CC1 Pro",
      "3× CC1 Pro",
      "3× CC1 Pro, 1× MT1 Max",
      "4× CC1 Pro, 1× MT1 Max",
      "4× CC1 Pro, 2× MT1 Max, 2× BG1 Pro",
      "6× CC1 Pro",
      "6× CC1 Pro, 3× MT1 Max, 2× BG1 Pro",
      "Bellabot Pro"
     ],
     "sites": [
      "International Tower",
      "ADGM Square",
      "Aldar HQ",
      "Al Maryah Tower",
      "Yas Place",
      "Aldar Square",
      "Aldar Estates Office · Yas Mall",
      "Masdar City",
      "Al Rayanna",
      "The Bridges",
      "Mamsha Al Saadiyat",
      "Gate & Arc Towers",
      "Al Zeina",
      "Sun & Sky Tower",
      "Saadiyat Grove",
      "Saadiyat Beach Residences",
      "Al Muneera",
      "Waters Edge",
      "Yas Golf Collection",
      "West Yas Plaza",
      "Noya Plaza",
      "Shams Boutik",
      "Eastern Mangroves",
      "Muneera Retail (Al Muneera Beach Plaza)",
      "Gardens Plaza"
     ],
     "mentions": 11,
     "post_ids": [
      "puduroboticsunveilsonebrainmultipleembod",
      "servicerobotleaderpudupivotstohumanoidst",
      "puduroboticslaunchesautonomousgtseriesmo"
     ],
     "signal": "positive",
     "note": "European portfolio launch, shared-brain strategy and new mowers broaden offerings; watch that the humanoid pivot does not dilute support for cleaning rollouts.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Analog",
     "oem": "Boston Dynamics",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Quadruped Dog Interior Inspections"
     ],
     "models": [
      "Boston Dynamics Spot"
     ],
     "sites": [
      "Yas Park Gate"
     ],
     "mentions": 3,
     "post_ids": [
      "blacklinesafetyintegratesgasdetectiontec"
     ],
     "signal": "positive",
     "note": "Blackline gas detection for Spot expands what interior inspections like Yas Park Gate can cover.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Deep Robotics",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Security Patrolling"
     ],
     "models": [
      "X30"
     ],
     "sites": [
      "ADGM Square"
     ],
     "mentions": 2,
     "post_ids": [
      "deeproboticslaunchesx50quadrupedwithacla",
      "deeproboticshumanoidrobotssupporttraffic"
     ],
     "signal": "positive",
     "note": "New X50 quadruped and humanoid event deployment show a widening product line relevant to the ADGM Square patrol trial.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "BarqAir",
     "oem": "",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Drone Façade Cleaning"
     ],
     "models": [
      "Cleaning Drone"
     ],
     "sites": [
      "Yas Place"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Cargo X / Noon",
     "oem": "Neolix",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Autonomous Delivery Vans",
      "Autonomous Delivery Vans (Al Merief expansion)",
      "Autonomous Delivery Vans (Golf Gardens expansion)"
     ],
     "models": [
      "Neolix X3"
     ],
     "sites": [
      "Al Raha Gardens",
      "Golf Gardens",
      "Al Merief"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "SINDAN",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Floor Scrubbing and Sweeping",
      "Humanoid Guest Engagement",
      "Security Patrolling (2)"
     ],
     "models": [
      "D1 Max",
      "MK-02 Humanoid",
      "NOVA-02 and NOVA-05"
     ],
     "sites": [
      "Yas Mall",
      "ADGM Square",
      "Livex · ADNEC"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Thub Technologies",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Crawler Façade Cleaning (2)",
      "Façade Cleaning"
     ],
     "models": [
      "TowerCraft"
     ],
     "sites": [
      "Yas Place",
      "World Trade Center Abu Dhabi"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "X-Human",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Crawler Façade Cleaning"
     ],
     "models": [
      "Lingkong K3"
     ],
     "sites": [
      "Yas Place"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "AD Robotics",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Community Delivery Bot",
      "Security Patrolling"
     ],
     "models": [
      "ADR Delivery Bot",
      "ADR Quadruped"
     ],
     "sites": [
      "Noya Luma",
      "Ansam"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Falcon Tech Robotics",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Interactive Visitor Engagement"
     ],
     "models": [
      "KODY"
     ],
     "sites": [
      "The Galleria"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Pudu + other",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Floor Scrubbing and Sweeping"
     ],
     "models": [
      "2× CC1 Pro, 1× MT1 Max, 1× External Sweeper",
      "3× CC1 Pro, 1× MT1 Max, 1× External Sweeper",
      "3× MT1 Max, 1× BG1 Pro, 1× External Sweeper"
     ],
     "sites": [
      "Pearl British Academy",
      "Muna British Academy",
      "Bateen World Academy",
      "Al Ain British Academy",
      "Yasmina British Academy",
      "Mamoura British Academy",
      "Cranleigh Abu Dhabi",
      "Noya British School",
      "Yasmina American School",
      "Eastern Mangroves"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Solinas",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Hidden Cavity Inspection"
     ],
     "models": [
      "Endobot 90 and Endobot 250"
     ],
     "sites": [
      "Saadiyat Grove"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Subdivo",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Façade Cleaning"
     ],
     "models": [],
     "sites": [
      "International Tower"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    }
   ],
   "viral": [
    {
     "platform": "X",
     "date": "2026-11-04",
     "title": "A robot got its head kicked off during a fight in China and just kept fighting.",
     "category": "humanoids",
     "views_reported": "11M (weakly sourced)",
     "views_source": "grandgoldman.com blog (low credibility); no mainstream figure",
     "what_shows": "Two EngineAI T800 humanoids fight in a cage at the URKL tournament in Shenzhen (filmed 16 Jul 2026). One kicks the other's head off; the headless robot keeps fighting because its main control unit is in the torso.",
     "what_behind": "EngineAI organises the tournament; all teams use the T800. Teams could mix human operator and software control. A San Francisco T800 event was remote-controlled. Sunday Guardian says the clip doesn't prove lasting headless operation.",
     "checks": {
      "real": "yes",
      "autonomous": "unknown",
      "corroborated": "yes",
      "deployed": "no",
      "gcc": "unknown"
     },
     "verdict": "hype",
     "fit": "Low",
     "portfolio_match": "SINDAN MK-02 Humanoid (pending, Humanoid Guest Engagement at Livex · ADNEC)",
     "action": "Ignore",
     "leadership_line": "It's a robot combat show, partly remote-controlled; it shows the robots are tough, not that they can do any work for us.",
     "assessed_from": "Web pages and news coverage; video not watched",
     "video_url": "",
     "corroboration": [
      {
       "label": "Sunday Guardian (5 Nov 2026)",
       "url": "https://sundayguardianlive.com/trending/watch-video-china-robot-fight-goes-viral-humanoid-machine-keeps-fighting-after-opponent-kicks-its-head-off-317778/"
      },
      {
       "label": "grandgoldman.com (index date ~3 Nov 2026)",
       "url": "https://grandgoldman.com/blogs/ai-video/humanoid-robots-decapitate-each-other-in-viral-kick-fight"
      },
      {
       "label": "Mike Kalil, URKL begins (~mid-Jul 2026)",
       "url": "https://mikekalil.com/blog/engineai-urkl-begins/"
      },
      {
       "label": "Electronics For You, teleoperated combat (~late Sep 2026)",
       "url": "https://www.electronicsforu.com/news/humanoid-robot-demonstrates-teleoperated-combat-skills-in-cage"
      }
     ]
    },
    {
     "platform": "X",
     "date": "2026-11-02",
     "title": "Newly manufactured F.03 robots leaving BotQ and heading across campus",
     "category": "humanoids",
     "views_reported": "Not verified",
     "views_source": "No source gives a figure",
     "what_shows": "A roughly 19-second clip of several Figure 03 robots walking across Figure's campus; one crosses a marked pedestrian crossing.",
     "what_behind": "Company footage only. Adcock did not say whether robots walked autonomously or under remote supervision, how many, or where. Figure built its 1,000th robot in July 2026; no delivery figures released.",
     "checks": {
      "real": "yes",
      "autonomous": "unknown",
      "corroborated": "no",
      "deployed": "unknown",
      "gcc": "unknown"
     },
     "verdict": "watch",
     "fit": "Low",
     "portfolio_match": "SINDAN MK-02 Humanoid",
     "action": "Watch",
     "leadership_line": "Figure is clearly making robots in volume, but it hasn't shown them working for paying customers, let alone in our conditions.",
     "assessed_from": "Interesting Engineering coverage; video not watched",
     "video_url": "https://x.com/adcock_brett/status/2117286067472937012",
     "corroboration": [
      {
       "label": "Interesting Engineering (3 Nov 2026)",
       "url": "https://interestingengineering.com/ai-robotics/figure-03-humanoids-take-campus-walk"
      }
     ]
    },
    {
     "platform": "X",
     "date": "2026-11-06",
     "title": "Shinkei Systems' Poseidon: \"the most absurd AI startup ever\"",
     "category": "physical_ai",
     "views_reported": "Not verified",
     "views_source": "Dealroom says \"millions of views\", no exact number",
     "what_shows": "A fridge-sized robot on fishing-boat decks whose camera identifies fish species, then kills the fish in about seven seconds using a traditional Japanese method that keeps meat fresher.",
     "what_behind": "Shinkei Systems (El Segundo) gives robots to crews free and buys catch at a premium. Running on three US West Coast boats (Semafor, July 2025). Raised $22M Series A led by Founders Fund, June 2025.",
     "checks": {
      "real": "yes",
      "autonomous": "unknown",
      "corroborated": "yes",
      "deployed": "yes",
      "gcc": "unknown"
     },
     "verdict": "real",
     "fit": "Low",
     "portfolio_match": "None",
     "action": "Ignore",
     "leadership_line": "It's a real, working niche robot for fishing boats, and it has nothing to do with our assets.",
     "assessed_from": "Dealroom coverage; video not watched",
     "video_url": "",
     "corroboration": [
      {
       "label": "Dealroom (6 Nov 2026)",
       "url": "https://dealroom.co/news/170489-shinkeis-poseidon-robot-goes-viral-ai-ike-jime-on-us-fishing-boats-after/"
      }
     ]
    }
   ],
   "challengers": [
    {
     "name": "Micropolis Robotics",
     "category": "security",
     "what": "UAE-based, NYSE American-listed maker of DPR-02 autonomous patrol vehicles, in service with Dubai Police at Global Village since October 2025.",
     "scores": {
      "funding": 3,
      "deployments": 3,
      "scale": 1,
      "partners": 4,
      "gcc": 4
     },
     "why": "UAE-built outdoor patrol with a verifiable police customer; local alternative to quadrupeds for community patrol such as pending Noya Luma.",
     "source": {
      "label": "AOL (19 Oct 2026)",
      "url": "https://www.aol.com/articles/dubai-robot-police-cars-flag-192937000.html"
     },
     "total": 15,
     "verdict": "add"
    },
    {
     "name": "URobotics",
     "category": "physical_ai",
     "what": "KAIST spin-off; add-on kit lets humanoids and quadrupeds navigate rough ground. Series A about $30M; amount varies by source.",
     "scores": {
      "funding": 3,
      "deployments": 1,
      "scale": 1,
      "partners": 2,
      "gcc": 1
     },
     "why": "Could make robot-dog inspections on our construction sites need less human control, like our Spot and X30 trials.",
     "source": {
      "label": "Dealroom (6 Nov 2026)",
      "url": "https://dealroom.co/news/170189-robot-autonomy-startup-urobotics-raises-29-9m-series-a-at-a-tenfold-valu/"
     },
     "total": 8,
     "verdict": "watch"
    },
    {
     "name": "Unitree (H2-X)",
     "category": "humanoids",
     "what": "Released H2-X bodyguard video; autonomy unconfirmed. Ranked second in global humanoid shipments, H1 2026.",
     "scores": {
      "funding": 0,
      "deployments": 0,
      "scale": 3,
      "partners": 0,
      "gcc": 0
     },
     "why": "High-volume humanoid seller that could compete with SINDAN for guest-engagement and patrol pilots; bodyguard claims unproven.",
     "source": {
      "label": "SCMP (~22 Oct 2026)",
      "url": "https://www.scmp.com/video/china/3371678/unitree-robotics-unveils-bodyguard-robot-capable-lifting-front-car"
     },
     "total": 3,
     "verdict": "ignore"
    },
    {
     "name": "Figure AI",
     "category": "humanoids",
     "what": "Over 1,000 humanoids built (company figure, July 2026); no customer or delivery numbers published.",
     "scores": {
      "funding": 0,
      "deployments": 0,
      "scale": 3,
      "partners": 0,
      "gcc": 0
     },
     "why": "Benchmark for where humanoids are heading, not something Aldar could buy soon.",
     "source": {
      "label": "Interesting Engineering (3 Nov 2026)",
      "url": "https://interestingengineering.com/ai-robotics/figure-03-humanoids-take-campus-walk"
     },
     "total": 3,
     "verdict": "ignore"
    }
   ],
   "matrix": [
    {
     "category": "construction",
     "readiness": 35,
     "relevance": 60,
     "hype": 40,
     "substance": 40,
     "reason": "Niche products; no Aldar construction deployments yet."
    },
    {
     "category": "facade",
     "readiness": 40,
     "relevance": 85,
     "hype": 35,
     "substance": 45,
     "reason": "One launched project; this week only pitches, no new deployments."
    },
    {
     "category": "inspection",
     "readiness": 75,
     "relevance": 70,
     "hype": 55,
     "substance": 75,
     "reason": "Mature products; possible US DJI ban is supply-chain risk."
    },
    {
     "category": "cleaning",
     "readiness": 85,
     "relevance": 95,
     "hype": 30,
     "substance": 80,
     "reason": "Largest category; Pudu at scale, market maturing."
    },
    {
     "category": "security",
     "readiness": 50,
     "relevance": 70,
     "hype": 65,
     "substance": 45,
     "reason": "Micropolis Dubai Police deployment; much hype from unverified videos."
    },
    {
     "category": "delivery",
     "readiness": 65,
     "relevance": 75,
     "hype": 55,
     "substance": 65,
     "reason": "Zipline and Serve scaling; sensor failures still occur."
    },
    {
     "category": "humanoids",
     "readiness": 25,
     "relevance": 45,
     "hype": 95,
     "substance": 35,
     "reason": "Biggest hype gap; most shipments go to entertainment."
    },
    {
     "category": "physical_ai",
     "readiness": 35,
     "relevance": 50,
     "hype": 80,
     "substance": 45,
     "reason": "Big funding, results lag; Chinese funding slowing."
    }
   ],
   "research_meta": {
    "searches": 15,
    "sources": 113
   }
  },
  {
   "id": "2026-W45",
   "label": "Week 45 · 2 Nov 2026",
   "published_at": "2026-11-02T10:52+04:00",
   "period": {
    "from": "2026-10-26",
    "to": "2026-11-02"
   },
   "stories_scanned": 772,
   "distinct_events": 446,
   "signals": {
    "volume": {
     "construction": 35,
     "facade": 8,
     "inspection": 86,
     "cleaning": 21,
     "security": 28,
     "delivery": 57,
     "humanoids": 79,
     "physical_ai": 132
    },
    "deals": {
     "construction": 3,
     "facade": 1,
     "inspection": 0,
     "cleaning": 0,
     "security": 0,
     "delivery": 0,
     "humanoids": 3,
     "physical_ai": 25
    }
   },
   "momentum": [
    {
     "category": "construction",
     "volume": 35,
     "deals": 3,
     "avg_prev": 40.0,
     "change_pct": -12
    },
    {
     "category": "facade",
     "volume": 8,
     "deals": 1,
     "avg_prev": 4.0,
     "change_pct": 100
    },
    {
     "category": "inspection",
     "volume": 86,
     "deals": 0,
     "avg_prev": 88.0,
     "change_pct": -2
    },
    {
     "category": "cleaning",
     "volume": 21,
     "deals": 0,
     "avg_prev": 16.0,
     "change_pct": 31
    },
    {
     "category": "security",
     "volume": 28,
     "deals": 0,
     "avg_prev": 25.0,
     "change_pct": 12
    },
    {
     "category": "delivery",
     "volume": 57,
     "deals": 0,
     "avg_prev": 63.0,
     "change_pct": -10
    },
    {
     "category": "humanoids",
     "volume": 79,
     "deals": 3,
     "avg_prev": 67.0,
     "change_pct": 18
    },
    {
     "category": "physical_ai",
     "volume": 132,
     "deals": 25,
     "avg_prev": 124.0,
     "change_pct": 6
    }
   ],
   "generated_by": "claude",
   "headline": "White House calls imported robots a security risk but holds off on tariffs",
   "takeaways": [
    "US robot-trade policy hardened again: a Section 232 finding names foreign-made robots a security risk without tariffs, extending last week's DJI and China-hardware pressure on Aldar's supply base.",
    "Physical AI capital stayed hot, with 25 funding deals versus 22 last week, led by Dream Labs' $90M seed and Foundry's $100M, while humanoid makers moved toward public markets.",
    "The UAE kept building autonomous-mobility rules, with a Ras Al Khaimah testing framework following last week's Abu Dhabi plates, as a delivery-robot crash in Tallinn sharpened safety scrutiny abroad."
   ],
   "trend_watch": [
    {
     "trend": "Physical AI foundation-model funding boom",
     "status": "steady",
     "evidence": "25 Physical AI funding deals (22 last week); Dream Labs $90M seed, Foundry $100M and a UK startup's $40M round."
    },
    {
     "trend": "US–China restrictions on robot and drone hardware",
     "status": "rising",
     "evidence": "White House Section 232 finding on foreign robots, Senator Rick Scott pushing DJI curbs, and Meta reportedly building a humanoid with China's Fourier."
    },
    {
     "trend": "UAE regulation of autonomous vehicles and delivery",
     "status": "rising",
     "evidence": "Ras Al Khaimah launches self-driving framework and test zone; Dubai closes Emirates Road lanes for robotaxi tests."
    },
    {
     "trend": "Public safety and privacy scrutiny of street robots",
     "status": "rising",
     "evidence": "Delivery robot ran a red light in Tallinn injuring bus passengers; Boston Dynamics staff protest $1.3M ICE robot-dog contract."
    },
    {
     "trend": "Humanoids moving into paid commercial service",
     "status": "new",
     "evidence": "Humanoid stories up 18%; Agility expects $465M SPAC raise, YYForce deploys 11 hotel robots, AGIBOT launches productivity metric."
    }
   ],
   "posts": [
    {
     "id": "trumpsaysimportedroboticsposenationalsec",
     "category": "physical_ai",
     "type": "trend",
     "region": "North America",
     "company": "US White House",
     "amount_usd_m": null,
     "headline": "Trump says imported robots pose national security risks but imposes no tariffs",
     "summary": "A Section 232 determination labels imported robotics a national security risk, but the White House stopped short of tariffs for now.",
     "why_it_matters": "Chinese-made fleets like ours face no UAE restriction yet, but US policy may shape vendor pricing, parts supply and partner choices.",
     "source": "Reuters",
     "url": "https://www.reuters.com/world/china/trump-says-imported-robotics-pose-national-security-risks-does-not-impose-2026-10-28/",
     "published": "2026-10-27",
     "coverage": 14,
     "also_covered_by": [
      "Bloomberg",
      "The Next Web",
      "Ars Technica"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "dreamlabsraises90mseedtobuildthebrainfor",
     "category": "physical_ai",
     "type": "investment",
     "region": "Global",
     "company": "Dream Labs",
     "amount_usd_m": 90,
     "headline": "Dream Labs raises $90M seed to build AI brain for everyday robots",
     "summary": "Dream Labs raised a $90M seed round to develop general-purpose robot intelligence, the week's most widely covered funding story with 24 outlets.",
     "why_it_matters": "General robot brains could let one machine handle several building tasks, changing how we procure single-purpose cleaning and service robots.",
     "source": "The National Law Review",
     "url": "https://natlawreview.com/press-releases/dream-labs-raises-90m-seed-build-brain-everyday-robots",
     "published": "2026-10-26",
     "coverage": 24,
     "also_covered_by": [
      "Business Wire",
      "Nasdaq",
      "Tectonic Defense"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "foundryraises100millionforautonomousfact",
     "category": "physical_ai",
     "type": "investment",
     "region": "Global",
     "company": "Foundry",
     "amount_usd_m": 100,
     "headline": "Foundry raises $100M for autonomous factories",
     "summary": "Foundry raised $100M to build autonomous manufacturing facilities.",
     "why_it_matters": "Factory-scale autonomy is a precursor to offsite construction and prefabrication, which could cut build times on our projects.",
     "source": "The Information",
     "url": "https://www.theinformation.com/newsletters/ai-agenda/foundry-raises-100-million-autonomous-factories",
     "published": "2026-10-28",
     "coverage": 3,
     "also_covered_by": [
      "AI Insider",
      "Global Trade Magazine"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "humanoiddeveloperagilitynowexpectstorais",
     "category": "humanoids",
     "type": "investment",
     "region": "North America",
     "company": "Agility Robotics",
     "amount_usd_m": 465,
     "headline": "Agility now expects to raise $465M in humanoid SPAC deal",
     "summary": "Humanoid maker Agility raised its expected SPAC proceeds to $465M, following news that logistics customer GXO plans an expanded Digit deployment.",
     "why_it_matters": "A listed humanoid maker with repeat customers signals humanoids are reaching commercial terms we can benchmark for back-of-house roles.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/humanoid-developer-agility-now-expects-raise-465m-spac-deal/",
     "published": "2026-10-28",
     "coverage": 5,
     "also_covered_by": [
      "DroneLife",
      "AI Insider",
      "Unite.AI"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/10/Agility_Digit_5.jpg"
    },
    {
     "id": "metabuildshumanoidrobotwithchinesestartu",
     "category": "humanoids",
     "type": "trend",
     "region": "China",
     "company": "Meta / Fourier",
     "amount_usd_m": null,
     "headline": "Meta builds humanoid robot prototype with Chinese startup Fourier",
     "summary": "Meta reportedly built a humanoid prototype with China's Fourier, despite US scrutiny of foreign-made robots.",
     "why_it_matters": "Big tech still relies on Chinese hardware, so China-made humanoids are likely to stay the cost leaders for guest-engagement pilots.",
     "source": "Reuters",
     "url": "https://www.reuters.com/world/china/meta-builds-humanoid-robot-with-chinese-startup-fourier-information-says-2026-10-31/",
     "published": "2026-10-31",
     "coverage": 14,
     "also_covered_by": [
      "The Next Web",
      "Investing.com",
      "shattered.io"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "yyforcedeploys11commercialhospitalityrob",
     "category": "humanoids",
     "type": "deployment",
     "region": "Asia-Pacific",
     "company": "YYForce",
     "amount_usd_m": null,
     "headline": "YYForce deploys 11 hospitality robots at Novotel and Mercure Singapore",
     "summary": "YYForce put 11 commercial hospitality robots into service at Novotel and Mercure Singapore on Stevens.",
     "why_it_matters": "A multi-robot hotel rollout offers a reference model for concierge and delivery bots across our hospitality and mall assets.",
     "source": "PR Newswire",
     "url": "https://www.prnewswire.com/news-releases/yyforce-deploys-11-commercial-hospitality-robots-at-novotel--mercure-singapore-on-stevens-302923911.html",
     "published": "2026-10-29",
     "coverage": 9,
     "also_covered_by": [
      "Trend Hunter",
      "Unmanned Systems Technology",
      "StreetInsider"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://mmx.prnewswire.com/media/MS1982800/20260907040718EDT_image_2.jpg?id=OA3047820&p=facebook"
    },
    {
     "id": "agibotintroducesworkentomeasurerobotprod",
     "category": "humanoids",
     "type": "product",
     "region": "China",
     "company": "AGIBOT",
     "amount_usd_m": null,
     "headline": "AGIBOT introduces Worken metric to measure robot productivity",
     "summary": "AGIBOT, described by Forbes as the world's biggest humanoid maker, launched Worken, a unit for measuring robot work output.",
     "why_it_matters": "Standard productivity metrics would help us compare robot vendors against cleaning and service labour contracts on cost per task.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/agibot-introduces-worken-measure-robot-productivity-innovation-day-2026/",
     "published": "2026-10-29",
     "coverage": 2,
     "also_covered_by": [
      "The Manila Times"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/10/Worken_intro.jpg"
    },
    {
     "id": "bostondynamicsemployeesrevoltover13milli",
     "category": "security",
     "type": "deployment",
     "region": "North America",
     "company": "Boston Dynamics",
     "amount_usd_m": 1.3,
     "headline": "Boston Dynamics staff protest $1.3M contract to supply robot dogs to ICE",
     "summary": "Boston Dynamics employees revolted over a $1.3M deal to supply Spot robot dogs to US immigration enforcement, a story covered by 11 outlets.",
     "why_it_matters": "Public perception of patrol robots is fragile; resident-facing deployments need clear use policies and communication.",
     "source": "Gadget Review",
     "url": "https://www.gadgetreview.com/boston-dynamics-employees-revolt-over-1-3-million-contract-to-supply-robot-dogs-to-ice",
     "published": "2026-10-26",
     "coverage": 11,
     "also_covered_by": [
      "Ars Technica",
      "Hankyoreh : English Edition",
      "Cybernews"
     ],
     "portfolio": [
      {
       "vendor": "Analog",
       "via": "oem",
       "oem": "Boston Dynamics",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Quadruped Dog Interior Inspections",
       "model": "Boston Dynamics Spot",
       "site": "Yas Park Gate",
       "site_count": 1
      }
     ],
     "portfolio_note": "Reputational noise around Spot does not affect Analog's Yas Park Gate inspection trial, but any scale-up should frame Spot strictly as an inspection tool.",
     "image": "https://www.gadgetreview.com/wp-content/uploads/robot-dog-3-scaled.jpg"
    },
    {
     "id": "needacreepyrobotdogbostondynamicsisnowle",
     "category": "inspection",
     "type": "product",
     "region": "North America",
     "company": "Boston Dynamics",
     "amount_usd_m": null,
     "headline": "Boston Dynamics begins leasing Spot robot dog",
     "summary": "Boston Dynamics now offers Spot on a lease, lowering the upfront cost of its quadruped.",
     "why_it_matters": "Leasing turns quadruped inspection into an operating cost, making it easier to justify across multiple buildings.",
     "source": "Mashable",
     "url": "https://mashable.com/article/boston-dynamics-spot-launch-trailer",
     "published": "2026-10-29",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Analog",
       "via": "oem",
       "oem": "Boston Dynamics",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Quadruped Dog Interior Inspections",
       "model": "Boston Dynamics Spot",
       "site": "Yas Park Gate",
       "site_count": 1
      }
     ],
     "portfolio_note": "Leasing could make it cheaper for Analog to extend the Yas Park Gate interior-inspection trial into a multi-site service.",
     "image": "https://helios-i.mashable.com/imagery/articles/06XU70DBDP5TxhMKd1FYpSr/hero-image.fill.size_1200x675.v1623386813.jpg"
    },
    {
     "id": "deeproboticsranksno1inglobalindustrialro",
     "category": "inspection",
     "type": "trend",
     "region": "Global",
     "company": "Deep Robotics",
     "amount_usd_m": null,
     "headline": "IDC ranks Deep Robotics No. 1 in industrial robot dogs by revenue",
     "summary": "IDC reports Deep Robotics leads the global industrial robot-dog market by revenue.",
     "why_it_matters": "Market leadership suggests long-term support and spares availability, a key risk for quadruped patrol fleets.",
     "source": "ACCESS Newswire",
     "url": "https://www.accessnewswire.com/newsroom/en/industrial-and-manufacturing/deep-robotics-ranks-no.-1-in-global-industrial-robot-dog-market-by-rev-1244133",
     "published": "2026-10-28",
     "coverage": 2,
     "also_covered_by": [
      "Moomoo"
     ],
     "portfolio": [
      {
       "vendor": "Deep Robotics",
       "via": "vendor",
       "oem": "",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Security Patrolling",
       "model": "X30",
       "site": "ADGM Square",
       "site_count": 1
      }
     ],
     "portfolio_note": "Strengthens the case for Deep Robotics' X30 after its ADGM Square security-patrol trial, as a credible alternative to Boston Dynamics.",
     "image": "https://app.accessnewswire.com/imagelibrary/f5c567a8-e563-41c3-835d-2a92ab2fc5ec/1244133/image.png"
    },
    {
     "id": "puduroboticsopensitseuropeanheadquarters",
     "category": "cleaning",
     "type": "trend",
     "region": "Europe",
     "company": "Pudu Robotics",
     "amount_usd_m": null,
     "headline": "Pudu Robotics opens European headquarters in Neuss, Germany",
     "summary": "Pudu opened a European headquarters in Neuss, Germany, expanding its presence outside China.",
     "why_it_matters": "Global scale from a main cleaning-robot supplier supports pricing and service depth as fleets grow.",
     "source": "The Next Web",
     "url": "https://thenextweb.com/news/pudu-robotics-european-headquarters-neuss-germany",
     "published": "2026-10-29",
     "coverage": 3,
     "also_covered_by": [
      "Retail Technology Innovation Hub",
      "Tech in Asia"
     ],
     "portfolio": [
      {
       "vendor": "Pudu",
       "via": "vendor",
       "oem": "",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Floor Scrubbing and Sweeping",
       "model": "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
       "site": "International Tower",
       "site_count": 25
      }
     ],
     "portfolio_note": "Pudu's growing international footprint supports reliability of the large pending CC1 Pro and MT1 Max rollout across Masdar City, Saadiyat and the schools.",
     "image": "https://media.thenextweb.com/2026/10/pudu-robotics-european-headquarters-building-neuss.jpg"
    },
    {
     "id": "bluechipinfotechsignsuppuduroboticsforau",
     "category": "cleaning",
     "type": "deployment",
     "region": "Asia-Pacific",
     "company": "Pudu Robotics / Bluechip Infotech",
     "amount_usd_m": null,
     "headline": "Bluechip Infotech signs up Pudu Robotics for Australian distribution",
     "summary": "Distributor Bluechip Infotech will sell Pudu robots in Australia.",
     "why_it_matters": "Wider distribution networks indicate maturing commercial cleaning robots and more competitive service models.",
     "source": "ARNnet",
     "url": "https://www.arnnet.com.au/article/4242451/bluechip-infotech-signs-up-pudu-robotics-for-australian-distribution.html",
     "published": "2026-10-30",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Pudu",
       "via": "vendor",
       "oem": "",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Floor Scrubbing and Sweeping",
       "model": "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
       "site": "International Tower",
       "site_count": 25
      }
     ],
     "portfolio_note": "Shows Pudu working through local distributors; worth confirming UAE service and spares capacity before the 20-plus pending sites go live.",
     "image": "https://www.arnnet.com.au/wp-content/uploads/2026/10/4242451-0-26043400-1793319124-Willy-Bluechip.jpg?quality=50&strip=all&w=1024"
    },
    {
     "id": "primechholdingslimitedsubsidiaryprimecha",
     "category": "cleaning",
     "type": "deployment",
     "region": "Asia-Pacific",
     "company": "Primech AI",
     "amount_usd_m": 0.06,
     "headline": "Primech AI wins over US$60,000 HYTRON robot and maintenance contract in Singapore",
     "summary": "Primech AI's subsidiary secured a contract worth over US$60,000 for HYTRON robots and maintenance in Singapore.",
     "why_it_matters": "Bundling robots with maintenance contracts is a useful model for procuring cleaning automation in our facilities.",
     "source": "Quiver Quantitative",
     "url": "https://www.quiverquant.com/news/Primech+Holdings+Limited+Subsidiary+Primech+AI+Secures+Over+US%2460%2C000+HYTRON+Robot+and+Maintenance+Contract+in+Singapore",
     "published": "2026-10-29",
     "coverage": 3,
     "also_covered_by": [
      "StreetInsider",
      "MyChesCo"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.quiverquant.com/images/pmec_rect_new.png"
    },
    {
     "id": "neolixandsunwayannounceautonomousdeliver",
     "category": "delivery",
     "type": "deployment",
     "region": "Asia-Pacific",
     "company": "Neolix / Sunway",
     "amount_usd_m": null,
     "headline": "Neolix and Sunway announce autonomous delivery partnership in Malaysia",
     "summary": "Neolix will run autonomous delivery with Malaysian developer Sunway, part of an overseas push driven by driver shortages.",
     "why_it_matters": "A property developer adopting delivery vans in its townships closely mirrors our community delivery model.",
     "source": "ANTARA News",
     "url": "https://en.antaranews.com/amp/news/439363/neolix-and-sunway-announce-autonomous-delivery-partnership-in-malaysia",
     "published": "2026-11-02",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Cargo X / Noon",
       "via": "oem",
       "oem": "Neolix",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Autonomous Delivery Vans",
       "model": "Neolix X3",
       "site": "Al Raha Gardens",
       "site_count": 3
      }
     ],
     "portfolio_note": "Sunway offers a developer peer case for Neolix X3 vans, useful evidence for the Golf Gardens and Al Merief expansions beyond Al Raha Gardens.",
     "image": "https://cdn.antaranews.com/cache/1200x800/2026/11/02/TXA.jpg"
    },
    {
     "id": "updatedadeliveryrobotrunsaredlightintall",
     "category": "delivery",
     "type": "trend",
     "region": "Europe",
     "company": "Unnamed delivery robot operator",
     "amount_usd_m": null,
     "headline": "Delivery robot runs red light in Tallinn, injuring bus passengers",
     "summary": "A sidewalk delivery robot crossed against a red light in Tallinn, Estonia, causing an incident that injured bus passengers.",
     "why_it_matters": "Incidents like this drive liability and insurance demands; community delivery bots need geofenced routes and clear incident protocols.",
     "source": "Estonian World",
     "url": "https://estonianworld.com/technology/a-delivery-robot-runs-a-red-light-in-tallinn-estonia-injuring-nine-bus-passengers/",
     "published": "2026-10-28",
     "coverage": 2,
     "also_covered_by": [
      "ERR"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://estonianworld.com/wp-content/uploads/2015/11/Starship.jpg"
    },
    {
     "id": "djiwantsitsenterprisedronesbackintheairi",
     "category": "inspection",
     "type": "product",
     "region": "Global",
     "company": "DJI",
     "amount_usd_m": null,
     "headline": "DJI drone dock swaps enterprise drone batteries in 25 seconds",
     "summary": "DJI's new dock automates battery swaps in about 25 seconds, keeping enterprise drones flying with minimal downtime.",
     "why_it_matters": "Fast automated swaps make drone-in-a-box patrols and façade inspections practical without on-site pilots.",
     "source": "DroneDJ",
     "url": "https://dronedj.com/2026/10/30/dji-dock-4-matrice-5td-drone/",
     "published": "2026-10-30",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "Docked DJI drones could let AirTech move Saadiyat Lagoons exterior inspections from piloted trials to scheduled autonomous flights.",
     "image": "https://dronedj.com/wp-content/uploads/sites/2/2026/10/dji-dock-4-matrice-5td-drone.jpg?quality=82&strip=all&resize=1200,628"
    },
    {
     "id": "djiteasesafoldingthermaldronefornovember",
     "category": "inspection",
     "type": "product",
     "region": "Global",
     "company": "DJI",
     "amount_usd_m": null,
     "headline": "DJI teases folding thermal drone with 5TD gimbal for November 5",
     "summary": "DJI will unveil a folding thermal drone on November 5; reports say its native 1280 thermal camera has alarmed a US competitor.",
     "why_it_matters": "Higher-resolution thermal imaging improves detection of leaks and insulation faults on building exteriors.",
     "source": "DroneXL",
     "url": "https://dronexl.co/2026/10/29/dji-enterprise-teaser-foldable-matrice-5-thermal-november-5/",
     "published": "2026-10-30",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "A sharper thermal successor to the M300 H20T could improve AirTech's thermal unit-exterior inspections at Saadiyat Lagoons.",
     "image": "https://cdn.dronexl.co/wp-content/uploads/2026/10/dji-enterprise-teaser-foldable-matrice-5-thermal-gimbal.webp"
    },
    {
     "id": "rickscottdoublesdownondjiandauteldronere",
     "category": "inspection",
     "type": "trend",
     "region": "North America",
     "company": "DJI / Autel",
     "amount_usd_m": null,
     "headline": "Senator Rick Scott doubles down on DJI and Autel curbs as FCC reviews appeals",
     "summary": "US Senator Rick Scott renewed his push to restrict DJI and Autel drones while the FCC weighs their appeals.",
     "why_it_matters": "US actions do not bind the UAE, but could affect DJI firmware, parts and software support over time.",
     "source": "DroneDJ",
     "url": "https://dronedj.com/2026/10/29/rick-scott-dji-drone-fcc/",
     "published": "2026-10-30",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "Watch for knock-on effects on DJI support for AirTech's M300 and Matrice 4E fleet before scaling Saadiyat Lagoons inspections.",
     "image": "https://dronedj.com/wp-content/uploads/sites/2/2025/12/dji-drone-ban-us-security-review-deadline-december-2025.jpg?quality=82&strip=all&resize=1200,628"
    },
    {
     "id": "fccopens50mhzofcellularspectrumfordroneo",
     "category": "inspection",
     "type": "trend",
     "region": "North America",
     "company": "US FCC",
     "amount_usd_m": null,
     "headline": "FCC opens 50 MHz of cellular spectrum for drone operations",
     "summary": "The FCC voted on October 29 to remove a decades-old restriction, opening 50 MHz of licensed 800 MHz cellular spectrum to drones.",
     "why_it_matters": "Licensed cellular links enable reliable beyond-line-of-sight flights, a model UAE regulators could follow for urban inspection.",
     "source": "DroneLife",
     "url": "https://dronelife.com/2026/10/29/fcc-opens-cellular-spectrum-drones-800-mhz/",
     "published": "2026-10-26",
     "coverage": 12,
     "also_covered_by": [
      "Unite.AI",
      "Offshore Engineer Magazine",
      "StreetInsider"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://dronelife.com/wp-content/uploads/2025/01/FCC.png"
    },
    {
     "id": "anyboticsbeginsdeliveringanymalxleggedro",
     "category": "inspection",
     "type": "product",
     "region": "Europe",
     "company": "ANYbotics",
     "amount_usd_m": null,
     "headline": "ANYbotics begins delivering ANYmal X legged robot for explosive atmospheres",
     "summary": "ANYbotics started shipping ANYmal X, a legged inspection robot built to the strictest oil, gas and chemical safety standards.",
     "why_it_matters": "Certified legged robots point to safer inspection of plant rooms, fuel and utility areas in large developments.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/anybotics-begins-delivering-anymal-x-legged-robot-explosive-atmospheres/",
     "published": "2026-10-27",
     "coverage": 9,
     "also_covered_by": [
      "SiliconANGLE",
      "Yahoo Finance",
      "Engineer Live"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/10/ANYmal_X_inspection.jpg"
    },
    {
     "id": "geckoroboticsadvancesinnovativeus300mnav",
     "category": "inspection",
     "type": "deployment",
     "region": "North America",
     "company": "Gecko Robotics",
     "amount_usd_m": 300,
     "headline": "Gecko Robotics advances US$300M naval inspection programme",
     "summary": "Gecko Robotics is advancing a US$300M naval inspection effort using its robotic inspection technology.",
     "why_it_matters": "Large contracts validate robotic structural inspection, which could extend to towers, car parks and bridges in our portfolio.",
     "source": "Inspenet",
     "url": "https://inspenet.com/en/news/gecko-robotics-naval-inspection-emat/",
     "published": "2026-11-01",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "maximoroboticscompletes300000tasksinutil",
     "category": "construction",
     "type": "deployment",
     "region": "Global",
     "company": "Maximo Robotics",
     "amount_usd_m": null,
     "headline": "Maximo Robotics completes 300,000 tasks on utility-scale solar projects",
     "summary": "Maximo's robots have completed 300,000 installation tasks on utility-scale solar construction projects.",
     "why_it_matters": "Repetitive site tasks like panel installation are the first to automate, relevant to solar on our communities and car parks.",
     "source": "Robotics & Automation News",
     "url": "https://roboticsandautomationnews.com/2026/10/30/maximo-robotics-completes-300000-tasks-in-utility-scale-solar-projects/106532/",
     "published": "2026-10-27",
     "coverage": 5,
     "also_covered_by": [
      "Construction Briefing",
      "Morningstar",
      "Unite.AI"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://roboticsandautomationnews.com/wp-content/uploads/2026/10/maximo-robotics-300k-1.png"
    },
    {
     "id": "angmokiototrialailawnmowingrobotstotackl",
     "category": "facade",
     "type": "deployment",
     "region": "Asia-Pacific",
     "company": "Ang Mo Kio Town Council",
     "amount_usd_m": null,
     "headline": "Singapore's Ang Mo Kio to trial AI lawn-mowing robots",
     "summary": "Ang Mo Kio will trial AI lawn-mowing robots to address manpower shortages and improve green-space upkeep.",
     "why_it_matters": "Robotic landscaping is a near-term candidate for our communities' parks and verges, given high outdoor labour costs.",
     "source": "联合早报",
     "url": "https://www.zaobao.com.sg/en/news/singapore/ang-mo-kio-trial-ai-lawn-mowing-robots-tackle-manpower-shortage-and-improve-green-space-maintenance",
     "published": "2026-11-02",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://cassette.sphdigital.com.sg/image/zaobao/99a4878a5b60a8225fa43fa7e5f042f7cd0538619b8f804a46538dcf9c77baa2"
    },
    {
     "id": "sapunveilsphysicalaiandextendstheautonom",
     "category": "physical_ai",
     "type": "product",
     "region": "Global",
     "company": "SAP",
     "amount_usd_m": null,
     "headline": "SAP unveils Physical AI to link enterprise systems with robots",
     "summary": "SAP launched Physical AI to connect ERP workflows with robots, with Intel as a partner.",
     "why_it_matters": "Linking robots to facilities and ERP systems could automate work orders and reporting across mixed robot fleets.",
     "source": "SAP News Center",
     "url": "https://news.sap.com/2026/10/sap-unveils-physical-ai-extends-autonomous-enterprise-real-world-sap-teched/",
     "published": "2026-10-27",
     "coverage": 2,
     "also_covered_by": [
      "Tech Times"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://news.sap.com/wp-content/blogs.dir/1/files/2026/10/26/298451_GettyImages-1362788786_large_uncropped_F-1024x1024.jpg"
    },
    {
     "id": "rasalkhaimahlaunchesselfdrivingmobilityf",
     "category": "delivery",
     "type": "deployment",
     "region": "GCC",
     "company": "Ras Al Khaimah government",
     "amount_usd_m": null,
     "headline": "Ras Al Khaimah launches self-driving mobility framework and testing zone",
     "summary": "Ras Al Khaimah introduced a regulatory framework for self-driving mobility and a dedicated vehicle testing zone.",
     "why_it_matters": "A third emirate formalising AV rules widens the market for autonomous shuttles and delivery in master-planned communities.",
     "source": "The National",
     "url": "https://www.thenationalnews.com/news/uae/2026/10/30/ras-al-khaimah-launches-self-driving-mobility-framework-and-vehicle-testing-zone/",
     "published": "2026-10-30",
     "coverage": 4,
     "also_covered_by": [
      "Gulf News",
      "The Filipino Times",
      "Big News Network.com"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.thenationalnews.com/resizer/v2/GQOTTT52LVFXLHQUBDW5AHWG4M.jpg?auth=a578207fe592fa6a5db159eb0706553ebcf40b36f21dd3bdcc398f363bc4bf88&smart=true&width=1200&height=630"
    },
    {
     "id": "dubaiannounceslaneclosuresonemiratesroad",
     "category": "delivery",
     "type": "trend",
     "region": "GCC",
     "company": "Dubai RTA",
     "amount_usd_m": null,
     "headline": "Dubai closes Emirates Road lanes to clear the way for self-driving taxi tests",
     "summary": "Dubai announced lane closures on Emirates Road to allow testing of self-driving taxis.",
     "why_it_matters": "Robotaxis moving to highway testing means community access, drop-off and parking design should anticipate autonomous fleets.",
     "source": "The National",
     "url": "https://www.thenationalnews.com/news/uae/2026/10/26/dubai-announces-lane-closures-on-emirates-road-from-monday-to-allow-for-self-driving-taxi-tests/",
     "published": "2026-10-26",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.thenationalnews.com/resizer/v2/VSSDYQDNTRB3LJD4E6FADFJW2A.jpg?auth=7606b706fb0b47577b97ade60cb8af5cc778b0ff618ff5aad8d65273a933bfa4&smart=true&width=1200&height=630"
    },
    {
     "id": "cntxtaitoopenroboticsdataandtrainingfaci",
     "category": "physical_ai",
     "type": "trend",
     "region": "GCC",
     "company": "CNTXT AI",
     "amount_usd_m": null,
     "headline": "CNTXT AI to open robotics data and training facilities in the UAE",
     "summary": "CNTXT AI plans robotics data collection and training facilities in the UAE.",
     "why_it_matters": "Local robot-training data could improve robot performance in Gulf conditions such as heat, sand and Arabic signage.",
     "source": "The National",
     "url": "https://www.thenationalnews.com/future/technology/2026/10/30/cntxt-robots-physical-ai-mohammad-abu-sheikh/",
     "published": "2026-10-31",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.thenationalnews.com/resizer/v2/WVFWQFQ3MNBJVBEGUS6JPG6O3I.jpg?auth=5eb161694c0d9a312618d06a801b2b36e1e3def111a8c0e9b6c4805b9aaa61bf&smart=true&width=1200&height=630"
    },
    {
     "id": "galaxycorporationlaunchesarenaforrobotpe",
     "category": "humanoids",
     "type": "product",
     "region": "GCC",
     "company": "Galaxy Corporation",
     "amount_usd_m": null,
     "headline": "Galaxy Corporation launches robot performance arena in UAE",
     "summary": "South Korea's Galaxy Corporation opened an arena for robot performances and entertainment in the UAE.",
     "why_it_matters": "Robot entertainment venues are a possible anchor tenant or attraction concept for malls and destinations.",
     "source": "Korea JoongAng Daily",
     "url": "https://www.koreajoongangdaily.com/business/galaxy-corporation-launches-arena-for-robot-performances-in-uae/12938835",
     "published": "2026-10-26",
     "coverage": 2,
     "also_covered_by": [
      "Yonhap News Agency"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://image.koreajoongangdaily.com/12939030.jpg?imageId=12939030&x=0&y=0&cropw=100&croph=100&panox=0&panoy=0&panow=100&panoh=100&width=1200&height=683"
    },
    {
     "id": "sharjahcivildefenceeyesaiandroboticsatsi",
     "category": "security",
     "type": "trend",
     "region": "GCC",
     "company": "Sharjah Civil Defence",
     "amount_usd_m": null,
     "headline": "Sharjah Civil Defence eyes AI and robotics at Singapore expo",
     "summary": "Sharjah Civil Defence is exploring AI and robotics technologies at an exhibition in Singapore.",
     "why_it_matters": "Civil defence adoption of robots may shape future fire-safety and emergency requirements for UAE buildings.",
     "source": "Gulf News",
     "url": "https://gulfnews.com/uae/sharjah/sharjah-civil-defence-eyes-ai-and-robotics-at-singapore-expo-1.500727632",
     "published": "2026-10-29",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://media.assettype.com/gulfnews%2F2026-10-28%2Freebmz82%2FSharjah-Civil-Defence-delegation-explores-emergency-technologies-at-SIDEX-2026-in-Singapore.?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100"
    },
    {
     "id": "10universityteamstocompeteinemiratesrobo",
     "category": "physical_ai",
     "type": "trend",
     "region": "GCC",
     "company": "Dubai Future Foundation",
     "amount_usd_m": null,
     "headline": "10 university teams reach Emirates Robotic Competition finals at Dubai Future Week",
     "summary": "Ten university teams will compete in the Emirates Robotic Competition finals during the first Dubai Future Week 2026.",
     "why_it_matters": "A growing local robotics talent pool will help staff operations and maintenance of our robot fleets.",
     "source": "Zawya",
     "url": "https://www.zawya.com/en/press-release/events-conferences/10-university-teams-to-compete-in-emirates-robotic-competition-finals-during-the-inaugural-dubai-future-week-2026-1854412",
     "published": "2026-10-27",
     "coverage": 4,
     "also_covered_by": [
      "Business Wire",
      "www.wam.ae",
      "news.sbs.co.kr"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://media.zawya.com/prod/images/gm_preview/259a1d36e875-dfw26-emirates-robotics-challenge-infographic.jpg"
    }
   ],
   "vendor_watch": [
    {
     "vendor": "Analog",
     "oem": "Boston Dynamics",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Quadruped Dog Interior Inspections"
     ],
     "models": [
      "Boston Dynamics Spot"
     ],
     "sites": [
      "Yas Park Gate"
     ],
     "mentions": 10,
     "post_ids": [
      "bostondynamicsemployeesrevoltover13milli",
      "needacreepyrobotdogbostondynamicsisnowle"
     ],
     "signal": "mixed",
     "note": "Spot leasing lowers costs, but the ICE contract protest adds reputational risk to robot-dog deployments.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "AirTech",
     "oem": "DJI",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Drone Inspections for Unit Exterior"
     ],
     "models": [
      "Thermal: M300 H20T · General capture: Matrice 4E"
     ],
     "sites": [
      "Saadiyat Lagoons"
     ],
     "mentions": 7,
     "post_ids": [
      "djiwantsitsenterprisedronesbackintheairi",
      "djiteasesafoldingthermaldronefornovember",
      "rickscottdoublesdownondjiandauteldronere"
     ],
     "signal": "mixed",
     "note": "New DJI dock and thermal drone help inspections, but US pressure on DJI is a longer-term support risk.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Pudu",
     "oem": "",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Concierge Service",
      "Customer Management Delivery Bot",
      "Floor Scrubbing and Sweeping"
     ],
     "models": [
      "1× CC1 Pro, 1× MT1 Max",
      "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
      "1× CC1 Pro, 3× MT1 Max",
      "2× CC1 Pro",
      "2× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
      "33× CC1 Pro",
      "3× CC1 Pro",
      "3× CC1 Pro, 1× MT1 Max",
      "4× CC1 Pro, 1× MT1 Max",
      "4× CC1 Pro, 2× MT1 Max, 2× BG1 Pro",
      "6× CC1 Pro",
      "6× CC1 Pro, 3× MT1 Max, 2× BG1 Pro",
      "Bellabot Pro"
     ],
     "sites": [
      "International Tower",
      "ADGM Square",
      "Aldar HQ",
      "Al Maryah Tower",
      "Yas Place",
      "Aldar Square",
      "Aldar Estates Office · Yas Mall",
      "Masdar City",
      "Al Rayanna",
      "The Bridges",
      "Mamsha Al Saadiyat",
      "Gate & Arc Towers",
      "Al Zeina",
      "Sun & Sky Tower",
      "Saadiyat Grove",
      "Saadiyat Beach Residences",
      "Al Muneera",
      "Waters Edge",
      "Yas Golf Collection",
      "West Yas Plaza",
      "Noya Plaza",
      "Shams Boutik",
      "Eastern Mangroves",
      "Muneera Retail (Al Muneera Beach Plaza)",
      "Gardens Plaza"
     ],
     "mentions": 6,
     "post_ids": [
      "puduroboticsopensitseuropeanheadquarters",
      "bluechipinfotechsignsuppuduroboticsforau"
     ],
     "signal": "positive",
     "note": "European HQ and Australian distribution deal show Pudu scaling globally, supporting service depth for our large pending rollout.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Cargo X / Noon",
     "oem": "Neolix",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Autonomous Delivery Vans",
      "Autonomous Delivery Vans (Al Merief expansion)",
      "Autonomous Delivery Vans (Golf Gardens expansion)"
     ],
     "models": [
      "Neolix X3"
     ],
     "sites": [
      "Al Raha Gardens",
      "Golf Gardens",
      "Al Merief"
     ],
     "mentions": 2,
     "post_ids": [
      "neolixandsunwayannounceautonomousdeliver"
     ],
     "signal": "positive",
     "note": "Maker Neolix signs a developer partnership in Malaysia, strengthening its overseas track record for our community expansions.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Deep Robotics",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Security Patrolling"
     ],
     "models": [
      "X30"
     ],
     "sites": [
      "ADGM Square"
     ],
     "mentions": 1,
     "post_ids": [
      "deeproboticsranksno1inglobalindustrialro"
     ],
     "signal": "positive",
     "note": "IDC ranks Deep Robotics No. 1 in industrial robot dogs by revenue, supporting the X30 patrol case at ADGM Square.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "BarqAir",
     "oem": "",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Drone Façade Cleaning"
     ],
     "models": [
      "Cleaning Drone"
     ],
     "sites": [
      "Yas Place"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "SINDAN",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Floor Scrubbing and Sweeping",
      "Humanoid Guest Engagement",
      "Security Patrolling (2)"
     ],
     "models": [
      "D1 Max",
      "MK-02 Humanoid",
      "NOVA-02 and NOVA-05"
     ],
     "sites": [
      "Yas Mall",
      "ADGM Square",
      "Livex · ADNEC"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Thub Technologies",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Crawler Façade Cleaning (2)",
      "Façade Cleaning"
     ],
     "models": [
      "TowerCraft"
     ],
     "sites": [
      "Yas Place",
      "World Trade Center Abu Dhabi"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "X-Human",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Crawler Façade Cleaning"
     ],
     "models": [
      "Lingkong K3"
     ],
     "sites": [
      "Yas Place"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "AD Robotics",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Community Delivery Bot",
      "Security Patrolling"
     ],
     "models": [
      "ADR Delivery Bot",
      "ADR Quadruped"
     ],
     "sites": [
      "Noya Luma",
      "Ansam"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Falcon Tech Robotics",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Interactive Visitor Engagement"
     ],
     "models": [
      "KODY"
     ],
     "sites": [
      "The Galleria"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Pudu + other",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Floor Scrubbing and Sweeping"
     ],
     "models": [
      "2× CC1 Pro, 1× MT1 Max, 1× External Sweeper",
      "3× CC1 Pro, 1× MT1 Max, 1× External Sweeper",
      "3× MT1 Max, 1× BG1 Pro, 1× External Sweeper"
     ],
     "sites": [
      "Pearl British Academy",
      "Muna British Academy",
      "Bateen World Academy",
      "Al Ain British Academy",
      "Yasmina British Academy",
      "Mamoura British Academy",
      "Cranleigh Abu Dhabi",
      "Noya British School",
      "Yasmina American School",
      "Eastern Mangroves"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Solinas",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Hidden Cavity Inspection"
     ],
     "models": [
      "Endobot 90 and Endobot 250"
     ],
     "sites": [
      "Saadiyat Grove"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Subdivo",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Façade Cleaning"
     ],
     "models": [],
     "sites": [
      "International Tower"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    }
   ],
   "viral": [
    {
     "platform": "Instagram",
     "date": "2026-10-26",
     "title": "Man pushes humanoid robot and it 'kicks back'",
     "category": "humanoids",
     "views_reported": "Not verified",
     "views_source": "Amar Ujala says only that it is spreading fast; no figure",
     "what_shows": "A young man lightly pushes a humanoid robot, which responds with kicks and defensive moves. Clip credited to Instagram account @geroooo_arias2.0.",
     "what_behind": "Robot model, operator and remote control are unknown. A very similar Russian store CCTV clip went viral about two months earlier; this may be the same clip recirculating, unconfirmed.",
     "checks": {
      "real": "unknown",
      "autonomous": "unknown",
      "corroborated": "no",
      "deployed": "unknown",
      "gcc": "unknown"
     },
     "verdict": "hype",
     "fit": "Low",
     "portfolio_match": "SINDAN MK-02 humanoid (Livex · ADNEC, pending); Falcon Tech KODY (The Galleria, pending)",
     "action": "Ignore",
     "leadership_line": "It's an unverified social clip of unknown origin; it tells us nothing about any robot we're evaluating.",
     "assessed_from": "News articles (Amar Ujala, Yahoo Tech); video not watched",
     "video_url": "",
     "corroboration": [
      {
       "label": "Amar Ujala, 26 Oct 2026",
       "url": "https://www.amarujala.com/bizarre-news/viral-video-man-pushes-robot-its-next-move-leaves-everyone-stunned-2026-10-26"
      },
      {
       "label": "Yahoo Tech, earlier similar clip",
       "url": "https://tech.yahoo.com/science/articles/humanoid-robot-fights-back-man-181750661.html"
      }
     ]
    },
    {
     "platform": "X",
     "date": "2026-10-28",
     "title": "Robert Scoble's 'Robot University' claims about Tesla Optimus",
     "category": "humanoids",
     "views_reported": "Not verified",
     "views_source": "No reach figure found",
     "what_shows": "Text post, not video: Tesla staff in Palo Alto wear ~24 lb suits with up to 40 cameras, working three shifts, recording human demonstrations to train Optimus.",
     "what_behind": "Source unnamed. Tesla job listings confirm motion-capture data-collection roles in Austin and Fremont, not suit details or Palo Alto schedule. Tesla reportedly plans Optimus reservations in early December; delivery terms unclear.",
     "checks": {
      "real": "no",
      "autonomous": "no",
      "corroborated": "no",
      "deployed": "no",
      "gcc": "unknown"
     },
     "verdict": "watch",
     "fit": "Low",
     "portfolio_match": "None directly; nearest is SINDAN MK-02 humanoid",
     "action": "Watch",
     "leadership_line": "It shows Tesla is still teaching Optimus by recording people; it's not a product we can buy or deploy.",
     "assessed_from": "Humanoids Daily reports (30 Oct 2026)",
     "video_url": "",
     "corroboration": [
      {
       "label": "Humanoids Daily: Scoble data collection",
       "url": "https://www.humanoidsdaily.com/news/tesla-optimus-data-collection-scoble-robot-university"
      }
     ]
    },
    {
     "platform": "X",
     "date": "2026-10-23",
     "title": "Unitree H2-X 'Kung Fu Legend Guardian' promo (challenger update)",
     "category": "humanoids",
     "views_reported": "Not verified",
     "views_source": "No reach figure found",
     "what_shows": "Martial arts, punching and flipping a car, a jump from a 4 m platform, and rehearsed protection and rescue scenes. Reported just before this week.",
     "what_behind": "Unitree's own promo. Unknown whether autonomous, remote-controlled or pre-programmed. The '8 hours endurance' is standing time. Video tells viewers to stay 2–3 m away.",
     "checks": {
      "real": "unknown",
      "autonomous": "unknown",
      "corroborated": "no",
      "deployed": "no",
      "gcc": "unknown"
     },
     "verdict": "hype",
     "fit": "Low",
     "portfolio_match": "Security patrolling (Deep Robotics X30, SINDAN, AD Robotics quadruped)",
     "action": "Ignore",
     "leadership_line": "It's a choreographed marketing video; there's no evidence it can do security work unsupervised.",
     "assessed_from": "Asianet Newsable article citing SCMP",
     "video_url": "",
     "corroboration": [
      {
       "label": "Asianet Newsable, 23 Oct 2026",
       "url": "https://newsable.asianetnews.com/world/unitree-h2-x-humanoid-robot-can-do-kung-fu-flip-in-the-air-and-lift-a-car-watch-viral-video-articleshow-51y9e2l"
      }
     ]
    }
   ],
   "challengers": [
    {
     "name": "Bedrock Robotics",
     "category": "construction",
     "what": "Autonomous excavators; $600M Series C at $4.1B valuation; driverless paid work on a live site in August.",
     "scores": {
      "funding": 4,
      "deployments": 1,
      "scale": 2,
      "partners": 3,
      "gcc": 0
     },
     "why": "We have no construction vendor; best-funded autonomous earthmoving option for our development sites.",
     "source": {
      "label": "Wowtale, 27 Oct 2026",
      "url": "https://en.wowtale.net/2026/10/27/235730/"
     },
     "total": 10,
     "verdict": "watch"
    },
    {
     "name": "Origin",
     "category": "construction",
     "what": "OG-1 robot finishes interior drywall; $20M from Accel and Zacua; pilots in US, Europe and Saudi Arabia.",
     "scores": {
      "funding": 2,
      "deployments": 1,
      "scale": 1,
      "partners": 2,
      "gcc": 2
     },
     "why": "Opens interior finishing on our sites; Saudi pilot is a real GCC route. Vendor press release.",
     "source": {
      "label": "Robotics & Automation News, 19 Oct 2026",
      "url": "https://roboticsandautomationnews.com/2026/10/19/origin-raises-20-million-to-scale-general-purpose-construction-robots/106024/"
     },
     "total": 8,
     "verdict": "watch"
    },
    {
     "name": "Hyundai AutoEver (MobED patrol)",
     "category": "security",
     "what": "Scheduled patrol robot on Hyundai/Kia MobED platform, streaming live video on anomalies; full-package offer, no customers.",
     "scores": {
      "funding": 3,
      "deployments": 0,
      "scale": 0,
      "partners": 3,
      "gcc": 0
     },
     "why": "Big-industrial alternative to Deep Robotics, SINDAN and AD Robotics for ADGM Square and Noya Luma patrols.",
     "source": {
      "label": "Seoul Economic Daily, 22 Oct 2026",
      "url": "https://en.sedaily.com/technology/2026/10/22/hyundai-autoever-unveils-ai-linked-patrol-robot-security"
     },
     "total": 6,
     "verdict": "ignore"
    },
    {
     "name": "Jingji Intelligent",
     "category": "cleaning",
     "what": "Shanghai seed-stage startup cleaning vertical surfaces, countertops and sanitary fixtures; product still in validation.",
     "scores": {
      "funding": 1,
      "deployments": 0,
      "scale": 0,
      "partners": 1,
      "gcc": 0
     },
     "why": "Early sign of cleaning beyond floors, next to our Pudu rollout; too early to act.",
     "source": {
      "label": "TechNode, 21 Oct 2026",
      "url": "https://technode.com/2026/10/21/cleaning-robotics-startup-jingji-intelligent-raises-tens-of-millions-of-rmb-in-seed-funding/"
     },
     "total": 2,
     "verdict": "ignore"
    }
   ],
   "matrix": [
    {
     "category": "construction",
     "readiness": 35,
     "relevance": 75,
     "hype": 60,
     "substance": 45,
     "reason": "Large rounds, some paid site work, few customers; no vendor yet."
    },
    {
     "category": "facade",
     "readiness": 40,
     "relevance": 85,
     "hype": 25,
     "substance": 40,
     "reason": "Five portfolio vendors; little independent evidence."
    },
    {
     "category": "inspection",
     "readiness": 75,
     "relevance": 70,
     "hype": 45,
     "substance": 75,
     "reason": "Real deployments; US pressure on DJI is supply risk."
    },
    {
     "category": "cleaning",
     "readiness": 80,
     "relevance": 95,
     "hype": 30,
     "substance": 80,
     "reason": "Our most-deployed category; Pudu expanding; entrants moving beyond floors."
    },
    {
     "category": "security",
     "readiness": 45,
     "relevance": 70,
     "hype": 55,
     "substance": 45,
     "reason": "Korea police plan despite pilot breakdowns; reputational risk."
    },
    {
     "category": "delivery",
     "readiness": 60,
     "relevance": 80,
     "hype": 55,
     "substance": 60,
     "reason": "Neolix expanding; UAE rules moving; Tallinn crash safety reminder."
    },
    {
     "category": "humanoids",
     "readiness": 15,
     "relevance": 35,
     "hype": 95,
     "substance": 30,
     "reason": "Big headlines; one concrete hotel deployment; viral clips unverified."
    },
    {
     "category": "physical_ai",
     "readiness": 25,
     "relevance": 40,
     "hype": 85,
     "substance": 40,
     "reason": "Heavy funding, few deployed results."
    }
   ],
   "research_meta": {
    "searches": 15,
    "sources": 132
   }
  },
  {
   "id": "2026-W44",
   "label": "Week 44 · 30 Oct 2026",
   "published_at": "2026-10-30T11:09+04:00",
   "period": {
    "from": "2026-10-23",
    "to": "2026-10-30"
   },
   "stories_scanned": 736,
   "distinct_events": 427,
   "signals": {
    "volume": {
     "construction": 40,
     "facade": 4,
     "inspection": 88,
     "cleaning": 16,
     "security": 25,
     "delivery": 63,
     "humanoids": 67,
     "physical_ai": 124
    },
    "deals": {
     "construction": 3,
     "facade": 0,
     "inspection": 1,
     "cleaning": 0,
     "security": 0,
     "delivery": 0,
     "humanoids": 2,
     "physical_ai": 22
    }
   },
   "momentum": [
    {
     "category": "construction",
     "volume": 40,
     "deals": 3,
     "avg_prev": null,
     "change_pct": null
    },
    {
     "category": "facade",
     "volume": 4,
     "deals": 0,
     "avg_prev": null,
     "change_pct": null
    },
    {
     "category": "inspection",
     "volume": 88,
     "deals": 1,
     "avg_prev": null,
     "change_pct": null
    },
    {
     "category": "cleaning",
     "volume": 16,
     "deals": 0,
     "avg_prev": null,
     "change_pct": null
    },
    {
     "category": "security",
     "volume": 25,
     "deals": 0,
     "avg_prev": null,
     "change_pct": null
    },
    {
     "category": "delivery",
     "volume": 63,
     "deals": 0,
     "avg_prev": null,
     "change_pct": null
    },
    {
     "category": "humanoids",
     "volume": 67,
     "deals": 2,
     "avg_prev": null,
     "change_pct": null
    },
    {
     "category": "physical_ai",
     "volume": 124,
     "deals": 22,
     "avg_prev": null,
     "change_pct": null
    }
   ],
   "generated_by": "claude",
   "headline": "Physical AI money surges: Bedrock at $4.1B, Physical Intelligence eyes $20B",
   "takeaways": [
    "Capital is concentrating in robot 'brains' and autonomy, with Physical AI logging 22 funding deals, far more than any other category; this is our baseline for future weeks.",
    "Geopolitics is becoming a hardware risk: US moves on DJI, foreign-made robots and a Boston Dynamics controversy touch vendors Aldar relies on, though not UAE rules directly.",
    "The UAE is formalising autonomous mobility with Abu Dhabi AV number plates and Dubai robotaxi road tests, while delivery robots abroad face safety and privacy backlash."
   ],
   "trend_watch": [
    {
     "trend": "Physical AI foundation-model funding boom",
     "status": "new",
     "evidence": "124 stories and 22 deals; Dream Labs $90M seed, Eka $150M, Foundry $100M, Physical Intelligence in talks at $20B valuation."
    },
    {
     "trend": "US–China restrictions on robot and drone hardware",
     "status": "new",
     "evidence": "Section 232 determination on foreign-made robots, renewed DJI/Autel restriction push, and a study on US curbs hitting humanoid revenue."
    },
    {
     "trend": "UAE regulation of autonomous vehicles and delivery",
     "status": "new",
     "evidence": "Abu Dhabi introduces dedicated AV number plates; Dubai closes Emirates Road lanes for self-driving taxi tests."
    },
    {
     "trend": "Public safety and privacy scrutiny of street robots",
     "status": "new",
     "evidence": "Tallinn delivery robot injures nine bus passengers; lawsuit alleges delivery robots scan faces; Zipline cuts drone noise."
    },
    {
     "trend": "Autonomy reaching construction sites",
     "status": "new",
     "evidence": "40 construction stories, 3 deals; Bedrock at $4.1B valuation, D.R. Horton robotics tie-up, NIOSH flags new site safety risks."
    }
   ],
   "posts": [
    {
     "id": "autonomousconstructionfirmbedrockhits41b",
     "category": "construction",
     "type": "investment",
     "region": "Global",
     "company": "Bedrock Robotics",
     "amount_usd_m": null,
     "headline": "Autonomous construction firm Bedrock hits $4.1 billion valuation",
     "summary": "Bedrock, which retrofits construction equipment for autonomous operation, reached a $4.1 billion valuation, a story carried by 24 outlets.",
     "why_it_matters": "Autonomous earthmoving is attracting serious capital; developers should expect contractor offers for robotic site work within a few years.",
     "source": "Bloomberg",
     "url": "https://www.bloomberg.com/news/articles/2026-10-26/autonomous-construction-firm-bedrock-hits-4-1-billion-valuation",
     "published": "2026-10-26",
     "coverage": 24,
     "also_covered_by": [
      "TechCrunch",
      "The Robot Report",
      "SiliconANGLE"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "roboticslabphysicalintelligenceintalksfo",
     "category": "physical_ai",
     "type": "investment",
     "region": "Global",
     "company": "Physical Intelligence",
     "amount_usd_m": null,
     "headline": "Physical Intelligence in talks for a $20 billion valuation",
     "summary": "Robotics lab Physical Intelligence, which builds general-purpose AI models for robots, is in talks to raise at a $20 billion valuation.",
     "why_it_matters": "General robot brains could let one machine handle multiple facility tasks, changing how operators buy single-purpose robots.",
     "source": "Bloomberg.com",
     "url": "https://www.bloomberg.com/news/articles/2026-10-27/robotics-lab-physical-intelligence-in-talks-for-a-20-billion-valuation",
     "published": "2026-10-27",
     "coverage": 10,
     "also_covered_by": [
      "NewsCord",
      "digitimes",
      "BigGo Finance"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "ekaroboticsraises150mtoscaleitsvisionfor",
     "category": "physical_ai",
     "type": "investment",
     "region": "Global",
     "company": "Eka Robotics",
     "amount_usd_m": 150,
     "headline": "Eka Robotics raises $150M for its vision-force-action robot model",
     "summary": "Eka Robotics raised $150 million to scale a vision-force-action model aimed at giving robots more dexterous, touch-aware control.",
     "why_it_matters": "Force-aware manipulation is what robots need for maintenance chores like handling doors, fixtures and equipment in buildings.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/eka-robotics-raises-150m-scale-vision-force-action-model-robots/",
     "published": "2026-10-24",
     "coverage": 2,
     "also_covered_by": [
      "AI Magazine"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/10/ekarobotics-featured.jpg"
    },
    {
     "id": "foundryraises100millionforautonomousfact",
     "category": "physical_ai",
     "type": "investment",
     "region": "Global",
     "company": "Foundry",
     "amount_usd_m": 100,
     "headline": "Foundry raises $100 million for autonomous factories",
     "summary": "Foundry raised $100 million to build autonomous factories, one of 22 Physical AI funding deals this week.",
     "why_it_matters": "Automated factories could cut cost of prefabricated building components, relevant to developers using offsite construction.",
     "source": "The Information",
     "url": "https://www.theinformation.com/newsletters/ai-agenda/foundry-raises-100-million-autonomous-factories",
     "published": "2026-10-23",
     "coverage": 10,
     "also_covered_by": [
      "Global Trade Magazine",
      "AI Insider",
      "Tectonic Defense"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "dreamlabsraises90mseedtobuildthebrainfor",
     "category": "physical_ai",
     "type": "investment",
     "region": "Global",
     "company": "Dream Labs",
     "amount_usd_m": 90,
     "headline": "Dream Labs raises $90M seed to build AI brain for everyday robots",
     "summary": "Dream Labs closed a $90 million seed round, covered by 24 outlets, to develop software intelligence for everyday robots.",
     "why_it_matters": "Very large seed rounds signal investors expect robots in everyday spaces like homes, malls and offices, not only factories.",
     "source": "The National Law Review",
     "url": "https://natlawreview.com/press-releases/dream-labs-raises-90m-seed-build-brain-everyday-robots",
     "published": "2026-10-23",
     "coverage": 24,
     "also_covered_by": [
      "AiThority",
      "Post Register",
      "01net"
     ],
     "portfolio": [],
     "portfolio_note": ""
    },
    {
     "id": "agilityandgxologisticsplanexpandeddeploy",
     "category": "humanoids",
     "type": "deployment",
     "region": "Global",
     "company": "Agility Robotics / GXO",
     "amount_usd_m": null,
     "headline": "Agility and GXO plan expanded deployment of Digit humanoid",
     "summary": "GXO Logistics, Agility's first humanoid customer, plans to expand its use of the Digit robot in logistics operations.",
     "why_it_matters": "Repeat orders are the first proof humanoids pay back; useful benchmark before committing to humanoid pilots in malls or venues.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/agility-gxo-logistics-plan-expanded-deployment-digit-humanoid/",
     "published": "2026-10-26",
     "coverage": 12,
     "also_covered_by": [
      "Assembly Magazine",
      "Container News",
      "Investing.com"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/10/GXO_Agility_Digit_02.jpg"
    },
    {
     "id": "anyboticsbeginsdeliveringanymalxleggedro",
     "category": "inspection",
     "type": "product",
     "region": "Global",
     "company": "ANYbotics",
     "amount_usd_m": null,
     "headline": "ANYbotics begins delivering ANYmal X legged robot for explosive atmospheres",
     "summary": "ANYbotics started deliveries of ANYmal X, a legged inspection robot certified for explosive atmospheres, covered by 13 outlets.",
     "why_it_matters": "Certified quadrupeds widen options for inspecting plant rooms, fuel and gas areas in large mixed-use assets.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/anybotics-begins-delivering-anymal-x-legged-robot-explosive-atmospheres/",
     "published": "2026-10-27",
     "coverage": 13,
     "also_covered_by": [
      "SiliconANGLE",
      "Marine News Magazine",
      "TradeArabia"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/10/ANYmal_X_inspection.jpg"
    },
    {
     "id": "whitehousemakessection232determinationre",
     "category": "security",
     "type": "trend",
     "region": "North America",
     "company": "White House",
     "amount_usd_m": null,
     "headline": "White House makes Section 232 determination on foreign-made robots",
     "summary": "The US administration issued a Section 232 national-security determination covering foreign-made robots, a step that can lead to tariffs or restrictions.",
     "why_it_matters": "US trade actions can reshape global pricing and supply for Chinese robots that dominate cleaning and service fleets.",
     "source": "The Robot Report",
     "url": "https://www.therobotreport.com/white-house-makes-section-232-determination-regarding-foreign-made-robots/",
     "published": "2026-10-29",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.therobotreport.com/wp-content/uploads/2026/10/Section_232_proclamation.jpg"
    },
    {
     "id": "rickscottdoublesdownondjiandauteldronere",
     "category": "inspection",
     "type": "trend",
     "region": "North America",
     "company": "DJI",
     "amount_usd_m": null,
     "headline": "Senator Rick Scott doubles down on DJI and Autel drone restrictions",
     "summary": "US Senator Rick Scott pressed for restrictions on DJI and Autel drones while the FCC reviews the companies' appeals.",
     "why_it_matters": "US action against DJI could ripple into parts, software support and pricing for DJI fleets used worldwide.",
     "source": "DroneDJ",
     "url": "https://dronedj.com/2026/10/29/rick-scott-dji-drone-fcc/",
     "published": "2026-10-29",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "US rules do not bind UAE operations, but AirTech's DJI-based inspections at Saadiyat Lagoons should be watched for spare-parts or firmware support disruption.",
     "image": "https://dronedj.com/wp-content/uploads/sites/2/2025/12/dji-drone-ban-us-security-review-deadline-december-2025.jpg?quality=82&strip=all&resize=1200,628"
    },
    {
     "id": "djimatrice5tdsnative1280thermalhasausdro",
     "category": "inspection",
     "type": "product",
     "region": "Global",
     "company": "DJI",
     "amount_usd_m": null,
     "headline": "DJI Matrice 5TD's native 1280 thermal camera alarms a US drone maker",
     "summary": "DJI's upcoming Matrice 5TD carries a native 1280-resolution thermal sensor, a capability a US rival called alarming.",
     "why_it_matters": "Higher-resolution thermal imaging improves detection of façade leaks, insulation gaps and roof defects from a single drone pass.",
     "source": "DroneXL",
     "url": "https://dronexl.co/2026/10/26/dji-matrice-5td-native-1280-thermal-us-drone-maker-alarm/",
     "published": "2026-10-26",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "AirTech",
       "via": "oem",
       "oem": "DJI",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Drone Inspections for Unit Exterior",
       "model": "Thermal: M300 H20T · General capture: Matrice 4E",
       "site": "Saadiyat Lagoons",
       "site_count": 1
      }
     ],
     "portfolio_note": "Could upgrade AirTech's thermal exterior inspections at Saadiyat Lagoons, currently flown on the older M300 H20T.",
     "image": "https://cdn.dronexl.co/wp-content/uploads/2026/10/dji-matrice-4td-thermal-drone-solar-farm.webp"
    },
    {
     "id": "bostondynamicsworkerspetitionagainsticed",
     "category": "inspection",
     "type": "trend",
     "region": "North America",
     "company": "Boston Dynamics",
     "amount_usd_m": null,
     "headline": "Boston Dynamics workers petition against ICE deal for Spot robots",
     "summary": "Boston Dynamics employees petitioned against a deal supplying Spot robots to US immigration enforcement, a story covered by 21 outlets.",
     "why_it_matters": "Robot dogs carry surveillance optics; operators should frame quadruped use publicly as inspection, not policing.",
     "source": "Startup Fortune",
     "url": "https://startupfortune.com/boston-dynamics-workers-petition-against-ice-deal-for-spot-robots/",
     "published": "2026-10-23",
     "coverage": 21,
     "also_covered_by": [
      "TOKENPOST",
      "Tech Times",
      "Yahoo! Finance Canada"
     ],
     "portfolio": [
      {
       "vendor": "Analog",
       "via": "oem",
       "oem": "Boston Dynamics",
       "status": "pilot",
       "status_label": "Trialled",
       "use_case": "Quadruped Dog Interior Inspections",
       "model": "Boston Dynamics Spot",
       "site": "Yas Park Gate",
       "site_count": 1
      }
     ],
     "portfolio_note": "No operational impact on Analog's Spot interior inspection trial at Yas Park Gate, but position any scale-up clearly as building inspection to avoid reputational spillover.",
     "image": "https://startupfortune.com/wp-content/uploads/2026/10/ice-hyundai-rotem-boston-dynamics.jpg"
    },
    {
     "id": "puduroboticsopensdoorstoeuropeanhqingerm",
     "category": "cleaning",
     "type": "trend",
     "region": "Europe",
     "company": "Pudu Robotics",
     "amount_usd_m": null,
     "headline": "Pudu Robotics opens European headquarters in Germany",
     "summary": "Pudu opened a European HQ in Germany, citing retail customers including Albert Heijn and Carrefour.",
     "why_it_matters": "Major retailers adopting robot cleaners validates the model for malls and large retail floors.",
     "source": "Retail Technology Innovation Hub",
     "url": "https://retailtechinnovationhub.com/home/2026/10/30/pudu-robotics-opens-doors-to-european-hq-in-germany-as-customers-include-albert-heijn-and-carrefour",
     "published": "2026-10-29",
     "coverage": 3,
     "also_covered_by": [
      "Tech in Asia",
      "SecNews.gr"
     ],
     "portfolio": [
      {
       "vendor": "Pudu",
       "via": "vendor",
       "oem": "",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Floor Scrubbing and Sweeping",
       "model": "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
       "site": "International Tower",
       "site_count": 25
      }
     ],
     "portfolio_note": "Signals Pudu's scale and support capacity as Aldar rolls CC1 Pro and MT1 Max units to 19 pending sites, from Aldar Square to Gardens Plaza.",
     "image": "https://storage.googleapis.com/rtih-storage/31953/Pudu-Robotics'-New-European-HQ-in-Germany.png"
    },
    {
     "id": "bluechipinfotechsignsuppuduroboticsforau",
     "category": "cleaning",
     "type": "deployment",
     "region": "Asia-Pacific",
     "company": "Pudu Robotics / Bluechip Infotech",
     "amount_usd_m": null,
     "headline": "Bluechip Infotech signs Pudu Robotics for Australian distribution",
     "summary": "Australian distributor Bluechip Infotech added Pudu's robots to its portfolio, expanding the vendor's channel in Asia-Pacific.",
     "why_it_matters": "Wider distribution networks suggest maturing service and parts ecosystems for commercial cleaning robots.",
     "source": "ARNnet",
     "url": "https://www.arnnet.com.au/article/4242451/bluechip-infotech-signs-up-pudu-robotics-for-australian-distribution.html",
     "published": "2026-10-30",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Pudu",
       "via": "vendor",
       "oem": "",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Floor Scrubbing and Sweeping",
       "model": "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
       "site": "International Tower",
       "site_count": 25
      }
     ],
     "portfolio_note": "Further evidence of Pudu's commercial momentum, supporting confidence in the school rollouts with Pudu + other partners across Aldar Education sites.",
     "image": "https://www.arnnet.com.au/wp-content/uploads/2026/10/4242451-0-26043400-1793319124-Willy-Bluechip.jpg?quality=50&strip=all&w=1024"
    },
    {
     "id": "drivershortagesshapeneolixsautonomouspus",
     "category": "delivery",
     "type": "trend",
     "region": "Global",
     "company": "Neolix",
     "amount_usd_m": null,
     "headline": "Driver shortages drive Neolix's autonomous delivery push overseas",
     "summary": "Neolix is expanding its autonomous delivery vans into overseas markets, positioning them as an answer to driver shortages.",
     "why_it_matters": "Driverless last-mile vans can serve gated communities cheaply, a model operators can extend across residential portfolios.",
     "source": "Zag Daily",
     "url": "https://zagdaily.com/connected/driver-shortages-shape-neolixs-autonomous-push-into-overseas-delivery-markets/",
     "published": "2026-10-27",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [
      {
       "vendor": "Cargo X / Noon",
       "via": "oem",
       "oem": "Neolix",
       "status": "deployed",
       "status_label": "Launched",
       "use_case": "Autonomous Delivery Vans",
       "model": "Neolix X3",
       "site": "Al Raha Gardens",
       "site_count": 3
      }
     ],
     "portfolio_note": "Neolix's international commitment supports Cargo X / Noon's planned Neolix X3 expansions from Al Raha Gardens to Golf Gardens and Al Merief.",
     "image": "https://zagdaily.com/wp-content/uploads/2026/06/Neolix.jpg"
    },
    {
     "id": "fccopens50mhzofcellularspectrumfordroneo",
     "category": "inspection",
     "type": "trend",
     "region": "North America",
     "company": "FCC",
     "amount_usd_m": null,
     "headline": "FCC opens 50 MHz of cellular spectrum for drone operations",
     "summary": "The US FCC voted to lift a decades-old restriction, opening 50 MHz of licensed 800 MHz cellular spectrum to drones.",
     "why_it_matters": "Reliable cellular links enable beyond-line-of-sight inspection and docked drones, a model UAE regulators may follow.",
     "source": "DroneLife",
     "url": "https://dronelife.com/2026/10/29/fcc-opens-cellular-spectrum-drones-800-mhz/",
     "published": "2026-10-26",
     "coverage": 8,
     "also_covered_by": [
      "sUAS News",
      "Unmanned Systems Technology",
      "EIN News"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://dronelife.com/wp-content/uploads/2025/01/FCC.png"
    },
    {
     "id": "amapsrobotdogtutustartspatrolsatalibabas",
     "category": "security",
     "type": "deployment",
     "region": "China",
     "company": "Amap (Alibaba)",
     "amount_usd_m": null,
     "headline": "Amap robot dog starts patrols at Alibaba's Xixi campus",
     "summary": "Amap's robot dog Tutu now patrols Alibaba's Xixi campus and files its findings as evidence directly into work orders.",
     "why_it_matters": "Linking patrol robots to work-order systems is what turns security robots into useful facility-management tools.",
     "source": "Pandaily",
     "url": "https://pandaily.com/amap-robot-dog-tutu-alibaba-xixi-campus-patrol-abot-agentos-work-orders",
     "published": "2026-10-26",
     "coverage": 7,
     "also_covered_by": [
      "BigGo Finance",
      "Electric Vehicles",
      "DailyVoice.com"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://cms-image.pandaily.com/1/amap_dbd502cebf.png"
    },
    {
     "id": "yyforcedeploys11commercialhospitalityrob",
     "category": "humanoids",
     "type": "deployment",
     "region": "Asia-Pacific",
     "company": "YYForce",
     "amount_usd_m": null,
     "headline": "YYForce deploys 11 hospitality robots at Novotel & Mercure Singapore",
     "summary": "YYForce placed 11 commercial hospitality robots at the Novotel and Mercure Singapore on Stevens hotels.",
     "why_it_matters": "Multi-robot hotel deployments offer a reference for guest-service robots in Aldar's hospitality and retail assets.",
     "source": "PR Newswire",
     "url": "https://www.prnewswire.com/news-releases/yyforce-deploys-11-commercial-hospitality-robots-at-novotel--mercure-singapore-on-stevens-302923911.html",
     "published": "2026-10-29",
     "coverage": 4,
     "also_covered_by": [
      "StreetInsider",
      "TradingView",
      "Pluang"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://mmx.prnewswire.com/media/MS1982800/20260907040718EDT_image_2.jpg?id=OA3047820&p=facebook"
    },
    {
     "id": "arlingtonbaseddrhortonteamswithroboticsf",
     "category": "construction",
     "type": "deployment",
     "region": "North America",
     "company": "D.R. Horton",
     "amount_usd_m": null,
     "headline": "D.R. Horton teams with robotics firm for home construction",
     "summary": "US homebuilder D.R. Horton partnered with a robotics firm to apply robots to home construction.",
     "why_it_matters": "A volume homebuilder adopting robotics shows site automation reaching residential construction, Aldar's core product.",
     "source": "Audacy",
     "url": "https://www.audacy.com/krld/news/local/arlington-based-d-r-horton-teams-with-robotics-firm-for-home-construction",
     "published": "2026-10-28",
     "coverage": 2,
     "also_covered_by": [
      "Realty Today"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.audacy.com/media-library/arlington-based-d-r-horton-the-largest-u-s-homebuilder-by-volume-has-signed-a-multi-year-deal-with-torontos-promise-robotic.jpg?id=68541350&width=1200&height=600&coordinates=0%2C167%2C0%2C167"
    },
    {
     "id": "dewaltandaugustroboticsdalenamedtotimesb",
     "category": "construction",
     "type": "trend",
     "region": "Global",
     "company": "DEWALT / August Robotics",
     "amount_usd_m": null,
     "headline": "DEWALT and August Robotics' DALE named to TIME Best Inventions 2026",
     "summary": "DALE, a construction layout and marking robot from DEWALT and August Robotics, made TIME's Best Inventions of 2026 list.",
     "why_it_matters": "Layout robots are a low-risk entry point for site automation, cutting setting-out time on fit-out and MEP work.",
     "source": "Machine Maker",
     "url": "https://themachinemaker.com/news/dewalt-and-august-robotics-dale-named-to-times-best-inventions-of-2026-list/",
     "published": "2026-10-23",
     "coverage": 3,
     "also_covered_by": [
      "Anker",
      "Koreabizwire"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://themachinemaker.com/wp-content/uploads/2026/10/DEWALT.jpg"
    },
    {
     "id": "nioshhighlightsemergingsafetyrisksofcons",
     "category": "construction",
     "type": "trend",
     "region": "North America",
     "company": "NIOSH",
     "amount_usd_m": null,
     "headline": "NIOSH highlights emerging safety risks of construction robotics",
     "summary": "US safety agency NIOSH outlined new hazards that come with deploying robots on construction sites.",
     "why_it_matters": "Developers piloting site robots need updated HSE procedures and contractor rules before scaling.",
     "source": "Occupational Health & Safety",
     "url": "https://ohsonline.com/articles/2026/10/23/niosh-highlights-emerging-safety-risks-of-construction-robotics.aspx",
     "published": "2026-10-23",
     "coverage": 2,
     "also_covered_by": [
      "Yahoo Finance"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://ohsonline.com/-/media/OHS/OHS/Images/2026/10/1023-construction-robot.jpg"
    },
    {
     "id": "adeliveryrobotrunsaredlightintallinnesto",
     "category": "delivery",
     "type": "trend",
     "region": "Europe",
     "company": "Unnamed delivery robot operator",
     "amount_usd_m": null,
     "headline": "Delivery robot runs red light in Tallinn, injuring nine bus passengers",
     "summary": "A delivery robot ran a red light in Tallinn, Estonia, in an incident that injured nine bus passengers.",
     "why_it_matters": "A single incident can trigger restrictions; community delivery bots need conservative road-crossing rules and clear liability.",
     "source": "Estonian World",
     "url": "https://estonianworld.com/technology/a-delivery-robot-runs-a-red-light-in-tallinn-estonia-injuring-nine-bus-passengers/",
     "published": "2026-10-28",
     "coverage": 2,
     "also_covered_by": [
      "ERR"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://estonianworld.com/wp-content/uploads/2015/11/Starship.jpg"
    },
    {
     "id": "fooddeliveryrobotsinillinoisaccusedofsca",
     "category": "delivery",
     "type": "trend",
     "region": "North America",
     "company": "Unnamed delivery robot operator",
     "amount_usd_m": null,
     "headline": "Illinois food delivery robots accused of scanning faces and sharing data",
     "summary": "A lawsuit alleges food delivery robots in Illinois scanned people's faces and shared the data with AI companies.",
     "why_it_matters": "Camera-equipped robots in communities need clear data-handling terms in vendor contracts to protect residents and the brand.",
     "source": "BroBible",
     "url": "https://brobible.com/culture/article/food-delivery-robots-accused-scanning-faces-sharing-data-ai/",
     "published": "2026-10-27",
     "coverage": 4,
     "also_covered_by": [
      "Tech Edition",
      "Attack of the Fanboy",
      "Simply Wall Street"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://brobible.com/wp-content/uploads/2026/10/autonomous-food-delivery-robot.jpg"
    },
    {
     "id": "ziplineannouncesquieterdronedeliveriesas",
     "category": "delivery",
     "type": "product",
     "region": "Global",
     "company": "Zipline",
     "amount_usd_m": null,
     "headline": "Zipline releases quieter drone delivery software amid noise complaints",
     "summary": "Zipline's new flight software cuts modeled sound exposure by 68% as residential communities raise noise concerns about drone deliveries.",
     "why_it_matters": "Noise is becoming the gating factor for drone delivery over residential communities; quieter flight eases resident acceptance.",
     "source": "DroneLife",
     "url": "https://dronelife.com/2026/10/29/zipline-drone-delivery-noise-reduction/",
     "published": "2026-10-26",
     "coverage": 4,
     "also_covered_by": [
      "IndexBox",
      "AI Insider",
      "PR Newswire"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://dronelife.com/wp-content/uploads/2026/07/Zipline-1-scaled-e1784132161517.jpg"
    },
    {
     "id": "newdesignstandardsaimtomakebuildingswork",
     "category": "facade",
     "type": "trend",
     "region": "Global",
     "company": "Research standards",
     "amount_usd_m": null,
     "headline": "New design standards aim to make buildings work for humans and robots",
     "summary": "Proposed design standards set out how buildings can accommodate robots alongside people, from circulation to access.",
     "why_it_matters": "Designing new towers for robot access, such as façade anchor points and lift integration, lowers future automation costs.",
     "source": "Bioengineer.org",
     "url": "https://bioengineer.org/new-design-standards-aim-to-make-buildings-work-for-humans-and-robots-alike/",
     "published": "2026-10-24",
     "coverage": 3,
     "also_covered_by": [
      "Tasmania Talks",
      "Logistics Viewpoints"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://bioengineer.org/wp-content/uploads/2026/10/stackrss-featured-22696.png"
    },
    {
     "id": "abudhabiintroducesfirstdedicatednumberpl",
     "category": "delivery",
     "type": "trend",
     "region": "GCC",
     "company": "Abu Dhabi authorities",
     "amount_usd_m": null,
     "headline": "Abu Dhabi introduces first dedicated number plates for autonomous vehicles",
     "summary": "Abu Dhabi has introduced dedicated number plates for autonomous vehicles, a first for the emirate.",
     "why_it_matters": "Formal AV identification supports scaling driverless delivery vans and shuttles across Aldar communities with clearer regulatory standing.",
     "source": "Gulf News",
     "url": "https://gulfnews.com/uae/transport/abu-dhabi-introduces-first-dedicated-number-plates-for-autonomous-vehicles-1.500728093",
     "published": "2026-10-29",
     "coverage": 3,
     "also_covered_by": [
      "Gulf Today",
      "Travels Dubai"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://media.assettype.com/gulfnews%2F2026-10-29%2Fsmr2uawp%2FYellow-Stripe-Sports-Car-in-Neon-Blur.png?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100"
    },
    {
     "id": "dubaiannounceslaneclosuresonemiratesroad",
     "category": "delivery",
     "type": "trend",
     "region": "GCC",
     "company": "Dubai RTA",
     "amount_usd_m": null,
     "headline": "Dubai closes Emirates Road lanes to clear way for self-driving taxi tests",
     "summary": "Dubai is closing lanes on Emirates Road, along with parts of E611 and an Al Maktoum airport tunnel, for autonomous taxi testing.",
     "why_it_matters": "Robotaxi testing on major highways signals UAE commitment, with implications for drop-off design at malls and communities.",
     "source": "The National",
     "url": "https://www.thenationalnews.com/news/uae/2026/10/26/dubai-announces-lane-closures-on-emirates-road-from-monday-to-allow-for-self-driving-taxi-tests/",
     "published": "2026-10-26",
     "coverage": 2,
     "also_covered_by": [
      "Gulf Business"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://www.thenationalnews.com/resizer/v2/VSSDYQDNTRB3LJD4E6FADFJW2A.jpg?auth=7606b706fb0b47577b97ade60cb8af5cc778b0ff618ff5aad8d65273a933bfa4&smart=true&width=1200&height=630"
    },
    {
     "id": "galaxycorpopensrobotperformancearenaindu",
     "category": "humanoids",
     "type": "deployment",
     "region": "GCC",
     "company": "Galaxy Corp.",
     "amount_usd_m": null,
     "headline": "Galaxy Corp. opens robot performance arena in Dubai",
     "summary": "Korea's Galaxy Corporation opened an arena in Dubai where robots perform and entertain audiences.",
     "why_it_matters": "Robot entertainment venues create a template for footfall-driving attractions in malls and leisure destinations.",
     "source": "The Korea Times",
     "url": "https://www.koreatimes.co.kr/amp/business/companies/20261026/galaxy-corp-opens-robot-performance-arena-in-dubai",
     "published": "2026-10-26",
     "coverage": 2,
     "also_covered_by": [
      "Korea JoongAng Daily"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://newsimg.koreatimes.co.kr/2026/10/26/23543494-a097-4855-b8a0-b628d98b49db.jpg"
    },
    {
     "id": "10universityteamstocompeteinemiratesrobo",
     "category": "physical_ai",
     "type": "trend",
     "region": "GCC",
     "company": "Dubai Future Week",
     "amount_usd_m": null,
     "headline": "10 university teams reach Emirates Robotic Competition finals at Dubai Future Week",
     "summary": "Ten university teams will compete in the Emirates Robotic Competition finals during the inaugural Dubai Future Week 2026.",
     "why_it_matters": "A growing local robotics talent pool can support in-house robot operations and pilot partnerships with universities.",
     "source": "Zawya",
     "url": "https://www.zawya.com/en/press-release/events-conferences/10-university-teams-to-compete-in-emirates-robotic-competition-finals-during-the-inaugural-dubai-future-week-2026-1854412",
     "published": "2026-10-26",
     "coverage": 6,
     "also_covered_by": [
      "Business Wire",
      "www.wam.ae",
      "The CSR Journal"
     ],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://media.zawya.com/prod/images/gm_preview/259a1d36e875-dfw26-emirates-robotics-challenge-infographic.jpg"
    },
    {
     "id": "sharjahcivildefenceeyesaiandroboticsatsi",
     "category": "security",
     "type": "trend",
     "region": "GCC",
     "company": "Sharjah Civil Defence",
     "amount_usd_m": null,
     "headline": "Sharjah Civil Defence eyes AI and robotics at Singapore expo",
     "summary": "Sharjah Civil Defence explored AI and robotics solutions for emergency response at an expo in Singapore.",
     "why_it_matters": "Civil defence adoption of robotics may shape fire-safety requirements and emergency-response expectations for buildings.",
     "source": "Gulf News",
     "url": "https://gulfnews.com/uae/sharjah/sharjah-civil-defence-eyes-ai-and-robotics-at-singapore-expo-1.500727632",
     "published": "2026-10-29",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://media.assettype.com/gulfnews%2F2026-10-28%2Freebmz82%2FSharjah-Civil-Defence-delegation-explores-emergency-technologies-at-SIDEX-2026-in-Singapore.?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100"
    },
    {
     "id": "uaestudentswithintellectualdisabilitiesm",
     "category": "physical_ai",
     "type": "trend",
     "region": "GCC",
     "company": "UAE robotics teams",
     "amount_usd_m": null,
     "headline": "Students with intellectual disabilities make up half of 279 UAE robotics teams",
     "summary": "At least half of 279 UAE robotics teams in a competition are made up of students with intellectual disabilities.",
     "why_it_matters": "Inclusive robotics education aligns with community programmes developers can host in schools and malls.",
     "source": "Khaleej Times",
     "url": "https://www.khaleejtimes.com/uae/education/uae-2026-unified-robotics-league-students-intellectual-disabilities",
     "published": "2026-10-26",
     "coverage": 1,
     "also_covered_by": [],
     "portfolio": [],
     "portfolio_note": "",
     "image": "https://imgengine.khaleejtimes.com/khaleejtimes-english/2026-10-26/7uabw1wu/WhatsApp-Image-2026-10-26-at-14.36.50-2.jpeg?width=1200&height=630&q=60&format=auto&ogImage=true&mode=fill&fill=blur"
    }
   ],
   "vendor_watch": [
    {
     "vendor": "Analog",
     "oem": "Boston Dynamics",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Quadruped Dog Interior Inspections"
     ],
     "models": [
      "Boston Dynamics Spot"
     ],
     "sites": [
      "Yas Park Gate"
     ],
     "mentions": 15,
     "post_ids": [
      "bostondynamicsworkerspetitionagainsticed"
     ],
     "signal": "mixed",
     "note": "Boston Dynamics staff petition over ICE Spot deal adds reputational sensitivity to quadruped use; no operational impact in the UAE.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "AirTech",
     "oem": "DJI",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Drone Inspections for Unit Exterior"
     ],
     "models": [
      "Thermal: M300 H20T · General capture: Matrice 4E"
     ],
     "sites": [
      "Saadiyat Lagoons"
     ],
     "mentions": 5,
     "post_ids": [
      "rickscottdoublesdownondjiandauteldronere",
      "djimatrice5tdsnative1280thermalhasausdro"
     ],
     "signal": "mixed",
     "note": "DJI's 1280 thermal Matrice 5TD could upgrade inspections, but US pressure on DJI risks parts and support disruption.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Cargo X / Noon",
     "oem": "Neolix",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Autonomous Delivery Vans",
      "Autonomous Delivery Vans (Al Merief expansion)",
      "Autonomous Delivery Vans (Golf Gardens expansion)"
     ],
     "models": [
      "Neolix X3"
     ],
     "sites": [
      "Al Raha Gardens",
      "Golf Gardens",
      "Al Merief"
     ],
     "mentions": 5,
     "post_ids": [
      "drivershortagesshapeneolixsautonomouspus"
     ],
     "signal": "positive",
     "note": "Maker Neolix is pushing overseas delivery markets, supporting Aldar's planned Golf Gardens and Al Merief van expansions.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Pudu",
     "oem": "",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Concierge Service",
      "Customer Management Delivery Bot",
      "Floor Scrubbing and Sweeping"
     ],
     "models": [
      "1× CC1 Pro, 1× MT1 Max",
      "1× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
      "1× CC1 Pro, 3× MT1 Max",
      "2× CC1 Pro",
      "2× CC1 Pro, 1× MT1 Max, 1× BG1 Pro",
      "33× CC1 Pro",
      "3× CC1 Pro",
      "3× CC1 Pro, 1× MT1 Max",
      "4× CC1 Pro, 1× MT1 Max",
      "4× CC1 Pro, 2× MT1 Max, 2× BG1 Pro",
      "6× CC1 Pro",
      "6× CC1 Pro, 3× MT1 Max, 2× BG1 Pro",
      "Bellabot Pro"
     ],
     "sites": [
      "International Tower",
      "ADGM Square",
      "Aldar HQ",
      "Al Maryah Tower",
      "Yas Place",
      "Aldar Square",
      "Aldar Estates Office · Yas Mall",
      "Masdar City",
      "Al Rayanna",
      "The Bridges",
      "Mamsha Al Saadiyat",
      "Gate & Arc Towers",
      "Al Zeina",
      "Sun & Sky Tower",
      "Saadiyat Grove",
      "Saadiyat Beach Residences",
      "Al Muneera",
      "Waters Edge",
      "Yas Golf Collection",
      "West Yas Plaza",
      "Noya Plaza",
      "Shams Boutik",
      "Eastern Mangroves",
      "Muneera Retail (Al Muneera Beach Plaza)",
      "Gardens Plaza"
     ],
     "mentions": 4,
     "post_ids": [
      "puduroboticsopensdoorstoeuropeanhqingerm",
      "bluechipinfotechsignsuppuduroboticsforau"
     ],
     "signal": "positive",
     "note": "New European HQ and Australian distribution deal show scale and support capacity behind Aldar's large pending cleaning rollout.",
     "signal_by": "claude",
     "article": null
    },
    {
     "vendor": "Deep Robotics",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Security Patrolling"
     ],
     "models": [
      "X30"
     ],
     "sites": [
      "ADGM Square"
     ],
     "mentions": 2,
     "post_ids": [],
     "signal": "positive",
     "note": "",
     "signal_by": "headlines",
     "article": {
      "title": "DEEP Robotics Unveils Five Research Advances in Embodied AI",
      "url": "https://news.google.com/rss/articles/CBMiugFBVV95cUxOaWRyS1R4dm5qUkoyRzBSdGNMczFJVE1WeE1LSE5QTEF4ZWs3ZzlERmFETXRQc0g5RzBtc25VNFNsXzdSNFRvTWg4WjZUYVo2MjczOVdidkZvV21MR25WZWY5SUNqOTcwUDEyLTFGd2t1N21PNUNPQ21qNXhUVUN6MXJrVkc4Y2R6Y2dZalgycmJaNDdPVXVoNmk1bFZ1bzlNYTFSbk14eUVBZk1FQ1QtdE5USGFnWlpYYVE?oc=5",
      "source": "markets.businessinsider.com"
     }
    },
    {
     "vendor": "BarqAir",
     "oem": "",
     "status": "deployed",
     "status_label": "Launched",
     "use_cases": [
      "Drone Façade Cleaning"
     ],
     "models": [
      "Cleaning Drone"
     ],
     "sites": [
      "Yas Place"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "SINDAN",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Floor Scrubbing and Sweeping",
      "Humanoid Guest Engagement",
      "Security Patrolling (2)"
     ],
     "models": [
      "D1 Max",
      "MK-02 Humanoid",
      "NOVA-02 and NOVA-05"
     ],
     "sites": [
      "Yas Mall",
      "ADGM Square",
      "Livex · ADNEC"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Thub Technologies",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Crawler Façade Cleaning (2)",
      "Façade Cleaning"
     ],
     "models": [
      "TowerCraft"
     ],
     "sites": [
      "Yas Place",
      "World Trade Center Abu Dhabi"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "X-Human",
     "oem": "",
     "status": "pilot",
     "status_label": "Trialled",
     "use_cases": [
      "Crawler Façade Cleaning"
     ],
     "models": [
      "Lingkong K3"
     ],
     "sites": [
      "Yas Place"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "AD Robotics",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Community Delivery Bot",
      "Security Patrolling"
     ],
     "models": [
      "ADR Delivery Bot",
      "ADR Quadruped"
     ],
     "sites": [
      "Noya Luma",
      "Ansam"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Falcon Tech Robotics",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Interactive Visitor Engagement"
     ],
     "models": [
      "KODY"
     ],
     "sites": [
      "The Galleria"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Pudu + other",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Floor Scrubbing and Sweeping"
     ],
     "models": [
      "2× CC1 Pro, 1× MT1 Max, 1× External Sweeper",
      "3× CC1 Pro, 1× MT1 Max, 1× External Sweeper",
      "3× MT1 Max, 1× BG1 Pro, 1× External Sweeper"
     ],
     "sites": [
      "Pearl British Academy",
      "Muna British Academy",
      "Bateen World Academy",
      "Al Ain British Academy",
      "Yasmina British Academy",
      "Mamoura British Academy",
      "Cranleigh Abu Dhabi",
      "Noya British School",
      "Yasmina American School",
      "Eastern Mangroves"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Solinas",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Hidden Cavity Inspection"
     ],
     "models": [
      "Endobot 90 and Endobot 250"
     ],
     "sites": [
      "Saadiyat Grove"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    },
    {
     "vendor": "Subdivo",
     "oem": "",
     "status": "planned",
     "status_label": "Pending",
     "use_cases": [
      "Façade Cleaning"
     ],
     "models": [],
     "sites": [
      "International Tower"
     ],
     "mentions": 0,
     "post_ids": [],
     "signal": "none",
     "note": "",
     "signal_by": "",
     "article": null
    }
   ],
   "viral": [
    {
     "platform": "Instagram",
     "date": "Reported 26 Oct 2026 (post date unknown)",
     "title": "Viral video: robot starts throwing kicks and punches like a human",
     "category": "humanoids",
     "views_reported": "Not verified",
     "views_source": "Amar Ujala (26 Oct) says 'lakhs' watched and reports 387,000+ likes as hearsay; no platform figure.",
     "what_shows": "A young man lightly pushes a humanoid robot, and it answers with kicks and defensive moves.",
     "what_behind": "Unknown. The robot and model are unidentified, and Amar Ujala warns against treating the clip as proof of ability. Nothing says whether it was remote-controlled or scripted.",
     "checks": {
      "real": "unknown",
      "autonomous": "unknown",
      "corroborated": "no",
      "deployed": "unknown",
      "gcc": "unknown"
     },
     "verdict": "hype",
     "fit": "Low",
     "portfolio_match": "SINDAN MK-02 Humanoid (pending, Livex · ADNEC); Falcon KODY (pending, The Galleria)",
     "action": "Ignore",
     "leadership_line": "It's an unidentified robot in an entertainment clip; it tells us nothing about any product we'd buy.",
     "assessed_from": "One news article (Amar Ujala); video not watched.",
     "video_url": "",
     "corroboration": [
      {
       "label": "Amar Ujala, 26 Oct 2026",
       "url": "https://www.amarujala.com/bizarre-news/viral-video-man-pushes-robot-its-next-move-leaves-everyone-stunned-2026-10-26"
      }
     ]
    },
    {
     "platform": "X and others",
     "date": "28 Oct 2026",
     "title": "This humanoid robot unloads parcels from a Cybertruck and carries them to your door",
     "category": "delivery",
     "views_reported": "Not verified",
     "views_source": "No dated source gives a figure.",
     "what_shows": "A humanoid climbs onto a Tesla Cybertruck, takes Amazon, Walmart and DHL boxes and carries them to a doorstep. Indoor clips show it picking up objects on stairs.",
     "what_behind": "Reward AI (Bay Area) using its OM-1 model. Company claims full autonomy, real speed, no remote control and glove-based training. No published success rates; hardware maker not named.",
     "checks": {
      "real": "yes",
      "autonomous": "unknown",
      "corroborated": "no",
      "deployed": "no",
      "gcc": "unknown"
     },
     "verdict": "watch",
     "fit": "Medium",
     "portfolio_match": "Cargo X / Noon's Neolix X3 (launched, Al Raha Gardens); AD Robotics' ADR Delivery Bot (pending, Ansam)",
     "action": "Watch",
     "leadership_line": "It's a promising demo of a robot carrying parcels from van to door, but the company hasn't published success rates and it isn't on sale.",
     "assessed_from": "Interesting Engineering and Yahoo coverage; X post seen as snippet only; video not watched.",
     "video_url": "https://interestingengineering.com/videos/this-humanoid-robot-unloads-parcels-from-a-cybertruck-and-carries-them-to-your-door",
     "corroboration": [
      {
       "label": "Yahoo republication",
       "url": "https://www.yahoo.com/news/videos/humanoid-robot-unloads-parcels-cybertruck-154758726.html"
      },
      {
       "label": "CyberRobo post on X (snippet only)",
       "url": "https://x.com/CyberRobooo/status/2115255124272750648"
      }
     ]
    },
    {
     "platform": "Japanese TV (ANN News), then tech press",
     "date": "28 Oct 2026",
     "title": "Japan experiments with autonomous AI chainsaw-wielding robots…",
     "category": "inspection",
     "views_reported": "Not verified",
     "views_source": "No figure found in any source.",
     "what_shows": "A humanoid-shaped machine on a rail truck uses a chainsaw arm and grabber arm to clear branches blocking tracks.",
     "what_behind": "A human operates it remotely; autonomy is only a possible future step despite the headline. JR East has used it since March, citing labour shortages. Maker not named.",
     "checks": {
      "real": "yes",
      "autonomous": "no",
      "corroborated": "yes",
      "deployed": "yes",
      "gcc": "unknown"
     },
     "verdict": "real",
     "fit": "Low",
     "portfolio_match": "None directly; nearest are BarqAir and Thub (façade work at height)",
     "action": "Watch",
     "leadership_line": "It's a real working machine, but a person drives it remotely; the lesson is remote-controlled robots for dangerous work at height, not autonomous AI.",
     "assessed_from": "Tom's Hardware article; Mezha snippet only; video not watched.",
     "video_url": "",
     "corroboration": [
      {
       "label": "Tom's Hardware, 28 Oct 2026",
       "url": "https://www.tomshardware.com/tech-industry/robotics/japan-experiments-with-autonomous-ai-chainsaw-wielding-robots-video-shows-rail-truck-mounted-metal-humanoid-cutting-down-tree-branches"
      },
      {
       "label": "Mezha (snippet only)",
       "url": "https://mezha.ua/en/news/chainsaw-wielding-robot-316635/"
      }
     ]
    }
   ],
   "challengers": [
    {
     "name": "Unitree Robotics",
     "category": "security",
     "what": "H2-X 'Guardian' humanoid promo video, 21–22 Oct 2026; autonomy, price and release date undisclosed.",
     "scores": {
      "funding": 0,
      "deployments": 0,
      "scale": 0,
      "partners": 0,
      "gcc": 0
     },
     "why": "Could compete with Deep Robotics X30 and SINDAN; needs proof of autonomy first.",
     "source": {
      "label": "Interesting Engineering, 22 Oct",
      "url": "https://interestingengineering.com/ai-robotics/unitree-showcases-h2-x-humanoid-robot"
     },
     "total": 0,
     "verdict": "ignore"
    },
    {
     "name": "Reward AI",
     "category": "physical_ai",
     "what": "OM-1 robot 'brain' shown in parcel-delivery demo, 28 Oct 2026.",
     "scores": {
      "funding": 0,
      "deployments": 0,
      "scale": 0,
      "partners": 0,
      "gcc": 0
     },
     "why": "Targets last-stretch delivery; could complement or compete with ADR bot and Neolix vans.",
     "source": {
      "label": "Interesting Engineering",
      "url": "https://interestingengineering.com/videos/this-humanoid-robot-unloads-parcels-from-a-cybertruck-and-carries-them-to-your-door"
     },
     "total": 0,
     "verdict": "ignore"
    }
   ],
   "matrix": [
    {
     "category": "construction",
     "readiness": 45,
     "relevance": 70,
     "hype": 75,
     "substance": 50,
     "reason": "Big funding and awards, but we have no vendor."
    },
    {
     "category": "facade",
     "readiness": 40,
     "relevance": 85,
     "hype": 20,
     "substance": 45,
     "reason": "BarqAir and crawler trials; little market news."
    },
    {
     "category": "inspection",
     "readiness": 70,
     "relevance": 70,
     "hype": 55,
     "substance": 65,
     "reason": "Mature drones; DJI restrictions are a supply risk."
    },
    {
     "category": "cleaning",
     "readiness": 80,
     "relevance": 95,
     "hype": 25,
     "substance": 80,
     "reason": "Biggest footprint: 7 launched, about 30 pending."
    },
    {
     "category": "security",
     "readiness": 45,
     "relevance": 65,
     "hype": 60,
     "substance": 40,
     "reason": "Real robot-dog patrols; Unitree H2-X unverified."
    },
    {
     "category": "delivery",
     "readiness": 60,
     "relevance": 80,
     "hype": 60,
     "substance": 60,
     "reason": "Neolix expanding, AV plates; incidents keep accumulating."
    },
    {
     "category": "humanoids",
     "readiness": 25,
     "relevance": 45,
     "hype": 90,
     "substance": 30,
     "reason": "Viral clips outrun evidence; deployments small."
    },
    {
     "category": "physical_ai",
     "readiness": 15,
     "relevance": 35,
     "hype": 95,
     "substance": 25,
     "reason": "Huge valuations, demos without success rates."
    }
   ],
   "research_meta": {
    "searches": 15,
    "sources": 111
   }
  }
 ]
};
