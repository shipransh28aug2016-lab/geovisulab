import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GeoSphere 3D — CBSE Class XI & XII Interactive Geography Visualizer",
  description:
    "Interactive 3D Globe & Map visualizer aligned with NCERT & CBSE Class 11 and 12 Geography syllabus. Explore Indian drainage, mountain relief, ICAR soils, tectonic plates, and board exam map skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Leaflet's stylesheet used to be loaded from unpkg here. It is now bundled from node_modules
            by the component that actually uses it (src/components/interactive-map.tsx), so the map is
            styled correctly offline, in CI and in sandboxed preview frames. Google Fonts is left on a
            CDN deliberately: `next/font/google` fetches at build time, which would make the build
            depend on network access, and globals.css already declares a system-ui fallback stack so a
            blocked font request degrades gracefully instead of breaking layout. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
