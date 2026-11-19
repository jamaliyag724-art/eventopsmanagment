# Eventopsmanagment

# Build EventOps – Premium Event Operations Management Platform

Build a polished, modern, production-quality frontend prototype for a SaaS product named **EventOps**.

## 1. Product Overview

EventOps is a multi-tenant B2B Event Operations Management Platform.

It helps event organizers manage their complete event lifecycle:

- Event planning and scheduling
- Project and task management
- Vendor coordination
- Budget and expense management
- Workforce management
- Venue and resource allocation
- Sponsor management
- Live event operations
- Incident management
- Analytics and reporting

This is NOT a ticket-booking website, event discovery marketplace, or BookMyShow clone.

The product is an operational workspace for professional event management companies.

## 2. Design Direction – Extremely Important

The visual design must look like a real, professionally designed commercial software product.

Take visual inspiration from the design quality, clarity, typography, spacing and browsing experience of platforms like BookMyShow and District, but create a distinct identity for EventOps.

Do not copy their branding or layouts.

### Color palette

Use a sophisticated, warm, editorial color system:

- Warm ivory: #F6F2EA
- Soft cream: #EDE7DC
- Charcoal: #292D32
- Deep slate: #414951
- Muted terracotta: #B85F43
- Muted olive: #7D866A
- Soft sand: #D8C9B5
- White: #FFFFFF, only where needed for cards and contrast

Use colors naturally and consistently.

Terracotta should be a recognizable accent, not the background for every component. Olive and sand should be used sparingly.

### Strictly avoid

- Purple and blue AI-style gradients
- Neon colors
- Rainbow gradients
- Excessive glassmorphism
- Glowing borders
- Overuse of rounded cards
- Excessive shadows
- Generic AI-generated SaaS dashboard appearance
- Black-and-white-only layouts
- Unnecessary decorative illustrations
- Random abstract blobs and floating shapes

### Overall aesthetic

Think of a premium event production company combined with a refined modern enterprise application.

The interface should feel:
- Professional
- Warm
- Premium
- Organized
- Modern
- Trustworthy
- Visually distinctive

Use clean typography, strong headings, intentional whitespace, subtle borders, structured layouts and realistic event photography where appropriate.

Use a modern sans-serif font such as Inter or Manrope. Avoid mixing too many font families.

## 3. Technology

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide icons
- Recharts

Use reusable components and maintain a clean, scalable project structure.

## 4. Public Website

Create a premium marketing website with the following pages:

### Home / Landing Page

Include:

- Professional navigation bar
- EventOps logo and identity
- Hero section with a strong headline
- Short explanation of the platform
- Primary CTA: Get Started
- Secondary CTA: Explore Platform
- A realistic dashboard preview
- Key platform capabilities
- How EventOps works
- Supported event categories
- Benefits for event organizers
- Feature highlights
- Testimonials with clearly marked sample/demo content
- Pricing preview
- FAQ section
- Professional footer

The hero must look visually impressive without using generic AI gradients.

Use a well-composed event photograph or a realistic product UI preview.

### Additional public pages

- Features
- Solutions
- Pricing
- About
- Contact
- Login
- Sign Up

Keep the visual language consistent across every page.

## 5. Application Dashboard

Create a separate authenticated-app-style interface.

### Main application layout

- Collapsible left sidebar
- Top navigation bar
- Organization switcher
- Search
- Notifications
- User profile dropdown
- Breadcrumb navigation
- Main content area

Use warm ivory backgrounds, restrained accent colors and clear content hierarchy.

The dashboard should feel like professional business software, not a marketing landing page.

### Sidebar navigation

Organize these modules:

1. Overview
2. Events
3. Planning & Tasks
4. Vendors
5. Finance
6. Workforce
7. Sponsors
8. Venues & Resources
9. Live Operations
10. AI Intelligence
11. Analytics & Reports
12. Documents
13. Settings

Add appropriate Lucide icons.

