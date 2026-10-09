export const services = [
  {
    title: "Marketing",
    href: "/marketing",
    copy: "Build awareness, create demand, and influence decisions with strategy informed by how people think.",
  },
  {
    title: "Business Development",
    href: "/business-development",
    copy: "Finding opportunities and building relationships that create growth.",
  },
  {
    title: "Strategic Partnerships",
    href: "/strategic-partnerships",
    copy: "Connecting people, businesses, and opportunities where shared interests create value.",
  },
  {
    title: "Behavioral Insight",
    href: "/behavioral-insight",
    copy: "Understand what drives people to decide, act, and buy.",
  },
];

export const heroCapabilities = [
  ["MARKETING", "Build awareness. Create demand. Influence decisions."],
  ["BUSINESS DEVELOPMENT", "Find opportunities. Build relationships. Create growth."],
  ["REAL ESTATE", "Identify opportunities. Connect capital. Facilitate transactions."],
  ["BEHAVIORAL INSIGHT", "Understand what drives people to decide, act, and buy."],
];

export const realEstateAreas = [
  {
    id: "acquisitions",
    title: "Acquisitions",
    copy: "Identifying properties and opportunities aligned with investor and strategic objectives.",
  },
  {
    id: "due-diligence",
    title: "Due Diligence",
    copy: "Evaluating the property, numbers, market, and risks to better understand the opportunity.",
  },
  {
    id: "investment-opportunities",
    title: "Investment Opportunities",
    copy: "Showcasing qualified off-market and investment opportunities.",
  },
  {
    id: "investor-network",
    title: "Investor Relations",
    navLabel: "Investor Network",
    copy: "Building relationships that connect capital, opportunities, and experience.",
  },
  {
    id: "dispositions",
    title: "Dispositions",
    copy: "Connecting properties with qualified buyers and investor relationships.",
  },
  {
    id: "strategic-partnerships",
    title: "Strategic Partnerships",
    copy: "Connecting owners, investors, operators, lenders, and other professionals where there is mutual value.",
  },
];

export const approachSteps = [
  ["Understand the Opportunity", "Frame the context, goals, and decisions that matter."],
  ["Understand the People", "Bring customer, stakeholder, and relationship insight into the work."],
  ["Use Data & Insight", "Use evidence and behavioral understanding to inform strategy."],
  ["Build the Right Relationships", "Connect people and organizations where shared interests create value."],
  ["Execute & Measure", "Turn strategy into focused action and useful learning."],
];

// Review-build schema only. No approved examples are available yet, so this
// remains unpublished and is intentionally omitted from the public homepage.
export const selectedWorkSchema = {
  id: "string",
  category: "string",
  title: "string",
  context: "string",
  role: "string",
  outcome: "string?",
  image: "string?",
  isPublished: "boolean",
  approved: "boolean",
  href: "string?",
};
export const selectedWork = [];

export const outcomes = [
  {
    title: "Increase Marketing ROI",
    copy: "Make every marketing dollar work harder.",
  },
  {
    title: "Improve Campaign Performance",
    copy: "Build campaigns backed by customer insight.",
  },
  {
    title: "Understand Customer Behavior",
    copy: "Discover what motivates decisions and actions.",
  },
  {
    title: "Reach the Right Audience",
    copy: "Identify and engage high-value prospects.",
  },
  {
    title: "Increase Conversion Rates",
    copy: "Turn more interest into measurable results.",
  },
  {
    title: "Accelerate Growth",
    copy: "Focus resources where they create impact.",
  },
  {
    title: "Strengthen Customer Engagement",
    copy: "Create experiences that build loyalty and trust.",
  },
  {
    title: "Make Smarter Decisions",
    copy: "Replace assumptions with evidence-based strategy.",
  },
];

export const industries = [
  {
    name: "Healthcare",
    gradient: "linear-gradient(135deg, #e6f4ed, #8dc9ae)",
    description:
      "Helping healthcare organizations improve patient engagement, strengthen retention, increase program participation, and deliver better outcomes.",
    points: [
      "Member and patient acquisition and retention",
      "Member and patient experience, including onboarding and quality programs",
      "Quality and gaps in care, including preventative care and intervention design",
    ],
  },
  {
    name: "Energy",
    gradient: "linear-gradient(135deg, #e4f1eb, #5caa86)",
    description:
      "Designing customer-focused programs that increase participation, improve adoption, and maximize the impact of energy initiatives.",
    points: [
      "Customer acquisition and customer experience",
      "Energy efficiency program design",
      "Energy efficiency residential marketing",
    ],
  },
  {
    name: "Financial Services",
    gradient: "linear-gradient(135deg, #e6f1ee, #7fa9a0)",
    description:
      "Applying behavioral insights to build trust, increase engagement, improve customer experiences, and support long-term financial wellness.",
    points: [
      "Encouraging financial wellness",
      "Optimizing customer growth and engagement",
      "Building customer-facing trust and transparency",
    ],
  },
  {
    name: "Higher Education",
    gradient: "linear-gradient(135deg, #e9f0e9, #8da99a)",
    points: [
      "Multi-channel marketing strategies to drive program awareness",
      "Program landing pages with clear CTAs and offerings",
      "Communication strategies to guide leads through enrollment",
    ],
  },
];

export const behavioralIndustries = industries.filter((industry) => industry.name === "Healthcare");

export const principals = [
  {
    name: "Gabriel Gonzales",
    role: "Principal, Strategy & Business Development",
    bio:
      "Gabriel brings experience across sales, marketing, business development, real estate, and relationship development, with a focus on understanding people, identifying opportunity, and creating practical paths to growth.",
  },
  {
    name: "Zay Aaron-Julian",
    role: "Principal, Campaigns and Performance",
    bio:
      "Zay focuses on campaign execution, audience engagement, and translating insights into measurable marketing action.",
  },
];

export const posts = [
  {
    title: "Hale Forster on An N of 1 podcast.",
    excerpt:
      "A conversation about marrying academic knowledge with industry research to support positive behavior change.",
    author: "GNZ Marketing",
  },
  {
    title: "Uncovering the Why: LLMs in the Next Era of Marketing Analytics",
    excerpt:
      "A short note about why understanding why something works matters more than measurement alone.",
    author: "GNZ Insights",
  },
  {
    title: "How Creative Testing Improves Marketing Confidence",
    excerpt:
      "A practical note on using pre-testing, audience signals, and iteration to reduce campaign guesswork.",
    author: "GNZ Strategy",
  },
];

export const jobs = [
  { id: "job-1", name: "", description: "", is_published: true, sort_order: 0 },
  { id: "job-2", name: "", description: "", is_published: true, sort_order: 1 },
  { id: "job-3", name: "", description: "", is_published: true, sort_order: 2 },
];

export const hubEntries = posts.map((post, index) => ({
  id: `hub-${index + 1}`,
  title: post.title,
  description: post.excerpt,
  author: post.author,
  is_published: true,
  sort_order: index,
}));
