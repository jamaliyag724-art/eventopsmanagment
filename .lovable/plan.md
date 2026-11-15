# EventOps Frontend Prototype

## Experience
- Build EventOps as a polished, frontend-only event operations product with a warm editorial identity, responsive layouts, realistic sample data, and clear public-to-workspace journeys.
- Make `/` the public home page, with dedicated public pages for Features, Solutions, Pricing, About, Contact, Login, and Sign Up.
- Build a separate `/app` workspace with a collapsible module sidebar, organization switcher, search, notifications, profile menu, and an operational overview.
- Provide dedicated workspace views for Events, Planning & Tasks, Vendors, Finance, Workforce, Sponsors, Venues & Resources, Live Operations, AI Intelligence, Analytics & Reports, Documents, and Settings. Add a separate `/admin` platform administration area.
- Make the prototype interactive with local mock data: navigation, search and filters, view tabs, event creation, validated contact/sign-up forms, task board status changes, notifications, menus, and mobile navigation. Clearly mark sample testimonials and AI insights as demo content.

## Visual direction
- Use the requested ivory, cream, charcoal, slate, terracotta, olive, and sand palette through semantic design tokens; use restrained radii and borders, strong sans-serif typography, and event photography where it supports the experience.
- Keep public pages editorial and brand-led; keep the operations area dense, scannable, and practical. Use a bundled/generated event image rather than a remote hotlink.

## Technical approach
- Use the existing TanStack Start, React, TypeScript, Tailwind v4, shadcn/ui, Lucide, and Recharts setup; no database, external backend, or production authentication.
- Organize shared shell, mock data, and reusable views/components so real API integration can be added later. Use route-specific metadata on each content page.
- Validate the main routes and key prototype interactions, then check the preview build and responsive rendering.
