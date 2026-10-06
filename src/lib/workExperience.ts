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
      "Own Calendars & Bookings (the revenue-critical path), OAuth, Lead Messaging, Webhooks, and the Public API end-to-end on a platform processing 150K+ submissions/month, from design through rollout and on-call.",
      "Designed the slot-generation engine from scratch (Node.js, Postgres), weighing thousands of constraints per request to return ranked availability in <300ms vs. the 1.5-2s industry norm; backs 40,000+ monthly bookings.",
      "Developed the queueing, background processing, and webhook delivery pipelines (BullMQ, Cloud Pub/Sub), with exponential backoff, dead-letter queues with reprocessing, and enough headroom to absorb traffic spikes.",
      "Implemented two-way Google Calendar sync and idempotent booking flows that handle duplicate events and partial provider failures; added Redis read-through caching that cut scheduling latency by >80%.",
      "Shipped SMS lead messaging on Twilio, alongside email via DirectIQ; tracking response rates to detect deliverability issues and worked through network/provider volume limits.",
      "Built the data export pipeline for datasets of millions of rows: queued jobs, cursor-paginated reads, streaming uploads, email notifications on completion, and compliance handling for financial data (mandated removal, scrubbing, etc.).",
      "Manage all GCP infrastructure (Cloud Run, Pub/Sub, Cloud SQL, IAM) as code with Terraform and led migrations with zero downtime. Set up CI/CD (Cloud Build, GitHub Actions, unit and e2e tests); features ship via incremental rollouts, monitored with Sentry, OpenTelemetry, Cloud Logging, and automated alerts.",
      "As first engineering hire, wrote most core internal libraries (caching, encryption, authorization, alerting, queueing, storage), contributed to the admin dashboard and product frontend, and set up SOPs and interviews.",
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
      "Designed an AI lead-engagement pipeline (RAG, sentiment scoring on inbound conversations), contributing to a 60%+ lift in show-rate and 2-2.5x revenue growth for clients running $40M+/mo combined.",
      "Delivered full-stack MVPs and internal tooling for client products, and modernized legacy build and delivery pipelines, cutting feature-delivery time by 50%+.",
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
      "Technical co-founder of a public-safety startup; designed and built the product from scratch across Node.js REST backends, web (SvelteKit), and mobile (Flutter), including auth, Stripe billing, and CI/CD.",
      "Redesigned mobile cold-start with a HiveDB-backed local cache, cutting startup time by 5x.",
    ],
  },
];