Use active navigation states and expandable menu groups where useful.

## 6. Dashboard Overview Page

Build a realistic organization dashboard containing:

- Total Events
- Upcoming Events
- Active Tasks
- Total Budget
- Actual Expenses
- Pending Approvals
- Upcoming event timeline
- Recent activity
- Task completion overview
- Budget utilization chart
- Upcoming deadlines
- Operational alerts
- Vendor overview

Use realistic sample data, not placeholder lorem ipsum.

Charts should use the selected product palette.

## 7. Module Pages

Create the initial page structure and realistic UI for each module.

### Events

- Events overview
- Event list
- Grid/list view
- Create event modal
- Event details
- Event status
- Date and venue
- Event categories
- Search and filters

### Planning & Tasks

- Task list
- Kanban board
- Calendar view
- Task assignment
- Priority
- Due dates
- Task status
- Milestones

### Vendors

- Vendor directory
- Vendor categories
- Vendor details
- Quotations
- Contracts
- Vendor status

### Finance

- Budget overview
- Expense tracking
- Budget categories
- Payment status
- Pending approvals
- Financial charts

### Workforce

- Staff directory
- Departments
- Shift schedules
- Staff assignments
- Availability

### Sponsors

- Sponsor directory
- Sponsorship packages
- Sponsorship status
- Deliverables

### Venues & Resources

- Venue directory
- Resource inventory
- Availability
- Booking schedules
- Conflict indicators

### Live Operations

- Live event status
- Operational task progress
- Incident reporting
- Incident list
- Priority and resolution status

### AI Intelligence

Create a visually integrated AI assistant interface with sample insights such as:

- Event progress summary
- Budget risk alerts
- Overdue task warnings
- Resource conflicts

Clearly label all insights as demo content.

### Analytics & Reports

- Event performance
- Expense analysis
- Vendor performance
- Task completion
- Workforce utilization
- Report filters

### Documents

- Document list
- Categories
- File types
- Upload interface
- Search and filters

### Settings

- Organization profile
- Team members
- Roles and permissions
- Notifications
- Account preferences
- Subscription overview

## 8. Platform Administration

Create a separate platform administration area with:

- Platform overview
- Organizations
- Users
- Subscription management
- Platform activity
- System settings

This area should be visually distinct but consistent with the EventOps design system.

## 9. Interactions

This must be a functional frontend prototype, not a collection of static screenshots.

Implement:

- Working sidebar navigation
- Working page routing
- Search and filtering
- Tabs
- Dropdowns
- Modals
- Forms with frontend validation
- Kanban interactions
- Organization switcher
- Profile menu
- Notification panel
- Responsive mobile navigation

Use local mock data and frontend state.

Every visible button should have a meaningful frontend interaction. Do not create dead buttons.

## 10. Backend status

The original frontend-prototype restriction above has been superseded by the Utsav Backend Phase 1 implementation. The project now includes a PostgreSQL + Prisma schema, Better Auth email/password authentication, organization membership, tenant-scoped server helpers, and the first protected Events server functions.

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) before connecting a database or deploying backend changes. Dashboard module data is still demo data until each module is migrated to its server functions.

## 11. Code Quality

- Use reusable components.
- Use a consistent design system.
- Maintain clean TypeScript code.
- Avoid unnecessary duplication.
- Keep module components organized.
- Use realistic empty states.
- Include loading states where useful.
- Handle form validation.
- Ensure responsive layouts.
- Avoid unnecessary dependencies.

## 12. Product status

Utsav's public website and workspace UI are the existing product baseline. Backend work is now in progress, beginning with PostgreSQL, Prisma, Better Auth, organization membership, and tenant-scoped server functions. See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for the implementation scope and deployment steps.

This project was initially scaffolded with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/40154b26-9b96-404d-bf3d-2a318525ddb0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```


## Backend implementation

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for PostgreSQL, Prisma, Better Auth, Vercel environment variables, database migrations, and the current backend scope.
