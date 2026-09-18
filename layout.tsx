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
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
