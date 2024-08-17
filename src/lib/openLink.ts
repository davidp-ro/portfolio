export const openInNewTab = (url: string) => {
  const w = window.open(url, "_blank", "noopener, noreferrer");
  if (w) w.opener = null;
};
