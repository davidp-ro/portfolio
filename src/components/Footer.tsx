export default function Footer() {
  return (
    <>
      <footer className="mt-32 text-xs text-center text-muted-foreground">
        &copy; {new Date().getFullYear()} David Pescariu - View source{" "}
        <a
          href="https://github.com/davidp-ro/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          here
        </a>
        .
      </footer>
      <div className="h-8" />
    </>
  );
}
