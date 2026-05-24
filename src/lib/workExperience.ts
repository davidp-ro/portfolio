export type WorkExpItem = {
  title: string;
  company: string;
  imgPath: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
};

export const WORK_EXPERIENCE: WorkExpItem[] = [
  {
    title: "Founding Software Engineer",
    company: "SalesKick",
    imgPath: "/company_logos/saleskick-logo.jpg",
    location: "Scottsdale, USA",
    startDate: "Sep 2023",
    endDate: "Present",
    description: [
      "Architected and scaled distributed backend systems powering high-volume lead engagement, scheduling, and automated sales workflows across the platform.",
      "Designed and implemented a ranked slot-generation and scheduling engine using custom time-marching algorithms, evaluating thousands of real-time scheduling constraints, calendar states, and ranking signals to generate optimized availability in <300ms, outperforming the industry-standard 1.5-2s.",
      "Developed the platform's end-to-end calendar infrastructure handling 40,000+ monthly bookings, real-time scheduling coordination, timezone normalization, two-way calendar syncing, and fail-safe booking flows.",
      "Built AI-driven lead engagement systems using Generative AI, RAG pipelines, and sentiment analysis, increasing Lead Show Rate and Lead Quality by 60%+ and contributing to 2-2.5x revenue growth for clients.",
      "Implemented read-through caching, observability, and metrics pipelines, reducing scheduling latency by >80% and improving reliability across critical user flows.",
      "Led large-scale production codebase and infrastructure migrations with zero downtime, while managing cloud infrastructure using Terraform and infrastructure-as-code practices.",
      "As the company's first engineer, established engineering foundations, onboarded new developers, and helped scale the platform from early-stage MVP to production infrastructure powering $200M+ in monthly revenue.",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "Andore",
    imgPath: "/company_logos/andore-logo.jpeg",
    location: "Vancouver, Canada",
    startDate: "Feb 2023",
    endDate: "Oct 2023",
    description: [
      "Architected and delivered modular, scalable products ranging from MVPs and product-market-fit iterations to production-grade applications and services.",
      "Designed and implemented high-throughput microservices capable of handling large traffic spikes and asynchronous workloads.",
      "Built modern frontend applications with a strong emphasis on UX, accessibility, responsiveness, and maintainable component architecture.",
      "Modernized legacy systems and development workflows, reducing development overhead and future feature delivery time by 50%+.",
      "Solutions delivered contributed to measurable business growth, including revenue increases of 40%+ for client platforms.",
    ],
  },
  {
    title: "Co-Founder & Full-Stack Developer",
    company: "Prisma Safety",
    imgPath: "/company_logos/prisma-logo.jpg",
    location: "Cluj-Napoca, Romania",
    startDate: "Dec 2020",
    endDate: "Feb 2023",
    description: [
      "Led engineering efforts across mobile, web, and backend platforms, managing development workflows and delivering production systems end-to-end.",
      "Built and maintained the Prisma mobile application (Flutter), web platforms (Svelte/SvelteKit), and backend infrastructure, including public and private REST APIs.",
      "Developed caching systems using HiveDB that reduced mobile application startup time by 5x.",
      "Implemented authentication and billing infrastructure using Auth0 and Stripe, supporting secure user onboarding and subscription management.",
      "Managed CI/CD pipelines and cloud deployments across Netlify, Firebase, Supabase, serverless infrastructure, and backend hosting environments.",
    ],
  },
];
