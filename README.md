# Craig-O-Metrics

Privacy-focused analytics dashboard for the Craig-O Suite.

## Features

- **Page Views** - Track every page visit across your sites
- **Unique Visitors** - Understand your real audience size
- **Referrer Tracking** - See where your traffic comes from
- **Geographic Data** - Country and city breakdown
- **Device Breakdown** - Desktop, mobile, tablet analytics
- **Custom Events** - Track button clicks, form submissions, and more
- **Real-Time Dashboard** - Watch visitors and events live
- **Retention Metrics** - Cohort analysis for user retention
- **Export Data** - Download your data in CSV or JSON format
- **API Access** - Integrate analytics into your workflows

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Neon PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Payments**: Stripe

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Neon PostgreSQL database
- Stripe account

### Installation

```bash
# Clone the repository
git clone https://github.com/ttracx/craig-o-metrics.git
cd craig-o-metrics

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXT_PUBLIC_STRIPE_PRICE_ID="price_..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## Tracking Script

Add this script to your website to start tracking:

```html
<script>
  (function() {
    var apiKey = 'YOUR_API_KEY';
    var endpoint = 'https://craig-o-metrics.vercel.app/api/track';
    
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: apiKey,
        type: 'pageview',
        data: { path: window.location.pathname }
      })
    });
  })();
</script>
```

## Pricing

**Pro Plan**: $19/month
- Unlimited websites
- Unlimited pageviews
- All features included
- Email support

## Part of the Craig-O Suite

Craig-O-Metrics is part of the Craig-O Suite by VibeCaaS, a collection of tools for modern businesses.

## License

Proprietary - VibeCaaS © 2026
