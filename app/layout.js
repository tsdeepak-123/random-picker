import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const BASE_URL = "https://team-member.netlify.app";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TeamPicker — Free Random Team Generator",
    template: "%s | TeamPicker",
  },
  description:
    "Instantly divide any group into random, balanced teams. Free, private, and works on any device — no sign-up needed.",
  keywords: [
    "random team generator",
    "team picker",
    "group divider",
    "team randomizer",
    "random group maker",
    "split into teams",
    "team selection tool",
  ],
  authors: [{ name: "TeamPicker" }],
  creator: "TeamPicker",
  publisher: "TeamPicker",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "TeamPicker",
    title: "TeamPicker — Free Random Team Generator",
    description:
      "Instantly divide any group into random, balanced teams. Free, private, no sign-up.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TeamPicker — Random Team Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeamPicker — Free Random Team Generator",
    description:
      "Instantly divide any group into random, balanced teams. Free, private, no sign-up.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "TeamPicker",
              url: BASE_URL,
              description:
                "Free random team generator. Add members, pick team count, generate instantly.",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
