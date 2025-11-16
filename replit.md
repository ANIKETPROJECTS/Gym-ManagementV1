# FitPro - Online Gym Management System

## Overview
FitPro is a comprehensive online gym management system designed to serve both administrators and clients. It features distinct dashboards for each user type and supports three subscription tiers: Basic, Premium, and Elite. The system provides clients with a video workout library, diet management tools, access to live training sessions, and progress tracking capabilities. For administrators, FitPro offers robust tools for client management, video library curation, diet and workout plan generation, session scheduling, and analytics. The project aims to provide a scalable and intuitive platform for fitness businesses to manage their operations and engage with their clientele effectively.

## User Preferences
I prefer detailed explanations and a collaborative development process. Please ask for my input before implementing major changes or making significant architectural decisions. I value clear communication and a structured approach to problem-solving.

## System Architecture

### UI/UX Decisions
The system utilizes a fitness-focused Material Design aesthetic, characterized by a blue, orange, and green color scheme. Typography is handled by the Inter and Montserrat font families. The UI is built using `shadcn/ui` and Tailwind CSS, ensuring a modern and responsive design across all dashboards. Dark and light theme toggles are available throughout the application.

### Technical Stack
- **Frontend**: React with TypeScript and Vite for a fast and efficient development experience.
- **Backend**: Express.js with TypeScript for a robust and scalable API.
- **Database**: MongoDB Atlas, accessed via Mongoose for ODM.
- **UI Framework**: `shadcn/ui` combined with Tailwind CSS.
- **Routing**: Wouter for lightweight client-side routing.
- **State Management**: TanStack Query (React Query v5) for efficient data fetching, caching, and state synchronization.

### Feature Specifications
**Client Dashboard**:
- **Personalized Content**: Fetches client-specific information, videos, and sessions from the backend.
- **Progress Tracking**: Includes a weekly workout calendar, visual goal tracking (Weight & Workouts), and achievements system.
- **Body Composition Calculator**: Integrated into the profile, providing BMI, BMR, TDEE, ideal weight range, and goal-based calorie recommendations.
- **Interactive Elements**: Video playback with completion tracking, dynamic category filtering for workouts, and a notification system.

**Admin Dashboard**:
- **Client Management**: Full CRUD operations for clients, with real-time search and detailed client profiles including progress, diet, and session history.
- **Content Management**: Tools for managing video libraries and generating diet/workout plans. Plan generators allow for client-specific calorie targets, goals, diet types, and workout templates, with export functionality.
- **Session Management**: Schedule and oversee live training sessions.
- **Analytics & Revenue**: Visualizations for key metrics like total clients, revenue, growth rate, package distribution, and recent activity.

### System Design Choices
- **Modular Structure**: The project is organized into `client/` and `server/` directories, promoting separation of concerns.
- **API-Driven**: The frontend interacts with a comprehensive set of RESTful API endpoints for all data operations.
- **Automated Seeding**: The MongoDB database is automatically seeded on server startup with demo data, including packages, clients, videos, sessions, and diet/workout plans for easy setup and testing.
- **Controlled Components**: All forms are implemented as controlled components with validation.
- **Responsive Design**: The application is designed to be fully responsive across various screen sizes.

## Recent Changes
**November 16, 2025 - Comprehensive Video & Workout Library Management System**
- Enhanced admin video management system with advanced features for complete workout library control
- **MongoDB Schema Enhancements**:
  - Added analytics fields: `views` (number of times watched), `completions` (times fully completed)
  - Draft management: `isDraft` boolean field for unpublished videos
  - Equipment tracking: Array field for required equipment list
  - Trainer assignment: Field to assign specific trainers to videos
  - Difficulty & intensity levels: Categorization for better workout planning
- **Backend API Features**:
  - `/api/videos` - Full CRUD operations with advanced filtering (category, difficulty, trainer, search, draft status)
  - `/api/videos/:id/view` - Increment view count (once per session)
  - `/api/videos/:id/complete` - Increment completion count (triggered at 90% progress)
  - Atomic updates for analytics to prevent race conditions
  - RESTful design with proper error handling and validation
- **Admin Videos Page Features**:
  - Grid view layout with video cards displaying thumbnails, titles, categories, durations
  - Real-time analytics display (views and completions) on each video card
  - Advanced search functionality (searches titles and descriptions)
  - Multi-filter system: category, difficulty level, trainer, published/draft status
  - Tab navigation: Published videos, Drafts, All videos
  - Quick actions: Edit and Delete buttons on each card
  - Responsive design with optimal spacing and hover states
