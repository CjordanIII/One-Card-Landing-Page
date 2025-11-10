import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = "One Card — Combine Your Balances at Checkout";
const description =
  "Link your existing cards and set how to fund every purchase — sequentially or by percentage. Tokenized, secure, and JIT-funded. Try the interactive simulator.";
const keywords = "payment, split payment, multiple cards, checkout, fintech, credit card, tokenization, JIT funding";

export default function Head() {
  const canonical = siteUrl;
  const image = `${siteUrl}/og-image.png`;
  const now = new Date().toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "One Card",
    description: description,
    image: image,
    publisher: {
      "@type": "Organization",
      name: "One Card",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
      },
    },
    sameAs: [
      // Add your social media URLs here if you have them
    ],
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="One Card" />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="One Card" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@onecard" />
      <meta name="twitter:creator" content="@onecard" />

      {/* Robots & Indexing */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
      />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />

      {/* Theme & Viewport */}
      <meta name="theme-color" content="#0B0D10" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta httpEquiv="x-ua-compatible" content="IE=edge" />

      {/* Mobile Web App */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="One Card" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Alternate links for localization (if needed) */}
      <link rel="alternate" hrefLang="en" href={canonical} />

      {/* Preconnect to external services */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Additional JSON-LD for Organization (optional but recommended) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "One Card",
            url: siteUrl,
            description: description,
            image: image,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "",
              contactType: "Customer Service",
            },
          }),
        }}
      />
    </>
  );
}
