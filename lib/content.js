export const services = [
  {
    title: "Marketing",
    href: "/marketing",
    copy: "Strategic marketing informed by human behavior.",
  },
  {
    title: "Business Development",
    href: "/business-development",
    copy: "Finding opportunities and building relationships that create growth.",
  },
  {
    title: "Real Estate",
    href: "/real-estate",
    copy: "Acquisitions, off-market opportunities, investor relationships, and dispositions.",
  },
  {
    title: "Behavioral Science",
    href: "/behavioral-sciences",
    copy: "Understanding the psychology behind decisions, communication, and action.",
  },
];

export const realEstateAreas = [
  {
    id: "acquisitions",
    title: "Acquisitions",
    copy: "Identifying properties and opportunities aligned with investor and strategic objectives.",
  },
  {
    id: "opportunities",
    title: "Opportunities",
    copy: "Connecting qualified opportunities with the right buyers, investors, and strategic partners.",
  },
  {
    id: "investor-network",
    title: "Investor Network",
    copy: "Building relationships that connect capital, opportunities, and experience.",
  },
  {
    id: "dispositions",
    title: "Dispositions",
    copy: "Connecting properties with qualified buyers and investor relationships.",
  },
];

export const approachSteps = [
  ["Understand the opportunity", "Frame the context, goals, and decisions that matter."],
  ["Understand the people involved", "Bring customer, stakeholder, and relationship insight into the work."],
  ["Use data and insight", "Use evidence and behavioral understanding to inform strategy."],
  ["Build the right relationships", "Connect people and organizations where shared interests create value."],
  ["Execute with measurable objectives", "Turn strategy into focused action and useful learning."],
];

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
    role: "Principal, Strategy and Client Growth",
    bio:
      "Gabriel brings a practical operator's mindset to marketing strategy, client relationships, and growth planning.",
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
