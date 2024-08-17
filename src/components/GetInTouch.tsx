import { cn } from "@/lib/utils";
import { Github, Linkedin, Send, Twitter } from "lucide-react";
import CallButton from "./CallButton";
import BlurFade from "./magicui/blur-fade";

const socials: { icon: typeof Linkedin; link: string; className: string }[] = [
  {
    icon: Send,
    link: "mailto:hello@davidpescariu.com",
    className: "text-orange-600",
  },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/davidpescariu/",
    className: "text-blue-500",
  },
  {
    icon: Github,
    link: "https://github.com/davidp-ro",
    className: "text-white",
  },
  {
    icon: Twitter,
    link: "https://x.com/DPescariu",
    className: "text-blue-400",
  },
];

const getSocialDisplayName = (link: string) => {
  if (!link.includes("//")) return link.split(":")[1];
  return link.split("//")[1].replaceAll("www.", "");
};

export default function GetInTouch() {
  return (
    <BlurFade className="mt-56" inView>
      <h2 className="text-lg font-medium mb-2">Get in touch!</h2>
      <p className="text-muted-foreground mb-6">
        I'm always excited to meet new people and learn about their stories.
        Whether you're looking for a new team member, a consultant, or just want
        to chat about anything in tech, I'm here!
      </p>
      <CallButton variant="footer" />
      <p className="text-muted-foreground mt-6 mb-4">Or:</p>
      <div className="flex flex-col gap-3">
        {socials.map((social, idx) => (
          <div key={idx} className="flex gap-3">
            <social.icon size={24} className={social.className} />
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("hover:underline", social.className)}
            >
              {getSocialDisplayName(social.link)}
            </a>
          </div>
        ))}
      </div>
    </BlurFade>
  );
}
