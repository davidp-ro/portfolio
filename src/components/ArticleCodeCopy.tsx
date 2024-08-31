"use client";

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./ui/button";

const addCopyButton = (preElement: HTMLPreElement) => {
  // Get the code content of the pre element
  const copyContent = preElement.textContent || "";

  // Make the pre element relative so we can position the button
  preElement.style.position = "relative";

  // Add the button to the pre element
  const el = document.createElement("div");
  createRoot(el).render(<CopyButton copyContent={copyContent} />);
  preElement.appendChild(el);
};

function CopyButton({ copyContent }: { copyContent: string }) {
  const [text, setText] = useState("Copy");

  return (
    <Button
      variant="outline"
      className="absolute m-1.5 top-0 right-0 z-10"
      size="sm"
      onClick={() => {
        navigator.clipboard.writeText(copyContent);
        setText("Copied!");
        setTimeout(() => setText("Copy"), 2000);
      }}
    >
      {text}
    </Button>
  );
}

/**
 * I don't know if this is the most "react way" of doing this, but I wanted to
 * keep the content ssg and only have the copy button be added on the client.
 */
export default function ArticleCodeCopy({ articleId }: { articleId: string }) {
  let ran = false;

  useEffect(() => {
    if (ran) return;
    ran = true;

    const article = document.getElementById(articleId);
    if (!article) return;

    const preElements = article.querySelectorAll("pre");
    if (!preElements || preElements.length === 0) return;

    preElements.forEach(addCopyButton);
  }, []);

  return <></>;
}
