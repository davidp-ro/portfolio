<script>
  import Section from "./section.svelte";
  import WorkCard from "./workCard.svelte";
</script>

<Section id="work">
  <div class="py-24">
    <h3
      class="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0"
    >
      My Work
    </h3>

    <WorkCard
      title="Co-Founder & Head of Development"
      company="Prisma"
      location="Cluj-Napoca"
      fromTo="APR 2021 - PRESENT"
    >
      Creating a product meant to improve your personal safety
      <ul class="ml-10 list-disc">
        <li>
          Creating the crossplatform Prisma App using Flutter <i>
            (Native BLE Implementations, Live Location Tracking, Step-by-Step
            directions)
          </i>
        </li>
        <li>
          Building a low-cost IOT Device to allow the user to be "within a
          touch" of their friends and family, in case a dangerous situations
          appears.
        </li>
        <li>
          Coordinating the development team, while keeping other teams
          up-to-date about the technical progress and milestones.
        </li>
        <li>Managing deploys to Netlify, Heroku, and other cloud platforms.</li>
      </ul>
    </WorkCard>

    <WorkCard
      title="Web Developer"
      company="Freelance"
      location="Cluj-Napoca"
      fromTo="NOV 2020 – APR 2021"
    >
      I helped businesses with outdated websites regain their popularity online.
      <ul class="ml-10 list-disc">
        <li>
          Developed modern mobile-first websites suited to my client's needs.
        </li>
        <li>Constantly engaged with my customers to ensure satisfaction.</li>
        <li>
          Increased traffic by up to 80%, thus improving their long-term revenue
          and reach.
        </li>
      </ul>
    </WorkCard>

    <WorkCard
      title="Full Stack Intern Developer"
      company="DPIT Academy & Bosch ECC"
      location="Cluj-Napoca"
      fromTo="MAY 2020 – NOV 2020"
    >
      Created an MVP for an IOT Device and Mobile App
      <ul class="ml-10 list-disc">
        <li>
          Developed a mobile app with Flutter which communicated with a BLE
          module and integrated a map showing local reports of dangerous
          activity.
        </li>
        <li>
          By building this product we were fighting the huge problem that is
          street harassment - up to 80% of women in the US face harassment.
        </li>
        <li>
          With our solution, we ended up also taking 2nd place during the 2020
          DPIT Academy.
        </li>
      </ul>
    </WorkCard>
  </div>
</Section>
