const manifest = {
  name: "AGIX Technologies",
  short_name: "AGIX Technologies",
  description: "AI Systems Engineering & Agentic Intelligence Company",
  start_url: "/",
  display: "standalone",
  background_color: "#020817",
  theme_color: "#f97316",
  lang: "en",
  icons: [
    {
      src: "/favicon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable",
    },
    {
      src: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
  ],
};

export const runtime = "nodejs";

export function GET() {
  return Response.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Content-Type": "application/manifest+json; charset=utf-8",
    },
  });
}
