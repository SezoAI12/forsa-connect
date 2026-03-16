export type Category =
  | "AI Services"
  | "Freelance Services"
  | "Automation Services"
  | "Digital Arbitrage"
  | "Micro SaaS Ideas";

export type Competition = "Low" | "Medium" | "High";

export interface PricingPackage {
  packageName: string;
  price: number;
  currency: string;
  features: string[];
  description: string;
}

export interface Tool {
  name: string;
  purpose: string;
  link: string;
  isFree: boolean;
}

export interface ExecutionStep {
  step: number;
  title: string;
  content: string;
  tips?: string[];
}

export interface OutreachTemplate {
  platform: string;
  subject?: string;
  body: string;
}

export interface Opportunity {
  id: string;
  title: string;
  category: Category;
  targetClients: string;
  demandScore: number;
  competition: Competition;
  startupCost: string;
  timeToFirstClient: string;
  incomeMin: number;
  incomeMax: number;
  overview: string;
  marketEvidence: string;
  toolsStack: Tool[];
  pricingStrategy: PricingPackage[];
  clientAcquisitionSystem: string;
  outreachTemplates: OutreachTemplate[];
  executionBlueprint: {
    marketOverview: string;
    servicePackaging: string;
    toolsSetup: string;
    clientAcquisition: string;
    pricingModel: string;
    deliveryWorkflow: ExecutionStep[];
  };
  isNew: boolean;
  publishedAt: string;
}

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "ai-subtitle-service",
    title: "AI Subtitle Generation for Video Creators",
    category: "AI Services",
    targetClients: "YouTubers and TikTok Creators",
    demandScore: 88,
    competition: "Medium",
    startupCost: "$0",
    timeToFirstClient: "1–2 weeks",
    incomeMin: 1000,
    incomeMax: 3000,
    isNew: true,
    publishedAt: "2025-01-10",
    overview:
      "Video creators on YouTube, TikTok, and Instagram are under growing pressure to add subtitles and captions to boost engagement, accessibility, and watch-time. AI tools now make it possible to deliver professional subtitle services in minutes — turning a 10-minute video into a polished, captioned file. With global demand for multilingual subtitles rising and most creators lacking time to handle it themselves, this is a prime entry-level AI service that requires no coding, no design skills, and zero upfront cost.",
    marketEvidence:
      "Fiverr shows 2,000+ active subtitle gigs with top sellers earning $5k–$10k/month. YouTube reports 80% of viewers watch videos on mute in public, making captions critical for engagement. The global video captioning market is projected to reach $450M by 2026. On Upwork, searches for 'subtitle service' have grown 64% year-over-year. TikTok's algorithm explicitly rewards captioned videos with higher distribution. Multiple creator economy reports confirm captions increase average view duration by 12–14%. The barrier to entry is near-zero with AI tools, yet quality and turnaround time remain persistent pain points freelancers can exploit.",
    toolsStack: [
      { name: "Whisper AI (via Replicate or local)", purpose: "Automated speech-to-text transcription", link: "https://replicate.com", isFree: true },
      { name: "CapCut", purpose: "Auto-captions and visual styling for short-form video", link: "https://capcut.com", isFree: true },
      { name: "Descript", purpose: "Pro subtitle editing and SRT export", link: "https://descript.com", isFree: false },
      { name: "Canva", purpose: "Branded subtitle templates", link: "https://canva.com", isFree: true },
      { name: "Notion", purpose: "Client management and delivery tracking", link: "https://notion.so", isFree: true },
    ],
    pricingStrategy: [
      {
        packageName: "Basic",
        price: 50,
        currency: "USD",
        features: ["Subtitles for 1 video up to 10 min", "SRT + VTT file", "English only", "48hr delivery"],
        description: "Perfect entry offer for new clients testing your service",
      },
      {
        packageName: "Standard",
        price: 120,
        currency: "USD",
        features: ["Subtitles for 3 videos up to 15 min each", "SRT + VTT + burned-in captions", "English + 1 language", "24hr delivery", "2 revisions"],
        description: "Best seller — offers multilingual value at a price creators can justify",
      },
      {
        packageName: "Premium",
        price: 300,
        currency: "USD",
        features: ["Full content repurposing for 5 videos", "Subtitles + short clips extraction", "3 languages", "12hr rush delivery", "Unlimited revisions", "Monthly retainer option"],
        description: "For serious creators who want a hands-off content pipeline",
      },
    ],
    clientAcquisitionSystem:
      "Primary channel: Upwork — search for 'video editor' or 'subtitle service' jobs and apply with a personalized pitch showing your AI-speed advantage. Secondary: TikTok and YouTube comment sections — find creators with 10k–100k followers who do NOT have captions on their videos and reach out via DM. Join Facebook groups like 'YouTube Creators' and 'TikTok Growth Hacks'. LinkedIn is effective for targeting B2B creators (coaches, speakers, educators). Post daily on X/Twitter with a before/after caption example to attract inbound leads.",
    outreachTemplates: [
      {
        platform: "Upwork",
        body: "Hi [Name], I noticed your videos don't have subtitles yet — studies show captions increase watch-time by up to 14%. I deliver AI-powered subtitles in 24hrs for any video length, in any language. I can do a free sample on your latest video so you can see the quality before committing. Interested?",
      },
      {
        platform: "Instagram DM",
        body: "Hey [Name]! Love your content. Quick question — have you considered adding captions? I help creators like you get AI-generated subtitles in 24hrs, which usually adds 10–15% more watch time. Happy to do your next video free to show you the difference.",
      },
      {
        platform: "LinkedIn",
        body: "Hi [Name], I work with content creators and coaches to add professional multilingual subtitles to their videos using AI — turning what used to take days into a 24hr turnaround. Would a quick free sample on one of your recent videos make sense?",
      },
    ],
    executionBlueprint: {
      marketOverview:
        "The global short-form and long-form video creator economy is worth $250B+ and still growing. Accessibility regulations (ADA, EU laws) are pushing brands to add captions to all video content. AI transcription has crossed a quality threshold where it rivals human transcription at 1/10th the price, creating a window for freelancers to offer this at scale.",
      servicePackaging:
        "Package the service as a 'done-for-you captions' subscription. Start with one-time projects to build reviews, then upsell to monthly retainers. Differentiate by offering multilingual output (AI translates as it transcribes) and fast turnaround (under 24 hours).",
      toolsSetup:
        "1. Create a free Replicate account and test Whisper AI on a sample video. 2. Download CapCut Desktop for styled captions. 3. Sign up for Descript free tier for SRT export. 4. Set up a Notion database to track client projects, deadlines, and deliverables.",
      clientAcquisition:
        "Week 1: Create Upwork and Fiverr profiles with optimized titles like 'AI Subtitle Expert — 24hr Delivery Any Language'. Week 2: Apply to 10 Upwork jobs daily. Simultaneously DM 20 creators per day on Instagram. Week 3: Post portfolio samples daily on social media. Week 4: Follow up with past contacts and ask for referrals.",
      pricingModel:
        "Start at $50 for a Basic package to quickly accumulate reviews. After 5 reviews, raise to $75/$150/$350. After 20 reviews, target $100/$200/$500. Monthly retainers at $400–$800/month for 10–20 videos/month are the income-stabilizing goal.",
      deliveryWorkflow: [
        {
          step: 1,
          title: "Setup Your AI Tools",
          content: "Create accounts on Replicate (for Whisper AI), CapCut, and Descript. Run a test transcription on a YouTube video to verify accuracy. Set up a Notion workspace with a client tracker template.",
          tips: ["Test Whisper on a video with background noise to understand its limits", "CapCut auto-captions work best for under-10-minute videos"],
        },
        {
          step: 2,
          title: "Create Service Packages",
          content: "Create your Upwork and Fiverr profiles. Write package descriptions that emphasize speed (24hrs), quality (AI + human review), and languages. Upload 2–3 portfolio samples (create these yourself from royalty-free YouTube videos).",
          tips: ["Use keywords like 'SRT file', 'closed captions', 'burned-in subtitles' in your gig title"],
        },
        {
          step: 3,
          title: "Find & Pitch Clients",
          content: "On Upwork: search 'subtitle', 'captions', 'video editing' daily and apply to 10 jobs with personalized proposals. On Instagram/TikTok: find creators with 10k–200k followers who lack captions and send DMs. Offer one free video sample to break through skepticism.",
          tips: ["The free sample offer converts at 40–60% when done correctly", "Target niches: fitness, cooking, education, personal finance creators"],
        },
        {
          step: 4,
          title: "Close Your First Client",
          content: "Use the Upwork outreach template. Offer a free sample video. Upon approval, charge for the first paid project. Deliver within the promised timeframe. Request a 5-star review immediately after delivery.",
          tips: ["Payment: Upwork escrow protects you. For direct clients, use Stripe or PayPal with 50% upfront.", "Always confirm video format and language before starting"],
        },
      ],
    },
  },
  {
    id: "restaurant-social-media",
    title: "Restaurant Social Media Manager",
    category: "Freelance Services",
    targetClients: "Local Restaurants and Cafés",
    demandScore: 79,
    competition: "Medium",
    startupCost: "$0",
    timeToFirstClient: "3–5 days",
    incomeMin: 800,
    incomeMax: 2000,
    isNew: false,
    publishedAt: "2025-01-05",
    overview:
      "Restaurants are one of the most active industries on social media yet one of the most under-served. Most restaurant owners know they need Instagram, TikTok, and Google presence but have no time to create content consistently. AI tools now allow a single freelancer to manage 3–5 restaurant accounts simultaneously — creating posts, reels, and stories in batch. This is a high-retention, recurring-income service with very low competition from specialized freelancers.",
    marketEvidence:
      "73% of diners say they research restaurants on Instagram before visiting. Google My Business posts increase restaurant foot traffic by an average of 18%. The average restaurant spends $500–$2,000/month on social media if they hire a local agency — freelancers can undercut by 40% while offering better personalization. Upwork shows 1,200+ restaurant social media jobs posted monthly. Local Facebook business groups in any city consistently show restaurant owners asking for social media help.",
    toolsStack: [
      { name: "ChatGPT", purpose: "Caption writing, hashtag research, content calendar", link: "https://chat.openai.com", isFree: true },
      { name: "Canva", purpose: "Post design with restaurant templates", link: "https://canva.com", isFree: true },
      { name: "Buffer or Later", purpose: "Scheduled posting across platforms", link: "https://buffer.com", isFree: false },
      { name: "CapCut", purpose: "Short video / reel creation", link: "https://capcut.com", isFree: true },
      { name: "Google My Business", purpose: "Managing restaurant search presence", link: "https://business.google.com", isFree: true },
    ],
    pricingStrategy: [
      {
        packageName: "Starter",
        price: 300,
        currency: "USD",
        features: ["12 posts/month", "Instagram only", "Caption + design", "Hashtag research", "Monthly report"],
        description: "Low-barrier entry for skeptical restaurant owners",
      },
      {
        packageName: "Growth",
        price: 600,
        currency: "USD",
        features: ["20 posts/month", "Instagram + Facebook + Google", "4 reels/month", "Story content", "Review response", "Bi-weekly report"],
        description: "Most popular — provides real multi-platform coverage",
      },
      {
        packageName: "Premium",
        price: 1200,
        currency: "USD",
        features: ["Unlimited posts", "All platforms + TikTok", "8 reels/month", "Influencer outreach", "Monthly analytics call", "Ad management"],
        description: "For restaurants serious about growth and willing to invest",
      },
    ],
    clientAcquisitionSystem:
      "Walk into local restaurants and cafés — ask to speak to the owner. Show them 3 competitor Instagram pages that are doing well and offer to do 7 days of free content management. Local Facebook groups for business owners are goldmines. Google Maps: find restaurants with less than 50 reviews or no posts in 60+ days and cold email them. LinkedIn works for chain restaurant managers. Nextdoor is excellent for neighborhood cafés.",
    outreachTemplates: [
      {
        platform: "In-Person / Walk-in",
        body: "Hi, I'm a social media specialist who works with local restaurants. I noticed your Instagram hasn't been updated in a while — I'd love to offer you 7 days of free content to show you what consistent posting can do for your foot traffic. No commitment. Can I show you a quick example?",
      },
      {
        platform: "Cold Email",
        subject: "More customers from Instagram — free 7-day trial",
        body: "Hi [Owner Name], I help local restaurants get more foot traffic using Instagram and Google. I noticed [Restaurant Name] hasn't posted recently — I'd like to offer a free 7-day trial of my social media service so you can see the results before spending anything. Would a 10-minute call work this week?",
      },
    ],
    executionBlueprint: {
      marketOverview:
        "Restaurant social media is a $2.1B freelance market that is massively underserved at the local level. National agencies charge $2,000–$5,000/month and ignore small restaurants. The opportunity is in hyper-local, personalized content that agencies can't scale.",
      servicePackaging:
        "Batch-create content 2x per month (4 hours per client). Use Canva templates to maintain speed. Deliver scheduled posts via Buffer. Monthly analytics reports justify the retainer.",
      toolsSetup:
        "1. Create Canva Pro account (worth it at $13/month for the template library). 2. Sign up for Buffer free tier (up to 3 channels). 3. Set up ChatGPT for bulk caption generation. 4. Create a content calendar template in Notion or Google Sheets.",
      clientAcquisition:
        "Day 1–3: Visit 5 local restaurants, pitch the free trial. Day 4–7: Email 20 restaurants found via Google Maps. Week 2: Join local business Facebook groups and offer value before pitching. Week 3: Ask for referrals from any interested restaurants.",
      pricingModel:
        "Start at $300/month for 1–2 clients to build case studies. After 3 months, raise to $600/month. With 5 clients at $600/month = $3,000/month recurring. Goal: 3 clients at $1,000+/month = $3,000 stable income.",
      deliveryWorkflow: [
        {
          step: 1,
          title: "Setup Tools & Templates",
          content: "Create Canva restaurant templates (food photography frames, menu highlights, event announcements). Set up Buffer account. Build a content calendar template with categories: food spotlight, behind-the-scenes, customer testimonial, promotion, seasonal.",
          tips: ["Create 10 reusable Canva templates per restaurant to maintain brand consistency"],
        },
        {
          step: 2,
          title: "Create Service Packages",
          content: "Build a simple one-page PDF or Canva proposal showing your 3 packages. Include example Instagram pages you've managed or mock examples. Show the ROI: 'Restaurants with consistent posting see 15–30% more online orders.'",
          tips: ["Include a competitor comparison in your proposal showing what similar restaurants post"],
        },
        {
          step: 3,
          title: "Find & Pitch Clients",
          content: "Target restaurants with: low Instagram following (under 1k), no posts in 30+ days, poor Google review responses. Walk in during off-peak hours (2–4pm). Offer the free 7-day trial. Collect email for follow-up.",
          tips: ["Bring a printed 1-page pitch. Physical materials increase trust with restaurant owners."],
        },
        {
          step: 4,
          title: "Close First Client",
          content: "After the free trial, schedule a 20-minute review call. Show them the engagement data. Present your packages. Offer a 2-month contract at a slight discount. Collect payment upfront via bank transfer or Stripe.",
          tips: ["Anchor with the Premium price first, then let them 'choose' Growth. Most pick the middle."],
        },
      ],
    },
  },
  {
    id: "podcast-content-repurposing",
    title: "Podcast Content Repurposing Service",
    category: "AI Services",
    targetClients: "Podcast Hosts and Business Coaches",
    demandScore: 85,
    competition: "Low",
    startupCost: "$0",
    timeToFirstClient: "1–2 weeks",
    incomeMin: 2000,
    incomeMax: 5000,
    isNew: true,
    publishedAt: "2025-01-12",
    overview:
      "There are 4+ million podcasts worldwide and the vast majority of episodes are never repurposed. AI tools can now transcribe a 60-minute episode and extract 10+ short clips, 5 blog posts, 20 social media captions, and an email newsletter — all in under 2 hours. Podcast hosts are desperate for help turning their audio content into text and video assets, and they pay premium prices for someone who can reliably deliver this week after week.",
    marketEvidence:
      "HubSpot data shows podcast-to-blog repurposing generates 3x more SEO traffic for the same effort. Riverside.fm reports that 78% of podcasters want to repurpose content but only 22% actually do it consistently. On Fiverr, podcast repurposing gigs with strong reviews earn $2,000–$8,000/month. Creator economy newsletters (Influence Weekly, The Information) report that content repurposing is a top-5 outsourced task for podcasters in 2024–2025.",
    toolsStack: [
      { name: "Descript", purpose: "Transcription and audiogram creation", link: "https://descript.com", isFree: false },
      { name: "Claude AI or ChatGPT", purpose: "Blog post and caption generation from transcript", link: "https://claude.ai", isFree: true },
      { name: "Opus Clip", purpose: "AI-powered short clip extraction from long video", link: "https://opus.pro", isFree: true },
      { name: "Canva", purpose: "Quote cards and audiogram visuals", link: "https://canva.com", isFree: true },
      { name: "Riverside.fm", purpose: "High-quality podcast recording (refer clients)", link: "https://riverside.fm", isFree: false },
    ],
    pricingStrategy: [
      {
        packageName: "Clips Only",
        price: 150,
        currency: "USD",
        features: ["5 short clips (60–90 sec)", "Captions added", "Formatted for Instagram/TikTok/LinkedIn", "3-day delivery"],
        description: "Low-commitment entry point to prove your value",
      },
      {
        packageName: "Full Repurpose",
        price: 350,
        currency: "USD",
        features: ["10 short clips", "1 blog post (800–1200 words)", "Email newsletter", "20 social captions", "5 quote cards", "5-day delivery"],
        description: "Core offer — best ROI for podcast hosts",
      },
      {
        packageName: "Ongoing Partner",
        price: 1200,
        currency: "USD",
        features: ["Weekly episode repurposing (4/month)", "Full repurpose package each episode", "SEO-optimized blog posts", "Priority 48hr delivery", "Monthly strategy call"],
        description: "Retainer model for maximum income stability",
      },
    ],
    clientAcquisitionSystem:
      "Listen to 10 podcasts in your target niche (business, health, finance). Go to their show notes — if there's no blog post, no clips, no newsletter summary, they need you. Email the host directly using the template below. Podcast Facebook groups and Slack communities are excellent hunting grounds. Search Spotify/Apple Podcasts for shows with 1k–50k listeners — big enough to have budget, small enough to not have a team.",
    outreachTemplates: [
      {
        platform: "Direct Email to Podcast Host",
        subject: "Repurposing your episodes into 10x more content",
        body: "Hi [Name], I'm a podcast content specialist. I listened to your recent episode on [topic] and noticed it hasn't been repurposed into clips or a blog post yet.\n\nI can turn every episode into: 10 short clips, 1 SEO blog post, 20 social captions, and an email newsletter — all delivered in 48 hours.\n\nI'd like to do your last episode completely free so you can see the output quality. Interested?",
      },
      {
        platform: "Twitter/X DM",
        body: "Hey [Name] — big fan of your pod. Quick idea: I repurpose podcast episodes into clips, blogs, and newsletters using AI. Your episode on [topic] would make amazing TikTok content. Want me to do a free clip package from it?",
      },
    ],
    executionBlueprint: {
      marketOverview:
        "The podcast industry generates $4B+ in ad revenue annually and is growing 20% YoY. The biggest bottleneck isn't recording — it's distribution across platforms. AI has eliminated the time cost of repurposing, making this a scalable, high-margin service.",
      servicePackaging:
        "Sell the Full Repurpose at $350 as your anchor. Once a client experiences the value after episode 1, transition to the $1,200/month Ongoing Partner retainer. With 4 retainer clients, you hit $4,800/month.",
      toolsSetup:
        "1. Sign up for Descript (paid tier for transcription speed). 2. Get Opus Clip free account for clip extraction. 3. Set up Claude AI prompt templates for blog post generation from transcripts. 4. Build a Canva quote card template for each client's brand.",
      clientAcquisition:
        "Week 1: Identify 30 target podcasts via Spotify. Email 10/day. Week 2: Join 3 podcast Facebook groups and contribute value before pitching. Week 3: Apply to Upwork podcast repurposing jobs. Week 4: Follow up with all previous contacts.",
      pricingModel:
        "Entry at $150 for clips to collect reviews. Upsell to $350 Full Repurpose. Lock in retainers at $1,200/month after proving value. Target: 4 retainer clients = $4,800/month.",
      deliveryWorkflow: [
        {
          step: 1,
          title: "Setup Tools",
          content: "Create Descript account, upload a sample podcast episode, generate transcript. Set up Opus Clip and connect your video account. Build 3 ChatGPT/Claude prompt templates: one for blog posts, one for social captions, one for email newsletters.",
          tips: ["Use a system prompt like: 'You are a podcast content specialist. Convert the following transcript into [output type]. Maintain the host's voice and key talking points.'"],
        },
        {
          step: 2,
          title: "Create Service Packages",
          content: "Build a portfolio page (Notion or Carrd) showing example repurposed content for 2–3 fake episodes. Create 3 package pricing cards. Write your outreach email templates.",
          tips: ["Create a sample portfolio from a Creative Commons podcast to show real output quality"],
        },
        {
          step: 3,
          title: "Find & Pitch Podcast Hosts",
          content: "Search Spotify, Apple Podcasts for shows in business/health/finance with 1k–100k listeners. Check if they have no blog, no clips, no newsletter. Personalize each email with a reference to a specific episode topic.",
          tips: ["Personalization increases reply rate from 2% to 15–25%"],
        },
        {
          step: 4,
          title: "Close Your First Client",
          content: "Free episode offer converts at ~30–40%. After delivery, send a results summary: 'Here are the 10 clips, blog post, and 20 captions from your episode. How's the quality?' Then present the retainer option.",
          tips: ["Send the free work as a Google Drive folder — makes it feel more professional than an email attachment"],
        },
      ],
    },
  },
  {
    id: "whatsapp-automation",
    title: "WhatsApp Automation for Medical Clinics",
    category: "Automation Services",
    targetClients: "Medical Clinics and Healthcare Providers",
    demandScore: 91,
    competition: "Low",
    startupCost: "$29",
    timeToFirstClient: "2–3 weeks",
    incomeMin: 1500,
    incomeMax: 4000,
    isNew: true,
    publishedAt: "2025-01-14",
    overview:
      "Medical clinics lose 20–30% of appointment revenue to no-shows. WhatsApp automation bots can send appointment reminders, collect confirmations, handle rescheduling requests, and answer FAQs — automatically. In regions where WhatsApp is the dominant communication channel (MENA, Latin America, Africa, Southeast Asia), this is a highly specialized, premium-priced service with almost no local competition. Setup takes 4–6 hours per clinic and ongoing management is minimal.",
    marketEvidence:
      "WHO data shows no-show rates in clinics average 23% globally — costing clinics $150–$300 per missed appointment. WhatsApp Business API usage in MENA has grown 340% since 2022. Make.com (formerly Integromat) reports healthcare as its #2 fastest-growing automation category. On Upwork, 'WhatsApp bot' jobs in healthcare pay $500–$2,000 per setup. Clinics that implemented automated reminders saw no-show rates drop to 8–12% according to a 2023 study in the Journal of Medical Practice Management.",
    toolsStack: [
      { name: "Make.com (Integromat)", purpose: "Visual automation workflow builder", link: "https://make.com", isFree: false },
      { name: "Twilio WhatsApp API or 360dialog", purpose: "WhatsApp message sending infrastructure", link: "https://twilio.com", isFree: false },
      { name: "Google Sheets or Airtable", purpose: "Appointment database and trigger source", link: "https://sheets.google.com", isFree: true },
      { name: "ChatGPT API (optional)", purpose: "AI-powered FAQ responses in chat", link: "https://platform.openai.com", isFree: false },
      { name: "Calendly", purpose: "Online booking integration", link: "https://calendly.com", isFree: true },
    ],
    pricingStrategy: [
      {
        packageName: "Starter Bot",
        price: 500,
        currency: "USD",
        features: ["Appointment reminder automation", "Confirmation/cancellation handling", "Basic FAQ bot", "Setup + 30-day support"],
        description: "One-time setup fee — get a clinic running in 48 hours",
      },
      {
        packageName: "Pro Clinic Bot",
        price: 1200,
        currency: "USD",
        features: ["Full reminder + rescheduling automation", "Multi-doctor scheduling", "Patient intake forms", "Analytics dashboard", "Setup + 90-day support"],
        description: "Complete solution for multi-doctor clinics",
      },
      {
        packageName: "Maintenance Retainer",
        price: 200,
        currency: "USD",
        features: ["Monthly check-ins", "Updates and changes", "Priority support", "Monthly no-show report"],
        description: "Ongoing monthly fee to maintain and improve the system",
      },
    ],
    clientAcquisitionSystem:
      "Cold call or visit clinics directly — ask to speak with the clinic manager or owner, not the receptionist. Bring a one-page PDF showing the no-show statistics and ROI calculation. LinkedIn is excellent for reaching clinic owners and practice managers. Medical association Facebook groups and Telegram channels in your region. Google Maps: search 'clinic', 'medical center' in your city — call the ones with reviews mentioning 'hard to reach' or 'no response'.",
    outreachTemplates: [
      {
        platform: "In-Person Clinic Visit",
        body: "Hi, I help medical clinics reduce no-shows by 50–70% using WhatsApp automation. The average clinic loses $3,000–$5,000/month to no-shows. I set up an automated reminder system that pays for itself in the first month. Can I show your manager a 5-minute demo?",
      },
      {
        platform: "LinkedIn Message to Clinic Owner",
        body: "Hi Dr. [Name], I noticed [Clinic Name] has great reviews but I know no-shows are a persistent challenge in medical practice. I set up WhatsApp automation bots for clinics that reduce no-shows by 50–70% — the system pays for itself in the first month of reduced missed appointments. Would a quick 15-min call this week be possible?",
      },
    ],
    executionBlueprint: {
      marketOverview:
        "Healthcare is the most recession-proof vertical for automation services. Clinics have high average revenue per appointment ($50–$500+) making automation ROI extremely easy to demonstrate. WhatsApp penetration in MENA (95%+), Latin America (90%+), and Southeast Asia (80%+) makes this a globally scalable service.",
      servicePackaging:
        "Lead with the ROI pitch: 'If you have 10 no-shows per week at $100 average appointment value, you're losing $1,000/week = $4,000/month. My $500 setup fee pays for itself in 5 days.' Then offer the $200/month maintenance retainer for ongoing income.",
      toolsSetup:
        "1. Create a Make.com account (Core plan at $9/month). 2. Sign up for 360dialog (WhatsApp Business API, cheapest option). 3. Build a template automation in Make.com with a Google Sheets trigger. 4. Test with a dummy appointment database.",
      clientAcquisition:
        "Week 1: Visit 5 local clinics. Week 2: Connect with 20 clinic managers on LinkedIn. Week 3: Join medical professional Facebook groups and share a no-show statistics post (no pitch — just value). Week 4: Follow up with all clinic visits.",
      pricingModel:
        "Charge $500 setup for Starter, $1,200 for Pro. Plus $200/month maintenance. After 5 clients: $1,000/month recurring + $1,000–$2,000 in new setups = $2,000–$3,000/month minimum.",
      deliveryWorkflow: [
        {
          step: 1,
          title: "Setup Tools",
          content: "Create Make.com account and build a sample WhatsApp reminder automation using a test Google Sheet as the appointment source. Connect Twilio or 360dialog sandbox. Test end-to-end flow with your own phone number.",
          tips: ["360dialog is cheaper than Twilio for high-volume WhatsApp messages — start with their free sandbox"],
        },
        {
          step: 2,
          title: "Build Your Demo",
          content: "Create a 5-minute Loom video demonstrating the automation working. Show an appointment being added to a Google Sheet → WhatsApp message sent → patient confirms → calendar updated. This demo closes 70% of interested clinic owners.",
          tips: ["Record the demo in English and Arabic if targeting MENA clinics"],
        },
        {
          step: 3,
          title: "Find & Pitch Clinics",
          content: "Target clinics with: 3+ doctors, 50+ reviews on Google, WhatsApp number listed on website. Visit in person during non-peak hours (2–5pm). Lead with the no-show ROI calculation specific to their clinic size.",
          tips: ["Prepare a 1-page ROI calculator: '# of weekly no-shows × appointment value × 4 = monthly loss'"],
        },
        {
          step: 4,
          title: "Close and Deliver",
          content: "Collect 50% deposit before starting. Setup takes 4–6 hours. Deliver a 30-day no-show report to prove ROI. Then pitch the $200/month maintenance retainer. Most satisfied clients convert to retainer.",
          tips: ["Use a simple service agreement (1 page) to protect yourself and build trust"],
        },
      ],
    },
  },
  {
    id: "ai-content-repurposing",
    title: "AI Content Repurposing for Coaches",
    category: "AI Services",
    targetClients: "Business Coaches and Online Course Creators",
    demandScore: 82,
    competition: "Medium",
    startupCost: "$0",
    timeToFirstClient: "1–2 weeks",
    incomeMin: 1500,
    incomeMax: 4000,
    isNew: false,
    publishedAt: "2024-12-28",
    overview:
      "Business coaches and course creators produce hours of webinar, live call, and training content that sits unwatched after the initial broadcast. AI now makes it trivial to transform a 90-minute coaching call into a complete content library: blog posts, email sequences, social media posts, YouTube Shorts, and quote graphics. This high-value service sells for $200–$800/month per client with very strong retention once the value is proven.",
    marketEvidence:
      "The coaching industry is worth $15B globally and growing 6.7% annually. Survey data from the International Coaching Federation shows 81% of coaches want to repurpose their content but don't know how. AI content tools have reduced production time by 80%, making this highly scalable. ConvertKit reports coaches with consistent email newsletters earn 3.2× more than those without. Upwork data shows 'content repurposing' job postings grew 89% in 2024.",
    toolsStack: [
      { name: "Claude AI", purpose: "Long-form content generation from transcripts", link: "https://claude.ai", isFree: true },
      { name: "Otter.ai", purpose: "Call/webinar transcription", link: "https://otter.ai", isFree: true },
      { name: "Opus Clip", purpose: "Short video clip extraction", link: "https://opus.pro", isFree: true },
      { name: "Canva", purpose: "Quote graphics and carousel posts", link: "https://canva.com", isFree: true },
      { name: "Beehiiv or ConvertKit", purpose: "Newsletter drafting and delivery", link: "https://beehiiv.com", isFree: true },
    ],
    pricingStrategy: [
      {
        packageName: "Single Session",
        price: 200,
        currency: "USD",
        features: ["1 coaching session repurposed", "5 social posts", "1 blog post", "1 email newsletter", "5 short clips"],
        description: "One-time project to prove value",
      },
      {
        packageName: "Monthly Bundle",
        price: 600,
        currency: "USD",
        features: ["4 sessions/month repurposed", "Weekly social content", "4 blog posts", "4 email newsletters", "20 short clips"],
        description: "Recurring retainer for coaches with weekly calls",
      },
      {
        packageName: "Content Partner",
        price: 1200,
        currency: "USD",
        features: ["Unlimited session repurposing", "Full social media management", "SEO blog posts", "Email sequence writing", "YouTube thumbnail design"],
        description: "Full-service content partner for serious coaches",
      },
    ],
    clientAcquisitionSystem:
      "Find coaches through LinkedIn (search 'business coach', 'life coach', 'executive coach'), Instagram (hashtags #businesscoach #onlinecoach), and podcast directories. Look for coaches with: active YouTube/podcast but no consistent social posts, email list but infrequent newsletters, webinars but no follow-up content. Offer a free repurpose of their most recent webinar or coaching call.",
    outreachTemplates: [
      {
        platform: "LinkedIn",
        body: "Hi [Name], I work with coaches to turn their existing calls and webinars into full content libraries — blog posts, social clips, email newsletters — using AI. I noticed your recent webinar on [topic] hasn't been repurposed yet. I'd love to do it free so you can see the output. Want me to send over the package?",
      },
      {
        platform: "Instagram DM",
        body: "Hey [Name]! I love your coaching content. I specialize in repurposing coaching calls into clips, posts, and newsletters using AI — usually turning 1 hour into a month of content. Happy to do your last session for free?",
      },
    ],
    executionBlueprint: {
      marketOverview:
        "The creator-coach economy is exploding, with $300M+ in revenue from online courses and coaching programs. The bottleneck is content distribution, not content creation. Coaches who publish consistently earn 3× more than those who don't.",
      servicePackaging:
        "Start with $200 single session to prove value. Upsell to $600/month bundle within 30 days. Lock in $1,200 Content Partner retainer for premium clients. 3 retainer clients = $3,600/month.",
      toolsSetup:
        "1. Create Otter.ai account for call transcription. 2. Set up Claude AI with a system prompt for content repurposing. 3. Build Canva templates for the coach's brand. 4. Create a delivery template in Notion showing all content pieces.",
      clientAcquisition:
        "Week 1: Identify 20 coaches on LinkedIn and Instagram. Week 2: Send 10 personalized DMs/day with the free offer. Week 3: Follow up and deliver free samples. Week 4: Convert free clients to paid.",
      pricingModel:
        "Entry at $200. Retainer at $600. Scale to $1,200. 3 retainer clients = $3,600 monthly stable income.",
      deliveryWorkflow: [
        {
          step: 1,
          title: "Setup Tools",
          content: "Set up Otter.ai, configure Claude AI prompt library, build Canva brand templates. Create a delivery checklist: transcript → blog post → 5 social captions → email → 5 clips → 5 quote cards.",
          tips: ["Build prompt templates once, reuse for every client — reduces per-session time to under 2 hours"],
        },
        {
          step: 2,
          title: "Create Packages",
          content: "Build a 1-page service PDF. Include an example deliverable set from a sample session. Show the coach what they'd receive after each session repurpose.",
          tips: ["Show, don't tell — a concrete example package converts 5× better than a description"],
        },
        {
          step: 3,
          title: "Find Coaches",
          content: "LinkedIn Sales Navigator or manual search. Instagram hashtags. Podcast listener lists. Referrals from other service providers (virtual assistants, email marketers).",
          tips: ["Coaches who run group programs are the best clients — they produce 4+ hours of content weekly"],
        },
        {
          step: 4,
          title: "Close First Client",
          content: "Free session repurpose → impressive delivery → monthly retainer pitch. Make the ROI case: 'You spent 2 hours on that call. I turned it into 30 days of content. That's worth $600/month easily.'",
          tips: ["Always deliver the free work before pitching — trust converts much better than persuasion"],
        },
      ],
    },
  },
  {
    id: "crm-automation-smb",
    title: "CRM Automation Setup for Small Businesses",
    category: "Automation Services",
    targetClients: "E-commerce Stores and Service Businesses",
    demandScore: 76,
    competition: "Low",
    startupCost: "$0",
    timeToFirstClient: "2–3 weeks",
    incomeMin: 1000,
    incomeMax: 3500,
    isNew: false,
    publishedAt: "2024-12-20",
    overview:
      "Most small businesses use CRM tools like HubSpot, GoHighLevel, or Zoho but have them set up incorrectly or barely at all. A well-configured CRM with automated follow-up sequences, lead scoring, and pipeline management can increase a small business's revenue by 20–40% without adding headcount. Freelancers who understand even one CRM platform can charge $500–$2,000 per setup project plus $300–$500/month for management.",
    marketEvidence:
      "Salesforce reports that businesses using CRM automation increase sales productivity by 34%. The global CRM market is $70B and growing. GoHighLevel alone has 60,000+ agency users, all of whom need clients. On Upwork, HubSpot and GoHighLevel configuration jobs consistently pay $50–$150/hour. Google Trends shows 'CRM setup freelancer' searches up 45% YoY.",
    toolsStack: [
      { name: "GoHighLevel", purpose: "All-in-one CRM and automation platform", link: "https://gohighlevel.com", isFree: false },
      { name: "HubSpot", purpose: "Free CRM with powerful automation", link: "https://hubspot.com", isFree: true },
      { name: "Zapier or Make.com", purpose: "Cross-platform automation", link: "https://zapier.com", isFree: true },
      { name: "Loom", purpose: "Client training video delivery", link: "https://loom.com", isFree: true },
    ],
    pricingStrategy: [
      {
        packageName: "Basic Setup",
        price: 500,
        currency: "USD",
        features: ["CRM configuration", "3 automation workflows", "Contact import", "Training video", "30-day support"],
        description: "Get a business CRM-ready in 3–5 days",
      },
      {
        packageName: "Full Implementation",
        price: 1500,
        currency: "USD",
        features: ["Complete CRM setup", "10+ workflows", "Email sequences", "Pipeline stages", "Integrations", "3 Loom training videos", "90-day support"],
        description: "Complete hands-off setup for serious businesses",
      },
      {
        packageName: "Monthly Management",
        price: 400,
        currency: "USD",
        features: ["Monthly optimization", "New workflow additions", "Report generation", "Priority support"],
        description: "Ongoing management retainer",
      },
    ],
    clientAcquisitionSystem:
      "Target e-commerce stores ($500k+ revenue), real estate agents, insurance brokers, and marketing agencies. LinkedIn is the best channel. Facebook groups for business owners and entrepreneurs. GoHighLevel has its own affiliate program — refer clients for recurring commission.",
    outreachTemplates: [
      {
        platform: "LinkedIn",
        body: "Hi [Name], I help [business type] set up CRM automation systems that follow up with leads automatically — most of my clients see 20–30% more conversions from the same number of leads. I'd love to do a free CRM audit of your current setup. Can I send you a short questionnaire?",
      },
    ],
    executionBlueprint: {
      marketOverview:
        "CRM adoption is growing but execution quality is poor. Most business owners buy a CRM but never configure it properly. A skilled freelancer can become the 'CRM expert' their clients call for every new business need.",
      servicePackaging:
        "Project-based setup fees + monthly retainer for management. GoHighLevel SaaS arbitrage model: resell at $297/month, pay $97/month, keep $200 margin per client.",
      toolsSetup:
        "1. Get certified in HubSpot (free, 4 hours). 2. Create a GoHighLevel account or subaccount. 3. Build 3 template automation workflows: lead nurture, appointment booking, follow-up sequence.",
      clientAcquisition:
        "LinkedIn outreach + Facebook business groups + cold email to e-commerce stores found via Google Maps and Shopify store directories.",
      pricingModel:
        "Setup: $500–$1,500 per client. Management: $400/month. 5 retainer clients = $2,000/month stable income + project fees.",
      deliveryWorkflow: [
        { step: 1, title: "Get Certified", content: "Complete HubSpot CRM certification (free, 4 hours). Build a practice CRM with mock business data to develop confidence.", tips: ["HubSpot Academy certifications are respected by clients and visible on LinkedIn"] },
        { step: 2, title: "Build Demo Assets", content: "Create a Loom walkthrough of a sample CRM setup. Show lead capture → automatic follow-up → pipeline stages. Use this as your sales tool.", tips: [] },
        { step: 3, title: "Find Clients", content: "LinkedIn: search 'small business owner', 'real estate agent', 'e-commerce founder'. Send 15 outreach messages daily. Join Facebook groups for entrepreneurs.", tips: [] },
        { step: 4, title: "Close and Deliver", content: "Discovery call to understand their needs. Quote the project. Collect 50% deposit. Deliver in stages: setup → training → handoff. Pitch retainer at the end.", tips: ["Loom training videos reduce support requests by 80%"] },
      ],
    },
  },
  {
    id: "short-form-video-editor",
    title: "Short-Form Video Editing for TikTok Creators",
    category: "Freelance Services",
    targetClients: "TikTok and Instagram Reel Creators",
    demandScore: 83,
    competition: "High",
    startupCost: "$0",
    timeToFirstClient: "1 week",
    incomeMin: 800,
    incomeMax: 2500,
    isNew: false,
    publishedAt: "2024-12-15",
    overview:
      "TikTok has 1 billion+ active users and over 100 million creators posting regular content. The editing bottleneck is real: creators who post 1–2x/day consistently outgrow their own editing capacity within weeks. AI-assisted editing tools have made it possible to process 10–15 videos per day as a solo freelancer, opening up a scalable income stream. Competition is high but demand is higher — the key differentiator is speed, consistency, and understanding platform trends.",
    marketEvidence:
      "TikTok reports that creators who post 3–5x/week grow 4× faster than those posting 1×/week. On Fiverr, top video editing gigs generate $5,000–$15,000/month. Influencer marketing agencies report 'video editing' as their #1 outsourced service. The global video editing market is valued at $932M and growing 8.5% annually.",
    toolsStack: [
      { name: "CapCut", purpose: "Fast TikTok-optimized editing with AI features", link: "https://capcut.com", isFree: true },
      { name: "Premiere Pro or DaVinci Resolve", purpose: "Professional editing for premium clients", link: "https://adobe.com", isFree: false },
      { name: "Epidemic Sound", purpose: "Royalty-free music library", link: "https://epidemicsound.com", isFree: false },
      { name: "Canva", purpose: "Thumbnail and overlay design", link: "https://canva.com", isFree: true },
    ],
    pricingStrategy: [
      {
        packageName: "Basic",
        price: 30,
        currency: "USD",
        features: ["1 video edited", "Captions", "Music", "Color grading", "24hr delivery"],
        description: "Entry-level for creators testing you out",
      },
      {
        packageName: "Bundle",
        price: 200,
        currency: "USD",
        features: ["10 videos/month", "Captions", "Music + sound effects", "Color grading", "Thumbnails"],
        description: "Best value for active daily creators",
      },
      {
        packageName: "Partner",
        price: 500,
        currency: "USD",
        features: ["30 videos/month", "Priority 12hr delivery", "Trend research", "Script feedback", "Thumbnail A/B testing"],
        description: "Full editing partner for serious growth-focused creators",
      },
    ],
    clientAcquisitionSystem:
      "TikTok itself: comment on creator videos saying 'I can edit this style'. Reddit communities: r/NewTubers, r/TikTokCreators. Discord servers for content creators. Upwork and Fiverr with a portfolio of sample edits.",
    outreachTemplates: [
      {
        platform: "TikTok Comment",
        body: "Love this content! I'm a video editor specializing in TikTok. I can edit 10 videos/month for $200 with same-day delivery. DM me if interested!",
      },
      {
        platform: "Reddit",
        body: "Hi [Name], I noticed you're looking for a video editor. I specialize in TikTok and Reels. Here's my portfolio [link]. I can do 1 free edit to show you my style — interested?",
      },
    ],
    executionBlueprint: {
      marketOverview:
        "TikTok's creator economy is $250B+ with 150M US users alone. The platform heavily rewards consistent posting — making editing assistance a necessity for serious creators.",
      servicePackaging:
        "Price per video for beginners, monthly bundles for growing creators. Add-ons: thumbnail design, caption writing, trend research. Goal: 5 clients at $200/month bundle = $1,000/month minimum.",
      toolsSetup: "1. Master CapCut (1 week of daily practice). 2. Create a portfolio of 5 sample edits in different styles. 3. Set up Fiverr and Upwork profiles with keyword-optimized titles.",
      clientAcquisition: "Fiverr and Upwork profiles, TikTok community engagement, Reddit creator communities. Offer 1 free edit for new clients.",
      pricingModel: "Start at $30/video to build reviews. Raise to $50 after 10 reviews. Bundle 10 videos at $200 = $20/video. Monthly retainer goal: 5 clients × $200 = $1,000.",
      deliveryWorkflow: [
        { step: 1, title: "Master CapCut", content: "Learn CapCut's AI features: auto-captions, background removal, beat sync, transitions. Practice editing 5 videos daily for one week.", tips: ["CapCut is free and has 90% of what TikTok creators need"] },
        { step: 2, title: "Build Portfolio", content: "Create 5 sample edits in different niches: finance, fitness, food, comedy, education. Post them publicly.", tips: [] },
        { step: 3, title: "Get First Clients", content: "Apply to 10 Upwork/Fiverr jobs daily. Comment on TikTok creator communities. Offer 1 free edit.", tips: [] },
        { step: 4, title: "Scale to Bundles", content: "After first 5 reviews, pitch monthly bundle to all one-time clients. Batch-edit to maintain speed and quality.", tips: [] },
      ],
    },
  },
];

export const CATEGORIES: Category[] = [
  "AI Services",
  "Freelance Services",
  "Automation Services",
  "Digital Arbitrage",
  "Micro SaaS Ideas",
];
