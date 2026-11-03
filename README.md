# RouteTripper Web

Frontend application for [RouteTripper](https://routetripper.com/), a web application for planning, managing, and sharing road trips.

Built with Next.js, React, and TypeScript, featuring Google Maps integration, user authentication, and communication with a dedicated Spring Boot REST API.

**Live Application:** [RouteTripper](https://routetripper.com/)  
**Backend Repository:** [trip-planner-api](https://github.com/SzymonGos/trip-planner-api)

## Features

- Interactive route planning with Google Maps
- Location autocomplete and driving directions
- Trip creation, editing, and deletion
- Trip image uploads and management
- User authentication with Clerk
- User profiles and trip history
- Trip listings with incremental loading
- Responsive user interface

## Application Architecture

A Next.js application organized by domain features, separating UI components, data fetching, form validation, and API communication.

- **App Router** — page routing and application layouts.
- **Feature-based structure** — components, hooks, and API logic grouped by domain.
- **TanStack Query** — asynchronous data fetching, mutations, and caching.
- **React Hook Form & Zod** — form state management and validation.
- **API Client** — communication with the Spring Boot REST API.
- **Clerk** — authentication and JWT management.

## Technical Decisions

- **Feature-based architecture** — keeps related components, hooks, and business functionality together.
- **Server-side business rules** — the Spring Boot API enforces ownership, trip status restrictions, and usage limits.
- **TanStack Query** — manages server state and supports incremental trip loading.
- **Google Maps integration** — calculates driving routes, distances, and estimated travel duration.
- **Multipart form submissions** — sends trip data and image files to the backend.

## Technologies

Next.js · React · TypeScript · Tailwind CSS · TanStack Query · React Hook Form · Zod · Clerk · Google Maps JavaScript API · shadcn/ui
