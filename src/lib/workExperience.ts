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
    imgPath: "/company_logos/saleskick-logo.png",
    location: "Scottsdale, USA",
    startDate: "Sep 2023",
    endDate: "Present",
    description: [
      "As the founding engineer, my focus has been on building scalable, stable, and distributed systems that empower our clients to maximize sales opportunities each day.",
      "Beyond core infrastructure development, my role involves creating comprehensive end-to-end features and services that significantly enhance user experience.",
      "I've done some cool AI stuff, with Generative AI, Sentiment Analysis and RAGs.",
      "Handled product-wide codebase migrations with zero downtime.",
      "As the first engineer on the team, I onboarding new engineers and established a comprehensive knowledge base.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Andore",
    imgPath: "/company_logos/andore-logo.jpeg",
    location: "Vancouver, Canada",
    startDate: "Feb 2023",
    endDate: "Oct 2023",
    description: [
      "I worked hands-on in architecting and building complete, modular & scalable products, from MVPs and Product Market-Fit solutions to full-scale production apps & services.",
      "Specialised in web solutions, following a TypeScipt/Node.js, Google Cloud, and SvelteKit stack but I'm always eager to explore new technologies!",
      "Built highly modular microservices designed to scale & handle intense bursts of traffic.",
      "I worked with international clients, primarily from the USA, and with teams of all sizes, from fresh startups to established companies.",
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
      "We were a team of students who aimed to bring a change in personal safety - so you could feel safer.",
      "I was the one who coordinated, led and brought to life the technical side of Prisma.",
      "Managed development & implementation of the Prisma App, Websites & Platforms and all backend infrastructure using modern tech stacks.",
      "Implemented billing services with Stripe and authentication flows using Auth0.",
      "Ensured the security and anonymity of our reports and stored them safely.",
    ],
  },
];
