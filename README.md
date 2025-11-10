# One Card — Landing Page & Simulator

**One Card** lets users link existing payment cards and set rules for how to fund each purchase — sequentially by priority or percentage-based sharing. The merchant sees one card; the user controls the split behind the scenes.

## Features

- 🎨 **Dark-themed, accessible UI** — Black, gray, mint-green palette with WCAG contrast compliance
- 📱 **Mobile-first responsive design** — Optimized for phones, tablets, and desktop
- 💳 **Interactive simulator** — Edit balances, test split logic (sequential/percentage), and simulate transactions
- 🔐 **Security-first** — Tokenization-ready, no raw PAN storage, JIT funding compatible
- ⚡ **Performant** — No external images, pure CSS/Tailwind, lightweight React components
- 🔍 **SEO-optimized** — Open Graph, Twitter Card, JSON-LD structured data, dynamic sitemap & robots.txt
- 🧪 **Type-safe** — Full TypeScript, no `any` types (except safe escape hatches)

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Card, Button, Input, Slider, Tabs)
- **Icons:** lucide-react
- **Language:** TypeScript
- **Linting:** ESLint with Next.js config

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Verify SEO & Sitemap (Local)

```bash
# Check these endpoints:
# http://localhost:3000/sitemap.xml
# http://localhost:3000/robots.txt
```

## Project Structure

```
src/
├── app/
│   ├── head.tsx              # SEO metadata (Open Graph, Twitter, JSON-LD, etc.)
│   ├── layout.tsx            # Root layout with suppressHydrationWarning
│   ├── page.tsx              # Main landing page + simulator (all-in-one)
│   ├── globals.css           # Global Tailwind styles
│   ├── sitemap.xml/
│   │   └── route.ts          # Dynamic XML sitemap generator
│   └── robots.txt/
│       └── route.ts          # Dynamic robots.txt generator
├── components/
│   └── ui/                   # shadcn/ui components (Button, Card, Input, etc.)
└── lib/
    └── utils.ts              # Utility functions (cn, etc.)
```

## Split Logic

### Sequential Mode
Drains cards in order of priority (1 = first). Optional cap by card balance.

### Percentage Mode
Splits each purchase proportionally. Cards set their percentage share. Leftover headroom is redistributed. Optional cap by card balance.

Both modes support:
- **Cap by balance:** Don't exceed available funds on each card
- **Ignore caps:** Allow simulator to overdraw (testing only)

## Customization

### Color Theme

The design uses a **dark, accessible color palette**:

| Element | Color | Hex | Tailwind | Usage |
|---------|-------|-----|----------|-------|
| **Mint Text** | Bright Mint | `#86F5C2` | `text-[#86F5C2]` | Headings, highlights (h1, h2, labels) |
| **Mint Solid** | Bright Mint | `#2EE6A6` | `bg-[#2EE6A6]` | Buttons, CTAs, accent backgrounds |
| **Dark Background** | Charcoal Black | `#0B0D10` | `bg-gray-950` | Page background, main sections |
| **Dark Panel** | Slightly Lighter Black | `#111318` | `bg-gray-900` | Cards, panels, sections |
| **Strong Text** | Light Gray | `#F3F4F6` | `text-gray-100` | Body text, primary copy |
| **Subtle Text** | Medium Gray | `#9CA3AF` | `text-gray-400` | Secondary copy, hints, captions |
| **Border** | Dark Gray | `#1F2937` | `border-gray-800` | Card borders, dividers |

### Update Brand Colors

Edit the theme constants at the top of `src/app/page.tsx`:

```tsx
const mintText = "text-[#86F5C2]";      // bright mint for headings on black
const mintSolid = "bg-[#2EE6A6]";       // mint background for buttons/CTAs
const mintOutline = "ring-1 ring-[#2EE6A6]/40";  // mint ring/outline
const darkBg = "bg-gray-950";           // main page background
const darkPanel = "bg-gray-900 border border-gray-800";  // card/panel background
const subtleText = "text-gray-400";     // secondary text
const strongText = "text-gray-100";     // primary text
```

To customize:
1. Replace hex values with your brand colors
2. Update Tailwind classes if needed
3. Test contrast ratios at [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
4. Run `npm run lint -- --fix` to ensure no ESLint violations

### Add Navigation / Multi-page

Currently, the page is single-file. To split into multiple routes:
1. Create `src/app/(marketing)/page.tsx` for home
2. Create `src/app/(marketing)/about/page.tsx`, etc.
3. Update `head.tsx` canonical links per page

### Modify Simulator Demo Data

Edit `demoCards` in `src/app/page.tsx`:
```tsx
const demoCards: FundingCard[] = [
  { id: "c1", brand: "Visa", last4: "4242", balance: 6.0, priority: 1, pct: 20 },
  // ...
];
```

## SEO Setup

### Environment Variables

Create `.env.local` (dev) or set in your deploy platform:

```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

If not set, defaults to `http://localhost:3000` in development.

### What's Included

- ✅ **Open Graph & Twitter Card** — Social media preview optimization
- ✅ **Canonical URLs** — Prevents duplicate content
- ✅ **JSON-LD Structured Data** — WebSite + Organization schemas
- ✅ **Dynamic Sitemap** — Auto-generated at `/sitemap.xml`
- ✅ **robots.txt** — Allows crawlers, points to sitemap
- ✅ **Mobile Meta Tags** — Viewport, apple-web-app, theme color
- ✅ **Preconnect Hints** — Optimized font loading

### Testing SEO Locally

```bash
# View sitemap
curl http://localhost:3000/sitemap.xml

# View robots.txt
curl http://localhost:3000/robots.txt

# Check page meta tags in browser
# Open DevTools > Elements, search for <meta> or <og:>
```

### Submit to Search Engines

1. **Google Search Console:** https://search.google.com/search-console
2. **Bing Webmaster:** https://www.bing.com/webmasters
3. **Yandex Webmaster:** https://webmaster.yandex.com
4. Upload/submit your sitemap URL: `https://yoursite.com/sitemap.xml`

## Linting & Code Quality

```bash
# Run ESLint and auto-fix issues
npm run lint -- --fix

# Build (catches TypeScript errors)
npm run build
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables (Settings > Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = your production domain (e.g., `https://onecard.example.com`)
4. Deploy — Vercel auto-builds on push

### Other Platforms (Netlify, Railway, etc.)

```bash
# Build
npm run build

# Output is in .next/ directory; deploy as a Node.js app
```

Set `NEXT_PUBLIC_SITE_URL` in your platform's environment variables.

### Pre-Deployment Checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] Add OG image at `public/og-image.png` (1200x630px recommended)
- [ ] Test `/sitemap.xml` and `/robots.txt` endpoints
- [ ] Run `npm run build` locally to catch errors
- [ ] Test responsive design on mobile devices
- [ ] Verify all links work (esp. anchor links like `#demo`)
- [ ] Submit sitemap to Google Search Console & Bing Webmaster

## Optional Enhancements

- 🎯 Add analytics (Google Analytics 4, Plausible, Mixpanel, etc.)
- 🌐 Add multi-language support with `next-i18n`
- 📧 Newsletter signup integration
- 🔐 Add authentication for paid features
- 💾 Split into server & client components for better performance
- 📊 Add FAQ JSON-LD schema
- 🎬 Add demo video or GIF
- 🚨 Add error boundary & error page

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Web.dev SEO Starter Guide](https://web.dev/lighthouse-seo/)

## License

MIT
