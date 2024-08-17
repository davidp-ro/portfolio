"use client";

import { FileText, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { openInNewTab } from "@/lib/openLink";

export default function ExperienceButtons() {
  return (
    <div className="mt-4 flex flex-col md:flex-row gap-4">
      <Button
        className="gap-2"
        variant="secondary"
        onClick={() => openInNewTab("/docs/David_Pescariu-Resume.pdf")}
      >
        <FileText size={16} />
        <p>View my Résumé</p>
      </Button>
      <Button
        className="gap-2"
        variant="outline"
        onClick={() =>
          openInNewTab("https://www.linkedin.com/in/davidpescariu/")
        }
      >
        <Linkedin size={16} />
        <p>Connect with me on LinkedIn</p>
      </Button>
    </div>
  );
}
