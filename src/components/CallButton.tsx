"use client";

import { openInNewTab } from "@/lib/openLink";
import { ArrowUpRight } from "lucide-react";
import AnimatedShinyText from "./magicui/animated-shiny-text";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function CallButton() {
  return (
    <div className="w-fit group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
      <Tooltip delayDuration={100}>
        <TooltipTrigger
          onClick={() => openInNewTab("https://cal.com/davidpescariu")}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>🪄</span>
            <span className="ml-1 hidden sm:inline">Can I help your team?</span>
            <span className="ml-1">Let's jump on a call</span>
            <ArrowUpRight
              size={16}
              className="ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
            />
          </AnimatedShinyText>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} side="bottom">
          <p>
            Available across GMT-7/8 (Seattle/Vancouver) to GMT+1/2
            (Paris/Berlin).
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
