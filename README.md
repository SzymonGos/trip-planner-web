# 🗺️ Routetripper – AI-Powered Travel Planner

Full-stack travel planning platform with AI assistance, interactive maps, and modern architecture. Built to showcase production-grade engineering with Next.js, Keystone CMS, and real-time integrations.

**[Live Product](https://routetripper.com)**

## Features

- **AI Travel Assistant** – OpenAI GPT-4 integration for trip suggestions and route planning
- **Interactive Maps** – Google Maps API with route optimization and custom styling
- **Trip Management** – Create, edit, and organize multi-day itineraries
- **Admin Dashboard** – KeystoneJS CMS for content and user management
- **User Accounts** – Authentication and session handling with Clerk
- **Content & Media** – Keystone CMS + Cloudinary for content and image storage
- **Modern UI** – Responsive, accessible design with TailwindCSS and Radix UI

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Apollo Client, TailwindCSS
- **Backend**: Keystone 6 CMS, PostgreSQL, Prisma ORM, GraphQL
- **AI**: OpenAI GPT-4 with usage tracking
- **Auth**: Clerk with JWT validation
- **Maps & Media**: Google Maps API, Cloudinary

## Deployment

Full-stack app deployed on [Railway](https://railway.app) with:

- **Frontend**: Next.js app
- **Backend**: KeystoneJS CMS + PostgreSQL
- **Custom Domain**: Managed via Cloudflare

## Run Locally

```bash
git clone https://github.com/SzymonGos/trip-planner.git
cd trip-planner
npm install
npm run dev
```

Environment variables needed:

- `GOOGLE_MAPS_API_KEY`
- `CLERK_SECRET_KEY`
- `OPENAI_API_KEY`
- `DATABASE_URL`

## 📸 Screenshots

![Trip Planner](./apps/docs/screenshots/landing_page.png)

[See more screenshots →](./apps/docs/screenshots.md)
