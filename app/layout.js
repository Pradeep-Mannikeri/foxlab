import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  // ✅ Base URL (IMPORTANT)
  metadataBase: new URL("http://localhost:3000"),

  // ✅ Title Structure
  title: {
    default: "FOX LAB - Creative Digital Solutions",
    template: "%s | FOX LAB",
  },

  // ✅ Description
  description:
    "FOX LAB empowers modern businesses with innovative digital solutions, including web development, mobile apps, branding, and digital marketing services in India and globally.",

  // ✅ Keywords (India + Global Targeting)
  keywords: [
    "software company India",
    "web development company Bangalore",
    "app development company India",
    "digital marketing agency India",
    "SEO services India",
    "branding agency",
    "UI UX design",
    "custom software development",
    "IT solutions company",
    "creative digital agency global"
  ],

  // ✅ Authors
  authors: [{ name: "FOX LAB" }],
  creator: "FOX LAB",
  publisher: "FOX LAB",

  // ✅ Open Graph (Social Sharing)
  openGraph: {
    title: "FOX LAB - Creative Digital Solutions",
    description:
      "We build powerful digital experiences with web, mobile, and marketing solutions.",
    url: "/",
    siteName: "FOX LAB",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "FOX LAB Digital Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // ✅ Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "FOX LAB - Creative Digital Solutions",
    description:
      "Web, App, and Digital Marketing solutions for businesses worldwide.",
    images: ["/og-home.png"],
  },

  // ✅ Robots (Google Indexing)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ✅ Canonical
  alternates: {
    canonical: "/",
  },

  // ✅ Icons (FIXED FORMAT)
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <Navbar />
          <main>{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}