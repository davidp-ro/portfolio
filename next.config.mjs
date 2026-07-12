const RESUME_URL =
  "https://portfolio-files.davidpescariu.com/resume/David%20Pescariu%20-%20Resume.pdf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/cv", destination: RESUME_URL, permanent: false },
      { source: "/resume", destination: RESUME_URL, permanent: false },
    ];
  },
};

export default nextConfig;