- **Upload Video Modal**:
  - Comprehensive form with all video metadata fields
  - Title, description, video URL, thumbnail URL inputs
  - Category selection (Strength, Cardio, Yoga, HIIT, Flexibility, Core, Sports)
  - Duration picker with hours and minutes
  - Difficulty level (Beginner, Intermediate, Advanced)
  - Intensity level (Low, Medium, High)
  - Trainer assignment dropdown
  - Dynamic equipment list builder (add/remove equipment items)
  - Draft/Published toggle for staged releases
  - Form validation and error handling
- **Edit Video Modal**:
  - Same comprehensive fields as upload modal
  - Pre-populated with existing video data
  - Supports full updates to all video properties
  - Maintains analytics data integrity during edits
- **Analytics Tracking Intelligence**:
  - Session-based view tracking prevents duplicate counts
  - Completion tracking at 90% video progress threshold
  - Atomic MongoDB operations ensure accurate counters
  - No double-counting safeguards in place
- **Route**: Admin video management accessible at `/admin/videos` with full CRUD interface

**November 16, 2025 - Admin Analytics Dashboard & Growth Metrics**
- Implemented comprehensive admin analytics dashboard with interactive charts and business intelligence
- **Backend Analytics API Endpoints**:
  - `/api/analytics/monthly-trends` - 6-month historical revenue and client data
  - `/api/analytics/growth-metrics` - Month-over-month growth calculations and package distribution
  - `/api/analytics/client-timeline` - Client acquisition timeline with new vs total clients
- **Frontend Analytics Features**:
  - Revenue Trend Charts - Area charts showing 6-month revenue history with client correlation
  - Client Growth Timeline - Line charts displaying new client acquisitions vs total client base
  - Monthly Acquisitions - Bar charts visualizing client sign-ups per month
  - Package Distribution - Interactive progress bars showing Basic/Premium/Elite breakdown
  - Growth Metrics Summary - Month-over-month comparison with growth rate percentages
  - Comprehensive System Overview - Total clients, monthly revenue, active users
- **Visualization Technology**: Implemented using Recharts library with Area, Line, and Bar chart components
- **Data Intelligence**: Real-time calculations of growth rates, revenue trends, and package statistics
- **Route**: Admin analytics accessible at `/admin/analytics` with sidebar navigation

**November 16, 2025 - Communication Features (Trainer Messaging & Community Forum)**
- Implemented WhatsApp integration for direct trainer communication
- Created community forum redirect page for WhatsApp group engagement
- Added routes for `/client/messages` and `/client/forum` with professional UI
- Both features integrated into Communication dropdown in client header

**November 16, 2025 - Goal Setting & Management System**
- Implemented comprehensive Goal Setting & Management feature with MongoDB persistence
- **MongoDB Model**: Created Goal model supporting weight, fitness, and nutrition goal types with milestone tracking
- **Backend Implementation**:
  - Full CRUD API endpoints at `/api/goals`
  - Progress update endpoint with automatic milestone detection
  - Storage layer methods for all goal operations
- **Frontend Features**:
  - Complete goal creation dialog with form validation
  - Visual progress indicators with progress bars
  - Milestone tracking system with achievement notifications
  - Goal editing and deletion capabilities
  - Real-time progress updates with cache invalidation
  - Responsive card-based layout for goal display
- **Navigation Integration**: Added Goals link to client header for easy access
- **Data Model**: Goals include goalType, title, description, targetValue, currentValue, unit, targetDate, status, progress, and milestones array

**November 16, 2025 - Progress Tracking System & Navigation Enhancement**
- Implemented dropdown navigation system in client header to organize features and prevent header clutter
- Created comprehensive progress tracking system with 7 new pages:
  - **Weight Tracking**: Log weight entries, set goals, view progress with visual indicators
  - **Body Measurements**: Track chest, waist, hips, arms, thighs with comparison view
  - **Progress Charts**: Visual graphs showing weight trends, measurement changes, and performance metrics
  - **Achievements**: Badge system with earned/locked achievements display
  - **Personal Records**: Track best lifts, runs, and other personal bests
  - **Weekly Completion**: View workout completion rates and streaks
  - **Monthly Reports**: Summary reports with highlights and downloadable option
- Organized navigation into dropdown menus:
  - **Training**: Sessions, Workout History, Video Library
  - **Nutrition**: Diet & Nutrition
  - **Progress**: 8 sub-features including tracking, charts, achievements, and reports
- Added complete backend support with API routes and storage layer for all progress features
- All new features use in-memory storage for demo purposes (can be migrated to MongoDB when needed)

## External Dependencies
- **MongoDB Atlas**: Cloud-hosted NoSQL database for data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Stripe (Planned)**: For payment processing and subscription management.
- **Replit Auth (Planned)**: For user authentication and role-based access control.