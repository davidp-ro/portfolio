import { WORK_EXPERIENCE } from "@/lib/workExperience";
import Image from "next/image";
import ExperienceButtons from "./ExperienceButtons";
import BlurFade from "./magicui/blur-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Experience({ baseDelay }: { baseDelay: number }) {
  return (
    <BlurFade className="mt-56" delay={baseDelay}>
      <h2 className="text-lg font-medium mb-2">Work Experience</h2>
      <Accordion type="single" collapsible className="w-full">
        {WORK_EXPERIENCE.map((item, idx) => (
          <AccordionItem
            key={`work-${idx}`}
            value={`work-${idx}`}
            className="border-0"
          >
            <AccordionTrigger className="justify-between hover:no-underline">
              <div className="flex gap-3">
                <Image
                  className="rounded-lg"
                  src={item.imgPath}
                  alt={item.company}
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-start">
                  <h3>{item.title}</h3>
                  <p className="text-sm font-normal text-muted-foreground">
                    <span className="font-medium">{item.company}</span>
                    <span className="hidden sm:inline">
                      {" "}
                      - {item.location}
                    </span>{" "}
                    ({item.startDate} - {item.endDate})
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-8">
                {item.description.map((desc, descIdx) => (
                  <li key={`workDesc-${idx}-${descIdx}`} className="mb-1">
                    {desc}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <ExperienceButtons />
    </BlurFade>
  );
}
